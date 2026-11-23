import type { VideoVariantProps } from './parts'
import { Embed } from './variants/Embed'
import { Grid } from './variants/Grid'

export function Video(props: VideoVariantProps) {
  switch (props.variant) {
    case 'reel':
      return <Embed {...props} big />
    case 'grid':
      return <Grid {...props} />
    default:
      return <Embed {...props} />
  }
}
