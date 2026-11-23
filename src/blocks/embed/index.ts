import { defineBlock } from '../types'
import { Embed } from './Embed'
import { manifest } from './manifest'
import type { EmbedContent } from './schema'

export const embedBlock = defineBlock<EmbedContent>({ manifest, Component: Embed })
