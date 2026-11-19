import { useLanguage } from '../../i18n/useLanguage'
import { projects } from '../../data/projects'
import { SectionHeader } from '../../components/shared/SectionHeader'
import { SectionDivider } from '../../components/shared/SectionDivider'
import { VerticalLabel } from '../../components/shared/VerticalLabel'
import { WindLines } from '../../components/shared/WindLines'
import { ProjectLink } from './ProjectLink'

export function Projects() {
  const { t } = useLanguage()

  return (
    <section
      id="proyectos"
      className="chapter chapter-center washi-texture relative isolate overflow-hidden py-20 lg:py-28"
    >
      <SectionDivider />
      <VerticalLabel index={t.projects.index} />

      <WindLines />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          index={t.projects.index}
          label={t.projects.label}
          title={t.projects.title}
          description={t.projects.description}
        />

        <p
          data-reveal
          className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft"
        >
          <span aria-hidden="true" className="text-carmesi">
            ↗
          </span>
          {t.projects.instruction}
        </p>

        <ol
          data-reveal
          className="mt-8 border-t border-sumi-soft/25"
        >
          {projects.map((project, index) => (
            <li key={project.id} className="border-b border-sumi-soft/25">
              <ProjectLink project={project} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
