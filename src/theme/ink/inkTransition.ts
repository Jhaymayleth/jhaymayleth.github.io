import { capturePage, layoutKey, renderScale } from './capture'
import { inkParams } from './gl/params'
import { InkRenderer, type InkFrame, type InkSource } from './gl/renderer'
import { applyTheme, getTheme, otherTheme, type Theme } from './theme'
import { power3Out, Tween } from './tween'

export interface Point {
  x: number
  y: number
}

const EASE = power3Out
const FADE_OUT = 0.15
const RESIZE_DEBOUNCE_MS = 250
/** Cross-fade CSS usado sin WebGL2, con movimiento reducido o sin capturas listas. */
const CSS_FADE_S = 0.45

/**
 * Forma de la expansión a lo largo del tiempo. `growth`: radio base al final,
 * relativo a la esquina más lejana. `cleanupFrom`: fracción de la duración (lineal) a
 * partir de la cual un alcance extra uniforme come lentamente lo que dejó el ruido,
 * de modo que la página queda cubierta exactamente al final. `cleanupReach`: ese
 * alcance extra en t = 1, relativo a la esquina más lejana.
 */
export const SPREAD = {
  growth: 0.7,
  cleanupFrom: 0.45,
  cleanupReach: 0.4,
  cleanupPow: 2,
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

export interface InkTransitionOptions {
  /** `false` fuerza el fallback CSS (útil para depurar). */
  webgl?: boolean
  /** Se llama cuando el tema se aplica al DOM vivo. */
  onThemeApplied?: (theme: Theme) => void
}

type ActiveFrame = Omit<InkFrame, 'progress' | 'radius' | 'time' | 'cleanup'>

/**
 * Orquesta la transición de tema:
 *  1. mantiene capturas frescas de ambos temas en la GPU (precapturadas, se renuevan
 *     cuando cambia el layout)
 *  2. al cambiar, cubre la página con la imagen del tema actual, voltea el DOM vivo
 *     debajo y expande la tinta; después funde el overlay sobre la página ya cambiada
 *  3. si se cambia a mitad de la expansión, congela el frame en pantalla y expande la
 *     siguiente tinta encima
 *  4. cae a un cross-fade CSS sin WebGL2, con movimiento reducido o antes de que las
 *     capturas estén listas
 */
export class InkTransition {
  private readonly renderer: InkRenderer | null
  private readonly onThemeApplied?: (theme: Theme) => void
  private readonly state = { progress: 0, time: 0 }
  private tween: Tween | null = null
  private fade: Tween | null = null
  private frame: ActiveFrame | null = null
  private cssFadeTimer = 0

  private captureGen = 0
  private capturing = false
  private captureQueued = false
  private resizeTimer = 0
  private destroyed = false

  private resizeHandler: (() => void) | null = null
  private resizeObserver: ResizeObserver | null = null
  private motionHandler: (() => void) | null = null

  constructor(
    canvas: HTMLCanvasElement,
    opts: InkTransitionOptions = {},
  ) {
    this.onThemeApplied = opts.onThemeApplied
    this.renderer =
      opts.webgl === false ? null : InkRenderer.create(canvas)

    if (!this.renderer) {
      document.documentElement.dataset.ink = 'css'
      return
    }
    document.documentElement.dataset.ink = 'webgl'

    this.renderer.resize(renderScale())
    this.renderer.watchContext(
      () => this.cancel(),
      () => this.scheduleCapture(0),
    )

    this.resizeHandler = () => {
      this.renderer?.resize(renderScale())
      if (this.frame) this.draw()
      this.scheduleCapture(RESIZE_DEBOUNCE_MS)
    }
    window.addEventListener('resize', this.resizeHandler)

    // Detecta cambios de altura que no son resize de ventana (fuentes tardías, imágenes).
    this.resizeObserver = new ResizeObserver(() =>
      this.scheduleCapture(RESIZE_DEBOUNCE_MS),
    )
    this.resizeObserver.observe(document.body)

    // Las capturas se omiten con movimiento reducido; tómarlas si se desactiva.
    this.motionHandler = () => this.scheduleCapture(0)
    reducedMotion.addEventListener('change', this.motionHandler)

    void document.fonts.ready.then(() => this.scheduleCapture(300))
  }

  get isWebGL(): boolean {
    return this.renderer !== null
  }

  get isAnimating(): boolean {
    return this.frame !== null
  }

  /**
   * Cambia el tema expandiendo desde `point` (px CSS del viewport) o desde el botón.
   * `seed` reproduce una expansión anterior exactamente.
   */
  toggle(point?: Point, seed?: InkFrame['seed']): void {
    if (this.destroyed) return

    const to = otherTheme(getTheme())
    const renderer = this.renderer
    if (!renderer) {
      this.crossFade(to)
      return
    }

    const scale = renderScale()
    const key = layoutKey(scale)
    const interrupting = this.frame !== null

    const canAnimate =
      !renderer.isLost &&
      !reducedMotion.matches &&
      renderer.hasValid(to, key) &&
      (interrupting || renderer.hasValid(getTheme(), key))

    if (!canAnimate) {
      this.cancel()
      this.crossFade(to)
      if (!reducedMotion.matches) this.scheduleCapture(0)
      return
    }

    // Interrumpida: congela exactamente lo que hay en pantalla y expande encima.
    let from: InkSource = getTheme()
    if (interrupting) {
      this.tween?.kill()
      this.fade?.kill()
      this.tween = this.fade = null
      renderer.resize(scale)
      const frozen = this.currentFrame()
      from = frozen && renderer.freeze(frozen) ? 'composite' : getTheme()
    }

    const center = point ?? this.toggleCenter()
    const maxDist = farthestCorner(center)
    const frameSeed = seed ?? randomSeed()
    this.frame = { from, to, center, maxDist, seed: frameSeed }
    this.state.progress = 0
    this.state.time = 0

    renderer.resize(scale)
    this.draw()
    // Misma tarea: el overlay (mostrando "from") y el DOM volteado llegan juntos.
    const canvas = renderer.canvas
    canvas.style.opacity = '1'
    canvas.classList.add('is-active')
    this.apply(to)

    this.tween = new Tween({
      duration: inkParams.duration,
      ease: EASE,
      onUpdate: (progress, seconds) => {
        this.state.progress = progress
        this.state.time = seconds
        this.draw()
      },
      onComplete: () => this.finish(),
    }).play()
    this.tween.timeScale = inkParams.timeScale
  }

  /** Velocidad de reproducción en vivo (slow motion), también sobre una transición en curso. */
  setTimeScale(scale: number): void {
    inkParams.timeScale = scale
    if (this.tween) this.tween.timeScale = scale
    if (this.fade) this.fade.timeScale = scale
  }

  destroy(): void {
    if (this.destroyed) return
    this.destroyed = true
    this.cancel()

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
      this.resizeHandler = null
    }
    this.resizeObserver?.disconnect()
    this.resizeObserver = null
    if (this.motionHandler) {
      reducedMotion.removeEventListener('change', this.motionHandler)
      this.motionHandler = null
    }

    window.clearTimeout(this.resizeTimer)
    window.clearTimeout(this.cssFadeTimer)
    this.captureGen++
    document.documentElement.classList.remove('theme-fade')

    const canvas = this.renderer?.canvas
    if (canvas) {
      canvas.classList.remove('is-active')
      canvas.style.opacity = '1'
    }
  }

  private currentFrame(): InkFrame | null {
    if (!this.frame) return null
    const { progress, time } = this.state
    const { maxDist } = this.frame
    const linear = Math.min(1, time / inkParams.duration)
    const ramp = Math.max(
      0,
      (linear - SPREAD.cleanupFrom) / (1 - SPREAD.cleanupFrom),
    )
    // El segundo término solo actúa en el último ~3 % (≈40 ms): garantía para semillas
    // desafortunadas de que el frame final es exactamente la captura "to" antes del fundido.
    const cleanup =
      ramp ** SPREAD.cleanupPow * maxDist * SPREAD.cleanupReach +
      Math.max(0, (linear - 0.97) / 0.03) * maxDist
    return {
      ...this.frame,
      progress,
      time,
      radius: progress * maxDist * SPREAD.growth,
      cleanup,
    }
  }

  private draw(): void {
    const frame = this.currentFrame()
    if (this.renderer && frame) this.renderer.draw(frame)
  }

  private finish(): void {
    const canvas = this.renderer?.canvas
    this.tween = null
    if (!canvas) return
    this.fade = new Tween({
      duration: FADE_OUT,
      ease: (t) => t,
      onUpdate: (progress) => {
        canvas.style.opacity = String(1 - progress)
      },
      onComplete: () => this.hide(),
    }).play()
    this.fade.timeScale = inkParams.timeScale
  }

  private hide(): void {
    this.fade = null
    this.frame = null
    const canvas = this.renderer?.canvas
    if (canvas) {
      canvas.classList.remove('is-active')
      canvas.style.opacity = '1'
    }
    if (this.captureQueued) this.scheduleCapture(0)
  }

  private cancel(): void {
    if (!this.frame) return
    this.tween?.kill()
    this.fade?.kill()
    this.tween = this.fade = null
    this.hide()
  }

  private apply(theme: Theme): void {
    applyTheme(theme)
    this.onThemeApplied?.(theme)
  }

  /** Cross-fade de color plano (sin WebGL2, movimiento reducido o capturas no listas). */
  private crossFade(to: Theme): void {
    const root = document.documentElement
    const motion = !reducedMotion.matches
    window.clearTimeout(this.cssFadeTimer)

    if (motion) {
      root.classList.add('theme-fade')
      root.style.setProperty('--theme-fade', `${CSS_FADE_S}s`)
    }

    this.apply(to)

    if (!motion) {
      root.classList.remove('theme-fade')
      if (this.captureQueued) this.scheduleCapture(0)
      return
    }

    this.cssFadeTimer = window.setTimeout(() => {
      root.classList.remove('theme-fade')
      if (this.captureQueued) this.scheduleCapture(0)
    }, CSS_FADE_S * 1000 + 50)
  }

  private toggleCenter(): Point {
    const buttons = document.querySelectorAll<HTMLElement>(
      '[data-theme-toggle]',
    )
    for (const button of buttons) {
      const r = button.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) {
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      }
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  }

  // ---------- Programación de capturas ----------

  private scheduleCapture(delay: number): void {
    if (this.destroyed) return
    window.clearTimeout(this.resizeTimer)
    this.resizeTimer = window.setTimeout(() => void this.captureAll(), delay)
  }

  private async captureAll(): Promise<void> {
    const renderer = this.renderer
    if (!renderer || renderer.isLost || reducedMotion.matches || this.destroyed)
      return

    // Capturar bloquea el hilo principal; nunca a mitad de animación (ni de un fade CSS,
    // que hornearía colores a medio transicionar en la captura).
    if (
      this.capturing ||
      this.frame ||
      document.documentElement.classList.contains('theme-fade')
    ) {
      this.captureQueued = true
      return
    }

    const scale = renderScale()
    const key = layoutKey(scale)
    const current = getTheme()
    const themes: Theme[] = [current, otherTheme(current)].filter(
      (t) => !renderer.hasValid(t, key),
    )
    this.captureQueued = false
    if (themes.length === 0) return

    const gen = ++this.captureGen
    this.capturing = true
    try {
      for (const theme of themes) {
        const snap = await capturePage(theme, scale, renderer.maxTextureSize)
        if (gen !== this.captureGen || this.destroyed) return
        if (snap.key !== layoutKey(renderScale())) {
          // El layout cambió durante la captura; esta instantánea ya está obsoleta.
          this.captureQueued = true
          break
        }
        renderer.upload(snap)
        if (import.meta.env.DEV) {
          console.debug(
            `[ink] captured ${theme} ${snap.canvas.width}×${snap.canvas.height} in ${snap.ms.toFixed(0)}ms`,
          )
        }
      }
    } catch (err) {
      console.error('[ink] capture failed', err)
    } finally {
      this.capturing = false
    }
    if (this.captureQueued && !this.destroyed) {
      this.scheduleCapture(RESIZE_DEBOUNCE_MS)
    }
  }
}

function farthestCorner(p: Point): number {
  const w = document.documentElement.clientWidth
  const h = document.documentElement.clientHeight
  return (
    Math.max(
      Math.hypot(p.x, p.y),
      Math.hypot(w - p.x, p.y),
      Math.hypot(p.x, h - p.y),
      Math.hypot(w - p.x, h - p.y),
    ) + 4
  )
}

function randomSeed(): InkFrame['seed'] {
  return {
    x: Math.random() * 64 - 32,
    y: Math.random() * 64 - 32,
    angle: Math.random() * Math.PI * 2,
  }
}
