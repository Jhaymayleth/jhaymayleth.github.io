import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: (origin?: { x: number; y: number }) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
