import { useEffect } from 'react'
import { profile } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

type Page = 'portfolio' | 'card'

function setMeta(selector: string, content: string) {
  document.head.querySelector(selector)?.setAttribute('content', content)
}

/**
 * Mantiene el título y los metadatos sociales sincronizados con el idioma
 * y con la vista activa. Los crawlers siguen leyendo el HTML estático.
 */
export function useDocumentMeta(page: Page = 'portfolio') {
  const { locale, t } = useLanguage()

  useEffect(() => {
    const title =
      page === 'card' ? `${t.card.title} — ${profile.fullName}` : t.meta.title

    document.title = title
    setMeta('meta[name="description"]', t.meta.description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', t.meta.description)
    setMeta('meta[property="og:locale"]', t.meta.ogLocale)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', t.meta.description)
  }, [locale, page, t])
}
