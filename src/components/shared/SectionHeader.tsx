interface SectionHeaderProps {
  index: string
  label: string
  title: string
  description?: string
}

export function SectionHeader({
  index,
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header data-reveal className="max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em]">
        <span className="font-medium text-carmesi">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-sumi-soft/40" />
        <span className="text-carmesi">{label}</span>
      </p>
      <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.08] font-semibold tracking-tight text-sumi">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-sumi">
          {description}
        </p>
      ) : null}
    </header>
  )
}
