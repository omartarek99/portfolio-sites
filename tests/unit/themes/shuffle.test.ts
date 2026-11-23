import { describe, expect, it } from 'vitest'
import { themeSchema, type Theme } from '@/schemas/site'
import { FONT_PAIRS, isKnownFont } from '@/themes/fonts'
import { CURATED_PALETTES, paletteFailures } from '@/themes/palettes'
import { shuffleSelection, shuffleStyle } from '@/themes/shuffle'

const BASE: Theme = {
  templateId: 'majlis',
  palette: {
    background: '#FBFAF7',
    surface: '#FFFFFF',
    text: '#1F2A2E',
    mutedText: '#636D72',
    primary: '#7A1E3A',
    secondary: '#1F4E5A',
    accent: '#B8964F',
    border: '#E6DFD1',
  },
  mode: 'light',
  fonts: {
    heading: { family: 'Cormorant Garamond' },
    body: { family: 'Inter' },
    arabicHeading: { family: 'El Messiri' },
    arabicBody: { family: 'Noto Kufi Arabic' },
  },
  radius: 'sm',
  spacing: 'airy',
  motion: 'subtle',
  buttonStyle: 'outline',
  backgroundStyle: { type: 'pattern', value: 'islamic-star' },
}

const SEEDS = ['a', 'seed-2', 'شكل', '42', 'fPqR-9', '', 'x'.repeat(200)]

describe('shuffleStyle', () => {
  it('is deterministic for a seed', () => {
    for (const seed of SEEDS) {
      expect(shuffleStyle(BASE, seed)).toEqual(shuffleStyle(BASE, seed))
    }
  })

  it('keeps the template and every knob the user set', () => {
    const next = shuffleStyle(BASE, 'seed-2')
    expect(next.templateId).toBe(BASE.templateId)
    expect(next.radius).toBe(BASE.radius)
    expect(next.spacing).toBe(BASE.spacing)
    expect(next.motion).toBe(BASE.motion)
    expect(next.buttonStyle).toBe(BASE.buttonStyle)
    expect(next.backgroundStyle).toEqual(BASE.backgroundStyle)
  })

  it('does not mutate the theme it is given', () => {
    const before = structuredClone(BASE)
    shuffleStyle(BASE, 'seed-2')
    expect(BASE).toEqual(before)
  })

  it('produces a valid theme with AA contrast and registered fonts', () => {
    for (let i = 0; i < 120; i++) {
      const seed = `shuffle-${i}`
      const next = shuffleStyle(BASE, seed)
      const parsed = themeSchema.safeParse(next)
      expect(parsed.success, seed).toBe(true)
      expect(paletteFailures(next.palette), seed).toEqual([])
      for (const ref of Object.values(next.fonts)) {
        expect(isKnownFont(ref.family), `${seed}: ${ref.family}`).toBe(true)
      }
    }
  })

  it('declares the mode the chosen palette was designed for', () => {
    for (let i = 0; i < 60; i++) {
      const seed = `mode-${i}`
      const { palette } = shuffleSelection(seed)
      expect(shuffleStyle(BASE, seed).mode).toBe(palette.mode)
    }
  })

  it('picks a font pair whose mood suits the palette group', () => {
    const moods: Record<string, string[]> = {
      'light-neutral': ['modern', 'editorial', 'classic', 'technical'],
      dark: ['modern', 'bold', 'technical'],
      vibrant: ['bold', 'friendly', 'modern'],
      earthy: ['elegant', 'editorial', 'classic', 'friendly'],
      gulf: ['elegant', 'editorial', 'classic'],
    }
    for (let i = 0; i < 60; i++) {
      const { palette, pair } = shuffleSelection(`mood-${i}`)
      expect(moods[palette.group], `${palette.id} + ${pair.id}`).toContain(pair.mood)
    }
  })

  it('reaches a spread of palettes and pairs across seeds', () => {
    const results = Array.from({ length: 300 }, (_, i) => shuffleSelection(`spread-${i}`))
    expect(new Set(results.map((r) => r.palette.id)).size).toBeGreaterThan(CURATED_PALETTES.length / 2)
    expect(new Set(results.map((r) => r.pair.id)).size).toBeGreaterThan(FONT_PAIRS.length / 2)
  })
})
