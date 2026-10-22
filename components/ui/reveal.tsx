"use client"

import { motion } from "framer-motion"
import type { CSSProperties, ReactNode } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

/** Fade-and-rise on scroll entry. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  duration = 1,
  amount = 0.2,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  amount?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** A hairline that draws itself left-to-right on scroll entry. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`h-px origin-left bg-line-strong ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  )
}
