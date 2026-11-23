import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { getTemplate, listTemplates, TEMPLATE_IDS } from '@/templates/registry'
import { TEMPLATE_PROFESSIONS, TEMPLATE_STYLES } from '@/templates/types'
import { isKnownFont } from '@/themes/fonts'
import { templatePalettes } from '@/themes/palettes'

const root = path.resolve('src/templates')
const folders = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(path.join(root, d.name, 'template.json')))
  .map((d) => d.name)

describe('template registry', () => {
  it('registers the 16 catalog templates, one per folder', () => {
    expect(TEMPLATE_IDS).toHaveLength(16)
    expect(new Set(TEMPLATE_IDS).size).toBe(16)
    expect([...TEMPLATE_IDS].sort()).toEqual([...folders].sort())
  })

  it('has at least one Free and one Pro template', () => {
    const tiers = new Set(listTemplates().map((t) => t.tier))
    expect(tiers).toContain('free')
    expect(tiers).toContain('pro')
  })

  it('returns undefined for an unknown id', () => {
    expect(getTemplate('does-not-exist')).toBeUndefined()
  })

  describe.each(TEMPLATE_IDS)('%s', (id) => {
    it('validates and keeps id = folder = theme.templateId', () => {
      // getTemplate validates every template.json on first use and throws on invalid content.
      const template = getTemplate(id)
      expect(template).toBeDefined()
      const file = JSON.parse(readFileSync(path.join(root, id, 'template.json'), 'utf8')) as { id: string }
      expect(file.id).toBe(id)
      expect(template!.id).toBe(id)
      expect(template!.content.theme.templateId).toBe(id)
    })

    it('uses the catalog default palette', () => {
      const set = templatePalettes(id)
      expect(set).toBeDefined()
      expect(getTemplate(id)!.content.theme.palette).toEqual(set!.default)
      expect(set!.alternatives).toHaveLength(3)
    })

    it('uses registered fonts', () => {
      const { fonts } = getTemplate(id)!.content.theme
      for (const ref of Object.values(fonts)) expect(isKnownFont(ref.family), ref.family).toBe(true)
    })

    it('ships both locales', () => {
      expect([...getTemplate(id)!.content.locales].sort()).toEqual(['ar', 'en'])
    })

    it('has gallery metadata in English and Arabic', () => {
      const t = getTemplate(id)!
      for (const value of [t.name, t.description, t.signature, ...t.bestFor]) {
        expect(value.en?.trim(), JSON.stringify(value)).toBeTruthy()
        expect(value.ar?.trim(), JSON.stringify(value)).toBeTruthy()
      }
      expect(t.bestFor.length).toBeGreaterThan(0)
      expect(['free', 'pro']).toContain(t.tier)
      expect(['en', 'ar']).toContain(t.defaultLocale)
      expect(Number.isFinite(t.order)).toBe(true)
      expect(t.professions.length).toBeGreaterThan(0)
      expect(t.styles.length).toBeGreaterThan(0)
      for (const p of t.professions) expect(TEMPLATE_PROFESSIONS).toContain(p)
      for (const s of t.styles) expect(TEMPLATE_STYLES).toContain(s)
    })
  })
})
