"use client"

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Masked line-by-line reveal: every word sits in an overflow-hidden slot and
 * rises into place. `trigger` lets a parent (e.g. the hero waiting on the
 * preloader) decide when to play; otherwise it plays on scroll into view.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.04,
  duration = 0.9,
  trigger,
  as: Tag = "span",
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  duration?: number
  /** When provided, animation is driven by this flag instead of viewport entry. */
  trigger?: boolean
  as?: "span" | "p" | "div"
}) {
  const words = text.split(" ")
  const animateProps =
    trigger === undefined
      ? { whileInView: "show", viewport: { once: true, amount: 0.4 } }
      : { animate: trigger ? "show" : "hidden" }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span initial="hidden" {...animateProps} aria-hidden className="inline">
        {words.map((word, i) => (
          <span key={i} className="-mx-[0.06em] -mb-[0.14em] inline-flex overflow-hidden px-[0.06em] pb-[0.14em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName ?? ""}`}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration, ease: EASE, delay: delay + i * stagger },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/** Same idea, per character — for the hero name. */
export function SplitChars({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  trigger = true,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  trigger?: boolean
}) {
  return (
    <span className={className} aria-label={text}>
      <motion.span
        aria-hidden
        initial="hidden"
        animate={trigger ? "show" : "hidden"}
        className="inline-flex overflow-hidden pb-[0.06em]"
      >
        {Array.from(text).map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </span>
  )
}

/**
 * Paragraph whose words light up one after another as it scrolls through the
 * viewport — the reading position becomes the animation.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] })
  const words = text.split(" ")

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  )
}
