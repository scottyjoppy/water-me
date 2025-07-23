import { updateSession } from "@/utils/supabase/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // If updateSession returned a redirect response (e.g., to /login)
  if (response instanceof NextResponse && response.status === 307) {
    return response;
  }

  // Allow the request to proceed with the response holding updated cookies
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
