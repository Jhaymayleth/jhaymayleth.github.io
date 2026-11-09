import { useLanguage } from '../../i18n/useLanguage'
import { experience } from '../../data/experience'
import { SectionHeader } from '../../components/shared/SectionHeader'
import { MistSeam } from '../../components/shared/MistSeam'

export function Experience() {
  const { locale, t } = useLanguage()

  return (
    <section
      id="experiencia"
      className="relative isolate overflow-hidden border-b border-sumi-soft/25 py-20 lg:py-28"
    >
      <MistSeam />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          index={t.experience.index}
          label={t.experience.label}
          title={t.experience.title}
          description={t.experience.description}
        />

        <ol data-reveal className="relative mt-14 border-t border-sumi-soft/25">
          <span
            aria-hidden="true"
            className="timeline-spine pointer-events-none absolute top-0 bottom-0 left-0 hidden w-px bg-sumi-soft/30 md:left-[250px] md:block"
          />

          {experience.map((item) => (
            <li
              key={item.id}
              className="grid gap-4 border-b border-sumi-soft/25 py-8 md:grid-cols-[210px_1fr] md:gap-10"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-carmesi">
                  {item.period[locale]}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sumi-soft">
                  {item.kind === 'work'
                    ? t.experience.work
                    : t.experience.education}
                </p>
              </div>

              <div className="relative md:pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-2 hidden h-1.5 w-1.5 rounded-full bg-carmesi md:block"
                />

                <h3 className="text-xl font-semibold tracking-tight text-sumi">
                  {item.role[locale]}
                </h3>
                <p className="mt-1 text-sm text-sumi-soft">
                  {item.organization} · {item.location[locale]}
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-sumi">
                  {item.description[locale]}
                </p>

                {item.points[locale].length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {item.points[locale].map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[15px] leading-relaxed text-sumi"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sumi-soft"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.stack.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-sumi-soft/35 bg-sumi-soft/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-sumi-soft"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
