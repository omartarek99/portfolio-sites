import type { AboutProps } from './schema'
import { BigQuote } from './variants/BigQuote'
import { TextPortrait } from './variants/TextPortrait'
import { TimelineIntro } from './variants/TimelineIntro'
import { TwoColumn } from './variants/TwoColumn'

export function About(props: AboutProps) {
  switch (props.variant) {
    case 'big-quote':
      return <BigQuote {...props} />
    case 'two-column':
      return <TwoColumn {...props} />
    case 'timeline-intro':
      return <TimelineIntro {...props} />
    default:
      return <TextPortrait {...props} />
  }
}
