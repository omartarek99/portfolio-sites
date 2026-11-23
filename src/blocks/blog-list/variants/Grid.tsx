import { PostCover, PostDate, PostExcerpt, PostLink, PostTitle, type PostsProps } from './parts'

export function Grid({ ctx, posts }: PostsProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.id} data-reveal="" className="flex">
          <PostLink ctx={ctx} post={post} className="site-card group flex w-full flex-col overflow-hidden">
            <PostCover ctx={ctx} post={post} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] rounded-none" />
            <span className="flex flex-1 flex-col gap-3 p-6">
              <PostDate ctx={ctx} post={post} />
              <PostTitle ctx={ctx} post={post} className="site-h4 group-hover:text-site-primary transition-colors" />
              <PostExcerpt ctx={ctx} post={post} className="line-clamp-3 text-[0.9375rem]" />
            </span>
          </PostLink>
        </li>
      ))}
    </ul>
  )
}
