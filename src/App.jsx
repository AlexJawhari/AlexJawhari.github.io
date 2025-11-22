import React, { useMemo, useState, useEffect, useRef } from 'react'
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
// Random star count between 500-1000 for variety on each page load
const STAR_COUNT = 500 + Math.floor(Math.random() * 501) // Random between 500-1000
// Reduced planet zone radius to allow more stars near planets
// Stars will still be hidden if they're directly behind planets, but more will show
const PLANET_ZONES = [
  { top: 10, left: 88, radius: 8 }, // planet-1 (reduced from 12)
  { top: 88, left: 15, radius: 9 }, // planet-2 (reduced from 14)
  { top: 72, left: 78, radius: 9 } // planet-3 (reduced from 14)
]

const STAR_PALETTE = ['#271002', '#9B081C', '#E2A128', '#122E40', '#283121', '#D5D7D7']
const DEFAULT_STAR_COLOR = '#D5D7D7'

const SHOOTING_STAR_COLORS = [
  { head: 'rgba(213, 215, 215, 0.9)', tail: 'rgba(213, 215, 215, 0.45)', rgb: '213, 215, 215' },
  { head: 'rgba(100, 180, 255, 0.9)', tail: 'rgba(100, 180, 255, 0.45)', rgb: '100, 180, 255' }
]

// Generate star positions with even distribution across viewport
// Uses grid-based positioning for uniform spread, then adds randomness for natural appearance
const STARS = Array.from({ length: STAR_COUNT }).map((_, idx) => {
  // Calculate grid dimensions for even distribution
  // Using square root ensures roughly equal rows and columns
  const gridSize = Math.ceil(Math.sqrt(STAR_COUNT))
  const gridX = idx % gridSize
  const gridY = Math.floor(idx / gridSize)
  const cellWidth = 100 / gridSize
  const cellHeight = 100 / gridSize
  
  // Position within grid cell with slight randomness for natural look
  // This prevents stars from appearing in perfect grid lines
  const top = (gridY * cellHeight) + (Math.random() * cellHeight)
  const left = (gridX * cellWidth) + (Math.random() * cellWidth)

  // Check if star overlaps with planet zones - hide stars that would be behind planets
  const overlapsPlanet = PLANET_ZONES.some(zone => {
    const dx = left - zone.left
    const dy = top - zone.top
    return Math.sqrt(dx * dx + dy * dy) < zone.radius
  })

  // Random color picker from palette
  const palettePick = () => STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)]
  // Create color sequence for twinkling animation - cycles through all palette colors
  // Each star will animate through 5 randomly selected colors from the palette
  const colorSequence = Array.from({ length: 5 }, () => palettePick())

  return {
    id: idx,
    top,
    left,
    delay: idx * 0.18,
    duration: 6 + Math.random() * 4,
    hidden: overlapsPlanet,
    colors: colorSequence,
    twinkleDuration: 6 + Math.random() * 6
  }
})

// Generate static planets with random positions and sizes on page load
// This eliminates scroll-based updates and improves performance
// Includes collision detection to prevent planets from overlapping
const generateStaticPlanets = () => {
  const planetTypes = [
    { id: 'azure', className: 'planet planet--azure', baseSize: 140 },
    { id: 'obsidian', className: 'planet planet--obsidian', baseSize: 110 },
    { id: 'ember', className: 'planet planet--ember planet--halo', baseSize: 100 }
  ]
  
  const planets = []
  const minDistance = 15 // Minimum distance between planet centers (in %)
  const maxAttempts = 100 // Maximum attempts to find a non-overlapping position
  
  planetTypes.forEach(planet => {
    // Random size variation: 80% to 120% of base size
    const sizeMultiplier = 0.8 + Math.random() * 0.4
    const size = Math.round(planet.baseSize * sizeMultiplier)
    
    let top, left
    let attempts = 0
    let validPosition = false
    
    // Try to find a position that doesn't overlap with existing planets
    while (!validPosition && attempts < maxAttempts) {
      // Random position (5-95% to keep planets visible)
      top = 5 + Math.random() * 90
      left = 5 + Math.random() * 90
      
      // Check distance from all existing planets
      validPosition = planets.every(existingPlanet => {
        // Parse percentage values (remove % and convert to number)
        const existingLeft = parseFloat(existingPlanet.left.replace('%', ''))
        const existingTop = parseFloat(existingPlanet.top.replace('%', ''))
        const dx = left - existingLeft
        const dy = top - existingTop
        const distance = Math.sqrt(dx * dx + dy * dy)
        return distance >= minDistance
      })
      
      attempts++
    }
    
    // If we couldn't find a non-overlapping position, use the last attempted position
    // (This should rarely happen, but prevents infinite loops)
    planets.push({
      ...planet,
      top: `${top}%`,
      left: `${left}%`,
      size: `${size}px`
    })
  })
  
  return planets
}

// Generate planets once on module load
const STATIC_PLANETS = generateStaticPlanets()

const MAX_SHOOTING_STARS = 3
const SHOOTING_STAR_MIN_SPEED = 0.8
const SHOOTING_STAR_MAX_SPEED = 1.6
const SHOOTING_STAR_MIN_DELAY = 3000
const SHOOTING_STAR_MAX_DELAY = 6000

/**
 * Creates a new shooting star with random properties
 * Shooting stars spawn from random edges of the screen and travel diagonally
 * @returns {Object|null} Shooting star object with position, angle, speed, and color
 */
const createShootingStar = () => {
  if (typeof window === 'undefined') return null
  
  // Randomly select which edge of the screen to spawn from (0=top, 1=right, 2=bottom, 3=left)
  const side = Math.floor(Math.random() * 4)
  const { innerWidth, innerHeight } = window
  const offsetX = Math.random() * innerWidth
  const offsetY = Math.random() * innerHeight
  let startX = 0
  let startY = 0
  let angle = 45

  // Set starting position and angle based on spawn side
  // Angles are in degrees: 45° (top-left), 135° (top-right), 225° (bottom-right), 315° (bottom-left)
  switch (side) {
    case 0: // Top edge
      startX = offsetX
      startY = -20
      angle = 45
      break
    case 1: // Right edge
      startX = innerWidth + 20
      startY = offsetY
      angle = 135
      break
    case 2: // Bottom edge
      startX = offsetX
      startY = innerHeight + 20
      angle = 225
      break
    case 3: // Left edge
    default:
      startX = -20
      startY = offsetY
      angle = 315
      break
  }

  // Randomly select color from available shooting star colors
  const color = SHOOTING_STAR_COLORS[Math.floor(Math.random() * SHOOTING_STAR_COLORS.length)]

  return {
    id: `${Date.now()}-${Math.random()}`, // Unique ID for React key
    x: startX,
    y: startY,
    angle, // Direction of travel in degrees
    speed: SHOOTING_STAR_MIN_SPEED + Math.random() * (SHOOTING_STAR_MAX_SPEED - SHOOTING_STAR_MIN_SPEED),
    distance: 0, // Track total distance traveled for scale effect
    scale: 1, // Scale increases with distance for perspective effect
    color,
    tailLength: 30 + Math.random() * 20 // Tail length in pixels (30-50px range)
  }
}

// Shooting stars layer using direct DOM manipulation to avoid React re-renders
// This eliminates lag during scroll by completely bypassing React's render cycle
const ShootingStarsLayer = () => {
  const containerRef = useRef(null)
  const starsRef = useRef(new Map()) // Map of star ID to DOM element
  const spawnTimeout = useRef(null)
  const animationFrame = useRef(null)

  // Spawn shooting stars at random intervals using direct DOM manipulation
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const scheduleSpawn = () => {
      spawnTimeout.current = window.setTimeout(() => {
        // Don't spawn if we've reached the maximum number of shooting stars
        if (starsRef.current.size >= MAX_SHOOTING_STARS) {
          scheduleSpawn()
          return
        }

        const star = createShootingStar()
        if (!star || !containerRef.current) {
          scheduleSpawn()
          return
        }

        // Create DOM element directly - no React state
        const container = document.createElement('div')
        container.className = 'comet-container'
        container.dataset.starId = star.id

        const tail = document.createElement('div')
        tail.className = 'comet-tail'
        tail.style.width = `${star.tailLength}px`
        tail.style.background = `linear-gradient(
          to right,
          rgba(${star.color.rgb}, 0.8) 0%,
          rgba(${star.color.rgb}, 0.5) 35%,
          rgba(${star.color.rgb}, 0.2) 70%,
          rgba(${star.color.rgb}, 0) 100%
        )`

        const head = document.createElement('div')
        head.className = 'comet-head'
        head.style.background = star.color.head
        head.style.boxShadow = `
          0 0 8px ${star.color.head},
          0 0 18px ${star.color.tail},
          0 0 26px ${star.color.tail}
        `

        container.appendChild(tail)
        container.appendChild(head)
        containerRef.current.appendChild(container)

        // Store star data and DOM element
        starsRef.current.set(star.id, { ...star, element: container })

        scheduleSpawn()
      }, SHOOTING_STAR_MIN_DELAY + Math.random() * (SHOOTING_STAR_MAX_DELAY - SHOOTING_STAR_MIN_DELAY))
    }

    scheduleSpawn()

    return () => {
      if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current)
    }
  }, [])

  // Animation loop using direct DOM manipulation - completely independent of React
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const animate = () => {
      starsRef.current.forEach((star, id) => {
        const radians = (star.angle * Math.PI) / 180
        const newX = star.x + star.speed * Math.cos(radians)
        const newY = star.y + star.speed * Math.sin(radians)
        const distance = star.distance + star.speed
        const scale = 1 + distance / 600

        // Remove stars that have moved off-screen
        if (
          newX < -80 ||
          newX > window.innerWidth + 80 ||
          newY < -80 ||
          newY > window.innerHeight + 80
        ) {
          if (star.element && star.element.parentNode) {
            star.element.parentNode.removeChild(star.element)
          }
          starsRef.current.delete(id)
          return
        }

        // Update star data
        star.x = newX
        star.y = newY
        star.distance = distance
        star.scale = scale

        // Update DOM directly - no React re-render
        if (star.element) {
          star.element.style.transform = `translate(${newX}px, ${newY}px) rotate(${star.angle}deg) scale(${scale})`
        }
      })

      animationFrame.current = requestAnimationFrame(animate)
    }

    animationFrame.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
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

// Optimized background component - completely static to eliminate scroll lag
// All elements are static or use CSS animations only (no JavaScript scroll updates)
const ScrollBasedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-[#040507]" />
      <div className="absolute inset-0 bg-radial" style={{ opacity: 1 }} />
      <div className="absolute inset-0 bg-noise opacity-40" />
      
      {/* Stars layer - static, CSS animations only */}
      <div className="absolute inset-0 starfield">
        {STARS.filter(star => !star.hidden).map(star => {
          const style = {
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }

          style['--star-color-1'] = star.colors[0]
          style['--star-color-2'] = star.colors[1]
          style['--star-color-3'] = star.colors[2]
          style['--star-color-4'] = star.colors[3]
          style['--star-twinkle-duration'] = `${star.twinkleDuration}s`

          return (
            <span
              key={star.id}
              className="star star-colored"
              style={style}
            />
          )
        })}
        <ShootingStarsLayer />
      </div>

      {/* Orbit rings - static rotation, CSS animations only */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, idx) => {
          // Generate random initial rotation for each orbit (0-360 degrees)
          const initialRotation = Math.random() * 360
          return (
            <span 
              key={idx} 
              className={`orbit orbit-${idx + 1}`}
              style={{ '--orbit-initial-rotation': `${initialRotation}deg` }}
            />
          )
        })}
      </div>

      {/* Static planets - random positions and sizes, no scroll updates */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        {STATIC_PLANETS.map(planet => (
          <span
            key={planet.id}
            className={planet.className}
            style={{ 
              top: planet.top, 
              left: planet.left,
              width: planet.size,
              height: planet.size,
              zIndex: 10
            }}
          />
        ))}
      </div>

      {/* Static aurora - no scroll updates */}
      <div className="absolute inset-0 aurora" />
    </div>
  )
}

const OrbitBackdrop = () => {
  // Use the optimized scroll-based background component
  return <ScrollBasedBackground />
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
