/**
 * Validate template.json files: structure, every block's content, and the
 * catalog rules of docs/TEMPLATES.md.
 *
 *   npx tsx scripts/check-template.ts aurora editorial    # some
 *   npx tsx scripts/check-template.ts                     # all
 */
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { findSectionProblems } from '@/blocks/validate'
import { migrateSiteContent, SiteContentError, allSections } from '@/schemas/site'
import { isKnownFont } from '@/themes/fonts'
import { templatePalettes } from '@/themes/palettes'

const root = path.resolve('src/templates')
const ids = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)

let failed = 0
for (const id of ids) {
  const problems: string[] = []
  let raw: Record<string, unknown>
  try {
    raw = JSON.parse(readFileSync(path.join(root, id, 'template.json'), 'utf8'))
  } catch (error) {
    console.log(`✗ ${id}: cannot read template.json — ${(error as Error).message}`)
    failed++
    continue
  }
  if (raw.id !== id) problems.push(`id "${String(raw.id)}" does not match folder`)
  for (const key of ['name', 'description', 'signature']) {
    const v = raw[key] as { en?: string; ar?: string } | undefined
    if (!v?.en || !v?.ar) problems.push(`${key} needs en and ar`)
  }
  if (!Array.isArray(raw.bestFor) || raw.bestFor.length === 0) problems.push('bestFor is empty')
  if (!Array.isArray(raw.professions) || raw.professions.length === 0) problems.push('professions is empty')
  if (!Array.isArray(raw.styles) || raw.styles.length === 0) problems.push('styles is empty')
  try {
    const site = migrateSiteContent(raw.content)
    for (const p of findSectionProblems(site)) {
      const issue = p.issues[0]
      problems.push(`section ${p.sectionId} (${p.blockType}): ${p.message}${issue ? ` at ${issue.path.join('.')}: ${issue.message}` : ''}`)
    }
    if (site.theme.templateId !== id) problems.push(`theme.templateId is "${site.theme.templateId}"`)
    const expected = templatePalettes(id)?.default
    if (expected && JSON.stringify(expected) !== JSON.stringify(site.theme.palette)) {
      problems.push('theme.palette differs from the catalog default (src/themes/palettes.ts)')
    }
    for (const [slot, font] of Object.entries(site.theme.fonts)) {
      if (!isKnownFont(font.family)) problems.push(`font ${slot} "${font.family}" is not registered in src/themes/fonts.ts`)
    }
    if (site.locales.length !== 2) problems.push('locales must include both en and ar')
    const sections = allSections(site)
    const notExample = sections.filter((s) => !s.example && s.blockType !== 'header' && s.blockType !== 'footer')
    if (notExample.length) problems.push(`${notExample.length} section(s) missing "example": true`)
    if (!site.globalSections.header) problems.push('no header in globalSections')
    if (!site.globalSections.footer) problems.push('no footer in globalSections')
    const home = site.pages.find((p) => p.slug === '')
    if (home && home.sections.length < 3) problems.push('home page has fewer than 3 sections')
    let missingAr = 0
    const walk = (v: unknown): void => {
      if (Array.isArray(v)) return v.forEach(walk)
      if (v && typeof v === 'object') {
        const o = v as Record<string, unknown>
        if (typeof o.en === 'string' && o.en.trim() && !(typeof o.ar === 'string' && o.ar.trim())) missingAr++
        Object.values(o).forEach(walk)
      }
    }
    walk(site)
    if (missingAr) problems.push(`${missingAr} Localized value(s) with English but no Arabic`)
  } catch (error) {
    if (error instanceof SiteContentError) {
      problems.push(error.message)
      for (const issue of error.issues.slice(0, 8)) problems.push(`  at ${issue.path.join('.')}: ${issue.message}`)
    } else throw error
  }
  if (problems.length) {
    failed++
    console.log(`✗ ${id}`)
    for (const p of problems.slice(0, 25)) console.log(`   - ${p}`)
  } else {
    console.log(`✓ ${id}`)
  }
}
process.exit(failed ? 1 : 0)
