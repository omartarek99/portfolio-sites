import { defineBlock } from '../types'
import { BlogList } from './BlogList'
import { manifest } from './manifest'
import type { BlogListContent } from './schema'

export const blogListBlock = defineBlock<BlogListContent>({ manifest, Component: BlogList })
