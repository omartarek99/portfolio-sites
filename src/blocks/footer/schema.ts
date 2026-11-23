import { z } from 'zod'
import { optL } from '@/schemas/blocks'

export const footerSchema = z.object({
  /** The site name (wordmark). Falls back to `settings.ownerName` when empty. */
  heading: optL,
  /** A short line under the name. */
  text: optL,
  /** Replaces the default "© Name. All rights reserved." line. */
  copyright: optL,
  /** Show the back-to-top link. Default true. */
  showBackToTop: z.boolean().optional(),
})
export type FooterContent = z.infer<typeof footerSchema>
