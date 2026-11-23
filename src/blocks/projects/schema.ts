import { z } from 'zod'
import { buttonSchema, idSchema, imageSchema, linkSchema, socialPlatformSchema, videoSchema } from '@/schemas/fields'
import { categoryIdSchema, headerShape, L, list, optL, periodSchema, tagsSchema } from '@/schemas/blocks'

/** Bento card footprint on the 4-column grid: sm 1×1 · md 2×1 · lg 2×2 · wide 3×1 · tall 1×2. */
export const PROJECT_SIZES = ['sm', 'md', 'lg', 'wide', 'tall'] as const
export type ProjectSize = (typeof PROJECT_SIZES)[number]

/**
 * What a bento card is. Only the `bento` variant looks at it — every other
 * variant renders each item as a project. The Bento template builds its whole
 * home page from these.
 */
export const PROJECT_KINDS = ['project', 'intro', 'photo', 'status', 'location', 'learning', 'social', 'contact'] as const
export type ProjectKind = (typeof PROJECT_KINDS)[number]

export const projectCategorySchema = z.object({ id: idSchema, label: L })
export type ProjectCategory = z.infer<typeof projectCategorySchema>

export const projectItemSchema = z.object({
  id: idSchema,
  title: optL,
  description: optL,
  image: imageSchema.optional(),
  /** Shown instead of the image when set; the image becomes its poster. */
  video: videoSchema.optional(),
  tags: tagsSchema.optional(),
  /** Where the project lives (live site, store, article). */
  link: linkSchema.optional(),
  /** The case study page for this project. */
  caseStudy: linkSchema.optional(),
  year: periodSchema.optional(),
  client: optL,
  /** Id of one of the block's `categories`. */
  category: categoryIdSchema.optional(),

  /* ── Bento only ── */
  size: z.enum(PROJECT_SIZES).optional(),
  kind: z.enum(PROJECT_KINDS).optional(),
  /** Small label above the title: "Currently", "Based in", "Now learning". */
  label: optL,
  /** `social` cards: one platform + handle or URL. Without it the card lists the site's social links. */
  platform: socialPlatformSchema.optional(),
  handle: z.string().max(500).optional(),
})
export type ProjectItem = z.infer<typeof projectItemSchema>

export const projectsSchema = z.object({
  ...headerShape,
  categories: list(projectCategorySchema, 12).optional(),
  /** Category filter above the grid / masonry. Default on when there are categories. */
  showFilter: z.boolean().optional(),
  /** Grid columns on wide screens. Default 3. */
  columns: z.enum(['2', '3']).optional(),
  items: list(projectItemSchema),
  /** "View all work" under the list. */
  cta: buttonSchema.optional(),
})
export type ProjectsContent = z.infer<typeof projectsSchema>
