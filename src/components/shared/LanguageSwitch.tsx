import { useLanguage } from '../../i18n/useLanguage'
import type { Locale } from '../../types/content'

const LOCALES: readonly Locale[] = ['es', 'en']

export function LanguageSwitch() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex items-center gap-0.5 rounded-full border border-ink-block-fg/30 p-1"
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
                ? 'bg-ink-block-fg text-ink-block'
                : 'text-ink-block-fg/70 hover:text-carmesi-bright'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
