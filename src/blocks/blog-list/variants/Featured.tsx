import { cn } from '@/lib/utils'
import { st } from '../../_shared'
import { PostCover, PostDate, PostExcerpt, PostLink, PostTitle, type PostsProps } from './parts'

export function Featured({ ctx, posts }: PostsProps) {
  const [lead, ...rest] = posts
  return (
    <div className={cn('grid gap-10', rest.length > 0 && 'lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14')}>
      <article data-reveal="">
        <PostLink ctx={ctx} post={lead} className="group flex flex-col gap-5">
          <PostCover ctx={ctx} post={lead} sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[16/10]" />
          <PostDate ctx={ctx} post={lead} />
          <PostTitle ctx={ctx} post={lead} className="site-h2 group-hover:text-site-primary transition-colors" />
          <PostExcerpt ctx={ctx} post={lead} className="site-lead" />
          <span className="site-link font-semibold">{st(ctx.locale, 'readMore')}</span>
        </PostLink>
      </article>
      {rest.length > 0 ? (
        <ul className="border-site-border flex flex-col border-t lg:border-t-0">
          {rest.map((post) => (
            <li key={post.id} data-reveal="" className="border-site-border border-b lg:first:pt-0">
              <PostLink ctx={ctx} post={post} className="group grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_8rem]">
                <span className="flex min-w-0 flex-col gap-2">
                  <PostDate ctx={ctx} post={post} />
                  <PostTitle ctx={ctx} post={post} className="site-h4 group-hover:text-site-primary transition-colors" />
                  <PostExcerpt ctx={ctx} post={post} className="site-small line-clamp-2" />
                </span>
                <PostCover ctx={ctx} post={post} sizes="8rem" className="rounded-site-sm aspect-square" />
              </PostLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
