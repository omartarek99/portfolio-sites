import type { BlockProps } from '../types'
import type { FreeformContent } from './schema'
import { Canvas } from './variants/Canvas'

/** One variant until the milestone-10 canvas editor ships. */
export function Freeform(props: BlockProps<FreeformContent>) {
  return <Canvas {...props} />
}
