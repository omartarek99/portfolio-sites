import { describe, expect, it } from 'vitest'
import { blockManifests } from '@/blocks/manifests'
import { checkSection, findSectionProblems, inspectSiteContent, validateSiteContent } from '@/blocks/validate'
import { SiteContentError, type Section } from '@/schemas/site'
import { starterContent } from '@/templates/starter'

const site = () => structuredClone(starterContent()) as ReturnType<typeof starterContent>

function heroSection(overrides: Partial<Section> = {}): Section {
  const manifest = blockManifests.hero
  return {
    id: 'check-hero',
    blockType: 'hero',
    variant: manifest.variants[0].id,
    content: structuredClone(manifest.defaultContent),
    style: {},
    animation: { entrance: 'fade' },
    responsive: {},
    ...overrides,
  }
}

describe('validateSiteContent', () => {
  it('accepts the starter site', () => {
    const validated = validateSiteContent(site())
    expect(validated.version).toBe(1)
    expect(validated.pages[0].slug).toBe('')
  })

  it('accepts the starter site after a JSON round-trip (what the database stores)', () => {
    expect(() => validateSiteContent(JSON.parse(JSON.stringify(site())))).not.toThrow()
  })

  it('finds no section problems in the starter site', () => {
    expect(findSectionProblems(validateSiteContent(site()))).toEqual([])
  })

  it('rejects a section whose content does not match its block schema', () => {
    const content = site()
    content.pages[0].sections[0].content = { heading: 'not localized' }
    expect(() => validateSiteContent(content)).toThrow(SiteContentError)
  })

  it('rejects an unknown variant with a message listing the real ones', () => {
    const content = site()
    content.pages[0].sections[0].variant = 'does-not-exist'
    expect(() => validateSiteContent(content)).toThrow(/Unknown variant "does-not-exist"/)
  })

  it('reports the number of broken sections and where', () => {
    const content = site()
    content.pages[0].sections[0].variant = 'nope'
    content.pages[0].sections[1].variant = 'nope'
    try {
      validateSiteContent(content)
      expect.unreachable('should have thrown')
    } catch (error) {
      expect((error as Error).message).toMatch(/^2 section\(s\) have invalid content/)
    }
  })

  it('prefixes issue paths with the section id', () => {
    const content = site()
    content.pages[0].sections[0].content = { heading: 42 }
    try {
      validateSiteContent(content)
      expect.unreachable('should have thrown')
    } catch (error) {
      const issues = (error as SiteContentError).issues
      expect(issues.length).toBeGreaterThan(0)
      expect(issues[0].path.slice(0, 2)).toEqual(['section', 'starter-hero'])
    }
  })

  it('still rejects structural problems (migration runs first)', () => {
    const content = site() as unknown as Record<string, unknown>
    content.pages = []
    expect(() => validateSiteContent(content)).toThrow(SiteContentError)
  })
})

describe('checkSection', () => {
  it('returns null for a valid section', () => {
    expect(checkSection(heroSection())).toBeNull()
  })

  it('reports an unknown block type', () => {
    const problem = checkSection(heroSection({ blockType: 'carousel' as 'hero' }))
    expect(problem?.message).toBe('Unknown block type')
  })

  it('reports an unknown variant', () => {
    expect(checkSection(heroSection({ variant: 'nope' }))?.message).toMatch(/^Unknown variant "nope"/)
  })

  it('reports an unknown mobile variant', () => {
    const problem = checkSection(heroSection({ responsive: { mobileVariant: 'nope' } }))
    expect(problem?.message).toBe('Unknown mobile variant "nope"')
  })

  it('accepts a real mobile variant', () => {
    const variants = blockManifests.hero.variants
    const mobile = variants[variants.length - 1].id
    expect(checkSection(heroSection({ responsive: { mobileVariant: mobile } }))).toBeNull()
  })

  it('reports invalid content with Zod issues attached', () => {
    const problem = checkSection(heroSection({ content: { heading: 42 } }))
    expect(problem?.message).toBe('Invalid content')
    expect(problem?.issues.length).toBeGreaterThan(0)
    expect(problem?.sectionId).toBe('check-hero')
    expect(problem?.blockType).toBe('hero')
  })

  it('accepts the default content of every block variant in the library', () => {
    for (const [blockType, manifest] of Object.entries(blockManifests)) {
      for (const variant of manifest.variants) {
        const problem = checkSection({
          id: `${blockType}-${variant.id}`,
          blockType: blockType as Section['blockType'],
          variant: variant.id,
          content: structuredClone(manifest.defaultContent),
          style: {},
          animation: { entrance: 'none' },
          responsive: {},
        })
        expect(problem, `${blockType}/${variant.id}: ${problem?.message}`).toBeNull()
      }
    }
  })
})

describe('inspectSiteContent', () => {
  it('returns the site and the problems instead of throwing', () => {
    const content = site()
    content.pages[0].sections[0].variant = 'nope'
    const { site: inspected, problems } = inspectSiteContent(content)
    expect(inspected.pages).toHaveLength(1)
    expect(problems).toHaveLength(1)
    expect(problems[0].sectionId).toBe('starter-hero')
  })

  it('still throws on structural problems', () => {
    expect(() => inspectSiteContent({ version: 99 })).toThrow(SiteContentError)
  })
})
