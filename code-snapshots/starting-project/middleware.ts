import { NextRequest, NextResponse } from "next/server";
import { sessions } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if route requires authentication
  const protectedRoutes = ["/dashboard", "/notes"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Get session from cookie
  const sessionId = request.cookies.get("sessionId")?.value;

  if (!sessionId || !sessions.has(sessionId)) {
    // Redirect to authenticate page
    return NextResponse.redirect(new URL("/authenticate", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
