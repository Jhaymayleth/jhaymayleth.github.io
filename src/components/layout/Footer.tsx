import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'
import { SocialIcon } from '../shared/SocialIcon'

const SOCIAL_LINKS = [
  { id: 'github', label: 'GitHub', href: profile.links.github },
  { id: 'linkedin', label: 'LinkedIn', href: profile.links.linkedin },
  { id: 'instagram', label: 'Instagram', href: profile.links.instagram },
] as const

export function Footer() {
  const { locale, t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-sumi text-washi">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 18"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-4 w-full text-washi"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v9c-60 4-120-5-180-1s-120 4-180 0-120-4-180 0-120 4-180 0-120-4-180 0-120 4-180 0-120-4-180 0-120 4-180 0-120-4-180 0V0Z"
        />
      </svg>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-2xl">{profile.fullName}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-washi/60">
            {t.hero.role} · {profile.location[locale]}
          </p>
          <span aria-hidden="true" className="mt-5 block h-0.5 w-10 bg-carmesi-bright" />
        </div>

        <nav aria-label={t.footer.social}>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-washi/50">
            {t.footer.social}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 text-sm text-washi/80 underline-offset-4 transition-colors hover:text-carmesi-bright hover:underline"
                >
                  <SocialIcon name={link.id} className="h-4 w-4" />
                  {link.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-washi/10">
        <p className="mx-auto max-w-6xl px-6 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-washi/45">
          © {year} · {t.footer.credit} {profile.fullName}
        </p>
      </div>
    </footer>
  )
}
