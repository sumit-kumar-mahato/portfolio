"use client"

import { useAdmin } from "../layout"
import { motion, AnimatePresence } from "framer-motion"
import { FolderOpen, Plus, Trash2, Github, ExternalLink } from "lucide-react"
import { useState } from "react"

type Project = {
  id: number; title: string; category: string; description: string;
  tech: string[]; gradient: string; border: string; github: string; live: string; colSpan: string
}

const CATEGORIES = ["Machine Learning", "Deep Learning", "Computer Vision", "GenAI", "NLP & AI", "Data Analytics", "Full Stack", "Other"]
const COL_SPANS = [
  { label: "1 Column", value: "col-span-1" },
  { label: "2 Columns (Wide)", value: "md:col-span-2 lg:col-span-2" },
  { label: "2 Cols on md only", value: "md:col-span-2 lg:col-span-1" },
]
const GRADIENTS = [
  { label: "Cyan → Blue", value: "from-cyan-900/80 to-blue-900/80" },
  { label: "Indigo → Fuchsia", value: "from-indigo-900/80 to-fuchsia-900/80" },
  { label: "Purple → Pink", value: "from-purple-900/80 to-pink-900/80" },
  { label: "Emerald → Teal", value: "from-emerald-900/80 to-teal-900/80" },
  { label: "Rose → Red", value: "from-rose-900/80 to-red-900/80" },
  { label: "Violet → Indigo", value: "from-violet-900/80 to-indigo-900/80" },
  { label: "Orange → Yellow", value: "from-orange-900/80 to-yellow-900/80" },
  { label: "Blue → Cyan", value: "from-blue-900/80 to-cyan-900/80" },
  { label: "Red → Orange", value: "from-red-900/80 to-orange-900/80" },
  { label: "Slate → Zinc", value: "from-slate-900/80 to-zinc-900/80" },
]

export default function ProjectsEditorPage() {
  const { data, setData } = useAdmin()
  const [expandedId, setExpandedId] = useState<number | null>(null)
  if (!data) return null

  const projects = (data.projects as Project[]) || []
  const update = (updated: Project[]) => setData({ ...data, projects: updated })

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(), title: "New Project", category: "Machine Learning",
      description: "Describe your project here...",
      tech: ["Python"], gradient: "from-cyan-900/80 to-blue-900/80",
      border: "border-cyan-500/30", github: "#", live: "#", colSpan: "col-span-1"
    }
    update([...projects, newProject])
    setExpandedId(newProject.id)
  }

  const removeProject = (id: number) => update(projects.filter((p) => p.id !== id))
  const updateProject = (id: number, field: keyof Project, value: unknown) =>
    update(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)))

  const updateTech = (id: number, techStr: string) =>
    updateProject(id, "tech", techStr.split(",").map((t) => t.trim()).filter(Boolean))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FolderOpen className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Projects</h2>
          <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{projects.length} projects</span>
        </div>
        <motion.button onClick={addProject} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-all">
          <Plus className="w-4 h-4" /> Add Project
        </motion.button>
      </div>

      <AnimatePresence>
        {projects.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }} transition={{ delay: i * 0.03 }}
            className="rounded-xl border border-white/10 overflow-hidden">
            <div className="flex items-center gap-3 p-4 bg-emerald-500/10 cursor-pointer"
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}>
              <FolderOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{project.title}</p>
                <p className="text-xs text-white/40">{project.category} · {project.tech.join(", ")}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeProject(project.id) }}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <AnimatePresence>
              {expandedId === project.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} className="bg-white/[0.02] border-t border-white/10">
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <LabelInput label="Project Title" value={project.title} onChange={(v) => updateProject(project.id, "title", v)} />
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Category</label>
                        <select value={project.category} onChange={(e) => updateProject(project.id, "category", e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400/60 transition-all">
                          {CATEGORIES.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Description</label>
                      <textarea value={project.description} onChange={(e) => updateProject(project.id, "description", e.target.value)}
                        rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400/60 transition-all resize-none" />
                    </div>

                    <LabelInput label="Tech Stack (comma separated)" value={project.tech.join(", ")}
                      onChange={(v) => updateTech(project.id, v)} placeholder="Python, TensorFlow, FastAPI" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                          <Github className="w-3 h-3" /> GitHub URL
                        </label>
                        <input value={project.github} onChange={(e) => updateProject(project.id, "github", e.target.value)}
                          placeholder="https://github.com/..." 
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400/60 transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> Live URL
                        </label>
                        <input value={project.live} onChange={(e) => updateProject(project.id, "live", e.target.value)}
                          placeholder="https://... or # to hide"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400/60 transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Card Gradient</label>
                        <select value={project.gradient} onChange={(e) => updateProject(project.id, "gradient", e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400/60 transition-all">
                          {GRADIENTS.map((g) => <option key={g.value} value={g.value} className="bg-gray-900">{g.label}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Card Width</label>
                        <select value={project.colSpan} onChange={(e) => updateProject(project.id, "colSpan", e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400/60 transition-all">
                          {COL_SPANS.map((c) => <option key={c.value} value={c.value} className="bg-gray-900">{c.label}</option>)}
                        </select>
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

function LabelInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400/60 transition-all" />
    </div>
  )
}
