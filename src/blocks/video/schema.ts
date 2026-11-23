import { z } from 'zod'
import { buttonSchema, idSchema, videoSchema as videoRefSchema } from '@/schemas/fields'
import { categoryIdSchema, headerShape, L, list, optL } from '@/schemas/blocks'

export const VIDEO_COLUMNS = ['2', '3'] as const

export const videoCategorySchema = z.object({ id: idSchema, label: L })

export const videoItemSchema = z.object({
  id: idSchema,
  /** File, YouTube or Vimeo, with its poster. */
  video: videoRefSchema,
  title: optL,
  description: optL,
  /** Free label shown on the poster: "1:45", "30 s". */
  duration: z.string().max(20).optional(),
  /** Id of one of the block's `categories`. */
  category: categoryIdSchema.optional(),
})
export type VideoItem = z.infer<typeof videoItemSchema>

export const videoSchema = z.object({
  ...headerShape,
  /** embed and reel show the first item; grid shows them all. */
  items: list(videoItemSchema, 24),
  categories: list(videoCategorySchema, 12).optional(),
  /** grid: category filter. Default on when items use two or more categories. */
  showFilter: z.boolean().optional(),
  /** reel: start muted and looping, with a "Play with sound" button. */
  autoplay: z.boolean().optional(),
  /** grid: columns on large screens. */
  columns: z.enum(VIDEO_COLUMNS).optional(),
  cta: buttonSchema.optional(),
})
export type VideoContent = z.infer<typeof videoSchema>
