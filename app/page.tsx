import fs from "fs"
import path from "path"

import { PortfolioProvider } from "@/components/portfolio-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import Preloader from "@/components/preloader"
import Cursor from "@/components/cursor"
import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import VelocityMarquee from "@/components/sections/velocity-marquee"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Experience from "@/components/sections/experience"
import Projects from "@/components/sections/projects"
import Certifications from "@/components/sections/certifications"
import Contact from "@/components/sections/contact"
import Footer from "@/components/footer"
import { mergePortfolio, type PortfolioData } from "@/lib/portfolio-data"

// The admin panel writes public/data/portfolio.json at runtime, so this page
// must be read per-request rather than baked at build time.
export const dynamic = "force-dynamic"

function readPortfolio(): PortfolioData {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "portfolio.json")
    return mergePortfolio(JSON.parse(fs.readFileSync(filePath, "utf-8")))
  } catch {
    return mergePortfolio(null)
  }
}

export default function Home() {
  const data = readPortfolio()

  return (
    <PortfolioProvider data={data}>
      <SmoothScroll>
        {/* Without JS the preloader would never lift */}
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <Preloader />
        <Cursor />
        <div aria-hidden className="grain" />
        <Navbar />

        <main className="relative z-10 bg-bg">
          <Hero />
          <VelocityMarquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </PortfolioProvider>
  )
}
