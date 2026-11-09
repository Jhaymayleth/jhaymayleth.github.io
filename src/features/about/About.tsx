import type { CSSProperties } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { aboutFacts, aboutFocus, aboutParagraphs } from '../../data/about'
import { SectionHeader } from '../../components/shared/SectionHeader'
import { SectionDivider } from '../../components/shared/SectionDivider'
import { VerticalLabel } from '../../components/shared/VerticalLabel'
import { ContourLines } from '../../components/shared/ContourLines'
import { Enso } from '../../components/shared/Enso'

function revealDelay(delay: number): CSSProperties {
  return { '--reveal-delay': `${delay}ms` } as CSSProperties
}

export function About() {
  const { locale, t } = useLanguage()

  return (
    <section
      id="sobre-mi"
      className="chapter chapter-center relative isolate overflow-hidden py-20 lg:py-28"
    >
      <SectionDivider />
      <ContourLines />
      <VerticalLabel index={t.about.index} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          index={t.about.index}
          label={t.about.label}
          title={t.about.title}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div
            data-reveal
            style={revealDelay(80)}
            className="max-w-xl"
          >
            <div className="space-y-5 text-[15px] leading-relaxed text-sumi sm:text-base">
              {aboutParagraphs[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-9 font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
              {t.about.focus}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {aboutFocus[locale].map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-sumi-soft/35 bg-sumi-soft/[0.05] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sumi-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside
            data-reveal
            style={revealDelay(160)}
            className="relative"
          >
            <Enso className="pointer-events-none absolute -top-16 -right-8 h-56 w-56 text-sumi-soft/[0.18] sm:-right-12 sm:h-72 sm:w-72" />

            <div className="relative">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
                {t.about.facts}
              </h3>
              <dl className="mt-4 border-t border-sumi-soft/25">
                {aboutFacts.map((fact) => (
                  <div
                    key={fact.id}
                    className="grid gap-1 border-b border-sumi-soft/25 py-4 sm:grid-cols-[100px_1fr] sm:gap-4"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft">
                      {fact.label[locale]}
                    </dt>
                    <dd className="text-[15px] text-sumi">{fact.value[locale]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
