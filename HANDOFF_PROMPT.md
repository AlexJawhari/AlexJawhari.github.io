# Portfolio Site Development - Complete Handoff Prompt

## Project Overview

You're working on a portfolio website for **Alexander Jawhari** (alexjawhari.github.io) built with **React + Vite**, deployed via **GitHub Pages**. The site features a **scroll-based space theme backdrop** with animated planets, stars, comets, and orbit rings.

## Project Structure

```
src/
├── App.jsx                    # Main app with routes, page components, OrbitBackdrop
├── main.jsx                  # React entry point with HashRouter
└── styles/
    └── index.css            # All CSS including theme styles, planet styles, comet styles

.github/workflows/
└── deploy.yml                # GitHub Actions workflow that builds and deploys on push to main

public/
└── resume.pdf                # Resume PDF (user updates this manually)
```

## Design Vision & Color Palette

**Color Palette:**
- Deep blue (`#071d3f`, `rgba(14, 32, 71)`)
- Deep green (`#0b3a2b`, `rgba(12, 42, 33)`)
- Deep brown (`#2b180f`)
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
   - Grid overlay and noise texture
   - Starfield with 120 twinkling stars
   - 6 orbit rings that rotate on scroll
   - Aurora effect that moves on scroll
   - **3 animated planets** that move smoothly on scroll:
     - Azure planet (blue) - moves up and left
     - Obsidian planet (green) - moves up and right
     - Ember planet (orange) - moves up and slightly left

2. **Smooth Planet Scrolling**:
   - Uses `useSpring` from Framer Motion for physics-based smooth motion
   - Optimized spring settings: `stiffness: 150, damping: 40, mass: 0.3`
   - GPU acceleration with `will-change: transform` and `transform: translateZ(0)`
   - Planets move positions smoothly without lag

3. **Dynamic Comets**:
   - **Infrequent**: Only 3 comets at a time, regenerate every 30 seconds
   - **Slow movement**: 8-20 second duration (much slower than before)
   - **Soft colors**: Varied palette of soft gold, silver, blue, and green
   - **Aligned tails**: Tail always aligns with direction of travel
   - Random start/end positions (off-screen)
   - Long delays between appearances (10-40 seconds)
   - Soft opacity (max 0.6) with `easeInOut` easing

4. **Page Structure**:
   - Landing page (`/`) - Main portfolio with hero, capabilities, projects, philosophy, contact
   - About page (`/about`) - Mission briefing and timeline
   - Projects page (`/projects`) - Filterable project tiles
   - Project detail pages (`/projects/:slug`) - Individual project details
   - Resume page (`/resume`) - PDF viewer
   - Contact page (`/contact`) - Direct links (no forms)

5. **UI Components**:
   - Glassmorphism cards with backdrop blur
   - Smooth animations with Framer Motion
   - Responsive design with Tailwind CSS
   - Navigation with active states

### 🎨 Design Details

**Planets:**
- No 3D rotation (removed) - just smooth position movement
- No planet rings (removed for cleaner look)
- Smooth scrolling with `useSpring` wrapper
- GPU-accelerated transforms

**Comets:**
- Soft color palette: gold, silver, blue, green (all with low opacity)
- Infrequent appearance (3 comets, long delays)
- Slow, gentle movement (8-20 seconds)
- Tail properly aligned with direction
- Fade in/out smoothly

**Background:**
- Deep space theme throughout
- Stars twinkle continuously
- Orbit rings rotate on scroll
- Aurora effect shifts on scroll

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
  { head: 'rgba(191, 160, 90, 0.6)', tail: 'rgba(191, 160, 90, 0.3)' }, // Soft gold
  { head: 'rgba(197, 206, 209, 0.5)', tail: 'rgba(197, 206, 209, 0.25)' }, // Soft silver
  { head: 'rgba(100, 150, 255, 0.5)', tail: 'rgba(100, 150, 255, 0.25)' }, // Soft blue
  { head: 'rgba(56, 235, 187, 0.5)', tail: 'rgba(56, 235, 187, 0.25)' } // Soft green
]

// Comets: 3 total, 8-20s duration, 10-40s delay, soft colors, infrequent
```

## Deployment

- **Branch**: `main` (all work happens here)
- **Backup branches**: 
  - `backup-before-overhaul` - State before library/observatory changes
  - `Overhaul_Pt1` - Previous overhaul attempt
- **Workflow**: `.github/workflows/deploy.yml` auto-deploys on push to main
- **URL**: https://alexjawhari.github.io (or similar based on GitHub username)

## Important Notes

- **No contact forms** - only direct links (email, GitHub, LinkedIn)
- **Dark mode only** - no toggle needed
- **Resume PDF** is in `public/resume.pdf` - user updates manually
- **Smooth scrolling** is critical - planets must move smoothly without lag
- **Comets should be subtle** - infrequent, slow, soft colors
- **No 3D planet rotation** - just position movement
- **No planet rings** - removed for cleaner aesthetic

## Recent Changes Made

1. **Removed 3D planet rotation** - kept only smooth position movement
2. **Optimized planet scrolling** - improved `useSpring` settings and GPU acceleration
3. **Dialed back comets** - reduced to 3, slower movement, softer colors, longer delays
4. **Removed planet rings** - cleaner planet appearance
5. **Fixed CSS import order** - `@import` before `@tailwind`

## Current State

The site is in a polished state with:
- ✅ Smooth, lag-free planet scrolling
- ✅ Infrequent, slow, soft-colored comets
- ✅ Clean planet design (no rings, no 3D rotation)
- ✅ Working scroll-based animations
- ✅ All pages functional
- ✅ Responsive design
- ✅ Auto-deployment via GitHub Actions

## User Preferences & Requirements

From original conversation:
- **Design**: Dark academia + futuristic vibes, not minimalist
- **Color palette**: Deep blue, deep green, black, gold, silver, deep brown
- **Mood**: Dark academia, philosophy, space, stars, Japanese garden, smart sophisticated
- **No sounds/audio effects**
- **Privacy-focused** - no personal photos
- **Project tiles** - clickable, with links to GitHub repos
- **Resume** - PDF button/link
- **Contact** - Direct links only (no forms)

## Next Steps / Areas for Future Improvement

1. Could add more interactive elements (mouse-following particles, parallax)
2. Could enhance observatory/library themes if desired (currently just space theme)
3. Could add more background variety
4. Performance optimization if needed
5. Additional animations or micro-interactions

## How to Continue

1. User will test the live site and provide feedback
2. Make adjustments to animations, colors, or spacing as needed
3. All changes go to `main` branch and auto-deploy
4. Keep the smooth scrolling and subtle comet aesthetic

---

**Current Commit**: Latest changes include smooth planet scrolling, infrequent soft comets, removed 3D rotation and planet rings.

**Key Files to Edit:**
- `src/App.jsx` - Main component with OrbitBackdrop and all pages
- `src/styles/index.css` - All styling including planets, comets, stars

**Build Command**: `npm run build`
**Deploy**: Automatic via GitHub Actions on push to `main`
