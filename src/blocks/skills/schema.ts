import { z } from 'zod'
import { headerShape, iconSchema, L, list, optL } from '@/schemas/blocks'
import { idSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const SKILL_MAX_LEVEL = 5

export const skillItemSchema = z.object({
  id: idSchema,
  name: L,
  /** Proficiency 1–5. Optional: every variant works without it. */
  level: z.number().int().min(1).max(SKILL_MAX_LEVEL).optional(),
  icon: iconSchema.optional(),
  /** Group label. Items with the same label (in the current language) are shown together. */
  group: optL,
})
export type SkillItem = z.infer<typeof skillItemSchema>

export const skillsSchema = z.object({
  ...headerShape,
  items: list(skillItemSchema).optional(),
})
export type SkillsContent = z.infer<typeof skillsSchema>
export type SkillsProps = BlockProps<SkillsContent>
