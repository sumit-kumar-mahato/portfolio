"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { usePortfolio } from "@/components/portfolio-provider"
import { useSite } from "@/components/smooth-scroll"
import { Magnetic } from "@/components/ui/magnetic"
import { SplitChars, SplitWords } from "@/components/ui/split-text"

const DataField = dynamic(() => import("@/components/three/data-field"), { ssr: false })

const EASE = [0.16, 1, 0.3, 1] as const
const ROLES = ["Machine Learning", "Computer Vision", "NLP & GenAI", "Business Intelligence", "Big Data"]

function RoleTicker({ play }: { play: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!play) return
    const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2400)
    return () => clearInterval(id)
  }, [play])

  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom text-signal">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROLES[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="block whitespace-nowrap"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Circular text badge that rotates slowly and speeds up on hover. */
function SpinBadge({ text }: { text: string }) {
  const chars = Array.from(`${text} • ${text} • `)
  return (
    <a
      href="#about"
      data-cursor="Scroll"
      className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full sm:h-36 sm:w-36"
      aria-label="Scroll to about"
    >
      <span className="spin-slow absolute inset-0 group-hover:[animation-duration:5s]">
        {chars.map((c, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 h-full origin-bottom font-mono text-[10px] uppercase text-fg-2"
            style={{ transform: `translateX(-50%) rotate(${(360 / chars.length) * i}deg)`, height: "50%" }}
          >
            {c}
          </span>
        ))}
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-bg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
        <ArrowDownRight className="h-6 w-6" />
      </span>
    </a>
  )
}

export default function Hero() {
  const { hero, contact } = usePortfolio()
  const { introDone } = useSite()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 220])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, -120])

  const [first, ...rest] = hero.name.split(" ")
  const last = rest.pop() ?? ""
  const line1 = [first, ...rest].join(" ")
  const hasResume = hero.resumeUrl && hero.resumeUrl !== "#"

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[680px] overflow-hidden">
      {/* WebGL field */}
      <motion.div
        style={{ y: fieldY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <DataField active={inView} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(212,255,63,0.07),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <motion.div
        style={{ y, scale, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-8 pt-28 sm:px-8 sm:pt-32"
      >
        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="flex items-center justify-between gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3 sm:text-[11px] sm:tracking-[0.2em]"
        >
          <span>
            ( Portfolio <span className="text-fg-2">©{new Date().getFullYear()}</span> )
          </span>
          <span className="flex items-center gap-2.5 rounded-full border border-line bg-bg/50 px-3 py-1.5 text-fg-2 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="ping-soft absolute inset-0 rounded-full bg-signal" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            <span className="sm:hidden">Available</span>
            <span className="hidden sm:inline">Open to opportunities</span>
          </span>
        </motion.div>

        <div className="space-y-10 sm:space-y-14">
          {/* Name */}
          <h1 className="font-display text-[clamp(3.4rem,14.4vw,14rem)] font-bold leading-[0.84] tracking-[-0.055em] text-fg">
            <span className="sr-only">{hero.name}</span>
            <span aria-hidden className="block">
              <SplitChars text={line1} trigger={introDone} delay={0.05} />
            </span>
            <span aria-hidden className="flex items-end justify-between gap-6">
              <span className="flex items-end gap-[0.12em]">
                <SplitChars text={last} trigger={introDone} delay={0.3} />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={introDone ? { scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.9 }}
                  className="mb-[0.14em] inline-block h-[0.16em] w-[0.16em] rounded-full bg-signal"
                />
              </span>
              <motion.span
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={introDone ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
                className="mb-3 hidden lg:block"
              >
                <SpinBadge text={hero.tagline || "AI & Data Science"} />
              </motion.span>
            </span>
          </h1>

          {/* Bottom row */}
          <div className="grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:items-end">
            <div className="space-y-4 md:col-span-6 lg:col-span-5">
              <SplitWords
                as="p"
                text={hero.headline || hero.description}
                trigger={introDone}
                delay={0.55}
                stagger={0.03}
                className="font-display text-2xl font-medium leading-[1.12] tracking-[-0.02em] text-fg sm:text-3xl"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={introDone ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1 }}
                className="font-mono text-xs uppercase tracking-[0.16em] text-fg-3"
              >
                Focused on — <RoleTicker play={introDone} />
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.9 }}
              className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7"
            >
              <Magnetic strength={0.3}>
                <a
                  href="#projects"
                  className="group flex items-center gap-3 rounded-full bg-signal py-2 pl-6 pr-2 text-sm font-semibold text-bg"
                >
                  <span className="roll">
                    <span data-text="Explore my work">Explore my work</span>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg text-signal transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href={hasResume ? hero.resumeUrl : `mailto:${contact.email}`}
                  target={hasResume ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-line-strong bg-bg/40 px-6 py-[1.05rem] text-sm font-medium text-fg backdrop-blur-md transition-colors hover:border-fg/40"
                >
                  <span className="roll">
                    <span data-text={hasResume ? "Download résumé" : "Get in touch"}>
                      {hasResume ? "Download résumé" : "Get in touch"}
                    </span>
                  </span>
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-4">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <span className="scroll-line absolute inset-0 bg-signal" />
        </span>
      </motion.div>
    </section>
  )
}
