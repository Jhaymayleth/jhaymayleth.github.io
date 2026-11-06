# Ruta de ejecución — Portafolio de José Mauricio Rangel Núñez

> Paso a paso por fases para no olvidar nada. El contexto y las decisiones están en `docs/plan-portafolio.md`.

**Repositorio:** `jhaymayleth.github.io` / **Alojamiento:** GitHub Pages, frontend estático  
**Última actualización:** 2026-11-06

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
- [x] Definir Tailwind 4 + CSS para animaciones, analítica sin cookies, dominio con SEO
- [x] Recibir del titular: CV PDF (**entregado el 2026-11-06**)
- [ ] Recibir del titular: datos por proyecto, logotipo, alcance del `.vcf`, guión del avatar

**Criterio de salida:** decisiones en `docs/plan-portafolio.md` y datos faltantes listados en §9 del mismo documento.

---

## Fase 1 — Revisión visual del Home [PENDIENTE]

> La Fase 2 se ejecutó primero por decisión del titular (2026-11-06). Esta revisión se hace ahora sobre el Home ya modular, después de cerrar la Fase 3.

**Objetivo:** verificar composición actual antes de construir más funcionalidades. No asumir que el Home queda como está.

**Pasos:**

1. Levantar local: `npm run dev` (o `preview` sobre build).
2. Capturar desktop 1440px y móvil 390px.
3. Revisar: composición texto/imagen, contraste, responsive, accesibilidad, foto real sin retocar, balance visual del hero.
4. Producir lista exacta de correcciones archivo por archivo y pedir aprobación del titular.

**Archivos tocados en esta fase:** ninguno salvo los mínimos aprobados. No construir About/Proyectos/Avatar/Tarjeta.

**Criterio de salida:** capturas desktop + móvil revisadas y lista de ajustes aprobada.

---

## Fase 2 — Arquitectura modular + sistema visual [COMPLETADA 2026-11-06]

**Objetivo:** dejar de construir sobre el monolito `App.tsx`/`App.css` y aplicar el nuevo sistema visual (claim, Torii/Indigo, Hiro Misake + Inter + IBM Plex Mono, badge Barranquilla).

**Pasos:**

1. [x] Extraer `components/layout/Navbar.tsx` (marca propia, sticky, menú móvil con bloqueo de scroll + focus trap, cierre con `Escape`).
2. [x] Extraer `components/layout/Footer.tsx`.
3. [x] Extraer `features/home/Hero.tsx` (claim bilingüe, badge Colombia/remoto, CTA `Ver mis proyectos`, numeración de secciones real).
4. [x] Extraer componentes compartidos a `components/{ui,shared}/` según uso real (`SectionHeader`, `SectionPlaceholder`).
5. [x] Migrar estilos: utilidades **Tailwind 4** para layout; CSS nativo solo para animaciones. `src/App.css` eliminado.
6. [x] Reemplazar sistema tipográfico a Hiro Misake + Inter + IBM Plex Mono, auto-hospedadas `woff2` en `public/fonts/`, con `preload` en `index.html`.
7. [x] Reemplazar paleta a Washi `#F4F1EA` + Sumi `#111827` + Torii `#D64533/#E03E2D` + Indigo `#2B4C9A`.
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
4. [x] `features/skills/Skills.tsx` — stack + "aprendiendo actualmente". Los **logos** siguen pendientes (hoy es texto mono agrupado).
5. [x] `features/contact/Contact.tsx` — solo enlaces públicos (GitHub, LinkedIn, Instagram). Email/teléfonos NO en web.
6. [x] Datos centralizados en `src/data/` + tipos en `src/types/` (`profile.ts`, `experience.ts`, `skills.ts`, `content.ts`).
7. [x] Bilingüe completo ES/EN: sistema resuelto como **diccionario tipado + contexto React**, sin rutas. Cubre Hero, About, Experience, Skills, Contact, navbar y footer.

**Criterio de salida:** navegación Home → About → Experience → Skills → Contact sin placeholders, bilingüe, sin datos privados en web. **Cumplido**, salvo que Proyectos sigue como placeholder hasta la Fase 4 (fuera de esta fase).

---

## Fase 4 — Proyectos multi-tecnología (1 → 5, secuencial con limpieza)

**Objetivo:** los 5 proyectos como casos de estudio reales (tarjeta + página de detalle), con capturas/video reales y enlaces live a Vercel.

**Orden exacto (no paralelizar):**

| # | Nombre público | Repo | Nota |
|---|---|---|---|
| 1 | Muiska | `https://github.com/Jhaymayleth/muiska_services.git` | Mostrar como Muiska |
| 2 | MineRoyal | `https://github.com/Jhaymayleth/cine_dev.git` | Multicine / cine-dev |
| 3 | Multitenant | `https://github.com/Jhaymayleth/multitenant.git` | Desarrollo temprano (verificar al levantar) |
| 4 | Omegacomplex | `https://github.com/LaoraSad/omegaComplex.git` | |
| 5 | AlegrIA | `https://github.com/xDemoxz/AlegrIA.git` | |

ELYSIA fuera. Cuenta Vercel lista, despliegue por separado.

### Flujo por proyecto (repetir 5 veces, de a uno)

1. **Ubicar o clonar:** revisar en la PC si ya está clonado (sin clonar de nuevo si existe). Si no existe, clonar en carpeta temporal aprobada (fuera de `jhaymayleth.github.io`).
2. **Inspeccionar sin instalar:** stack real (`package.json`, `*.csproj`, `composer.json`, `requirements.txt`, etc.), README, `.env.example`, scripts.
3. **Instalar solo lo necesario** (`npm ci` o equivalente) y levantar (`dev` / `preview`).
4. **Verificar:** build sin errores, sin 404, imágenes/rutas rotas, variables de entorno faltantes, responsive desktop/móvil, consola limpia, accesibilidad mínima.
5. **Capturar y grabar con Playwright:**
   - `preview-desktop.webp` (1440px)
   - `preview-mobile.webp` (390px)
   - 2-3 capturas de secciones clave, WebP optimizado
   - `demo.mp4` 8-15s sin audio en loop: **login → home** con credencial admin. Poster = captura desktop. Respetar `prefers-reduced-motion`.
   - Ubicación: `public/projects/<slug>/`
6. **Dejar listo para Vercel:** rutas/assets compatibles, `vercel.json` solo si el framework lo necesita, lista de variables de entorno.
7. **Detener servidor y limpiar YA:** eliminar `node_modules`, `dist`, `build`, `.next`, cachés de Vite/build y temporales. Verificar espacio liberado. No acumular instalaciones de los 5 proyectos.
8. Reportar "listo para Vercel" o lista de correcciones. Pasar al siguiente solo al terminar la limpieza.

### Cierre de la fase

9. **Despliegue Vercel** (titular): 5 proyectos separados (Import → Deploy). Entregar URLs.
10. **Verificación por URL:** HTTP 200, sin 404, sin errores de consola, responsive desktop/móvil. Conectar a `src/data/projects.ts` y a `features/projects/` (tarjeta + página de detalle bilingüe).
11. Videos pesados a YouTube/Vimeo, no al repo.

**Criterio de salida:** 5 proyectos con build verificado, capturas WebP, video demo, enlace live verificado y tarjeta + detalle conectados.

---

## Fase 5 — Avatar anime raster + voz

**Objetivo:** guía interactivo y cinemático que presenta el portafolio como el titular cara a cara.

**Pasos:**

1. **Ilustración (titular, Krita):** capas PNG transparentes (cuerpo, cabello, ojos, boca, expresiones) basadas en foto real. Personaje independiente, pequeño y amigable.
2. **Máquina de estados React:** `features/avatar/` con `idle / surprise / talking / thinking / explaining / happy` (estados finales según guión). CSS: respiración, parpadeo, boca, gestos, hover/click.
3. **Comportamiento:** merodea → a los 3s se sorprende → bienvenida → habla/responde. **Click = pausa**; pulsar avatar = retoma con frase puente natural (no desde donde quedó).
4. **Guión:** borrador de bienvenida + explicación por proyecto + lista de preguntas/respuestas, aprobado por el titular.
5. **Voz:** TTS sintética masculina joven, amigable y natural. Solo tras clic del visitante (sin autoplay). Controles: activar/pausar/repetir/navegar sin audio. Pulsar sobre el avatar.
6. **Integración con Projects:** scroll cinemático con salto espacial entre proyectos; el avance acompaña la narración; pausa al click, retoma al click en avatar. Fallback vertical en móvil, teclado y `prefers-reduced-motion`.

**Criterio de salida:** avatar visible y animando correctamente, voz opt-in, navegación sin audio funcional, guión aprobado.

---

## Fase 6 — Tarjeta digital, QR, SEO, analítica y publicación

**Objetivo:** cerrar el portafolio para presentación pública (MVP).

**Pasos:**

1. `features/digital-card/` — tarjeta con nombre, foto, logotipo, claim, contacto relevante y redes sociales públicas. Nada más.
2. QR al portafolio + descargas **PDF, PNG y `.vcf`**. Alcance del `.vcf` según criterio final del titular (email/teléfonos solo ahí, nunca en web).
3. SEO: idioma correcto del `<title>` según bilingüe, OpenGraph/Twitter, canonical, JSON-LD Person, `robots.txt`, `sitemap.xml`.
4. Analítica sin cookies: GitHub Traffic (repo) + Cloudflare Web Analytics (beacon libre). Solo cuántos / desde dónde / dispositivo.
5. Reemplazar `README.md` con descripción, stack, cómo correr y estructura. Limpiar favicon.
6. `npm run build` verde, deploy a GitHub Pages verificado, revisión final solo por el titular.

**Criterio de salida:** sitio publicado sin placeholders, sin datos inventados ni código expuesto, build y deploy verificados.

---

## Orden de ejecución y dependencias

1. ~~Fase 1 (revisión Home)~~ → pendiente, movida después de Fase 3
2. Fase 2 (módulos + visual nuevo) → **completada**
3. Fase 3 (contenido) ∥ Fase 4 (proyectos, de a uno con limpieza)
4. Fase 5 (avatar, necesita ilustración del titular + guión aprobado)
5. Fase 6 (tarjeta/QR/SEO/publicación)

**Corte MVP para el lunes 9 de noviembre de 2026:** Home revisado modular, About/Experience/Skills/Contact bilingües, 4-5 proyectos con capturas+video+Vercel, avatar MVP, tarjeta/QR, publicado. Pulido v2 después: animaciones espaciales completas, guiones finos, detalles visuales.

**Regla anti-basura en toda la ruta:** no acumular `node_modules`, `dist`, cachés ni temporales. Limpiar en el momento tras cada proyecto.

---

*Actualizado el 2026-11-06: documentos reordenados a su archivo correcto, Fase 2 cerrada, Fase 3 en curso, publicación movida al lunes 9. Marcar cada checklist al cerrar su fase. Si surge una decisión nueva, registrarla en `docs/plan-portafolio.md` antes de implementarla.*
