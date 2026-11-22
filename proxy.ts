import { NextResponse, type NextRequest } from "next/server";

// Site is under maintenance: only the homepage is reachable.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  if (pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
