import { z } from 'zod'
import { headerShape, L, list, optL, periodSchema, tagsSchema } from '@/schemas/blocks'
import { buttonSchema, idSchema, imageSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const experienceItemSchema = z.object({
  id: idSchema,
  role: L,
  organisation: optL,
  /** Period labels are shown as-is in every language ("2021", "Sep 2019") and edited in the side panel. */
  start: periodSchema.optional(),
  end: periodSchema.optional(),
  /** Still in this role: the end label reads "Present". */
  current: z.boolean().optional(),
  location: optL,
  /** Rich text. */
  description: optL,
  logo: imageSchema.optional(),
  tags: tagsSchema.optional(),
})
export type ExperienceItem = z.infer<typeof experienceItemSchema>

export const experienceSchema = z.object({
  ...headerShape,
  items: list(experienceItemSchema).optional(),
  cta: buttonSchema.optional(),
})
export type ExperienceContent = z.infer<typeof experienceSchema>
export type ExperienceProps = BlockProps<ExperienceContent>
