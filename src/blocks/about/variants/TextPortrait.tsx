import { cn } from '@/lib/utils'
import { Btn, Container, hasButton, hasImage, Img, SectionHeader, T } from '../../_shared'
import type { AboutProps } from '../schema'

export function TextPortrait({ content, ctx, section }: AboutProps) {
  const withImage = hasImage(ctx, content.image)
  return (
    <Container section={section}>
      <div className={cn('grid items-center gap-10 md:gap-12 lg:gap-20', withImage && 'md:grid-cols-12')}>
        <div className={withImage ? 'md:col-span-7' : 'max-w-3xl'}>
          <SectionHeader ctx={ctx} content={content} align="start" className="mb-6 md:mb-8" />
          <T ctx={ctx} path="body" value={content.body} as="div" rich className="site-prose" placeholder="Tell your story" />
          {hasButton(ctx, content.cta) ? (
            <div className="mt-8">
              <Btn ctx={ctx} path="cta" value={content.cta} variant="outline" />
            </div>
          ) : null}
        </div>
        {withImage ? (
          <div
            className={cn(
              'site-media order-first aspect-[4/5] w-full max-md:max-w-md md:col-span-5',
              content.imageSide !== 'start' && 'md:order-last',
            )}
          >
            <Img ctx={ctx} path="image" value={content.image} sizes="(min-width: 768px) 40vw, 100vw" maxWidth={1000} />
          </div>
        ) : null}
      </div>
    </Container>
  )
}
