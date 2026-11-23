import type { BlockProps } from '../types'
import type { EmbedContent } from './schema'
import { Code } from './variants/Code'
import { Frame } from './variants/Frame'

export function Embed(props: BlockProps<EmbedContent>) {
  return props.variant === 'code' ? <Code {...props} /> : <Frame {...props} />
}
