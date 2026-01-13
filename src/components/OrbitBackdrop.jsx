import { useEffect, useRef } from 'react'
import {
  STAR_COUNT,
  PLANET_ZONES,
  STAR_PALETTE,
  SHOOTING_STAR_COLORS,
  generateStars,
  generateStaticPlanets,
  createShootingStar,
  MAX_SHOOTING_STARS,
  MAX_SHOOTING_STARS_TWO,
  MAX_SHOOTING_STARS_THREE,
  SHOOTING_STAR_MIN_DELAY,
  SHOOTING_STAR_MAX_DELAY,
  SHOOTING_STAR_THREE_CHANCE,
  SHOOTING_STAR_TWO_CHANCE
} from '../config/backgroundConfig'

// Generate stars and planets once on module load
const STARS = generateStars(STAR_COUNT, PLANET_ZONES)
const STATIC_PLANETS = generateStaticPlanets()

/**
 * Shooting Stars Layer Component
 * 
 * Uses CSS animations for perfectly smooth, constant-speed movement.
 * Animations run on the compositor thread, completely independent of JavaScript,
 * ensuring zero lag even during rapid scrolling.
 */
const ShootingStarsLayer = () => {
  const containerRef = useRef(null)
  const starsRef = useRef(new Map()) // Map of star ID to DOM element
  const spawnTimeout = useRef(null)

  // Spawn shooting stars at random intervals using direct DOM manipulation
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const scheduleSpawn = () => {
      spawnTimeout.current = window.setTimeout(() => {
        const currentCount = starsRef.current.size
        
        // Determine max stars: normally 1, 25% chance for 2, 10% chance for 3
        const rand = Math.random()
        let maxStars = MAX_SHOOTING_STARS
        if (rand < SHOOTING_STAR_THREE_CHANCE) {
          maxStars = MAX_SHOOTING_STARS_THREE
        } else if (rand < SHOOTING_STAR_THREE_CHANCE + SHOOTING_STAR_TWO_CHANCE) {
          maxStars = MAX_SHOOTING_STARS_TWO
        }
        
        // Don't spawn if we've reached the maximum number of shooting stars
        if (currentCount >= maxStars) {
          scheduleSpawn()
          return
        }

        // Get existing angles to ensure variety
        const existingAngles = new Set()
        starsRef.current.forEach(star => {
          existingAngles.add(Math.round(star.angle / 10) * 10) // Round to nearest 10 degrees
        })

        const star = createShootingStar(existingAngles)
        if (!star || !containerRef.current) {
          scheduleSpawn()
          return
        }

        // Create DOM element directly - no React state
        const container = document.createElement('div')
        container.className = 'comet-container'
        container.dataset.starId = star.id
        
        // Create unique animation name for this star
        const animationName = `shoot-${star.id.replace(/[^a-zA-Z0-9]/g, '')}`
        
        // Create CSS keyframes for smooth constant movement
        // Use a dedicated style element for shooting star animations
        let styleElement = document.getElementById('shooting-star-styles')
        if (!styleElement) {
          styleElement = document.createElement('style')
          styleElement.id = 'shooting-star-styles'
          document.head.appendChild(styleElement)
        }
        const styleSheet = styleElement.sheet
        
        const keyframes = `
          @keyframes ${animationName} {
            from {
              transform: translate3d(${star.startX}px, ${star.startY}px, 0) rotate(${star.angle}deg) scale(1);
            }
            to {
              transform: translate3d(${star.endX}px, ${star.endY}px, 0) rotate(${star.angle}deg) scale(1.5);
            }
          }
        `
        try {
          styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
        } catch (e) {
          // Fallback: append to style element directly
          styleElement.textContent += keyframes
        }
        
        // Apply animation
        container.style.animation = `${animationName} ${star.duration}s linear forwards`
        container.style.willChange = 'transform'
        container.style.transform = `translate3d(${star.startX}px, ${star.startY}px, 0)`

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

        // Store star data and DOM element for cleanup
        starsRef.current.set(star.id, { 
          ...star, 
          element: container,
          animationName,
          styleSheet,
          keyframeIndex: styleSheet.cssRules.length - 1
        })
        
        // Remove star after animation completes
        container.addEventListener('animationend', () => {
          if (container.parentNode) {
            container.parentNode.removeChild(container)
          }
          // Clean up CSS keyframes
          try {
            if (styleSheet.cssRules[starsRef.current.get(star.id)?.keyframeIndex]) {
              styleSheet.deleteRule(starsRef.current.get(star.id)?.keyframeIndex)
            }
          } catch (e) {
            // Keyframe may have already been removed
          }
          starsRef.current.delete(star.id)
        })

        scheduleSpawn()
      }, SHOOTING_STAR_MIN_DELAY + Math.random() * (SHOOTING_STAR_MAX_DELAY - SHOOTING_STAR_MIN_DELAY))
    }

    scheduleSpawn()

    return () => {
      if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}

/**
 * Scroll-Based Background Component
 * 
 * Optimized for maximum performance with zero scroll lag.
 * All animations use CSS only - no JavaScript scroll event handlers.
 */
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
      {/* Initial rotations set to create lotus flower pattern when aligned */}
      {/* Each orbit starts at a specific offset angle (0°, 30°, 60°, 90°, 120°, 150°) */}
      {/* As they rotate at different speeds, they periodically align to form a 6-petal lotus flower */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, idx) => {
          // Set initial rotations to create a 6-petal lotus flower pattern
          // When orbits align at these angles, their overlapping creates the flower shape
          const flowerAngles = [0, 30, 60, 90, 120, 150]
          const initialRotation = flowerAngles[idx] || 0
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

export default OrbitBackdrop
