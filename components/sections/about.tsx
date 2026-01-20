"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const skills = [
  { name: "Python", level: 95 },
  { name: "SQL", level: 90 },
  { name: "Data Analysis", level: 92 },
  { name: "Machine Learning", level: 88 },
  { name: "Data Visualization", level: 85 },
  { name: "Communication", level: 90 },
]

const tools = [
  "Python", "SQL", "NumPy", "Pandas", 
  "Data Visualization", "Revit", "AutoCAD", 
  "Team Management", "Adaptability"
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden" ref={containerRef}>
      {/* Large background text */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 text-[30vw] font-black text-foreground/[0.02] pointer-events-none select-none leading-none"
      >
        ABOUT
      </motion.div>

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm">01</span>
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Who I Am</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                A tech-driven enthusiast passionate about leveraging <span className="text-cyan-400">data to drive organizational success</span> and create a positive impact on society.
              </p>
              <p>
                With hands-on experience at <span className="text-foreground font-medium">Adani Solar</span> as Assistant Manager during 
                the construction phase of a 2 GW TOPCON Project, {"I've"} developed a unique blend of 
                technical expertise and business acumen in procurement and process commissioning.
              </p>
              <p>
                Currently pursuing PGDM in Big Data Analytics at <span className="text-foreground font-medium">Adani Institute of Digital Technology Management</span>, 
                dedicated to solving real-world challenges through innovative, data-driven solutions.
              </p>
            </div>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <h3 className="text-sm font-mono text-cyan-400 mb-4 tracking-wider">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.03 }}
                    className="px-3 py-1.5 text-xs font-mono bg-card/50 border border-border/50 rounded-full text-muted-foreground hover:border-cyan-400/50 hover:text-cyan-400 transition-colors cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-sm font-mono text-cyan-400 mb-6 tracking-wider">EXPERTISE</h3>
            
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1 bg-card/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50"
            >
              {[
                { value: "3+", label: "Years Exp" },
                { value: "5+", label: "Projects" },
                { value: "4", label: "Certifications" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs font-mono text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
