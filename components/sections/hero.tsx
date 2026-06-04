"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Advanced Mouse Tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const springX = useSpring(mousePosition.x, { stiffness: 40, damping: 15 })
  const springY = useSpring(mousePosition.y, { stiffness: 40, damping: 15 })

  // Aggressive 3D Rotations to simulate looking around
  const avatarRotateX = useTransform(springY, [-1, 1], [25, -25]) 
  const avatarRotateY = useTransform(springX, [-1, 1], [-35, 35])
  const avatarX = useTransform(springX, [-1, 1], [-40, 40])
  const avatarY = useTransform(springY, [-1, 1], [-40, 40])

  // Massive scroll movement
  const avatarScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"])
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
      id="home"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505] flex flex-col justify-center perspective-[1200px]">

        {/* Massive Background Text */}
        <motion.div
          style={{ y: bgTextY, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <h1 className="text-[18vw] font-black tracking-tighter text-white leading-none select-none text-center whitespace-nowrap">
            HI, I'M SUMIT
          </h1>
        </motion.div>

        {/* 2.5D Animated Character Avatar Container */}
        <motion.div
          style={{ 
            opacity,
            y: avatarScrollY,
          }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <motion.div
            style={{ 
              rotateX: avatarRotateX,
              rotateY: avatarRotateY,
              x: avatarX,
              y: avatarY,
            }}
            // Breathing animation to simulate life
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[95vw] max-w-[800px] md:max-w-[1000px] aspect-square flex items-center justify-center"
          >
            {/* Glowing Depth Aura */}
            <div className="absolute inset-20 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
            
            {/* The Avatar Image with Seamless Masking */}
            <Image
              src="/avatar_head.png"
              alt="3D Avatar"
              fill
              className="object-contain pointer-events-auto mix-blend-screen"
              style={{
                // Advanced CSS Mask to completely eliminate the dark grey square edges!
                WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 68%)",
                maskImage: "radial-gradient(circle at center, black 45%, transparent 68%)"
              }}
              priority
            />
          </motion.div>
        </motion.div>

        {/* Side Elements (Left Text, Right Button) */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex flex-col md:flex-row items-end md:items-center justify-between z-30 px-8 md:px-16 pointer-events-none pb-20 md:pb-0"
        >
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full md:w-1/4 pointer-events-auto mb-10 md:mb-0"
          >
            <p className="text-white text-sm md:text-base font-medium leading-relaxed tracking-wide uppercase drop-shadow-md">
              A DATA SCIENTIST PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS 😎
            </p>
          </motion.div>

          {/* Right Glowing Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-full md:w-1/4 flex md:justify-end pointer-events-auto"
          >
            <a 
              href="#contact"
              className="relative inline-flex items-center justify-center px-8 py-4 rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[2px] bg-black/40 rounded-full backdrop-blur-sm" />
              
              <span className="relative z-10 text-white font-bold tracking-widest text-sm uppercase">
                Contact Me
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
