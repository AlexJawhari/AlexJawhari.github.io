/* -------------------------------------------------------------------------- */
/*                                Projects data                                */
/* -------------------------------------------------------------------------- */

export const PROJECTS = [
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
