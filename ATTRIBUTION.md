# Atribución — Ink Bleed theme transition

La transición de tema con animación de tinta ("ink bleed") incluida en este
proyecto se basa en el concepto de **Codemure**:

- **Repositorio original:** <https://github.com/codemure-official/ink-bleed-theme-changer>
- **Licencia del motor:** MIT (ver [`LICENSE`](LICENSE))
- **Autores del motor:** Codemure (https://www.codemure.com)

El motor WebGL2 + captura de página + fallback CSS fue adaptado a React 19 + Vite
8 + Tailwind CSS 4 y adaptado a la identidad visual del portafolio (tintas
`#0e100f` / `#f7f5f0`, tipografías Hiro Misake / Inter / IBM Plex Mono
auto-hospedadas). El shader de fragmento, el ruido de gradiente y la lógica de
expansión se mantienen fielmente al original; lo que cambió es la integración
con el DOM vivo (React `ThemeProvider`) y el soporte de capturas con
`html2canvas-pro` (el `html2canvas` estándar no parsea `color-mix(in oklab)`).

El contenido del portafolio y la tarjeta digital son originales de José Mauricio
Rangel Núñez y no corresponden a trabajo de Codemure.