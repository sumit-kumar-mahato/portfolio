/**
 * Abstract artwork for a project card, in place of screenshots. Each category
 * gets a diagram of what the work actually is; the project id seeds the
 * details so two projects in one category still look different. Fully
 * deterministic, so server and client render identically.
 */

type Variant = "scatter" | "vision" | "bars" | "text" | "network" | "stack"

const MAP: Record<string, { variant: Variant; tint: string }> = {
  "Machine Learning": { variant: "scatter", tint: "var(--color-tint-lime)" },
  "Computer Vision": { variant: "vision", tint: "var(--color-tint-sky)" },
  "Data Analytics": { variant: "bars", tint: "var(--color-tint-amber)" },
  "NLP & AI": { variant: "text", tint: "var(--color-tint-violet)" },
  GenAI: { variant: "network", tint: "var(--color-tint-rose)" },
  "Deep Learning": { variant: "network", tint: "var(--color-tint-mint)" },
  "Full Stack": { variant: "stack", tint: "var(--color-tint-gold)" },
}

export function artFor(category: string) {
  return MAP[category] ?? { variant: "scatter" as Variant, tint: "var(--color-tint-lime)" }
}

function rng(seed: number) {
  let s = (seed * 9301 + 49297) % 233280
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const T = "transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
const MUTED = "rgba(238,235,229,0.22)"
const FAINT = "rgba(238,235,229,0.08)"

export function ProjectArt({ category, seed, className }: { category: string; seed: number; className?: string }) {
  const { variant, tint } = artFor(category)

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden>
      {variant === "scatter" && <Scatter seed={seed} tint={tint} />}
      {variant === "vision" && <Vision seed={seed} tint={tint} />}
      {variant === "bars" && <Bars seed={seed} tint={tint} />}
      {variant === "text" && <TextArt seed={seed} tint={tint} />}
      {variant === "network" && <Network seed={seed} tint={tint} />}
      {variant === "stack" && <Stack tint={tint} />}
    </svg>
  )
}

type P = { seed: number; tint: string }

function Scatter({ seed, tint }: P) {
  const r = rng(seed + 7)
  const pts = Array.from({ length: 34 }, (_, i) => {
    const x = 50 + r() * 300
    const trend = 240 - (x - 50) * 0.55
    const y = trend + (r() - 0.5) * 90
    return { x, y, hi: y < trend, i }
  })
  return (
    <g>
      <path d="M40 260 H360 M40 260 V40" stroke={MUTED} />
      {[100, 160, 220].map((y) => (
        <path key={y} d={`M40 ${y} H360`} stroke={FAINT} strokeDasharray="2 6" />
      ))}
      <path
        d="M40 250 C 140 215, 220 150, 360 70"
        stroke={tint}
        strokeWidth="2"
        strokeDasharray="6 6"
        style={{ animation: "dash 2.4s linear infinite" }}
      />
      {pts.map((p) => (
        <circle
          key={p.i}
          cx={p.x}
          cy={p.y}
          r={p.hi ? 4.5 : 3.5}
          fill={p.hi ? tint : "none"}
          stroke={p.hi ? "none" : MUTED}
          strokeWidth="1.5"
          className={`${T} group-hover:scale-125`}
          style={{ transformOrigin: `${p.x}px ${p.y}px`, transitionDelay: `${p.i * 12}ms` }}
        />
      ))}
    </g>
  )
}

function Vision({ seed, tint }: P) {
  const r = rng(seed + 7)
  const cells = Array.from({ length: 12 * 9 }, (_, i) => ({ i, o: r() }))
  return (
    <g>
      {cells.map(({ i, o }) => (
        <rect
          key={i}
          x={56 + (i % 12) * 24}
          y={40 + Math.floor(i / 12) * 24}
          width="20"
          height="20"
          rx="3"
          fill={`rgba(238,235,229,${0.03 + o * 0.08})`}
        />
      ))}
      <g className={`${T} group-hover:-translate-x-3 group-hover:-translate-y-2`}>
        <rect x="92" y="70" width="120" height="110" rx="6" stroke={tint} strokeWidth="2" />
        <rect x="92" y="52" width="74" height="18" rx="3" fill={tint} />
        <text x="99" y="65" fontSize="11" fontFamily="monospace" fill="#0a0a0b">
          obj 0.97
        </text>
      </g>
      <g className={`${T} group-hover:translate-x-3 group-hover:translate-y-2`}>
        <rect x="230" y="130" width="96" height="96" rx="6" stroke={MUTED} strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="232" y="242" fontSize="11" fontFamily="monospace" fill={MUTED}>
          obj 0.81
        </text>
      </g>
      <path d="M200 20 V280 M20 150 H380" stroke={FAINT} />
      <circle cx="152" cy="125" r="4" fill={tint} />
    </g>
  )
}

function Bars({ seed, tint }: P) {
  const r = rng(seed + 7)
  const bars = Array.from({ length: 9 }, (_, i) => 40 + r() * 150 + i * 6)
  const line = bars.map((h, i) => `${i === 0 ? "M" : "L"}${66 + i * 34} ${250 - h - 18}`).join(" ")
  return (
    <g>
      <path d="M40 252 H360" stroke={MUTED} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={54 + i * 34}
          y={250 - h}
          width="24"
          height={h}
          rx="4"
          fill={i === bars.length - 2 ? tint : "rgba(238,235,229,0.12)"}
          className={`${T} group-hover:scale-y-[1.12]`}
          style={{ transformOrigin: `0 250px`, transitionDelay: `${i * 35}ms` }}
        />
      ))}
      <path d={line} stroke={tint} strokeWidth="2" />
      {bars.map((h, i) => (
        <circle key={i} cx={66 + i * 34} cy={250 - h - 18} r="3.5" fill="#0a0a0b" stroke={tint} strokeWidth="2" />
      ))}
    </g>
  )
}

function TextArt({ seed, tint }: P) {
  const r = rng(seed + 7)
  const lines = Array.from({ length: 7 }, (_, i) => {
    let x = 50
    const words: { x: number; w: number; hi: boolean }[] = []
    while (x < 330) {
      const w = 18 + r() * 52
      if (x + w > 350) break
      words.push({ x, w, hi: r() > 0.84 })
      x += w + 8
    }
    return { y: 50 + i * 30, words, i }
  })
  return (
    <g>
      {lines.map((l) => (
        <g key={l.i} className={`${T} group-hover:translate-x-2`} style={{ transitionDelay: `${l.i * 40}ms` }}>
          {l.words.map((w, j) => (
            <rect key={j} x={w.x} y={l.y} width={w.w} height="12" rx="6" fill={w.hi ? tint : "rgba(238,235,229,0.13)"} />
          ))}
        </g>
      ))}
      <rect x="50" y="262" width="2" height="16" fill={tint} className="animate-pulse" />
    </g>
  )
}

function Network({ seed, tint }: P) {
  const r = rng(seed + 7)
  const layers = [3, 5, 5, 2].map((n, li) =>
    Array.from({ length: n }, (_, i) => ({ x: 70 + li * 87, y: 150 + (i - (n - 1) / 2) * 46 })),
  )
  const edges: { a: { x: number; y: number }; b: { x: number; y: number }; hot: boolean; k: string }[] = []
  layers.slice(0, -1).forEach((layer, li) =>
    layer.forEach((a, ai) =>
      layers[li + 1].forEach((b, bi) => edges.push({ a, b, hot: r() > 0.78, k: `${li}-${ai}-${bi}` })),
    ),
  )
  return (
    <g>
      {edges.map((e) => (
        <line
          key={e.k}
          x1={e.a.x}
          y1={e.a.y}
          x2={e.b.x}
          y2={e.b.y}
          stroke={e.hot ? tint : FAINT}
          strokeWidth={e.hot ? 1.6 : 1}
          strokeDasharray={e.hot ? "4 6" : undefined}
          style={e.hot ? { animation: "dash 1.8s linear infinite" } : undefined}
        />
      ))}
      {layers.flat().map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="9"
          fill="#151517"
          stroke={i % 4 === 0 ? tint : MUTED}
          strokeWidth="2"
          className={`${T} group-hover:scale-[1.35]`}
          style={{ transformOrigin: `${n.x}px ${n.y}px`, transitionDelay: `${i * 18}ms` }}
        />
      ))}
    </g>
  )
}

function Stack({ tint }: { tint: string }) {
  const layer = (y: number) => `M200 ${y} L320 ${y + 50} L200 ${y + 100} L80 ${y + 50} Z`
  return (
    <g>
      <path d={layer(150)} fill="rgba(238,235,229,0.05)" stroke={MUTED} className={`${T} group-hover:translate-y-6`} />
      <path d={layer(110)} fill="rgba(238,235,229,0.08)" stroke={MUTED} className={T} />
      <path
        d={layer(70)}
        fill="rgba(10,10,11,0.85)"
        stroke={tint}
        strokeWidth="2"
        className={`${T} group-hover:-translate-y-6`}
      />
      <g className={`${T} group-hover:-translate-y-6`}>
        <circle cx="200" cy="120" r="5" fill={tint} />
        <path d="M168 120 H186 M214 120 H232" stroke={tint} strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  )
}
