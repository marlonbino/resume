import { NextRequest, NextResponse } from "next/server";

const ROSELINE_HOSTS = ["roselineondeche.vercel.app"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Password-gate the Keystatic admin
  if (pathname.startsWith("/keystatic")) {
    const cookie = request.cookies.get("ks-auth")?.value;
    if (cookie !== process.env.KEYSTATIC_ADMIN_PASSWORD) {
      const loginUrl = new URL("/keystatic-login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Authenticated — serve keystatic as-is, skip host rewriting below
    return NextResponse.next();
  }

  // Route roselineondeche.vercel.app to /roseline
  const host = request.headers.get("host") ?? "";
  if (ROSELINE_HOSTS.some((h) => host.includes(h))) {
    return NextResponse.rewrite(new URL("/roseline", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/keystatic", "/keystatic/:path*"],
};
