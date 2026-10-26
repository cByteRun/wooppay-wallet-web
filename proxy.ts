import { NextRequest, NextResponse } from 'next/server'

// Locale is determined by the URL, never by cookies or a crawler's preferences.
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const english = path === '/en' || path.startsWith('/en/')
  const headers = new Headers(request.headers)
  headers.set('x-wooppay-locale', english ? 'en' : 'ru')
  if (english) {
    const url = request.nextUrl.clone()
    url.pathname = path.replace(/^\/en(?=\/|$)/, '') || '/'
    return NextResponse.rewrite(url, { request: { headers } })
  }
  return NextResponse.next({ request: { headers } })
}
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
