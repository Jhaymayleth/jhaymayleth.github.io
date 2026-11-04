import './App.css'

function App() {
  return (
    <main className="portfolio">
      <nav className="navbar">
        <a href="#" className="brand">
          JMR<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">Sobre mí</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </div>

        <a href="#contact" className="nav-cta">
          Hablemos <span>↗</span>
        </a>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="availability">
            <span className="status-dot" />
            SOFTWARE DEVELOPER · COLOMBIA
          </div>

          <h1>
            Construyo ideas.
            <br />
            <span>Creo experiencias</span>
            <br />
            digitales.
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

          <div className="profile-image-container">
            <img
              src="/public/images/profile.png"
              alt="José Mauricio Rangel Núñez, desarrollador de software"
              className="profile-image"
            />

            <div className="profile-image-label">
              <span>JOSÉ MAURICIO RANGEL</span>
              <span>SOFTWARE DEVELOPER</span>
            </div>
          </div>

          <div className="visual-caption">
            <span>DESIGNED TO CREATE</span>
            <span>2026 — PRESENT</span>
          </div>
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
  )
}

export default App