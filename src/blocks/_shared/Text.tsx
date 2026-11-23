import type { CSSProperties } from 'react'
import { pick, type Localized } from '@/schemas/fields'
import { hasMarkup, sanitizeInlineHtml, sanitizeRichHtml } from '@/lib/html'
import type { BlockContext } from '../types'
import { getEditorSlots, type TextTag } from './slots'

export interface TProps {
  ctx: BlockContext
  /** Dot path relative to `section.content`, e.g. "headline" or "items.2.title". */
  path: string
  /** Usually a Localized value read from content. */
  value: Localized | string | undefined
  /** Element to render. Default: span. */
  as?: TextTag
  className?: string
  style?: CSSProperties
  /** Ghost text shown in the editor while the field is empty. */
  placeholder?: string
  /** Preserve line breaks. */
  multiline?: boolean
  /** Block-level rich text (paragraphs, lists, …). Pair with the `site-prose` class. */
  rich?: boolean
  id?: string
}

/**
 * Text slot. Renders a Localized value for the current locale; inside the
 * editor it becomes click-to-edit in place.
 *
 *   <T ctx={ctx} path="headline" value={content.headline} as="h1" className="site-h1" />
 *
 * Renders nothing when the value is empty (outside the editor), so blocks
 * never leave empty headings behind.
 */
export function T({ ctx, path, value, as = 'span', className, style, placeholder, multiline, rich, id }: TProps) {
  if (ctx.mode === 'editor') {
    const slots = getEditorSlots()
    if (slots) {
      return (
        <slots.Text
          ctx={ctx}
          path={path}
          value={value}
          as={as}
          className={className}
          style={style}
          placeholder={placeholder}
          multiline={multiline}
          rich={rich}
        />
      )
    }
  }

  const text = pick(value, ctx.locale)
  if (text.trim() === '') return null

  const Tag = as
  const mergedStyle = multiline && !rich ? { whiteSpace: 'pre-line' as const, ...style } : style

  if (rich) {
    return <Tag id={id} className={className} style={mergedStyle} dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(text) }} />
  }
  if (hasMarkup(text)) {
    return <Tag id={id} className={className} style={mergedStyle} dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(text) }} />
  }
  return (
    <Tag id={id} className={className} style={mergedStyle}>
      {text}
    </Tag>
  )
}

/** True when a Localized value has something to show in this context (always true in the editor). */
export function hasText(ctx: BlockContext, value: Localized | string | undefined): boolean {
  return ctx.mode === 'editor' || pick(value, ctx.locale).trim() !== ''
}
