"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, ExternalLink } from "lucide-react"

const certifications = [
  {
    id: 1,
    title: "SQL and Relational Databases",
    issuer: "IBM",
    icon: "IBM",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Python for Data Science",
    issuer: "Learnbay",
    icon: "PY",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 3,
    title: "Data Visualization with Python",
    issuer: "IBM",
    icon: "IBM",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    title: "Revit",
    issuer: "Autodesk",
    icon: "AD",
    color: "from-green-500 to-teal-500",
  },
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Credentials</span>
            <div className="h-px w-12 bg-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Certifications
          </h2>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm hover:border-cyan-400/30 transition-all cursor-default"
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4`}>
                <span className="text-white font-bold text-sm">{cert.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-foreground font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Award className="w-3 h-3" />
                {cert.issuer}
              </p>

              {/* Corner decoration */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
