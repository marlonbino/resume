import { NextRequest, NextResponse } from "next/server";

const ROSELINE_HOSTS = ["roselineondeche.vercel.app"];

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (ROSELINE_HOSTS.some((h) => host.includes(h))) {
    return NextResponse.rewrite(new URL("/roseline", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
