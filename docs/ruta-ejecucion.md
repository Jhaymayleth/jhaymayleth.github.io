# Ruta de ejecución — Portafolio de José Mauricio Rangel Núñez

> Paso a paso por fases para no olvidar nada. El contexto y las decisiones están en `docs/plan-portafolio.md`.

**Repositorio:** `jhaymayleth.github.io` / **Alojamiento:** GitHub Pages, frontend estático<br />
**Web app externa:** avatar + experiencias de proyecto, repositorio y despliegue independientes (URL por definir)<br />
**Última actualización:** 2026-11-19

---

## Fase 0 — Recolección y conciliación [COMPLETADA]

- [x] Auditar repo vs contexto original
- [x] Definir objetivo, audiencia, CTA y medición
- [x] Definir identidad (japonés moderno), claim bilingüe y tono
- [x] Definir paleta Torii y tipografía (Hiro Misake + Inter + IBM Plex Mono, auto-hospedadas)
- [x] Definir disponibilidad (Barranquilla, nacional/remoto, sin internacional)
- [x] Definir alcance del portafolio: 5 proyectos, ELYSIA fuera, Multicine = MineRoyal
- [x] Definir contacto: solo GitHub/LinkedIn/Instagram públicos; email y teléfonos privados. LinkedIn e Instagram ya entregados
- [x] Definir avatar guía (merodea → sorpresa a 3s → bienvenida → habla → click pausa → retoma con frase puente)
- [x] Decidir separación: avatar y experiencias de proyecto en una web app externa; el portafolio solo enlaza (2026-11-19)
- [x] Definir Tailwind 4 + CSS para animaciones, analítica sin cookies, dominio con SEO
- [x] Recibir del titular: CV PDF (**entregado el 2026-11-06**)
- [ ] Recibir del titular: datos por proyecto, logotipo, guión del avatar y URL de la web app externa

**Criterio de salida:** decisiones en `docs/plan-portafolio.md` y datos faltantes listados en §9 del mismo documento.

---

## Fase 1 — Revisión visual del Home [REVISADA 2026-11-10]

> La Fase 2 se ejecutó primero por decisión del titular (2026-11-06). Esta revisión se hace ahora sobre el Home ya modular, después de cerrar la Fase 3.

**Objetivo:** verificar composición actual antes de construir más funcionalidades. No asumir que el Home queda como está.

**Pasos:**

1. [x] Levantar local: `npm run dev`.
2. [x] Capturar desktop 1440×900 y móvil 390×844.
3. [x] Revisar composición, contraste, responsive, foto real sin retocar y balance del hero.
4. [ ] Aprobar la lista de ajustes menores con el titular.

**Resultado de la revisión:**

- Desktop: hero equilibrado, claim en cuatro líneas, foto con marco y CTA jerarquizados. Sin desbordes ni elementos rotos.
- Móvil: badge en dos líneas, CTA a ancho completo y foto bajo el fold; comportamiento correcto y sin scroll horizontal.
- Sin bloqueantes. Ajustes opcionales: subir el contraste del riel vertical `01` y evaluar un tamaño de claim levemente menor en desktop para ganar aire.
- No se modificó ningún archivo del Home en esta fase.

**Archivos tocados en esta fase:** ninguno. No construir About/Proyectos/Avatar/Tarjeta.

**Criterio de salida:** capturas desktop + móvil revisadas y lista de ajustes aprobada. **Pendiente solo la aprobación del titular.**

---

## Fase 2 — Arquitectura modular + sistema visual [COMPLETADA 2026-11-06]

**Objetivo:** dejar de construir sobre el monolito `App.tsx`/`App.css` y aplicar el nuevo sistema visual (claim, Torii/Indigo, Hiro Misake + Inter + IBM Plex Mono, badge Barranquilla).

**Pasos:**

1. [x] Extraer `components/layout/Navbar.tsx` (marca propia, sticky, menú móvil con bloqueo de scroll + focus trap, cierre con `Escape`).
2. [x] Extraer `components/layout/Footer.tsx`.
3. [x] Extraer `features/home/Hero.tsx` (claim bilingüe, badge Colombia/remoto, CTA `Ver mis proyectos`, numeración de secciones real).
4. [x] Extraer componentes compartidos a `components/{ui,shared}/` según uso real (`SectionHeader` y shared reutilizables).
5. [x] Migrar estilos: utilidades **Tailwind 4** para layout; CSS nativo solo para animaciones. `src/App.css` eliminado.
6. [x] Reemplazar sistema tipográfico a Hiro Misake + Inter + IBM Plex Mono, auto-hospedadas `woff2` en `public/fonts/`, con `preload` en `index.html`.
7. [x] Reemplazar paleta a Washi + Sumi + Torii + Indigo (luego refinada a carmesí/papel/tinta con tema claro/oscuro; ver Fase 6 y `plan-portafolio.md` §4).
8. [x] Corregir deuda: brand `href="#"`, CTA saturada en móvil, fondos explícitos (sin `nth-of-type`), numeración de secciones, navbar sticky.
9. [x] Añadir al workflow un paso `npm run lint`.
10. [x] Limpiar assets de plantilla sin usar (`react.svg`, `vite.svg`, `hero.png`, `.ttf` redundante, Manrope). Mantener `profile.png` como fuente; servir WebP derivados.

**Archivos tocados:** `src/App.tsx`, `src/index.css`, `index.html`, `.github/workflows/deploy.yml`, `src/components/`, `src/features/home/`, `public/fonts/`.

**Criterio de salida:** `App.tsx` solo compone secciones, sin lógica ni estilos de features. Build y lint verdes. Sin dos sistemas tipográficos ni de color conviviendo. **Cumplido.**

---

## Fase 3 — Contenido base (About, Experience, Skills, Contact) [COMPLETADA 2026-11-06]

**Objetivo:** secciones reales bilingües con datos del CV, sin inventar métricas. Contacto público limitado a GitHub/LinkedIn/Instagram.

**Pasos:**

1. [x] Recibir y aplicar datos del CV: historia, hitos, experiencia formativa (aplicado a Experience y Skills).
2. [x] `features/about/About.tsx` — perfil, formación y ficha desde el CV. La **foto adicional** aún no existe: la sección funciona sin ella y se inserta cuando el titular la entregue.
3. [x] `features/experience/Experience.tsx` — experiencia formativa (= proyectos, ver Fase 4). Por ahora cubre Riwi y Universidad de Cartagena; falta enlazar proyectos.
4. [x] `features/skills/Skills.tsx` — stack + "aprendiendo actualmente". Logos integrados con `simple-icons` (`TechnologyMark`).
5. [x] `features/contact/Contact.tsx` — solo enlaces públicos (GitHub, LinkedIn, Instagram). Email/teléfonos NO en web.
6. [x] Datos centralizados en `src/data/` + tipos en `src/types/` (`profile.ts`, `experience.ts`, `skills.ts`, `content.ts`).
7. [x] Bilingüe completo ES/EN: sistema resuelto como **diccionario tipado + contexto React**, sin rutas. Cubre Hero, About, Experience, Skills, Contact, navbar y footer.

**Criterio de salida:** navegación Home → About → Experience → Skills → Contact sin placeholders, bilingüe, sin datos privados en web. **Cumplido**. Proyectos ya tiene su sección 05 de enlaces; la experiencia completa vive en la app externa (Fase 4).

---

## Fase 4 — Proyectos: sección 05 + experiencia externa

**Objetivo:** presentar los 5 proyectos desde el portafolio y abrir su experiencia interactiva en una web app externa. Este repo no aloja el motor de renderizado, las animaciones pesadas ni los videos.

**Hecho en este repo (2026-11-19):**

- [x] `src/data/projects.ts` con los 5 proyectos, descripciones cortas bilingües y stack.
- [x] `features/projects/ProjectLink.tsx` — tarjeta-enlace accesible, abre en pestaña nueva.
- [x] `features/projects/Projects.tsx` — sección `05`, encabezado, instrucción y listado.
- [x] `App.tsx` monta `<Projects />`; placeholder retirado.
- [x] Anclajes por proyecto: `#muiska`, `#mineroyal`, `#multitenant`, `#omegacomplex`, `#alegria`.
- [x] `projectsAppUrl` centralizada en `src/data/projects.ts` y apuntando a `https://kai-digital-phi.vercel.app/`.
- [x] `npm run lint` y `npm run build` verdes.

**Pendiente de verificación del despliegue externo:**

1. Verificar que `https://kai-digital-phi.vercel.app/` responde HTTP 200 tras el despliegue.
2. Verificar desde el portafolio que las 5 tarjetas abren el anclaje de proyecto correcto.
3. Revisar la app desplegada en escritorio y teléfono, incluyendo teclado y `prefers-reduced-motion`.
4. Completar casos de estudio, capturas y video si se decide incluirlos. No exponer código de los repositorios.

**Orden exacto (no paralelizar):**

| # | Nombre público | Repo | Nota |
|---|---|---|---|
| 1 | Muiska | `https://github.com/Jhaymayleth/muiska_services.git` | Mostrar como Muiska |
| 2 | MineRoyal | `https://github.com/Jhaymayleth/cine_dev.git` | Multicine / cine-dev |
| 3 | Multitenant | `https://github.com/Jhaymayleth/multitenant.git` | Desarrollo temprano (verificar al levantar) |
| 4 | Omegacomplex | `https://github.com/LaoraSad/omegaComplex.git` | |
| 5 | AlegrIA | `https://github.com/xDemoxz/AlegrIA.git` | |

ELYSIA fuera. Los repos son referencia interna; el portafolio no los enlaza. La cuenta Vercel está disponible para desplegar la app externa.

**Contenido de la app externa (no se ejecuta en este repo):**

- Auditar cada proyecto con `docs/mejoras-proyectos.md`; conservar el contenido real y no inventar métricas.
- Capturas WebP desktop/móvil y video 8-15s (login → home con credencial admin) para cada proyecto.
- Videos pesados a YouTube/Vimeo o al host de la app externa, nunca al repo del portafolio.
- La app externa puede usar Three.js/R3F, GSAP, Lenis, etc. El portafolio solo enlaza.

**Criterio de salida:** sección 05 publicada con 5 enlaces reales; cada enlace abre la experiencia correcta en la web app externa; sin assets pesados ni motor de renderizado en GitHub Pages.

---

## Fase 5 — Avatar anime raster + voz (web app externa)

**Objetivo:** guía interactivo y cinemático que presenta el portafolio como el titular cara a cara, dentro de la web app externa.

**Dónde vive:** en el repositorio externo, junto a la presentación de proyectos. `jhaymayleth.github.io` no monta el avatar ni carga sus capas.

**Pasos:**

1. **Ilustración (titular, Krita):** capas PNG transparentes (cuerpo, cabello, ojos, boca, expresiones) basadas en foto real. Personaje independiente, pequeño y amigable.
2. **Máquina de estados en el repo externo:** `idle / surprise / talking / thinking / explaining / happy` (estados finales según guión). CSS: respiración, parpadeo, boca, gestos, hover/click.
3. **Comportamiento:** merodea → a los 3s se sorprende → bienvenida → habla/responde. **Click = pausa**; pulsar avatar = retoma con frase puente natural (no desde donde quedó).
4. **Guión:** borrador de bienvenida + explicación por proyecto + lista de preguntas/respuestas, aprobado por el titular.
5. **Voz:** TTS sintética masculina joven, amigable y natural. Solo tras clic del visitante (sin autoplay). Controles: activar/pausar/repetir/navegar sin audio. Pulsar sobre el avatar.
6. **Integración con proyectos en la misma app externa:** scroll cinemático con salto espacial entre proyectos; el avance acompaña la narración; pausa al click, retoma al click en avatar.
7. **Enlace desde el portafolio:** la sección 05 abre la app externa; no se incrusta el avatar ni se cargan sus assets en GitHub Pages. Fallback vertical en móvil, teclado y `prefers-reduced-motion` dentro de la app externa.

**Criterio de salida:** avatar funcionando en la app externa, voz opt-in, navegación sin audio funcional, guión aprobado y enlace del portafolio verificado.

---

## Fase 6 — Tarjeta digital, QR, SEO, analítica y publicación [EN CURSO 2026-11-09]

**Objetivo:** cerrar el portafolio para presentación pública (MVP).

**Pasos:**

1. [x] `features/digital-card/` — página `#tarjeta` con tarjeta (nombre, foto, claim, rol, ubicación y perfiles), póster localizado ES/EN y monograma provisional `M` mientras no haya logo.
2. [x] QR de WhatsApp (`npm run qr` → `public/images/qr-whatsapp.svg`, más variantes por idioma) con el número visible + descargas **PDF, PNG, QR y `.vcf`**. El `.vcf` solo lleva datos públicos: nombre, rol, ubicación, portafolio, WhatsApp y perfiles; sin email.
3. [x] SEO: canonical, OpenGraph/Twitter, JSON-LD Person, `robots.txt`, `sitemap.xml`, `useDocumentMeta` y `og-cover.png` 1200×630 generado. Favicon propio en `public/favicon.svg`.
4. [x] Analítica sin cookies: GitHub Traffic (repo) + Cloudflare Web Analytics. El snippet queda documentado y **comentado** en `index.html` hasta recibir el token.
5. [x] Reemplazar `README.md` con descripción, stack, cómo correr y estructura.
6. [x] `og-cover.png` 1200×630 generado desde la identidad del sitio (claim, retrato y datos públicos).
7. [x] `npm run lint` y `npm run build` verdes (2026-11-10).
8. [ ] Deploy a GitHub Pages con estos cambios y verificación final del titular.

**Criterio de salida:** sitio publicado sin placeholders, sin datos inventados ni código expuesto, build y deploy verificados.

**Nota de cierre:** el `.vcf`, los metadatos, la imagen OG y el favicon ya están resueltos. WhatsApp quedó aprobado como dato público (2026-11-10) e incluido en la tarjeta y el `.vcf`. Faltan el token de analítica y la publicación del commit. La sección 05 ya está implementada como tarjetas-enlace; la experiencia completa de avatar + proyectos vive en la app externa, pendiente de URL y despliegue. El MVP puede publicarse con la sección 05, pero sus enlaces deben apuntar a la URL real antes de cerrar la fase.

---

## Orden de ejecución y dependencias

1. Fase 1 (revisión Home) → **revisada 2026-11-10**, pendiente aprobación de ajustes menores
2. Fase 2 (módulos + visual nuevo) → **completada**
3. Fase 3 (contenido) → **completada**; Fase 4 (sección 05 + app externa) → **sección 05 hecha; app externa pendiente**
4. Fase 5 (avatar en la app externa, necesita ilustración del titular + guión aprobado) → **pendiente**
5. Fase 6 (tarjeta/QR/SEO/publicación) → **casi cerrada**; faltan el token de analítica y la verificación final del deploy (WhatsApp ya aprobado como dato público)

**Corte MVP para el lunes 9 de noviembre de 2026:** Home revisado modular, About/Experience/Skills/Contact bilingües, sección 05 con 5 enlaces, app externa con avatar/experiencias si se alcanza, tarjeta/QR y publicación. Pulido v2 después: animaciones espaciales completas, guiones finos y detalles visuales en la app externa.

**Regla anti-basura en toda la ruta:** no acumular `node_modules`, `dist`, cachés ni temporales. Limpiar en el momento tras cada proyecto.

---

*Actualizado el 2026-11-19: se separó avatar + experiencias a una web app externa, se implementó la sección 05 con cinco tarjetas-enlace y se ajustaron las fases 4 y 5. Fase 1 revisada, Fase 2 y 3 cerradas, Fase 6 casi cerrada con tarjeta digital, QR, SEO, favicon, imagen OG y `.vcf`. Marcar cada checklist al cerrar su fase. Si surge una decisión nueva, registrarla en `docs/plan-portafolio.md` antes de implementarla.*
