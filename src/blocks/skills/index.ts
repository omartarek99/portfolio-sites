import { defineBlock } from '../types'
import { Skills } from './Skills'
import { manifest } from './manifest'
import type { SkillsContent } from './schema'

export const skillsBlock = defineBlock<SkillsContent>({ manifest, Component: Skills })
