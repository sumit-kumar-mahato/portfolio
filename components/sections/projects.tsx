"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Stroke Prediction Model",
    category: "Machine Learning",
    description: "Developed an advanced predictive model using Machine Learning techniques to accurately identify individuals at risk of experiencing a stroke based on various health indicators.",
    tech: ["Python", "XGBoost", "Scikit-learn", "Data Analysis"],
    gradient: "from-cyan-900/90 via-blue-900/90 to-indigo-900/90",
    border: "border-cyan-500/30",
    github: "https://github.com/sumit-kumar-mahato/Stroke-Prediction",
    live: "#",
  },
  {
    id: 2,
    title: "Computer Vision Ecosystem",
    category: "Computer Vision & AI",
    description: "An end-to-end computer vision repository encompassing basic image processing, advanced deep learning models, and real-time video analytics for dynamic environments.",
    tech: ["Python", "OpenCV", "Deep Learning", "CNN"],
    gradient: "from-purple-900/90 via-fuchsia-900/90 to-pink-900/90",
    border: "border-fuchsia-500/30",
    github: "https://github.com/sumit-kumar-mahato/Computer-Vision",
    live: "#",
  },
  {
    id: 3,
    title: "Obesity Classification",
    category: "Machine Learning",
    description: "Classification model to predict weight categories (obesity, normal, overweight, insufficient weight) utilizing demographic, lifestyle, and comprehensive health-related factors.",
    tech: ["Python", "Pandas", "Machine Learning"],
    gradient: "from-emerald-900/90 via-teal-900/90 to-cyan-900/90",
    border: "border-teal-500/30",
    github: "https://github.com/sumit-kumar-mahato/Obesity_classification",
    live: "#",
  },
  {
    id: 4,
    title: "SHG Business OS",
    category: "Full Stack Application",
    description: "A robust organizational system encompassing an Admin OS and User OS to seamlessly manage Self Help Group businesses, operational credibility, and resource allocation.",
    tech: ["Python", "Backend OS", "System Architecture"],
    gradient: "from-orange-900/90 via-amber-900/90 to-yellow-900/90",
    border: "border-amber-500/30",
    github: "https://github.com/sumit-kumar-mahato/shg-os-app",
    live: "#",
  },
  {
    id: 5,
    title: "Blinkit Sales Dashboard",
    category: "Business Intelligence",
    description: "Interactive data visualization and business intelligence dashboard analyzing Blinkit sales, inventory metrics, and localized operational trends.",
    tech: ["PowerBI", "Data Analytics", "Visualization"],
    gradient: "from-blue-900/90 via-sky-900/90 to-cyan-900/90",
    border: "border-sky-500/30",
    github: "https://github.com/sumit-kumar-mahato/Blinkit_PowerBI",
    live: "#",
  },
  {
    id: 6,
    title: "Monday Coffee Analytics",
    category: "Data Analytics",
    description: "Analyzed extensive sales data for Monday Coffee to identify high-potential cities in India for rapid new store expansion based on latent consumer demand.",
    tech: ["SQL", "Business Intelligence", "Data Analysis"],
    gradient: "from-rose-900/90 via-red-900/90 to-orange-900/90",
    border: "border-red-500/30",
    github: "https://github.com/sumit-kumar-mahato/Monday-Coffee-Project",
    live: "#",
  },
  {
    id: 7,
    title: "Smart Pothole Detection",
    category: "Mobile & AI Application",
    description: "An integrated Android application paired with a Machine Learning backend that utilizes mobile cameras to detect, map, and report road potholes in real-time.",
    tech: ["Python", "Computer Vision", "Android"],
    gradient: "from-slate-900/90 via-gray-900/90 to-zinc-900/90",
    border: "border-gray-500/30",
    github: "https://github.com/sumit-kumar-mahato/pothole-detection",
    live: "#",
  },
  {
    id: 8,
    title: "Bird Species Identifier",
    category: "Deep Learning",
    description: "An AI-powered image recognition tool leveraging Convolutional Neural Networks (CNN) to accurately classify and identify various species of birds from user uploads.",
    tech: ["Python", "CNN", "Image Recognition"],
    gradient: "from-violet-900/90 via-indigo-900/90 to-blue-900/90",
    border: "border-indigo-500/30",
    github: "https://github.com/sumit-kumar-mahato/Bird-Species-Identifier",
    live: "#",
  },
  {
    id: 9,
    title: "AI Resume & Skill Gap Analyzer",
    category: "NLP & Machine Learning",
    description: "A natural language processing utility engineered to evaluate resumes, align them against core job requirements, and systematically identify critical skill gaps.",
    tech: ["Python", "NLP", "Data Processing"],
    gradient: "from-pink-900/90 via-rose-900/90 to-red-900/90",
    border: "border-pink-500/30",
    github: "https://github.com/sumit-kumar-mahato/resume-analyzer",
    live: "#",
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-32 px-6 relative bg-background" ref={ref}>
      {/* Background Section Number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        className="absolute top-20 right-10 text-[20vw] font-black text-foreground pointer-events-none select-none hidden lg:block"
      >
        03
      </motion.div>

      <div className="max-w-7xl mx-auto mb-20 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
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
      </div>

      {/* Sticky Scroll Container */}
      <div className="relative pb-[20vh]">
        {projects.map((project, index) => {
          // The magic of stacking cards natively:
          const topOffset = `calc(5rem + ${index * 1.5}rem)`
          
          return (
            <div
              key={project.id}
              className="sticky mb-16 last:mb-0"
              style={{ top: topOffset }}
            >
              <div className="w-full max-w-5xl mx-auto h-[75vh] md:h-[65vh] rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/5 transition-transform duration-500 hover:scale-[1.01]">
                
                {/* Dynamic Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} backdrop-blur-3xl`} />
                
                {/* Decorative Glowing Orbs */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 h-full p-8 md:p-14 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono uppercase tracking-widest mb-6 shadow-xl">
                      {project.category}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-auto">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-xl bg-black/30 backdrop-blur-md text-white/90 border border-white/10 text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 shrink-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-110"
                        aria-label="GitHub Repository"
                      >
                        <Github size={24} />
                      </a>
                      {project.live !== "#" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-14 h-14 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black transition-all hover:scale-110 shadow-lg shadow-cyan-400/20"
                          aria-label="Live Project"
                        >
                          <ArrowUpRight size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
