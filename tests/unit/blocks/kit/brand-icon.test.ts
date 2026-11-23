import { describe, expect, it } from 'vitest'
import { BRAND_PATHS, hasBrandIcon } from '@/blocks/_shared/BrandIcon'
import { ICONS } from '@/blocks/_shared/icons'
import { SOCIAL_PLATFORMS } from '@/schemas/fields'
import { SOCIAL_LABELS } from '@/lib/links'

/** The two generic platforms draw Lucide icons instead of a brand glyph. */
type Generic = 'website' | 'email'
const GENERIC: readonly string[] = ['website', 'email'] satisfies readonly Generic[]

const isGeneric = (platform: string): platform is Generic => GENERIC.includes(platform)

describe('BrandIcon', () => {
  it('covers every social platform', () => {
    for (const platform of SOCIAL_PLATFORMS) {
      expect(hasBrandIcon(platform), platform).toBe(true)
    }
  })

  it('has brand path data for every platform except the generic two', () => {
    for (const platform of SOCIAL_PLATFORMS) {
      if (isGeneric(platform)) {
        expect(platform in BRAND_PATHS, platform).toBe(false)
        continue
      }
      const path = BRAND_PATHS[platform]
      expect(typeof path, platform).toBe('string')
      expect(path.length, platform).toBeGreaterThan(20)
      // Valid SVG path data starts with a move command.
      expect(path.trimStart()[0].toLowerCase(), platform).toBe('m')
    }
  })

  it('adds no platform the schema does not know', () => {
    for (const platform of Object.keys(BRAND_PATHS)) {
      expect(SOCIAL_PLATFORMS as readonly string[]).toContain(platform)
    }
  })

  it('falls back to the curated Lucide globe and mail for website and email', () => {
    expect(ICONS.globe).toBeDefined()
    expect(ICONS.mail).toBeDefined()
  })

  it('has a label for every platform, for the accessible name', () => {
    for (const platform of SOCIAL_PLATFORMS) {
      expect(SOCIAL_LABELS[platform]?.en, platform).toBeTruthy()
      expect(SOCIAL_LABELS[platform]?.ar, platform).toBeTruthy()
    }
  })

  it('rejects an unknown platform name', () => {
    expect(hasBrandIcon('myspace')).toBe(false)
  })
})
