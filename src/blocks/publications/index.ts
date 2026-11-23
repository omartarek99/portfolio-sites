import { defineBlock } from '../types'
import { Publications } from './Publications'
import { manifest } from './manifest'
import type { PublicationsContent } from './schema'

export const publicationsBlock = defineBlock<PublicationsContent>({ manifest, Component: Publications })
