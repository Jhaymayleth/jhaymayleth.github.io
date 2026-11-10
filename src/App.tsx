import { LanguageProvider } from './i18n/LanguageProvider'
import { useLanguage } from './i18n/useLanguage'
import { ThemeProvider } from './theme/ThemeProvider'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { SectionPlaceholder } from './components/shared/SectionPlaceholder'
import { SectionVeil } from './components/shared/SectionVeil'
import { Hero } from './features/home/Hero'
import { About } from './features/about/About'
import { Experience } from './features/experience/Experience'
import { Skills } from './features/skills/Skills'
import { Contact } from './features/contact/Contact'
import { DigitalCardPage } from './features/digital-card/DigitalCardPage'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useDocumentMeta } from './hooks/useDocumentMeta'
import { useHashRoute } from './hooks/useHashRoute'

function Portfolio() {
  const { t } = useLanguage()
  useScrollReveal()
  useDocumentMeta()

  return (
    <>
      <Navbar />
      <SectionVeil />

      <main id="contenido-principal" tabIndex={-1} className="focus:outline-none">
        <Hero />

        <About />
        <Experience />
        <Skills />

        <SectionPlaceholder
          id="proyectos"
          index={t.placeholders.projects.index}
          label={t.placeholders.projects.label}
          title={t.placeholders.projects.title}
          note={t.placeholders.note}
        />

        <Contact />
      </main>

      <Footer />
    </>
  )
}

function App() {
  const route = useHashRoute()

  return (
    <ThemeProvider>
      <LanguageProvider>
        {route === 'card' ? <DigitalCardPage /> : <Portfolio />}
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
