# Portafolio — José Mauricio Rangel Núñez

Sitio personal de **José Mauricio Rangel Núñez**, desarrollador Full Stack en formación.
Claim: *Interfaces que se sienten, sistemas que sostienen.* / *Interfaces you feel, systems that hold.*

- **Sitio:** <https://jhaymayleth.github.io/>
- **Tarjeta digital:** <https://jhaymayleth.github.io/#tarjeta>

## Qué incluye

- **Bilingüe ES/EN** con diccionario tipado y contexto React; detecta el idioma del navegador y lo persiste en `localStorage`.
- **Tema claro/oscuro** que sigue al sistema hasta que el visitante elige manualmente.
- **Secciones:** Home, About, Experience, Skills, Proyectos (pendiente) y Contacto.
- **Dinamismo ambiental:** pétalos animados en Contacto y líneas de viento estilo pincelada sumi-e en todas las secciones del home; respeta `prefers-reduced-motion`.
- **Tarjeta digital** en una página propia (`#tarjeta`): tarjeta visual, QR de WhatsApp con el número público, compartir/copiar enlace y descargas `.vcf`, PNG y PDF.
- **SEO técnico:** canonical, OpenGraph/Twitter, JSON-LD `Person`, `robots.txt`, `sitemap.xml`, `og-cover.png` 1200×630 y favicon propio.
- **Solo datos públicos:** GitHub, LinkedIn, Instagram y WhatsApp (aprobado el 2026-11-10). El email y el teléfono personal nunca se publican.

## Stack

| Capa | Tecnología |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 + CSS nativo para animaciones |
| Hosting | GitHub Pages con GitHub Actions |
| Tipografías | Hiro Misake, Inter e IBM Plex Mono, auto-hospedadas en `woff2` |

Sin backend, sin cookies y sin router: el sitio es estático y la tarjeta usa un hash (`#tarjeta`), compatible con GitHub Pages sin reescrituras.

### Dependencias puntuales

- `html-to-image` + `jspdf`: generan el PNG y el PDF de la tarjeta. Se cargan con `import()` diferido, así que no pesan en la carga inicial.
- `qrcode` (dev): genera el SVG estático del QR mediante `npm run qr`. El cliente no carga ninguna librería de QR.
- `simple-icons`: logotipos de las tecnologías que se muestran en Skills.

## Cómo correr

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev      # servidor local
npm run build    # type-check + build de producción
npm run preview  # sirve el build
npm run lint     # ESLint
npm run qr       # regenera public/images/qr-whatsapp.svg (y pósteres ES/EN)
```

## Estructura

```
src/
├─ components/
│  ├─ layout/        Navbar, Footer
│  └─ shared/        piezas reutilizables (iconos, QR, selector de idioma, tema…)
├─ data/             profile, experience, skills, social-links, digital-card
├─ features/
│  ├─ home/          Hero
│  ├─ about/         About
│  ├─ experience/    Experience
│  ├─ skills/        Skills
│  ├─ contact/       Contact
│  └─ digital-card/  página #tarjeta, tarjeta visual y descargas
├─ hooks/            useHashRoute, useDocumentMeta, useScrollReveal
├─ i18n/             diccionario ES/EN, contexto y hook
├─ theme/            proveedor de tema claro/oscuro
└─ types/            tipos de contenido
public/
├─ fonts/            tipografías auto-hospedadas
├─ images/           foto, QR, imágenes de sección
└─ assets/           texturas y trazos sumi-e
scripts/             generador reproducible del QR
docs/                plan y ruta de ejecución
```

## Despliegue

Cada push a `main` dispara `.github/workflows/deploy.yml`: instala con `npm ci`, ejecuta `npm run lint` y `npm run build`, y publica `dist/` en GitHub Pages.

## Documentación

- [`docs/plan-portafolio.md`](docs/plan-portafolio.md) — objetivo, identidad, decisiones y datos del titular.
- [`docs/ruta-ejecucion.md`](docs/ruta-ejecucion.md) — fases, estado y criterios de salida.

## Estado

Fase 1 revisada; Fases 2 y 3 cerradas; Fase 6 casi cerrada (faltan el token de analítica, la decisión sobre WhatsApp y el deploy final). Fase 4 (proyectos) y Fase 5 (avatar) siguen abiertas; la sección de Proyectos se muestra como marcador hasta entonces.
