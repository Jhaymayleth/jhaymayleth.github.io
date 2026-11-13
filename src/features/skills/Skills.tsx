import { useLanguage } from '../../i18n/useLanguage'
import {
  currentlyLearning,
  languages,
  skillGroups,
  softSkills,
} from '../../data/skills'
import { SectionHeader } from '../../components/shared/SectionHeader'
import { SectionDivider } from '../../components/shared/SectionDivider'
import { TechnologyMark } from '../../components/shared/TechnologyMark'
import { WindLines } from '../../components/shared/WindLines'
import { useInView } from '../../hooks/useInView'

export function Skills() {
  const { locale, t } = useLanguage()
  // Pausa el patrón de fondo (y evita descargarlo) mientras la sección está lejos.
  const { ref, inView } = useInView<HTMLElement>('50% 0px')

  return (
    <section
      ref={ref}
      id="skills"
      className="relative isolate overflow-hidden bg-washi-deep/40 py-20 lg:py-28"
    >
      <SectionDivider />
      <div
        aria-hidden="true"
        className={`seigaiha-layer${inView ? '' : ' is-idle'}`}
      />

      <WindLines />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          index={t.skills.index}
          label={t.skills.label}
          title={t.skills.title}
          description={t.skills.description}
        />

        <ul
          data-reveal
          className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2"
        >
          {skillGroups.map((group, groupIndex) => (
            <li key={group.id} className="technology-group">
              <h3 className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
                <span aria-hidden="true" className="technology-group-mark">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                {group.title[locale]}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-6">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="technology-item"
                    title={`${group.title[locale]} · ${item}`}
                  >
                    <TechnologyMark technology={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div
          data-reveal
          className="mt-16 grid gap-10 pt-2 lg:grid-cols-3"
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
                  className="inline-flex items-center gap-2 rounded-full bg-sumi-soft/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-sumi-soft"
                >
                  <TechnologyMark technology={item} compact />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
              {t.skills.soft}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {softSkills[locale].map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-sumi-soft/[0.06] px-3 py-2 text-sm text-sumi"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-carmesi">
              {t.skills.languages}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {languages.map((language) => (
                <li
                  key={language.id}
                  className="flex items-center gap-3 rounded-xl bg-panel/60 px-4 py-3"
                >
                  <span aria-hidden="true" className="text-xl">
                    {language.id === 'es' ? '🇨🇴' : '🇺🇸'}
                  </span>
                  <span>
                    <span className="block text-sm text-sumi">
                      {language.language[locale]}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-sumi-soft">
                      {language.level[locale]}
                    </span>
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
