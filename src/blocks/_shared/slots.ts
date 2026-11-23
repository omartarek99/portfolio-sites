/**
 * Editor slots — how blocks become inline-editable without importing any
 * editor code (SPEC §8.3).
 *
 * The primitives in this folder (`T`, `Img`, `Btn`) render plain markup on
 * live sites. Inside the editor canvas, the editor registers slot components
 * here; when `ctx.mode === 'editor'` the primitives delegate to them. Public
 * site bundles therefore never contain editor code.
 */
import type { ComponentType, CSSProperties, ReactNode } from 'react'
import type { ButtonRef, ImageRef, Localized } from '@/schemas/fields'
import type { BlockContext } from '../types'

export type TextTag = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'blockquote' | 'figcaption' | 'label' | 'dt' | 'dd' | 'cite' | 'small' | 'strong' | 'em'

export interface TextSlotProps {
  ctx: BlockContext
  /** Dot path relative to `section.content`, e.g. "headline" or "items.2.title". */
  path: string
  value: Localized | string | undefined
  as: TextTag
  className?: string
  style?: CSSProperties
  /** Ghost text shown in the editor while the field is empty. */
  placeholder?: string
  /** Allow line breaks (Enter inserts <br>). */
  multiline?: boolean
  /** Block-level rich text (paragraphs, lists, headings) instead of inline marks. */
  rich?: boolean
}

export interface ImageSlotProps {
  ctx: BlockContext
  path: string
  value: ImageRef | undefined
  className?: string
  /** The rendered <img> (or nothing when there is no image yet). */
  children: ReactNode
}

export interface ButtonSlotProps {
  ctx: BlockContext
  path: string
  value: ButtonRef | undefined
  /** The rendered button/link. */
  children: ReactNode
}

export interface EditorSlots {
  Text: ComponentType<TextSlotProps>
  Image: ComponentType<ImageSlotProps>
  Button: ComponentType<ButtonSlotProps>
}

let registered: EditorSlots | null = null

/** Called once by the editor canvas before it renders any block. */
export function registerEditorSlots(slots: EditorSlots | null): void {
  registered = slots
}

export function getEditorSlots(): EditorSlots | null {
  return registered
}

/**
 * Attributes that mark an element as a list item the editor can reorder,
 * duplicate and delete on the canvas. Spread on the item's root element:
 *
 *   {items.map((item, i) => <li key={item.id} {...itemAttrs(ctx, 'items', i)}>…</li>)}
 *
 * Returns nothing outside the editor, so live markup stays clean.
 */
export function itemAttrs(
  ctx: BlockContext,
  listPath: string,
  index: number,
): { 'data-sc-list'?: string; 'data-sc-index'?: number } {
  return ctx.mode === 'editor' ? { 'data-sc-list': listPath, 'data-sc-index': index } : {}
}
