import type { CSSProperties } from 'react'

type Point = readonly [number, number]

interface WispConfig {
  /** Desplazamiento horizontal dentro de la ráfaga. */
  left: string
  /** Separación vertical respecto de la banda de la ráfaga, en px. */
  offset: number
  width: number
  height: number
  /** Amplitud de la ondulación del trazo. */
  amp: number
  /** Deriva vertical a lo largo del trazo (inclinación del pincel). */
  bend: number
  /** Grosor máximo del pincel, en px. */
  thickness: number
  /** Longitud del rizo final; 0 para punta limpia. */
  curl: number
  duration: number
  /** Punto del ciclo en el que arranca (0–1); se convierte en delay negativo. */
  phase: number
  /** Ajuste sobre el recorrido de la ráfaga, en vw. */
  travel: number
  sway: number
  opacity: number
}

interface GustConfig {
  top: string
  angle: number
  direction: 1 | -1
  travel: number
  wisps: readonly WispConfig[]
}

/**
 * Ráfagas de viento sumi-e: grupos de pinceladas paralelas que cruzan la
 * sección en bucle infinito. Cada trazo tiene grosor variable (punta fina,
 * centro cargado) y algunas terminan en el rizo clásico del viento japonés.
 * Dentro de una ráfaga las líneas llevan velocidades ligeramente distintas,
 * así el grupo se estira y comprime al avanzar en lugar de moverse en bloque.
 */
const GUSTS: readonly GustConfig[] = [
  {
    top: '6%',
    angle: -4,
    direction: 1,
    travel: 120,
    wisps: [
      {
        left: '2%',
        offset: 0,
        width: 340,
        height: 54,
        amp: 12,
        bend: -16,
        thickness: 5,
        curl: 0,
        duration: 74,
        phase: 0.34,
        travel: 0,
        sway: -12,
        opacity: 0.07,
      },
      {
        left: '12%',
        offset: 30,
        width: 260,
        height: 46,
        amp: 8,
        bend: -10,
        thickness: 3.2,
        curl: 14,
        duration: 66,
        phase: 0.62,
        travel: 7,
        sway: 9,
        opacity: 0.052,
      },
      {
        left: '0%',
        offset: 56,
        width: 300,
        height: 44,
        amp: 6,
        bend: -7,
        thickness: 2.4,
        curl: 0,
        duration: 82,
        phase: 0.12,
        travel: -6,
        sway: -8,
        opacity: 0.04,
      },
    ],
  },
  {
    top: '30%',
    angle: 3.5,
    direction: 1,
    travel: 104,
    wisps: [
      {
        left: '18%',
        offset: 0,
        width: 280,
        height: 48,
        amp: 9,
        bend: 8,
        thickness: 3.8,
        curl: 12,
        duration: 58,
        phase: 0.55,
        travel: 0,
        sway: 10,
        opacity: 0.05,
      },
      {
        left: '26%',
        offset: 24,
        width: 220,
        height: 42,
        amp: 6,
        bend: 5,
        thickness: 2.2,
        curl: 0,
        duration: 66,
        phase: 0.8,
        travel: -8,
        sway: -6,
        opacity: 0.042,
      },
      {
        left: '8%',
        offset: 44,
        width: 320,
        height: 40,
        amp: 7,
        bend: 10,
        thickness: 2.8,
        curl: 0,
        duration: 72,
        phase: 0.22,
        travel: 5,
        sway: -9,
        opacity: 0.035,
      },
    ],
  },
  {
    top: '50%',
    angle: -6,
    direction: -1,
    travel: 116,
    wisps: [
      {
        left: '30%',
        offset: 0,
        width: 360,
        height: 58,
        amp: 14,
        bend: -18,
        thickness: 5.2,
        curl: 0,
        duration: 88,
        phase: 0.7,
        travel: 0,
        sway: -14,
        opacity: 0.075,
      },
      {
        left: '40%',
        offset: 34,
        width: 280,
        height: 48,
        amp: 9,
        bend: -12,
        thickness: 3.4,
        curl: 15,
        duration: 76,
        phase: 0.18,
        travel: 8,
        sway: 11,
        opacity: 0.055,
      },
      {
        left: '22%',
        offset: 60,
        width: 300,
        height: 44,
        amp: 7,
        bend: -8,
        thickness: 2.4,
        curl: 0,
        duration: 94,
        phase: 0.46,
        travel: -7,
        sway: -8,
        opacity: 0.04,
      },
      {
        left: '34%',
        offset: 82,
        width: 240,
        height: 40,
        amp: 5,
        bend: -5,
        thickness: 1.8,
        curl: 0,
        duration: 84,
        phase: 0.88,
        travel: 4,
        sway: 6,
        opacity: 0.03,
      },
    ],
  },
  {
    top: '74%',
    angle: 5,
    direction: 1,
    travel: 110,
    wisps: [
      {
        left: '6%',
        offset: 0,
        width: 320,
        height: 52,
        amp: 10,
        bend: 12,
        thickness: 4.4,
        curl: 0,
        duration: 68,
        phase: 0.4,
        travel: 0,
        sway: 12,
        opacity: 0.06,
      },
      {
        left: '16%',
        offset: 28,
        width: 250,
        height: 44,
        amp: 7,
        bend: 8,
        thickness: 3,
        curl: 13,
        duration: 76,
        phase: 0.66,
        travel: -6,
        sway: -9,
        opacity: 0.045,
      },
      {
        left: '2%',
        offset: 52,
        width: 280,
        height: 40,
        amp: 6,
        bend: 6,
        thickness: 2.2,
        curl: 0,
        duration: 84,
        phase: 0.9,
        travel: 7,
        sway: 7,
        opacity: 0.034,
      },
    ],
  },
  {
    top: '88%',
    angle: -2,
    direction: -1,
    travel: 100,
    wisps: [
      {
        left: '24%',
        offset: 0,
        width: 300,
        height: 46,
        amp: 8,
        bend: -6,
        thickness: 3,
        curl: 0,
        duration: 96,
        phase: 0.5,
        travel: 0,
        sway: -8,
        opacity: 0.045,
      },
      {
        left: '34%',
        offset: 22,
        width: 230,
        height: 40,
        amp: 5,
        bend: -4,
        thickness: 2,
        curl: 12,
        duration: 88,
        phase: 0.76,
        travel: 5,
        sway: 6,
        opacity: 0.032,
      },
    ],
  },
]

/** Curva suave que pasa por los puntos medios de la polilínea. */
function smoothPath(points: readonly Point[]): string {
  const round = (value: number) => value.toFixed(1)
  const parts = [`M${round(points[0][0])} ${round(points[0][1])}`]

  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i]
    const [nx, ny] = points[i + 1]
    parts.push(
      `Q${round(px)} ${round(py)} ${round((px + nx) / 2)} ${round((py + ny) / 2)}`,
    )
  }

  const [lastX, lastY] = points[points.length - 1]
  parts.push(`L${round(lastX)} ${round(lastY)}`)
  return parts.join(' ')
}

interface WispArt {
  body: string
  curl: string | null
  curlWidth: number
}

/**
 * Convierte la geometría de una pincelada en el contorno cerrado de un trazo
 * de grosor variable, más el rizo opcional en la punta.
 */
function buildWisp(wisp: WispConfig): WispArt {
  const { width, height, amp, bend, thickness, curl } = wisp
  const midpoint = height / 2
  const cycles = 0.82
  const wavePhase = 0.12
  const steps = 34

  const tipAngle = Math.PI * 2 * (cycles + wavePhase)
  const tipY = midpoint + amp * Math.sin(tipAngle) + bend * 0.5
  // El rizo gira hacia el lado con más aire dentro de la caja.
  const curlDirection = tipY > midpoint ? -1 : 1
  const room = curlDirection < 0 ? tipY - 5 : height - tipY - 5
  const curlLength = curl ? Math.min(curl, Math.max(0, room / 1.1)) : 0
  const artWidth = width - (curlLength > 0 ? curlLength * 1.2 + 4 : 0)

  const top: Point[] = []
  const bottom: Point[] = []

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const x = t * artWidth
    const angle = Math.PI * 2 * (t * cycles + wavePhase)
    const y = midpoint + amp * Math.sin(angle) + bend * (t - 0.5)
    const slope =
      (amp * Math.PI * 2 * cycles * Math.cos(angle) + bend) / artWidth
    const length = Math.hypot(1, slope)
    const normalX = -slope / length
    const normalY = 1 / length
    // Punta fina, centro cargado: el pulso del pincel.
    const half = (thickness / 2) * Math.sin(Math.PI * t) ** 0.62

    top.push([x + normalX * half, y + normalY * half])
    bottom.push([x - normalX * half, y - normalY * half])
  }

  const ring = top.concat(bottom.slice(1, steps).reverse())
  const endX = artWidth
  const endY = tipY

  let curlPath: string | null = null
  if (curlLength > 0) {
    const d = curlDirection
    const s = curlLength
    const point = (dx: number, dy: number) =>
      `${(endX + s * dx).toFixed(1)} ${(endY + d * s * dy).toFixed(1)}`
    curlPath = [
      `M${endX.toFixed(1)} ${endY.toFixed(1)}`,
      `C${point(0.6, 0.1)} ${point(0.95, 0.75)} ${point(0.4, 0.95)}`,
      `C${point(0.02, 1.05)} ${point(-0.2, 0.5)} ${point(0.16, 0.38)}`,
    ].join(' ')
  }

  return {
    body: `${smoothPath(ring)} Z`,
    curl: curlPath,
    curlWidth: Math.max(1.1, thickness * 0.42),
  }
}

const SCENE = GUSTS.map((gust) => ({
  ...gust,
  wisps: gust.wisps.map((wisp) => ({
    config: wisp,
    art: buildWisp(wisp),
    delay: -(wisp.phase * wisp.duration),
    travel: gust.direction * gust.travel + wisp.travel,
  })),
}))

/**
 * Fondo decorativo de viento sumi-e: ráfagas que atraviesan la sección en
 * bucle infinito. Solo debe usarse dentro de una sección
 * `relative isolate overflow-hidden`, con el contenido en `relative z-10`.
 */
export function WindLines() {
  return (
    <div aria-hidden="true" className="wind-lines">
      {SCENE.map((gust, gustIndex) => (
        <div
          key={`gust-${gustIndex}`}
          className="wind-gust"
          style={{ '--gust-angle': `${gust.angle}deg` } as CSSProperties}
        >
          {gust.wisps.map(({ config, art, delay, travel }, wispIndex) => (
            <svg
              key={`wisp-${wispIndex}`}
              className="wind-wisp"
              viewBox={`0 0 ${config.width} ${config.height}`}
              width={config.width}
              height={config.height}
              focusable="false"
              style={
                {
                  top: `calc(${gust.top} + ${config.offset}px)`,
                  left: config.left,
                  '--wind-duration': `${config.duration}s`,
                  '--wind-delay': `${delay.toFixed(2)}s`,
                  '--wind-travel': `${travel}vw`,
                  '--wind-sway': `${config.sway}px`,
                  '--wind-opacity': config.opacity,
                } as CSSProperties
              }
            >
              <path d={art.body} fill="currentColor" stroke="none" />
              {art.curl && (
                <path
                  d={art.curl}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={art.curlWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>
          ))}
        </div>
      ))}
    </div>
  )
}
