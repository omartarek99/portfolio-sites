import { z } from 'zod'
import { headerShape, iconSchema, L, list, optL } from '@/schemas/blocks'
import { idSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const processStepSchema = z.object({
  id: idSchema,
  title: L,
  body: optL,
  /** Shown by the `flow` variant inside the step marker instead of the number. */
  icon: iconSchema.optional(),
})
export type ProcessStep = z.infer<typeof processStepSchema>

export const processSchema = z.object({
  ...headerShape,
  steps: list(processStepSchema, 12).optional(),
})
export type ProcessContent = z.infer<typeof processSchema>
export type ProcessProps = BlockProps<ProcessContent>
