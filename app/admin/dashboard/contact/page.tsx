"use client"

import { useAdmin } from "../layout"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Link } from "lucide-react"

export default function ContactEditorPage() {
  const { data, setData } = useAdmin()
  if (!data) return null
  const contact = data.contact as Record<string, string>

  const update = (key: string, value: string) => setData({ ...data, contact: { ...contact, [key]: value } })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-5 h-5 text-teal-400" />
        <h2 className="text-lg font-bold text-white">Contact Information</h2>
      </div>

      <div className="space-y-4">
        <LabelInput icon={<Mail className="w-4 h-4" />} label="Email Address" value={contact.email} onChange={(v) => update("email", v)} placeholder="your@email.com" type="email" />
        <LabelInput icon={<Phone className="w-4 h-4" />} label="Phone Number" value={contact.phone} onChange={(v) => update("phone", v)} placeholder="+91 XXXXXXXXXX" />
        <LabelInput icon={<MapPin className="w-4 h-4" />} label="Location / City" value={contact.location} onChange={(v) => update("location", v)} placeholder="City, Country" />
        <LabelInput icon={<Github className="w-4 h-4" />} label="GitHub Profile URL" value={contact.github} onChange={(v) => update("github", v)} placeholder="https://github.com/username" />
        <LabelInput icon={<Linkedin className="w-4 h-4" />} label="LinkedIn Profile URL" value={contact.linkedin} onChange={(v) => update("linkedin", v)} placeholder="https://linkedin.com/in/username" />
        
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-1.5">
            <Link className="w-3 h-3" />Contact Section Tagline
          </label>
          <textarea
            value={contact.tagline || ""}
            onChange={(e) => update("tagline", e.target.value)}
            rows={3}
            placeholder="Have a project in mind? I'd love to hear about it..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-teal-400/60 transition-all text-sm resize-none"
          />
        </div>
      </div>
    </motion.div>
  )
}

function LabelInput({ icon, label, value, onChange, placeholder, type = "text" }: {
  icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-1.5 text-teal-400/70">
        {icon}{label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-teal-400/60 transition-all text-sm"
      />
    </div>
  )
}
