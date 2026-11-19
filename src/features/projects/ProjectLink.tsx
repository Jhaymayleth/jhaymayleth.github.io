import { useLanguage } from '../../i18n/useLanguage'
import { projectHref } from '../../data/projects'
import type { ProjectItem } from '../../types/content'
import { TechnologyMark } from '../../components/shared/TechnologyMark'

interface ProjectLinkProps {
  project: ProjectItem
  index: number
}

/**
 * Tarjeta-enlace de un proyecto. Abre la experiencia externa en una pestaña
 * nueva; el portafolio solo se encarga de presentar y enlazar.
 */
export function ProjectLink({ project, index }: ProjectLinkProps) {
  const { locale, t } = useLanguage()

  return (
    <a
      href={projectHref(project.id)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 py-7 transition-colors duration-300 hover:bg-carmesi/[0.035] sm:gap-6 sm:py-8"
    >
      <span
        aria-hidden="true"
        className="w-7 shrink-0 pt-1 font-mono text-[11px] tracking-[0.16em] text-carmesi/75"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="min-w-0 flex-1">
        <span className="font-display text-2xl leading-tight text-sumi transition-colors duration-300 group-hover:text-carmesi sm:text-[1.7rem]">
          {project.name}
        </span>

        <span className="mt-2 block max-w-xl text-sm leading-relaxed text-sumi-soft">
          {project.tagline[locale]}
        </span>

        <span className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="inline-flex items-center gap-1.5 rounded-full border border-sumi-soft/25 bg-panel/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-sumi-soft"
            >
              <TechnologyMark technology={technology} compact />
              {technology}
            </span>
          ))}
        </span>

        <span className="sr-only">
          {' '}
          — {t.projects.open}. {t.projects.external}.
        </span>
      </span>

      <span
        aria-hidden="true"
        className="shrink-0 pt-1 text-lg text-sumi-soft transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-carmesi"
      >
        ↗
      </span>
    </a>
  )
}
