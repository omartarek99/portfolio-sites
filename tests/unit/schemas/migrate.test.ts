import { describe, expect, it } from 'vitest'
import { CURRENT_SITE_VERSION, migrateSiteContent, siteContentSchema, SiteContentError } from '@/schemas/site'
import { clone, validSite } from './fixture'

/** The same site as it was stored before `version` existed (v0 drafts). */
function v0Site(): Record<string, unknown> {
  const site = clone(validSite()) as Record<string, unknown>
  delete site.version
  delete site.locales
  delete site.globalSections
  site.locale = 'ar'
  site.settings = { seo: { titleTemplate: '%s — Layla' }, social: [] }
  return site
}

describe('migrateSiteContent', () => {
  it('migrates a v0 document to the current version', () => {
    const migrated = migrateSiteContent(v0Site())
    expect(migrated.version).toBe(CURRENT_SITE_VERSION)
  })

  it('turns the single v0 `locale` into `locales` and drops the old key', () => {
    const migrated = migrateSiteContent(v0Site())
    expect(migrated.locales).toEqual(['ar'])
    expect('locale' in migrated).toBe(false)
  })

  it('defaults a v0 document without a locale to English', () => {
    const raw = v0Site()
    delete raw.locale
    expect(migrateSiteContent(raw).locales).toEqual(['en'])
  })

  it('keeps a v0 `locales` array when one is already present', () => {
    const raw = v0Site()
    raw.locales = ['en', 'ar']
    expect(migrateSiteContent(raw).locales).toEqual(['en', 'ar'])
  })

  it('adds the missing globalSections and settings keys', () => {
    const migrated = migrateSiteContent(v0Site())
    expect(migrated.globalSections).toEqual({})
    expect(migrated.settings.cookieBanner).toBe(false)
    expect(migrated.settings.social).toEqual([])
    expect(migrated.settings.contact).toEqual({})
    // existing settings survive
    expect(migrated.settings.seo.titleTemplate).toBe('%s — Layla')
  })

  it('leaves a v1 document unchanged', () => {
    const site = siteContentSchema.parse(validSite())
    expect(migrateSiteContent(structuredClone(site))).toEqual(site)
  })

  it('does not mutate the input', () => {
    const raw = v0Site()
    const before = structuredClone(raw)
    migrateSiteContent(raw)
    expect(raw).toEqual(before)
  })

  it('rejects a version newer than this app supports', () => {
    const raw = clone(validSite()) as Record<string, unknown>
    raw.version = CURRENT_SITE_VERSION + 1
    expect(() => migrateSiteContent(raw)).toThrow(SiteContentError)
    expect(() => migrateSiteContent(raw)).toThrow(/newer than this app supports/)
  })

  it.each([null, undefined, 42, 'site', true, [], [validSite()]])('rejects the non-object %o', (raw) => {
    expect(() => migrateSiteContent(raw)).toThrow(SiteContentError)
  })

  it('reports structural issues after migrating', () => {
    const raw = v0Site()
    raw.pages = []
    try {
      migrateSiteContent(raw)
      expect.unreachable('should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(SiteContentError)
      expect((error as SiteContentError).issues.length).toBeGreaterThan(0)
    }
  })
})
