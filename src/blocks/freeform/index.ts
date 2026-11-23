import { defineBlock } from '../types'
import { Freeform } from './Freeform'
import { manifest } from './manifest'
import type { FreeformContent } from './schema'

export const freeformBlock = defineBlock<FreeformContent>({ manifest, Component: Freeform })
