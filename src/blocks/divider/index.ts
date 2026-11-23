import { defineBlock } from '../types'
import { Divider } from './Divider'
import { manifest } from './manifest'
import type { DividerContent } from './schema'

export const dividerBlock = defineBlock<DividerContent>({ manifest, Component: Divider })
