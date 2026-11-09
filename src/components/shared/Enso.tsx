interface EnsoProps {
  className?: string
}

/** Círculo de tinta que se dibuja al entrar en pantalla. */
export function Enso({ className = '' }: EnsoProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      fill="none"
      className={className}
    >
      <path
        pathLength={1}
        className="enso-path"
        d="M104 22c38 2 68 34 70 74 2 42-30 74-72 78-42 4-76-26-80-66-4-40 24-76 64-84"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        className="enso-path"
        d="M108 28c34 6 58 34 60 68 2 36-26 64-64 70-38 6-72-20-76-56-4-36 20-70 56-80"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}
