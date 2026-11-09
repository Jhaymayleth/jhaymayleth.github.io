import type { CSSProperties } from 'react'
import { useTheme } from '../../theme/useTheme'

const SCENES = {
  light: {
    src: '/images/sumi-e-temple-1672.webp',
    srcSet:
      '/images/sumi-e-temple-960.webp 960w, /images/sumi-e-temple-1672.webp 1672w',
  },
  dark: {
    src: '/images/sumi-e-night-1672.webp',
    srcSet:
      '/images/sumi-e-night-960.webp 960w, /images/sumi-e-night-1672.webp 1672w',
  },
} as const

interface Petal {
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  spin: number
  opacity: number
  color: string
  blur: number
}

/**
 * Configuración determinista para que la escena se vea igual en cada visita.
 * Los delays negativos arrancan los pétalos a media caída.
 */
const PETALS: readonly Petal[] = [
  { left: 6, size: 10, duration: 28, delay: -6, drift: 70, spin: 480, opacity: 0.5, color: '#c0392b', blur: 0 },
  { left: 14, size: 7, duration: 22, delay: -14, drift: -50, spin: -400, opacity: 0.4, color: '#e7b7ac', blur: 0.4 },
  { left: 23, size: 12, duration: 32, delay: -2, drift: 90, spin: 540, opacity: 0.55, color: '#c0392b', blur: 0 },
  { left: 32, size: 8, duration: 25, delay: -19, drift: -70, spin: -520, opacity: 0.45, color: '#c96b5e', blur: 0.3 },
  { left: 41, size: 6, duration: 20, delay: -8, drift: 40, spin: 380, opacity: 0.35, color: '#e7b7ac', blur: 0.6 },
  { left: 49, size: 11, duration: 30, delay: -24, drift: -90, spin: -560, opacity: 0.5, color: '#c0392b', blur: 0 },
  { left: 57, size: 9, duration: 24, delay: -11, drift: 60, spin: 460, opacity: 0.45, color: '#e05a45', blur: 0 },
  { left: 65, size: 7, duration: 21, delay: -17, drift: -40, spin: -360, opacity: 0.4, color: '#e7b7ac', blur: 0.4 },
  { left: 72, size: 13, duration: 34, delay: -5, drift: 80, spin: 600, opacity: 0.5, color: '#c0392b', blur: 0 },
  { left: 80, size: 8, duration: 26, delay: -22, drift: -60, spin: -480, opacity: 0.45, color: '#c96b5e', blur: 0.3 },
  { left: 87, size: 10, duration: 29, delay: -9, drift: 50, spin: 520, opacity: 0.5, color: '#e05a45', blur: 0 },
  { left: 93, size: 6, duration: 19, delay: -15, drift: -30, spin: -340, opacity: 0.35, color: '#e7b7ac', blur: 0.6 },
  { left: 37, size: 6, duration: 23, delay: -27, drift: 80, spin: 420, opacity: 0.3, color: '#c0392b', blur: 0.7 },
  { left: 76, size: 5, duration: 18, delay: -3, drift: -50, spin: -300, opacity: 0.3, color: '#e7b7ac', blur: 0.7 },
]

/**
 * Fondo decorativo vivo: paisaje sumi-e con zoom lento, halo del sol y pétalos.
 * Solo debe usarse dentro de una sección `relative isolate overflow-hidden`,
 * con el contenido de la sección en `relative z-10`.
 */
export function SceneryBackground() {
  const { theme } = useTheme()
  const scene = SCENES[theme]

  return (
    <div aria-hidden="true" className="scenery">
      <img
        src={scene.src}
        srcSet={scene.srcSet}
        sizes="100vw"
        alt=""
        width={1672}
        height={941}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="scenery-image"
      />

      <div className="scenery-veil" />
      <div className="scenery-glow" />

      <div className="scenery-petals">
        {PETALS.map((petal, index) => {
          const style = {
            '--petal-left': `${petal.left}%`,
            '--petal-size': `${petal.size}px`,
            '--petal-duration': `${petal.duration}s`,
            '--petal-delay': `${petal.delay}s`,
            '--petal-drift': `${petal.drift}px`,
            '--petal-spin': `${petal.spin}deg`,
            '--petal-opacity': `${petal.opacity}`,
            '--petal-blur': `${petal.blur}px`,
            color: petal.color,
          } as CSSProperties

          return (
            <span key={`${petal.left}-${index}`} className="scenery-petal" style={style}>
              <svg viewBox="0 0 20 21" focusable="false">
                <path
                  d="M10 0C12.8 5.2 19 7.4 19 12.6 19 17.8 15 21 10 21S1 17.8 1 12.6C1 7.4 7.2 5.2 10 0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          )
        })}
      </div>
    </div>
  )
}
