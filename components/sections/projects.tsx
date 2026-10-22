"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { usePortfolio } from "@/components/portfolio-provider"
import type { Project } from "@/lib/portfolio-data"
import { ProjectArt, artFor } from "@/components/ui/project-art"
import { SplitWords } from "@/components/ui/split-text"
import { useMediaQuery } from "@/lib/use-mounted"

const EASE = [0.16, 1, 0.3, 1] as const
const hasLink = (url?: string) => !!url && url !== "#"

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const { tint } = artFor(project.category)
  const link = hasLink(project.live) ? project.live : hasLink(project.github) ? project.github : null
  const Tag = link ? "a" : "div"

  return (
    <Tag
      {...(link ? { href: link, target: "_blank", rel: "noopener noreferrer", "data-cursor": "Open" } : {})}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-card transition-colors duration-500 hover:border-line-strong"
    >
      {/* Artwork */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line lg:aspect-auto lg:flex-1">
        <div
          className="absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse 80% 70% at 50% 110%, color-mix(in srgb, ${tint} 22%, transparent), transparent 70%)` }}
        />
        <div className="grid-bg absolute inset-0 opacity-60" />
        <ProjectArt
          category={project.category}
          seed={project.id}
          className="absolute inset-0 m-auto h-[82%] w-[82%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-5 top-5 flex items-center justify-between">
          <span className="flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: tint }} />
            {project.category}
          </span>
          <span className="font-mono text-[11px] tabular-nums text-fg-4">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-[1.9rem]">
            {project.title}
          </h3>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-signal group-hover:text-bg">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-fg-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10.5px] text-fg-2">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Tag>
  )
}

function Intro({ count }: { count: number }) {
  return (
    <div className="flex flex-col justify-between gap-10 lg:h-full lg:py-4">
      <div className="space-y-4">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-3">
          <span className="text-signal">(04)</span> Selected work
        </div>
        <h2 className="font-display text-[clamp(3rem,7.5vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-fg">
          <SplitWords text="Things" />
          <br />
          <SplitWords text="I've built" delay={0.1} />
          <sup className="ml-2 align-super font-mono text-base font-normal tracking-normal text-signal sm:text-xl">
            ({count})
          </sup>
        </h2>
      </div>
      <div className="max-w-sm space-y-6">
        <p className="text-base leading-relaxed text-fg-3">
          Machine learning models, computer vision systems, NLP tools and BI dashboards — each one built
          around a real question.
        </p>
        <p className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-4 lg:flex">
          <span className="h-px w-10 bg-fg-4" /> Keep scrolling
        </p>
      </div>
    </div>
  )
}

export default function Projects() {
  const { projects } = usePortfolio()
  const desktop = useMediaQuery("(min-width: 1024px)")
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (!desktop) return
    const track = trackRef.current
    if (!track) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [desktop, projects.length])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(projects.length - 1, Math.round(v * (projects.length - 1))))
  })

  if (!projects.length) return null

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      style={desktop && distance ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={desktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : ""}>
        <motion.div
          ref={trackRef}
          style={desktop ? { x } : undefined}
          className={
            desktop
              ? "flex h-[74vh] w-max items-stretch gap-6 px-8 will-change-transform"
              : "grid gap-6 px-5 py-28 sm:grid-cols-2 sm:px-8"
          }
        >
          <div className={desktop ? "w-[34vw] shrink-0 pr-10" : "pb-6 sm:col-span-2"}>
            <Intro count={projects.length} />
          </div>

          {projects.map((p, i) =>
            desktop ? (
              <div key={p.id} className="w-[min(32vw,540px)] shrink-0">
                <ProjectCard project={p} index={i} total={projects.length} />
              </div>
            ) : (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <ProjectCard project={p} index={i} total={projects.length} />
              </motion.div>
            ),
          )}
          {desktop && <div className="w-[8vw] shrink-0" />}
        </motion.div>

        {desktop && (
          <div className="mx-8 mt-8 flex items-center gap-6">
            <span className="w-16 font-mono text-xs tabular-nums text-fg-2">
              {String(active + 1).padStart(2, "0")}
              <span className="text-fg-4"> / {String(projects.length).padStart(2, "0")}</span>
            </span>
            <div className="h-px flex-1 bg-line">
              <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-signal" />
            </div>
            <span className="max-w-[16rem] truncate font-mono text-xs uppercase tracking-[0.16em] text-fg-3">
              {projects[active]?.title}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
