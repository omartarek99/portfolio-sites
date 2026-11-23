import type { BlockProps } from '../types'
import type { RichTextContent } from './schema'
import { Prose } from './variants/Prose'

export function RichText(props: BlockProps<RichTextContent>) {
  return <Prose {...props} columns={props.variant === 'two-column'} />
}
