import { z } from 'zod'
import { headerShape, L, list, optL } from '@/schemas/blocks'
import { idSchema, linkSchema } from '@/schemas/fields'
import type { BlockProps } from '../types'

export const PUBLICATION_TYPES = ['article', 'chapter', 'talk', 'report'] as const
export type PublicationType = (typeof PUBLICATION_TYPES)[number]

export const publicationLinkSchema = z.object({
  id: idSchema,
  /** "DOI", "PDF", "Slides". */
  label: L,
  link: linkSchema,
})

export const publicationSchema = z.object({
  id: idSchema,
  title: L,
  /** "Al-Hajri, F. & Mansour, S." */
  authors: optL,
  /** Journal, book, conference or publisher. */
  venue: optL,
  year: z.number().int().min(1900).max(2100).optional(),
  type: z.enum(PUBLICATION_TYPES).optional(),
  links: list(publicationLinkSchema, 6).optional(),
  abstract: optL,
})
export type Publication = z.infer<typeof publicationSchema>

export const publicationsSchema = z.object({
  ...headerShape,
  items: list(publicationSchema).optional(),
})
export type PublicationsContent = z.infer<typeof publicationsSchema>
export type PublicationsProps = BlockProps<PublicationsContent>
