import type { ReactNode } from 'react'
import type { Localized } from '@/schemas/fields'
import type { Section } from '@/schemas/site'
import { cn } from '@/lib/utils'
import type { BlockContext } from '../types'
import { hasText, T } from './Text'

/**
 * Centers content and applies the section's width setting.
 * Every non-full-bleed variant wraps its content in one.
 */
export function Container({
  section,
  width,
  className,
  children,
}: {
  section?: Pick<Section, 'style'>
  /** Force a width regardless of the section setting. */
  width?: NonNullable<Section['style']['width']>
  className?: string
  children: ReactNode
}) {
  const resolved = width ?? section?.style.width ?? 'normal'
  return (
    <div className={cn('site-container', className)} data-width={resolved === 'normal' ? undefined : resolved}>
      {children}
    </div>
  )
}

/* ── Section header: eyebrow + heading + intro ───────────────────────────── */

/** Re-exported so a block gets the shape and its renderer from one import. */
export { headerShape, headerSchema, type HeaderContent } from '@/schemas/blocks'

export interface SectionHeaderProps {
  ctx: BlockContext
  content: { eyebrow?: Localized; heading?: Localized; intro?: Localized }
  /** Alignment. Defaults to the section's textAlign setting. */
  align?: 'start' | 'center'
  section?: Pick<Section, 'style'>
  /** Heading level and size. Default h2. */
  level?: 'h1' | 'h2' | 'h3'
  className?: string
}

/**
 * The standard header most sections share. Renders nothing when all three
 * fields are empty (outside the editor).
 */
export function SectionHeader({ ctx, content, align, section, level = 'h2', className }: SectionHeaderProps) {
  const resolvedAlign = align ?? section?.style.textAlign ?? 'start'
  const any =
    hasText(ctx, content.eyebrow) || hasText(ctx, content.heading) || hasText(ctx, content.intro)
  if (!any) return null
  return (
    <header
      className={cn(
        'mb-10 flex max-w-3xl flex-col gap-4 md:mb-14',
        resolvedAlign === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <T ctx={ctx} path="eyebrow" value={content.eyebrow} as="p" className="site-eyebrow" placeholder="Eyebrow" />
      <T
        ctx={ctx}
        path="heading"
        value={content.heading}
        as={level}
        className={level === 'h1' ? 'site-h1' : level === 'h3' ? 'site-h3' : 'site-h2'}
        placeholder="Section heading"
      />
      <T ctx={ctx} path="intro" value={content.intro} as="p" className="site-lead" placeholder="A short introduction" multiline />
    </header>
  )
}
