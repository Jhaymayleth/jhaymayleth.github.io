import type { RefObject } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'
import { digitalCard } from '../../data/digital-card'
import { SocialIcon } from '../../components/shared/SocialIcon'
import { QrCode } from '../../components/shared/QrCode'

export function DigitalCard({
  cardRef,
}: {
  cardRef: RefObject<HTMLDivElement | null>
}) {
  const { locale, t } = useLanguage()

  return (
    <article
      ref={cardRef}
      className="digital-card relative mx-auto w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-sumi-soft/25 bg-panel shadow-elevated"
    >
      <img
        src={digitalCard.poster[locale]}
        alt={t.card.posterAlt}
        width={1733}
        height={900}
        decoding="async"
        className="digital-card-poster block aspect-[1.93/1] w-full object-cover"
      />

      <div className="digital-card-wash relative p-6 sm:p-9">
        <div className="min-w-0">
          <p className="font-display text-3xl leading-tight text-sumi sm:text-4xl">
            {profile.fullName}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-carmesi">
            {profile.role[locale]}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-sumi-soft">
            {t.hero.claim.join(' ')}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-5 border-t border-sumi-soft/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {digitalCard.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-sumi-soft transition-colors hover:text-carmesi"
              >
                <SocialIcon name={link.id} className="h-3.5 w-3.5" />
                {link.handle}
              </a>
            ))}
          </div>

          <a
            href={digitalCard.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-sumi-soft/15 bg-panel/80 p-3 transition-colors hover:border-carmesi/40 sm:self-auto"
          >
            <QrCode className="h-28 w-28 rounded-md bg-white p-1 sm:h-32 sm:w-32" />
            <span className="flex max-w-32 flex-col gap-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-sumi-soft">
              {t.card.qrLabel}
              <span className="text-[11px] font-semibold normal-case tracking-normal text-carmesi">
                {digitalCard.whatsappNumber}
              </span>
            </span>
          </a>
        </div>

        <p className="mt-5 text-right font-mono text-[9px] uppercase tracking-[0.14em] text-sumi-soft/70">
          jhaymayleth.github.io
        </p>
      </div>
    </article>
  )
}
