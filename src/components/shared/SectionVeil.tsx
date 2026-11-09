import { useEffect, useRef, useState } from 'react'

/**
 * Penumbra breve al navegar entre secciones.
 * No secuestra el scroll: solo acompaña el desplazamiento nativo.
 */
export function SectionVeil() {
  const [active, setActive] = useState(false)
  const timeout = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = anchor?.getAttribute('href')
      if (!hash || hash === '#' || !document.querySelector(hash)) return

      setActive(true)
      window.clearTimeout(timeout.current)
      timeout.current = window.setTimeout(() => setActive(false), 720)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      window.clearTimeout(timeout.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`section-veil${active ? ' is-active' : ''}`}
    />
  )
}
