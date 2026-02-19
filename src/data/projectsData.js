/* -------------------------------------------------------------------------- */
/*                                Projects data                                */
/* -------------------------------------------------------------------------- */

export const PROJECTS = [
  {
    slug: 'coursesync',
    title: 'CourseSync',
    tagline: 'Class scheduling oracle',
    summary:
      'Discord bot tracking 1,800+ class sections with instant DM notifications when seats open. Multi-layered scraping ensures 100% reliability even against CAPTCHA protection.',
    narrative:
      'Engineered a resilient scraping mesh with Playwright automation, BeautifulSoup token extraction, and curl_cffi TLS masquerading as an automatic fallback chain. Intelligent rate limiting prevents notification spam while maintaining sub-100ms Supabase query times. Deployed containerized on Render with background task loops checking availability every 15 minutes.',
    category: 'automation',
    status: 'Live',
    stack: ['Python', 'Discord.py', 'Playwright', 'BeautifulSoup', 'Supabase', 'Docker', 'Render'],
    highlights: [
      'Multi-layered scraping with automatic fallback bypasses CAPTCHA with 100% reliability',
      'Intelligent rate limiting prevents notification spam while maintaining instant alerts',
      'Sub-100ms Supabase queries with background task loops checking every 15 minutes'
    ],
    repo: 'https://github.com/AlexJawhari/Class-Availability-Tracker',
    liveUrl: null,
    heroColor: '#2a375f'
  },
  {
    slug: 'spotfinder',
    title: 'SpotFinder',
    tagline: 'Geolocation platform for third spaces',
    summary:
      'Full-stack geolocation platform connecting people with third spaces using React concurrent features and Leaflet geospatial clustering to render thousands of locations with real-time check-ins.',
    narrative:
      'Built a RESTful API with Express handling 98.5% uptime through automated health checks, supporting real-time filtering by amenities with debounced state management. Implemented efficient geospatial queries using PostgreSQL\'s built-in functions to calculate distances, achieving sub-100ms response times for nearby location searches within customizable radius.',
    category: 'featured',
    status: 'Live',
    stack: ['React', 'Vite', 'Zustand', 'Leaflet.js', 'Node.js', 'Express', 'Supabase', 'Render', 'Vercel', 'Cloudinary'],
    highlights: [
      'Geospatial clustering renders thousands of locations smoothly with Leaflet.js',
      'Sub-100ms response times for nearby location searches using PostgreSQL geospatial functions',
      'Real-time check-ins and filtering with debounced state management for optimal performance'
    ],
    repo: 'https://github.com/AlexJawhari/SpotFinder',
    liveUrl: 'https://spotfinder-fawn.vercel.app/',
    heroColor: '#1b2738'
  },
  {
    slug: 'devhub',
    title: 'DevHub',
    tagline: 'API security & monitoring platform',
    summary:
      'Comprehensive API security platform performing automated OWASP Top 10 scans detecting SQL injection, XSS, and security header misconfigurations across 200+ endpoints with 94% accuracy.',
    narrative:
      'Engineered 24/7 monitoring using node-cron for health checks every 5 minutes, tracking uptime and response times with real-time WebSocket alerts via Socket.io. Built reporting engine generating PDF and JSON security audits with express-validator sanitization, SSRF protection, and rate limiting preventing DDoS attempts.',
    category: 'featured',
    status: 'Live',
    stack: ['React', 'Vite', 'Tailwind CSS v4', 'Zustand', 'Socket.io', 'Node.js', 'Express', 'Supabase', 'Render', 'Vercel'],
    highlights: [
      'Automated OWASP Top 10 scans across 200+ endpoints with 94% accuracy',
      '24/7 monitoring with health checks every 5 minutes and real-time WebSocket alerts',
      'Comprehensive PDF and JSON security reports with SSRF protection and rate limiting'
    ],
    repo: 'https://github.com/AlexJawhari/DevHub',
    liveUrl: 'https://devhub-steel.vercel.app/',
    heroColor: '#262534'
  },
  {
    slug: 'archive-catalogue',
    title: 'Archive Catalogue',
    tagline: 'Library catalogue & lending system',
    summary:
      'Full-stack library management system normalizing tens of thousands of lines of data to create a comprehensive catalogue, with dashboards for librarians and users to manage checkouts, searches, and fines.',
    narrative:
      'Designed and normalized complex relational database schemas from raw CSV data spanning tens of thousands of records. Built dual-purpose dashboards: librarian interface for comprehensive system management and user interface for book discovery, checkout/check-in, and fine payment. Implemented automated fine calculation, search functionality across multiple fields, and secure transaction handling.',
    category: 'academic',
    status: 'Academic project',
    stack: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Normalized tens of thousands of lines of raw data into efficient relational schema',
      'Dual dashboards: comprehensive librarian management and intuitive user experience',
      'Automated fine calculation, multi-field search, and secure transaction processing'
    ],
    repo: 'https://github.com/AlexJawhari/SQL-Library-Project',
    liveUrl: null,
    heroColor: '#0d3b2f'
  }
]
