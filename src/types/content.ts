export type Locale = 'es' | 'en'

/**
 * Todo contenido visible se declara en ambos idiomas.
 * Al ser un Record, TypeScript obliga a completar el par: no hay textos a medio traducir.
 */
export type LocalizedText = Record<Locale, string>

export type LocalizedList = Record<Locale, readonly string[]>

export type ExperienceKind = 'work' | 'education'

export interface ExperienceItem {
  id: string
  kind: ExperienceKind
  role: LocalizedText
  organization: string
  location: LocalizedText
  period: LocalizedText
  description: LocalizedText
  points: LocalizedList
  stack: readonly string[]
}

export interface AboutFact {
  id: string
  label: LocalizedText
  value: LocalizedText
}

export interface SkillGroup {
  id: string
  title: LocalizedText
  items: readonly string[]
}

export interface LanguageProficiency {
  id: string
  language: LocalizedText
  level: LocalizedText
}
