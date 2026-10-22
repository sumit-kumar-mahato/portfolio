"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

import { usePortfolio } from "@/components/portfolio-provider"
import type { Skill, Tool } from "@/lib/portfolio-data"
import { SectionHeader } from "@/components/ui/section-header"

const EASE = [0.16, 1, 0.3, 1] as const

function CategoryRow({ index, category, skills }: { index: number; category: string; skills: Skill[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group relative isolate grid gap-6 border-t border-line py-8 sm:py-10 lg:grid-cols-12 lg:gap-10"
    >
      {/* Hover wash */}
      <span className="pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gradient-to-t from-signal/[0.06] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

      <div className="flex items-baseline gap-5 lg:col-span-5">
        <span className="font-mono text-xs text-fg-4">0{index + 1}</span>
        <h3 className="font-display text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-fg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-signal sm:text-5xl">
          {category}
        </h3>
      </div>

      <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-7">
        {skills.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.04 }}
            className="rounded-full border border-line bg-card px-4 py-2 text-[15px] font-medium text-fg-2 transition-colors duration-300 hover:border-signal/60 hover:bg-signal hover:text-bg sm:px-5 sm:py-2.5 sm:text-base"
          >
            {s.name}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

function ToolPill({ tool }: { tool: Tool }) {
  return (
    <span className="group mx-2 flex shrink-0 items-center gap-3 rounded-full border border-line bg-card py-2 pl-2 pr-6 transition-colors duration-500 hover:border-signal/50">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-fg p-2.5 transition-transform duration-500 group-hover:rotate-[360deg]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tool.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
      </span>
      <span className="font-display text-lg font-medium text-fg-2 transition-colors group-hover:text-fg">
        {tool.name}
      </span>
    </span>
  )
}

export default function Skills() {
  const { skills, tools } = usePortfolio()

  const groups = useMemo(() => {
    const map = new Map<string, Skill[]>()
    for (const s of skills) {
      if (!map.has(s.category)) map.set(s.category, [])
      map.get(s.category)!.push(s)
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length)
  }, [skills])

  const half = Math.ceil(tools.length / 2)
  const rowA = tools.slice(0, half)
  const rowB = tools.slice(half).length ? tools.slice(half) : tools

  return (
    <section id="skills" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1600px] space-y-16 sm:space-y-24">
        <SectionHeader
          index="02"
          label="Capabilities"
          title="Tools of"
          accent="the trade."
          aside="From agent graphs and retrieval pipelines to the models and APIs underneath — the stack I build with."
        />

        {groups.length > 0 && (
          <div className="border-b border-line">
            {groups.map(([cat, list], i) => (
              <CategoryRow key={cat} index={i} category={cat} skills={list} />
            ))}
          </div>
        )}
      </div>

      {tools.length > 0 && (
        <div className="marquee mask-fade-x mt-20 space-y-4 sm:mt-28">
          <div className="flex w-max">
            <div className="marquee-track flex">
              {[...rowA, ...rowA, ...rowA, ...rowA].map((t, i) => (
                <ToolPill key={`${t.id}-${i}`} tool={t} />
              ))}
            </div>
          </div>
          <div className="flex w-max">
            <div className="marquee-track-rev flex">
              {[...rowB, ...rowB, ...rowB, ...rowB].map((t, i) => (
                <ToolPill key={`${t.id}-${i}`} tool={t} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
