import { useContext } from 'react'
import { ThemeContext } from '../theme/theme-context'

export type { Theme } from '../theme/theme-context'

/**
 * Acceso al tema global del `ThemeProvider`.
 * Debe usarse dentro del proveedor; de lo contrario lanza un error explícito.
 */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  }

  return context
}
