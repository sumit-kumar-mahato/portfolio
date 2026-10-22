"use client"

import { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"

import { usePortfolio } from "@/components/portfolio-provider"

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/**
 * A row that drifts on its own and is thrown faster — and reversed — by the
 * speed and direction of the page scroll. Skews slightly with velocity.
 */
function Row({ children, baseVelocity }: { children: React.ReactNode; baseVelocity: number }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const skew = useTransform(smooth, [-2500, 2500], [6, -6])
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x, skewX: skew }} className="flex shrink-0 will-change-transform">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function VelocityMarquee() {
  const { skills } = usePortfolio()
  const words = skills.length
    ? skills.slice(0, 6).map((s) => s.name)
    : ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Big Data", "Analytics"]

  const line = (outline: boolean) =>
    words.map((w) => (
      <span key={w} className="flex items-center">
        <span
          className={`px-6 font-display text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-none tracking-[-0.04em] ${
            outline ? "text-outline" : "text-fg"
          }`}
        >
          {w}
        </span>
        <svg viewBox="0 0 24 24" className="h-[clamp(1.5rem,3vw,3rem)] w-[clamp(1.5rem,3vw,3rem)] shrink-0 text-signal" aria-hidden>
          <path
            fill="currentColor"
            d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
          />
        </svg>
      </span>
    ))

  return (
    <section aria-label="Specialities" className="relative space-y-2 overflow-hidden border-y border-line py-10 sm:py-14">
      <Row baseVelocity={-2.2}>{line(false)}</Row>
      <Row baseVelocity={2.2}>{line(true)}</Row>
    </section>
  )
}
