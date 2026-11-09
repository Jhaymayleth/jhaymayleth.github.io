import type {
  LanguageProficiency,
  LocalizedList,
  SkillGroup,
} from '../types/content'

/** Stack declarado en el CV, agrupado para lectura rápida. */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'languages',
    title: { es: 'Lenguajes', en: 'Languages' },
    items: ['JavaScript', 'TypeScript', 'Python'],
  },
  {
    id: 'frontend',
    title: { es: 'Frontend', en: 'Frontend' },
    items: ['React', 'Next.js', 'HTML', 'CSS'],
  },
  {
    id: 'data',
    title: { es: 'Datos y APIs', en: 'Data & APIs' },
    items: ['PostgreSQL', 'Supabase', 'ORM', 'APIs'],
  },
  {
    id: 'cloud',
    title: { es: 'Cloud y herramientas', en: 'Cloud & tooling' },
    items: ['AWS', 'Git', 'GitHub', 'VS Code', 'Notion', 'Stitch', 'Claude Code'],
  },
]

export const currentlyLearning: LocalizedList = {
  es: [
    'Next.js en profundidad',
    'PostgreSQL y modelado de datos',
    'Fundamentos de AWS',
    'Automatización de flujos con IA',
  ],
  en: [
    'Next.js in depth',
    'PostgreSQL and data modeling',
    'AWS fundamentals',
    'AI workflow automation',
  ],
}

export const softSkills: LocalizedList = {
  es: [
    'Liderazgo de equipos',
    'Comunicación efectiva',
    'Trabajo en equipo',
    'Autogestión',
    'Toma de decisiones bajo presión',
  ],
  en: [
    'Team leadership',
    'Effective communication',
    'Teamwork',
    'Self-management',
    'Decision-making under pressure',
  ],
}

export const languages: readonly LanguageProficiency[] = [
  {
    id: 'es',
    language: { es: 'Español', en: 'Spanish' },
    level: { es: 'Nativo', en: 'Native' },
  },
  {
    id: 'en',
    language: { es: 'Inglés', en: 'English' },
    level: { es: 'B2', en: 'B2' },
  },
]
