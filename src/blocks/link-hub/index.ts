import { defineBlock } from '../types'
import { LinkHub } from './LinkHub'
import { manifest } from './manifest'
import type { LinkHubContent } from './schema'

export const linkHubBlock = defineBlock<LinkHubContent>({ manifest, Component: LinkHub })
