import { z } from 'zod'
import { headerShape, iconSchema, L, list, optL } from '@/schemas/blocks'
import { idSchema, imageSchema, linkSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const linkHubItemSchema = z.object({
  id: idSchema,
  label: L,
  description: optL,
  link: linkSchema,
  /** A curated icon name, or a social platform ("instagram", "youtube") for its brand glyph. */
  icon: iconSchema.optional(),
  thumbnail: imageSchema.optional(),
  /** Shows a "New" badge. */
  isNew: z.boolean().optional(),
})
export type LinkHubItem = z.infer<typeof linkHubItemSchema>

export const linkHubSchema = z.object({
  ...headerShape,
  items: list(linkHubItemSchema).optional(),
})
export type LinkHubContent = z.infer<typeof linkHubSchema>
export type LinkHubProps = BlockProps<LinkHubContent>
