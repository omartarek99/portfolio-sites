/**
 * Helpers for exercising blocks in tests and in the /dev/blocks gallery.
 * Isomorphic, components-free.
 */
import type { BlockType, Section } from '@/schemas/site'
import { isRecord } from '@/lib/utils'
import { blockManifests } from './manifests'
import type { AnyBlockManifest } from './types'

/**
 * The smallest content a block accepts: every optional field removed and every
 * list emptied, as far as the block's schema allows. Blocks must render this
 * without throwing (SPEC §7: "works with empty optional fields").
 */
export function minimalContent(manifest: AnyBlockManifest): Record<string, unknown> {
  let content: Record<string, unknown> = structuredClone(manifest.defaultContent)
  const valid = (candidate: Record<string, unknown>) => manifest.schema.safeParse(candidate).success

  for (const key of Object.keys(content)) {
    const without = { ...content }
    delete without[key]
    if (valid(without)) {
      content = without
      continue
    }
    const value = content[key]
    if (Array.isArray(value) && value.length > 0) {
      const emptied = { ...content, [key]: [] }
      if (valid(emptied)) {
        content = emptied
        continue
      }
      const single = { ...content, [key]: value.slice(0, 1) }
      if (valid(single)) content = single
    } else if (isRecord(value)) {
      // One level down: drop optional keys of nested objects.
      let nested = { ...value }
      for (const nestedKey of Object.keys(nested)) {
        const trimmed = { ...nested }
        delete trimmed[nestedKey]
        if (valid({ ...content, [key]: trimmed })) nested = trimmed
      }
      content = { ...content, [key]: nested }
    }
  }
  return content
}

/** A section of a block type and variant for galleries and tests. */
export function sampleSection(
  blockType: BlockType,
  variant: string,
  content: 'default' | 'minimal' = 'default',
  overrides: Partial<Section> = {},
): Section {
  const manifest = blockManifests[blockType]
  return {
    id: `sample-${blockType}-${variant}-${content}`,
    blockType,
    variant,
    content: content === 'minimal' ? minimalContent(manifest) : structuredClone(manifest.defaultContent),
    style: {},
    animation: { entrance: 'none' },
    responsive: {},
    ...overrides,
  }
}

/** Every (block type, variant id) pair in the library. */
export function allVariants(): { blockType: BlockType; variant: string; global: boolean }[] {
  return (Object.keys(blockManifests) as BlockType[]).flatMap((blockType) =>
    blockManifests[blockType].variants.map((v) => ({
      blockType,
      variant: v.id,
      global: Boolean(blockManifests[blockType].global),
    })),
  )
}
