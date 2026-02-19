import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SECTION_VARIANTS } from '../config/animationConfig'
import { SITE, HIGHLIGHT_STATS, CAPABILITIES, PHILOSOPHY } from '../data/siteData'
import { PROJECTS } from '../data/projectsData'
import GlassCard from '../components/GlassCard'
import SectionTitle from '../components/SectionTitle'

function Landing() {
  const heroProjects = PROJECTS.slice(0, 2)
  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-24 lg:space-y-32">
      <section className="grid lg:grid-cols-[2fr,1fr] gap-8 items-stretch relative">
        <GlassCard className="p-8 lg:p-12 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl">
          <div className="flex flex-col gap-5">
            <div className="text-xs tracking-[0.5em] text-da-gold/80 uppercase">Portfolio</div>
            <h1 className="text-4xl lg:text-6xl font-heading leading-tight text-da-silver">
              Alexander Jawhari
              <span className="block text-xl lg:text-2xl text-da-gold/80 mt-3">{SITE.title}</span>
            </h1>
            <p className="text-base lg:text-lg text-da-silver/80 max-w-3xl">{SITE.summary}</p>
            <p className="text-sm text-da-silver/70">{SITE.focus}</p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link to="/projects" className="pill-cta">
                Project Guide
              </Link>
              <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="pill-ghost">
                Resume PDF
              </a>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {HIGHLIGHT_STATS.map(stat => (
              <div key={stat.label} className="stat-pill">
                <span className="text-da-gold text-xs uppercase tracking-wide">{stat.label}</span>
                <p className="text-lg font-medium text-da-silver">{stat.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="bg-white/2">
          <SectionTitle eyebrow="Signal" title="Current orbit" />
          <ul className="space-y-4 text-sm text-da-silver/80">
            <li>
              <strong className="text-da-silver">Location</strong>
              <p>{SITE.location}</p>
            </li>
            <li>
              <strong className="text-da-silver">Interests</strong>
              <p>Painting, reading philosophy, playing guitar, rock climbing, and weight lifting</p>
            </li>
            <li>
              <strong className="text-da-silver">Availability</strong>
              <p>Open to internships / research roles for Summer 2026</p>
            </li>
          </ul>
        </GlassCard>
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        {CAPABILITIES.map(capability => (
          <GlassCard key={capability.title} className="relative overflow-hidden">
            <h3 className="text-xl font-heading text-da-silver mb-3">{capability.title}</h3>
            <p className="text-sm text-da-silver/80 mb-5">{capability.text}</p>
            <div className="flex flex-wrap gap-2">
              {capability.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </section>

      <section>
        <SectionTitle eyebrow="Projects" title="Active constellations" description="A rotating atlas of systems, labs, and research experiments." />
        <div className="grid lg:grid-cols-2 gap-6">
          {heroProjects.map(project => (
            <Link key={project.slug} to={`/projects/${project.slug}`}>
              <GlassCard className="project-card relative">
                <div className="relative z-10">
                  <div className="flex items-center justify-end text-xs uppercase tracking-[0.3em] text-da-silver/60 mb-3">
                    <span>{project.status}</span>
                  </div>
                  <h3 className="text-2xl font-heading text-da-silver">{project.title}</h3>
                  <p className="text-sm text-da-silver/70 mt-2">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.stack.map(tech => (
                      <span key={tech} className="tag tag-ghost">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="orbital-accent" style={{ background: project.heroColor }} />
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-[2fr,1fr] gap-6">
        <GlassCard>
          <SectionTitle eyebrow="Philosophy" title="Design principles" />
          <ul className="space-y-4 text-da-silver/80">
            {PHILOSOPHY.map(item => (
              <li key={item} className="flex gap-3">
                <span className="text-da-gold mt-1">✦</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard>
          <SectionTitle eyebrow="Signal boost" title="Contact" />
          <div className="space-y-4 text-sm">
            <a className="contact-link" href={`mailto:${SITE.email}`}>
              Email — {SITE.email}
            </a>
            <a className="contact-link" href={SITE.github} target="_blank" rel="noreferrer">
              GitHub — {SITE.github.replace('https://', '')}
            </a>
            <a className="contact-link" href={SITE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn — {SITE.linkedin.replace('https://', '')}
            </a>
          </div>
        </GlassCard>
      </section>
    </motion.div>
  )
}

export default Landing
