import { useLanguage } from '../../i18n/useLanguage'
import {
  currentlyLearning,
  languages,
  skillGroups,
  softSkills,
} from '../../data/skills'
import { SectionHeader } from '../../components/shared/SectionHeader'
import { MistSeam } from '../../components/shared/MistSeam'

export function Skills() {
  const { locale, t } = useLanguage()

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden border-b border-sumi-soft/25 bg-washi-deep/40 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="seigaiha-layer" />
      <MistSeam />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          index={t.skills.index}
          label={t.skills.label}
          title={t.skills.title}
          description={t.skills.description}
        />

        <ul
          data-reveal
          className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillGroups.map((group) => (
            <li key={group.id}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
                {group.title[locale]}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[15px] text-sumi">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div
          data-reveal
          className="mt-14 grid gap-10 border-t border-sumi-soft/25 pt-10 lg:grid-cols-3"
        >
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
              {t.skills.learning}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-sumi-soft">
              {t.skills.learningNote}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {currentlyLearning[locale].map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-sumi-soft/35 bg-sumi-soft/[0.05] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-sumi-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
              {t.skills.soft}
            </h3>
            <ul className="mt-4 space-y-2">
              {softSkills[locale].map((item) => (
                <li key={item} className="text-[15px] text-sumi">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
              {t.skills.languages}
            </h3>
            <ul className="mt-4 space-y-3">
              {languages.map((language) => (
                <li
                  key={language.id}
                  className="flex items-baseline justify-between gap-4 border-b border-sumi-soft/25 pb-2"
                >
                  <span className="text-[15px] text-sumi">
                    {language.language[locale]}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sumi-soft">
                    {language.level[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
