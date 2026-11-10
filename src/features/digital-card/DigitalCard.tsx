import type { RefObject } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'
import { digitalCard } from '../../data/digital-card'
import { SocialIcon } from '../../components/shared/SocialIcon'

/**
 * Tarjeta visual reutilizada en la página y en las descargas PNG/PDF.
 * No incluye el QR: ese vive debajo, junto a compartir.
 */
export function DigitalCard({
  cardRef,
}: {
  cardRef: RefObject<HTMLDivElement | null>
}) {
  const { locale, t } = useLanguage()

  return (
    <article
      ref={cardRef}
      className="digital-card relative overflow-hidden rounded-[1.75rem] border border-sumi-soft/25 bg-panel p-7 shadow-elevated sm:p-9"
    >
      <div
        aria-hidden="true"
        className="digital-card-wash pointer-events-none absolute inset-0"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <img
          src={digitalCard.photo.src}
          srcSet={digitalCard.photo.srcSet}
          sizes={digitalCard.photo.sizes}
          alt={t.hero.photoAlt}
          width={480}
          height={480}
          className="h-24 w-24 shrink-0 rounded-2xl border border-sumi-soft/20 object-cover sm:h-28 sm:w-28"
        />
        <div className="min-w-0">
          <p className="font-display text-2xl leading-tight text-sumi">
            {profile.fullName}
          </p>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft">
            {profile.role[locale]}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-sumi-soft">
            {t.hero.claim.join(' ')}
          </p>
        </div>
      </div>

      <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-sumi-soft/20 pt-5">
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
        <span className="w-full font-mono text-[9px] uppercase tracking-[0.14em] text-sumi-soft/70 sm:ml-auto sm:w-auto">
          jhaymayleth.github.io
        </span>
      </div>
    </article>
  )
}
