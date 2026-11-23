import { defineBlock } from '../types'
import { Hero } from './Hero'
import { manifest } from './manifest'
import type { HeroContent } from './schema'

export const heroBlock = defineBlock<HeroContent>({ manifest, Component: Hero })
