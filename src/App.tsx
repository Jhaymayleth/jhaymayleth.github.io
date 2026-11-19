import { LanguageProvider } from './i18n/LanguageProvider'
import { ThemeProvider } from './theme/ThemeProvider'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { SectionVeil } from './components/shared/SectionVeil'
import { Hero } from './features/home/Hero'
import { About } from './features/about/About'
import { Experience } from './features/experience/Experience'
import { Skills } from './features/skills/Skills'
import { Projects } from './features/projects/Projects'
import { Contact } from './features/contact/Contact'
import { DigitalCardPage } from './features/digital-card/DigitalCardPage'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useDocumentMeta } from './hooks/useDocumentMeta'
import { useHashRoute } from './hooks/useHashRoute'

function Portfolio() {
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

        <Projects />

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
