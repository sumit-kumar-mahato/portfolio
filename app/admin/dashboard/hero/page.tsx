"use client"

import { useAdmin } from "../layout"
import { motion } from "framer-motion"
import { Sparkles, Link } from "lucide-react"

export default function HeroEditorPage() {
  const { data, setData } = useAdmin()

  if (!data) return null
  const hero = data.hero as Record<string, string>

  const update = (key: string, value: string) => {
    setData({ ...data, hero: { ...hero, [key]: value } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h2 className="text-lg font-bold text-white">Hero Section</h2>
      </div>

      <Field label="Full Name" value={hero.name} onChange={(v) => update("name", v)} placeholder="Sumit Kumar Mahato" />
      <Field label="Tagline / Subtitle" value={hero.tagline} onChange={(v) => update("tagline", v)} placeholder="AI & Data Science" />
      <Field label="Hero Description" value={hero.description} onChange={(v) => update("description", v)} placeholder="A data scientist passionate..." multiline />
      
      <div className="space-y-2">
        <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-1.5">
          <Link className="w-3 h-3" />
          Resume URL
        </label>
        <input
          type="text"
          value={hero.resumeUrl || ""}
          onChange={(e) => update("resumeUrl", e.target.value)}
          placeholder="https://drive.google.com/... or # to hide"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/60 transition-all text-sm"
        />
        <p className="text-xs text-white/30">Paste a Google Drive / Dropbox link to your PDF resume. Use # to disable the button.</p>
      </div>
    </motion.div>
  )
}

function Field({ label, value, onChange, placeholder, multiline = false }: {
  label: string, value: string, onChange: (v: string) => void, placeholder?: string, multiline?: boolean
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-white/50 uppercase tracking-widest">{label}</label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/60 transition-all text-sm resize-none"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/60 transition-all text-sm"
        />
      )}
    </div>
  )
}
