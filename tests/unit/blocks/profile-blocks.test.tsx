/**
 * About, Experience, Education and Skills: every variant renders to static
 * markup with full, required-only and empty content, in both languages,
 * without leaving empty headings or stray separators behind (SPEC §7).
 */
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { aboutBlock } from '@/blocks/about'
import { educationBlock } from '@/blocks/education'
import { experienceBlock } from '@/blocks/experience'
import { skillsBlock } from '@/blocks/skills'
import { groupSkills } from '@/blocks/skills/variants/Groups'
import type { AnyBlockDefinition, BlockContext } from '@/blocks/types'
import { buildSiteRuntime } from '@/lib/sites/runtime'
import { dirOf, type Locale } from '@/schemas/fields'
import type { Section } from '@/schemas/site'
import { starterContent } from '@/templates/starter'

const BLOCKS: AnyBlockDefinition[] = [aboutBlock, experienceBlock, educationBlock, skillsBlock]

/** The smallest content each schema accepts that still has list items. */
const REQUIRED_ONLY: Record<string, Record<string, unknown>> = {
  about: { milestones: [{ id: 'm1', title: { en: 'Started', ar: 'البداية' } }] },
  experience: { items: [{ id: 'x1', role: { en: 'Designer', ar: 'مصممة' } }] },
  education: { items: [{ id: 'e1', qualification: { en: 'B.A.', ar: 'بكالوريوس' } }] },
  skills: { items: [{ id: 's1', name: { en: 'Figma', ar: 'Figma' } }, { id: 's2', name: { en: 'Arabic', ar: 'العربية' } }] },
}

function render(block: AnyBlockDefinition, variant: string, content: Record<string, unknown>, locale: Locale): string {
  const parsed = block.manifest.schema.parse(content)
  const site = buildSiteRuntime({ siteId: 'test', content: starterContent(), locale, mode: 'live' })
  const section: Section = { id: 'sec', blockType: block.manifest.type, variant, content: parsed, style: {}, animation: { entrance: 'none' }, responsive: {} }
  const ctx: BlockContext = { site, mode: 'live', locale, dir: dirOf(locale), sectionId: 'sec', index: 1 }
  return renderToStaticMarkup(
    createElement(block.Component, { section, content: parsed, variant, theme: site.theme, locale, mode: 'live', siteId: 'test', ctx }),
  )
}

const cases = BLOCKS.flatMap((block) =>
  block.manifest.variants.flatMap((v) => (['en', 'ar'] as const).map((locale) => ({ block, type: block.manifest.type, variant: v.id, locale }))),
)

describe.each(cases)('$type/$variant ($locale)', ({ block, type, variant, locale }) => {
  it('renders the example content', () => {
    const html = render(block, variant, block.manifest.defaultContent, locale)
    expect(html.length).toBeGreaterThan(200)
    expect(html).not.toMatch(/<(h[1-6]|p|li|ul|ol)[^>]*><\/\1>/)
  })

  it('renders items that have only their required fields', () => {
    const html = render(block, variant, REQUIRED_ONLY[type], locale)
    expect(html).not.toMatch(/<(h[1-6]|p|li|ul|ol|header|figcaption)[^>]*><\/\1>/)
    expect(html).not.toContain('·')
    expect(html).not.toContain(' – ')
    expect(html).not.toContain('role="meter"')
  })

  it('renders with no content at all', () => {
    const html = render(block, variant, {}, locale)
    expect(html).not.toMatch(/<(h[1-6]|p|li|ul|ol|header|figure|figcaption|blockquote)[^>]*>/)
  })
})

describe('skills', () => {
  it('exposes every level as a meter with a spoken value, never colour alone', () => {
    for (const variant of ['bars', 'radial']) {
      const html = render(skillsBlock, variant, skillsBlock.manifest.defaultContent, 'en')
      expect(html.match(/role="meter"/g)).toHaveLength(10)
      expect(html).toContain('aria-valuetext="4 of 5"')
      expect(html).toContain('4/5')
    }
    expect(render(skillsBlock, 'icon-grid', skillsBlock.manifest.defaultContent, 'ar')).toContain('aria-label="4 من 5"')
  })

  it('groups by label in first-seen order and keeps original indexes', () => {
    const items = [
      { id: 'a', name: { en: 'A' }, group: { en: 'One' } },
      { id: 'b', name: { en: 'B' } },
      { id: 'c', name: { en: 'C' }, group: { en: 'One' } },
    ]
    expect(groupSkills(items, 'en').map((g) => [g.label, g.entries.map((e) => e.index)])).toEqual([
      ['One', [0, 2]],
      ['', [1]],
    ])
  })
})

describe('experience', () => {
  it('labels a current role with "Present" in the site language', () => {
    expect(render(experienceBlock, 'compact', experienceBlock.manifest.defaultContent, 'en')).toContain('2021 – Present')
    expect(render(experienceBlock, 'compact', experienceBlock.manifest.defaultContent, 'ar')).toContain('2021 – الآن')
  })
})
