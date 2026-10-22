"use client"

import type { ReactNode } from "react"

import { DrawLine, Reveal } from "@/components/ui/reveal"
import { SplitWords } from "@/components/ui/split-text"

/**
 * Index + label row over a hairline, then a large display title. `accent`
 * is set in the italic serif to break the grotesk rhythm.
 */
export function SectionHeader({
  index,
  label,
  title,
  accent,
  aside,
  tone = "dark",
}: {
  index: string
  label: string
  title: string
  accent?: string
  aside?: ReactNode
  tone?: "dark" | "light"
}) {
  const muted = tone === "light" ? "text-bg/55" : "text-fg-3"
  return (
    <div className="space-y-10 sm:space-y-14">
      <div className="space-y-4">
        <div className={`flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] ${muted}`}>
          <span className="flex items-center gap-3">
            <span className={tone === "light" ? "text-bg" : "text-signal"}>({index})</span>
            {label}
          </span>
          <span className="hidden sm:block">Sumit K. Mahato — {new Date().getFullYear()}</span>
        </div>
        <DrawLine className={tone === "light" ? "bg-bg/20!" : ""} />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-display text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
          <SplitWords text={title} />
          {accent && (
            <>
              {" "}
              <SplitWords
                text={accent}
                delay={0.12}
                className="font-serif font-normal italic tracking-[-0.02em]"
              />
            </>
          )}
        </h2>
        {aside && (
          <Reveal delay={0.2} className={`max-w-sm text-base leading-relaxed ${muted}`}>
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  )
}
