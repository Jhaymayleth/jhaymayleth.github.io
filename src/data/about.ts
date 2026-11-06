import type { AboutFact, LocalizedList } from '../types/content'

/**
 * Perfil para la sección About. Solo hechos tomados del CV entregado el 2026-11-06.
 * El relato personal y la foto adicional siguen pendientes de entrega.
 */
export const aboutParagraphs: LocalizedList = {
  es: [
    'Estudio Ingeniería de Software en la Universidad de Cartagena y, en paralelo, me formo como desarrollador Full Stack en Riwi.',
    'Mi stack hoy es React, Next.js y SQL; también trabajo con PostgreSQL, Supabase y AWS. Lo que aprendo lo aplico en los proyectos académicos y de formación que construyo.',
    'Estoy en Barranquilla, Colombia, y estoy disponible para oportunidades nacionales o remotas. El inglés lo llevo en B2, en formación.',
  ],
  en: [
    'I study Software Engineering at Universidad de Cartagena and, in parallel, I train as a Full Stack developer at Riwi.',
    'My stack today is React, Next.js and SQL; I also work with PostgreSQL, Supabase and AWS. What I learn goes into the academic and training projects I build.',
    'I am based in Barranquilla, Colombia, and available for opportunities nationwide in Colombia or remote. My English is B2, still improving.',
  ],
}

export const aboutFacts: readonly AboutFact[] = [
  {
    id: 'degree',
    label: { es: 'Carrera', en: 'Degree' },
    value: {
      es: 'Ingeniería de Software · Universidad de Cartagena',
      en: 'Software Engineering · Universidad de Cartagena',
    },
  },
  {
    id: 'program',
    label: { es: 'Programa', en: 'Program' },
    value: { es: 'Full Stack · Riwi', en: 'Full Stack · Riwi' },
  },
  {
    id: 'location',
    label: { es: 'Base', en: 'Base' },
    value: { es: 'Barranquilla, Colombia', en: 'Barranquilla, Colombia' },
  },
  {
    id: 'availability',
    label: { es: 'Alcance', en: 'Scope' },
    value: { es: 'Nacional o remoto', en: 'Nationwide or remote' },
  },
]

export const aboutFocus: LocalizedList = {
  es: [
    'Frontend con React y Next.js',
    'Datos con SQL y PostgreSQL',
    'Cloud con AWS',
  ],
  en: [
    'Frontend with React and Next.js',
    'Data with SQL and PostgreSQL',
    'Cloud with AWS',
  ],
}
