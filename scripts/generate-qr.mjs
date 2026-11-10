import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import QRCode from 'qrcode'
import { siWhatsapp } from 'simple-icons'

/**
 * Genera el QR del portafolio y su versión SVG lista para compartir o imprimir.
 */
const SITE_URL = 'https://jhaymayleth.github.io/'
const output = resolve('public/images/qr-portfolio.svg')
const posterOutputs = {
  es: resolve('public/images/qr-portfolio-card-es.svg'),
  en: resolve('public/images/qr-portfolio-card-en.svg'),
}
const qrOptions = {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 1,
  width: 512,
  color: {
    dark: '#0e100f',
    light: '#ffffff',
  },
}

await mkdir(dirname(output), { recursive: true })

const qrSvg = await QRCode.toString(SITE_URL, qrOptions)
const qrContent = qrSvg
  .replace(/^[\s\S]*?<svg\b[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')

await writeFile(output, qrSvg)
const createQrPoster = (locale) => {
  const copy = locale === 'es'
    ? {
        title: 'José Mauricio Rangel Núñez — código QR del portafolio',
        description: 'Escanea el código para abrir jhaymayleth.github.io. WhatsApp: 304 475 2063.',
        label: 'PORTAFOLIO DIGITAL',
        role: 'Desarrollador Full Stack',
        scan: 'Escanea para visitar mi portafolio',
      }
    : {
        title: 'José Mauricio Rangel Núñez — portfolio QR code',
        description: 'Scan the code to open jhaymayleth.github.io. WhatsApp: 304 475 2063.',
        label: 'DIGITAL PORTFOLIO',
        role: 'Full Stack Developer',
        scan: 'Scan to visit my portfolio',
      }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1280" viewBox="0 0 1000 1280" role="img" aria-labelledby="title description">
  <title id="title">${copy.title}</title>
  <desc id="description">${copy.description}</desc>
  <rect width="1000" height="1280" rx="48" fill="#f7f5f0"/>
  <rect x="34" y="34" width="932" height="1212" rx="32" fill="#fff" stroke="#0e100f" stroke-opacity=".12"/>
  <path d="M66 70h868" stroke="#a51c30" stroke-width="8" stroke-linecap="round"/>
  <text x="100" y="142" fill="#a51c30" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="5">${copy.label}</text>
  <text x="100" y="226" fill="#0e100f" font-family="Arial,sans-serif" font-size="48" font-weight="700">José Mauricio Rangel Núñez</text>
  <text x="100" y="270" fill="#616763" font-family="Arial,sans-serif" font-size="24">${copy.role}</text>
  <rect x="170" y="320" width="660" height="660" rx="28" fill="#fff" stroke="#0e100f" stroke-opacity=".12" stroke-width="2"/>
  <svg x="200" y="350" width="600" height="600" viewBox="0 0 35 35" shape-rendering="crispEdges">${qrContent}</svg>
  <text x="500" y="1040" fill="#0e100f" font-family="Arial,sans-serif" font-size="28" font-weight="700" text-anchor="middle">${copy.scan}</text>
  <text x="500" y="1082" fill="#a51c30" font-family="Arial,sans-serif" font-size="24" text-anchor="middle">jhaymayleth.github.io</text>
  <rect x="280" y="1120" width="440" height="76" rx="38" fill="#128c4a"/>
  <svg x="310" y="1143" width="30" height="30" viewBox="0 0 24 24"><path fill="#fff" d="${siWhatsapp.path}"/></svg>
  <text x="370" y="1168" fill="#fff" font-family="Arial,sans-serif" font-size="24" font-weight="700">WhatsApp · 304 475 2063</text>
</svg>\n`
}

for (const [locale, posterOutput] of Object.entries(posterOutputs)) {
  await writeFile(posterOutput, createQrPoster(locale))
}

console.log(`QR generado para ES/EN en ${output} y los pósteres SVG -> ${SITE_URL}`)
