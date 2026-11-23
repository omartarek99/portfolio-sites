import { z } from 'zod'
import { headerShape, iconSchema, L, list, optL } from '@/schemas/blocks'
import { idSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const statItemSchema = z.object({
  id: idSchema,
  /** Shown as written: "40+", "3×", "96%", "٢٠". Counters animate the number part. */
  value: z.string().min(1).max(24),
  label: L,
  description: optL,
  icon: iconSchema.optional(),
})
export type StatItem = z.infer<typeof statItemSchema>

export const statsSchema = z.object({
  ...headerShape,
  items: list(statItemSchema, 8).optional(),
})
export type StatsContent = z.infer<typeof statsSchema>
export type StatsProps = BlockProps<StatsContent>
