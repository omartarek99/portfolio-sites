import { z } from 'zod'
import { headerShape, L, list, optL, textItemSchema } from '@/schemas/blocks'
import { buttonSchema, idSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'
import { CURRENCY_RE } from './price'

export const PERIODS = ['one-time', 'monthly'] as const
export type Period = (typeof PERIODS)[number]

const amount = z.number().min(0).max(1_000_000_000)

export const tierSchema = z.object({
  id: idSchema,
  name: L,
  description: optL,
  /** Price per month. A tier may carry one or both prices; the toggle switches between them. */
  monthly: amount.optional(),
  oneTime: amount.optional(),
  /** Prefix the price with "From". */
  from: z.boolean().optional(),
  popular: z.boolean().optional(),
  features: list(textItemSchema, 20).optional(),
  cta: buttonSchema.optional(),
})
export type Tier = z.infer<typeof tierSchema>

/** One cell of the comparison table, aligned with the tier at the same position. */
export const compareCellSchema = z.object({
  id: idSchema,
  /** Text such as "5 pages". Empty → a check or a dash, from `included`. */
  value: optL,
  included: z.boolean().optional(),
})

export const compareRowSchema = z.object({
  id: idSchema,
  label: L,
  cells: list(compareCellSchema, 4).optional(),
})
export type CompareRow = z.infer<typeof compareRowSchema>

export const pricingSchema = z.object({
  ...headerShape,
  /** ISO 4217 code. Default USD. */
  currency: z.string().regex(CURRENCY_RE).optional(),
  /** Period shown first (and the only one without JavaScript). Default one-time. */
  defaultPeriod: z.enum(PERIODS).optional(),
  tiers: list(tierSchema, 4).optional(),
  /** Rows of the `compare` variant. */
  rows: list(compareRowSchema, 30).optional(),
})
export type PricingContent = z.infer<typeof pricingSchema>
export type PricingProps = BlockProps<PricingContent>
