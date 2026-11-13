import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: (origin?: { x: number; y: number }) => void
  /** Prepara las capturas de la transición de tinta bajo intención de uso. */
  primeInk: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
