import type { ExperienceItem } from '../types/content'

/**
 * Experiencia formativa del CV. Sin experiencia laboral todavía:
 * aquí viven la formación intensiva de Riwi y la carrera universitaria.
 */
export const experience: readonly ExperienceItem[] = [
  {
    id: 'riwi',
    kind: 'work',
    role: {
      es: 'Desarrollador Full Stack',
      en: 'Full Stack Developer',
    },
    organization: 'Riwi',
    location: {
      es: 'Barranquilla, Colombia',
      en: 'Barranquilla, Colombia',
    },
    period: {
      es: 'Febrero 2026 — Actualidad',
      en: 'February 2026 — Present',
    },
    description: {
      es: 'Formación intensiva en desarrollo Full Stack basada en proyectos. Diseño, construyo e implemento aplicaciones web, desde la interfaz hasta la base de datos.',
      en: 'Intensive project-based Full Stack training. I design, build and ship web applications, from the interface down to the database.',
    },
    points: {
      es: [
        'Desarrollo frontend con JavaScript, TypeScript, React y Next.js.',
        'Consumo de APIs, integración backend y gestión de bases de datos SQL.',
        'Trabajo colaborativo con Git y GitHub en proyectos individuales y de equipo.',
      ],
      en: [
        'Frontend development with JavaScript, TypeScript, React and Next.js.',
        'API consumption, backend integration and SQL database management.',
        'Collaborative work with Git and GitHub on individual and team projects.',
      ],
    },
    stack: ['Next.js', 'SQL', 'ORM', 'Supabase'],
  },
  {
    id: 'universidad-de-cartagena',
    kind: 'education',
    role: {
      es: 'Ingeniería de Software',
      en: 'Software Engineering',
    },
    organization: 'Universidad de Cartagena',
    location: {
      es: 'Cartagena, Colombia',
      en: 'Cartagena, Colombia',
    },
    period: {
      es: 'Agosto 2025 — Actualidad',
      en: 'August 2025 — Present',
    },
    description: {
      es: 'Ingeniería de Software en formación. Base académica en lógica, bases de datos y construcción de aplicaciones.',
      en: 'Software Engineering in progress. Academic grounding in logic, databases and application development.',
    },
    points: {
      es: ['Desarrollo de aplicaciones web, consumo de APIs y gestión de bases de datos.'],
      en: ['Web application development, API consumption and database management.'],
    },
    stack: [],
  },
]
