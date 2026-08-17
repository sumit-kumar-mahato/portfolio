import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Sumit Kumar Mahato Portfolio",
  description: "Portfolio Admin Panel",
  robots: "noindex, nofollow",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      {children}
    </div>
  )
}
