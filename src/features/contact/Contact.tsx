import type { CSSProperties } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'
import { SectionHeader } from '../../components/shared/SectionHeader'
import { SectionDivider } from '../../components/shared/SectionDivider'
import { SceneryBackground } from '../../components/shared/SceneryBackground'
import { VerticalLabel } from '../../components/shared/VerticalLabel'
import { SocialIcon } from '../../components/shared/SocialIcon'

/**
 * Solo los canales públicos decididos por el titular.
 * Email y teléfonos nunca se muestran aquí.
 */
const CHANNELS = [
  { id: 'github', href: profile.links.github, handle: 'Jhaymayleth' },
  { id: 'linkedin', href: profile.links.linkedin, handle: 'José Mauricio Rangel' },
  { id: 'instagram', href: profile.links.instagram, handle: '@dylan_.rn' },
] as const

function revealDelay(delay: number): CSSProperties {
  return { '--reveal-delay': `${delay}ms` } as CSSProperties
}

export function Contact() {
  const { t } = useLanguage()

  return (
    <section
      id="contacto"
      className="chapter chapter-center relative isolate overflow-hidden bg-washi-deep/40 py-20 lg:py-28"
    >
      <SectionDivider />
      <SceneryBackground />
      <VerticalLabel index={t.contact.index} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          index={t.contact.index}
          label={t.contact.label}
          title={t.contact.title}
          description={t.contact.description}
        />

        <p
          data-reveal
          style={revealDelay(120)}
          className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-sumi-soft/40 bg-panel/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-carmesi" />
          {t.contact.availability}
        </p>

        <ul
          data-reveal
          style={revealDelay(200)}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {CHANNELS.map((channel) => (
            <li key={channel.id}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-sumi-soft/30 bg-panel/65 p-5 transition-colors hover:border-carmesi/40 hover:bg-panel/85"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <SocialIcon
                      name={channel.id}
                      className="h-4 w-4 text-sumi-soft transition-colors group-hover:text-carmesi"
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
                      {t.contact.links[channel.id].label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-sumi-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-carmesi"
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
