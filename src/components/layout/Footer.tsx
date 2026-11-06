import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'

const SOCIAL_LINKS = [
  { id: 'github', label: 'GitHub', href: profile.links.github },
  { id: 'linkedin', label: 'LinkedIn', href: profile.links.linkedin },
  { id: 'instagram', label: 'Instagram', href: profile.links.instagram },
] as const

export function Footer() {
  const { locale, t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-sumi text-washi">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-2xl">{profile.fullName}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-washi/60">
            {t.hero.role} · {profile.location[locale]}
          </p>
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
                  className="text-sm text-washi/80 underline-offset-4 transition-colors hover:text-torii hover:underline"
                >
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
