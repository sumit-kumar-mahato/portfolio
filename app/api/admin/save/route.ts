import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import fs from "fs"
import path from "path"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sumit-portfolio-secret-key-2024-do-not-share"
)

export async function POST(req: Request) {
  try {
    // Verify auth
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await jwtVerify(token, JWT_SECRET)

    const body = await req.json()
    const { data } = body

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 })
    }

    // Save locally first (always works in dev, may fail on Vercel read-only FS)
    const filePath = path.join(process.cwd(), "public", "data", "portfolio.json")
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
    } catch {
      // On Vercel, filesystem is read-only. Use GitHub API fallback.
    }

    // GitHub API save (if configured)
    const githubToken = process.env.GITHUB_TOKEN
    const githubRepo = process.env.GITHUB_REPO
    const githubBranch = process.env.GITHUB_BRANCH || "main"

    if (githubToken && githubRepo) {
      try {
        const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/public/data/portfolio.json`
        
        // Get current file SHA
        const getRes = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        })
        
        const fileInfo = await getRes.json()
        const sha = fileInfo.sha

        const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64")

        // Commit updated file
        const putRes = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Admin: Update portfolio data [${new Date().toISOString()}]`,
            content,
            sha,
            branch: githubBranch,
          }),
        })

        if (!putRes.ok) {
          const err = await putRes.json()
          console.error("GitHub commit failed:", err)
          return NextResponse.json({ 
            success: true, 
            warning: "Saved locally but GitHub push failed. Deploy manually to persist.",
            githubError: err.message
          })
        }

        return NextResponse.json({ 
          success: true, 
          message: "Saved and pushed to GitHub. Vercel will redeploy automatically." 
        })
      } catch (githubErr) {
        console.error("GitHub error:", githubErr)
        return NextResponse.json({ 
          success: true, 
          warning: "Saved locally but GitHub sync failed." 
        })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Saved locally. To enable auto-deploy, add GITHUB_TOKEN and GITHUB_REPO environment variables." 
    })
  } catch (err) {
    console.error("Save error:", err)
    return NextResponse.json({ error: "Save failed" }, { status: 500 })
  }
}
