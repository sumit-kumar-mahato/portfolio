"use client"

import { useAdmin } from "../layout"
import { motion } from "framer-motion"
import { Settings, Key, Github, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SettingsPage() {
  const { saveData } = useAdmin()
  const [deploying, setDeploying] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  const handleForceRedeploy = async () => {
    setDeploying(true)
    await saveData()
    setDeploying(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-bold text-white">Settings</h2>
      </div>

      {/* Credentials Info */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Key className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-white text-sm">Admin Credentials</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-sm text-white/60">Admin ID</span>
            <span className="text-sm font-mono text-white/90">sumitkrmht2324</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-white/60">Password</span>
            <span className="text-sm font-mono text-white/90">••••••••••</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          <p className="text-xs text-cyan-300/80 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            To change credentials, update the ADMIN_USERNAME and ADMIN_PASSWORD environment variables in your Vercel project settings, then redeploy.
          </p>
        </div>
      </div>

      {/* GitHub Integration */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Github className="w-4 h-4 text-purple-400" />
          <h3 className="font-semibold text-white text-sm">GitHub Auto-Deploy</h3>
        </div>
        <p className="text-sm text-white/50 leading-relaxed">
          To enable automatic GitHub commits (so changes persist after Vercel redeploys), add these environment variables to your Vercel project:
        </p>
        <div className="space-y-2 font-mono text-xs">
          {[
            { key: "GITHUB_TOKEN", desc: "Personal Access Token with 'repo' write access" },
            { key: "GITHUB_REPO", desc: "e.g. sumit-kumar-mahato/portfolio" },
            { key: "GITHUB_BRANCH", desc: "e.g. main" },
          ].map((item) => (
            <div key={item.key} className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-cyan-400 mb-0.5">{item.key}</p>
              <p className="text-white/40 font-sans text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <h3 className="font-semibold text-white text-sm mb-3">Actions</h3>
        <motion.button
          onClick={handleForceRedeploy}
          disabled={deploying}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:from-cyan-500/30 hover:to-purple-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {deploying ? <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" /> : <Settings className="w-4 h-4" />}
          {deploying ? "Saving & Deploying..." : "Force Save & Trigger Redeploy"}
        </motion.button>
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
        >
          Logout from Admin Panel
        </motion.button>
      </div>
    </motion.div>
  )
}
