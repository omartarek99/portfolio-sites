/**
 * Template registry. Every template.json is validated (structure + block
 * schemas) and defaulted once, on first use. Do not edit to add a template's
 * content — edit its template.json.
 */
import { validateSiteContent } from '@/blocks/validate'
import type { TemplateDefinition, TemplateFile } from './types'
import aurora from './aurora/template.json'
import editorial from './editorial/template.json'
import launch from './launch/template.json'
import minimalCv from './minimal-cv/template.json'
import noirLens from './noir-lens/template.json'
import gridPop from './grid-pop/template.json'
import terminal from './terminal/template.json'
import atelier from './atelier/template.json'
import bloomCoach from './bloom-coach/template.json'
import majlis from './majlis/template.json'
import creatorHub from './creator-hub/template.json'
import blueprint from './blueprint/template.json'
import scholar from './scholar/template.json'
import motionReel from './motion-reel/template.json'
import bento from './bento/template.json'
import founder from './founder/template.json'

const FILES = [
  aurora, editorial, launch, minimalCv, noirLens, gridPop, terminal, atelier, bloomCoach, majlis, creatorHub, blueprint, scholar, motionReel, bento, founder, 
] as unknown as TemplateFile[]

let cache: Map<string, TemplateDefinition> | null = null

function load(): Map<string, TemplateDefinition> {
  if (cache) return cache
  const map = new Map<string, TemplateDefinition>()
  for (const file of FILES) {
    const content = validateSiteContent(file.content)
    if (content.theme.templateId !== file.id) {
      throw new Error(`Template "${file.id}": content.theme.templateId is "${content.theme.templateId}"`)
    }
    map.set(file.id, { ...file, content })
  }
  cache = map
  return map
}

/** All templates in gallery order. */
export function listTemplates(): TemplateDefinition[] {
  return [...load().values()].sort((a, b) => a.order - b.order)
}

export function getTemplate(id: string): TemplateDefinition | undefined {
  return load().get(id)
}

export const TEMPLATE_IDS: string[] = FILES.map((f) => f.id)
