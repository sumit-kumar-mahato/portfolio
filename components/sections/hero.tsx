"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import dynamic from "next/dynamic"

const HeroSphere = dynamic(() => import("@/components/3d/hero-sphere"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
})

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const sphereY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textLeftX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"])
  const textRightX = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
      id="home"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        {/* 3D Sphere */}
        <motion.div style={{ y: sphereY }} className="absolute inset-0">
          <HeroSphere />
        </motion.div>

        {/* Split Text - DEVELOPER */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Left side text */}
          <motion.div
            style={{ x: textLeftX }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[10%] md:translate-x-0"
          >
            <h1 className="text-[12vw] md:text-[9vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50 leading-none select-none">
              DATA
            </h1>
          </motion.div>

          {/* Right side text */}
          <motion.div
            style={{ x: textRightX }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[10%] md:translate-x-0"
          >
            <h1 className="text-[12vw] md:text-[9vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-l from-foreground to-foreground/50 leading-none select-none">
              SCIENTIST
            </h1>
          </motion.div>
        </motion.div>

        {/* Center Content */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-[30vh]"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm md:text-base tracking-[0.3em] text-cyan-400 uppercase mb-4"
            >
              AI & Big Data Analytics
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-3xl md:text-5xl font-light text-foreground mb-2"
            >
              Sumit Kumar Mahato
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-muted-foreground text-sm md:text-base max-w-md mx-auto"
            >
              Leveraging data to drive organizational success and create positive impact
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-1 bg-cyan-400 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 text-xs font-mono text-muted-foreground">
          <span className="text-cyan-400">//</span> Portfolio 2025
        </div>
        <div className="absolute top-8 right-8 text-xs font-mono text-muted-foreground">
          Ahmedabad, India
        </div>
        <div className="absolute bottom-8 left-8 text-xs font-mono text-muted-foreground hidden md:block">
          <span className="text-cyan-400">01</span> / 04
        </div>
        <div className="absolute bottom-8 right-8 text-xs font-mono text-muted-foreground hidden md:block">
          PGDM Big Data Analytics
        </div>
      </div>
    </section>
  )
}
