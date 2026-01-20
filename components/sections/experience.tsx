"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react"

const experiences = [
  {
    id: 1,
    type: "education",
    title: "PGDM in Big Data Analytics",
    company: "Adani Institute of Digital Technology Management",
    location: "Ahmedabad, India",
    period: "2025 - Present",
    description: [
      "Currently pursuing PGDM in Big Data Analytics with CGPA 3.83/4.33",
      "Developing machine learning models for stroke prediction and obesity classification",
      "Working on SQL-based analytics projects for business insights",
    ],
  },
  {
    id: 2,
    type: "work",
    title: "Assistant Manager",
    company: "Adani Solar, Mundra",
    location: "Gujarat, India",
    period: "Aug 2022 - May 2024",
    description: [
      "Construction phase of 2GW TOPCON Project - establishment of utility functions, machine movement, installation and process commissioning",
      "Managed end-to-end procurement processes including purchase requisitions, purchase orders and vendor evaluation",
    ],
  },
  {
    id: 3,
    type: "work",
    title: "Business Analytics Intern",
    company: "Apparatus Solutions, Pune",
    location: "Pune, India",
    period: "Sep 2022 - Dec 2022",
    description: [
      "Performed data analysis and visualization using Python for data-driven decision-making",
      "Supported marketing and design activities by creating visually appealing layouts in Canva",
    ],
  },
  {
    id: 4,
    type: "work",
    title: "Civil Engineering Intern",
    company: "Patel Infrastructure, Patna",
    location: "Patna, India",
    period: "Nov 2020 - Apr 2021",
    description: [
      "Conducted surveys and investigations for project development",
      "Prepared Detailed Project Reports (DPR) and drawings for road and bridge projects using AutoCAD",
    ],
  },
  {
    id: 5,
    type: "education",
    title: "B.Tech in Civil Engineering",
    company: "Kalinga Institute of Industrial Technology",
    location: "Bhubaneswar, India",
    period: "2018 - 2022",
    description: [
      "Completed Bachelor of Technology in Civil Engineering with CGPA 8.49/10.00",
      "Developed strong foundation in engineering principles and project management",
    ],
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

  return (
    <section id="experience" className="py-32 px-6 relative overflow-hidden" ref={containerRef}>
      {/* Background number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        className="absolute top-20 left-10 text-[25vw] font-black text-foreground pointer-events-none select-none hidden lg:block"
      >
        02
      </motion.div>

      <div className="max-w-5xl mx-auto relative" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm">02</span>
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Career Path</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-border/30">
            <motion.div
              className="w-full bg-gradient-to-b from-cyan-400 to-blue-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-cyan-400 flex items-center justify-center z-10">
                  {exp.type === "work" ? (
                    <Briefcase className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                  )}
                </div>

                {/* Content card */}
                <motion.div
                  className={`ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16 md:col-start-2"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm hover:border-cyan-400/30 transition-colors group">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:text-cyan-400 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-cyan-400 font-medium mb-4">{exp.company}</p>

                    {/* Description */}
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="text-cyan-400 mt-1">-</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Empty space for grid alignment */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
