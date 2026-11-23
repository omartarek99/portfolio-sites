import { z } from 'zod'
import { headerShape, optL } from '@/schemas/blocks'
import { formDefinitionSchema } from '@/schemas/forms'

/**
 * Contact block. Email, phone, WhatsApp, address and social links come from
 * the site settings (one source of truth, shared with the floating contact
 * button and the vCard); the block decides what to show.
 */
export const contactSchema = z.object({
  ...headerShape,
  /** Inline form definition (form builder). Missing → the default contact form. */
  form: formDefinitionSchema.optional(),
  /** A short line under the details, e.g. office hours or reply time. */
  note: optL,
  showDetails: z.boolean().optional(),
  showSocial: z.boolean().optional(),
  /**
   * Embedded map (split-map). Off by default: an embed is a third-party
   * request, so it only loads when the owner turns it on (SPEC §15).
   */
  map: z
    .object({
      enabled: z.boolean(),
      /** Address or "lat,lng" passed to the map embed. Empty → the site address. */
      query: z.string().max(300).optional(),
    })
    .optional(),
})
export type ContactContent = z.infer<typeof contactSchema>
