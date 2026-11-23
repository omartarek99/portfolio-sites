import { z } from 'zod'
import { factSchema, headerShape, L, list, optL } from '@/schemas/blocks'
import { buttonSchema, idSchema, linkSchema, socialPlatformSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const mediaKitPlatformSchema = z.object({
  id: idSchema,
  platform: socialPlatformSchema,
  /** "@reemcooks" — shown as-is in every language. */
  handle: z.string().max(60).optional(),
  /** "185K". */
  followers: L,
  /** "6.8%". */
  engagement: optL,
  link: linkSchema.optional(),
})
export type MediaKitPlatform = z.infer<typeof mediaKitPlatformSchema>

export const rateCardSchema = z.object({
  id: idSchema,
  deliverable: L,
  /** "From $600". */
  price: L,
  note: optL,
})

export const mediaKitSchema = z.object({
  ...headerShape,
  platforms: list(mediaKitPlatformSchema, 8).optional(),
  audienceHeading: optL,
  /** "Women" → "68%", "Main age group" → "25–34". */
  audience: list(factSchema, 12).optional(),
  ratesHeading: optL,
  rates: list(rateCardSchema, 12).optional(),
  /** Usually a file link to the PDF media kit. */
  download: buttonSchema.optional(),
})
export type MediaKitContent = z.infer<typeof mediaKitSchema>
export type MediaKitProps = BlockProps<MediaKitContent>
