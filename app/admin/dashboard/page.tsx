"use client"

import { useAdmin } from "./layout"
import { motion } from "framer-motion"
import { Sparkles, User, Briefcase, FolderOpen, Award, Wrench, Mail, Brain, TrendingUp, Edit3 } from "lucide-react"
import Link from "next/link"

const sections = [
  { label: "Hero Section", desc: "Name, tagline, description, resume link", href: "/admin/dashboard/hero", icon: Sparkles, color: "from-cyan-500/20 to-cyan-600/20", border: "border-cyan-500/30", iconColor: "text-cyan-400" },
  { label: "About Me", desc: "Bio, personal description", href: "/admin/dashboard/about", icon: User, color: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30", iconColor: "text-purple-400" },
  { label: "Skills", desc: "Skill bars with proficiency levels", href: "/admin/dashboard/skills", icon: Brain, color: "from-pink-500/20 to-pink-600/20", border: "border-pink-500/30", iconColor: "text-pink-400" },
  { label: "Experience", desc: "Work & education timeline", href: "/admin/dashboard/experience", icon: Briefcase, color: "from-amber-500/20 to-amber-600/20", border: "border-amber-500/30", iconColor: "text-amber-400" },
  { label: "Projects", desc: "Portfolio project cards", href: "/admin/dashboard/projects", icon: FolderOpen, color: "from-emerald-500/20 to-emerald-600/20", border: "border-emerald-500/30", iconColor: "text-emerald-400" },
  { label: "Certifications", desc: "Credentials & achievements", href: "/admin/dashboard/certifications", icon: Award, color: "from-rose-500/20 to-rose-600/20", border: "border-rose-500/30", iconColor: "text-rose-400" },
  { label: "Tools & Tech", desc: "Skills marquee carousel", href: "/admin/dashboard/tools", icon: Wrench, color: "from-indigo-500/20 to-indigo-600/20", border: "border-indigo-500/30", iconColor: "text-indigo-400" },
  { label: "Contact Info", desc: "Email, phone, social links", href: "/admin/dashboard/contact", icon: Mail, color: "from-teal-500/20 to-teal-600/20", border: "border-teal-500/30", iconColor: "text-teal-400" },
]

export default function DashboardPage() {
  const { data } = useAdmin()

  const stats = data ? [
    { label: "Projects", value: (data.projects as unknown[])?.length || 0, icon: FolderOpen },
    { label: "Experience", value: (data.experience as unknown[])?.length || 0, icon: Briefcase },
    { label: "Certifications", value: (data.certifications as unknown[])?.length || 0, icon: Award },
    { label: "Skills", value: (data.skills as unknown[])?.length || 0, icon: TrendingUp },
  ] : []

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Welcome back, Sumit! 👋</h2>
            <p className="text-sm text-white/50">Manage your portfolio content from here</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
            >
              <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Section cards */}
      <div>
        <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-4">Edit Sections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sections.map((section, i) => (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={section.href}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-5 rounded-xl bg-gradient-to-br ${section.color} border ${section.border} cursor-pointer group transition-all duration-300 hover:shadow-lg`}
                >
                  <section.icon className={`w-6 h-6 ${section.iconColor} mb-3`} />
                  <h4 className="text-sm font-semibold text-white mb-1">{section.label}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{section.desc}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
