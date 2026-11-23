import { hasText } from '../_shared'
import type { BlockContext, BlockProps } from '../types'
import type { AnnouncementContent } from './schema'

export type AnnouncementProps = BlockProps<AnnouncementContent>

/** Links typed inside a message stay readable on the bar's primary colour. */
export const TEXT = '[&_a]:text-inherit [&_a]:underline [&_a]:underline-offset-4'

/** Ticker messages that have text in this locale, with their index in `content.items`. */
export function visibleItems(ctx: BlockContext, content: AnnouncementContent) {
  return (content.items ?? []).map((item, index) => ({ item, index })).filter(({ item }) => hasText(ctx, item.text))
}

/** A stable short id for the current message, so a new message shows again after a dismissal. */
export function signatureOf(content: AnnouncementContent): string {
  const source = JSON.stringify([content.text, content.items?.map((item) => item.text)])
  let h = 5381
  for (let i = 0; i < source.length; i++) h = ((h << 5) + h + source.charCodeAt(i)) | 0
  return String(h >>> 0)
}
