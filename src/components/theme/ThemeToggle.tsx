import { useRef } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../i18n/useLanguage'

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="theme-toggle-icon h-4 w-4"
    >
      <path d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.6 8.6 0 1 0 11 11Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="theme-toggle-icon h-4 w-4"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

const BUTTON_CLASS =
  'theme-toggle flex h-10 w-10 items-center justify-center rounded-full border border-ink-block-fg/30 text-ink-block-fg transition-[color,border-color,transform] duration-200 hover:border-carmesi-on-block hover:text-carmesi-on-block active:scale-95'

export default function ThemeToggle() {
  const { theme, toggleTheme, primeInk } = useTheme()
  const { t } = useLanguage()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isDark = theme === 'dark'
  const label = isDark ? t.nav.themeToLight : t.nav.themeToDark

  const handleToggle = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined

    toggleTheme(origin)
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      onPointerEnter={primeInk}
      onFocus={primeInk}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      data-theme-toggle=""
      className={BUTTON_CLASS}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
