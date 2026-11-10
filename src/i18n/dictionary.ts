import type { Locale } from '../types/content'

/**
 * Diccionario único ES/EN. `en` se tipa contra `Dictionary`, así que
 * cualquier clave nueva debe existir en los dos idiomas o el build falla.
 */
const es = {
  skipLink: 'Saltar al contenido',
  meta: {
    title: 'José Mauricio Rangel Núñez — Desarrollador Full Stack',
    description:
      'Interfaces que se sienten, sistemas que sostienen. Portafolio de José Mauricio Rangel Núñez, desarrollador Full Stack en Barranquilla, Colombia.',
    ogLocale: 'es_CO',
  },
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    experience: 'Experiencia',
    skills: 'Skills',
    projects: 'Proyectos',
    contact: 'Contacto',
    cta: 'Hablemos',
    language: 'Idioma',
    themeToDark: 'Cambiar a modo oscuro',
    themeToLight: 'Cambiar a modo claro',
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
  card: {
    label: 'Tarjeta digital',
    title: 'Mi tarjeta digital',
    description:
      'Una vista rápida de quién soy. Guarda mis datos o comparte el enlace del portafolio.',
    back: 'Volver al portafolio',
    contactCta: 'Ver mi tarjeta digital',
    contactNote: 'Guarda o comparte mis datos de contacto.',
    qrLabel: 'Escanea para abrir el portafolio',
    qrAlt: 'Código QR que abre https://jhaymayleth.github.io',
    share: 'Compartir enlace',
    copy: 'Copiar enlace',
    copied: 'Enlace copiado',
    copyError: 'No se pudo copiar el enlace',
    shareError: 'No se pudo compartir el enlace',
    shareText: 'Portafolio de José Mauricio Rangel Núñez',
    downloads: 'Descargar',
    downloadVcf: 'Contacto .vcf',
    downloadPng: 'Imagen .png',
    downloadPdf: 'PDF',
    generating: 'Generando…',
    downloadError: 'No se pudo generar el archivo. Inténtalo de nuevo.',
    vcfHint: 'El .vcf solo incluye datos públicos: nombre, rol, ubicación y perfiles.',
  },
  footer: {
    social: 'Encuéntrame en',
    credit: 'Diseñado y construido por',
  },
}

export type Dictionary = typeof es

const en: Dictionary = {
  skipLink: 'Skip to content',
  meta: {
    title: 'José Mauricio Rangel Núñez — Full Stack Developer',
    description:
      'Interfaces you feel, systems that hold. Portfolio of José Mauricio Rangel Núñez, Full Stack developer based in Barranquilla, Colombia.',
    ogLocale: 'en_US',
  },
  nav: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    cta: 'Let’s talk',
    language: 'Language',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',
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
  card: {
    label: 'Digital card',
    title: 'My digital card',
    description:
      'A quick look at who I am. Save my details or share the portfolio link.',
    back: 'Back to portfolio',
    contactCta: 'View my digital card',
    contactNote: 'Save or share my contact details.',
    qrLabel: 'Scan to open the portfolio',
    qrAlt: 'QR code that opens https://jhaymayleth.github.io',
    share: 'Share link',
    copy: 'Copy link',
    copied: 'Link copied',
    copyError: 'Could not copy the link',
    shareError: 'Could not share the link',
    shareText: 'Portfolio of José Mauricio Rangel Núñez',
    downloads: 'Download',
    downloadVcf: 'Contact .vcf',
    downloadPng: 'Image .png',
    downloadPdf: 'PDF',
    generating: 'Generating…',
    downloadError: 'Could not generate the file. Please try again.',
    vcfHint: 'The .vcf only includes public details: name, role, location and profiles.',
  },
  footer: {
    social: 'Find me on',
    credit: 'Designed and built by',
  },
}

export const dictionary: Record<Locale, Dictionary> = { es, en }
