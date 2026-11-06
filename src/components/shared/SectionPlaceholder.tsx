import { SectionHeader } from './SectionHeader'

interface SectionPlaceholderProps {
  id: string
  index: string
  label: string
  title: string
  note: string
}

/** Sección reservada para contenido que aún no se entrega (About, Proyectos, Contacto). */
export function SectionPlaceholder({
  id,
  index,
  label,
  title,
  note,
}: SectionPlaceholderProps) {
  return (
    <section id={id} className="border-b border-sumi/10 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index={index} label={label} title={title} />
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed border-sumi/25 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-sumi-soft">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-indigo" />
          {note}
        </p>
      </div>
    </section>
  )
}
