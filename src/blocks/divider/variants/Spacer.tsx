import { cn } from '@/lib/utils'
import type { BlockProps } from '../../types'
import type { DividerContent } from '../schema'

const HEIGHT: Record<NonNullable<DividerContent['size']>, string> = {
  sm: 'h-6 md:h-8',
  md: 'h-12 md:h-16',
  lg: 'h-16 md:h-24',
  xl: 'h-24 md:h-40',
}

/** Just height. In the editor a dashed outline shows where it is, so it can be selected. */
export function Spacer({ content, ctx }: BlockProps<DividerContent>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        HEIGHT[content.size ?? 'md'],
        ctx.mode === 'editor' && 'border-site-border border-y border-dashed',
      )}
    />
  )
}
