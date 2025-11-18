import React from 'react'
import { Routes, Route, NavLink, Link, useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ----------------- Site & Projects Data (edit here) ----------------- */
const SITE = {
  name: 'Alexander Jawhari',
  title: 'Software Engineer (CS Junior)',
  email: 'alex@example.com',
  github: 'https://github.com/alexjawhari',
  linkedin: 'https://linkedin.com/in/alexjawhari'
}

const PROJECTS = [
  {
    slug: 'class-availability-tracker',
    title: 'Class Availability Tracker',
    short: 'Monitors course enrollment and notifies when spots open.',
    long: 'A scraping and automation tool to monitor class availability. Built with Python, Playwright, and BeautifulSoup. Runs scheduled checks and alerts via email/Discord.',
    tech: ['Python', 'Playwright', 'BeautifulSoup', 'SQLite'],
    github: 'https://github.com/alexjawhari/class-availability-tracker',
    screenshots: []
  },
  {
    slug: 'congress-stock-tracker',
    title: 'Congress Stock Tracker',
    short: 'Aggregates and analyzes trading activity related to public officials.',
    long: 'Collects trade disclosures, normalizes data, and surfaces patterns.',
    tech: ['Node.js', 'Postgres', 'Docker'],
    github: '',
    screenshots: []
  },
  {
    slug: 'nocturne-scraper',
    title: 'Nocturne Scraper',
    short: 'Robust scraping platform for scheduling and data extraction.',
    long: 'A configurable scraper with proxy rotation and headless browser support.',
    tech: ['Go', 'Redis', 'Kubernetes'],
    github: '',
    screenshots: []
  },
  {
    slug: 'starlit-db',
    title: 'Starlit DB',
    short: 'A tiny embeddable DB for edge tools.',
    long: 'Experimentation with compact serialization and WAL design for low-latency local analytics.',
    tech: ['Rust', 'WASM'],
    github: '',
    screenshots: []
  }
]
/* ------------------------------------------------------------------- */

/* ----------------- Small UI helpers ----------------- */
const NavItem = ({ to, children }) => (
  <NavLink to={to} className={({ isActive }) => `px-3 py-2 text-sm rounded ${isActive ? 'bg-da-deep-blue/40' : 'hover:bg-white/2'}`}>
    {children}
  </NavLink>
)

function Header() {
  return (
    <header className="z-20 relative">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <div>
          <span className="heading-da text-xl text-da-silver">{SITE.name}</span>
          <div className="text-xs text-da-silver/60">{SITE.title}</div>
        </div>
        <nav className="flex items-center gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/projects">Projects</NavItem>
          <NavItem to="/resume">Resume</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </nav>
      </div>
    </header>
  )
}

/* ----------------- Hero ----------------- */
function Hero() {
  return (
    <section className="relative py-12 z-10">
      <div className="app-starfield" aria-hidden />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="card-da p-10 rounded-2xl">
        <h1 className="heading-da text-4xl">{SITE.name}</h1>
        <p className="mt-4 max-w-2xl">
          Software Engineer & CS Junior. Backend-leaning, but enjoy building full-stack systems, scraping/automation tools, and small infrastructure experiments. Programming since elementary school — I build pragmatic systems with a philosophical bent.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#/projects" className="px-4 py-2 rounded border border-da-silver/20 hover:opacity-90">View Projects</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-da-deep-blue/60">Open Resume</a>
        </div>
      </motion.div>
    </section>
  )
}

/* ----------------- About ----------------- */
function About() {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
      <div className="card-da p-8 rounded-2xl">
        <h2 className="heading-da text-2xl">About</h2>
        <p className="mt-4">
          I’m a CS junior exploring backend systems, tooling, and reliable scraping. I value privacy, craftsmanship, and philosophical clarity in code. I enjoy designing systems that are robust and understandable — elegant engineering for messy problems.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm heading-da">Skills</h4>
            <ul className="mt-2 text-sm">
              <li>Python, Go, Rust</li>
              <li>Databases: Postgres, SQLite</li>
              <li>Containerization: Docker</li>
              <li>Testing & CI</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm heading-da">Philosophy</h4>
            <p className="mt-2 text-sm">Clean abstractions, defensive defaults, and minimal external dependencies. Prefer small, auditable systems over opaque magic.</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ----------------- Projects list and card ----------------- */
function ProjectCard({ project }) {
  return (
    <motion.article whileHover={{ scale: 1.02 }} className="card-da p-5 rounded-xl">
      <h3 className="heading-da text-lg">{project.title}</h3>
      <p className="mt-2 text-sm text-da-silver/80">{project.short}</p>
      <div className="mt-4 text-xs text-da-silver/60">{project.tech.join(' • ')}</div>
    </motion.article>
  )
}

function Projects() {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
      <h2 className="heading-da text-2xl mb-4">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map(p => (
          <Link key={p.slug} to={`/projects/${p.slug}`}>
            <ProjectCard project={p} />
          </Link>
        ))}
      </div>
    </motion.section>
  )
}

/* ----------------- Project detail ----------------- */
function ProjectDetail() {
  const { slug } = useParams()
  const project = PROJECTS.find(p => p.slug === slug)
  if (!project) return <div className="card-da p-8 rounded-2xl">Project not found</div>

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
      <div className="card-da p-8 rounded-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="heading-da text-2xl">{project.title}</h2>
            <p className="mt-2 text-sm text-da-silver/90">{project.long}</p>
            <div className="mt-4">
              <a href={project.github || '#'} className="text-sm underline" target="_blank" rel="noreferrer">View on GitHub</a>
            </div>
          </div>
          <div>
            <Link to="/projects" className="text-sm">Back</Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.screenshots.length ? project.screenshots.map((s, i) => (
            <img key={i} src={s} alt={`${project.title} ${i + 1}`} className="rounded" />
          )) : (
            <div className="rounded border border-da-silver/8 p-6 text-sm">No screenshots yet. Place images in <code>/public/projects/{project.slug}/</code> and update the project object located in <code>src/App.jsx</code>.</div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

/* ----------------- Resume ----------------- */
function ResumePage() {
  return (
    <section className="py-8">
      <div className="card-da p-8 rounded-2xl">
        <h2 className="heading-da text-2xl">Resume</h2>
        <p className="mt-4">Click below to view or download the PDF version of my resume.</p>
        <div className="mt-4">
          <a className="px-4 py-2 rounded bg-da-deep-blue/60" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Open Resume (PDF)</a>
          <a className="ml-3 px-4 py-2 rounded border" href="/resume.pdf" download>Download</a>
        </div>
      </div>
    </section>
  )
}

/* ----------------- Contact ----------------- */
function Contact() {
  return (
    <section className="py-8">
      <div className="card-da p-8 rounded-2xl">
        <h2 className="heading-da text-2xl">Contact</h2>
        <p className="mt-4">I prefer direct links — no contact forms.</p>
        <ul className="mt-4">
          <li><strong>Email:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li><strong>GitHub:</strong> <a href={SITE.github} target="_blank" rel="noreferrer">{SITE.github}</a></li>
          <li><strong>LinkedIn:</strong> <a href={SITE.linkedin} target="_blank" rel="noreferrer">{SITE.linkedin}</a></li>
        </ul>
      </div>
    </section>
  )
}

/* ----------------- Footer ----------------- */
function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-da-silver/60">
      <div>© {new Date().getFullYear()} {SITE.name} — Built with care</div>
    </footer>
  )
}

/* ----------------- Main App ----------------- */
export default function App() {
  return (
    <div className="min-h-screen bg-da-bg text-da-silver antialiased">
      <Header />
      <main className="max-w-[1200px] mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
