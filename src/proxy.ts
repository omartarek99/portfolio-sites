/**
 * Request routing for the Vizo site.
 *
 *   /ar/<path>              → the same page in Arabic (sets x-sc-locale)
 *   /en/<path>              → redirect to /<path> (English has no prefix)
 *   /demo/<template>/(ar/)? → a live demo website (rendered from template JSON)
 *
 * The internal /s/ folder that renders demos is not reachable directly in production.
 */
import { NextResponse, type NextRequest } from 'next/server'
import { HIDDEN_DEMOS } from '@/templates/hidden'

const LOCALE_HEADER = 'x-sc-locale'

function startsWithSegment(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

function rewriteTo(request: NextRequest, pathname: string, headers?: Headers): NextResponse {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  return NextResponse.rewrite(url, headers ? { request: { headers } } : undefined)
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl

  if (process.env.NODE_ENV === 'production' && pathname.startsWith('/s/')) {
    return new NextResponse(null, { status: 404 })
  }

  if (pathname.startsWith('/demo/')) {
    const [, templateId, ...tail] = pathname.split('/').filter(Boolean)
    if (templateId && HIDDEN_DEMOS.has(templateId)) return new NextResponse(null, { status: 404 })
    if (templateId) {
      const locale = tail[0] === 'en' || tail[0] === 'ar' ? tail.shift()! : 'default'
      return rewriteTo(request, ['/s', `tpl--${templateId}`, locale, ...tail].join('/'))
    }
  }

  if (startsWithSegment(pathname, '/en')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }
  if (startsWithSegment(pathname, '/ar')) {
    const headers = new Headers(request.headers)
    headers.set(LOCALE_HEADER, 'ar')
    return rewriteTo(request, pathname.slice(3) || '/', headers)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/webpack-hmr|fonts/|stock/|templates/|images/|showcase/|favicon\\.ico|icon\\.|.*\\.mp4$).*)',
  ],
}
