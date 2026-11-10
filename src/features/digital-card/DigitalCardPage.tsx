import { useRef, useState } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { profile } from '../../data/profile'
import { digitalCard } from '../../data/digital-card'
import { ThemeToggle } from '../../components/shared/ThemeToggle'
import { LanguageSwitch } from '../../components/shared/LanguageSwitch'
import { DigitalCard } from './DigitalCard'
import { downloadCardImage, downloadCardPdf, downloadContactCard } from './download'

type Busy = 'png' | 'pdf' | 'vcf' | null

type Status =
  | { kind: 'idle' }
  | { kind: 'ok'; message: string }
  | { kind: 'error'; message: string }

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60'
const PRIMARY = `${BUTTON_BASE} bg-carmesi text-carmesi-fg hover:bg-carmesi-bright`
const SECONDARY = `${BUTTON_BASE} border border-sumi-soft/35 text-sumi hover:border-carmesi/50 hover:text-carmesi`

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()

  if (!copied) throw new Error('No se pudo copiar')
}

export function DigitalCardPage() {
  useDocumentMeta('card')
  const { locale, t } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState<Busy>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const handleDownload = async (kind: Exclude<Busy, null>) => {
    if (busy) return
    setBusy(kind)
    setStatus({ kind: 'idle' })

    try {
      if (cardRef.current) {
        if (kind === 'png') await downloadCardImage(cardRef.current, locale)
        if (kind === 'pdf') await downloadCardPdf(cardRef.current, locale)
      }
      if (kind === 'vcf') downloadContactCard(locale)
    } catch (error) {
      console.error(error)
      setStatus({ kind: 'error', message: t.card.downloadError })
    } finally {
      setBusy(null)
    }
  }

  const handleShare = async () => {
    const canShare = typeof navigator.share === 'function'
    const shareData = {
      title: profile.fullName,
      text: t.card.shareText,
      url: digitalCard.siteUrl,
    }

    try {
      if (canShare) {
        await navigator.share(shareData)
        return
      }
      await copyText(digitalCard.siteUrl)
      setStatus({ kind: 'ok', message: t.card.copied })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setStatus({
        kind: 'error',
        message: canShare ? t.card.shareError : t.card.copyError,
      })
    }
  }

  const handleCopy = async () => {
    try {
      await copyText(digitalCard.siteUrl)
      setStatus({ kind: 'ok', message: t.card.copied })
    } catch {
      setStatus({ kind: 'error', message: t.card.copyError })
    }
  }

  return (
    <div className="min-h-screen bg-washi text-sumi">
      <header className="bg-ink-block text-ink-block-fg">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-block-fg/75 transition-colors hover:text-carmesi-on-block"
          >
            <span aria-hidden="true">←</span>
            {t.card.back}
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-carmesi">
            {t.card.label}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] text-sumi sm:text-5xl">
            {t.card.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-sumi-soft">
            {t.card.description}
          </p>
        </div>

        <DigitalCard cardRef={cardRef} />

        <section aria-labelledby="descargas" className="flex flex-col gap-4">
          <h2
            id="descargas"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-sumi-soft"
          >
            {t.card.downloads}
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleDownload('png')}
              disabled={busy !== null}
              className={SECONDARY}
            >
              {busy === 'png' ? t.card.generating : t.card.downloadPng}
            </button>
            <button
              type="button"
              onClick={() => handleDownload('pdf')}
              disabled={busy !== null}
              className={SECONDARY}
            >
              {busy === 'pdf' ? t.card.generating : t.card.downloadPdf}
            </button>
            <button
              type="button"
              onClick={() => handleDownload('vcf')}
              disabled={busy !== null}
              className={SECONDARY}
            >
              {busy === 'vcf' ? t.card.generating : t.card.downloadVcf}
            </button>
            <a
              href={digitalCard.qrPoster[locale]}
              download={`${digitalCard.fileName}-qr-${locale}.svg`}
              className={SECONDARY}
            >
              {t.card.downloadQr}
            </a>
          </div>

          <p
            role="status"
            aria-live="polite"
            className={`min-h-5 text-sm ${
              status.kind === 'error' ? 'text-carmesi' : 'text-sumi-soft'
            }`}
          >
            {status.kind === 'idle' ? '' : status.message}
          </p>
        </section>

        <section
          aria-labelledby="compartir"
          className="mx-auto w-full max-w-4xl border-t border-sumi-soft/20 pt-8"
        >
          <div>
            <h2
              id="compartir"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-sumi-soft"
            >
              {t.card.qrLabel}
            </h2>
            <p className="mt-2 text-sm text-sumi-soft">{digitalCard.siteUrl}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={handleShare} className={PRIMARY}>
                {t.card.share}
              </button>
              <button type="button" onClick={handleCopy} className={SECONDARY}>
                {t.card.copy}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
