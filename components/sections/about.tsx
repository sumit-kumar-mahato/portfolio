"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

type AboutData = { bio: string }

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [aboutData, setAboutData] = useState<AboutData>({ bio: "" })

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => { if (d.about) setAboutData(d.about) }).catch(() => {})
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -300])
  const y3 = useTransform(scrollYProgress, [0, 1], [-100, 200])
  const y4 = useTransform(scrollYProgress, [0, 1], [-200, 100])

  const paragraphs = aboutData.bio
    ? aboutData.bio.split("\n\n").filter(Boolean)
    : [
        "With a strong technical foundation in AI and Big Data Analytics, I specialize in building intelligent models, robust system architectures, and actionable business insights.",
        "I love collaborating with teams that want to innovate and push the boundaries of data science.",
        "Let's create something amazing together!",
      ]

  return (
    <section id="about" className="py-40 px-6 relative overflow-hidden bg-black min-h-[120vh] flex flex-col justify-center items-center" ref={containerRef}>
      {/* Floating 3D Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] md:left-[10%] w-24 md:w-48 aspect-square opacity-90 mix-blend-screen pointer-events-none z-10">
        <Image src="/3d_splat.png" alt="Splat" fill className="object-contain" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[15%] right-[5%] md:right-[10%] w-20 md:w-40 aspect-square opacity-90 mix-blend-screen pointer-events-none z-10">
        <Image src="/3d_cubes.png" alt="Cubes" fill className="object-contain" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-[20%] left-[10%] md:left-[15%] w-24 md:w-44 aspect-square opacity-90 mix-blend-screen pointer-events-none z-10">
        <Image src="/3d_heart.png" alt="Heart" fill className="object-contain" />
      </motion.div>
      <motion.div style={{ y: y4 }} className="absolute bottom-[25%] right-[10%] md:right-[15%] w-20 md:w-40 aspect-square opacity-90 mix-blend-screen pointer-events-none z-10">
        <Image src="/3d_flower.png" alt="Flower" fill className="object-contain" />
      </motion.div>

      {/* Giant Outline Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[22vw] md:text-[18vw] font-black tracking-tighter text-transparent select-none whitespace-nowrap leading-none drop-shadow-2xl"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}>
          ABOUT ME
        </h2>
      </div>

      {/* Centered Content */}
      <div className="relative z-20 max-w-3xl mx-auto text-center px-4 flex flex-col items-center mt-8">
        {paragraphs.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: i * 0.2 }}
            className="text-white/90 text-base md:text-xl font-medium leading-relaxed mb-6 drop-shadow-lg"
          >
            {para}
          </motion.p>
        ))}
        
        <motion.a href="#contact" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
          className="relative inline-flex items-center justify-center px-10 py-4 rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300 mt-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-[1.5px] bg-black/90 rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-pink-500/40 to-orange-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 text-white font-bold tracking-widest text-xs uppercase">Contact Me</span>
        </motion.a>
      </div>
    </section>
  )
}
