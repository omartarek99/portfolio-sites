import { Icon } from '../../_shared'
import { PostDate, PostLink, PostTitle, type PostsProps } from './parts'

export function List({ ctx, posts }: PostsProps) {
  return (
    <ul className="border-site-border border-t">
      {posts.map((post) => (
        <li key={post.id} data-reveal="" className="border-site-border border-b">
          <PostLink
            ctx={ctx}
            post={post}
            className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] md:py-5"
          >
            <PostDate ctx={ctx} post={post} className="col-span-2 sm:col-span-1" />
            <PostTitle ctx={ctx} post={post} className="site-h4 group-hover:text-site-primary transition-colors" />
            <span className="flex items-center gap-3 self-center">
              {post.tags[0] ? <span className="site-tag hidden md:inline-flex">{post.tags[0]}</span> : null}
              <Icon
                name="arrow-right"
                className="text-site-muted group-hover:text-site-primary size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              />
            </span>
          </PostLink>
        </li>
      ))}
    </ul>
  )
}
