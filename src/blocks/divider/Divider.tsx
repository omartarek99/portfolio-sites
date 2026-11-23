import type { BlockProps } from '../types'
import type { DividerContent } from './schema'
import { Line } from './variants/Line'
import { Shape } from './variants/Shape'
import { Spacer } from './variants/Spacer'
import { Wave } from './variants/Wave'

export function Divider(props: BlockProps<DividerContent>) {
  switch (props.variant) {
    case 'shape':
      return <Shape {...props} />
    case 'wave':
      return <Wave {...props} />
    case 'spacer':
      return <Spacer {...props} />
    default:
      return <Line {...props} />
  }
}
