import { z } from 'zod'
import { buttonSchema, imageSchema } from '@/schemas/fields'
import { optL } from '@/schemas/blocks'

export const headerSchema = z.object({
  /** The site name (wordmark). Falls back to `settings.ownerName` when empty and there is no logo. */
  heading: optL,
  /** A short role line under the name (`centered` and `side`). */
  text: optL,
  logo: imageSchema.optional(),
  cta: buttonSchema.optional(),
  /** Stay at the top while scrolling. Default true. */
  sticky: z.boolean().optional(),
  /** Show the language switcher when the site has two languages. Default true. */
  showLanguage: z.boolean().optional(),
})
export type HeaderContent = z.infer<typeof headerSchema>
