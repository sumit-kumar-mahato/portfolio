"use client"

import { createContext, useContext, type ReactNode } from "react"
import { defaultPortfolio, type PortfolioData } from "@/lib/portfolio-data"

/**
 * Every section used to fetch /api/portfolio on mount, which meant nine
 * duplicate requests and a visible pop-in once each resolved. The page is a
 * server component now: it reads the JSON once and seeds this context, so the
 * first paint already has real content.
 */
const PortfolioContext = createContext<PortfolioData>(defaultPortfolio)

export function PortfolioProvider({
  data,
  children,
}: {
  data: PortfolioData
  children: ReactNode
}) {
  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}
