import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_SESSION_COOKIE } from "@/constants/auth";

const AUTH_ROUTES = ["/login", "/register", "/forget-password", "/verify-otp"];
const PROTECTED_ROUTES = ["/dashboard"];
const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }
  const sessionToken = request.cookies.get(AUTH_SESSION_COOKIE)?.value;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!sessionToken && isProtectedRoute) {
    const loginURL = request.nextUrl.clone();
    loginURL.pathname = "/login";
    if (pathname !== "/dashboard") {
      loginURL.searchParams.set("callbackUrl", pathname);
    }
    return NextResponse.redirect(loginURL);
  }

  if (sessionToken && isAuthRoute) {
    const dashboardURL = request.nextUrl.clone();
    dashboardURL.pathname = "/dashboard";
    return NextResponse.redirect(dashboardURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
