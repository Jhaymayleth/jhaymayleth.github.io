import { LanguageProvider } from './i18n/LanguageProvider'
import { useLanguage } from './i18n/useLanguage'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { SectionPlaceholder } from './components/shared/SectionPlaceholder'
import { Hero } from './features/home/Hero'
import { Experience } from './features/experience/Experience'
import { Skills } from './features/skills/Skills'

function Portfolio() {
  const { t } = useLanguage()

  return (
    <>
      <Navbar />

      <main id="contenido-principal" tabIndex={-1} className="focus:outline-none">
        <Hero />

        <SectionPlaceholder
          id="sobre-mi"
          index={t.placeholders.about.index}
          label={t.placeholders.about.label}
          title={t.placeholders.about.title}
          note={t.placeholders.note}
        />

        <Experience />
        <Skills />

        <SectionPlaceholder
          id="proyectos"
          index={t.placeholders.projects.index}
          label={t.placeholders.projects.label}
          title={t.placeholders.projects.title}
          note={t.placeholders.note}
        />

        <SectionPlaceholder
          id="contacto"
          index={t.placeholders.contact.index}
          label={t.placeholders.contact.label}
          title={t.placeholders.contact.title}
          note={t.placeholders.note}
        />
      </main>

      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  )
}

export default App
