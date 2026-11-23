import { defineBlock } from '../types'
import { Stats } from './Stats'
import { manifest } from './manifest'
import type { StatsContent } from './schema'

export const statsBlock = defineBlock<StatsContent>({ manifest, Component: Stats })
