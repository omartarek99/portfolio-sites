import { z } from 'zod'
import { headerShape, list, optL } from '@/schemas/blocks'
import { idSchema, imageSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const clientItemSchema = z.object({
  id: idSchema,
  /** Shown as a wordmark when there is no logo, and used as the logo's alt text. */
  name: optL,
  logo: imageSchema.optional(),
})
export type ClientItem = z.infer<typeof clientItemSchema>

export const clientsSchema = z.object({
  ...headerShape,
  items: list(clientItemSchema).optional(),
  /** Logos in greyscale until hovered. */
  greyscale: z.boolean().optional(),
})
export type ClientsContent = z.infer<typeof clientsSchema>
export type ClientsProps = BlockProps<ClientsContent>
