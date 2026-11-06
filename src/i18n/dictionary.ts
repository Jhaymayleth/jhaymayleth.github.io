import type { Locale } from '../types/content'

/**
 * Diccionario único ES/EN. `en` se tipa contra `Dictionary`, así que
 * cualquier clave nueva debe existir en los dos idiomas o el build falla.
 */
const es = {
  skipLink: 'Saltar al contenido',
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    experience: 'Experiencia',
    skills: 'Skills',
    projects: 'Proyectos',
    contact: 'Contacto',
    cta: 'Hablemos',
    language: 'Idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  hero: {
    index: '01',
    badge: 'Barranquilla, Colombia · Disponible nacional o remoto',
    claim: ['Interfaces que se sienten,', 'sistemas que sostienen.'],
    description:
      'Soy José Mauricio Rangel, desarrollador Full Stack en formación. Estudio Ingeniería de Software y construyo aplicaciones web con React, Next.js y SQL.',
    primaryCta: 'Ver mis proyectos',
    secondaryCta: 'Ver experiencia',
    scroll: 'Desliza para descubrir',
    role: 'Desarrollador Full Stack',
    photoAlt: 'José Mauricio Rangel Núñez, desarrollador Full Stack',
  },
  experience: {
    index: '03',
    label: 'Trayectoria',
    title: 'Experiencia y formación',
    description:
      'Carrera y formación intensiva en paralelo. Todavía sin experiencia laboral: esto es lo que estoy construyendo y dónde lo aprendo.',
    work: 'Experiencia',
    education: 'Formación',
  },
  skills: {
    index: '04',
    label: 'Stack',
    title: 'Tecnologías con las que trabajo',
    description:
      'Herramientas que uso hoy en proyectos académicos y de formación, más lo que estoy incorporando ahora.',
    learning: 'Aprendiendo ahora',
    learningNote: 'En curso dentro de la formación en Riwi y el estudio autónomo.',
    soft: 'Habilidades humanas',
    languages: 'Idiomas',
  },
  about: {
    index: '02',
    label: 'Perfil',
    title: 'Quién soy y qué estoy construyendo',
    focus: 'En qué me enfoco',
    facts: 'En corto',
  },
  contact: {
    index: '06',
    label: 'Contacto',
    title: 'Construyamos algo interesante.',
    description:
      'Estoy disponible para oportunidades nacionales o remotas. Escríbeme por LinkedIn o Instagram; el código está en GitHub.',
    availability: 'Barranquilla, Colombia · Disponible nacional o remoto',
    links: {
      github: { label: 'GitHub', note: 'Código y proyectos' },
      linkedin: { label: 'LinkedIn', note: 'Perfil profesional' },
      instagram: { label: 'Instagram', note: 'Fuera del código' },
    },
  },
  placeholders: {
    note: 'Contenido en preparación',
    projects: {
      index: '05',
      label: 'Trabajo seleccionado',
      title: 'Proyectos que convierten ideas en soluciones.',
    },
  },
  footer: {
    social: 'Encuéntrame en',
    credit: 'Diseñado y construido por',
  },
}

export type Dictionary = typeof es

const en: Dictionary = {
  skipLink: 'Skip to content',
  nav: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    cta: 'Let’s talk',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    index: '01',
    badge: 'Barranquilla, Colombia · Available nationwide or remote',
    claim: ['Interfaces you feel,', 'systems that hold.'],
    description:
      'I’m José Mauricio Rangel, a Full Stack developer in training. I study Software Engineering and build web applications with React, Next.js and SQL.',
    primaryCta: 'See my projects',
    secondaryCta: 'See experience',
    scroll: 'Scroll to discover',
    role: 'Full Stack Developer',
    photoAlt: 'José Mauricio Rangel Núñez, Full Stack developer',
  },
  experience: {
    index: '03',
    label: 'Track record',
    title: 'Experience & education',
    description:
      'Degree and intensive training side by side. No professional experience yet: this is what I’m building and where I’m learning it.',
    work: 'Experience',
    education: 'Education',
  },
  skills: {
    index: '04',
    label: 'Stack',
    title: 'Technologies I work with',
    description:
      'Tools I use today in academic and training projects, plus what I’m picking up right now.',
    learning: 'Learning now',
    learningNote: 'Ongoing through Riwi training and self-directed study.',
    soft: 'Human skills',
    languages: 'Languages',
  },
  about: {
    index: '02',
    label: 'Profile',
    title: 'Who I am and what I’m building',
    focus: 'Where I focus',
    facts: 'At a glance',
  },
  contact: {
    index: '06',
    label: 'Contact',
    title: 'Let’s build something interesting.',
    description:
      'I’m available for opportunities nationwide in Colombia or remote. Reach me on LinkedIn or Instagram; the code is on GitHub.',
    availability: 'Barranquilla, Colombia · Available nationwide or remote',
    links: {
      github: { label: 'GitHub', note: 'Code and projects' },
      linkedin: { label: 'LinkedIn', note: 'Professional profile' },
      instagram: { label: 'Instagram', note: 'Beyond the code' },
    },
  },
  placeholders: {
    note: 'Content in progress',
    projects: {
      index: '05',
      label: 'Selected work',
      title: 'Projects that turn ideas into solutions.',
    },
  },
  footer: {
    social: 'Find me on',
    credit: 'Designed and built by',
  },
}

export const dictionary: Record<Locale, Dictionary> = { es, en }
