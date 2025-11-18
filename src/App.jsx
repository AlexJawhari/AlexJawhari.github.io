import React, { useMemo, useState } from 'react'
import { Routes, Route, NavLink, Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/* -------------------------------------------------------------------------- */
/*                             Core portfolio data                            */
/* -------------------------------------------------------------------------- */
const SITE = {
  name: 'Alexander Jawhari',
  title: 'Backend-leaning Software Engineer',
  summary:
    'CS junior obsessed with backend systems, discreet automation, and resilient data infrastructure. I mix dark academia aesthetics with pragmatic engineering — building tools that feel handcrafted yet operate like mission control.',
  focus: 'Systems design · scraping orchestration · data platforms · infra hygiene',
  location: 'Dallas, TX · Remote friendly',
  email: 'alexander.placeholder@email.com',
  github: 'https://github.com/AlexJawhari',
  linkedin: 'https://www.linkedin.com/in/alexjawhari',
  resumeUrl: '/resume.pdf'
}

const HIGHLIGHT_STATS = [
  { label: 'Years shipping code', value: '8+' },
  { label: 'Primary focus', value: 'Automation & backend systems' },
  { label: 'Current status', value: 'CS junior · backend emphasis' },
  { label: 'Philosophy', value: 'Privacy, precision, poetic rigor' }
]

const CAPABILITIES = [
  {
    title: 'Backend & Infra',
    text: 'APIs, services, and schedulers with observability and disaster-avoidance built in.',
    tags: ['Python', 'Go', 'Node', 'Postgres', 'Redis', 'Docker', 'Kubernetes']
  },
  {
    title: 'Automation & Scraping',
    text: 'Headless fleets with proxy rotation, fingerprinting defenses, and state diffing.',
    tags: ['Playwright', 'Headless Chrome', 'Proxy orchestration', 'Queue design']
  },
  {
    title: 'Data Systems',
    text: 'Event pipelines, compact storage, and query layers for high-signal dashboards.',
    tags: ['SQLite', 'DuckDB', 'ETL', 'Data modeling']
  }
]

const PHILOSOPHY = [
  'Dark academia meets mission control — handcrafted interfaces with orbital motion cues.',
  'Systems should whisper: minimal surface area, graceful degradation, fewer dependencies.',
  'Privacy-first storytelling. The work is front and center; the person remains deliberately abstract.'
]

const PROJECTS = [
  {
    slug: 'orion-availability-beacon',
    title: 'Orion Availability Beacon',
    tagline: 'Class scheduling oracle',
    summary:
      'Full-stack monitor that scrapes institutional course data, deduplicates anomalies, and emits discreet alerts the second a seat opens.',
    narrative:
      'Built a resilient scraping mesh with rotating fingerprints, persisted historical deltas, and routed notifications to email/Discord. Designed a daylight dashboard plus a nocturnal CLI for fast triage.',
    category: 'featured',
    timeline: '2025',
    status: 'Live pilot',
    stack: ['Python', 'Playwright', 'SQLite', 'Docker'],
    highlights: [
      'Sub-5s detection loop with parallelized scrapers',
      'State machine prevents duplicate pings while preserving audit trail',
      'Self-healing workers auto rehydrate when blocked'
    ],
    repo: 'https://github.com/AlexJawhari',
    notion: null,
    heroColor: '#2a375f'
  },
  {
    slug: 'senate-lattice',
    title: 'Senate Lattice',
    tagline: 'Public trading intelligence',
    summary:
      'Pipeline that ingests congressional trade disclosures, normalizes filings, and surfaces unusual clusters via a canvas console.',
    narrative:
      'Pairs a Go ingestion service with DuckDB-backed analysis and a React command palette UI. Focus on traceability and fairness: every insight links back to raw filings.',
    category: 'systems',
    timeline: '2024',
    status: 'Research prototype',
    stack: ['Go', 'DuckDB', 'Redis', 'React'],
    highlights: [
      'Message queue fan-out keeps parsing deterministic',
      'Vector similarity pinpoints repeat collaborators',
      'One-click export to CSV / notebook bundles'
    ],
    repo: 'https://github.com/AlexJawhari',
    notion: null,
    heroColor: '#0d3b2f'
  },
  {
    slug: 'nocturne-scraper-lab',
    title: 'Nocturne Scraper Lab',
    tagline: 'Headless automation playground',
    summary:
      'A configurable lab for testing scraper strategies against hostile surfaces — sandboxing browser fingerprints, proxies, and pacing rules.',
    narrative:
      'Ships with a pattern library of anti-detection tactics, a declarative job DSL, and telemetry overlays to compare approaches. Think wind tunnel but for scraping.',
    category: 'experiments',
    timeline: '2024',
    status: 'Active build',
    stack: ['Node', 'TypeScript', 'Redis', 'Kubernetes'],
    highlights: [
      'Job composer expresses flows as poetic YAML',
      'Circuit breakers watch for ban heuristics',
      'Replayable sessions for postmortems'
    ],
    repo: 'https://github.com/AlexJawhari',
    notion: null,
    heroColor: '#2b1a3a'
  },
  {
    slug: 'starlit-edge-db',
    title: 'Starlit Edge DB',
    tagline: 'Micro database for field kits',
    summary:
      'A compact storage engine for edge analytics experiments. Focused on deterministic writes, WAL clarity, and WebAssembly portability.',
    narrative:
      'Explores log-structured persistence, snapshotting, and compile-to-WASM interfaces so the same core can run inside browsers or CLIs.',
    category: 'research',
    timeline: '2023',
    status: 'In discovery',
    stack: ['Rust', 'WebAssembly'],
    highlights: [
      'Binary format designed for diff-friendly commits',
      'Time-travel queries baked into the core',
      'Focus on zero-config deployment'
    ],
    repo: 'https://github.com/AlexJawhari',
    notion: null,
    heroColor: '#1f2437'
  }
]

const TIMELINE = [
  {
    year: '2025',
    title: 'Software Engineering Intern — Core Integrative Health',
    details: [
      'Built financial tracking database improving callbacks by 40%',
      'Automated outreach workflows cutting late payments by 30%',
      'Implemented validation scripts reducing manual errors by 25%'
    ]
  },
  {
    year: '2024',
    title: 'Research · Automation & Scraping Guild',
    details: [
      'Led campus tooling guild focusing on scraping reliability',
      'Mentored peers on privacy-aware data practices'
    ]
  },
  {
    year: '2023',
    title: 'Foundational Studios',
    details: ['Built CLI utilities for personal research lab', 'Deepened expertise in Linux, containers, and telemetry']
  }
]

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

/* -------------------------------------------------------------------------- */
/*                                UI components                               */
/* -------------------------------------------------------------------------- */
const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        'px-4 py-2 text-sm font-medium transition rounded-full relative',
        isActive ? 'text-da-gold bg-white/5 border border-da-gold/40 shadow-[0_0_20px_rgba(191,160,90,0.2)]' : 'text-da-silver/70 hover:text-da-silver'
      ].join(' ')
    }
  >
    {label}
  </NavLink>
)

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="flex flex-col gap-2 mb-8">
    {eyebrow && <span className="text-xs uppercase tracking-[0.3em] text-da-gold/80">{eyebrow}</span>}
    <h2 className="text-3xl lg:text-4xl font-heading text-da-silver">{title}</h2>
    {description && <p className="text-sm text-da-silver/70 max-w-2xl">{description}</p>}
  </div>
)

const GlassCard = ({ children, className = '' }) => (
  <div className={`glass-panel border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden ${className}`}>
    {children}
  </div>
)

const OrbitBackdrop = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none">
    <div className="absolute inset-0 bg-[#040507]" />
    <div className="absolute inset-0 bg-radial" />
    <div className="absolute inset-0 bg-grid opacity-20" />
    <div className="absolute inset-0 bg-noise opacity-40" />
    <div className="absolute inset-0">
      {[...Array(6)].map((_, idx) => (
        <span key={idx} className={`orbit orbit-${idx + 1}`} />
      ))}
    </div>
    <div className="absolute inset-0 aurora" />
  </div>
)

/* -------------------------------------------------------------------------- */
/*                                 Page: home                                 */
/* -------------------------------------------------------------------------- */
function Landing() {
  const heroProjects = PROJECTS.slice(0, 2)
  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-14 lg:space-y-20">
      <section className="grid lg:grid-cols-[2fr,1fr] gap-8 items-stretch relative">
        <GlassCard className="p-8 lg:p-12 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl">
          <div className="flex flex-col gap-5">
            <div className="text-xs tracking-[0.5em] text-da-gold/80 uppercase">Portfolio / 2025</div>
            <h1 className="text-4xl lg:text-6xl font-heading leading-tight text-da-silver">
              Alexander Jawhari
              <span className="block text-xl lg:text-2xl text-da-gold/80 mt-3">{SITE.title}</span>
            </h1>
            <p className="text-base lg:text-lg text-da-silver/80 max-w-3xl">{SITE.summary}</p>
            <p className="text-sm text-da-silver/70">{SITE.focus}</p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link to="/projects" className="pill-cta">
                Project Guide
              </Link>
              <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="pill-ghost">
                Resume PDF
              </a>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {HIGHLIGHT_STATS.map(stat => (
              <div key={stat.label} className="stat-pill">
                <span className="text-da-gold text-xs uppercase tracking-wide">{stat.label}</span>
                <p className="text-lg font-medium text-da-silver">{stat.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="bg-white/2">
          <SectionTitle eyebrow="Signal" title="Current orbit" />
          <ul className="space-y-4 text-sm text-da-silver/80">
            <li>
              <strong className="text-da-silver">Location</strong>
              <p>{SITE.location}</p>
            </li>
            <li>
              <strong className="text-da-silver">Interests</strong>
              <p>automation, discreet systems, research infra, debate-informed storytelling</p>
            </li>
            <li>
              <strong className="text-da-silver">Availability</strong>
              <p>Open to internships / research labs beginning Summer 2026</p>
            </li>
          </ul>
        </GlassCard>
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        {CAPABILITIES.map(capability => (
          <GlassCard key={capability.title} className="relative overflow-hidden">
            <h3 className="text-xl font-heading text-da-silver mb-3">{capability.title}</h3>
            <p className="text-sm text-da-silver/80 mb-5">{capability.text}</p>
            <div className="flex flex-wrap gap-2">
              {capability.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </section>

      <section>
        <SectionTitle eyebrow="Projects" title="Active constellations" description="A rotating atlas of systems, labs, and research experiments." />
        <div className="grid lg:grid-cols-2 gap-6">
          {heroProjects.map(project => (
            <Link key={project.slug} to={`/projects/${project.slug}`}>
              <GlassCard className="project-card relative">
                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-da-silver/60 mb-3">
                    <span>{project.timeline}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3 className="text-2xl font-heading text-da-silver">{project.title}</h3>
                  <p className="text-sm text-da-silver/70 mt-2">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.stack.map(tech => (
                      <span key={tech} className="tag tag-ghost">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="orbital-accent" style={{ background: project.heroColor }} />
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-[2fr,1fr] gap-6">
        <GlassCard>
          <SectionTitle eyebrow="Philosophy" title="Design principles" />
          <ul className="space-y-4 text-da-silver/80">
            {PHILOSOPHY.map(item => (
              <li key={item} className="flex gap-3">
                <span className="text-da-gold mt-1">✦</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard>
          <SectionTitle eyebrow="Signal boost" title="Contact" />
          <div className="space-y-4 text-sm">
            <a className="contact-link" href={`mailto:${SITE.email}`}>
              Email — {SITE.email}
            </a>
            <a className="contact-link" href={SITE.github} target="_blank" rel="noreferrer">
              GitHub — {SITE.github.replace('https://', '')}
            </a>
            <a className="contact-link" href={SITE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn — {SITE.linkedin.replace('https://', '')}
            </a>
          </div>
        </GlassCard>
      </section>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Page: about me                               */
/* -------------------------------------------------------------------------- */
function AboutPage() {
  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-12">
      <GlassCard className="p-8 lg:p-10">
        <SectionTitle eyebrow="About" title="Mission briefing" />
        <div className="space-y-6 text-da-silver/80 leading-relaxed">
          <p>
            I am a CS junior with backend instincts and debate-forged communication skills. I gravitate toward problems that require rigor, ethics, and operational calm —
            scraping platforms that must stay invisible, data systems that guard their sources, and interfaces that feel like archival instruments.
          </p>
          <p>
            My engineering practice blends research notebooks, bespoke CLI tooling, and a relentless respect for privacy. I would rather craft a precise, explainable tool than chase hype
            features. Each project is treated as a field study: hypotheses, instrumentation, and reflection.
          </p>
        </div>
      </GlassCard>

      <section className="grid lg:grid-cols-3 gap-6">
        {TIMELINE.map(entry => (
          <GlassCard key={entry.year}>
            <div className="text-xs uppercase tracking-[0.3em] text-da-gold/80">{entry.year}</div>
            <h3 className="text-xl font-heading text-da-silver mt-3">{entry.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-da-silver/80">
              {entry.details.map(detail => (
                <li key={detail} className="flex gap-3">
                  <span className="text-da-gold mt-1">▻</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </section>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Page: projects                                */
/* -------------------------------------------------------------------------- */
function ProjectsPage() {
  const categories = useMemo(() => ['featured', 'systems', 'experiments', 'research'], [])
  const [activeCategory, setActiveCategory] = useState('featured')
  const filtered = PROJECTS.filter(project => project.category === activeCategory)

  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-8">
      <GlassCard>
        <SectionTitle eyebrow="Projects" title="Project guide" description="Filter between featured systems, infrastructure, and exploratory labs." />
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`tab ${category === activeCategory ? 'tab-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <motion.div key={project.slug} layout variants={SECTION_VARIANTS} initial="hidden" animate="visible" exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }}>
                <Link to={`/projects/${project.slug}`}>
                  <GlassCard className="project-tile">
                    <div className="text-xs uppercase tracking-[0.3em] text-da-silver/60 flex justify-between">
                      <span>{project.timeline}</span>
                      <span>{project.status}</span>
                    </div>
                    <h3 className="text-2xl font-heading text-da-silver mt-3">{project.title}</h3>
                    <p className="text-sm text-da-silver/70 mt-2">{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.stack.map(tech => (
                        <span key={tech} className="tag tag-ghost">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </GlassCard>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                            Page: project detail                            */
/* -------------------------------------------------------------------------- */
function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find(item => item.slug === slug)

  if (!project) {
    return (
      <GlassCard className="mt-10">
        <p>Project not found.</p>
        <button className="pill-cta mt-4" onClick={() => navigate('/projects')}>
          Back to projects
        </button>
      </GlassCard>
    )
  }

  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-10">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 blur-3xl" style={{ background: project.heroColor }} />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-da-silver/60 flex justify-between mb-4">
            <span>{project.timeline}</span>
            <span>{project.status}</span>
          </div>
          <h1 className="text-4xl font-heading text-da-silver">{project.title}</h1>
          <p className="text-da-silver/70 text-base mt-4 max-w-3xl">{project.narrative}</p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <a href={project.repo} target="_blank" rel="noreferrer" className="pill-cta">
              View repository
            </a>
            <button onClick={() => navigate(-1)} className="pill-ghost">
              Back
            </button>
          </div>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xl font-heading text-da-silver mb-4">Highlights</h3>
          <ul className="space-y-3 text-sm text-da-silver/80">
            {project.highlights.map(item => (
              <li key={item} className="flex gap-3">
                <span className="text-da-gold mt-1">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard>
          <h3 className="text-xl font-heading text-da-silver mb-4">Tech / tooling</h3>
          <div className="flex flex-wrap gap-3">
            {project.stack.map(item => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Page: resume                                */
/* -------------------------------------------------------------------------- */
function ResumePage() {
  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-8">
      <GlassCard>
        <SectionTitle eyebrow="Resume" title="PDF dossier" />
        <p className="text-da-silver/70 text-sm max-w-2xl mb-4">
          View or download the full PDF. Replace <code>public/resume.pdf</code> with updated versions at any time; GitHub Pages will serve it instantly.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="pill-cta">
            Open in new tab
          </a>
          <a href={SITE.resumeUrl} download className="pill-ghost">
            Download
          </a>
        </div>
      </GlassCard>
      <GlassCard className="min-h-[70vh]">
        <iframe title="Resume PDF" src={SITE.resumeUrl} className="w-full h-[70vh] rounded-2xl border border-white/5" />
      </GlassCard>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Page: contact                                */
/* -------------------------------------------------------------------------- */
function ContactPage() {
  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-8">
      <GlassCard>
        <SectionTitle eyebrow="Contact" title="Direct links" description="No contact form — just precise channels." />
        <div className="grid md:grid-cols-3 gap-6">
          <a className="contact-card" href={`mailto:${SITE.email}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-da-gold/70">Email</span>
            <p className="text-da-silver">{SITE.email}</p>
          </a>
          <a className="contact-card" href={SITE.github} target="_blank" rel="noreferrer">
            <span className="text-xs uppercase tracking-[0.3em] text-da-gold/70">GitHub</span>
            <p className="text-da-silver">{SITE.github.replace('https://', '')}</p>
          </a>
          <a className="contact-card" href={SITE.linkedin} target="_blank" rel="noreferrer">
            <span className="text-xs uppercase tracking-[0.3em] text-da-gold/70">LinkedIn</span>
            <p className="text-da-silver">{SITE.linkedin.replace('https://', '')}</p>
          </a>
        </div>
      </GlassCard>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Layout                                   */
/* -------------------------------------------------------------------------- */
function Header() {
  return (
    <header className="relative z-20">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-da-silver font-heading text-xl">{SITE.name}</span>
          <p className="text-xs text-da-silver/60 tracking-[0.4em] uppercase">Software engineer</p>
        </div>
        <nav className="flex flex-wrap gap-2">
          <NavItem to="/" label="Landing" />
          <NavItem to="/about" label="About" />
          <NavItem to="/projects" label="Projects" />
          <NavItem to="/resume" label="Resume" />
          <NavItem to="/contact" label="Contact" />
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="py-10 text-center text-xs text-da-silver/60">
      © {new Date().getFullYear()} {SITE.name}. Crafted with orbitals, cards, and deliberate code.
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen text-da-silver">
      <OrbitBackdrop />
      <Header />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
