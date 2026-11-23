import { defineBlock } from '../types'
import { Experience } from './Experience'
import { manifest } from './manifest'
import type { ExperienceContent } from './schema'

export const experienceBlock = defineBlock<ExperienceContent>({ manifest, Component: Experience })
