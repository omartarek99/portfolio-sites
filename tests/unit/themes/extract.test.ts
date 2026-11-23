import { describe, expect, it } from 'vitest'
import { PALETTE_KEYS, paletteSchema } from '@/schemas/site'
import { contrastRatio, hexToRgb, isDark } from '@/lib/color'
import { dominantColors, extractPalette } from '@/themes/extract'
import { paletteFailures } from '@/themes/palettes'

/** An RGBA buffer: each color repeated `repeat` times. */
function pixels(colors: string[], repeat = 32, alpha = 255): Uint8ClampedArray {
  const buffer = new Uint8ClampedArray(colors.length * repeat * 4)
  let i = 0
  for (const color of colors) {
    const { r, g, b } = hexToRgb(color)
    for (let n = 0; n < repeat; n++) {
      buffer[i++] = r
      buffer[i++] = g
      buffer[i++] = b
      buffer[i++] = alpha
    }
  }
  return buffer
}

const PHOTO = pixels(['#1C3F5A', '#1C3F5A', '#D96C3B', '#E8E2D6', '#6E8C7A'])
const LOGO = pixels(['#FFFFFF', '#FFFFFF', '#FFFFFF', '#7A1E3A', '#B8964F'])
const NIGHT = pixels(['#0B0D17', '#0B0D17', '#0B0D17', '#7C5CFF', '#22D3EE'])
const GREY = pixels(['#9A9A9A', '#9B9B9B', '#999999'])

describe('dominantColors', () => {
  it('finds the colors of a synthetic buffer', () => {
    const swatches = dominantColors(PHOTO, { colors: 4 })
    expect(swatches.length).toBeGreaterThanOrEqual(2)
    expect(swatches[0].weight).toBeGreaterThanOrEqual(swatches[swatches.length - 1].weight)
    expect(swatches.reduce((sum, s) => sum + s.weight, 0)).toBeCloseTo(1, 5)
    for (const swatch of swatches) expect(swatch.color).toMatch(/^#[0-9A-F]{6}$/)
  })

  it('ignores transparent pixels', () => {
    const transparent = pixels(['#FF0000'], 16, 0)
    expect(dominantColors(transparent)).toEqual([])
  })

  it('honours step without crashing on odd lengths', () => {
    expect(dominantColors(PHOTO, { step: 3 }).length).toBeGreaterThan(0)
    expect(dominantColors(new Uint8ClampedArray([10, 20, 30, 255]))).toHaveLength(1)
    expect(dominantColors(new Uint8ClampedArray())).toEqual([])
  })
})

describe('extractPalette', () => {
  const cases: [string, Uint8ClampedArray][] = [
    ['photo', PHOTO],
    ['logo', LOGO],
    ['night', NIGHT],
    ['flat grey', GREY],
    ['single pixel', new Uint8ClampedArray([200, 40, 60, 255])],
    ['empty', new Uint8ClampedArray()],
  ]

  it.each(cases)('returns a valid AA palette from %s pixels', (_label, buffer) => {
    const palette = extractPalette(buffer)
    expect(Object.keys(palette).sort()).toEqual([...PALETTE_KEYS].sort())
    expect(paletteSchema.safeParse(palette).success).toBe(true)
    expect(paletteFailures(palette)).toEqual([])
  })

  it('is deterministic', () => {
    expect(extractPalette(PHOTO)).toEqual(extractPalette(PHOTO))
  })

  it('follows the image lightness and can be forced', () => {
    expect(isDark(extractPalette(NIGHT).background)).toBe(true)
    expect(isDark(extractPalette(LOGO).background)).toBe(false)
    expect(isDark(extractPalette(LOGO, { mode: 'dark' }).background)).toBe(true)
    expect(isDark(extractPalette(NIGHT, { mode: 'light' }).background)).toBe(false)
    expect(paletteFailures(extractPalette(NIGHT, { mode: 'light' }))).toEqual([])
    expect(paletteFailures(extractPalette(LOGO, { mode: 'dark' }))).toEqual([])
  })

  it('keeps a saturated image color as the primary', () => {
    const palette = extractPalette(PHOTO)
    // The orange and the blue are the saturated colors; the sand is not.
    const brand = [palette.primary, palette.accent]
    for (const color of brand) expect(color).not.toBe(palette.background)
    expect(palette.primary).not.toBe(palette.accent)
    expect(contrastRatio(palette.text, palette.background)).toBeGreaterThanOrEqual(4.5)
  })

  it('tints the neutrals with the image instead of using plain grey', () => {
    const warm = extractPalette(pixels(['#C98B5A', '#C98B5A', '#8C4A2F']))
    const cool = extractPalette(pixels(['#5A8BC9', '#5A8BC9', '#2F4A8C']))
    expect(warm.background).not.toBe(cool.background)
    const warmRgb = hexToRgb(warm.background)
    const coolRgb = hexToRgb(cool.background)
    expect(warmRgb.r).toBeGreaterThan(warmRgb.b)
    expect(coolRgb.b).toBeGreaterThan(coolRgb.r)
  })
})
