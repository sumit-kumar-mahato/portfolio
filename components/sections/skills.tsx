"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Brain, TrendingUp } from "lucide-react"

type Skill = { id: number; name: string; level: number; category: string }

const CATEGORY_COLORS: Record<string, string> = {
  "Programming": "from-cyan-500 to-blue-600",
  "AI/ML": "from-purple-500 to-pink-600",
  "Data": "from-emerald-500 to-teal-600",
  "Analytics": "from-amber-500 to-orange-600",
  "Other": "from-slate-500 to-zinc-600",
}

const CATEGORY_GLOW: Record<string, string> = {
  "Programming": "shadow-cyan-500/30",
  "AI/ML": "shadow-purple-500/30",
  "Data": "shadow-emerald-500/30",
  "Analytics": "shadow-amber-500/30",
  "Other": "shadow-slate-500/30",
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => { if (d.skills) setSkills(d.skills) }).catch(() => {})
  }, [])

  if (skills.length === 0) return null

  const categories = [...new Set(skills.map((s) => s.category))]

  return (
    <section id="skills" className="py-32 px-6 relative bg-background overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.03 } : {}}
        className="absolute top-20 left-10 text-[20vw] font-black text-foreground pointer-events-none select-none hidden lg:block leading-none">
        05
      </motion.div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl" />
        <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm">05</span>
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">What I Know</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground flex items-center gap-4">
            Skills <Brain className="w-10 h-10 text-cyan-400 inline" />
          </h2>
        </motion.div>

        {/* Category groups */}
        <div className="space-y-16">
          {categories.map((category, ci) => {
            const categorySkills = skills.filter((s) => s.category === category)
            const gradient = CATEGORY_COLORS[category] || CATEGORY_COLORS["Other"]
            const glow = CATEGORY_GLOW[category] || CATEGORY_GLOW["Other"]

            return (
              <motion.div key={category} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: ci * 0.1 }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${glow}`}>
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category}</h3>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categorySkills.map((skill, i) => (
                    <SkillBar key={skill.id} skill={skill} gradient={gradient} glow={glow} index={i} isInView={isInView} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SkillBar({ skill, gradient, glow, index, isInView }: {
  skill: Skill; gradient: string; glow: string; index: number; isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08 + 0.2 }}
      className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-semibold text-sm">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.5 }}
          className={`text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Progress bar track */}
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-lg ${glow}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Glowing dots at skill level */}
      <div className="flex gap-1.5 mt-3">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`flex-1 h-1 rounded-full ${i < Math.round(skill.level / 10) ? `bg-gradient-to-r ${gradient}` : "bg-white/10"}`}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ delay: index * 0.08 + 0.4 + i * 0.05 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
