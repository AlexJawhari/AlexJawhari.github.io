import { motion } from 'framer-motion'
import { SECTION_VARIANTS } from '../config/animationConfig'
import { TIMELINE } from '../data/timelineData'
import GlassCard from '../components/GlassCard'
import SectionTitle from '../components/SectionTitle'

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

export default AboutPage
