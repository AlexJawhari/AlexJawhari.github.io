/* -------------------------------------------------------------------------- */
/*                        Background animation config                          */
/* -------------------------------------------------------------------------- */

export const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Pre-generate star positions so we can keep them stable and avoid stars overlapping planets
// Random star count between 500-1000 for variety on each page load
export const STAR_COUNT = 500 + Math.floor(Math.random() * 501) // Random between 500-1000

// Reduced planet zone radius to allow more stars near planets
// Stars will still be hidden if they're directly behind planets, but more will show
export const PLANET_ZONES = [
  { top: 10, left: 88, radius: 8 }, // planet-1 (reduced from 12)
  { top: 88, left: 15, radius: 9 }, // planet-2 (reduced from 14)
  { top: 72, left: 78, radius: 9 } // planet-3 (reduced from 14)
]

export const STAR_PALETTE = ['#271002', '#9B081C', '#E2A128', '#122E40', '#283121', '#D5D7D7']
export const DEFAULT_STAR_COLOR = '#D5D7D7'

export const SHOOTING_STAR_COLORS = [
  { head: 'rgba(213, 215, 215, 0.9)', tail: 'rgba(213, 215, 215, 0.45)', rgb: '213, 215, 215' },
  { head: 'rgba(100, 180, 255, 0.9)', tail: 'rgba(100, 180, 255, 0.45)', rgb: '100, 180, 255' }
]

// Generate star positions with even distribution across viewport
// Uses grid-based positioning for uniform spread, then adds randomness for natural appearance
export const generateStars = (starCount, planetZones) => {
  return Array.from({ length: starCount }).map((_, idx) => {
    // Calculate grid dimensions for even distribution
    // Using square root ensures roughly equal rows and columns
    const gridSize = Math.ceil(Math.sqrt(starCount))
    const gridX = idx % gridSize
    const gridY = Math.floor(idx / gridSize)
    const cellWidth = 100 / gridSize
    const cellHeight = 100 / gridSize
    
    // Position within grid cell with slight randomness for natural look
    // This prevents stars from appearing in perfect grid lines
    const top = (gridY * cellHeight) + (Math.random() * cellHeight)
    const left = (gridX * cellWidth) + (Math.random() * cellWidth)

    // Check if star overlaps with planet zones - hide stars that would be behind planets
    const overlapsPlanet = planetZones.some(zone => {
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
}

// Generate static planets with random positions and sizes on page load
// This eliminates scroll-based updates and improves performance
// Includes collision detection to prevent planets from overlapping
export const generateStaticPlanets = () => {
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

// Shooting Star Configuration
export const MAX_SHOOTING_STARS = 1 // Normally 1
export const MAX_SHOOTING_STARS_TWO = 2 // 25% chance for 2
export const MAX_SHOOTING_STARS_THREE = 3 // 10% chance for 3
export const SHOOTING_STAR_MIN_SPEED = 0.8 // Pixels per frame (base 60fps)
export const SHOOTING_STAR_MAX_SPEED = 1.6
export const SHOOTING_STAR_MIN_DELAY = 3000 // Minimum spawn delay in milliseconds (3 seconds)
export const SHOOTING_STAR_MAX_DELAY = 8000 // Maximum spawn delay in milliseconds (8 seconds)
export const SHOOTING_STAR_TWO_CHANCE = 0.25 // 25% chance for 2 stars
export const SHOOTING_STAR_THREE_CHANCE = 0.10 // 10% chance for 3 stars

/**
 * Creates a new shooting star with random properties
 */
export const createShootingStar = (existingAngles = new Set()) => {
  if (typeof window === 'undefined') return null
  
  const { innerWidth, innerHeight } = window
  
  // Define possible angles with more variety (not just 45° increments)
  const possibleAngles = [
    30, 45, 60,  // Top-left quadrant
    120, 135, 150, // Top-right quadrant
    210, 225, 240, // Bottom-right quadrant
    300, 315, 330  // Bottom-left quadrant
  ]
  
  // Filter out angles that are too similar to existing ones (within 20 degrees)
  const availableAngles = possibleAngles.filter(angle => {
    return !Array.from(existingAngles).some(existing => {
      const diff = Math.abs(angle - existing)
      return diff < 20 || diff > 340 // Account for wrap-around
    })
  })
  
  // Use available angles or fall back to all angles if none available
  const angleOptions = availableAngles.length > 0 ? availableAngles : possibleAngles
  let angle = angleOptions[Math.floor(Math.random() * angleOptions.length)]
  
  // Add some randomness to the angle (±5 degrees) for more variety
  angle += (Math.random() - 0.5) * 10
  
  // Determine spawn side based on angle
  let startX = 0
  let startY = 0
  
  if (angle >= 0 && angle < 90) {
    // Top-left: spawn from top or left
    if (Math.random() > 0.5) {
      startX = Math.random() * innerWidth
      startY = -20
    } else {
      startX = -20
      startY = Math.random() * innerHeight
    }
  } else if (angle >= 90 && angle < 180) {
    // Top-right: spawn from top or right
    if (Math.random() > 0.5) {
      startX = Math.random() * innerWidth
      startY = -20
    } else {
      startX = innerWidth + 20
      startY = Math.random() * innerHeight
    }
  } else if (angle >= 180 && angle < 270) {
    // Bottom-right: spawn from bottom or right
    if (Math.random() > 0.5) {
      startX = Math.random() * innerWidth
      startY = innerHeight + 20
    } else {
      startX = innerWidth + 20
      startY = Math.random() * innerHeight
    }
  } else {
    // Bottom-left: spawn from bottom or left
    if (Math.random() > 0.5) {
      startX = Math.random() * innerWidth
      startY = innerHeight + 20
    } else {
      startX = -20
      startY = Math.random() * innerHeight
    }
  }

  // Randomly select color from available shooting star colors
  const color = SHOOTING_STAR_COLORS[Math.floor(Math.random() * SHOOTING_STAR_COLORS.length)]

  // Calculate end position based on angle and screen dimensions
  // Move far enough to cross the entire screen
  const maxDistance = Math.sqrt(innerWidth * innerWidth + innerHeight * innerHeight) * 1.5
  const angleRadians = (angle * Math.PI) / 180
  const endX = startX + maxDistance * Math.cos(angleRadians)
  const endY = startY + maxDistance * Math.sin(angleRadians)
  
  // Calculate duration based on speed (faster stars = shorter duration)
  const speed = SHOOTING_STAR_MIN_SPEED + Math.random() * (SHOOTING_STAR_MAX_SPEED - SHOOTING_STAR_MIN_SPEED)
  // Duration in seconds - adjust based on speed to maintain constant visual speed
  const duration = maxDistance / (speed * 60) // Convert speed to pixels per second (assuming 60fps base)

  return {
    id: `${Date.now()}-${Math.random()}`, // Unique ID for React key
    startX,
    startY,
    endX,
    endY,
    angle, // Direction of travel in degrees
    duration, // Animation duration in seconds
    color,
    tailLength: 30 + Math.random() * 20 // Tail length in pixels (30-50px range)
  }
}
