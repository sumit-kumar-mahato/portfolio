"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight, Github } from "lucide-react"

type Project = {
  id: number; title: string; category: string; description: string;
  tech: string[]; gradient: string; border: string; github: string; live: string; colSpan: string
}

const defaultProjects: Project[] = []
const categories = ["All", "Machine Learning", "Deep Learning", "Computer Vision", "GenAI", "NLP & AI", "Data Analytics", "Full Stack"]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => { if (d.projects) setProjects(d.projects) }).catch(() => {})
  }, [])

  const filteredProjects = projects.filter((p) => activeCategory === "All" || p.category === activeCategory)
  const visibleCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

  return (
    <section id="projects" className="py-32 px-6 relative bg-background overflow-hidden" ref={ref}>
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.03 } : {}}
        className="absolute top-20 right-10 text-[20vw] font-black text-foreground pointer-events-none select-none hidden lg:block">03</motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm">03</span>
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Selected Work</span>
            <div className="h-px w-12 bg-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">Featured Projects</h2>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-16">
          {visibleCategories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category ? "text-black" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}>
              {activeCategory === category && (
                <motion.div layoutId="activeCategory" className="absolute inset-0 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className={`group relative rounded-[2rem] overflow-hidden border ${project.border} bg-card min-h-[400px] flex flex-col ${activeCategory === "All" ? project.colSpan : "col-span-1"}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform duration-700 group-hover:scale-150" />
                <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-mono uppercase tracking-widest mb-6">{project.category}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-cyan-200 transition-colors duration-300">{project.title}</h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-8 line-clamp-4">{project.description}</p>
                  </div>
                  <div className="flex flex-col gap-6 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white/90 border border-white/10 text-xs font-medium">{tech}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      {project.github !== "#" && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-transform duration-300 hover:scale-110">
                          <Github size={18} />
                        </a>
                      )}
                      {project.live !== "#" && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black transition-transform duration-300 hover:scale-110 shadow-lg shadow-cyan-400/20">
                          <ArrowUpRight size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
