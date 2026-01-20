"use client"

import React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, ArrowUpRight } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sumitmahato.aids25@aidtm.ac.in",
      href: "mailto:sumitmahato.aids25@aidtm.ac.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 875782221",
      href: "tel:+91875782221",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Ahmedabad, India",
      href: null,
    },
  ]

  const socials = [
    { icon: Github, href: "https://github.com/sumitkumarmahato", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/sumitkumarmahato", label: "LinkedIn" },
  ]

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        className="absolute bottom-0 right-0 text-[20vw] font-black text-foreground pointer-events-none select-none hidden lg:block leading-none"
      >
        04
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm">04</span>
            <div className="h-px w-12 bg-cyan-400" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Get In Touch</span>
            <div className="h-px w-12 bg-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            {"Let's"} Work Together
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Have a project in mind? {"I'd"} love to hear about it. Drop me a message and {"let's"} create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 hover:border-cyan-400/30 transition-colors">
                    <div className="p-3 rounded-lg bg-cyan-400/10 text-cyan-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground hover:text-cyan-400 transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                Follow Me
              </p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl bg-card/30 border border-border/50 hover:border-cyan-400/30 text-muted-foreground hover:text-cyan-400 transition-all"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors resize-none text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-background font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <span>Message Sent!</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
