import { z } from 'zod'
import { headerShape } from '@/schemas/blocks'
import { buttonSchema, imageSchema } from '@/schemas/fields'

/** A call-to-action band: heading, one line (intro) and up to two buttons. */
export const ctaSchema = z.object({
  ...headerShape,
  primaryCta: buttonSchema.optional(),
  secondaryCta: buttonSchema.optional(),
  /** with-image: illustration or photo that overflows the card edge. */
  image: imageSchema.optional(),
})
export type CtaContent = z.infer<typeof ctaSchema>
