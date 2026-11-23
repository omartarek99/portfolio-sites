import { defineBlock } from '../types'
import { Gallery } from './Gallery'
import { manifest } from './manifest'
import type { GalleryContent } from './schema'

export const galleryBlock = defineBlock<GalleryContent>({ manifest, Component: Gallery })
