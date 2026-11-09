import {
  siClaudecode,
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNotion,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siTypescript,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

interface TechnologyMarkProps {
  technology: string
  compact?: boolean
}

const BRAND_ICONS: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  'Next.js': siNextdotjs,
  HTML: siHtml5,
  CSS: siCss,
  PostgreSQL: siPostgresql,
  Python: siPython,
  Supabase: siSupabase,
  Git: siGit,
  GitHub: siGithub,
  Notion: siNotion,
  'Claude Code': siClaudecode,
}

const GENERIC_MARKS: Record<string, string> = {
  SQL: 'DB',
  ORM: 'ORM',
  APIs: '</>',
  AWS: 'aws',
  'VS Code': '</>',
  Stitch: 'S',
  'AI automation': 'AI',
}

const MONOCHROME_BRANDS = new Set(['GitHub', 'Next.js', 'Notion'])

function getTechnologyIcon(technology: string) {
  const brandName = Object.keys(BRAND_ICONS).find((name) =>
    technology === name || technology.startsWith(`${name} `),
  )

  return brandName
    ? { name: brandName, icon: BRAND_ICONS[brandName] }
    : undefined
}

export function TechnologyMark({
  technology,
  compact = false,
}: TechnologyMarkProps) {
  const resolvedIcon = getTechnologyIcon(technology)
  const className = `technology-mark${compact ? ' technology-mark--compact' : ''}`

  if (resolvedIcon) {
    const monochrome = MONOCHROME_BRANDS.has(resolvedIcon.name)

    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`${className} technology-mark--brand${monochrome ? ' technology-mark--monochrome' : ''}`}
        style={
          monochrome ? undefined : { color: `#${resolvedIcon.icon.hex}` }
        }
      >
        <path fill="currentColor" d={resolvedIcon.icon.path} />
      </svg>
    )
  }

  const mark = GENERIC_MARKS[technology]
    ?? (technology.includes('AWS') ? GENERIC_MARKS.AWS : undefined)
    ?? (technology.includes('IA') || technology.includes('AI')
      ? GENERIC_MARKS['AI automation']
      : undefined)

  if (!mark) {
    return null
  }

  return (
    <span
      aria-hidden="true"
      className={`${className} technology-mark--generic`}
    >
      {mark}
    </span>
  )
}
