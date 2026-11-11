import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './theme-context'
import type { Theme } from './theme-context'
import { InkTransition } from '../components/theme'

const STORAGE_KEY = 'portfolio:theme'
const THEME_COLORS: Record<Theme, string> = {
  light: '#f7f5f0',
  dark: '#0e100f',
}

function detectTheme(): Theme {
  const current = document.documentElement.dataset.theme
  return current === 'dark' ? 'dark' : 'light'
}

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

interface TransitionState {
  origin: { x: number; y: number }
  next: Theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(detectTheme)
  const [transition, setTransition] = useState<TransitionState | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const syncWithSystem = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) return
      setThemeState(event.matches ? 'dark' : 'light')
    }

    query.addEventListener('change', syncWithSystem)
    return () => query.removeEventListener('change', syncWithSystem)
  }, [])

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      if (transition) return

      const current = theme
      const next: Theme = current === 'dark' ? 'light' : 'dark'

      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* sin persistencia */
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        setThemeState(next)
        return
      }

      const o = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 }

      setTransition({ origin: o, next })
    },
    [theme, transition],
  )

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {transition && (
        <InkTransition
          active
          origin={transition.origin}
          targetTheme={transition.next}
          onComplete={() => {
            setThemeState(transition.next)
            setTransition(null)
          }}
        />
      )}
    </ThemeContext.Provider>
  )
}
