import { defineBlock } from '../types'
import { CaseStudy } from './CaseStudy'
import { manifest } from './manifest'
import type { CaseStudyContent } from './schema'

export const caseStudyBlock = defineBlock<CaseStudyContent>({ manifest, Component: CaseStudy })
