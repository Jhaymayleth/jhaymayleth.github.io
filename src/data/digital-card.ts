import { socialLinks } from './social-links'

/**
 * Datos de la tarjeta digital. Solo información pública.
 */
export const digitalCard = {
  siteUrl: 'https://jhaymayleth.github.io/',
  qrImage: '/images/qr-portfolio.svg',
  qrPoster: {
    es: '/images/qr-portfolio-card-es.svg',
    en: '/images/qr-portfolio-card-en.svg',
  },
  fileName: 'jose-mauricio-rangel',
  poster: {
    es: '/images/spanish.card.png',
    en: '/images/english-card.webp',
  },
  whatsappNumber: '304 475 2063',
  whatsappE164: '+573044752063',
  whatsappUrl: 'https://wa.me/573044752063',
  links: socialLinks,
} as const
