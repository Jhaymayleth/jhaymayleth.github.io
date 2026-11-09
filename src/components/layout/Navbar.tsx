import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'
import { ThemeToggle } from '../shared/ThemeToggle'
import type { Locale } from '../../types/content'

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

const LOCALES: readonly Locale[] = ['es', 'en']

function LanguageSwitch() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex items-center gap-0.5 rounded-full border border-sumi-soft/30 p-1"
    >
      {LOCALES.map((code) => {
        const active = locale === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              active
                ? 'bg-sumi text-washi'
                : 'text-sumi-soft hover:text-carmesi'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}

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
    <header className="sticky top-0 z-40 border-b border-sumi-soft/25 bg-washi/85 backdrop-blur">
      <a className="skip-link" href="#contenido-principal">
        {t.skipLink}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href="#inicio" className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-tight text-sumi transition-colors hover:text-carmesi">
            {profile.shortName}
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.26em] text-sumi-soft">
            {t.hero.role}
          </span>
        </a>

        <nav
          aria-label={t.nav.home}
          className="hidden items-center gap-7 lg:flex"
        >
          {SECTION_ORDER.map((key) => (
            <a
              key={key}
              href={SECTION_HREFS[key]}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-sumi-soft underline-offset-4 transition-colors hover:text-carmesi hover:underline"
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <LanguageSwitch />
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 rounded-full bg-sumi px-5 py-2.5 text-sm font-medium text-washi transition-colors hover:bg-carmesi"
          >
            {t.nav.cta}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-sumi-soft/30"
          >
            <span
              aria-hidden="true"
              className={`h-px w-4 bg-sumi transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              aria-hidden="true"
              className={`h-px w-4 bg-sumi transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
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
              className="fixed inset-0 z-50 flex flex-col bg-washi lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-sumi-soft/25 px-6 py-4">
                <span className="font-display text-lg text-sumi">
                  {profile.shortName}
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label={t.nav.closeMenu}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-sumi-soft/30 text-lg text-sumi"
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
                    className="font-display text-3xl text-sumi transition-colors hover:text-carmesi"
                  >
                    {t.nav[key]}
                  </a>
                ))}
              </nav>

              <div className="flex items-center justify-between gap-4 border-t border-sumi-soft/25 px-8 py-6">
                <LanguageSwitch />
                <a
                  href="#contacto"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sumi px-5 py-2.5 text-sm font-medium text-washi"
                >
                  {t.nav.cta}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
