"use client"

import { useAdmin } from "../layout"
import { motion, AnimatePresence } from "framer-motion"
import { Wrench, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

type Tool = { id: number; name: string; logo: string }

export default function ToolsEditorPage() {
  const { data, setData } = useAdmin()
  if (!data) return null

  const tools = (data.tools as Tool[]) || []
  const update = (updated: Tool[]) => setData({ ...data, tools: updated })

  const addTool = () => update([...tools, { id: Date.now(), name: "New Tool", logo: "" }])
  const removeTool = (id: number) => update(tools.filter((t) => t.id !== id))
  const updateTool = (id: number, field: keyof Tool, value: string) =>
    update(tools.map((t) => (t.id === id ? { ...t, [field]: value } : t)))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Wrench className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Tools & Technologies Marquee</h2>
        </div>
        <motion.button onClick={addTool} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-sm font-medium hover:bg-indigo-500/30 transition-all">
          <Plus className="w-4 h-4" /> Add Tool
        </motion.button>
      </div>

      <p className="text-xs text-white/30 -mt-2">
        💡 Tip: Use SVG logo URLs from devicons.github.io or worldvectorlogo.com. The marquee shows these as an animated ticker.
      </p>

      <div className="space-y-3">
        <AnimatePresence>
          {tools.map((tool, i) => (
            <motion.div key={tool.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              
              {/* Logo preview */}
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {tool.logo ? (
                  <Image src={tool.logo} alt={tool.name} width={32} height={32} className="object-contain" unoptimized />
                ) : (
                  <Wrench className="w-4 h-4 text-white/30" />
                )}
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input value={tool.name} onChange={(e) => updateTool(tool.id, "name", e.target.value)}
                  placeholder="Tool name (e.g. Python)"
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-400/60 transition-all" />
                <input value={tool.logo} onChange={(e) => updateTool(tool.id, "logo", e.target.value)}
                  placeholder="SVG logo URL"
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-400/60 transition-all text-xs" />
              </div>

              <button onClick={() => removeTool(tool.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all flex-shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
