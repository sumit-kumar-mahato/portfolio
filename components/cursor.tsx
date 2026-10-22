"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"

/**
 * Dot + trailing ring. The ring swells over anything interactive, and any
 * element with data-cursor="Label" turns it into a filled label bubble.
 * Fine pointers only; touch devices keep their native behaviour.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hidden, setHidden] = useState(true)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    setEnabled(true)
    document.documentElement.classList.add("has-cursor")

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const t = e.target as HTMLElement
      const labelled = t.closest?.("[data-cursor]") as HTMLElement | null
      setLabel(labelled?.dataset.cursor || null)
      setHovering(!!t.closest?.("a, button, [role='button'], input, textarea, label, select"))
    }
    const leave = () => setHidden(true)
    const press = () => setDown(true)
    const release = () => setDown(false)

    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerleave", leave)
    window.addEventListener("pointerdown", press)
    window.addEventListener("pointerup", release)
    return () => {
      document.documentElement.classList.remove("has-cursor")
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerleave", leave)
      window.removeEventListener("pointerdown", press)
      window.removeEventListener("pointerup", release)
    }
  }, [x, y])

  if (!enabled) return null

  const size = label ? 96 : hovering ? 56 : 36

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[110]">
      {/* Ring / label bubble */}
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute left-0 top-0"
        animate={{ opacity: hidden ? 0 : 1 }}
      >
        <motion.div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
            label ? "bg-signal" : "border border-fg/50 mix-blend-difference"
          }`}
          animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-mono text-[11px] font-semibold uppercase tracking-widest text-bg"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Dot */}
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0"
        animate={{ opacity: hidden || label ? 0 : 1 }}
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
      </motion.div>
    </div>
  )
}
