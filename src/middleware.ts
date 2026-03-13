import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname
    const isAuthRoute = pathname === '/login'
    const isDashboardRoute = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/products') ||
        pathname.startsWith('/collections') ||
        pathname.startsWith('/orders') ||
        pathname.startsWith('/inquiries') ||
        pathname.startsWith('/bookings') ||
        pathname.startsWith('/subscribers')

    // Unauthenticated user trying to access dashboard → redirect to login
    if (isDashboardRoute && !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Authenticated user visiting login → redirect to dashboard
    if (isAuthRoute && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}