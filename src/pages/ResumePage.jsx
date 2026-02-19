import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SECTION_VARIANTS } from '../config/animationConfig'
import { SITE } from '../data/siteData'
import GlassCard from '../components/GlassCard'
import SectionTitle from '../components/SectionTitle'

function ResumePage() {
  const [loadIframe, setLoadIframe] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    // Lazy load iframe when component mounts (user is already on the page)
    // Small delay to ensure page content renders first
    const timer = setTimeout(() => {
      setLoadIframe(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

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
      <GlassCard className="min-h-[90vh]" ref={containerRef}>
        {loadIframe ? (
          <iframe title="Resume PDF" src={SITE.resumeUrl} className="w-full h-[90vh] rounded-2xl border border-white/5" />
        ) : (
          <div className="w-full h-[90vh] flex items-center justify-center text-da-silver/60">
            Loading resume...
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}

export default ResumePage
