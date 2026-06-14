import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // Public paths — no auth check needed
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/builds/') || // share pages are public
    pathname === '/'
  ) {
    return res;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options as Parameters<typeof res.cookies.set>[2]);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Only /builds (saved list) requires auth; /build (configurator) is open
  if (!user && pathname === '/builds') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (user && pathname === '/login') {
    return NextResponse.redirect(new URL('/build', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
