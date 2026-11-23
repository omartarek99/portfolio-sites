import type { GalleryVariantProps } from './parts'
import { BeforeAfterView } from './variants/BeforeAfterView'
import { Grid } from './variants/Grid'
import { Justified } from './variants/Justified'
import { Masonry } from './variants/Masonry'
import { Slider } from './variants/Slider'

export function Gallery(props: GalleryVariantProps) {
  switch (props.variant) {
    case 'masonry':
      return <Masonry {...props} />
    case 'slider':
      return <Slider {...props} />
    case 'justified':
      return <Justified {...props} />
    case 'before-after':
      return <BeforeAfterView {...props} />
    default:
      return <Grid {...props} />
  }
}
