import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido
      </a>

      <nav
        className={`navbar${menuOpen ? ' navbar--open' : ''}`}
        aria-label="Navegación principal"
      >
        <a href="#" className="brand">
          JMR<span>.</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
        </button>

        <div className="nav-links" id="primary-navigation">
          <a href="#about" onClick={closeMenu}>
            Sobre mí
          </a>
          <a href="#projects" onClick={closeMenu}>
            Proyectos
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contacto
          </a>
        </div>

        <a href="#contact" className="nav-cta" onClick={closeMenu}>
          Hablemos <span>↗</span>
        </a>
      </nav>

      <main className="portfolio" id="contenido-principal" tabIndex={-1}>
        <section className="hero">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot" />
              SOFTWARE DEVELOPER · COLOMBIA
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line">Construyo ideas.</span>
              <span className="hero-title-line hero-title-line--accent">
                Creo experiencias digitales.
              </span>
            </h1>

            <p className="hero-description">
              Soy José Mauricio Rangel, desarrollador de software
              enfocado en construir soluciones digitales, explorar
              nuevas tecnologías y transformar ideas en productos.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="primary-button">
                Explorar proyectos <span>↗</span>
              </a>

              <a href="#about" className="secondary-button">
                Conocer mi historia
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-index">01 / INTRODUCTION</div>

            <figure className="profile-figure">
              <div className="profile-image-container">
                <img
                  src="/images/profile-840.webp"
                  srcSet="/images/profile-480.webp 480w, /images/profile-840.webp 840w, /images/profile-1080.webp 1080w"
                  sizes="(max-width: 1024px) 360px, 420px"
                  width={1086}
                  height={1448}
                  alt="José Mauricio Rangel Núñez, desarrollador de software"
                  className="profile-image"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              <figcaption className="profile-caption">
                <span className="profile-name">José Mauricio Rangel</span>
                <span className="profile-role">SOFTWARE DEVELOPER</span>
              </figcaption>
            </figure>
          </div>

          <div className="hero-footer">
            <span>SCROLL TO DISCOVER</span>
            <span>01 — 06</span>
          </div>
        </section>

        <section id="about" className="placeholder-section">
          <span>02 / ABOUT</span>
          <h2>Una mente curiosa, construyendo tecnología.</h2>
        </section>

        <section id="projects" className="placeholder-section">
          <span>03 / SELECTED WORK</span>
          <h2>Proyectos que convierten ideas en soluciones.</h2>
        </section>

        <section id="contact" className="placeholder-section">
          <span>04 / CONTACT</span>
          <h2>Construyamos algo interesante.</h2>
        </section>
      </main>
    </>
  )
}

export default App
