"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import {
  Home, User, Briefcase, FolderOpen, Award, Wrench, Mail,
  Settings, LogOut, Menu, X, ChevronRight, Save, Eye, Sparkles,
  BarChart3, Brain
} from "lucide-react"

type PortfolioData = Record<string, unknown>

interface AdminContextType {
  data: PortfolioData | null
  setData: (data: PortfolioData) => void
  saving: boolean
  saveData: () => Promise<void>
  saveMsg: string
}

export const AdminContext = createContext<AdminContextType>({
  data: null,
  setData: () => {},
  saving: false,
  saveData: async () => {},
  saveMsg: "",
})

export const useAdmin = () => useContext(AdminContext)

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Home },
  { label: "Hero", href: "/admin/dashboard/hero", icon: Sparkles },
  { label: "About", href: "/admin/dashboard/about", icon: User },
  { label: "Skills", href: "/admin/dashboard/skills", icon: Brain },
  { label: "Experience", href: "/admin/dashboard/experience", icon: Briefcase },
  { label: "Projects", href: "/admin/dashboard/projects", icon: FolderOpen },
  { label: "Certifications", href: "/admin/dashboard/certifications", icon: Award },
  { label: "Tools", href: "/admin/dashboard/tools", icon: Wrench },
  { label: "Contact", href: "/admin/dashboard/contact", icon: Mail },
  { label: "Settings", href: "/admin/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const saveData = async () => {
    if (!data) return
    setSaving(true)
    setSaveMsg("")
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      })
      const result = await res.json()
      if (result.success) {
        setSaveMsg(result.warning || result.message || "Saved successfully!")
      } else {
        setSaveMsg("Error: " + result.error)
      }
    } catch {
      setSaveMsg("Save failed. Please try again.")
    }
    setSaving(false)
    setTimeout(() => setSaveMsg(""), 4000)
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  return (
    <AdminContext.Provider value={{ data, setData, saving, saveData, saveMsg }}>
      <div className="min-h-screen bg-[#050510] text-white flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-40 flex flex-col"
            >
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border-r border-white/10" />
              
              <div className="relative flex flex-col h-full">
                {/* Logo */}
                <div className="p-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">Portfolio CMS</p>
                      <p className="text-[10px] text-white/40 font-mono">Sumit Kumar Mahato</p>
                    </div>
                  </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        whileHover={{ x: 4 }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group ${
                          isActive
                            ? "text-white"
                            : "text-white/50 hover:text-white/80"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <item.icon className={`w-4 h-4 relative z-10 ${isActive ? "text-cyan-400" : ""}`} />
                        <span className="relative z-10">{item.label}</span>
                        {isActive && (
                          <ChevronRight className="w-3 h-3 text-cyan-400 ml-auto relative z-10" />
                        )}
                      </motion.a>
                    )
                  })}
                </nav>

                {/* Bottom: View Site + Logout */}
                <div className="p-3 border-t border-white/10 space-y-2">
                  <a
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    View Portfolio
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          {/* Top bar */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050510]/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
                <div>
                  <h1 className="text-sm font-semibold text-white">
                    {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
                  </h1>
                  <p className="text-[11px] text-white/30 font-mono">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Save message */}
                <AnimatePresence>
                  {saveMsg && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-xs px-3 py-1.5 rounded-lg ${
                        saveMsg.startsWith("Error")
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      }`}
                    >
                      {saveMsg}
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={saveData}
                  disabled={saving || !data}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                >
                  {saving ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </motion.button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">
            {data ? (
              children
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/40 text-sm">Loading portfolio data...</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
