import { defineBlock } from '../types'
import { RichText } from './RichText'
import { manifest } from './manifest'
import type { RichTextContent } from './schema'

export const richTextBlock = defineBlock<RichTextContent>({ manifest, Component: RichText })
