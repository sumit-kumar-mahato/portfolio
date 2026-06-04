"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { ArrowUpRight, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Stroke Prediction Model",
    category: "Machine Learning",
    description: "Developed an advanced predictive model using Machine Learning techniques to accurately identify individuals at risk of experiencing a stroke based on various health indicators.",
    tech: ["Python", "XGBoost", "Scikit-learn"],
    gradient: "from-cyan-900/80 to-blue-900/80",
    border: "border-cyan-500/30",
    github: "https://github.com/sumit-kumar-mahato/Stroke-Prediction",
    live: "#",
    colSpan: "md:col-span-2 lg:col-span-2"
  },
  {
    id: 10,
    title: "Enterprise LLM Assistant",
    category: "GenAI",
    description: "A sophisticated Generative AI integration utilizing state-of-the-art Large Language Models (LLMs) to construct contextual conversational agents and intelligent RAG systems.",
    tech: ["Python", "LangChain", "OpenAI"],
    gradient: "from-indigo-900/80 to-fuchsia-900/80",
    border: "border-fuchsia-500/30",
    github: "#",
    live: "#",
    colSpan: "col-span-1"
  },
  {
    id: 2,
    title: "Computer Vision Ecosystem",
    category: "Computer Vision",
    description: "An end-to-end repository encompassing basic image processing, advanced deep learning models, and real-time video analytics for dynamic environments.",
    tech: ["Python", "OpenCV", "Deep Learning"],
    gradient: "from-purple-900/80 to-pink-900/80",
    border: "border-purple-500/30",
    github: "https://github.com/sumit-kumar-mahato/Computer-Vision",
    live: "#",
    colSpan: "col-span-1"
  },
  {
    id: 3,
    title: "Obesity Classification",
    category: "Machine Learning",
    description: "Classification model to predict weight categories utilizing demographic, lifestyle, and comprehensive health-related factors.",
    tech: ["Python", "Pandas", "Machine Learning"],
    gradient: "from-emerald-900/80 to-teal-900/80",
    border: "border-teal-500/30",
    github: "https://github.com/sumit-kumar-mahato/Obesity_classification",
    live: "#",
    colSpan: "col-span-1"
  },
  {
    id: 9,
    title: "AI Resume Analyzer",
    category: "NLP & AI",
    description: "A natural language processing utility engineered to evaluate resumes, align them against core job requirements, and systematically identify critical skill gaps.",
    tech: ["Python", "NLP", "Spacy"],
    gradient: "from-rose-900/80 to-red-900/80",
    border: "border-rose-500/30",
    github: "https://github.com/sumit-kumar-mahato/resume-analyzer",
    live: "#",
    colSpan: "md:col-span-2 lg:col-span-1"
  },
  {
    id: 8,
    title: "Bird Species Identifier",
    category: "Deep Learning",
    description: "An AI-powered image recognition tool leveraging Convolutional Neural Networks (CNN) to accurately classify and identify various species of birds from user uploads.",
    tech: ["Python", "CNN", "Keras"],
    gradient: "from-violet-900/80 to-indigo-900/80",
    border: "border-indigo-500/30",
    github: "https://github.com/sumit-kumar-mahato/Bird-Species-Identifier",
    live: "#",
    colSpan: "col-span-1"
  },
  {
    id: 4,
    title: "SHG Business OS",
    category: "Full Stack",
    description: "A robust organizational system encompassing an Admin OS and User OS to seamlessly manage Self Help Group businesses and resource allocation.",
    tech: ["Python", "Backend OS", "System Architecture"],
    gradient: "from-orange-900/80 to-yellow-900/80",
    border: "border-amber-500/30",
    github: "https://github.com/sumit-kumar-mahato/shg-os-app",
    live: "#",
    colSpan: "md:col-span-2 lg:col-span-2"
  },
  {
    id: 5,
    title: "Blinkit Sales Dashboard",
    category: "Data Analytics",
    description: "Interactive data visualization and business intelligence dashboard analyzing Blinkit sales, inventory metrics, and localized operational trends.",
    tech: ["PowerBI", "Data Analytics"],
    gradient: "from-blue-900/80 to-cyan-900/80",
    border: "border-sky-500/30",
    github: "https://github.com/sumit-kumar-mahato/Blinkit_PowerBI",
    live: "#",
    colSpan: "col-span-1"
  },
  {
    id: 6,
    title: "Monday Coffee Analytics",
    category: "Data Analytics",
    description: "Analyzed extensive sales data for Monday Coffee to identify high-potential cities in India for rapid new store expansion based on latent consumer demand.",
    tech: ["SQL", "Data Analysis"],
    gradient: "from-red-900/80 to-orange-900/80",
    border: "border-red-500/30",
    github: "https://github.com/sumit-kumar-mahato/Monday-Coffee-Project",
    live: "#",
    colSpan: "col-span-1"
  },
  {
    id: 7,
    title: "Smart Pothole Detection",
    category: "Computer Vision",
    description: "An integrated Android application paired with a Machine Learning backend that utilizes mobile cameras to detect, map, and report road potholes in real-time.",
    tech: ["Python", "Computer Vision"],
    gradient: "from-slate-900/80 to-zinc-900/80",
    border: "border-gray-500/30",
    github: "https://github.com/sumit-kumar-mahato/pothole-detection",
    live: "#",
    colSpan: "col-span-1"
  }
]

const categories = ["All", "Machine Learning", "Deep Learning", "Computer Vision", "GenAI", "NLP & AI", "Data Analytics", "Full Stack"]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  )

  return (
    <section id="projects" className="py-32 px-6 relative bg-background overflow-hidden" ref={ref}>
      {/* Background Section Number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        className="absolute top-20 right-10 text-[20vw] font-black text-foreground pointer-events-none select-none hidden lg:block"
      >
        03
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm">03</span>
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Selected Work</span>
            <div className="h-px w-12 bg-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Featured Projects
          </h2>
        </motion.div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "text-black"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Bento Grid layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className={`group relative rounded-[2rem] overflow-hidden border ${project.border} bg-card min-h-[400px] flex flex-col ${
                  activeCategory === "All" ? project.colSpan : "col-span-1"
                }`}
              >
                {/* Dynamic Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
                
                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform duration-700 group-hover:scale-150" />

                <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-mono uppercase tracking-widest mb-6 shadow-sm">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-cyan-200 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-8 line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 mt-auto">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white/90 border border-white/10 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-transform duration-300 hover:scale-110"
                        aria-label="GitHub Repository"
                      >
                        <Github size={18} />
                      </a>
                      {project.live !== "#" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black transition-transform duration-300 hover:scale-110 shadow-lg shadow-cyan-400/20"
                          aria-label="Live Project"
                        >
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
