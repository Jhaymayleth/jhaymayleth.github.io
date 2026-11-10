# Portafolio profesional — José Mauricio Rangel Núñez

> Documento de decisiones y contexto del titular. La ruta de ejecución paso a paso está en `docs/ruta-ejecucion.md`.

**Repositorio:** `jhaymayleth.github.io`  
**Alojamiento:** GitHub Pages (frontend estático, sin backend)  
**Última actualización:** 2026-11-06

---

## 1. Objetivo

Construir un portafolio que represente la identidad de **José Mauricio Rangel Núñez** como desarrollador de software.

- No es una plantilla genérica ni una página que parezca generada automáticamente por IA.
- Debe ser memorable, moderno, elegante, interactivo y visualmente impresionante.
- Orientado a **ofertas laborales tech**. Cualquier persona puede verlo, pero está dirigido a mi versión tech, que es lo que me destaca.
- Los proyectos se presentan como **casos de estudio reales**: problema, contexto, responsabilidades, decisiones técnicas, tecnologías y aprendizajes. No inventar resultados, métricas ni funcionalidades no implementadas.
- No hay experiencia laboral: mi experiencia es **formativa y son mis proyectos**. Por eso "experiencia" = proyectos.

## 2. Objetivo de visita, CTA y medición

| Tema | Decisión |
|---|---|
| **Objetivo #1 cuando alguien entra** | Que vean mis proyectos |
| **CTA principal** | `Ver mis proyectos` → lleva a Proyectos |
| **Sensación en los primeros 10 segundos** | Impacto inmediato de creatividad, dedicación y detalle. Que los detalles hablen por sí solos. Los visitantes ven portafolios todos los días: mi portafolio compite contra los demás, busco ser el mejor |
| **Medición** | Seguimiento de visualizaciones: cuántos lo han visto (no quiénes) |

## 3. Perfil profesional

**Nombre:** José Mauricio Rangel Núñez

**Perfil:** Estudiante de Ingeniería de Software, desarrollando perfil Full Stack / Software Developer.

> El CV entregado el 2026-11-06 es la fuente vigente para Experience y Skills. La lista de abajo es el contexto previo del titular y puede incluir tecnologías que el CV no menciona; ante duda, manda el CV.

### Tecnologías y conocimientos

- JavaScript y TypeScript
- React y Next.js
- HTML y CSS
- Python
- Node.js y Express
- SQL y bases de datos (PostgreSQL, Supabase, ORM)
- AWS
- Git y GitHub
- Vite
- Tailwind CSS
- Automatización de flujos con IA

### Experiencia formativa (proyectos)

Riwi (formación Full Stack) y Universidad de Cartagena (Ingeniería de Software). Los detalles están en el CV y en `src/data/experience.ts`.

## 4. Identidad, tono y alcance

### Identidad visual

- Anime con **estilo japonés moderno**: creativo, innovador, único, limpio y destacable.
- No es un portafolio anime: es una identidad web japonesa moderna y profesional, con el avatar anime aportando la personalidad.
- La referencia inicial a los **Torii** quedó como antecedente. La identidad vigente (commit `style: refine portfolio visual identity`) trabaja carmesí sobre papel washi e tinta sumi, con tema claro/oscuro.

| Lo que quiero proyectar | Lo que NO quiero proyectar |
|---|---|
| Puedo hacer cosas grandes | Genérico |
| Creativo | Frío |
| Imponente | Común |
| | Plano |

### Claim personal (aceptado)

- **ES:** `Interfaces que se sienten, sistemas que sostienen.`
- **EN:** `Interfaces you feel, systems that hold.`

### Idioma y tono del copy

- **Idioma:** bilingüe completo **ES / EN**.
- **Tono (mezcla, aceptado):** creativo/editorial en titulares + neutro profesional en cuerpo. Es para personas y para empresas a la vez.

### Referentes visuales

- Sin referentes concretos entregados aún.

### Paleta vigente

| Elemento | Color |
|---|---|
| Papel (Washi) | `#f7f5f0` |
| Papel profundo | `#ece9e2` |
| Tinta (Sumi) | `#0e100f` |
| Tinta suave | `#616763` |
| Carmesí (principal) | `#a51c30` |
| Carmesí brillante (hover) | `#c8102e` |
| Carmesí sobre bloque oscuro | `#ff929a` |

- Tema claro y oscuro con `data-theme` en `<html>`; sigue al sistema si el visitante no elige.
- Reemplaza a la paleta Torii/Indigo (Washi `#F4F1EA`, Sumi `#111827`, Torii `#D64533`/`#E03E2D`, Indigo `#2B4C9A`) y, antes, a Cobalt/Coral.

### Tipografía aceptada

- **Display:** Hiro Misake
- **Texto:** Inter
- **Mono / etiquetas técnicas bilingües:** IBM Plex Mono
- Las 3 auto-hospedadas en `woff2` en `public/fonts/`, con `preload` y `@font-face` + `font-display: swap`. Sin Google Fonts.
- Hiro Misake se conserva. Inter + IBM Plex Mono reemplazan a Manrope como pareja.

## 5. Fotografía real y avatar anime

### 5.1 Fotografía real (Home)

- Debe mostrar la verdadera apariencia del titular.
- Archivo fuente: `public/images/profile.png`
- **Conservar tal como es.** No modificar rasgos faciales, no retocar, no mejorar artificialmente, no convertir en anime.
- Servir derivados responsive WebP (`profile-480.webp`, `profile-840.webp`, `profile-1080.webp`) con `srcset` desde el código. El PNG de 1.7 MB queda solo como fuente en repo, no se sirve a visitantes.

### 5.2 Avatar ilustrado (guía del portafolio)

- Avatar anime basado en la fotografía real, personaje independiente de la foto.
- No sustituye el retrato en el Home.
- Función: mini-ayudante guía, pequeño y amigable. Es la primera curiosidad del visitante. Merodea por la pantalla; unos **3 segundos después se sorprende del visitante**, le da la bienvenida y **se presenta como si fuera el titular cara a cara**, mostrando personalidad y respondiendo preguntas adicionales sobre el portafolio.
- Ciclo: **click sobre el avatar = pausa** (para explorar). Al pulsar continuar, el avatar **no retoma desde donde quedó**: habla con naturalidad con frase puente (ej. "bueno, como te venía contando, José puede hacer…" — ejemplo del titular, guión final por aprobar).
- Control de voz: pulsar sobre el avatar.
- Herramientas: Krita 5.2.2 (raster por capas), React + TypeScript, CSS, OpenCode/DeepSeek para código. Sin Rive, Live2D ni pagos. Sin ComfyUI por ahora. Sin motor externo para empezar.
- Estrategia: PNG transparentes separados por partes (cuerpo, cabello, ojos, boca, expresiones) combinados/controlados desde React.
- La programación con IA genera código, no sustituye la creación artística.

**Estados base:** `idle` (respiración/parpadeo), `talking` (boca), `thinking`, `explaining`, `happy`. El titular acepta que se propongan los estados necesarios según el comportamiento descrito (ej. sorpresa inicial) y los apruebe.

**Voz:** sintética TTS, masculina joven, amigable y natural. Solo tras decisión del visitante (respetar autoplay). Permitir activar/desactivar, pausar, repetir y navegar sin audio.

**Guión:** producir borrador de guión + lista de preguntas/respuestas sobre portafolio y perfil para aprobación del titular.

## 6. Contenido del sitio

### 6.1 Home / Hero

Todo el Home actual es propenso a cambiar. No asumir que queda como está (slogan anterior "Construyo ideas. / Creo experiencias digitales." era de IA y se descarta).

- **Titular:** el claim aceptado de la Sección 4.
- **Subtítulo recomendado pendiente de aprobación:** rol + stack + ubicación/remoto.
- **Badge de disponibilidad:** Barranquilla, Colombia. **Disponible nacional o remoto.** Viaja dentro de Colombia. **NO internacional** (sin pasaporte; corrección explícita del contexto anterior).
- **Botones del hero:** propensos a cambiar.
- **Marca/nav:** logotipo propio, marca del titular (no "JMR." por defecto).
- **Footer del hero** (`SCROLL TO DISCOVER / 01 — 06`): propenso a cambiar. La numeración debe coincidir con la cantidad real de secciones finales.

### 6.2 About / Experience / Skills

- **About:** incluye **foto adicional** además de la del Home. Datos desde el CV.
- **Experience:** experiencia formativa = proyectos (ver Sección 7). Datos desde el CV.
- **Skills:** **logos / stack visual** (opción c).
- **Aprendiendo actualmente:** sección sí.
- **Idiomas:** español nativo, inglés B2 en formación.

### 6.3 Proyectos (5 finales)

Los 5, en orden de revisión ascendente (1 → 5):

| # | Nombre público | Repo | Nota |
|---|---|---|---|
| 1 | Muiska | `https://github.com/Jhaymayleth/muiska_services.git` | Mostrar como **Muiska** |
| 2 | MineRoyal | `https://github.com/Jhaymayleth/cine_dev.git` | Multicine / cine-dev. Marca pública: **MineRoyal** |
| 3 | Multitenant | `https://github.com/Jhaymayleth/multitenant.git` | Proyecto en desarrollo temprano (confirmar al levantarlo) |
| 4 | Omegacomplex | `https://github.com/LaoraSad/omegaComplex.git` | |
| 5 | AlegrIA | `https://github.com/xDemoxz/AlegrIA.git` | Proyecto agregado al final |

- **ELYSIA queda fuera.** No se muestra.
- Repos públicos de los 5.
- Cuenta Vercel ya lista, falta desplegar cada proyecto por separado.
- **Nivel del caso de estudio:** tarjeta + página de detalle (problema, decisiones técnicas, aprendizajes).
- **Contenido sensible:** no hay información delicada (proyectos formativos). **Screenshots sí** pueden aparecer. **Código NO debe aparecer** — nada técnico.
- **Video demo por proyecto:** 8-15 seg mostrando **login y luego el home**, con credencial de **administrador** que contiene todas las vistas y funcionalidades.
- Datos pendientes por proyecto (no inventar): año/período, rol exacto, problema en 2-3 líneas del titular, stack exacto.

### 6.4 Tarjeta digital, QR, contacto

- **Tarjeta digital con QR:** QR redirige al portafolio. Tarjeta con información relevante: nombre, foto, monograma, slogan/claim, ubicación y redes sociales. Nada más.
- **Página exclusiva:** vive en `#tarjeta` (hash, sin router, compatible con GitHub Pages) y se abre desde un botón en Contacto.
- **Descargas:** PDF, PNG y `.vcf` para importar contacto.
- **QR:** SVG estático generado con `qrcode` (devDependency) mediante `npm run qr`; no se carga ninguna librería de QR en el cliente.
- **PNG/PDF:** se rasterizan con `html-to-image` y `jspdf`, cargados con `import()` diferido para no pesar en la carga inicial.
- **Contacto vía:** perfiles públicos. No hay formulario ni email en la web.

#### Datos públicos vs privados (decisión del titular)

**Publicados en la web (solo estos):**

- GitHub: `https://github.com/Jhaymayleth`
- LinkedIn: `https://www.linkedin.com/in/jose-mauricio-rangel-nuñez-89b730376/`
- Instagram: `https://www.instagram.com/dylan_.rn`

**NUNCA públicos en la web:**

- Email: privado, no se documenta en el repo
- Teléfono: privado, no se documenta en el repo
- WhatsApp: privado, no se documenta en el repo

El `.vcf` incluye **solo datos públicos**: nombre, rol, ubicación, URL del portafolio y los tres perfiles. Sin email ni teléfonos. La misma regla aplica a PNG y PDF.

**CV PDF:** entregado el 2026-11-06 y ya aplicado a Experience y Skills. About sigue pendiente de redacción.

## 7. Decisiones técnicas aceptadas

| Tema | Decisión |
|---|---|
| Stack del portafolio | React + TypeScript + Vite + Tailwind CSS 4, GitHub Pages + Actions. Sin Next.js |
| Tailwind vs CSS | Adoptar **Tailwind 4** para layout/utilidades; CSS nativo solo para animaciones cinemáticas del avatar/proyectos |
| Sistema de idioma | **Diccionario tipado + contexto React**, sin rutas `/es` `/en`. Razón: GitHub Pages no tiene backend, una sola URL evita el fallback de `404.html` y la duplicación de rutas. Detecta idioma del navegador, persiste en `localStorage` y sincroniza `<html lang>` |
| Animaciones | Gestos en click/hover/scroll, scroll **cinemático** desde diferentes ángulos, no solo lineal. Proyectos con **salto espacial** entre proyectos, clicks para salto rápido, scroll que avanza mientras habla el avatar, pausa al click y retoma al click en avatar. Respetar `prefers-reduced-motion` y teclado |
| Analítica | Sin cookies. Contar cuántos, desde dónde, con qué dispositivo (no quiénes). GitHub Traffic + Cloudflare Web Analytics (beacon libre, sin cookies) |
| Dominio | `jhaymayleth.github.io`. SEO ok: OpenGraph/Twitter, canonical, JSON-LD Person, `robots.txt`, `sitemap.xml` |
| Datos de proyectos | El agente decide lo mejor (ej. `src/data/projects.ts` + tipos en `src/types/`) |
| Dependencias | Evitar innecesarias. Cada librería con razón técnica clara |
| Límites | Sin datos ni clientes reales. Screenshots sí, código nunca |
| Revisión final | Solo el titular |
| Prioridad dispositivo | Desktop |
| Objetivo de publicación | **Lunes 9 de noviembre de 2026** (extendido el 2026-11-06; antes viernes 6) |

### Entorno del titular

- Ubuntu 24.04.4 LTS, Intel Core i5-12400, 16 GB RAM, Intel UHD 730 (sin GPU dedicada).
- Node.js 24.18.0, npm 12.0.2, Git 2.43.0, Krita 5.2.2.
- No recomendar modelos locales pesados ni generación de imágenes con GPU potente.

## 8. Estado real del repo (actualizado al 2026-11-09)

**Implementado:**

- React 19.3 + TypeScript 6 + Vite 8 + Tailwind 4.3.
- `vite.config.ts` con `react()` + `tailwindcss()`, `base: '/'` correcto para sitio de usuario.
- `.github/workflows/deploy.yml` con Node 22, `npm ci`, `npm run lint`, build y deploy a Pages.
- Estructura `src/features/{home,about,experience,projects,skills,contact,avatar,digital-card}`, `components/{layout,ui,shared}`, `data`, `types`, `hooks`, `styles`, `i18n`.
- Paleta carmesí/papel/tinta en `@theme` (`#a51c30`, `#c8102e`, `#f7f5f0`, `#0e100f`) con tema claro/oscuro. Reemplaza Torii/Indigo.
- Tipografías Hiro Misake + Inter + IBM Plex Mono auto-hospedadas en `public/fonts/` con `preload` de las dos primeras caras. Manrope eliminada. Hiro Misake excluye del `unicode-range` las vocales acentuadas y la ñ (el archivo las mapea a la letra base).
- `App.tsx` solo compone. `src/App.css` eliminado: layout en Tailwind, CSS nativo solo para skip-link, tokens y `prefers-reduced-motion`.
- `components/layout/Navbar.tsx`: sticky, brand propio, menú móvil con bloqueo de scroll, focus trap, cierre con `Escape` y retorno de foco.
- `components/layout/Footer.tsx` con solo GitHub/LinkedIn/Instagram desde `src/data/social-links.ts`.
- `features/home/Hero.tsx`: claim bilingüe, badge Barranquilla nacional/remoto, CTA `Ver mis proyectos`, foto WebP con `srcset`, numeración `01 — 06`.
- `features/about/About.tsx`: perfil, formación y ficha en dos idiomas, solo con hechos del CV.
- `features/contact/Contact.tsx`: únicamente GitHub, LinkedIn e Instagram, más el botón `Ver mi tarjeta digital`.
- `features/digital-card/`: página `#tarjeta` con tarjeta visual, QR, compartir/copiar enlace y descargas `.vcf`/PNG/PDF.
- Bilingüe ES/EN completo en la infraestructura (`src/i18n/`) y en Hero, About, Experience, Skills, Contact, navbar, footer y tarjeta. Selector ES/EN en navbar y en la tarjeta.
- `src/data/` con `profile.ts`, `experience.ts`, `skills.ts`, `social-links.ts`, `digital-card.ts`; tipos en `src/types/content.ts`.
- `features/experience/Experience.tsx` con Riwi y Universidad de Cartagena desde el CV.
- `features/skills/Skills.tsx` con grupos de stack, "aprendiendo ahora", habilidades humanas e idiomas.
- Numeración coherente: 01 Home, 02 About, 03 Experiencia, 04 Skills, 05 Proyectos, 06 Contacto.
- SEO técnico: canonical, OG/Twitter, JSON-LD `Person`, `robots.txt`, `sitemap.xml`, metadatos sincronizados con idioma y vista (`useDocumentMeta`).
- Accesibilidad: skip-link, menú con `aria-expanded`/`aria-controls`, `:focus-visible`, `aria-live` en descargas, `prefers-reduced-motion`.

**Deuda / pendiente:**

1. Proyectos sigue como placeholder marcado ("Contenido en preparación"). About y Contacto ya son secciones reales.
2. Skills sin logos: el stack visual de la Sección 6.2 sigue como texto mono agrupado.
3. Faltan datos de los 5 proyectos, foto adicional para About, logotipo propio (la tarjeta usa el monograma tipográfico `MR`) y guión del avatar.
4. `og-cover.png` (1200×630) pendiente de entrega; los metadatos ya apuntan a `public/images/og-cover.png`.
5. Cloudflare Web Analytics queda documentada y desactivada hasta recibir el token real.
6. Revisión visual del Home (Fase 1) pendiente: no hay capturas ni lista de ajustes aprobada.
7. Inconsistencia menor en el CV: Riwi figura como 16 de febrero en formación y 17 de febrero en experiencia. La web usa "Febrero 2026" hasta que el titular confirme.

## 9. Ideas pendientes (datos que faltan del titular)

1. ~~CV PDF~~ **entregado el 2026-11-06**, aplicado a About, Experience y Skills. Falta la foto adicional de About y el relato personal.
   - LinkedIn e Instagram **entregados**: ver §6.4.
2. Por cada proyecto (5): año/período, rol exacto, problema en 2-3 líneas, stack exacto.
3. Guión del avatar por aprobar (borrador + preguntas/respuestas).
4. ~~Alcance del `.vcf`~~ **resuelto**: solo datos públicos, sin email ni teléfonos.
5. Logotipo propio (marca) — pendiente; la tarjeta usa el monograma tipográfico `MR` como provisional.
6. Referentes visuales concretos (si los hay).
7. `og-cover.png` 1200×630 para compartir en redes — pendiente de entrega.
8. Token de Cloudflare Web Analytics — pendiente; la integración queda preparada y desactivada.

## 10. Cómo trabajar

- Trabajar paso a paso. No avanzar diez etapas de golpe.
- Indicar exactamente qué archivo crear o modificar. Si se reemplaza un archivo completo, proporcionar el contenido completo. Si es parcial, señalar dónde.
- Explicar brevemente por qué se toma cada decisión técnica.
- No repetir preguntas ya definidas. No inventar experiencia, proyectos o contacto.
- No instalar dependencias sin justificar necesidad técnica. Comprobar compatibilidad antes de instalar.
- No convertir el proyecto en un monolito. Arquitectura modular, escalable y mantenible.
- Tener en cuenta GitHub Pages (sin backend). Evitar decisiones que compliquen rendimiento o carga.
- Actuar como arquitecto de software y desarrollador frontend senior que acompaña, no como generador de código sin planificación.
- No tomar decisiones por el titular: proponer y esperar aprobación.

---

*Fuente: contexto del titular + auditoría del repo + respuestas de la Fase 0 + CV entregado el 2026-11-06. Este documento corrige versiones anteriores (ELYSIA fuera, Multicine = MineRoyal, paleta y tipografías nuevas, disponibilidad nacional/remoto). La ruta de ejecución está en `docs/ruta-ejecucion.md`.*
