"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react"

type ExperienceItem = {
  id: number; type: string; title: string; company: string;
  location: string; period: string; description: string[]
}

const defaultExperiences: ExperienceItem[] = [
  { id: 1, type: "education", title: "PGDM in Big Data Analytics", company: "Adani Institute of Digital Technology Management", location: "Ahmedabad, India", period: "2025 - Present", description: ["Currently pursuing PGDM in Big Data Analytics with CGPA 3.83/4.33"] },
  { id: 2, type: "work", title: "Assistant Manager", company: "Adani Solar, Mundra", location: "Gujarat, India", period: "Aug 2022 - May 2024", description: ["Construction phase of 2GW TOPCON Project"] },
]

const TimelineCard = ({ exp, index }: { exp: ExperienceItem; index: number }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group">
    <div className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-background border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors duration-300 z-10 shadow-[0_0_10px_rgba(34,211,238,0)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
    <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:border-cyan-400/30">
      <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono text-cyan-200/70">
        <span className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-md"><Calendar className="w-3.5 h-3.5" />{exp.period}</span>
        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{exp.location}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{exp.title}</h3>
      <p className="text-cyan-400/80 font-medium mb-6 text-sm md:text-base">{exp.company}</p>
      <ul className="space-y-3">
        {exp.description.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-cyan-400/50 mt-1.5 shrink-0 block w-1 h-1 rounded-full bg-cyan-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
)

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences)

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => { if (d.experience) setExperiences(d.experience) }).catch(() => {})
  }, [])

  const workExperiences = experiences.filter((e) => e.type === "work")
  const educationExperiences = experiences.filter((e) => e.type === "education")

  return (
    <section id="experience" className="py-32 px-6 relative bg-background overflow-hidden" ref={containerRef}>
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.03 } : {}}
        className="absolute top-20 left-10 text-[25vw] font-black text-foreground pointer-events-none select-none hidden lg:block leading-none">02</motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-24">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm">02</span>
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">My Journey</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">Experience & Education</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20"><Briefcase className="w-5 h-5" /></div>
              Professional Experience
            </motion.h3>
            <div className="space-y-12 relative border-l-2 border-white/10 ml-6 pl-8 py-2">
              <motion.div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-cyan-400 to-transparent origin-top"
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "easeOut" }} />
              {workExperiences.map((exp, index) => <TimelineCard key={exp.id} exp={exp} index={index} />)}
            </div>
          </div>

          <div>
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20"><GraduationCap className="w-5 h-5" /></div>
              Academic Background
            </motion.h3>
            <div className="space-y-12 relative border-l-2 border-white/10 ml-6 pl-8 py-2">
              <motion.div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-cyan-400 to-transparent origin-top"
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} />
              {educationExperiences.map((exp, index) => <TimelineCard key={exp.id} exp={exp} index={index} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
