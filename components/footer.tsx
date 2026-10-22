"use client"

import { ArrowUp } from "lucide-react"

import { usePortfolio } from "@/components/portfolio-provider"
import { useLocalTime } from "@/components/navbar"
import { useSite } from "@/components/smooth-scroll"

/**
 * Curtain-reveal footer: the wrapper clips a fixed-position footer, so the
 * page above appears to lift away and uncover it.
 */
export default function Footer() {
  const { hero, contact } = usePortfolio()
  const { scrollTo } = useSite()
  const time = useLocalTime()
  const year = new Date().getFullYear()

  const links = [
    { label: "GitHub", href: contact.github },
    { label: "LinkedIn", href: contact.linkedin },
    { label: "Email", href: `mailto:${contact.email}` },
  ].filter((l) => l.href && l.href !== "#")

  return (
    <div className="relative h-[80svh] min-h-[560px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
      <footer className="fixed bottom-0 left-0 flex h-[80svh] min-h-[560px] w-full flex-col justify-between bg-signal px-5 pb-6 pt-16 text-bg sm:px-8">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          <div className="flex flex-col items-start gap-1.5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">Navigate</p>
            {["About", "Skills", "Experience", "Projects", "Contact"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="roll block w-fit font-display text-lg font-medium sm:text-xl">
                <span data-text={s}>{s}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">Elsewhere</p>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="roll block w-fit font-display text-lg font-medium sm:text-xl"
              >
                <span data-text={l.label}>{l.label}</span>
              </a>
            ))}
          </div>
          <div className="col-span-2 flex flex-row items-end justify-between gap-6 sm:col-span-1 sm:flex-col sm:items-end">
            <div className="space-y-1 sm:text-right">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">Local time</p>
              <p className="font-display text-xl font-medium tabular-nums">{time} IST</p>
            </div>
            <button
              onClick={() => scrollTo(0)}
              className="group flex items-center gap-3 rounded-full border border-bg/25 py-2 pl-5 pr-2 text-sm font-semibold transition-colors hover:bg-bg hover:text-signal"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg text-signal transition-transform duration-500 group-hover:-translate-y-0.5">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1600px]">
          <p
            aria-hidden
            className="select-none font-display text-[clamp(4rem,23vw,24rem)] font-bold leading-[0.8] tracking-[-0.065em]"
          >
            {hero.name.split(" ").slice(-1)[0]}
            <span className="ml-[0.04em] align-top font-serif text-[0.32em] font-normal italic tracking-normal">©</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-bg/20 pt-5 font-mono text-[11px] uppercase tracking-[0.16em] opacity-70">
            <span>
              © {year} {hero.name}
            </span>
            <span>Designed & built with care</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
