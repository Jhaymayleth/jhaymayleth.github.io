import type { CSSProperties } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'
import { VerticalLabel } from '../../components/shared/VerticalLabel'

function revealDelay(delay: number): CSSProperties {
  return { '--reveal-delay': `${delay}ms` } as CSSProperties
}

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="chapter relative isolate overflow-hidden">
      <VerticalLabel index={t.hero.index} />

      <div className="mx-auto grid max-w-6xl gap-14 px-6 pt-16 pb-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:pt-16">
        <div className="max-w-xl">
          <span
            data-reveal
            style={revealDelay(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-sumi-soft/30 bg-panel/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-carmesi opacity-60"
              />
              <span
                aria-hidden="true"
                className="relative inline-flex h-1.5 w-1.5 rounded-full bg-carmesi"
              />
            </span>
            {t.hero.badge}
          </span>

          <h1
            data-reveal
            style={revealDelay(80)}
            className="mt-8 font-display text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[0.95] tracking-tight text-sumi"
          >
            <span className="block">{t.hero.claim[0]}</span>
            <span className="ink-wash block text-carmesi">{t.hero.claim[1]}</span>
          </h1>

          <p
            data-reveal
            style={revealDelay(160)}
            className="mt-7 max-w-md text-base leading-relaxed text-sumi sm:text-lg"
          >
            {t.hero.description}
          </p>

          <div
            data-reveal
            style={revealDelay(240)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#proyectos"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-sumi px-6 py-3.5 text-sm font-medium text-washi transition-colors hover:bg-carmesi"
            >
              {t.hero.primaryCta}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href="#experiencia"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sumi-soft/40 px-6 py-3.5 text-sm font-medium text-carmesi transition-colors hover:border-carmesi/50 hover:bg-carmesi/[0.05]"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        <figure
          data-reveal
          style={revealDelay(120)}
          className="portrait-group relative"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[1.75rem] border border-sumi-soft/40 sm:translate-x-3 sm:translate-y-3"
            />
            <div className="portrait-frame relative overflow-hidden rounded-[1.75rem] border border-sumi-soft/25 bg-washi-deep">
              <img
                src="/images/profile-840.webp"
                srcSet="/images/profile-480.webp 480w, /images/profile-840.webp 840w, /images/profile-1080.webp 1080w"
                sizes="(max-width: 1024px) 360px, 420px"
                width={1086}
                height={1448}
                alt={t.hero.photoAlt}
                className="portrait aspect-[3/4] w-full object-cover object-top"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-sumi-soft">
            <span className="text-sumi">{profile.fullName}</span>
            <span className="text-carmesi">{t.hero.role}</span>
          </figcaption>
        </figure>
      </div>

      <div
        data-reveal
        style={revealDelay(320)}
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 pb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-sumi-soft"
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="text-carmesi">↓</span>
          {t.hero.scroll}
        </span>
        <span>{t.hero.index} — 06</span>
      </div>
    </section>
  )
}
