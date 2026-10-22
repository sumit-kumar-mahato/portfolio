"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

/**
 * False during SSR and on the client's first render, true afterwards.
 *
 * Use it to gate anything whose rendered output would otherwise differ between
 * server and hydration — looping `animate` keyframes, matchMedia results, or
 * cursor-driven UI. Server HTML and the first client render then agree, and the
 * browser-only behaviour kicks in one tick later.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

/**
 * Hydration-safe `prefers-reduced-motion`.
 *
 * Framer Motion's own `useReducedMotion` can already report `true` on the
 * client's first render while the server rendered the full-motion branch — and
 * several of our primitives emit a *different DOM tree* in that branch, not
 * just different styles. Forcing `false` until mounted keeps the two renders
 * identical; the reduced branch takes over immediately after.
 */
export function useSafeReducedMotion() {
  const reduced = useReducedMotion()
  const mounted = useMounted()
  return mounted ? !!reduced : false
}

/** Mount-safe media query. Returns false until mounted, so it never desyncs hydration. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}
