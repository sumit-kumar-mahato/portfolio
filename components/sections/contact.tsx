"use client"

import { useRef, useState, type FormEvent } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Check, Copy, Github, Linkedin, MapPin, Phone } from "lucide-react"

import { usePortfolio } from "@/components/portfolio-provider"
import { Magnetic } from "@/components/ui/magnetic"
import { Reveal } from "@/components/ui/reveal"
import { SplitWords } from "@/components/ui/split-text"

function Field({
  id,
  label,
  type = "text",
  textarea,
  value,
  onChange,
}: {
  id: string
  label: string
  type?: string
  textarea?: boolean
  value: string
  onChange: (v: string) => void
}) {
  const common =
    "peer w-full resize-none border-0 border-b border-line-strong bg-transparent pb-3 pt-7 text-lg text-fg outline-none transition-colors placeholder:text-transparent focus:border-signal"
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} rows={3} required placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className={common} />
      ) : (
        <input id={id} type={type} required placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className={common} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:font-sans peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:font-mono peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-signal"
      >
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const { contact } = usePortfolio()
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const circleScale = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  const circleRotate = useTransform(scrollYProgress, [0, 1], [-60, 0])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Portfolio enquiry from ${form.name}`,
    )}&body=${encodeURIComponent(body)}`
  }

  const socials = [
    { icon: Github, label: "GitHub", href: contact.github },
    { icon: Linkedin, label: "LinkedIn", href: contact.linkedin },
  ].filter((s) => s.href && s.href !== "#")

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-signal/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px] space-y-20">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-3">
          <span className="text-signal">(06)</span> Contact
        </div>

        {/* Headline + magnetic CTA */}
        <div className="relative">
          <h2 className="font-display text-[clamp(3.2rem,11vw,12rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-fg">
            <SplitWords text="Let's build" />
            <br />
            <SplitWords text="something" delay={0.1} />{" "}
            <SplitWords text="great." delay={0.2} className="font-serif font-normal italic text-signal" />
          </h2>

          <motion.div
            style={{ scale: circleScale, rotate: circleRotate }}
            className="mt-12 lg:absolute lg:bottom-4 lg:right-0 lg:mt-0"
          >
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${contact.email}`}
                className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-signal text-bg sm:h-52 sm:w-52"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-fg transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative flex flex-col items-center gap-1 font-display text-lg font-semibold">
                  <ArrowUpRight className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45" />
                  Get in touch
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="grid gap-16 border-t border-line pt-14 lg:grid-cols-12">
          {/* Direct lines */}
          <Reveal className="space-y-10 lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-fg-3">{contact.tagline}</p>

            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-4">Email</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all font-display text-xl font-medium text-fg transition-colors hover:text-signal sm:text-2xl"
                >
                  {contact.email}
                </a>
                <button
                  onClick={copy}
                  aria-label="Copy email address"
                  className="relative flex h-9 items-center gap-2 overflow-hidden rounded-full border border-line px-3 font-mono text-[11px] text-fg-2 transition-colors hover:border-fg/40"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "ok" : "copy"}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-signal" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-4">Phone</p>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-fg-2 hover:text-fg">
                  <Phone className="h-4 w-4 text-signal" /> {contact.phone}
                </a>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-4">Based in</p>
                <p className="flex items-center gap-2 text-fg-2">
                  <MapPin className="h-4 w-4 text-signal" /> {contact.location}
                </p>
              </div>
            </div>

            {socials.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <Magnetic key={s.label} strength={0.25}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-full border border-line px-5 py-3 text-sm font-medium text-fg-2 transition-colors hover:border-signal hover:text-fg"
                    >
                      <s.icon className="h-4 w-4" />
                      <span className="roll">
                        <span data-text={s.label}>{s.label}</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            )}
          </Reveal>

          {/* Form */}
          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={submit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <Field id="name" label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field id="email" type="email" label="Email address" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              </div>
              <Field id="message" textarea label="Tell me about your project" value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
              <button
                type="submit"
                className="group flex w-full items-center justify-between rounded-full bg-fg py-2 pl-7 pr-2 text-base font-semibold text-bg transition-colors hover:bg-signal sm:w-auto sm:gap-10"
              >
                <span className="roll">
                  <span data-text="Send message">Send message</span>
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </button>
              <p className="font-mono text-[11px] text-fg-4">Opens your email client with the message pre-filled.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
