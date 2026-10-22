"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { usePortfolio } from "@/components/portfolio-provider"
import { CountUp } from "@/components/ui/count-up"
import { DrawLine, Reveal } from "@/components/ui/reveal"
import { ScrollWords } from "@/components/ui/split-text"

const EASE = [0.16, 1, 0.3, 1] as const

function AudienceSwitcher() {
  const { hero } = usePortfolio()
  const tabs = [
    { id: "everyone", label: "Everyone", line: hero.description },
    { id: "recruiters", label: "Recruiters", line: hero.recruitersLine },
    { id: "founders", label: "Founders", line: hero.foundersLine },
    { id: "engineers", label: "Engineers", line: hero.engineersLine },
  ].filter((t): t is { id: string; label: string; line: string } => !!t.line)
  const [active, setActive] = useState(tabs[0]?.id)
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <div className="flex h-full flex-col justify-between gap-10 rounded-[2rem] border border-line bg-card p-6 sm:p-9">
      <div className="space-y-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-3">The short version, for —</p>
        <div className="flex flex-wrap gap-1 rounded-full border border-line bg-bg p-1" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`relative flex-1 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                active === t.id ? "text-bg" : "text-fg-3 hover:text-fg"
              }`}
            >
              {active === t.id && (
                <motion.span
                  layoutId="audience-pill"
                  className="absolute inset-0 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[9rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={current?.id}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-display text-2xl font-medium leading-[1.25] tracking-[-0.02em] text-fg sm:text-[1.9rem]"
          >
            {current?.line}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

/** A profile rendered as a JSON document, each line typing in on scroll. */
function DataCard() {
  const { hero, contact, skills, experience } = usePortfolio()
  const edu = experience.find((e) => e.type === "education")
  const stack = (skills.length ? skills : []).slice(0, 4).map((s) => s.name)

  const rows: { k: string; v: string | string[]; signal?: boolean }[] = [
    { k: "name", v: hero.name },
    { k: "based_in", v: contact.location },
    { k: "focus", v: hero.tagline },
    ...(stack.length ? [{ k: "stack", v: stack }] : []),
    ...(edu ? [{ k: "studying", v: edu.title }] : []),
    { k: "status", v: "open_to_work", signal: true },
  ]

  return (
    <div className="sheen flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-[#0d0d0f]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal" />
        </div>
        <span className="font-mono text-[11px] text-fg-4">profile.json</span>
      </div>
      <motion.pre
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.09 }}
        className="flex-1 overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.9] sm:p-7 sm:text-[13px]"
      >
        <Line>{"{"}</Line>
        {rows.map((r, i) => (
          <Line key={r.k}>
            {"  "}
            <span className="text-tint-sky">&quot;{r.k}&quot;</span>
            <span className="text-fg-4">: </span>
            {Array.isArray(r.v) ? (
              <span className="text-fg-2">
                [
                {r.v.map((s, j) => (
                  <span key={s}>
                    <span className="text-tint-amber">&quot;{s}&quot;</span>
                    {j < r.v.length - 1 && ", "}
                  </span>
                ))}
                ]
              </span>
            ) : (
              <span className={r.signal ? "rounded bg-signal/15 px-1 text-signal" : "text-tint-amber"}>
                &quot;{r.v}&quot;
              </span>
            )}
            {i < rows.length - 1 && <span className="text-fg-4">,</span>}
          </Line>
        ))}
        <Line>
          {"}"}
          <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-signal" />
        </Line>
      </motion.pre>
    </div>
  )
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="block whitespace-pre"
      variants={{
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </motion.span>
  )
}

export default function About() {
  const { about, projects } = usePortfolio()
  const [lead, ...restParas] = about.bio.split("\n\n").filter(Boolean)

  const stats = [
    { value: `${projects.length || 10}+`, label: "Data & AI projects shipped" },
    { value: "3.85", label: "PGDM CGPA — out of 4.33" },
    { value: "2GW", label: "Solar plant build, Adani Solar" },
    { value: "2+", label: "Years of industry experience" },
  ]

  return (
    <section id="about" className="relative px-5 py-28 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1600px] space-y-20 sm:space-y-28">
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-fg-3">
            <span className="flex items-center gap-3">
              <span className="text-signal">(01)</span> About
            </span>
            <span className="hidden sm:block">Who I am</span>
          </div>
          <DrawLine />
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <div className="flex items-center gap-4 lg:sticky lg:top-32 lg:flex-col lg:items-start">
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-signal to-tint-mint font-display text-3xl font-bold text-bg sm:h-28 sm:w-28">
                SK
                <span className="spin-slow absolute inset-0 rounded-full border border-dashed border-bg/30" />
              </div>
              <p className="max-w-[14rem] text-sm leading-relaxed text-fg-3">
                Civil engineer turned AI engineer. Ex-Adani Solar and Healthark Insights, now building agentic AI systems.
              </p>
            </div>
          </Reveal>

          <div className="space-y-12 lg:col-span-9">
            <ScrollWords
              text={lead ?? ""}
              className="font-display text-[clamp(1.9rem,4.4vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-fg"
            />
            {restParas.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {restParas.map((p, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <p className="max-w-md text-base leading-relaxed text-fg-3 sm:text-lg">{p}</p>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7">
            <AudienceSwitcher />
          </Reveal>
          <Reveal delay={0.12} className="min-w-0 lg:col-span-5">
            <DataCard />
          </Reveal>
        </div>

        <div className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`space-y-3 border-line py-8 pr-4 ${i % 2 === 1 ? "pl-5 sm:pl-8 border-l" : ""} ${
                i > 0 ? "lg:border-l lg:pl-8" : ""
              } ${i > 1 ? "border-t lg:border-t-0" : ""}`}
            >
              <p className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-fg">
                <CountUp value={s.value} />
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
