/**
 * Building blocks for block content schemas (`src/blocks/<type>/schema.ts`).
 * Keeping these shared is what makes the content model consistent across the
 * whole block library — templates, the editor panels and AI generation all
 * rely on the same field names meaning the same thing everywhere.
 *
 * Conventions
 * - Text shown to visitors is `Localized`. Plain strings are only for data
 *   that is not translated: ids, icon names, URLs, handles, category ids.
 * - Almost everything is optional. A block must render sensibly with any
 *   subset of its fields (SPEC §7).
 * - List items always carry a stable `id`.
 * - Section intro fields are always `eyebrow`, `heading`, `intro` (headerShape).
 * - Calls to action are `primaryCta` / `secondaryCta` (or `cta` when there is one).
 *
 * Isomorphic.
 */
import { z } from 'zod'
import { idSchema, localizedSchema } from './fields'
import { MAX_ITEMS_PER_BLOCK } from './site'

/** Required localized text. */
export const L = localizedSchema
/** Optional localized text. */
export const optL = localizedSchema.optional()

/** A list capped at the per-block item limit (SPEC §6) or a smaller `max`. */
export function list<T extends z.ZodType>(item: T, max: number = MAX_ITEMS_PER_BLOCK) {
  return z.array(item).max(Math.min(max, 100))
}

/** `{ id, text }` — the simplest list item (feature bullets, rotating words, stickers). */
export const textItemSchema = z.object({ id: idSchema, text: L })
export type TextItem = z.infer<typeof textItemSchema>

/** `{ id, label, value }` — facts, audience rows, key/value details. */
export const factSchema = z.object({ id: idSchema, label: L, value: L })
export type Fact = z.infer<typeof factSchema>

/** The standard section intro. Spread into a block schema: `z.object({ ...headerShape, … })`. */
export const headerShape = {
  /** Small label above the heading. */
  eyebrow: optL,
  heading: optL,
  /** One or two sentences under the heading. */
  intro: optL,
}

export const headerSchema = z.object(headerShape)
export type HeaderContent = z.infer<typeof headerSchema>

/** Icon name in kebab-case from the curated set (`src/blocks/_shared/icons.ts`). */
export const iconSchema = z.string().max(40)

/** Untranslated short tags (technologies, tools), shown as-is in every language. */
export const tagsSchema = z.array(z.string().min(1).max(40)).max(12)

/** A free-form period label: "2021", "2021 – now", "Sep 2019". */
export const periodSchema = z.string().max(30)

/** Id of a category/type declared in the same block (gallery categories, publication types). */
export const categoryIdSchema = z.string().max(40)
