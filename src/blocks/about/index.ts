import { defineBlock } from '../types'
import { About } from './About'
import { manifest } from './manifest'
import type { AboutContent } from './schema'

export const aboutBlock = defineBlock<AboutContent>({ manifest, Component: About })
