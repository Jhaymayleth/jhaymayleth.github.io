import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import QRCode from 'qrcode'

/**
 * Genera el QR estático que apunta al portafolio.
 * Se ejecuta con `npm run qr`; el SVG resultante se commitea y se sirve
 * sin cargar ninguna librería en el navegador.
 */
const SITE_URL = 'https://jhaymayleth.github.io/'
const output = resolve('public/images/qr-portfolio.svg')

await mkdir(dirname(output), { recursive: true })

await QRCode.toFile(output, SITE_URL, {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 1,
  width: 512,
  color: {
    dark: '#0e100f',
    light: '#f7f5f0',
  },
})

console.log(`QR generado en ${output} -> ${SITE_URL}`)
