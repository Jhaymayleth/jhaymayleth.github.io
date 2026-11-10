import type { Locale } from '../../types/content'
import { digitalCard } from '../../data/digital-card'
import { profile } from '../../data/profile'

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/([,;])/g, '\\$1')
    .replace(/\r?\n/g, '\\n')
}

/**
 * vCard 3.0 con datos exclusivamente públicos: nombre, rol, ubicación,
 * portafolio y perfiles. Sin email ni teléfonos.
 */
export function buildVCard(locale: Locale) {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCardValue(profile.lastName)};${escapeVCardValue(profile.firstName)};;;`,
    `FN:${escapeVCardValue(profile.fullName)}`,
    `TITLE:${escapeVCardValue(profile.role[locale])}`,
    `ADR;TYPE=WORK:;;${escapeVCardValue(profile.location[locale])};;;`,
    `URL:${digitalCard.siteUrl}`,
    `X-SOCIALPROFILE;TYPE=github:${profile.links.github}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.links.linkedin}`,
    `X-SOCIALPROFILE;TYPE=instagram:${profile.links.instagram}`,
    'END:VCARD',
    '',
  ].join('\r\n')
}

function triggerDownload(url: string, fileName: string) {
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

export function downloadVCard(locale: Locale) {
  const blob = new Blob([buildVCard(locale)], {
    type: 'text/vcard;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, `${digitalCard.fileName}.vcf`)
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

async function renderCard(node: HTMLElement) {
  const { toPng } = await import('html-to-image')
  return toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: getComputedStyle(node).backgroundColor,
  })
}

export async function downloadCardImage(node: HTMLElement) {
  const dataUrl = await renderCard(node)
  triggerDownload(dataUrl, `${digitalCard.fileName}.png`)
}

export async function downloadCardPdf(node: HTMLElement) {
  const [{ jsPDF }, dataUrl] = await Promise.all([
    import('jspdf'),
    renderCard(node),
  ])

  const image = await loadImage(dataUrl)
  const orientation = image.width >= image.height ? 'landscape' : 'portrait'
  const pdf = new jsPDF({
    orientation,
    unit: 'px',
    format: [image.width, image.height],
    compress: true,
  })

  pdf.addImage(dataUrl, 'PNG', 0, 0, image.width, image.height)
  pdf.save(`${digitalCard.fileName}.pdf`)
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () =>
      reject(new Error('No se pudo cargar la imagen de la tarjeta'))
    image.src = src
  })
}
