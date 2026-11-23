import type { ReactNode } from 'react'
import { pick, plainText, type ButtonRef, type LinkRef } from '@/schemas/fields'
import { resolveLink } from '@/lib/links'
import { cn } from '@/lib/utils'
import type { BlockContext } from '../types'
import { Icon } from './Icon'
import { getEditorSlots } from './slots'

type Variant = NonNullable<ButtonRef['style']>

export interface BtnProps {
  ctx: BlockContext
  /** Dot path of the ButtonRef relative to `section.content`, e.g. "primaryCta". */
  path: string
  value: ButtonRef | undefined
  /** Variant used when the button has no explicit style. Default: primary. */
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  /** Full width. */
  block?: boolean
  className?: string
}

/**
 * Button slot. Renders a themed link button for a ButtonRef; inside the editor
 * it becomes click-to-edit (label, link, style).
 *
 *   <Btn ctx={ctx} path="primaryCta" value={content.primaryCta} />
 *   <Btn ctx={ctx} path="secondaryCta" value={content.secondaryCta} variant="outline" />
 *
 * Renders nothing when the label is empty (outside the editor).
 */
export function Btn({ ctx, path, value, variant = 'primary', size = 'md', block, className }: BtnProps) {
  const label = pick(value?.label, ctx.locale)
  const style = value?.style ?? variant
  const link = resolveLink(ctx.site, value?.link)
  const attrs = {
    className: cn('site-btn', className),
    'data-variant': style,
    'data-size': size === 'md' ? undefined : size,
    'data-block': block ? '' : undefined,
  }
  const content = (
    <>
      <span>{plainText(label)}</span>
      {value?.icon ? <Icon name={value.icon} className="size-[1.1em] shrink-0 rtl:-scale-x-100" /> : null}
    </>
  )

  let rendered: ReactNode = null
  if (label.trim() !== '') {
    if (ctx.mode === 'editor') {
      // No navigation inside the editor canvas.
      rendered = (
        <span role="button" tabIndex={0} {...attrs}>
          {content}
        </span>
      )
    } else if (link.booking !== undefined) {
      rendered = (
        <button type="button" data-booking={link.booking} {...attrs}>
          {content}
        </button>
      )
    } else if (link.href) {
      rendered = (
        <a href={link.href} target={link.target} rel={link.rel} download={link.download ? '' : undefined} {...attrs}>
          {content}
        </a>
      )
    } else {
      rendered = <span {...attrs}>{content}</span>
    }
  }

  if (ctx.mode === 'editor') {
    const slots = getEditorSlots()
    if (slots) {
      return (
        <slots.Button ctx={ctx} path={path} value={value}>
          {rendered}
        </slots.Button>
      )
    }
  }
  return rendered
}

export interface AProps {
  ctx: BlockContext
  link: LinkRef | undefined
  className?: string
  children: ReactNode
  /** Accessible name when the link has no text (icon links, whole-card links). */
  label?: string
}

/**
 * Link wrapper for anything that is not a button: cards, nav items, titles.
 * Resolves a LinkRef to a safe href; renders a <span> when there is no target
 * and never navigates inside the editor.
 */
export function A({ ctx, link, className, children, label }: AProps) {
  const resolved = resolveLink(ctx.site, link)
  if (ctx.mode === 'editor') {
    return <span className={className}>{children}</span>
  }
  if (resolved.booking !== undefined) {
    return (
      <button type="button" data-booking={resolved.booking} className={className} aria-label={label}>
        {children}
      </button>
    )
  }
  if (!resolved.href) return <span className={className}>{children}</span>
  return (
    <a
      href={resolved.href}
      target={resolved.target}
      rel={resolved.rel}
      download={resolved.download ? '' : undefined}
      className={className}
      aria-label={label}
    >
      {children}
    </a>
  )
}

/** True when a button has a label to show in this context (always true in the editor). */
export function hasButton(ctx: BlockContext, value: ButtonRef | undefined): boolean {
  return ctx.mode === 'editor' || pick(value?.label, ctx.locale).trim() !== ''
}
