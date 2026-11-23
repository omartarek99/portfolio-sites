import { z } from 'zod'
import { headerShape } from '@/schemas/blocks'
import type { BlockProps } from '../types'

export const blogListSchema = z.object({
  ...headerShape,
  /** How many posts to show. Each variant has its own default. */
  count: z.number().int().min(1).max(24).optional(),
  /** Only posts carrying this tag. */
  tag: z.string().max(40).optional(),
  /** Link to the blog index under the list (when the site has a blog page). */
  showAll: z.boolean().optional(),
})
export type BlogListContent = z.infer<typeof blogListSchema>
export type BlogListProps = BlockProps<BlogListContent>
