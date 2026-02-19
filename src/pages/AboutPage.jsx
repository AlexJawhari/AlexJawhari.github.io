import { motion } from 'framer-motion'
import { SECTION_VARIANTS } from '../config/animationConfig'
import { ABOUT_CARDS } from '../data/timelineData'
import GlassCard from '../components/GlassCard'
import SectionTitle from '../components/SectionTitle'

function AboutPage() {
  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-12">
      <GlassCard className="p-8 lg:p-10">
        <SectionTitle eyebrow="About" title="Mission briefing" />
        <div className="space-y-6 text-da-silver/80 leading-relaxed">
          <p>
            I study computer science at UT Dallas (expected graduation May 2027) with a focus on backend systems and full-stack development. I gravitate toward problems that require rigor, ethics, and operational calm: building RESTful APIs, geospatial platforms, security scanners, and automation tools that stay invisible when they need to.
          </p>
          <p>
            My engineering practice blends research notebooks, bespoke tooling, and a strong respect for privacy. I would rather craft a precise, explainable tool than chase hype. Each project is treated as a field study: hypotheses, instrumentation, and reflection. When not coding, I paint, read philosophy, play guitar, climb rocks, and lift weights. Each discipline informs the others.
          </p>
        </div>
      </GlassCard>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ABOUT_CARDS.map((card, idx) => (
          <GlassCard key={idx}>
            <div className="text-xs uppercase tracking-[0.3em] text-da-gold/80">{card.subtitle}</div>
            <h3 className="text-xl font-heading text-da-silver mt-3">{card.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-da-silver/80">
              {card.details.map((detail, i) => (
                <li key={i} className="flex gap-3">
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
