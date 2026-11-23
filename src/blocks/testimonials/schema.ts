import { z } from 'zod'
import { headerShape, L, list, optL } from '@/schemas/blocks'
import { idSchema, imageSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const testimonialItemSchema = z.object({
  id: idSchema,
  quote: L,
  name: optL,
  /** Role and/or company, e.g. "Founder, Sahra Coffee". */
  role: optL,
  photo: imageSchema.optional(),
  /** 1–5 stars. Absent = no stars. */
  rating: z.number().min(1).max(5).optional(),
  /** Company logo shown beside the author. */
  logo: imageSchema.optional(),
})
export type TestimonialItem = z.infer<typeof testimonialItemSchema>

export const testimonialsSchema = z.object({
  ...headerShape,
  items: list(testimonialItemSchema).optional(),
  /** Advance on its own (carousel and single). Paused on hover, focus and reduced motion. */
  autoplay: z.boolean().optional(),
})
export type TestimonialsContent = z.infer<typeof testimonialsSchema>
export type TestimonialsProps = BlockProps<TestimonialsContent>
