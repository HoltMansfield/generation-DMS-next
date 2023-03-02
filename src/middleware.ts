import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SECURE_ROUTES = [
  '/control-panel'
]

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (SECURE_ROUTES.includes(request.nextUrl.pathname)) {
    const session = request.cookies['session']

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}
