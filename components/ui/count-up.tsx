"use client"

import { animate, useInView } from "framer-motion"
import { useSafeReducedMotion } from "@/lib/use-mounted"
import { useEffect, useRef, useState } from "react"

const LEADING_NUMBER = /^(\D*)(\d+(?:\.\d+)?)([\s\S]*)$/

/**
 * Counts the first number in a string up from zero when it scrolls into view,
 * leaving everything around it untouched — so "3.83/4.33" animates the 3.83 and
 * keeps the "/4.33", and "2GW TOPCON" animates the 2.
 *
 * Strings with no number render as-is.
 */
export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useSafeReducedMotion()

  const match = value.match(LEADING_NUMBER)
  const prefix = match?.[1] ?? ""
  const target = match ? Number.parseFloat(match[2]) : null
  const suffix = match?.[3] ?? ""
  // Match the source string's precision so 3.83 doesn't tick through 3.8300001.
  const decimals = match ? (match[2].split(".")[1]?.length ?? 0) : 0

  const [display, setDisplay] = useState(() =>
    target === null || reduced ? value : `${prefix}${(0).toFixed(decimals)}${suffix}`,
  )

  useEffect(() => {
    if (target === null || reduced) {
      setDisplay(value)
      return
    }
    if (!inView) return

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, target, duration, prefix, suffix, decimals, reduced, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
