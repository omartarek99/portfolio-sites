import { defineBlock } from '../types'
import { MediaKit } from './MediaKit'
import { manifest } from './manifest'
import type { MediaKitContent } from './schema'

export const mediaKitBlock = defineBlock<MediaKitContent>({ manifest, Component: MediaKit })
