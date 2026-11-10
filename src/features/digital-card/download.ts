import type { Locale } from '../../types/content'
import { digitalCard } from '../../data/digital-card'

function triggerDownload(url: string, fileName: string) {
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

async function renderCard(node: HTMLElement) {
  const { toPng } = await import('html-to-image')
  const { width, height } = node.getBoundingClientRect()
  const exportWidth = Math.ceil(width)
  const exportHeight = Math.ceil(height)

  return toPng(node, {
    pixelRatio: 2,
    width: exportWidth,
    height: exportHeight,
    canvasWidth: exportWidth * 2,
    canvasHeight: exportHeight * 2,
    cacheBust: true,
    backgroundColor: getComputedStyle(node).backgroundColor,
    style: {
      width: `${exportWidth}px`,
      height: `${exportHeight}px`,
      maxWidth: 'none',
      transform: 'none',
      boxSizing: 'border-box',
    },
  })
}

export async function downloadCardImage(node: HTMLElement, locale: Locale) {
  const dataUrl = await renderCard(node)
  triggerDownload(dataUrl, `${digitalCard.fileName}-${locale}.png`)
}

export async function downloadCardPdf(node: HTMLElement, locale: Locale) {
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
  pdf.save(`${digitalCard.fileName}-${locale}.pdf`)
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
