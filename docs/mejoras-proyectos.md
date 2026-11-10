# Mejoras visuales y de producto — 5 proyectos

> Trabajo autónomo solicitado el 2026-11-09. Se intervienen los 5 proyectos de `portafolio_proyectos` uno por uno.
> **Regla:** sin commits en ninguno de los 5 repos. Sin tocar variables de entorno: si algo depende de ellas, se salta y se sigue.
> **Limpieza:** al cerrar cada proyecto se bajan contenedores y se eliminan `node_modules`, `dist`, `.next`, cachés y temporales.

## Criterios de diseño (aplican a los 5)

1. **Jerarquía**: un solo foco por pantalla; titulares con escala clara, cuerpo legible (16px mínimo en móvil) y etiquetas consistentes.
2. **Ritmo vertical**: escala de espaciado repetible; secciones con aire y separadores intencionales.
3. **Color con propósito**: el acento se usa para acción/estado, no para decorar; contraste AA en texto y controles.
4. **Estados**: hover, focus visible, activo, disabled, carga, vacío y error. Nada de spinners infinitos sin mensaje.
5. **Responsive real**: 390 / 768 / 1440; navegación usable en móvil y desktop; nada de menús hamburguesa en desktop.
6. **Accesibilidad**: HTML semántico, `aria-*` donde hace falta, foco atrapado en menús/modales, `prefers-reduced-motion`.
7. **Microinteracciones sobrias**: transiciones de 150–300 ms; sin animaciones que bloqueen la lectura.
8. **Consistencia**: un solo sistema de botones, inputs, tarjetas y badges por proyecto.
9. **Sin datos inventados**: se conserva el contenido real; solo se reescribe copy de interfaz cuando aporta claridad.
10. **No romper**: build y rutas existentes siguen funcionando; los cambios se verifican con capturas.

---

## 1. Muiska — `muiska_services`

**Stack:** frontend vanilla JS + Vite + Tailwind 3 + SCSS; backend Express + PostgreSQL; Docker Compose.

**Diseño actual:** papel crema `#FFFAF4`, vino `#7B1826`, verde `#15665A`, Fraunces + Plus Jakarta Sans. Base cálida y artesanal; se conserva.

**Problemas detectados en auditoría de código:**

- [x] El layout raíz limita todo a `max-w-7xl`: los fondos de sección no son full-bleed en pantallas grandes.
- [x] La navegación de desktop está oculta (`hidden`) y todo vive en el menú hamburguesa.
- [x] El footer usa clases inexistentes (`text-text-secondary`, `text-text-tertiary`) y enlaces muertos (`/messages`, `#`).
- [x] Los enlaces del footer no pasan por el router: recargan la página completa.
- [x] `.btn--outline` está implementado como botón relleno (no es outline).
- [x] Variables SCSS duplicadas (sombras y transiciones declaradas dos veces).
- [x] Sin `:focus-visible` global, sin skip-link, sin `prefers-reduced-motion`.
- [x] El hero centra todo el texto sobre una foto con overlay muy plano; falta composición editorial.
- [x] Caracteres de control/emoji sueltos al final de CTAs (`Explore now `, `Register `).
- [x] Inputs de contraseña con placeholder vacío; sin toggle de visibilidad ni `autocomplete`.
- [x] Tarjetas de publicación con imagen ausente en la portada y favoritos sin estado accesible.

**Plan de intervención:**

- [x] Tokens y base: deduplicar SCSS, arreglar `.btn--outline`, añadir foco global, selección, skip-link y motion reducido.
- [x] Layout: quitar el `max-w` del shell; navbar y footer con contenedor interno; fondo de secciones a ancho completo.
- [x] Navbar: recuperar navegación desktop, estados activos, `aria-expanded`, cierre con Escape y click fuera, menú móvil con bloqueo de scroll.
- [x] Footer: enlaces reales (`/chat`), estilos correctos, jerarquía de marca y cierre.
- [x] Home: hero editorial a dos columnas en desktop (texto + imagen), overlay más limpio, franja de confianza, categorías y destacados refinados, "How it works" con numeración editorial y CTA final.
- [x] Tarjetas: portada con imagen consistente, hover sobrio, badge de estado, precio y ubicación jerarquizados.
- [x] Auth: layout a dos paneles con marca, inputs con `autocomplete`, toggle de contraseña, errores inline.
- [x] Verificación: build del frontend y capturas 1440/390 de Home, Explore, Login y Dashboard.

**Estado:** completado.

**Cambios aplicados:**

- **Bug de migración corregido** en `005_verification.sql`: el índice `idx_users_verified_by` se creaba antes de la columna `verified_by`. El stack Docker levanta y la API responde.
- **Base visual:** `globals.css` reescrito con foco visible, skip-link, selección, scrollbar, `prefers-reduced-motion` y tipografía base. `_variables.scss` deduplicado. `.btn--outline` ahora es outline real.
- **Fix crítico de layout:** `_layout.scss` definía `.hidden { display:none !important }` y utilidades `hidden-sm/md/lg/xl`; eso anulaba `hidden md:flex` y `sm:inline-flex`. Se eliminaron y la navbar/hero/auth recuperaron sus breakpoints.
- **Shell y router:** `App.js` con skip-link, delegación global de enlaces internos, ancho `max-w-7xl` solo en rutas internas, scroll al cambiar de ruta y soporte de anclas (`/#Categories`).
- **Navbar:** navegación desktop junto al logo, estados activos, dropdowns accesibles (Escape, click fuera), menú móvil con bloqueo de scroll y notificaciones con "Mark all read".
- **Footer:** marca con `Logo.png`, enlaces reales (`/explore`, `/create`, `/chat`, `/dashboard`, cuenta según sesión), botón "Back to top" y sin redes falsas.
- **Home:** hero editorial a dos columnas con imagen y tarjetas flotantes, franja de valor, categorías, destacados, "How it works" numerado y CTA final. Sin métricas inventadas.
- **Home JS:** escape de HTML, categorías con descripción, precios "Free", estados vacío/error con reintento, favoritos vía `toggleFavorite`.
- **Tarjetas:** `PublicationCard` y `ListingCard` rediseñadas con portada, badge, favorito accesible, precio, ubicación y CTA. `ListingCard` ahora escapa HTML.
- **Explore:** filtros y estados vacío/error pulidos; placeholder de barrio acortado.
- **Auth:** Login y Register a dos paneles, toggle de contraseña, `autocomplete`, errores con `role="alert"` y foco, validaciones y copy consistentes. Marca móvil duplicada eliminada.
- **Dashboard:** placeholders `{{total}}`, `{{active}}`, `{{sold}}` corregidos (antes `-`); perfil muestra `Member · Joined {{userSince}}`.

**Verificación:** build Docker del frontend verde; capturas 1440/390 de Home, Explore, Login, Register y Dashboard autenticado; sin errores de consola. `docker compose down -v`, imágenes locales eliminadas y `node_modules`/`dist` inexistentes. Repo con cambios locales sin commit, como se pidió.

---

## 2. MineRoyal — `multicine-frontend`

**Stack:** React 19 + Vite + Tailwind 4 + Radix + react-router + TanStack Query. Tiene `DESIGN.md`.

**Plan:** auditoría de `DESIGN.md`, tokens y pantallas principales; luego intervención.

**Estado:** pendiente.

---

## 3. Multitenant (Lixus) — `multitenant`

**Stack:** backend Django + frontend Next.js (App Router) + Docker.

**Plan:** auditoría de `docs/` y pantallas del frontend; luego intervención.

**Estado:** pendiente.

---

## 4. Omegacomplex — `omegaComplex`

**Stack:** Next.js 16 + Prisma + Tailwind 4 + Radix + Three.js + Stripe/Resend (integración condicionada a env).

**Plan:** auditoría de `requisitos.md`, `AGENTS.md` y pantallas; luego intervención.

**Estado:** pendiente.

---

## 5. AlegrIA — `AlegrIA`

**Stack:** React 18 + Vite 5 + Tailwind 3 + Three.js/R3F + GSAP + Lenis.

**Plan:** auditoría de la landing 3D y su fallback; luego intervención.

**Estado:** pendiente.

---

## Registro de verificación

| Proyecto | Build | Capturas | Limpieza |
|---|---|---|---|
| Muiska | verde (Docker) | 1440/390 Home, Explore, Login, Register, Dashboard | contenedores, volúmenes e imágenes eliminados |
| MineRoyal | pendiente | pendiente | pendiente |
| Multitenant | pendiente | pendiente | pendiente |
| Omegacomplex | pendiente | pendiente | pendiente |
| AlegrIA | pendiente | pendiente | pendiente |
