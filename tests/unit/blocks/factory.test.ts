import { describe, expect, it } from 'vitest'
import {
  createPage,
  createSection,
  createSectionFromPreset,
  duplicateSection,
  newId,
  refreshIds,
  slugify,
} from '@/blocks/factory'
import { blockManifests } from '@/blocks/manifests'
import { checkSection } from '@/blocks/validate'
import { idSchema } from '@/schemas/fields'
import { GLOBAL_BLOCK_TYPES, PAGE_SLUG_REGEX, type BlockType } from '@/schemas/site'

/** Every id found anywhere in a value. */
function collectIds(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) collectIds(item, out)
  } else if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (key === 'id' && typeof child === 'string') out.push(child)
      else collectIds(child, out)
    }
  }
  return out
}

describe('newId', () => {
  it('produces ids the schema accepts', () => {
    for (let i = 0; i < 20; i++) {
      expect(idSchema.safeParse(newId()).success).toBe(true)
      expect(idSchema.safeParse(newId('s')).success).toBe(true)
    }
  })

  it('prefixes when asked', () => {
    expect(newId('s')).toMatch(/^s_[0-9a-zA-Z]{10}$/)
    expect(newId()).toMatch(/^[0-9a-zA-Z]{10}$/)
  })

  it('is unique across many calls', () => {
    const ids = new Set(Array.from({ length: 500 }, () => newId()))
    expect(ids.size).toBe(500)
  })
})

describe('refreshIds', () => {
  it('replaces every id in a tree and leaves everything else alone', () => {
    const before = {
      id: 'old-root',
      heading: { en: 'Keep me' },
      items: [
        { id: 'old-1', title: { en: 'One' } },
        { id: 'old-2', nested: { id: 'old-3' } },
      ],
      count: 3,
      flag: false,
      nothing: null,
    }
    const after = refreshIds(structuredClone(before))

    expect(after.heading).toEqual({ en: 'Keep me' })
    expect(after.count).toBe(3)
    expect(after.flag).toBe(false)
    expect(after.nothing).toBeNull()

    const oldIds = collectIds(before)
    const newIds = collectIds(after)
    expect(newIds).toHaveLength(oldIds.length)
    expect(newIds.some((id) => oldIds.includes(id))).toBe(false)
    expect(new Set(newIds).size).toBe(newIds.length)
  })

  it('does not mutate the input', () => {
    const before = { id: 'keep', items: [{ id: 'keep-1' }] }
    const snapshot = structuredClone(before)
    refreshIds(before)
    expect(before).toEqual(snapshot)
  })

  it('leaves a non-string id alone', () => {
    expect(refreshIds({ id: 7 })).toEqual({ id: 7 })
  })

  it('passes primitives through', () => {
    expect(refreshIds('x')).toBe('x')
    expect(refreshIds(1)).toBe(1)
    expect(refreshIds(null)).toBeNull()
  })
})

describe('createSection', () => {
  it('uses the block default variant and example content', () => {
    const section = createSection('hero')
    expect(section.blockType).toBe('hero')
    expect(section.variant).toBe(blockManifests.hero.variants[0].id)
    expect(section.id).toMatch(/^s_/)
    expect(checkSection(section)).toBeNull()
  })

  it('accepts a known variant and falls back to the default for an unknown one', () => {
    const variants = blockManifests.hero.variants
    const last = variants[variants.length - 1].id
    expect(createSection('hero', last).variant).toBe(last)
    expect(createSection('hero', 'nope').variant).toBe(variants[0].id)
  })

  it('gives each section a fresh id, and fresh ids to any list items in its content', () => {
    for (const blockType of Object.keys(blockManifests) as BlockType[]) {
      const a = createSection(blockType)
      const b = createSection(blockType)
      expect(a.id, blockType).not.toBe(b.id)
      const aIds = collectIds(a.content)
      const bIds = collectIds(b.content)
      // Blocks whose example content has no list items yet contribute nothing here.
      expect(
        aIds.some((id) => bIds.includes(id)),
        blockType,
      ).toBe(false)
    }
  })

  it('does not share content with the manifest default', () => {
    const section = createSection('hero')
    expect(section.content).not.toBe(blockManifests.hero.defaultContent)
    section.content.heading = { en: 'Changed' }
    expect((blockManifests.hero.defaultContent as Record<string, unknown>).heading).not.toEqual({
      en: 'Changed',
    })
  })

  it('gives global blocks no entrance animation and page blocks a fade', () => {
    for (const blockType of GLOBAL_BLOCK_TYPES) {
      expect(createSection(blockType).animation).toEqual({ entrance: 'none' })
    }
    expect(createSection('hero').animation).toEqual({ entrance: 'fade' })
  })

  it('applies overrides last', () => {
    const section = createSection('hero', undefined, { id: 'fixed', anchor: 'top' })
    expect(section.id).toBe('fixed')
    expect(section.anchor).toBe('top')
  })

  it('creates a valid section for every block type in the library', () => {
    for (const blockType of Object.keys(blockManifests) as BlockType[]) {
      const section = createSection(blockType)
      expect(checkSection(section), `${blockType}: ${checkSection(section)?.message}`).toBeNull()
    }
  })
})

describe('createSectionFromPreset', () => {
  it('keeps the preset variant, style and animation, with fresh ids', () => {
    const manifest = blockManifests.services
    const preset = {
      id: 'preset-services',
      name: { en: 'Services, three columns' },
      category: 'sell' as const,
      blockType: 'services' as const,
      variant: manifest.variants[0].id,
      tier: 'free' as const,
      style: { paddingY: 'xl' as const },
      animation: { entrance: 'stagger' as const },
      content: structuredClone(manifest.defaultContent),
    }
    const section = createSectionFromPreset(preset)
    expect(section.id).toMatch(/^s_/)
    expect(section.variant).toBe(preset.variant)
    expect(section.style).toEqual({ paddingY: 'xl' })
    expect(section.animation).toEqual({ entrance: 'stagger' })
    expect(section.style).not.toBe(preset.style)
    expect(checkSection(section)).toBeNull()

    const presetIds = collectIds(preset.content)
    if (presetIds.length > 0) {
      expect(collectIds(section.content).some((id) => presetIds.includes(id))).toBe(false)
    }
  })

  it('defaults style and animation when the preset has none', () => {
    const manifest = blockManifests.hero
    const section = createSectionFromPreset({
      id: 'p',
      name: { en: 'Hero' },
      category: 'intro',
      blockType: 'hero',
      variant: manifest.variants[0].id,
      tier: 'free',
      content: structuredClone(manifest.defaultContent),
    })
    expect(section.style).toEqual({})
    expect(section.animation).toEqual({ entrance: 'fade' })
  })
})

describe('duplicateSection', () => {
  it('gives the copy a new section id and new item ids', () => {
    const original = createSection('projects', undefined, { anchor: 'work' })
    const copy = duplicateSection(original)

    expect(copy.id).not.toBe(original.id)
    expect(copy.id).toMatch(/^s_/)
    expect(copy.blockType).toBe(original.blockType)
    expect(copy.variant).toBe(original.variant)

    const originalIds = collectIds(original.content)
    const copyIds = collectIds(copy.content)
    expect(copyIds).toHaveLength(originalIds.length)
    expect(copyIds.some((id) => originalIds.includes(id))).toBe(false)
  })

  it('clears the anchor so two sections cannot share one', () => {
    expect(duplicateSection(createSection('hero', undefined, { anchor: 'top' })).anchor).toBeUndefined()
  })

  it('does not mutate or share state with the original', () => {
    const original = createSection('projects')
    const snapshot = structuredClone(original)
    const copy = duplicateSection(original)
    expect(original).toEqual(snapshot)
    expect(copy.content).not.toBe(original.content)
    expect(copy.style).not.toBe(original.style)
  })

  it('produces a section that still validates', () => {
    expect(checkSection(duplicateSection(createSection('testimonials')))).toBeNull()
  })
})

describe('createPage', () => {
  it('builds a public standard page with a fresh id', () => {
    const page = createPage({ en: 'Work', ar: 'الأعمال' }, 'work')
    expect(page.id).toMatch(/^p_/)
    expect(page.slug).toBe('work')
    expect(page.type).toBe('standard')
    expect(page.visibility).toBe('public')
    expect(page.sections).toEqual([])
  })

  it('keeps the sections it is given', () => {
    const section = createSection('hero')
    expect(createPage({ en: 'Home' }, '', [section]).sections).toEqual([section])
  })
})

describe('slugify', () => {
  it('turns a title into a URL-safe segment', () => {
    expect(slugify('About Me')).toBe('about-me')
    expect(slugify('Case Study: Noor Studio')).toBe('case-study-noor-studio')
    expect(slugify('  Spaced   Out  ')).toBe('spaced-out')
    expect(slugify('2026 Review')).toBe('2026-review')
  })

  it('drops accents and punctuation', () => {
    expect(slugify('Zoë Müller')).toBe('zoe-muller')
    expect(slugify('Design & Code!')).toBe('design-code')
  })

  it('falls back to a short id for text with no Latin characters', () => {
    for (const text of ['نبذة عني', '', '---', '東京']) {
      const slug = slugify(text)
      expect(slug, text).toMatch(/^page-[0-9a-z]{6}$/)
    }
  })

  it('always produces a slug the page schema accepts', () => {
    for (const text of [
      'About Me',
      'نبذة عني',
      'Case Study: Noor Studio',
      '---',
      '!!!',
      'A'.repeat(200),
      '2026',
      'Zoë Müller',
    ]) {
      const slug = slugify(text)
      expect(PAGE_SLUG_REGEX.test(slug), `${text} → ${slug}`).toBe(true)
      expect(slug.length).toBeLessThanOrEqual(60)
    }
  })
})
