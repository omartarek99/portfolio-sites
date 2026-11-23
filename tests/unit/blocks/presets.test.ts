import { describe, expect, it } from 'vitest'
import { blockManifests } from '@/blocks/manifests'
import { SECTION_PRESETS, getPreset, presetsByCategory, presetsForBlock } from '@/blocks/presets'
import { sectionAnimationSchema, sectionStyleSchema, type BlockType } from '@/schemas/site'

describe('section presets', () => {
  it('has at least 60 presets with unique kebab-case ids', () => {
    expect(SECTION_PRESETS.length).toBeGreaterThanOrEqual(60)
    const ids = SECTION_PRESETS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it.each(SECTION_PRESETS.map((p) => [p.id, p] as const))('%s is valid', (_id, p) => {
    const m = blockManifests[p.blockType]
    expect(m, 'block exists').toBeDefined()
    expect(m.global).toBeFalsy()
    const variant = m.variants.find((v) => v.id === p.variant)
    expect(variant, 'variant exists').toBeDefined()
    expect(p.tier).toBe(variant!.tier)
    expect(p.category).toBe(m.category)
    expect(p.name.en?.trim()).toBeTruthy()
    expect(p.name.ar?.trim()).toBeTruthy()
    const parsed = m.schema.safeParse(p.content)
    expect(parsed.success, parsed.error?.message).toBe(true)
    if (p.style) expect(sectionStyleSchema.safeParse(p.style).success).toBe(true)
    if (p.animation) expect(sectionAnimationSchema.safeParse(p.animation).success).toBe(true)
    const json = JSON.stringify(p)
    expect(json).not.toContain('"example"')
    expect(json).not.toMatch(/"type":"page"/)
  })

  it('meets the TEMPLATES §17 per-kind minimums', () => {
    const count = (...types: BlockType[]) => SECTION_PRESETS.filter((p) => types.includes(p.blockType)).length
    expect(count('hero')).toBeGreaterThanOrEqual(12)
    expect(count('about')).toBeGreaterThanOrEqual(6)
    expect(count('experience')).toBeGreaterThanOrEqual(4)
    expect(count('projects')).toBeGreaterThanOrEqual(8)
    expect(count('testimonials')).toBeGreaterThanOrEqual(5)
    expect(count('services', 'pricing')).toBeGreaterThanOrEqual(6)
    expect(count('stats')).toBeGreaterThanOrEqual(3)
    expect(count('gallery')).toBeGreaterThanOrEqual(4)
    expect(count('contact')).toBeGreaterThanOrEqual(5)
    expect(count('booking')).toBeGreaterThanOrEqual(2)
    expect(count('cta')).toBeGreaterThanOrEqual(5)
  })

  it('looks presets up by id, block and category', () => {
    expect(getPreset('hero-aurora')?.blockType).toBe('hero')
    expect(getPreset('nope')).toBeUndefined()
    expect(presetsForBlock('hero').length).toBeGreaterThanOrEqual(12)
    const grouped = presetsByCategory()
    expect(Object.values(grouped).flat().length).toBe(SECTION_PRESETS.length)
    expect(grouped.intro?.every((p) => p.category === 'intro')).toBe(true)
  })
})
