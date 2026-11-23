import { z } from 'zod'
import { headerShape, iconSchema, L, list, optL, textItemSchema } from '@/schemas/blocks'
import { buttonSchema, idSchema, imageSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'
import { CURRENCY_RE } from '../pricing/price'

/** Display-only price. `from` prefixes "From". Currency defaults to USD. */
export const servicePriceSchema = z.object({
  amount: z.number().min(0).max(1_000_000_000).optional(),
  currency: z.string().regex(CURRENCY_RE).optional(),
  from: z.boolean().optional(),
})

export const serviceItemSchema = z.object({
  id: idSchema,
  name: L,
  description: optL,
  icon: iconSchema.optional(),
  image: imageSchema.optional(),
  price: servicePriceSchema.optional(),
  /** Free text: "60 min", "3 sessions", "2 weeks". */
  duration: optL,
  features: list(textItemSchema, 12).optional(),
  cta: buttonSchema.optional(),
})
export type ServiceItem = z.infer<typeof serviceItemSchema>

export const servicesSchema = z.object({
  ...headerShape,
  items: list(serviceItemSchema, 24).optional(),
})
export type ServicesContent = z.infer<typeof servicesSchema>
export type ServicesProps = BlockProps<ServicesContent>
