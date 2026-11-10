import type { CSSProperties } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { socialLinks } from '../../data/social-links'
import { SectionHeader } from '../../components/shared/SectionHeader'
import { SectionDivider } from '../../components/shared/SectionDivider'
import { SceneryBackground } from '../../components/shared/SceneryBackground'
import { VerticalLabel } from '../../components/shared/VerticalLabel'
import { SocialIcon } from '../../components/shared/SocialIcon'
import { WindLines } from '../../components/shared/WindLines'

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

      <WindLines />

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
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {socialLinks.map((channel) => (
            <li key={channel.id}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-sumi-soft/30 bg-panel/65 p-5 shadow-soft backdrop-blur-[2px] transition-[color,background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-carmesi/45 hover:bg-panel/85 hover:shadow-elevated focus-visible:-translate-y-1"
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

        <div
          data-reveal
          style={revealDelay(280)}
          className="mt-12 flex flex-col items-start gap-5 border-t border-sumi-soft/20 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-display text-xl text-sumi">{t.card.title}</p>
            <p className="mt-1 text-sm text-sumi-soft">{t.card.contactNote}</p>
          </div>
          <a
            href="#tarjeta"
            className="inline-flex items-center gap-2 rounded-full bg-carmesi px-6 py-3 text-sm font-medium text-carmesi-fg shadow-elevated transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-carmesi-bright focus-visible:-translate-y-0.5"
          >
            {t.card.contactCta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
