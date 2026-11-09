interface VerticalLabelProps {
  index: string
}

/** Riel vertical con el número de sección, solo visible en pantallas grandes. */
export function VerticalLabel({ index }: VerticalLabelProps) {
  return (
    <span aria-hidden="true" className="vertical-label">
      {index}
    </span>
  )
}
