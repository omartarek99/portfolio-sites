/**
 * Creating sections, pages and ids. Isomorphic, components-free.
 */
import { customAlphabet } from 'nanoid'
import type { Localized } from '@/schemas/fields'
import { GLOBAL_BLOCK_TYPES, type BlockType, type Page, type Section } from '@/schemas/site'
import { blockManifests } from './manifests'
import type { SectionPreset } from './types'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const generate = customAlphabet(alphabet, 10)

/** A new unique id for sections, pages, list items and nav items. */
export function newId(prefix?: string): string {
  return prefix ? `${prefix}_${generate()}` : generate()
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

/** Give every `{ id: string }` object in a content tree a fresh id (for duplicates). */
export function refreshIds<T>(value: T): T {
  if (Array.isArray(value)) return value.map((item) => refreshIds(item)) as T
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      out[key] = key === 'id' && typeof child === 'string' ? newId() : refreshIds(child)
    }
    return out as T
  }
  return value
}

/** A new section of a block type with the block's default (example) content. */
export function createSection(blockType: BlockType, variant?: string, overrides: Partial<Section> = {}): Section {
  const manifest = blockManifests[blockType]
  return {
    // Only generate what the caller did not provide: deterministic callers
    // (starter content, tests, prerendered pages) must not touch randomness.
    id: overrides.id ?? newId('s'),
    blockType,
    variant: variant && manifest.variants.some((v) => v.id === variant) ? variant : manifest.variants[0].id,
    content: overrides.content ?? refreshIds(clone(manifest.defaultContent)),
    style: {},
    animation: { entrance: GLOBAL_BLOCK_TYPES.includes(blockType) ? 'none' : 'fade' },
    responsive: {},
    ...overrides,
  }
}

/** A new section from a pre-designed section (SPEC §7.2). */
export function createSectionFromPreset(preset: SectionPreset): Section {
  return {
    id: newId('s'),
    blockType: preset.blockType,
    variant: preset.variant,
    content: refreshIds(clone(preset.content)),
    style: clone(preset.style ?? {}),
    animation: clone(preset.animation ?? { entrance: 'fade' }),
    responsive: {},
  }
}

/** A copy of a section with new ids (section and nested items). */
export function duplicateSection(section: Section): Section {
  const copy = refreshIds(clone(section))
  return { ...copy, id: newId('s'), anchor: undefined }
}

export function createPage(title: Localized, slug: string, sections: Section[] = []): Page {
  return {
    id: newId('p'),
    slug,
    title,
    type: 'standard',
    sections,
    visibility: 'public',
  }
}

/** Turn any text into a URL-safe slug segment. Arabic and other scripts fall back to a short id. */
export function slugify(text: string): string {
  const slug = text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return slug || `page-${generate().slice(0, 6).toLowerCase()}`
}
