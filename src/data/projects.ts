import type { ProjectItem } from '../types/content'

/**
 * URL base de la web app externa que contiene el avatar y las experiencias
 * de proyecto. Las animaciones pesadas viven allí, no en GitHub Pages.
 *
 * PENDIENTE: sustituir por la URL real del despliegue cuando exista.
 */
export const projectsAppUrl = 'https://jhaymayleth.github.io/experiencias/'

/** Los 5 proyectos públicos, en el orden de revisión acordado. */
export const projects: readonly ProjectItem[] = [
  {
    id: 'muiska',
    name: 'Muiska',
    tagline: {
      es: 'Plataforma de servicios con autenticación, publicaciones y chat.',
      en: 'Services platform with authentication, listings and chat.',
    },
    stack: [
      'JavaScript',
      'Vite',
      'Tailwind CSS',
      'Express',
      'PostgreSQL',
      'Docker',
    ],
  },
  {
    id: 'mineroyal',
    name: 'MineRoyal',
    tagline: {
      es: 'Aplicación web de cine construida con React y TanStack Query.',
      en: 'Cinema web app built with React and TanStack Query.',
    },
    stack: ['React', 'Vite', 'Tailwind CSS', 'Radix UI', 'TanStack Query'],
  },
  {
    id: 'multitenant',
    name: 'Multitenant',
    tagline: {
      es: 'Arquitectura multitenant con backend Django y frontend Next.js.',
      en: 'Multitenant architecture with a Django backend and a Next.js frontend.',
    },
    stack: ['Django', 'Next.js', 'Docker'],
  },
  {
    id: 'omegacomplex',
    name: 'Omegacomplex',
    tagline: {
      es: 'Plataforma Next.js con Prisma y una experiencia 3D.',
      en: 'Next.js platform with Prisma and a 3D experience.',
    },
    stack: ['Next.js', 'Prisma', 'Three.js', 'Tailwind CSS'],
  },
  {
    id: 'alegria',
    name: 'AlegrIA',
    tagline: {
      es: 'Landing interactiva con escena 3D, animaciones y scroll suave.',
      en: 'Interactive landing with a 3D scene, animation and smooth scroll.',
    },
    stack: ['React', 'Vite', 'Three.js', 'GSAP', 'Tailwind CSS'],
  },
]

export function projectHref(id: string): string {
  return `${projectsAppUrl}#${id}`
}
