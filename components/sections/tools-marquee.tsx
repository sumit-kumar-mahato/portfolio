"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

type Tool = { id: number; name: string; logo: string }

const defaultTools: Tool[] = [
  { id: 1, name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { id: 2, name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { id: 3, name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { id: 4, name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
  { id: 5, name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { id: 6, name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
  { id: 7, name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
  { id: 8, name: "Excel", logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg" },
  { id: 9, name: "SAP", logo: "https://cdn.worldvectorlogo.com/logos/sap-2.svg" },
]

export default function ToolsMarquee() {
  const [tools, setTools] = useState<Tool[]>(defaultTools)

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => { if (d.tools?.length) setTools(d.tools) }).catch(() => {})
  }, [])

  const allTools = [...tools, ...tools]

  return (
    <section className="py-16 relative overflow-hidden border-y border-border/30 bg-secondary/20">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
        <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Tools & Technologies</span>
      </motion.div>
      
      <div className="relative">
        <div className="flex animate-marquee">
          {allTools.map((tool, index) => (
            <div key={`${tool.id}-${index}`} className="flex flex-col items-center justify-center mx-8 md:mx-12 min-w-[100px] group">
              <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center bg-card/50 rounded-xl p-3 border border-border/30 group-hover:border-cyan-400/50 group-hover:bg-card transition-all duration-300 group-hover:scale-110">
                <Image src={tool.logo || "/placeholder.svg"} alt={tool.name} width={48} height={48}
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" unoptimized />
              </div>
              <span className="mt-3 text-xs font-medium text-muted-foreground group-hover:text-cyan-400 transition-colors">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative mt-8">
        <div className="flex animate-marquee" style={{ animationDirection: "reverse", animationDuration: "25s" }}>
          {[...allTools].reverse().map((tool, index) => (
            <div key={`${tool.id}-reverse-${index}`} className="flex flex-col items-center justify-center mx-8 md:mx-12 min-w-[100px] group">
              <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center bg-card/50 rounded-xl p-3 border border-border/30 group-hover:border-cyan-400/50 group-hover:bg-card transition-all duration-300 group-hover:scale-110">
                <Image src={tool.logo || "/placeholder.svg"} alt={tool.name} width={48} height={48}
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" unoptimized />
              </div>
              <span className="mt-3 text-xs font-medium text-muted-foreground group-hover:text-cyan-400 transition-colors">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
