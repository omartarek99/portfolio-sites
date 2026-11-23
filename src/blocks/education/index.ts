import { defineBlock } from '../types'
import { Education } from './Education'
import { manifest } from './manifest'
import type { EducationContent } from './schema'

export const educationBlock = defineBlock<EducationContent>({ manifest, Component: Education })
