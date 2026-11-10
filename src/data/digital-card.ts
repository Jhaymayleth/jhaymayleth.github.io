import { socialLinks } from './social-links'

/**
 * Datos de la tarjeta digital. Solo información pública.
 */
export const digitalCard = {
  siteUrl: 'https://jhaymayleth.github.io/',
  qrImage: '/images/qr-portfolio.svg',
  fileName: 'jose-mauricio-rangel',
  photo: {
    src: '/images/profile-480.webp',
    srcSet:
      '/images/profile-480.webp 480w, /images/profile-840.webp 840w, /images/profile-1080.webp 1080w',
    sizes: '(min-width: 640px) 112px, 96px',
  },
  links: socialLinks,
} as const
