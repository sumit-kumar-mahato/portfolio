"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Award, ExternalLink } from "lucide-react"

type Cert = { id: number; title: string; issuer: string; icon: string; color: string; link: string }

const defaultCerts: Cert[] = []

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [certifications, setCertifications] = useState<Cert[]>(defaultCerts)

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => { if (d.certifications) setCertifications(d.certifications) }).catch(() => {})
  }, [])

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Credentials</span>
            <div className="h-px w-12 bg-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm hover:border-cyan-400/30 transition-all cursor-default"
              whileHover={{ y: -5 }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4`}>
                <span className="text-white font-bold text-sm">{cert.icon}</span>
              </div>
              <h3 className="text-foreground font-semibold mb-1 group-hover:text-cyan-400 transition-colors">{cert.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Award className="w-3 h-3" />
                {cert.issuer}
              </p>
              {cert.link && cert.link !== "#" && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              )}
              {(!cert.link || cert.link === "#") && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
