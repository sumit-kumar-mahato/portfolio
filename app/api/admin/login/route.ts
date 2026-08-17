import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sumit-portfolio-secret-key-2024-do-not-share"
)

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    const validUsername = process.env.ADMIN_USERNAME || "sumitkrmht2324"
    const validPassword = process.env.ADMIN_PASSWORD || "Sumit@9608"

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await new SignJWT({ username, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
