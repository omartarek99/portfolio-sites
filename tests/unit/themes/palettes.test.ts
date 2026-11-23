import { describe, expect, it } from 'vitest'
import {
  AA_RATIO,
  CURATED_PALETTES,
  KNOWN_CONTRAST_EXCEPTIONS,
  PALETTE_GROUPS,
  TEMPLATE_PALETTES,
  getPalette,
  paletteContrast,
  paletteFailures,
  palettesByGroup,
  templatePalettes,
} from '@/themes/palettes'
import { PALETTE_KEYS, paletteSchema } from '@/schemas/site'

/** The six Gulf palettes TEMPLATES §18 names explicitly. */
const GULF_IDS = ['pearl', 'desert-dusk', 'maroon-gold', 'sea-sand', 'night-souq', 'palm']

const TEMPLATE_IDS = [
  'aurora',
  'editorial',
  'launch',
  'minimal-cv',
  'noir-lens',
  'grid-pop',
  'terminal',
  'atelier',
  'bloom-coach',
  'majlis',
  'creator-hub',
  'blueprint',
  'scholar',
  'motion-reel',
  'bento',
  'founder',
]

describe('curated palettes', () => {
  it('ships 30 palettes in 5 groups of 6', () => {
    expect(CURATED_PALETTES).toHaveLength(30)
    const groups = palettesByGroup()
    expect(Object.keys(groups).sort()).toEqual([...PALETTE_GROUPS].sort())
    for (const group of PALETTE_GROUPS) {
      expect(groups[group], group).toHaveLength(6)
    }
  })

  it('has unique ids and bilingual names', () => {
    const ids = CURATED_PALETTES.map((entry) => entry.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const entry of CURATED_PALETTES) {
      expect(entry.name.en, entry.id).toBeTruthy()
      expect(entry.name.ar, entry.id).toBeTruthy()
      // Arabic names must be Arabic script, not transliteration.
      expect(entry.name.ar, entry.id).toMatch(/[؀-ۿ]/)
      expect(getPalette(entry.id)).toBe(entry)
    }
  })

  it('defines all 8 palette keys as valid hex', () => {
    for (const entry of CURATED_PALETTES) {
      expect(Object.keys(entry.palette).sort(), entry.id).toEqual([...PALETTE_KEYS].sort())
      expect(paletteSchema.safeParse(entry.palette).success, entry.id).toBe(true)
    }
  })

  it('declares a mode that matches the background', () => {
    for (const entry of CURATED_PALETTES) {
      const light = paletteContrast(entry.palette)
      expect(light['text-on-background'], entry.id).toBeGreaterThanOrEqual(AA_RATIO)
      expect(['light', 'dark']).toContain(entry.mode)
    }
  })

  it('passes WCAG AA on every checked pairing', () => {
    const failures = CURATED_PALETTES.filter((entry) => paletteFailures(entry.palette).length > 0).map(
      (entry) => ({
        id: entry.id,
        failures: paletteFailures(entry.palette),
      }),
    )
    expect(failures).toEqual([])
  })

  it('includes the six Gulf-inspired palettes', () => {
    const gulf = palettesByGroup().gulf.map((entry) => entry.id)
    expect(gulf.sort()).toEqual([...GULF_IDS].sort())
  })
})

describe('template palettes', () => {
  it('covers all 16 templates with a default and 3 alternatives', () => {
    expect(Object.keys(TEMPLATE_PALETTES).sort()).toEqual([...TEMPLATE_IDS].sort())
    for (const templateId of TEMPLATE_IDS) {
      const set = templatePalettes(templateId)
      expect(set, templateId).toBeDefined()
      expect(paletteSchema.safeParse(set?.default).success, templateId).toBe(true)
      expect(set?.alternatives, templateId).toHaveLength(3)
      const ids = set?.alternatives.map((entry) => entry.id) ?? []
      expect(new Set(ids).size, templateId).toBe(3)
    }
  })

  it('keeps the catalog hex values', () => {
    // Spot-check against docs/TEMPLATES.md.
    expect(templatePalettes('aurora')?.default.primary).toBe('#7C5CFF')
    expect(templatePalettes('majlis')?.default.primary).toBe('#7A1E3A')
    expect(templatePalettes('bento')?.default.background).toBe('#F2F2F7')
    expect(templatePalettes('motion-reel')?.default.accent).toBe('#FFC53D')
  })

  it('offers only AA-safe alternatives', () => {
    for (const set of Object.values(TEMPLATE_PALETTES)) {
      for (const alternative of set.alternatives) {
        expect(paletteFailures(alternative.palette), `${set.templateId}/${alternative.id}`).toEqual([])
      }
    }
  })

  it('records every default that misses AA as a known exception', () => {
    for (const set of Object.values(TEMPLATE_PALETTES)) {
      for (const failure of paletteFailures(set.default)) {
        expect(KNOWN_CONTRAST_EXCEPTIONS, `${set.templateId}/${failure.check}`).toContainEqual({
          templateId: set.templateId,
          ...failure,
        })
      }
    }
  })
})
