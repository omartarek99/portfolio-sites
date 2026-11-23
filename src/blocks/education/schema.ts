import { z } from 'zod'
import { headerShape, L, list, optL, periodSchema } from '@/schemas/blocks'
import { idSchema, imageSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const educationItemSchema = z.object({
  id: idSchema,
  qualification: L,
  institution: optL,
  /** Shown as-is in every language ("2013 – 2017", "2019") and edited in the side panel. */
  period: periodSchema.optional(),
  location: optL,
  description: optL,
  logo: imageSchema.optional(),
})
export type EducationItem = z.infer<typeof educationItemSchema>

export const educationSchema = z.object({
  ...headerShape,
  items: list(educationItemSchema).optional(),
})
export type EducationContent = z.infer<typeof educationSchema>
export type EducationProps = BlockProps<EducationContent>
