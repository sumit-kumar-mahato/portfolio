"use client"

import { useAdmin } from "../layout"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Plus, Trash2 } from "lucide-react"

type Cert = { id: number; title: string; issuer: string; icon: string; color: string; link: string }

const COLORS = [
  { label: "Blue", value: "from-blue-500 to-blue-600" },
  { label: "Cyan → Blue", value: "from-cyan-500 to-blue-500" },
  { label: "Yellow → Orange", value: "from-yellow-500 to-orange-500" },
  { label: "Green → Teal", value: "from-green-500 to-teal-500" },
  { label: "Purple → Pink", value: "from-purple-500 to-pink-500" },
  { label: "Rose → Red", value: "from-rose-500 to-red-500" },
  { label: "Indigo → Purple", value: "from-indigo-500 to-purple-500" },
]

export default function CertificationsEditorPage() {
  const { data, setData } = useAdmin()
  if (!data) return null

  const certs = (data.certifications as Cert[]) || []
  const update = (updated: Cert[]) => setData({ ...data, certifications: updated })

  const addCert = () => {
    update([...certs, { id: Date.now(), title: "New Certification", issuer: "Issuer", icon: "NEW", color: "from-blue-500 to-blue-600", link: "#" }])
  }

  const removeCert = (id: number) => update(certs.filter((c) => c.id !== id))
  const updateCert = (id: number, field: keyof Cert, value: string) =>
    update(certs.map((c) => (c.id === id ? { ...c, [field]: value } : c)))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-white">Certifications</h2>
        </div>
        <motion.button onClick={addCert} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 text-sm font-medium hover:bg-rose-500/30 transition-all">
          <Plus className="w-4 h-4" /> Add Certification
        </motion.button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {certs.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }} transition={{ delay: i * 0.03 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-xs">{cert.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{cert.title}</p>
                  <p className="text-xs text-white/40">{cert.issuer}</p>
                </div>
                <button onClick={() => removeCert(cert.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LI label="Certification Title" value={cert.title} onChange={(v) => updateCert(cert.id, "title", v)} />
                <LI label="Issuer / Organization" value={cert.issuer} onChange={(v) => updateCert(cert.id, "issuer", v)} />
                <LI label="Icon Text (2-3 chars)" value={cert.icon} onChange={(v) => updateCert(cert.id, "icon", v)} placeholder="IBM, PY, AD..." />
                <LI label="Certificate Link URL" value={cert.link} onChange={(v) => updateCert(cert.id, "link", v)} placeholder="https://... or #" />
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Badge Color</label>
                  <select value={cert.color} onChange={(e) => updateCert(cert.id, "color", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-400/60 transition-all">
                    {COLORS.map((c) => <option key={c.value} value={c.value} className="bg-gray-900">{c.label}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function LI({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-400/60 transition-all" />
    </div>
  )
}
