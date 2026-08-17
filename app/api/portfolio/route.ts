import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "portfolio.json")
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to load portfolio data" }, { status: 500 })
  }
}
