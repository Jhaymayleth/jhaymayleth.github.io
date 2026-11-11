import type { CSSProperties } from 'react'
import './InkTransition.css'

interface InkTransitionProps {
  active: boolean
  origin: { x: number; y: number }
  targetTheme: 'light' | 'dark'
  onComplete: () => void
}

const InkTransition = ({
  active,
  origin,
  targetTheme,
  onComplete,
}: InkTransitionProps) => {
  if (!active) return null

  // El radio se deriva en render: evita setState dentro de un efecto y
  // garantiza el valor correcto desde el primer frame de la animación.
  const distance = Math.max(
    Math.hypot(origin.x, origin.y),
    Math.hypot(window.innerWidth - origin.x, origin.y),
    Math.hypot(origin.x, window.innerHeight - origin.y),
    Math.hypot(window.innerWidth - origin.x, window.innerHeight - origin.y),
  )
  const radius = distance * 1.6

  const inkColor = targetTheme === 'dark' ? '#171717' : '#F7F5F0'

  return (
    <div
      className="ink-transition"
      style={
        {
          '--ink-color': inkColor,
          '--ink-x': `${origin.x}px`,
          '--ink-y': `${origin.y}px`,
          '--ink-radius': `${radius}px`,
        } as CSSProperties
      }
      onAnimationEnd={(event) => {
        if (
          event.target === event.currentTarget &&
          event.animationName === 'ink-reveal'
        ) {
          onComplete()
        }
      }}
    >
      <svg
        className="ink-transition__svg"
        viewBox="-100 -100 200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="ink-distortion"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves={3}
              seed={8}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={16}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter="url(#ink-distortion)">
          <path
            className="ink-transition__blob ink-transition__blob--main"
            d="M 0,-85 C 38,-98 76,-62 83,-25 C 103,12 73,63 34,79 C -5,103 -63,70 -78,34 C -104,-9 -67,-62 -29,-78 C -17,-84 -8,-83 0,-85 Z"
          />
          <path
            className="ink-transition__blob ink-transition__blob--left"
            d="M -55,-20 C -91,-49 -108,-4 -83,29 C -70,54 -43,45 -34,19 Z"
          />
          <path
            className="ink-transition__blob ink-transition__blob--right"
            d="M 40,-36 C 77,-65 107,-27 87,13 C 73,42 52,31 36,12 Z"
          />
          <path
            className="ink-transition__blob ink-transition__blob--bottom"
            d="M -20,52 C -55,79 -22,112 14,93 C 48,78 39,51 14,40 Z"
          />
        </g>
      </svg>
    </div>
  )
}

export default InkTransition
