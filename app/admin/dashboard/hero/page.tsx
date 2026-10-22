"use client"

import { useAdmin } from "../layout"
import { motion } from "framer-motion"
import { Sparkles, Link, Type, Users, FileText } from "lucide-react"

export default function HeroEditorPage() {
  const { data, setData } = useAdmin()

  if (!data) return null
  const hero = (data.hero || {}) as Record<string, string>

  const update = (key: string, value: string) => {
    setData({ ...data, hero: { ...hero, [key]: value } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-8"
    >
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Home / Hero Section Editor</h2>
          <p className="text-xs text-white/40">Customize your name, tagline, headline, audience lines, and resume link</p>
        </div>
      </div>

      {/* Basic Identity */}
      <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
          <Type className="w-4 h-4" /> Identity & Tagline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" value={hero.name} onChange={(v) => update("name", v)} placeholder="Sumit Kumar Mahato" />
          <Field label="Tagline / Subtitle" value={hero.tagline} onChange={(v) => update("tagline", v)} placeholder="AI & Data Science Specialist" />
        </div>

        <Field
          label="Main Headline"
          value={hero.headline}
          onChange={(v) => update("headline", v)}
          placeholder="Turning messy data into decisions worth making."
          multiline
        />
      </div>

      {/* Audience Framings & Description */}
      <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
          <Users className="w-4 h-4" /> Description & Audience Target Lines
        </h3>

        <Field
          label="Main Description (For Everyone)"
          value={hero.description}
          onChange={(v) => update("description", v)}
          placeholder="Data Science & AI professional working across machine learning..."
          multiline
        />

        <Field
          label="Recruiters Tab Line"
          value={hero.recruitersLine}
          onChange={(v) => update("recruitersLine", v)}
          placeholder="PGDM in Big Data Analytics at 3.83/4.33, two years as Assistant Manager..."
          multiline
        />

        <Field
          label="Founders Tab Line"
          value={hero.foundersLine}
          onChange={(v) => update("foundersLine", v)}
          placeholder="I turn the data you already collect into the two or three decisions..."
          multiline
        />

        <Field
          label="Engineers Tab Line"
          value={hero.engineersLine}
          onChange={(v) => update("engineersLine", v)}
          placeholder="Python, XGBoost, PyTorch, OpenCV, spaCy, SQL..."
          multiline
        />
      </div>

      {/* Resume Link */}
      <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Resume Download Button
        </h3>
        
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-1.5">
            <Link className="w-3.5 h-3.5 text-cyan-400" />
            Resume PDF URL
          </label>
          <input
            type="text"
            value={hero.resumeUrl || ""}
            onChange={(e) => update("resumeUrl", e.target.value)}
            placeholder="https://drive.google.com/... or # to hide"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/60 transition-all text-sm font-mono"
          />
          <p className="text-xs text-white/30">
            Paste a Google Drive or Dropbox link to your PDF resume. Use <code className="text-cyan-400">#</code> to disable the download button.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string
  value?: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-mono text-white/50 uppercase tracking-widest">{label}</label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/60 transition-all text-sm resize-none leading-relaxed"
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
