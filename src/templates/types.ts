/**
 * Templates (SPEC §4.3, §9.1, docs/TEMPLATES.md). A template is a complete
 * SiteContent (theme + pages + sections + bilingual example content) plus
 * gallery metadata. Adding a template = adding `src/templates/<id>/template.json`
 * and registering it in `./registry.ts`; no new code unless it needs a new
 * block variant.
 *
 * Isomorphic.
 */
import type { Tier } from '@/blocks/types'
import type { Locale, Localized } from '@/schemas/fields'
import type { SiteContent, SiteContentInput } from '@/schemas/site'

/** Gallery filters (SPEC §9.1). */
export const TEMPLATE_PROFESSIONS = [
  'job-seeker',
  'freelancer',
  'designer',
  'photographer',
  'developer',
  'coach',
  'creator',
  'business',
  'academic',
  'writer',
  'artist',
  'architect',
  'videographer',
] as const
export type TemplateProfession = (typeof TEMPLATE_PROFESSIONS)[number]

export const TEMPLATE_STYLES = ['minimal', 'bold', 'dark', 'elegant', 'playful', 'arabic-first'] as const
export type TemplateStyle = (typeof TEMPLATE_STYLES)[number]

export interface TemplateMeta {
  /** Kebab-case, equal to `content.theme.templateId`. */
  id: string
  name: Localized
  /** One sentence for the gallery card. */
  description: Localized
  tier: Tier
  /** "Best for" chips, e.g. { en: 'Photographers', ar: 'المصورون' }. */
  bestFor: Localized[]
  professions: TemplateProfession[]
  styles: TemplateStyle[]
  /** The one design idea that makes it memorable (TEMPLATES §0). */
  signature: Localized
  /** Majlis is Arabic-first; everything else opens in English. */
  defaultLocale: Locale
  /** Gallery ordering; lower first. */
  order: number
}

/** The shape of `template.json`. `content` is validated and defaulted on load. */
export interface TemplateFile extends TemplateMeta {
  content: SiteContentInput
}

export interface TemplateDefinition extends TemplateMeta {
  content: SiteContent
}

/** Preview images written by `npm run screenshots` (served from /public). */
export function templatePreview(id: string) {
  return {
    thumb: `/templates/${id}/thumb.jpg`,
    desktop: `/templates/${id}/preview-desktop.jpg`,
    mobile: `/templates/${id}/preview-mobile.jpg`,
  }
}
