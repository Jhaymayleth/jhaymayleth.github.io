export type Ease = (t: number) => number

/** Equivalente a la curva `power3.out` de GSAP, usada por el concepto original. */
export const power3Out: Ease = (t) => 1 - Math.pow(1 - t, 3)

interface TweenConfig {
  duration: number
  ease: Ease
  onUpdate: (progress: number, seconds: number) => void
  onComplete?: () => void
}

/**
 * Tween mínimo basado en requestAnimationFrame.
 *
 * El proyecto original usa GSAP; aquí basta con este sustituto para no añadir una
 * dependencia entera. `timeScale` se puede cambiar en caliente y `seconds` es el
 * tiempo local ya escalado, igual que `tween.time()` en GSAP.
 */
export class Tween {
  timeScale = 1

  private readonly config: TweenConfig
  private raf = 0
  private last = 0
  private elapsed = 0
  private done = false

  constructor(config: TweenConfig) {
    this.config = config
  }

  play(): this {
    if (this.done) return this
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.tick)
    return this
  }

  kill(): void {
    if (this.done) return
    this.done = true
    cancelAnimationFrame(this.raf)
  }

  private readonly tick = (now: number): void => {
    if (this.done) return

    // Limita el delta tras volver de una pestaña en segundo plano o de un frame perdido.
    const delta = Math.min(0.1, Math.max(0, (now - this.last) / 1000))
    this.last = now
    this.elapsed += delta * this.timeScale

    const linear = Math.min(1, this.elapsed / this.config.duration)
    this.config.onUpdate(this.config.ease(linear), this.elapsed)

    if (linear >= 1) {
      this.done = true
      this.config.onComplete?.()
      return
    }

    this.raf = requestAnimationFrame(this.tick)
  }
}
