import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'
import { SectionHeader } from '../../components/shared/SectionHeader'

/**
 * Solo los canales públicos decididos por el titular.
 * Email y teléfonos nunca se muestran aquí.
 */
const CHANNELS = [
  { id: 'github', href: profile.links.github, handle: 'Jhaymayleth' },
  { id: 'linkedin', href: profile.links.linkedin, handle: 'José Mauricio Rangel' },
  { id: 'instagram', href: profile.links.instagram, handle: '@dylan_.rn' },
] as const

export function Contact() {
  const { t } = useLanguage()

  return (
    <section
      id="contacto"
      className="border-b border-sumi/10 bg-washi-deep/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index={t.contact.index}
          label={t.contact.label}
          title={t.contact.title}
          description={t.contact.description}
        />

        <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-sumi/15 bg-white/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-torii" />
          {t.contact.availability}
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li key={channel.id}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-sumi/10 bg-white/40 p-5 transition-colors hover:border-torii/40 hover:bg-white/70"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sumi-soft transition-colors group-hover:text-torii">
                    {t.contact.links[channel.id].label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-sumi-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </span>
                <span className="mt-10 block">
                  <span className="block text-[15px] text-sumi">{channel.handle}</span>
                  <span className="mt-1 block text-sm text-sumi-soft">
                    {t.contact.links[channel.id].note}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
