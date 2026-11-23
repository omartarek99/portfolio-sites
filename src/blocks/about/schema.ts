import { z } from 'zod'
import { headerShape, L, list, optL, periodSchema } from '@/schemas/blocks'
import { buttonSchema, idSchema, imageSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const aboutMilestoneSchema = z.object({
  id: idSchema,
  /** Shown as-is in every language: "2021". Edited in the side panel. */
  year: periodSchema.optional(),
  title: L,
  text: optL,
})
export type AboutMilestone = z.infer<typeof aboutMilestoneSchema>

/**
 * One content model for every variant; each variant shows the fields it needs.
 * - text-portrait: header, body, image, imageSide, cta
 * - big-quote: heading (small label), quote, attribution, attributionRole, image (avatar)
 * - two-column: header, body, dropCap, cta
 * - timeline-intro: header, milestones
 */
export const aboutSchema = z.object({
  ...headerShape,
  /** The story. Rich text. */
  body: optL,
  image: imageSchema.optional(),
  /** Side of the portrait on wide screens. Default: end. */
  imageSide: z.enum(['start', 'end']).optional(),
  cta: buttonSchema.optional(),
  quote: optL,
  attribution: optL,
  attributionRole: optL,
  dropCap: z.boolean().optional(),
  milestones: list(aboutMilestoneSchema, 6).optional(),
})
export type AboutContent = z.infer<typeof aboutSchema>
export type AboutProps = BlockProps<AboutContent>
