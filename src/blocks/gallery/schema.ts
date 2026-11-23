import { z } from 'zod'
import { buttonSchema, idSchema, imageSchema } from '@/schemas/fields'
import { categoryIdSchema, headerShape, L, list, optL, periodSchema } from '@/schemas/blocks'

export const GALLERY_RATIOS = ['1/1', '4/3', '3/4', '3/2', '16/9'] as const
export const GALLERY_COLUMNS = ['2', '3', '4'] as const
export const GALLERY_PER_VIEW = ['1', '2', '3'] as const

/** Per-site image limit is 100 on Pro (SPEC §6); enforced elsewhere, capped here. */
export const MAX_GALLERY_ITEMS = 100

export const galleryCategorySchema = z.object({ id: idSchema, label: L })

export const galleryItemSchema = z.object({
  id: idSchema,
  /** The picture; the "before" state in the before/after variant. */
  image: imageSchema.optional(),
  /** before-after variant only: the "after" state. */
  after: imageSchema.optional(),
  caption: optL,
  /** Id of one of the block's `categories`. */
  category: categoryIdSchema.optional(),
  /** Artwork details shown in the lightbox (Atelier): "Ink on paper", "50 × 70 cm", "2025". */
  medium: optL,
  size: optL,
  year: periodSchema.optional(),
})
export type GalleryItem = z.infer<typeof galleryItemSchema>

export const gallerySchema = z.object({
  ...headerShape,
  items: list(galleryItemSchema, MAX_GALLERY_ITEMS),
  categories: list(galleryCategorySchema, 12).optional(),
  /** Category filter above the images. Default on when items use two or more categories. */
  showFilter: z.boolean().optional(),
  /** grid: tile shape. */
  ratio: z.enum(GALLERY_RATIOS).optional(),
  /** grid / masonry: columns on large screens. */
  columns: z.enum(GALLERY_COLUMNS).optional(),
  /** slider: images per view on large screens. */
  perView: z.enum(GALLERY_PER_VIEW).optional(),
  /** Button under the gallery, e.g. "Enquire about a work" → contact section. */
  cta: buttonSchema.optional(),
})
export type GalleryContent = z.infer<typeof gallerySchema>
