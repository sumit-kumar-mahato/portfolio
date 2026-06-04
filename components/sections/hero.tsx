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

  // Advanced Mouse Tracking for the Avatar
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 range based on window size
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Smooth out the mouse values
  const springX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 })
  const springY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 })

  // Transform mouse values to subtle rotations and translations
  const avatarRotateX = useTransform(springY, [-1, 1], [15, -15]) // Tilt up/down
  const avatarRotateY = useTransform(springX, [-1, 1], [-15, 15]) // Tilt left/right
  const avatarX = useTransform(springX, [-1, 1], [-20, 20])
  const avatarY = useTransform(springY, [-1, 1], [-20, 20])

  // Scroll animations for background text
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh]"
      id="home"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505] flex flex-col justify-center perspective-[1000px]">
        
        {/* Top Navbar (Visual match to video) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-8 left-0 right-0 z-50 flex justify-center gap-12 text-[10px] md:text-xs font-bold tracking-widest text-white/70 uppercase"
        >
          <a href="#about" className="hover:text-white transition-colors cursor-pointer">About</a>
          <a href="#experience" className="hover:text-white transition-colors cursor-pointer">Experience</a>
          <a href="#projects" className="hover:text-white transition-colors cursor-pointer">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors cursor-pointer">Contact</a>
        </motion.div>

        {/* Massive Background Text */}
        <motion.div
          style={{ y: bgTextY, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <h1 className="text-[15vw] font-black tracking-tighter text-white leading-none select-none text-center whitespace-nowrap">
            HI, I'M SUMIT
          </h1>
        </motion.div>

        {/* 2.5D Animated Character Avatar */}
        <motion.div
          style={{ 
            opacity,
            rotateX: avatarRotateX,
            rotateY: avatarRotateY,
            x: avatarX,
            y: avatarY,
          }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="relative w-[50vw] max-w-[500px] aspect-square drop-shadow-2xl mix-blend-lighten">
            <Image
              src="/avatar_head.png"
              alt="3D Avatar"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Side Elements (Left Text, Right Button) */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-between z-30 px-8 md:px-16 pointer-events-none"
        >
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full md:w-1/4 mt-auto mb-20 md:my-auto pointer-events-auto"
          >
            <p className="text-white text-sm md:text-base font-medium leading-relaxed tracking-wide uppercase">
              A DATA SCIENTIST PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS 😎
            </p>
          </motion.div>

          {/* Right Glowing Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-full md:w-1/4 flex md:justify-end mb-20 md:my-auto pointer-events-auto"
          >
            <a 
              href="#contact"
              className="relative inline-flex items-center justify-center px-8 py-4 rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full" />
              {/* Blur Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Inner Dark Pill (Optional, for the outline effect if desired, but video uses full fill) */}
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
