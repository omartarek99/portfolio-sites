import { defineBlock } from '../types'
import { Pricing } from './Pricing'
import { manifest } from './manifest'
import type { PricingContent } from './schema'

export const pricingBlock = defineBlock<PricingContent>({ manifest, Component: Pricing })
