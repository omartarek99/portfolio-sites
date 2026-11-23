import { z } from 'zod'
import { headerShape, optL } from '@/schemas/blocks'
import { buttonSchema } from '@/schemas/fields'

export const bookingSchema = z.object({
  ...headerShape,
  /** Meeting types to offer, from the site's booking settings. Empty or missing → all of them. */
  meetingTypeIds: z.array(z.string().max(64)).max(20).optional(),
  /** button-modal: the button that opens the booking window. Empty → "Book a session". */
  buttonLabel: optL,
  /**
   * Shown instead of the booking UI when the site has no meeting types yet —
   * e.g. a link to the contact page or an external booking page (SPEC §10.3).
   */
  cta: buttonSchema.optional(),
  /** Small print, e.g. "Sessions are in English or Arabic." */
  note: optL,
})
export type BookingContent = z.infer<typeof bookingSchema>
