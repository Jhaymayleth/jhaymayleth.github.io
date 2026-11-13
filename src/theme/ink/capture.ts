import type { Theme } from './theme'

/**
 * Capturas de la página completa para cada tema.
 *
 * Se captura el documento entero (no solo el viewport) para que la instantánea siga
 * siendo válida mientras el usuario hace scroll; el shader elige la ventana visible
 * con el scroll actual. El tema se aplica sobre el *clon* de html2canvas mediante
 * `onclone`, así la página viva nunca parpadea durante la captura previa.
 */

export interface Snapshot {
  theme: Theme
  canvas: HTMLCanvasElement
  /** Píxeles de textura por píxel CSS. */
  scale: number
  /** Layout para el que esta captura es válida; ver {@link layoutKey}. */
  key: string
  ms: number
}

const BACKGROUND: Record<Theme, string> = {
  light: '#f7f5f0',
  dark: '#0e100f',
}

/**
 * Techo de píxeles por captura. Un portafolio de varias pantallas a 2× puede superar
 * los límites de canvas/GPU de Safari y consumir cientos de MB; por encima de este
 * presupuesto se reduce la escala de forma proporcional.
 */
const MAX_CAPTURE_PIXELS = 16_000_000

const isCoarsePointer = (): boolean =>
  window.matchMedia('(pointer: coarse)').matches

/** Densidad de píxeles para las capturas y el canvas del overlay. */
export function renderScale(): number {
  const cap = isCoarsePointer() ? 1.5 : 2
  return Math.min(window.devicePixelRatio || 1, cap)
}

export function documentSize(): { width: number; height: number } {
  const el = document.documentElement
  return {
    width: el.clientWidth,
    height: Math.max(el.scrollHeight, el.clientHeight),
  }
}

/**
 * Identifica el layout del que depende una captura. La altura del viewport se excluye
 * a propósito (la barra de direcciones móvil cambia sin reflow del documento).
 */
export function layoutKey(scale: number): string {
  const { width, height } = documentSize()
  return `${width}x${height}@${scale}`
}

export async function capturePage(
  theme: Theme,
  scale: number,
  maxTextureSize: number,
): Promise<Snapshot> {
  const t0 = performance.now()
  const key = layoutKey(scale)
  const { width, height } = documentSize()

  // Nunca exceder lo que la GPU puede almacenar ni el presupuesto de píxeles.
  const safeScale = Math.min(
    scale,
    maxTextureSize / width,
    maxTextureSize / height,
    Math.sqrt(MAX_CAPTURE_PIXELS / (width * height)),
  )

  // Carga diferida: html2canvas-pro pesa ~200 KB y solo se necesita tras el primer pintado.
  const { default: html2canvas } = await import('html2canvas-pro')
  const canvas = await html2canvas(document.body, {
    scale: safeScale,
    backgroundColor: BACKGROUND[theme],
    x: 0,
    y: 0,
    width,
    height,
    scrollX: 0,
    scrollY: 0,
    // El iframe del clon se renderiza sin scrollbar: dale el ancho sin scrollbar de
    // la página viva para que el contenido centrado no se desplace medio scrollbar.
    windowWidth: width,
    windowHeight: document.documentElement.clientHeight,
    logging: false,
    useCORS: true,
    onclone: (doc) => {
      doc.documentElement.dataset.theme = theme
      // La captura cubre el documento entero: revela todo el contenido para que las
      // secciones fuera del viewport también existan al hacer scroll durante la tinta.
      doc
        .querySelectorAll<HTMLElement>('[data-reveal]')
        .forEach((el) => {
          el.classList.add('is-visible')
          // Inline: la transición de revelado acaba de empezar y su opacidad
          // computada seguiría siendo 0 cuando html2canvas muestrea los estilos.
          el.style.opacity = '1'
          el.style.transform = 'none'
          el.style.transition = 'none'
        })
      // Los controles vivos se dibujan sobre el overlay: deja un hueco para ellos.
      // `visibility` (y no data-html2canvas-ignore) conserva su caja y evita saltos.
      doc
        .querySelectorAll<HTMLElement>('[data-ink-live]')
        .forEach((el) => {
          el.style.visibility = 'hidden'
        })
    },
  })

  return { theme, canvas, scale: safeScale, key, ms: performance.now() - t0 }
}
