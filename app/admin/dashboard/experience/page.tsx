"use client"

import { useAdmin } from "../layout"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Plus, Trash2, GraduationCap } from "lucide-react"
import { useState } from "react"

type Experience = {
  id: number; type: string; title: string; company: string;
  location: string; period: string; description: string[]
}

export default function ExperienceEditorPage() {
  const { data, setData } = useAdmin()
  const [expandedId, setExpandedId] = useState<number | null>(null)
  if (!data) return null

  const experiences = (data.experience as Experience[]) || []
  const update = (updated: Experience[]) => setData({ ...data, experience: updated })

  const addItem = (type: "work" | "education") => {
    const newItem: Experience = {
      id: Date.now(), type, title: "New " + (type === "work" ? "Position" : "Degree"),
      company: "Organization Name", location: "City, Country",
      period: "2024 - Present", description: ["Description point 1"]
    }
    update([...experiences, newItem])
    setExpandedId(newItem.id)
  }

  const removeItem = (id: number) => update(experiences.filter((e) => e.id !== id))

  const updateItem = (id: number, field: keyof Experience, value: unknown) => {
    update(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const updateDesc = (id: number, index: number, value: string) => {
    update(experiences.map((e) => {
      if (e.id !== id) return e
      const desc = [...e.description]
      desc[index] = value
      return { ...e, description: desc }
    }))
  }

  const addDesc = (id: number) => {
    update(experiences.map((e) => e.id === id ? { ...e, description: [...e.description, ""] } : e))
  }

  const removeDesc = (id: number, index: number) => {
    update(experiences.map((e) => {
      if (e.id !== id) return e
      const desc = e.description.filter((_, i) => i !== index)
      return { ...e, description: desc }
    }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Experience & Education</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => addItem("work")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium hover:bg-amber-500/30 transition-all">
            <Plus className="w-3.5 h-3.5" /><Briefcase className="w-3.5 h-3.5" /> Work
          </button>
          <button onClick={() => addItem("education")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-all">
            <Plus className="w-3.5 h-3.5" /><GraduationCap className="w-3.5 h-3.5" /> Education
          </button>
        </div>
      </div>

      <AnimatePresence>
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div
              className={`flex items-center gap-3 p-4 cursor-pointer ${
                exp.type === "work" ? "bg-amber-500/10" : "bg-blue-500/10"
              }`}
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              {exp.type === "work" ? <Briefcase className="w-4 h-4 text-amber-400 flex-shrink-0" /> : <GraduationCap className="w-4 h-4 text-blue-400 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{exp.title}</p>
                <p className="text-xs text-white/40 truncate">{exp.company} · {exp.period}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeItem(exp.id) }} className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Expanded editor */}
            <AnimatePresence>
              {expandedId === exp.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-white/[0.02] border-t border-white/10"
                >
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <LabelInput label="Title / Position" value={exp.title} onChange={(v) => updateItem(exp.id, "title", v)} />
                      <LabelInput label="Company / Institution" value={exp.company} onChange={(v) => updateItem(exp.id, "company", v)} />
                      <LabelInput label="Location" value={exp.location} onChange={(v) => updateItem(exp.id, "location", v)} />
                      <LabelInput label="Period (e.g. 2022 - 2024)" value={exp.period} onChange={(v) => updateItem(exp.id, "period", v)} />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono text-white/50 uppercase tracking-widest">Description Points</label>
                        <button onClick={() => addDesc(exp.id)} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add Point
                        </button>
                      </div>
                      <div className="space-y-2">
                        {exp.description.map((desc, di) => (
                          <div key={di} className="flex gap-2">
                            <input
                              value={desc}
                              onChange={(e) => updateDesc(exp.id, di, e.target.value)}
                              placeholder={`Point ${di + 1}`}
                              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-all"
                            />
                            <button onClick={() => removeDesc(exp.id, di)} className="p-2 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

function LabelInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-all"
      />
    </div>
  )
}
