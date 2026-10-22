"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { usePortfolio } from "@/components/portfolio-provider"
import { SectionHeader } from "@/components/ui/section-header"

const EASE = [0.16, 1, 0.3, 1] as const

export default function Certifications() {
  const { certifications } = usePortfolio()
  if (!certifications.length) return null

  return (
    <section id="certifications" className="relative px-5 py-28 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1600px] space-y-14 sm:space-y-20">
        <SectionHeader
          index="05"
          label="Credentials"
          title="Certified"
          accent="& verified."
          aside="Formal coursework that backs up the hands-on work."
        />

        <ul className="border-b border-line">
          {certifications.map((c, i) => {
            const link = c.link && c.link !== "#" ? c.link : null
            const Tag = link ? "a" : "div"
            return (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
              >
                <Tag
                  {...(link ? { href: link, target: "_blank", rel: "noopener noreferrer", "data-cursor": "Verify" } : {})}
                  className="group relative isolate grid grid-cols-12 items-center gap-4 overflow-hidden border-t border-line py-7 sm:py-8"
                >
                  <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-card transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  <span className="col-span-2 pl-0 font-mono text-xs text-fg-4 transition-all duration-500 group-hover:pl-4 sm:col-span-1">
                    0{i + 1}
                  </span>
                  <span className="col-span-10 flex items-center gap-4 sm:col-span-7">
                    <span
                      className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${c.color} font-mono text-[11px] font-bold text-white transition-transform duration-500 group-hover:rotate-12 sm:flex`}
                    >
                      {c.icon}
                    </span>
                    <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                      {c.title}
                    </span>
                  </span>
                  <span className="col-span-10 col-start-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-3 sm:col-span-3 sm:col-start-auto">
                    {c.issuer}
                  </span>
                  <span className="col-span-12 hidden justify-end pr-4 sm:col-span-1 sm:flex">
                    <ArrowUpRight className="h-6 w-6 -translate-x-2 text-fg-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-signal group-hover:opacity-100" />
                  </span>
                </Tag>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
