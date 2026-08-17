import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sumit-portfolio-secret-key-2024-do-not-share"
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin/dashboard and sub-routes
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // If already logged in and visiting /admin login page, redirect to dashboard
  if (pathname === "/admin") {
    const token = request.cookies.get("admin_token")?.value
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET)
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      } catch {
        // Invalid token, continue to login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/dashboard/:path*"],
}
