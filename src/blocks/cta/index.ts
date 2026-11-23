import { defineBlock } from '../types'
import { Cta } from './Cta'
import { manifest } from './manifest'
import type { CtaContent } from './schema'

export const ctaBlock = defineBlock<CtaContent>({ manifest, Component: Cta })
