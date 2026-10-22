"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useSafeReducedMotion } from "@/lib/use-mounted"
import { useRef, type MouseEvent, type ReactNode } from "react"

/**
 * Pulls its child a short distance toward the cursor while hovered, then
 * springs back on exit. Applied to primary CTAs so they feel reactive.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  /** Fraction of the cursor's offset from centre that the element follows. */
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useSafeReducedMotion()

  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.5 })

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || reduced) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
