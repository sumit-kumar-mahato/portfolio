/**
 * Shape of public/data/portfolio.json plus the fallbacks used when a field is
 * missing. Pure module — no fs, no React — so both the server page and client
 * components can import it.
 */

export type HeroData = {
  name: string
  tagline: string
  headline?: string
  description: string
  recruitersLine?: string
  foundersLine?: string
  engineersLine?: string
  resumeUrl: string
  backgroundImage?: string
}

export type AboutData = { bio: string }

export type Skill = { id: number; name: string; level: number; category: string }

export type ExperienceItem = {
  id: number
  type: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

export type Project = {
  id: number
  title: string
  category: string
  description: string
  tech: string[]
  gradient: string
  border: string
  github: string
  live: string
  colSpan: string
}

export type Cert = {
  id: number
  title: string
  issuer: string
  icon: string
  color: string
  link: string
}

export type Tool = { id: number; name: string; logo: string }

export type ContactData = {
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  tagline: string
}

export type PortfolioData = {
  hero: HeroData
  about: AboutData
  skills: Skill[]
  experience: ExperienceItem[]
  projects: Project[]
  certifications: Cert[]
  tools: Tool[]
  contact: ContactData
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons"

export const defaultPortfolio: PortfolioData = {
  hero: {
    name: "Sumit Kumar Mahato",
    tagline: "AI & Data Science",
    headline: "Building production-grade AI, from agents to insights.",
    description:
      "Data Science & AI professional working across machine learning, deep learning, big data analytics and business intelligence.",
    recruitersLine:
      "PGDM in AI & Data Science (CGPA 3.85/4.33), 2 years as Assistant Manager at Adani Solar, and an AI consulting internship at Healthark Insights.",
    foundersLine:
      "I turn the data you already collect into the two or three decisions that move the business — then build the dashboard that keeps it honest.",
    engineersLine:
      "Python, XGBoost, PyTorch, OpenCV, spaCy, SQL. Validated properly, documented, and nothing shipped that can't be explained.",
    resumeUrl: "#",
  },
  about: {
    bio: "With a strong technical foundation in AI and Big Data Analytics, I specialize in building intelligent machine learning models, robust system architectures, and actionable business insights.\n\nI love collaborating with multidisciplinary teams to solve complex real-world problems and push the boundaries of data science.\n\nLet's create something impactful together!",
  },
  skills: [],
  experience: [],
  projects: [],
  certifications: [],
  tools: [
    { id: 1, name: "Python", logo: `${DEVICON}/python/python-original.svg` },
    { id: 2, name: "Pandas", logo: `${DEVICON}/pandas/pandas-original.svg` },
    { id: 3, name: "NumPy", logo: `${DEVICON}/numpy/numpy-original.svg` },
    { id: 4, name: "Matplotlib", logo: `${DEVICON}/matplotlib/matplotlib-original.svg` },
    { id: 5, name: "SQL", logo: `${DEVICON}/azuresqldatabase/azuresqldatabase-original.svg` },
  ],
  contact: {
    email: "sumitmahato.aids25@aidtm.ac.in",
    phone: "+91 875782221",
    location: "Ahmedabad, India",
    github: "https://github.com/sumitkumarmahato",
    linkedin: "https://linkedin.com/in/sumitkumarmahato",
    tagline:
      "Have a project idea, collaboration inquiry, or job opportunity? Feel free to send a message!",
  },
}

/** Merge a partial JSON payload over the defaults, one section at a time. */
export function mergePortfolio(raw: Partial<PortfolioData> | null | undefined): PortfolioData {
  if (!raw) return defaultPortfolio
  return {
    hero: { ...defaultPortfolio.hero, ...raw.hero },
    about: { ...defaultPortfolio.about, ...raw.about },
    skills: raw.skills?.length ? raw.skills : defaultPortfolio.skills,
    experience: raw.experience?.length ? raw.experience : defaultPortfolio.experience,
    projects: raw.projects?.length ? raw.projects : defaultPortfolio.projects,
    certifications: raw.certifications?.length
      ? raw.certifications
      : defaultPortfolio.certifications,
    tools: raw.tools?.length ? raw.tools : defaultPortfolio.tools,
    contact: { ...defaultPortfolio.contact, ...raw.contact },
  }
}
