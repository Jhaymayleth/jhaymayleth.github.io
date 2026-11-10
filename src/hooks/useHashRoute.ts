import { useEffect, useState } from 'react'

export type HashRoute = 'portfolio' | 'card'

function readRoute(): HashRoute {
  return window.location.hash === '#tarjeta' ? 'card' : 'portfolio'
}

/**
 * Ruta mínima basada en hash: `#tarjeta` abre la tarjeta digital y el resto
 * de hashes siguen funcionando como anclas dentro del portafolio.
 * No necesita router ni reescritura del servidor en GitHub Pages.
 */
export function useHashRoute(): HashRoute {
  const [route, setRoute] = useState<HashRoute>(readRoute)

  useEffect(() => {
    const handleHashChange = () => {
      const next = readRoute()
      setRoute(next)

      if (next === 'card') {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }

      // Al volver de la tarjeta, la sección aún no está montada cuando el
      // navegador intenta hacer scroll: se repite en el siguiente frame.
      requestAnimationFrame(() => {
        const id = window.location.hash.slice(1)
        if (id) document.getElementById(id)?.scrollIntoView()
      })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}
