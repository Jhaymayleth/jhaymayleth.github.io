import { useLanguage } from '../../i18n/useLanguage'
import { profile } from '../../data/profile'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="border-b border-sumi/10">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 pt-16 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:pt-24">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-sumi/15 bg-white/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-torii opacity-60"
              />
              <span
                aria-hidden="true"
                className="relative inline-flex h-1.5 w-1.5 rounded-full bg-torii"
              />
            </span>
            {t.hero.badge}
          </span>

          <h1 className="mt-8 font-display text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[0.95] tracking-tight text-sumi">
            <span className="block">{t.hero.claim[0]}</span>
            <span className="block text-torii">{t.hero.claim[1]}</span>
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-sumi-soft sm:text-lg">
            {t.hero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#proyectos"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-sumi px-6 py-3.5 text-sm font-medium text-washi transition-colors hover:bg-torii"
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sumi/20 px-6 py-3.5 text-sm font-medium text-sumi transition-colors hover:border-torii hover:text-torii"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        <figure>
          <div className="overflow-hidden rounded-[1.75rem] border border-sumi/10 bg-washi-deep">
            <img
              src="/images/profile-840.webp"
              srcSet="/images/profile-480.webp 480w, /images/profile-840.webp 840w, /images/profile-1080.webp 1080w"
              sizes="(max-width: 1024px) 360px, 420px"
              width={1086}
              height={1448}
              alt={t.hero.photoAlt}
              className="aspect-[3/4] w-full object-cover object-top"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-sumi-soft">
            <span className="text-sumi">{profile.fullName}</span>
            <span>{t.hero.role}</span>
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 pb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-sumi-soft">
        <span className="flex items-center gap-2">
          <span aria-hidden="true">↓</span>
          {t.hero.scroll}
        </span>
        <span>
          {t.hero.index} — 06
        </span>
      </div>
    </section>
  )
}
