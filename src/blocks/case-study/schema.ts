import { z } from 'zod'
import { idSchema, imageSchema, linkSchema } from '@/schemas/fields'
import { factSchema, L, list, optL } from '@/schemas/blocks'

/** A picture inside a section, with an optional caption. */
export const caseImageSchema = z.object({
  id: idSchema,
  image: imageSchema.optional(),
  caption: optL,
})
export type CaseImage = z.infer<typeof caseImageSchema>

export const caseSectionSchema = z.object({
  id: idSchema,
  /** Short label: "Problem", "Process", "Result". */
  label: optL,
  heading: optL,
  /** Rich text (paragraphs, lists). */
  body: optL,
  images: list(caseImageSchema, 6).optional(),
})
export type CaseSection = z.infer<typeof caseSectionSchema>

/** A headline number: "+38%" · "repeat orders". */
export const caseResultSchema = z.object({ id: idSchema, value: L, label: L })
export type CaseResult = z.infer<typeof caseResultSchema>

export const caseStudySchema = z.object({
  eyebrow: optL,
  title: optL,
  subtitle: optL,
  cover: imageSchema.optional(),
  /** Client, role, year, duration … */
  meta: list(factSchema, 8).optional(),
  sections: list(caseSectionSchema, 20),
  resultsHeading: optL,
  results: list(caseResultSchema, 8).optional(),
  /** Link to the next project at the end of the page. */
  next: z
    .object({
      label: optL,
      title: optL,
      link: linkSchema.optional(),
      image: imageSchema.optional(),
    })
    .optional(),
})
export type CaseStudyContent = z.infer<typeof caseStudySchema>
