"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Download, ArrowDown } from "lucide-react"

type HeroData = { name: string; tagline: string; description: string; resumeUrl: string }

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [heroData, setHeroData] = useState<HeroData>({
    name: "Sumit Kumar Mahato",
    tagline: "AI & Data Science",
    description: "A DATA SCIENTIST PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS 😎",
    resumeUrl: "#",
  })

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => { if (d.hero) setHeroData(d.hero) }).catch(() => {})
  }, [])
  
  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const springX = useSpring(mousePosition.x, { stiffness: 40, damping: 15 })
  const springY = useSpring(mousePosition.y, { stiffness: 40, damping: 15 })

  const avatarRotateX = useTransform(springY, [-1, 1], [25, -25])
  const avatarRotateY = useTransform(springX, [-1, 1], [-35, 35])
  const avatarX = useTransform(springX, [-1, 1], [-40, 40])
  const avatarY = useTransform(springY, [-1, 1], [-40, 40])
  const avatarScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"])
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [currentFace, setCurrentFace] = useState("/avatar_head.png")

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setCurrentFace("/avatar_head_blink.png")
        setTimeout(() => setCurrentFace(window.scrollY > 300 ? "/avatar_head_smile.png" : "/avatar_head.png"), 150)
      }
    }, 2000)
    const handleScroll = () => {
      if (window.scrollY > 300) setCurrentFace((prev) => prev === "/avatar_head_blink.png" ? prev : "/avatar_head_smile.png")
      else setCurrentFace((prev) => prev === "/avatar_head_blink.png" ? prev : "/avatar_head.png")
    }
    window.addEventListener("scroll", handleScroll)
    return () => { clearInterval(blinkInterval); window.removeEventListener("scroll", handleScroll) }
  }, [])

  return (
    <section ref={containerRef} className="relative h-[200vh]" id="home">
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex flex-col justify-center perspective-[1200px]">

        {/* Animated particle stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }}
              transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 4 }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-500/8 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/8 blur-3xl"
          />
        </div>

        {/* Massive Background Text */}
        <motion.div style={{ y: bgTextY, opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="text-[18vw] font-black tracking-tighter text-white leading-none select-none text-center whitespace-nowrap"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)", color: "transparent" }}>
            HI, I'M SUMIT
          </h1>
          <h1 className="absolute text-[18vw] font-black tracking-tighter text-white leading-none select-none text-center whitespace-nowrap opacity-5">
            HI, I'M SUMIT
          </h1>
        </motion.div>

        {/* 2.5D Animated Character */}
        <motion.div style={{ opacity, y: avatarScrollY }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            style={{ rotateX: avatarRotateX, rotateY: avatarRotateY, x: avatarX, y: avatarY }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[95vw] max-w-[800px] md:max-w-[1000px] aspect-square flex items-center justify-center"
          >
            <div className="absolute inset-20 bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen" />
            <div className="absolute inset-20 bg-purple-500/10 blur-[80px] rounded-full mix-blend-screen" />
            <Image src={currentFace} alt="3D Avatar" fill className="object-contain pointer-events-auto mix-blend-screen"
              style={{ WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 68%)", maskImage: "radial-gradient(circle at center, black 45%, transparent 68%)" }}
              priority />
          </motion.div>
        </motion.div>

        {/* Side Elements */}
        <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col md:flex-row items-end md:items-center justify-between z-30 px-8 md:px-16 pointer-events-none pb-20 md:pb-0">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="w-full md:w-1/4 pointer-events-auto mb-10 md:mb-0">
            <p className="text-white text-sm md:text-base font-medium leading-relaxed tracking-wide uppercase drop-shadow-md">
              {heroData.description}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.7 }}
            className="w-full md:w-1/4 flex flex-col md:items-end gap-3 pointer-events-auto">
            <a href="#contact" className="relative inline-flex items-center justify-center px-8 py-4 rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[2px] bg-black/40 rounded-full backdrop-blur-sm" />
              <span className="relative z-10 text-white font-bold tracking-widest text-sm uppercase">Contact Me</span>
            </a>
            
            {heroData.resumeUrl && heroData.resumeUrl !== "#" && (
              <a href={heroData.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300 border border-white/20 bg-white/5 backdrop-blur-sm">
                <Download className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-medium text-sm">Resume</span>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
