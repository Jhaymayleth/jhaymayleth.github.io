import { useEffect, useRef, useState } from 'react'

/**
 * Indica si el elemento está cerca del viewport. Se usa para pausar
 * animaciones ambientales en las secciones que no se están viendo.
 * El margen extra las reactiva un poco antes de que entren en pantalla.
 */
export function useInView<T extends Element>(rootMargin = '20% 0px') {
  const ref = useRef<T>(null)
  // Sin IntersectionObserver no hay forma de saberlo: se deja todo activo.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setInView(entry.isIntersecting))
      },
      { rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
