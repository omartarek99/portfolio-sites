import { z } from 'zod'
import { optL } from '@/schemas/blocks'

export const DIVIDER_SHAPES = ['diamond', 'dots', 'geometric'] as const
export const DIVIDER_FILLS = ['surface', 'primary', 'secondary', 'accent', 'text'] as const
export const DIVIDER_SIZES = ['sm', 'md', 'lg', 'xl'] as const

export const dividerSchema = z.object({
  /** `line`: optional words in the middle of the rule. */
  label: optL,
  /** `shape`: which motif. `geometric` is the Majlis band. Default diamond. */
  shape: z.enum(DIVIDER_SHAPES).optional(),
  /** `wave`: the colour the wave is filled with — normally the next section's background. Default surface. */
  fill: z.enum(DIVIDER_FILLS).optional(),
  /** `wave`: turn it upside down, to close a coloured section instead of opening one. */
  flip: z.boolean().optional(),
  /** `spacer` and `wave`: height. Default md. */
  size: z.enum(DIVIDER_SIZES).optional(),
})
export type DividerContent = z.infer<typeof dividerSchema>
