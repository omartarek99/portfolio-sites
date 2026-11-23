import { z } from 'zod'
import { headerShape, optL } from '@/schemas/blocks'
import { imageSchema } from '@/schemas/fields'

export const newsletterSchema = z.object({
  ...headerShape,
  /** Submit button. Empty → "Subscribe". */
  buttonLabel: optL,
  /** Small print under the form, e.g. "One email a month. Unsubscribe anytime." */
  note: optL,
  /** Card variant: something free for subscribing (a guide, a checklist). */
  incentive: z
    .object({
      title: optL,
      description: optL,
      image: imageSchema.optional(),
    })
    .optional(),
})
export type NewsletterContent = z.infer<typeof newsletterSchema>
