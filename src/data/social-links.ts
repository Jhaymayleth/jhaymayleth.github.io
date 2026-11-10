import { profile } from './profile'

/**
 * Canales públicos decididos por el titular. Email y teléfonos no existen
 * aquí: nunca se publican en la web.
 */
export const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    href: profile.links.github,
    handle: 'Jhaymayleth',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: profile.links.linkedin,
    handle: 'José Mauricio Rangel',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: profile.links.instagram,
    handle: '@dylan_.rn',
  },
] as const

export type SocialLinkId = (typeof socialLinks)[number]['id']
