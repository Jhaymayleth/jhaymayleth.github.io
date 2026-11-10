import { SectionHeader } from './SectionHeader'
import { SectionDivider } from './SectionDivider'
import { VerticalLabel } from './VerticalLabel'
import { WindLines } from './WindLines'

interface SectionPlaceholderProps {
  id: string
  index: string
  label: string
  title: string
  note: string
}

/** Sección reservada para contenido que aún no se entrega (Proyectos). */
export function SectionPlaceholder({
  id,
  index,
  label,
  title,
  note,
}: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      className="chapter chapter-center relative isolate overflow-hidden py-20 lg:py-28"
    >
      <SectionDivider />
      <span aria-hidden="true" className="ghost-index">
        {index}
      </span>
      <VerticalLabel index={index} />

      <WindLines />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <SectionHeader index={index} label={label} title={title} />
        <p
          data-reveal
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed border-sumi-soft/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-sumi-soft"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-carmesi" />
          {note}
        </p>
      </div>
    </section>
  )
}
