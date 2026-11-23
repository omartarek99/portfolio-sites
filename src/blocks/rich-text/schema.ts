import { z } from 'zod'
import { headerShape, optL } from '@/schemas/blocks'

export const richTextSchema = z.object({
  ...headerShape,
  /** Block-level rich HTML (paragraphs, h2–h4, lists, quotes), sanitized at render. */
  body: optL,
})
export type RichTextContent = z.infer<typeof richTextSchema>
