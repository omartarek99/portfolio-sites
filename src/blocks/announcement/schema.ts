import { z } from 'zod'
import { buttonSchema } from '@/schemas/fields'
import { list, optL, textItemSchema } from '@/schemas/blocks'

export const announcementSchema = z.object({
  /** The message of the `bar` variant (and of `ticker` while it has no messages). */
  text: optL,
  /** Optional link after the message (`bar`). */
  cta: buttonSchema.optional(),
  /** Short messages of the `ticker` variant. */
  items: list(textItemSchema, 12).optional(),
  /** Visitors can close the bar; their choice is remembered until the message changes. */
  dismissible: z.boolean().optional(),
})
export type AnnouncementContent = z.infer<typeof announcementSchema>
