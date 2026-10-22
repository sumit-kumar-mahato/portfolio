"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { usePortfolio } from "@/components/portfolio-provider"
import { useSite } from "@/components/smooth-scroll"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
]

const EASE = [0.76, 0, 0.24, 1] as const

export function useLocalTime(timeZone = "Asia/Kolkata") {
  const [time, setTime] = useState("--:--")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [timeZone])
  return time
}

export default function Navbar() {
  const { contact } = usePortfolio()
  const { lenis, introDone } = useSite()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const time = useLocalTime()

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > 160 && y > prev)
  })

  useEffect(() => {
    if (!lenis) return
    if (open) lenis.stop()
    else lenis.start()
  }, [open, lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-signal"
      />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[70] px-5 pt-5 sm:px-8 sm:pt-6"
      >
        <nav className="flex items-center justify-between gap-6">
          <a
            href="#top"
            className="group flex items-center gap-2.5 rounded-full border border-line bg-bg/75 py-1 pl-1 pr-1 text-fg backdrop-blur-xl sm:pr-4"
            aria-label="Back to top"
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-fg font-display text-sm font-bold text-bg transition-transform duration-500 group-hover:rotate-[360deg]">
              SK
            </span>
            <span className="roll hidden font-display text-sm font-medium sm:inline-flex">
              <span data-text="Sumit Kumar Mahato">Sumit Kumar Mahato</span>
            </span>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-line bg-bg/75 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3 backdrop-blur-xl lg:flex">
            <span>{contact.location}</span>
            <span className="text-fg-4">/</span>
            <span className="tabular-nums text-fg-2">{time} IST</span>
          </div>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 rounded-full border border-line bg-bg/75 p-1 backdrop-blur-xl md:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group block rounded-full px-4 py-2 text-[13px] font-medium text-fg-2 transition-colors hover:bg-fg/[0.06] hover:text-fg"
                  >
                    <span className="roll">
                      <span data-text={l.label}>{l.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${contact.email}`}
              className="group hidden items-center gap-2 rounded-full bg-signal px-4 py-2.5 text-[13px] font-semibold text-bg transition-transform hover:scale-[1.03] lg:flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="ping-soft absolute inset-0 rounded-full bg-bg/60" />
                <span className="relative h-2 w-2 rounded-full bg-bg" />
              </span>
              <span className="roll">
                <span data-text="Hire me">Hire me</span>
              </span>
            </a>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[75] flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg/60 backdrop-blur-xl md:hidden"
            >
              <span className="relative h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-5 bg-fg"
                  animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-5 bg-fg"
                  animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-bg-2 px-6 pb-10 pt-28"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 46px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 46px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 46px)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
            <ul className="relative space-y-1">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.06 }}
                    className="flex items-baseline gap-4 font-display text-6xl font-semibold tracking-tight text-fg"
                  >
                    <span className="font-mono text-xs text-signal">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="relative space-y-3 font-mono text-xs uppercase tracking-[0.18em] text-fg-3"
            >
              <a href={`mailto:${contact.email}`} className="flex items-center gap-1 normal-case tracking-normal text-fg">
                {contact.email} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <p>
                {contact.location} — {time} IST
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
