import { z } from 'zod'
import { headerShape, optL } from '@/schemas/blocks'

export const EMBED_ASPECTS = ['auto', '16:9', '4:3', '1:1', '3:4', '9:16', '21:9'] as const

export const embedSchema = z.object({
  ...headerShape,
  /** `iframe`: a page URL or a pasted <iframe> snippet. Normalised through the allow-list at render. */
  url: z.string().max(5000).optional(),
  /** `auto` = the provider's natural shape (fixed height for audio players and Calendly). */
  aspect: z.enum(EMBED_ASPECTS).optional(),
  /** Accessible name of the frame. Falls back to the heading, then the provider. */
  title: optL,
  caption: optL,
  /** `code`: an HTML snippet per language. Sanitized at render; anything with a <script> is refused. */
  code: optL,
})
export type EmbedContent = z.infer<typeof embedSchema>
