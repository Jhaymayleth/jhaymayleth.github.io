export type Theme = 'light' | 'dark'

const root = document.documentElement

export function getTheme(): Theme {
  return root.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function otherTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}

/** Aplica el tema al DOM vivo. React se sincroniza mediante el callback del motor. */
export function applyTheme(theme: Theme): void {
  root.dataset.theme = theme
}
