import { z } from 'zod'
import { headerShape, L, list, optL } from '@/schemas/blocks'
import { idSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const faqItemSchema = z.object({
  id: idSchema,
  question: L,
  answer: optL,
})
export type FaqItem = z.infer<typeof faqItemSchema>

export const faqSchema = z.object({
  ...headerShape,
  items: list(faqItemSchema, 40).optional(),
  /** Accordion: let several answers stay open at once. */
  multiOpen: z.boolean().optional(),
})
export type FaqContent = z.infer<typeof faqSchema>
export type FaqProps = BlockProps<FaqContent>
