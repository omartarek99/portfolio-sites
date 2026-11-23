import { describe, expect, it } from 'vitest'
import {
  contrastRatio,
  hexToRgb,
  isDark,
  isHexColor,
  luminance,
  meetsAA,
  mix,
  readableOn,
  rgbToHex,
} from '@/lib/color'

const BLACK = '#000000'
const WHITE = '#FFFFFF'
/** Positivus tokens from docs/DESIGN.md. */
const INK = '#191A23'
const LIME = '#B9FF66'

describe('hexToRgb / rgbToHex', () => {
  it('parses 6-digit and 3-digit hex', () => {
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 })
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
    expect(hexToRgb('#B9FF66')).toEqual({ r: 185, g: 255, b: 102 })
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 })
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('works without the leading hash', () => {
    expect(hexToRgb('B9FF66')).toEqual({ r: 185, g: 255, b: 102 })
  })

  it('round-trips through rgbToHex in upper case', () => {
    expect(rgbToHex(hexToRgb('#b9ff66'))).toBe('#B9FF66')
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000')
  })

  it('clamps and rounds out-of-range channels', () => {
    expect(rgbToHex({ r: -20, g: 300, b: 127.6 })).toBe('#00FF80')
  })
})

describe('luminance', () => {
  it('matches the WCAG reference values', () => {
    expect(luminance(WHITE)).toBeCloseTo(1, 5)
    expect(luminance(BLACK)).toBeCloseTo(0, 5)
    expect(luminance('#808080')).toBeCloseTo(0.2158, 3)
    expect(luminance('#FF0000')).toBeCloseTo(0.2126, 4)
    expect(luminance('#00FF00')).toBeCloseTo(0.7152, 4)
    expect(luminance('#0000FF')).toBeCloseTo(0.0722, 4)
  })
})

describe('contrastRatio', () => {
  it('is 21 for black on white and 1 for a color on itself', () => {
    expect(contrastRatio(BLACK, WHITE)).toBeCloseTo(21, 5)
    expect(contrastRatio(WHITE, WHITE)).toBeCloseTo(1, 5)
    expect(contrastRatio(LIME, LIME)).toBeCloseTo(1, 5)
  })

  it('is symmetric', () => {
    expect(contrastRatio(WHITE, BLACK)).toBeCloseTo(contrastRatio(BLACK, WHITE), 10)
    expect(contrastRatio(INK, LIME)).toBeCloseTo(contrastRatio(LIME, INK), 10)
  })

  it('matches known values', () => {
    // https://webaim.org/resources/contrastchecker/
    expect(contrastRatio('#767676', WHITE)).toBeCloseTo(4.54, 2)
    expect(contrastRatio('#949494', WHITE)).toBeCloseTo(3.0, 1)
    expect(contrastRatio('#0000FF', WHITE)).toBeCloseTo(8.59, 2)
    expect(contrastRatio('#191A23', '#B9FF66')).toBeCloseTo(14.47, 2)
  })

  it('stays between 1 and 21', () => {
    for (const hex of [BLACK, WHITE, INK, LIME, '#3D5AFE', '#F3F3F3', '#595A66']) {
      for (const other of [BLACK, WHITE, INK, LIME]) {
        const ratio = contrastRatio(hex, other)
        expect(ratio).toBeGreaterThanOrEqual(1)
        expect(ratio).toBeLessThanOrEqual(21)
      }
    }
  })
})

describe('meetsAA', () => {
  it('requires 4.5 for normal text and 3 for large text', () => {
    expect(meetsAA('#767676', WHITE)).toBe(true)
    expect(meetsAA('#777777', WHITE)).toBe(false)
    expect(meetsAA('#777777', WHITE, true)).toBe(true)
    expect(meetsAA('#AAAAAA', WHITE, true)).toBe(false)
  })

  it('passes for the Positivus pairings', () => {
    expect(meetsAA(INK, WHITE)).toBe(true)
    expect(meetsAA(INK, LIME)).toBe(true)
    expect(meetsAA(WHITE, INK)).toBe(true)
  })

  it('fails for lime text on white', () => {
    expect(meetsAA(LIME, WHITE)).toBe(false)
  })
})

describe('readableOn', () => {
  it('picks the darker candidate on a light background and the lighter one on a dark background', () => {
    expect(readableOn(WHITE)).toBe('#0B0B0F')
    expect(readableOn(LIME)).toBe('#0B0B0F')
    expect(readableOn(BLACK)).toBe(WHITE)
    expect(readableOn(INK)).toBe(WHITE)
  })

  it('honours custom candidates', () => {
    expect(readableOn(WHITE, [INK, LIME])).toBe(INK)
    expect(readableOn(INK, [WHITE, LIME])).toBe(WHITE)
  })

  it('always returns a candidate, even when none has good contrast', () => {
    expect(readableOn('#808080', ['#7F7F7F', '#818181'])).toMatch(/^#8|^#7/)
  })

  it('returns a result that meets AA for every palette background in the starter theme', () => {
    for (const background of ['#FFFFFF', '#F3F3F3', '#191A23', '#3D5AFE', '#B9FF66']) {
      expect(meetsAA(readableOn(background), background), background).toBe(true)
    }
  })
})

describe('mix', () => {
  it('interpolates linearly in sRGB', () => {
    expect(mix(BLACK, WHITE, 0)).toBe('#000000')
    expect(mix(BLACK, WHITE, 1)).toBe('#FFFFFF')
    expect(mix(BLACK, WHITE, 0.5)).toBe('#808080')
    expect(mix(BLACK, WHITE, 0.25)).toBe('#404040')
  })

  it('clamps the amount to 0–1', () => {
    expect(mix(BLACK, WHITE, -1)).toBe('#000000')
    expect(mix(BLACK, WHITE, 2)).toBe('#FFFFFF')
  })

  it('mixes per channel', () => {
    expect(mix('#FF0000', '#0000FF', 0.5)).toBe('#800080')
  })
})

describe('isDark', () => {
  it('splits dark from light backgrounds', () => {
    expect(isDark(BLACK)).toBe(true)
    expect(isDark(INK)).toBe(true)
    expect(isDark('#3D5AFE')).toBe(true)
    expect(isDark(WHITE)).toBe(false)
    expect(isDark(LIME)).toBe(false)
    expect(isDark('#F3F3F3')).toBe(false)
  })
})

describe('isHexColor', () => {
  it('accepts a 6-digit hex string only', () => {
    expect(isHexColor('#B9FF66')).toBe(true)
    expect(isHexColor('#b9ff66')).toBe(true)
    expect(isHexColor('#fff')).toBe(false)
    expect(isHexColor('B9FF66')).toBe(false)
    expect(isHexColor('rgb(0,0,0)')).toBe(false)
    expect(isHexColor(null)).toBe(false)
    expect(isHexColor(16777215)).toBe(false)
  })
})
