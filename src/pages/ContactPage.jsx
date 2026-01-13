import { motion } from 'framer-motion'
import { SECTION_VARIANTS } from '../config/animationConfig'
import { SITE } from '../data/siteData'
import GlassCard from '../components/GlassCard'
import SectionTitle from '../components/SectionTitle'

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

export default ContactPage
