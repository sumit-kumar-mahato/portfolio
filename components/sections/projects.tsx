"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Stroke Prediction Model",
    category: "Machine Learning",
    description: "Developed a machine learning model to predict stroke risk using Kaggle dataset. Trained and evaluated Random Forest, KNN, and XGBoost algorithms achieving 94% accuracy.",
    tech: ["Python", "Random Forest", "KNN", "XGBoost"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    github: "https://github.com/sumitkumarmahato",
    live: "#",
  },
  {
    id: 2,
    title: "Obesity Classification",
    category: "Machine Learning",
    description: "Classification model to predict weight categories (obesity, normal, overweight, insufficient weight) using demographic, lifestyle, and health-related factors.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    github: "https://github.com/sumitkumarmahato",
    live: "#",
  },
  {
    id: 3,
    title: "Monday Coffee Analysis",
    category: "SQL Analytics",
    description: "Analyzed sales data for Monday Coffee to identify top cities in India (Pune, Delhi, Jaipur) for potential new store openings based on consumer demand.",
    tech: ["SQL", "Data Analysis", "Business Intelligence"],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    github: "https://github.com/sumitkumarmahato",
    live: "#",
  },
  {
    id: 4,
    title: "Data Visualization Projects",
    category: "Data Viz",
    description: "Created interactive data visualizations and dashboards for business insights using Python visualization libraries.",
    tech: ["Python", "Matplotlib", "Seaborn"],
    gradient: "from-pink-500 via-rose-500 to-red-500",
    github: "https://github.com/sumitkumarmahato",
    live: "#",
  },
  {
    id: 5,
    title: "Procurement Analytics",
    category: "Business Analytics",
    description: "Data-driven procurement analysis at Adani Solar for vendor evaluation and supply chain optimization.",
    tech: ["Excel", "Data Analysis", "Reporting"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    github: "#",
    live: "#",
  },
]

function ProjectCard({ 
  project, 
  isActive,
  direction 
}: { 
  project: typeof projects[0]
  isActive: boolean
  direction: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      transition: {
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1]
      }
    }),
  }

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 flex items-center justify-center px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -20 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-4xl aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)`,
          }} />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-20 left-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm rotate-12"
        />

        {/* Content */}
        <div className="relative h-full p-8 md:p-12 flex flex-col justify-between z-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-xs font-mono tracking-wider uppercase bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white/90 mb-4"
            >
              {project.category}
            </motion.span>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {project.title}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed"
            >
              {project.description}
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {project.tech.map((tech, i) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-sm text-white/90 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors border border-white/10"
              >
                <Github size={18} />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href={project.live}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition-colors font-medium"
              >
                <span className="text-sm">View Project</span>
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 100px rgba(255,255,255,0.1)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [[currentIndex, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection
    if (newIndex >= 0 && newIndex < projects.length) {
      setPage([newIndex, newDirection])
    }
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : {}}
        className="absolute top-20 right-10 text-[20vw] font-black text-foreground pointer-events-none select-none hidden lg:block"
      >
        03
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
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

        {/* Carousel container */}
        <div className="relative h-[500px] md:h-[600px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <ProjectCard
              key={currentIndex}
              project={projects[currentIndex]}
              isActive={true}
              direction={direction}
            />
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-card hover:border-cyan-400/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} className="group-hover:text-cyan-400 transition-colors" />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentIndex === projects.length - 1}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-card hover:border-cyan-400/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
            aria-label="Next project"
          >
            <ChevronRight size={24} className="group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
              className={`relative h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "w-8 bg-cyan-400" 
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Project counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mt-6"
        >
          <span className="font-mono text-sm text-muted-foreground">
            <span className="text-cyan-400">{String(currentIndex + 1).padStart(2, '0')}</span>
            {" / "}
            {String(projects.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Swipe hint on mobile */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-xs text-muted-foreground mt-4 md:hidden"
        >
          Swipe or use arrows to navigate
        </motion.p>
      </div>
    </section>
  )
}
