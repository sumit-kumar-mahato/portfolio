"use client"

import { useAdmin } from "../layout"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Plus, Trash2, GripVertical } from "lucide-react"

type Skill = { id: number; name: string; level: number; category: string }
const CATEGORIES = ["Programming", "AI/ML", "Data", "Analytics", "Other"]

export default function SkillsEditorPage() {
  const { data, setData } = useAdmin()
  if (!data) return null
  const skills = (data.skills as Skill[]) || []

  const update = (updated: Skill[]) => setData({ ...data, skills: updated })

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now(),
      name: "New Skill",
      level: 50,
      category: "Programming",
    }
    update([...skills, newSkill])
  }

  const removeSkill = (id: number) => update(skills.filter((s) => s.id !== id))

  const updateSkill = (id: number, field: keyof Skill, value: string | number) => {
    update(skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-pink-400" />
          <h2 className="text-lg font-bold text-white">Skills Section</h2>
          <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{skills.length} skills</span>
        </div>
        <motion.button
          onClick={addSkill}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-400 text-sm font-medium hover:bg-pink-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </motion.button>
      </div>

      <AnimatePresence>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4"
          >
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-white/20 cursor-grab" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                  placeholder="Skill name"
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-pink-400/60 transition-all"
                />
                <select
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-pink-400/60 transition-all"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {/* Level slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-white/40 font-mono">Proficiency</label>
                <span className="text-xs font-bold text-pink-400">{skill.level}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, "level", Number(e.target.value))}
                className="w-full accent-pink-400 cursor-pointer"
              />
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {skills.length === 0 && (
        <div className="text-center py-16 text-white/30">
          <Brain className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No skills yet. Click "Add Skill" to get started.</p>
        </div>
      )}
    </motion.div>
  )
}
