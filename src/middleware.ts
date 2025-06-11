import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const access = request.cookies.get("sb-access-token")?.value;

  if (!access) {
    // user is not logged‑in → bounce to /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/home"],
};
