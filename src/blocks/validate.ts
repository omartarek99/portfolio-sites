/**
 * Full validation of site content: structure (src/schemas/site.ts) plus every
 * section's content against its block schema. Isomorphic, components-free.
 */
import {
  allSections,
  migrateSiteContent,
  SiteContentError,
  type Section,
  type SiteContent,
} from '@/schemas/site'
import type { z } from 'zod'
import { blockManifests } from './manifests'

export interface SectionProblem {
  sectionId: string
  blockType: string
  message: string
  issues: z.core.$ZodIssue[]
}

/** Validate one section's content and variant against its block. */
export function checkSection(section: Section): SectionProblem | null {
  const manifest = blockManifests[section.blockType]
  if (!manifest) {
    return { sectionId: section.id, blockType: section.blockType, message: 'Unknown block type', issues: [] }
  }
  if (!manifest.variants.some((v) => v.id === section.variant)) {
    return {
      sectionId: section.id,
      blockType: section.blockType,
      message: `Unknown variant "${section.variant}" (expected one of: ${manifest.variants.map((v) => v.id).join(', ')})`,
      issues: [],
    }
  }
  const mobile = section.responsive.mobileVariant
  if (mobile && !manifest.variants.some((v) => v.id === mobile)) {
    return {
      sectionId: section.id,
      blockType: section.blockType,
      message: `Unknown mobile variant "${mobile}"`,
      issues: [],
    }
  }
  const parsed = manifest.schema.safeParse(section.content)
  if (!parsed.success) {
    return {
      sectionId: section.id,
      blockType: section.blockType,
      message: 'Invalid content',
      issues: parsed.error.issues,
    }
  }
  return null
}

/** Problems for every section of a site. An empty array means the content is fully valid. */
export function findSectionProblems(site: SiteContent): SectionProblem[] {
  const problems: SectionProblem[] = []
  for (const section of allSections(site)) {
    const problem = checkSection(section)
    if (problem) problems.push(problem)
  }
  return problems
}

/**
 * Migrate, structurally validate and block-validate raw content.
 * Throws `SiteContentError` on any problem. Use at every write boundary
 * (save draft, publish, import, AI output, template load in tests).
 */
export function validateSiteContent(raw: unknown): SiteContent {
  const site = migrateSiteContent(raw)
  const problems = findSectionProblems(site)
  if (problems.length > 0) {
    const first = problems[0]
    const where = first.issues[0]?.path?.length ? ` at ${first.issues[0].path.join('.')}` : ''
    const why = first.issues[0]?.message ? `: ${first.issues[0].message}` : ''
    throw new SiteContentError(
      `${problems.length} section(s) have invalid content — ${first.blockType} "${first.sectionId}" ${first.message}${where}${why}`,
      problems.flatMap((p) => p.issues.map((issue) => ({ ...issue, path: ['section', p.sectionId, ...issue.path] }))),
    )
  }
  return site
}

/**
 * Lenient variant for rendering stored content: returns the site even when
 * some sections are invalid (the renderer skips those), plus the problems.
 */
export function inspectSiteContent(raw: unknown): { site: SiteContent; problems: SectionProblem[] } {
  const site = migrateSiteContent(raw)
  return { site, problems: findSectionProblems(site) }
}
