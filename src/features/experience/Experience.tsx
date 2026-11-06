import { useLanguage } from '../../i18n/useLanguage'
import { experience } from '../../data/experience'
import { SectionHeader } from '../../components/shared/SectionHeader'

export function Experience() {
  const { locale, t } = useLanguage()

  return (
    <section id="experiencia" className="border-b border-sumi/10 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index={t.experience.index}
          label={t.experience.label}
          title={t.experience.title}
          description={t.experience.description}
        />

        <ol className="mt-14 border-t border-sumi/10">
          {experience.map((item) => (
            <li
              key={item.id}
              className="grid gap-4 border-b border-sumi/10 py-8 md:grid-cols-[210px_1fr] md:gap-10"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sumi-soft">
                  {item.period[locale]}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-torii">
                  {item.kind === 'work'
                    ? t.experience.work
                    : t.experience.education}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold tracking-tight text-sumi">
                  {item.role[locale]}
                </h3>
                <p className="mt-1 text-sm text-sumi-soft">
                  {item.organization} · {item.location[locale]}
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-sumi-soft">
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
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-torii"
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
                        className="rounded-full border border-sumi/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-sumi-soft"
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
