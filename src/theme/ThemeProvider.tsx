import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './theme-context'
import type { Theme } from './theme-context'
import { InkTransition } from './ink/inkTransition'
import './ink/ink.css'

const STORAGE_KEY = 'portfolio:theme'
const THEME_COLORS: Record<Theme, string> = {
  light: '#f7f5f0',
  dark: '#0e100f',
}

/** Campos de texto que deben tragarse los atajos de teclado. */
const TEXT_ENTRY =
  'input:not([type="range"]):not([type="checkbox"]):not([type="button"]), textarea, select, [contenteditable="true"]'

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

function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* sin persistencia */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(detectTheme)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inkRef = useRef<InkTransition | null>(null)

  // El motor es dueño de la aplicación del tema: cambia el DOM y avisa a React.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ink = new InkTransition(canvas, {
      onThemeApplied: (next) => {
        storeTheme(next)
        setThemeState(next)
      },
    })
    inkRef.current = ink

    return () => {
      ink.destroy()
      inkRef.current = null
    }
  }, [])

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

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const ink = inkRef.current
    if (ink) {
      ink.toggle(origin)
      return
    }

    // Mientras el motor se monta (o si WebGL no llega a inicializarse).
    setThemeState((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      storeTheme(next)
      return next
    })
  }, [])

  const primeInk = useCallback(() => {
    inkRef.current?.prime()
  }, [])

  // Atajo T, igual que en el proyecto original. Respeta campos de texto.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (target instanceof Element && target.closest(TEXT_ENTRY)) return
      if (event.key.toLowerCase() !== 't') return
      event.preventDefault()
      primeInk()
      toggleTheme()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [primeInk, toggleTheme])

  const value = useMemo(
    () => ({ theme, toggleTheme, primeInk }),
    [theme, toggleTheme, primeInk],
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <canvas
        ref={canvasRef}
        className="ink-canvas"
        aria-hidden="true"
        data-html2canvas-ignore=""
      />
    </ThemeContext.Provider>
  )
}
