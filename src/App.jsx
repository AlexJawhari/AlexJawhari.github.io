import React, { useMemo, useState, useEffect } from 'react'
import { Routes, Route, NavLink, Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'

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
    slug: 'kyoto-observatory-console',
    title: 'Kyoto Observatory Console',
    tagline: 'Dark academia monitoring wall',
    summary:
      'A command-console style dashboard that watches background jobs, scrapers, and queues — rendered like an old observatory terminal with modern telemetry under the hood.',
    narrative:
      'Blends a low-noise, high-signal console UI with structured logs and anomaly pings. Inspired by observatories and old reading rooms: every event feels like a field note, not a notification storm.',
    category: 'featured',
    timeline: '2024',
    status: 'Studio build',
    stack: ['TypeScript', 'React', 'WebSockets', 'Postgres'],
    highlights: [
      'Signal-first log stream with semantic grouping',
      'Room-inspired themes (library, observatory, midnight lab)',
      'Keyboard-driven navigation for fast triage'
    ],
    repo: 'https://github.com/AlexJawhari',
    notion: null,
    heroColor: '#1b2738'
  },
  {
    slug: 'ink-and-orbit-notes',
    title: 'Ink & Orbit Notes',
    tagline: 'Philosophical engineering notebook',
    summary:
      'A note system for stitching together research, experiments, and philosophical questions about systems — part digital commonplace book, part lab log.',
    narrative:
      'Organizes ideas as constellations: each experiment, quote, or system sketch links into a graph you can traverse like a star map. Built to keep both technical detail and why-it-matters in the same frame.',
    category: 'featured',
    timeline: '2023 – ongoing',
    status: 'Personal tool',
    stack: ['Next.js', 'SQLite', 'MDX'],
    highlights: [
      'Bidirectional links between experiments and essays',
      'Night-mode reading room theme with marginalia',
      'Lightweight sync so it works offline first'
    ],
    repo: 'https://github.com/AlexJawhari',
    notion: null,
    heroColor: '#262534'
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

// Pre-generate star positions so we can keep them stable and avoid stars overlapping planets
const STAR_COUNT = 220
const PLANET_ZONES = [
  { top: 10, left: 88, radius: 12 }, // planet-1
  { top: 88, left: 15, radius: 14 }, // planet-2
  { top: 72, left: 78, radius: 14 } // planet-3
]

const STAR_COLORS = [
  'rgba(191, 160, 90, 1)', // Gold
  'rgba(197, 206, 209, 1)', // Silver
  'rgba(14, 32, 71, 1)', // Deep blue
  'rgba(12, 42, 33, 1)', // Deep green
  'rgba(43, 24, 15, 1)', // Deep brown
  'rgba(255, 255, 255, 1)' // White
]

const STARS = Array.from({ length: STAR_COUNT }).map((_, idx) => {
  // Add more stars in top right corner (75-100% top, 70-100% left)
  let top, left
  if (idx < 20) {
    // First 20 stars: favor top right corner
    top = 75 + Math.random() * 25 // 75-100%
    left = 70 + Math.random() * 30 // 70-100%
  } else {
    // Rest: random distribution
    top = Math.random() * 100
    left = Math.random() * 100
  }

  const overlapsPlanet = PLANET_ZONES.some(zone => {
    const dx = left - zone.left
    const dy = top - zone.top
    return Math.sqrt(dx * dx + dy * dy) < zone.radius
  })

  const hasColor = idx % 3 === 0 && !overlapsPlanet
  const primaryColor = hasColor ? STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)] : null
  const secondaryColor = hasColor ? STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)] : null

  return {
    id: idx,
    top,
    left,
    delay: idx * 0.18,
    duration: 4 + Math.random() * 4,
    hidden: overlapsPlanet,
    hasColor,
    primaryColor,
    secondaryColor
  }
})

const PLANETS = [
  {
    id: 'azure',
    className: 'planet planet--azure',
    base: { top: '6%', left: '74%' },
    xRange: [0, -260],
    yRange: [0, 260]
  },
  {
    id: 'obsidian',
    className: 'planet planet--obsidian',
    base: { top: '80%', left: '8%' },
    xRange: [0, 220],
    yRange: [0, -310]
  },
  {
    id: 'ember',
    className: 'planet planet--ember planet--halo',
    base: { top: '70%', left: '82%' },
    xRange: [0, -80],
    yRange: [0, 220]
  }
]

// Constellation data - Capricorn (Dec 22 birthday) + other space constellations
// Sized and positioned like orbit rings, with constellation patterns inside
const CONSTELLATIONS = [
  {
    name: 'Capricorn',
    points: [
      [30, 20], [35, 25], [40, 23], [45, 27], [50, 25], [55, 30], [60, 27], [65, 33], [70, 30]
    ],
    size: { width: '60%', height: '40%' },
    position: { top: '10%', left: '20%' },
    duration: 24
  },
  {
    name: 'Orion',
    points: [
      [40, 25], [45, 20], [50, 25], [55, 30], [60, 25], [65, 20], [70, 25], [60, 35], [60, 45]
    ],
    size: { width: '45%', height: '60%' },
    position: { top: '20%', left: '40%' },
    duration: 30
  },
  {
    name: 'Cassiopeia',
    points: [
      [25, 35], [35, 30], [45, 40], [55, 35], [65, 45], [75, 40], [85, 50]
    ],
    size: { width: '80%', height: '70%' },
    position: { top: '12%', left: '5%' },
    duration: 26
  },
  {
    name: 'Ursa Major',
    points: [
      [30, 45], [35, 40], [40, 45], [45, 40], [50, 45], [55, 50], [60, 45], [65, 55]
    ],
    size: { width: '55%', height: '40%' },
    position: { top: '30%', left: '30%' },
    duration: 32
  },
  {
    name: 'Lyra',
    points: [
      [45, 55], [50, 50], [55, 55], [60, 60], [55, 65], [50, 60]
    ],
    size: { width: '65%', height: '50%' },
    position: { top: '15%', left: '15%' },
    duration: 36
  },
  {
    name: 'Cygnus',
    points: [
      [55, 65], [60, 60], [65, 65], [70, 70], [75, 65], [80, 70], [85, 65]
    ],
    size: { width: '70%', height: '60%' },
    position: { top: '5%', left: '20%' },
    duration: 40
  }
]

// Comet color palette - using the site's color palette
const COMET_COLORS = [
  { head: 'rgba(191, 160, 90, 0.7)', tail: 'rgba(191, 160, 90, 0.35)' }, // Gold
  { head: 'rgba(197, 206, 209, 0.65)', tail: 'rgba(197, 206, 209, 0.3)' }, // Silver
  { head: 'rgba(14, 32, 71, 0.7)', tail: 'rgba(14, 32, 71, 0.35)' }, // Deep blue
  { head: 'rgba(12, 42, 33, 0.7)', tail: 'rgba(12, 42, 33, 0.35)' }, // Deep green
  { head: 'rgba(43, 24, 15, 0.7)', tail: 'rgba(43, 24, 15, 0.35)' } // Deep brown
]

// Comet generator - creates infrequent, slow, soft comets
const generateComet = (id) => {
  // Random start position (off-screen)
  const startSide = Math.random() < 0.5 ? 'left' : 'right'
  const startTop = Math.random() * 100 // 0-100%
  const startLeft = startSide === 'left' ? -10 : 110 // Off-screen
  
  // Random end position (off-screen or fade out)
  const endSide = Math.random() < 0.5 ? 'left' : 'right'
  const endTop = Math.random() * 100
  const endLeft = endSide === 'left' ? -10 : 110
  
  // Calculate angle for tail alignment
  const dx = endLeft - startLeft
  const dy = endTop - startTop
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)
  
  // Slow movement with variance - all relatively slow
  const baseDuration = 8 // Base slow duration
  const variance = 4 + Math.random() * 6 // 4-10 seconds variance
  const duration = baseDuration + variance // 12-18 seconds total (all relatively slow)
  
  // Shorter delay between comets (more frequent)
  const delay = Math.random() * 8 + 3 // 3-11 seconds delay
  
  // Random color from palette
  const color = COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)]
  
  return {
    id,
    startX: startLeft,
    startY: startTop,
    endX: endLeft,
    endY: endTop,
    angle,
    duration,
    delay,
    color
  }
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

const OrbitBackdrop = () => {
  const { scrollYProgress } = useScroll()
  
  // Use useSpring for smooth, lag-free planet movement with optimized settings
  const smoothScroll = useSpring(scrollYProgress, { 
    stiffness: 150, 
    damping: 40,
    mass: 0.3
  })
  
  const starOpacity = useTransform(smoothScroll, [0, 0.5, 1], [0.5, 1, 0.7])
  const orbitRotation = useTransform(smoothScroll, [0, 1], [0, 90])
  const auroraOffsetY = useTransform(smoothScroll, [0, 1], [0, -260])
  const auroraOpacity = useTransform(smoothScroll, [0, 0.3, 1], [0.9, 0.7, 0.4])
  
  // Smooth planet transforms - position only, no rotation
  const planetTransforms = PLANETS.map(planet => ({
    ...planet,
    x: useTransform(smoothScroll, [0, 1], planet.xRange),
    y: useTransform(smoothScroll, [0, 1], planet.yRange)
  }))
  
  // Generate more comets (more frequent)
  const [comets, setComets] = useState(() => 
    Array.from({ length: 5 }, (_, i) => generateComet(i))
  )
  
  // Regenerate comets more frequently
  useEffect(() => {
    const interval = setInterval(() => {
      setComets(prev => prev.map((comet, i) => {
        // Regenerate more often (more frequent)
        if (Math.random() < 0.4) {
          return generateComet(i)
        }
        return comet
      }))
    }, 15000) // Every 15 seconds (more frequent)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-[#040507]" />
      <motion.div className="absolute inset-0 bg-radial" style={{ opacity: 1 }} />
      {/* Grid temporarily removed */}
      <div className="absolute inset-0 bg-noise opacity-40" />
      <div className="absolute inset-0 starfield">
        {STARS.filter(star => !star.hidden).map(star => {
          const style = {
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }

          if (star.hasColor && star.primaryColor) {
            style['--star-color'] = star.primaryColor
            style['--star-color-alt'] = star.secondaryColor ?? star.primaryColor
          }

          return (
            <span
              key={star.id}
              className={star.hasColor ? 'star star-colored' : 'star'}
              style={style}
            />
          )
        })}
        {/* Dynamic comets with aligned tails - infrequent, slow, soft colors */}
        {comets.map(comet => (
          <motion.div
            key={comet.id}
            className="comet-container"
            style={{
              left: `${comet.startX}%`,
              top: `${comet.startY}%`,
              rotate: `${comet.angle}deg`
            }}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0 
            }}
            animate={{
              x: `${comet.endX - comet.startX}vw`,
              y: `${comet.endY - comet.startY}vh`,
              opacity: [0, 0.6, 0.6, 0] // Softer opacity
            }}
            transition={{
              duration: comet.duration,
              delay: comet.delay,
              repeat: Infinity,
              repeatDelay: 5 + Math.random() * 10, // Shorter delays between repeats
              ease: 'easeInOut', // Softer easing
              times: [0, 0.15, 0.85, 1]
            }}
          >
            <div 
              className="comet-tail" 
              style={{
                background: `linear-gradient(
                  to right,
                  ${comet.color.tail}00 0%,
                  ${comet.color.tail}30 5%,
                  ${comet.color.tail}60 20%,
                  ${comet.color.tail}80 40%,
                  ${comet.color.head}95 65%,
                  ${comet.color.head}100 80%,
                  ${comet.color.head}90 90%,
                  ${comet.color.head}70 100%
                )`
              }}
            />
            <div 
              className="comet-head" 
              style={{
                background: comet.color.head,
                boxShadow: `
                  0 0 8px ${comet.color.head},
                  0 0 15px ${comet.color.tail},
                  0 0 25px ${comet.color.tail}40
                `
              }}
            />
          </motion.div>
        ))}
      </div>
      {/* Constellations - sized and positioned like orbit rings, with proper aspect ratio */}
      {/* To switch back to geometric orbit rings, replace CONSTELLATIONS with: 
          {[...Array(6)].map((_, idx) => (
            <span key={idx} className={`orbit orbit-${idx + 1}`} />
          ))} */}
      <motion.div className="absolute inset-0" style={{ rotate: orbitRotation }}>
        {CONSTELLATIONS.map((constellation, idx) => (
          <div
            key={constellation.name}
            className="constellation-container"
            style={{
              position: 'absolute',
              top: constellation.position.top,
              left: constellation.position.left,
              width: constellation.size.width,
              height: constellation.size.height,
              pointerEvents: 'none'
            }}
          >
            <svg
              className="constellation"
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.12
              }}
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <polyline
                points={constellation.points.map(([x, y]) => `${x},${y}`).join(' ')}
                fill="none"
                stroke="rgba(191, 160, 90, 0.15)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {constellation.points.map(([x, y], pointIdx) => (
                <circle
                  key={pointIdx}
                  cx={x}
                  cy={y}
                  r="1.2"
                  fill="rgba(191, 160, 90, 0.4)"
                />
              ))}
            </svg>
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        {planetTransforms.map(planet => (
          <motion.span
            key={planet.id}
            className={planet.className}
            style={{ 
              top: planet.base.top, 
              left: planet.base.left, 
              x: planet.x, 
              y: planet.y,
              zIndex: 10
            }}
          />
        ))}
      </div>
      <motion.div className="absolute inset-0 aurora" style={{ y: auroraOffsetY, opacity: auroraOpacity }} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 Page: home                                 */
/* -------------------------------------------------------------------------- */
function Landing() {
  const heroProjects = PROJECTS.slice(0, 2)
  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-24 lg:space-y-32">
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
      <GlassCard className="min-h-[90vh]">
        <iframe title="Resume PDF" src={SITE.resumeUrl} className="w-full h-[90vh] rounded-2xl border border-white/5" />
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
