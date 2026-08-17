"use client"

import { useAdmin } from "../layout"
import { motion } from "framer-motion"
import { User } from "lucide-react"

export default function AboutEditorPage() {
  const { data, setData } = useAdmin()
  if (!data) return null
  const about = data.about as Record<string, string>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-bold text-white">About Me Section</h2>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono text-white/50 uppercase tracking-widest">Bio / Description</label>
        <textarea
          value={about.bio || ""}
          onChange={(e) => setData({ ...data, about: { ...about, bio: e.target.value } })}
          placeholder="Write about yourself..."
          rows={10}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-purple-400/60 transition-all text-sm resize-none leading-relaxed"
        />
        <p className="text-xs text-white/30">
          Use \n\n to create paragraph breaks. The text will be displayed exactly as formatted.
        </p>
      </div>
    </motion.div>
  )
}
