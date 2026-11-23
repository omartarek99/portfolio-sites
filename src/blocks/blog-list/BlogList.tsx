import { pageHref } from '@/lib/links'
import { A, Container, Icon, SectionHeader, st } from '../_shared'
import type { BlogListProps } from './schema'
import { EXAMPLE_POSTS } from './variants/parts'
import { Featured } from './variants/Featured'
import { Grid } from './variants/Grid'
import { List } from './variants/List'

const VARIANTS = { grid: Grid, list: List, featured: Featured }
const DEFAULT_COUNT = { grid: 3, list: 5, featured: 4 }

export function BlogList({ content, ctx, section, variant }: BlogListProps) {
  const id = variant in VARIANTS ? (variant as keyof typeof VARIANTS) : 'grid'
  const Variant = VARIANTS[id]
  // The editor shows example posts so the layout is visible before the first post exists.
  const source = ctx.site.posts.length === 0 && ctx.mode === 'editor' ? EXAMPLE_POSTS : ctx.site.posts
  const tag = content.tag?.trim()
  const posts = (tag ? source.filter((post) => post.tags.includes(tag)) : source).slice(0, content.count ?? DEFAULT_COUNT[id])
  const blogSlug = ctx.site.blogSlug

  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {posts.length ? <Variant ctx={ctx} posts={posts} /> : <p className="site-muted">{st(ctx.locale, 'noPosts')}</p>}
      {content.showAll && blogSlug && posts.length ? (
        <div className="mt-10 flex">
          <A ctx={ctx} link={{ type: 'url', value: pageHref(ctx.site, blogSlug) }} className="site-link inline-flex items-center gap-2 font-semibold">
            <span>{st(ctx.locale, 'viewAll')}</span>
            <Icon name="arrow-right" className="size-[1.1em] rtl:-scale-x-100" />
          </A>
        </div>
      ) : null}
    </Container>
  )
}
