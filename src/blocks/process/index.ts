import { defineBlock } from '../types'
import { Process } from './Process'
import { manifest } from './manifest'
import type { ProcessContent } from './schema'

export const processBlock = defineBlock<ProcessContent>({ manifest, Component: Process })
