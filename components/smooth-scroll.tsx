"use client"

import Lenis from "lenis"
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

type SiteContext = {
  lenis: Lenis | null
  /** True once the preloader has lifted — entrance animations wait on this. */
  introDone: boolean
  setIntroDone: (v: boolean) => void
  scrollTo: (target: string | number | HTMLElement) => void
}

const Ctx = createContext<SiteContext>({
  lenis: null,
  introDone: true,
  setIntroDone: () => {},
  scrollTo: () => {},
})

export function useSite() {
  return useContext(Ctx)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    setLenis(instance)

    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const scrollTo = useCallback(
    (target: string | number | HTMLElement) => {
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.6 })
        return
      }
      if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" })
      else {
        const el = typeof target === "string" ? document.querySelector(target) : target
        el?.scrollIntoView({ behavior: "smooth" })
      }
    },
    [lenis],
  )

  // Route every in-page anchor through the smooth scroller.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null
      if (!a) return
      const hash = a.getAttribute("href")!
      if (hash === "#") return
      const el = document.querySelector(hash)
      if (!el) return
      e.preventDefault()
      scrollTo(hash === "#top" ? 0 : (el as HTMLElement))
      history.replaceState(null, "", hash)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [scrollTo])

  const value = useMemo(
    () => ({ lenis, introDone, setIntroDone, scrollTo }),
    [lenis, introDone, scrollTo],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
