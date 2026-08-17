"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

type ContactData = { github?: string; linkedin?: string; email?: string }

export default function Footer() {
  const [contact, setContact] = useState<ContactData>({})

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then((d) => { if (d.contact) setContact(d.contact) }).catch(() => {})
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const socials = [
    { icon: Github, href: contact.github || "https://github.com/sumitkumarmahato", label: "GitHub" },
    { icon: Linkedin, href: contact.linkedin || "https://linkedin.com/in/sumitkumarmahato", label: "LinkedIn" },
    { icon: Mail, href: `mailto:${contact.email || "sumitmahato.aids25@aidtm.ac.in"}`, label: "Email" },
  ]

  return (
    <footer className="relative py-12 px-6 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#home" className="text-xl font-bold text-foreground">
              <span className="text-cyan-400">S</span>umit<span className="text-cyan-400">.</span>
            </a>
            <p className="text-xs text-muted-foreground font-mono">Designed & Built by Sumit Kumar Mahato</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <motion.a key={social.label} href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                className="p-2 text-muted-foreground hover:text-cyan-400 transition-colors"
                whileHover={{ y: -2 }} aria-label={social.label}>
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-cyan-400 transition-colors group"
            whileHover={{ y: -2 }}>
            <span>Back to top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* Bottom text */}
        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/60 font-mono">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
