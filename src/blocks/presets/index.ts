/**
 * Pre-designed sections (SPEC §7.2, TEMPLATES §17): ready-made block + variant +
 * style + animation + bilingual content, lifted from the finished templates.
 * Isomorphic data — no React. Insert with a fresh section id.
 */
import type { BlockType } from '@/schemas/site'
import type { BlockCategory, SectionPreset } from '../types'
import { aboutPresets } from './about'
import { bookingPresets } from './booking'
import { contactPresets } from './contact'
import { ctaPresets } from './cta'
import { experiencePresets } from './experience'
import { galleryPresets } from './gallery'
import { heroPresets } from './hero'
import { projectsPresets } from './projects'
import { servicesPresets } from './services'
import { statsPresets } from './stats'
import { testimonialsPresets } from './testimonials'

export const SECTION_PRESETS: readonly SectionPreset[] = [
  ...heroPresets,
  ...aboutPresets,
  ...experiencePresets,
  ...projectsPresets,
  ...testimonialsPresets,
  ...servicesPresets,
  ...statsPresets,
  ...galleryPresets,
  ...contactPresets,
  ...bookingPresets,
  ...ctaPresets,
]

const byId = new Map(SECTION_PRESETS.map((p) => [p.id, p]))

/** Presets grouped by block category, in library order. */
export function presetsByCategory(): Partial<Record<BlockCategory, SectionPreset[]>> {
  const out: Partial<Record<BlockCategory, SectionPreset[]>> = {}
  for (const p of SECTION_PRESETS) (out[p.category] ??= []).push(p)
  return out
}

export function presetsForBlock(type: BlockType): SectionPreset[] {
  return SECTION_PRESETS.filter((p) => p.blockType === type)
}

export function getPreset(id: string): SectionPreset | undefined {
  return byId.get(id)
}
