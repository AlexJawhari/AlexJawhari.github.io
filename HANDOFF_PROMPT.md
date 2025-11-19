# Portfolio Site Development - Handoff Prompt

## Project Overview

Portfolio website for **Alexander Jawhari** (alexjawhari.github.io) built with **React + Vite**, deployed via **GitHub Pages**. Features a scroll-based space theme backdrop with animated planets, stars, comets, and constellations.

## Project Structure

```
src/
├── App.jsx                    # Main app with routes, page components, OrbitBackdrop
├── main.jsx                   # React entry point with HashRouter
└── styles/
    └── index.css             # All CSS including theme styles, planet styles, comet styles

.github/workflows/
└── deploy.yml                # GitHub Actions workflow that builds and deploys on push to main

public/
└── resume.pdf                # Resume PDF (user updates this manually)
```

## Design Vision & Color Palette

**Color Palette:**
- Deep blue (`#071d3f`, `rgba(14, 32, 71)`)
- Deep green (`#0b3a2b`, `rgba(12, 42, 33)`)
- Deep brown (`#2b180f`, `rgba(43, 24, 15)`)
- Black (`#040507`, `#050608`)
- Gold accents (`rgba(191, 160, 90)`) - `da-gold`
- Silver accents (`rgba(197, 206, 209)`) - `da-silver`

**Mood & Aesthetic:**
- "Dark academia stargazing while in Japan"
- "Ravenclaw common room observatory"
- Dark mode only (no toggle)
- Sophisticated, intelligent, mystical
- Space-themed with cosmic elements

## Current Implementation

### ✅ Completed Features

1. **Scroll-Based Space Backdrop**:
   - Deep space background with radial gradients
   - Noise texture overlay
   - Starfield with 170 twinkling stars (20 in top-right corner)
   - 6 constellation patterns (Capricorn, Orion, Cassiopeia, Ursa Major, Lyra, Cygnus) that rotate on scroll
   - Aurora effect that moves on scroll
   - **3 animated planets** that move smoothly on scroll:
     - Azure planet (blue) - moves up and left
     - Obsidian planet (green) - moves up and right
     - Ember planet (orange) - moves up and slightly left

2. **Smooth Planet Scrolling**:
   - Uses `useSpring` from Framer Motion for physics-based smooth motion
   - Optimized spring settings: `stiffness: 150, damping: 40, mass: 0.3`
   - GPU acceleration with `will-change: transform` and `transform: translateZ(0)`
   - Planets have solid backgrounds to block stars (z-index: 10)
   - Planets move positions smoothly without lag

3. **Dynamic Comets (Shooting Stars)**:
   - **5 comets** at a time, regenerate every 15 seconds
   - **Slow movement**: 12-18 second duration (all relatively slow with variance)
   - **Color palette**: Gold, silver, deep blue, deep green, deep brown
   - **Aligned tails**: Tail always aligns with direction of travel
   - **Long visible trails**: 320px width, 3px height with proper gradient
   - Random start/end positions (off-screen)
   - Delays between appearances (3-11 seconds)
   - Soft opacity with `easeInOut` easing

4. **Constellations**:
   - 6 actual star patterns (not geometric shapes)
   - Capricorn (Dec 22 birthday) + Orion, Cassiopeia, Ursa Major, Lyra, Cygnus
   - Sized and positioned like orbit rings
   - Rotate on scroll with proper aspect ratio
   - Opacity: 0.12 (subtle background element)

5. **Page Structure**:
   - Landing page (`/`) - Main portfolio with hero, capabilities, projects, philosophy, contact
   - About page (`/about`) - Mission briefing and timeline
   - Projects page (`/projects`) - Filterable project tiles
   - Project detail pages (`/projects/:slug`) - Individual project details
   - Resume page (`/resume`) - PDF viewer
   - Contact page (`/contact`) - Direct links (no forms)

6. **UI Components**:
   - Glassmorphism cards with backdrop blur (fixed pixelation issues)
   - Smooth animations with Framer Motion
   - Responsive design with Tailwind CSS
   - Navigation with active states
   - Increased vertical spacing between sections (space-y-24 lg:space-y-32)

### 🎨 Design Details

**Planets:**
- No 3D rotation - just smooth position movement
- No planet rings - removed for cleaner look
- Smooth scrolling with `useSpring` wrapper
- GPU-accelerated transforms
- Solid backgrounds prevent stars from showing through

**Comets:**
- Color palette matches site: gold, silver, deep blue, deep green, deep brown
- Infrequent appearance (5 comets, moderate delays)
- Slow, gentle movement (12-18 seconds)
- Tail properly aligned with direction
- Long visible trails (320px)
- Fade in/out smoothly

**Constellations:**
- Actual star patterns, not geometric shapes
- Sized like orbit rings (circular/elliptical containers)
- Rotate on scroll
- Proper aspect ratio (no stretching)
- Subtle opacity (0.12)

**Background:**
- Deep space theme throughout
- Stars twinkle continuously
- Constellations rotate on scroll
- Aurora effect shifts on scroll
- Grid system removed (user preference)

## Technical Stack

- **React 18** with React Router (HashRouter for GitHub Pages compatibility)
- **Framer Motion** for animations and scroll-based transforms
- **Tailwind CSS** for utility classes
- **Vite** for build tooling
- **GitHub Actions** for automatic deployment

## Key Code Patterns

### Planet Movement (Smooth Scrolling)
```javascript
const smoothScroll = useSpring(scrollYProgress, { 
  stiffness: 150, 
  damping: 40,
  mass: 0.3
})

const planetTransforms = PLANETS.map(planet => ({
  ...planet,
  x: useTransform(smoothScroll, [0, 1], planet.xRange),
  y: useTransform(smoothScroll, [0, 1], planet.yRange)
}))
```

### Comet Generation
```javascript
const COMET_COLORS = [
  { head: 'rgba(191, 160, 90, 0.7)', tail: 'rgba(191, 160, 90, 0.35)' }, // Gold
  { head: 'rgba(197, 206, 209, 0.65)', tail: 'rgba(197, 206, 209, 0.3)' }, // Silver
  { head: 'rgba(14, 32, 71, 0.7)', tail: 'rgba(14, 32, 71, 0.35)' }, // Deep blue
  { head: 'rgba(12, 42, 33, 0.7)', tail: 'rgba(12, 42, 33, 0.35)' }, // Deep green
  { head: 'rgba(43, 24, 15, 0.7)', tail: 'rgba(43, 24, 15, 0.35)' } // Deep brown
]

// Comets: 5 total, 12-18s duration, 3-11s delay, palette colors
```

### Constellation Data
```javascript
const CONSTELLATIONS = [
  {
    name: 'Capricorn',
    points: [[30, 20], [35, 25], ...],
    size: { width: '60%', height: '40%' },
    position: { top: '10%', left: '20%' },
    duration: 24
  },
  // ... 5 more constellations
]
```

## Deployment

- **Branch**: `main` (all work happens here)
- **Workflow**: `.github/workflows/deploy.yml` auto-deploys on push to main
- **URL**: https://alexjawhari.github.io

## Important Notes

- **No contact forms** - only direct links (email, GitHub, LinkedIn)
- **Dark mode only** - no toggle needed
- **Resume PDF** is in `public/resume.pdf` - user updates manually
- **Smooth scrolling** is critical - planets must move smoothly without lag
- **Comets should be subtle** - infrequent, slow, soft colors
- **No 3D planet rotation** - just position movement
- **No planet rings** - removed for cleaner aesthetic
- **Grid system removed** - user prefers without grid
- **Glass panels** - fixed pixelation with isolation and GPU acceleration

## Recent Changes Made

1. **Fixed shooting star tails** - proper rgba() construction, longer trails (320px)
2. **Revamped constellations** - actual star patterns, proper sizing and rotation
3. **Increased star count** - 170 stars (20 in top-right corner)
4. **Fixed glass panel pixelation** - added isolation and GPU acceleration
5. **Increased vertical spacing** - more breathing room between sections
6. **Fixed planets blocking stars** - solid backgrounds, higher z-index
7. **Removed grid system** - cleaner aesthetic

## Current State

The site is in a polished state with:
- ✅ Smooth, lag-free planet scrolling
- ✅ Visible shooting star trails with proper colors
- ✅ Actual constellation patterns rotating on scroll
- ✅ Clean planet design (no rings, no 3D rotation)
- ✅ Working scroll-based animations
- ✅ All pages functional
- ✅ Responsive design (mobile tested and working)
- ✅ Auto-deployment via GitHub Actions
- ✅ Fixed glass panel visual glitches

## User Preferences & Requirements

- **Design**: Dark academia + futuristic vibes, not minimalist
- **Color palette**: Deep blue, deep green, black, gold, silver, deep brown
- **Mood**: Dark academia, philosophy, space, stars, Japanese garden, smart sophisticated
- **No sounds/audio effects**
- **Privacy-focused** - no personal photos
- **Project tiles** - clickable, with links to GitHub repos
- **Resume** - PDF button/link
- **Contact** - Direct links only (no forms)
- **Mobile** - Must work perfectly on mobile devices

## Known Issues / Future Improvements

1. **Shooting star tails** - Currently 320px, may need to be longer/more visible
2. **Constellations** - Currently at 0.12 opacity, may need to be brighter
3. **Star count** - Currently 170, user testing if more stars are preferred
4. **Colored stars** - Feature was attempted but caused blank page issues, reverted

## How to Continue

1. User will test the live site and provide feedback
2. Make adjustments to animations, colors, or spacing as needed
3. All changes go to `main` branch and auto-deploy
4. Keep the smooth scrolling and subtle comet aesthetic
5. Test thoroughly before pushing - blank page issues have occurred from CSS errors

---

**Current Commit**: c397b44 - Final polish: fix constellations, add top-right stars, longer comet tails, more spacing

**Key Files to Edit:**
- `src/App.jsx` - Main component with OrbitBackdrop and all pages
- `src/styles/index.css` - All styling including planets, comets, stars, constellations

**Build Command**: `npm run build`
**Deploy**: Automatic via GitHub Actions on push to `main`

**Note**: HANDOFF_PROMPT.md is in .gitignore and should not be committed to the public repo.
