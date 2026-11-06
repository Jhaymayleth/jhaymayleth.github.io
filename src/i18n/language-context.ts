import { createContext } from 'react'
import type { Locale } from '../types/content'
import type { Dictionary } from './dictionary'

export interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
