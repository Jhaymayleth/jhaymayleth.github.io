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
  placeholders: {
    note: 'Contenido en preparación',
    about: {
      index: '02',
      label: 'Perfil',
      title: 'Una mente curiosa, construyendo tecnología.',
    },
    projects: {
      index: '05',
      label: 'Trabajo seleccionado',
      title: 'Proyectos que convierten ideas en soluciones.',
    },
    contact: {
      index: '06',
      label: 'Contacto',
      title: 'Construyamos algo interesante.',
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
  placeholders: {
    note: 'Content in progress',
    about: {
      index: '02',
      label: 'Profile',
      title: 'A curious mind, building technology.',
    },
    projects: {
      index: '05',
      label: 'Selected work',
      title: 'Projects that turn ideas into solutions.',
    },
    contact: {
      index: '06',
      label: 'Contact',
      title: 'Let’s build something interesting.',
    },
  },
  footer: {
    social: 'Find me on',
    credit: 'Designed and built by',
  },
}

export const dictionary: Record<Locale, Dictionary> = { es, en }
