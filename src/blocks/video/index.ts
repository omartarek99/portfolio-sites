import { defineBlock } from '../types'
import { Video } from './Video'
import { manifest } from './manifest'
import type { VideoContent } from './schema'

export const videoBlock = defineBlock<VideoContent>({ manifest, Component: Video })
