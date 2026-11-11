import { socialLinks } from './social-links'

/**
 * Datos de la tarjeta digital. Solo información pública.
 */
export const digitalCard = {
  siteUrl: 'https://jhaymayleth.github.io/',
  qrImage: '/images/qr-whatsapp.svg',
  qrPoster: {
    es: '/images/qr-whatsapp-card-es.svg',
    en: '/images/qr-whatsapp-card-en.svg',
  },
  fileName: 'jose-mauricio-rangel',
  poster: {
    es: '/images/spanish.card.png',
    en: '/images/english-card.webp',
  },
  whatsappNumber: '+57 304 475 2063',
  whatsappE164: '+573044752063',
  whatsappUrl: 'https://wa.me/573044752063',
  links: socialLinks,
} as const
