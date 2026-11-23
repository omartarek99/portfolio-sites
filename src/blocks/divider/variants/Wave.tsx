import { cn } from '@/lib/utils'
import type { BlockProps } from '../../types'
import type { DividerContent } from '../schema'

const FILL: Record<NonNullable<DividerContent['fill']>, string> = {
  surface: 'fill-site-surface',
  primary: 'fill-site-primary',
  secondary: 'fill-site-secondary',
  accent: 'fill-site-accent',
  text: 'fill-site-text',
}

const HEIGHT: Record<NonNullable<DividerContent['size']>, string> = {
  sm: 'h-6 md:h-10',
  md: 'h-10 md:h-16',
  lg: 'h-14 md:h-24',
  xl: 'h-20 md:h-36',
}

/**
 * A wavy edge between two sections, filled with the colour of the section it
 * leads into. Stretches to any width; mirrored in RTL so it flows with the text.
 */
export function Wave({ content }: BlockProps<DividerContent>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      className={cn(
        // -mb-px: no hairline gap against the section below at fractional zoom levels.
        'block w-full rtl:-scale-x-100',
        HEIGHT[content.size ?? 'md'],
        FILL[content.fill ?? 'surface'],
        content.flip ? '-mt-px -scale-y-100' : '-mb-px',
      )}
    >
      <path d="M0 58c120-34 260-52 420-36 190 19 290 62 480 62 170 0 280-46 540-56V96H0Z" />
    </svg>
  )
}
