import { cn } from '@/lib/utils'
import { Container, hasImage, Img, SectionHeader } from '../../_shared'
import { CtaButtons, type CtaProps } from './Simple'

/**
 * A card whose picture breaks out of the top edge. The overflow is vertical
 * only, and the card reserves room for it, so nothing is clipped or covered.
 */
export function WithImage({ content, ctx, section }: CtaProps) {
  const image = hasImage(ctx, content.image)
  return (
    <Container section={section}>
      <div
        className={cn(
          'site-card relative grid items-center gap-8 px-6 pb-10 sm:px-10 md:gap-12',
          image ? 'mt-16 md:mt-20 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:pb-0' : 'pt-10 md:py-14',
        )}
      >
        <div className={cn('flex min-w-0 flex-col gap-8', image && 'md:py-14')}>
          <SectionHeader ctx={ctx} content={content} className="mb-0 md:mb-0" />
          <CtaButtons ctx={ctx} content={content} />
        </div>
        {image ? (
          <div className="-order-1 mx-auto -mt-16 w-full max-w-60 md:order-none md:-mt-20 md:max-w-80 md:self-stretch">
            {/* md+: stretched to the card height plus the 5rem it rises above the edge. */}
            <div className="site-media aspect-[3/4] rounded-b-none shadow-xl md:aspect-auto md:h-full md:min-h-96">
              <Img ctx={ctx} path="image" value={content.image} sizes="(min-width: 768px) 20rem, 15rem" maxWidth={720} />
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  )
}
