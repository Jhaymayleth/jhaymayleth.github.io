import type { LocalizedText } from '../types/content'

/**
 * Datos públicos del titular (fuente: CV entregado el 2026-11-06).
 * Email y teléfonos NO se referencian aquí: nunca se publican en la web.
 */
export const profile = {
  fullName: 'José Mauricio Rangel Núñez',
  firstName: 'José Mauricio',
  lastName: 'Rangel Núñez',
  shortName: 'Mauricio Rangel',
  role: {
    es: 'Desarrollador Full Stack',
    en: 'Full Stack Developer',
  } satisfies LocalizedText,
  location: {
    es: 'Barranquilla, Colombia',
    en: 'Barranquilla, Colombia',
  } satisfies LocalizedText,
  links: {
    github: 'https://github.com/Jhaymayleth',
    linkedin: 'https://www.linkedin.com/in/jose-mauricio-rangel-nu%C3%B1ez-89b730376/',
    instagram: 'https://www.instagram.com/dylan_.rn/',
  },
} as const
