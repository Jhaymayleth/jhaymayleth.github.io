import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'
import { ThemeToggle } from '../theme'
import { LanguageSwitch } from '../shared/LanguageSwitch'

const SECTION_HREFS = {
  about: '#sobre-mi',
  experience: '#experiencia',
  skills: '#skills',
  projects: '#proyectos',
  contact: '#contacto',
} as const

type SectionKey = keyof typeof SECTION_HREFS

const SECTION_ORDER: readonly SectionKey[] = [
  'about',
  'experience',
  'skills',
  'projects',
  'contact',
]

export function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusable = () =>
      panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled])',
            ),
          )
        : []

    getFocusable()[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header sticky top-0 z-40 bg-ink-block text-ink-block-fg transition-colors duration-300">
      <a className="skip-link" href="#contenido-principal">
        {t.skipLink}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <a href="#inicio" className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-tight text-ink-block-fg transition-colors hover:text-carmesi-on-block">
            {profile.shortName}
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.26em] text-ink-block-fg/60">
            {t.hero.role}
          </span>
        </a>

        <nav
          aria-label={t.nav.home}
          className="hidden items-center gap-5 xl:flex 2xl:gap-7"
        >
          {SECTION_ORDER.map((key) => (
            <a
              key={key}
              href={SECTION_HREFS[key]}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-block-fg/70 underline-offset-4 transition-colors hover:text-carmesi-on-block hover:underline"
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex 2xl:gap-4">
          <ThemeToggle />
          <LanguageSwitch />
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-block-fg px-5 py-2.5 text-sm font-medium text-ink-block transition-colors hover:bg-carmesi-bright hover:text-carmesi-bright-fg"
          >
            {t.nav.cta}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-ink-block-fg/30"
          >
            <span
              aria-hidden="true"
              className={`h-px w-4 bg-ink-block-fg transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              aria-hidden="true"
              className={`h-px w-4 bg-ink-block-fg transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {open
        ? createPortal(
            <div
              ref={panelRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label={t.nav.home}
              className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink-block text-ink-block-fg xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-ink-block-fg/20 px-6 py-4">
                <span className="font-display text-lg text-ink-block-fg">
                  {profile.shortName}
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label={t.nav.closeMenu}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-block-fg/30 text-lg text-ink-block-fg"
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-5 px-8">
                {SECTION_ORDER.map((key) => (
                  <a
                    key={key}
                    href={SECTION_HREFS[key]}
                    onClick={closeMenu}
                    className="font-display text-3xl text-ink-block-fg transition-colors hover:text-carmesi-on-block"
                  >
                    {t.nav[key]}
                  </a>
                ))}
              </nav>

              <div className="flex items-center justify-between gap-4 border-t border-ink-block-fg/20 px-8 py-6">
                <LanguageSwitch />
                <a
                  href="#contacto"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-block-fg px-5 py-2.5 text-sm font-medium text-ink-block"
                >
                  {t.nav.cta}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>,
            document.body,
          )
        : null}

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 18"
        preserveAspectRatio="none"
        className="hidden"
      >
        <path
        fill="currentColor"
        d="M0 0h1440v9c-60 4-120-5-180-1s-120 4-180 0-120-4-180 0-120 4-180 0-120-4-180 0-120 4-180 0-120-4-180 0-120 4-180 0-120-4-180 0V0Z"
        />
      </svg>
    </header>
  )
}
