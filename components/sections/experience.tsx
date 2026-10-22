"use client"

import { useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { Plus } from "lucide-react"

import { usePortfolio } from "@/components/portfolio-provider"
import type { ExperienceItem } from "@/lib/portfolio-data"
import { SectionHeader } from "@/components/ui/section-header"

const EASE = [0.16, 1, 0.3, 1] as const
const FILTERS = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
] as const

function Row({
  item,
  index,
  open,
  onToggle,
}: {
  item: ExperienceItem
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.05 }}
      className="border-t border-bg/15"
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group grid w-full grid-cols-12 items-center gap-4 py-7 text-left sm:py-9"
      >
        <span className="col-span-12 font-mono text-xs uppercase tracking-[0.16em] text-bg/50 sm:col-span-3 lg:col-span-2">
          {item.period}
        </span>
        <span className="col-span-10 sm:col-span-7 lg:col-span-6">
          <span className="block font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-bg transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-4xl">
            {item.title}
          </span>
          <span className="mt-1 block text-sm text-bg/60 lg:hidden">{item.company}</span>
        </span>
        <span className="hidden text-base text-bg/70 lg:col-span-3 lg:block">{item.company}</span>
        <span className="col-span-2 flex justify-end sm:col-span-2 lg:col-span-1">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${
              open ? "rotate-45 border-bg bg-bg text-signal" : "border-bg/20 text-bg group-hover:border-bg"
            }`}
          >
            <Plus className="h-4 w-4" />
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-4 pb-10">
              <div className="col-span-12 flex flex-wrap content-start items-start gap-2 sm:col-span-3 lg:col-span-2">
                <span className="rounded-full bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                  {item.type === "education" ? "Education" : "Work"}
                </span>
                <span className="rounded-full border border-bg/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bg/70">
                  {item.location}
                </span>
              </div>
              <ul className="col-span-12 space-y-3 sm:col-span-9 lg:col-span-7">
                {item.description.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 }}
                    className="flex gap-4 text-base leading-relaxed text-bg/75 sm:text-lg"
                  >
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-bg" />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function Experience() {
  const { experience } = usePortfolio()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all")
  const [openId, setOpenId] = useState<number | null>(experience[0]?.id ?? null)
  const ref = useRef<HTMLElement>(null)

  // The panel's corners round off as it arrives, then flatten as it settles.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] })
  const radius = useTransform(scrollYProgress, [0, 1], [64, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  const items = useMemo(
    () => (filter === "all" ? experience : experience.filter((e) => e.type === filter)),
    [experience, filter],
  )

  if (!experience.length) return null

  return (
    <section ref={ref} id="experience" className="relative px-2 sm:px-3">
      <motion.div
        style={{ borderRadius: radius, scale }}
        className="overflow-hidden bg-fg px-4 py-28 text-bg sm:px-6 sm:py-40"
      >
        <div className="mx-auto max-w-[1600px] space-y-14 sm:space-y-20">
          <SectionHeader
            tone="light"
            index="03"
            label="Experience"
            title="Where I've"
            accent="been."
            aside="Civil engineering on a 2GW construction site, then a deliberate pivot into AI. The two halves inform each other more than you'd expect."
          />

          <div className="flex flex-wrap gap-1 rounded-full border border-bg/15 p-1 sm:w-fit">
            {FILTERS.map((f) => {
              const count = f.id === "all" ? experience.length : experience.filter((e) => e.type === f.id).length
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`relative flex-1 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    filter === f.id ? "text-fg" : "text-bg/60 hover:text-bg"
                  }`}
                >
                  {filter === f.id && (
                    <motion.span
                      layoutId="exp-filter"
                      className="absolute inset-0 rounded-full bg-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className="ml-1 font-mono text-[10px] opacity-60">{count}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <motion.ul layout className="border-b border-bg/15">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <Row
                  key={item.id}
                  item={item}
                  index={i}
                  open={openId === item.id}
                  onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </motion.div>
    </section>
  )
}
