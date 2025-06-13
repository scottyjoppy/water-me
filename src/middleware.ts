import { updateSession } from "@/utils/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const session = request.cookies.get("sb-access-token")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|login|register|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

