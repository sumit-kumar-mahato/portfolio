"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion"

import { useSite } from "@/components/smooth-scroll"

const EASE = [0.76, 0, 0.24, 1] as const
const WORDS = ["Data", "Models", "Insight", "Decisions"]

/**
 * Counter to 100, cycling words, then the curtain lifts with a curved
 * trailing edge. Shown once per browser session; repeat visits skip it.
 */
export default function Preloader() {
  const { lenis, setIntroDone } = useSite()
  const [visible, setVisible] = useState(true)
  const [word, setWord] = useState(0)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"))
  const bar = useTransform(count, (v) => v / 100)

  useEffect(() => {
    let skip = false
    try {
      skip =
        sessionStorage.getItem("intro-seen") === "1" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    } catch {}

    if (skip) {
      setVisible(false)
      setIntroDone(true)
      return
    }

    document.documentElement.style.overflow = "hidden"
    const controls = animate(count, 100, { duration: 2.1, ease: [0.65, 0, 0.35, 1] })
    const wordTimer = setInterval(() => setWord((w) => Math.min(w + 1, WORDS.length - 1)), 520)
    const done = setTimeout(() => {
      setVisible(false)
      try {
        sessionStorage.setItem("intro-seen", "1")
      } catch {}
    }, 2400)
    // Start the hero entrance while the curtain is still mid-lift.
    const intro = setTimeout(() => setIntroDone(true), 2750)

    return () => {
      controls.stop()
      clearInterval(wordTimer)
      clearTimeout(done)
      clearTimeout(intro)
      document.documentElement.style.overflow = ""
    }
  }, [count, setIntroDone])

  useEffect(() => {
    if (!lenis) return
    if (visible) lenis.stop()
    else {
      lenis.start()
      document.documentElement.style.overflow = ""
    }
  }, [lenis, visible])

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = ""
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-bg-2 px-6 py-6 sm:px-10 sm:py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {/* Curved trailing edge — flattens as the curtain lifts */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 top-full h-[18vh] w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="var(--color-bg-2)"
              initial={{ d: "M0 0 L100 0 L100 0 Q50 100 0 0 Z" }}
              exit={{ d: "M0 0 L100 0 L100 0 Q50 0 0 0 Z" }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </svg>

          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-fg-3">
            <span>Sumit Kumar Mahato</span>
            <span>Portfolio ©{new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-2 w-2 rounded-full bg-signal" />
            <div className="relative h-[1.2em] overflow-hidden font-display text-3xl font-medium text-fg sm:text-5xl">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={word}
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {WORDS[word]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-3">
                Loading experience
              </span>
              <motion.span className="font-display text-[22vw] font-bold leading-[0.8] tracking-tighter text-fg sm:text-[14vw]">
                {rounded}
              </motion.span>
            </div>
            <div className="h-px w-full bg-line">
              <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-signal" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
