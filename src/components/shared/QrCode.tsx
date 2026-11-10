import { useLanguage } from '../../i18n/useLanguage'
import { digitalCard } from '../../data/digital-card'

export function QrCode({ className }: { className?: string }) {
  const { t } = useLanguage()

  return (
    <img
      src={digitalCard.qrImage}
      alt={t.card.qrAlt}
      width={512}
      height={512}
      loading="lazy"
      decoding="async"
      className={className}
    />
  )
}
