import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SECTION_VARIANTS } from '../config/animationConfig'
import { PROJECTS } from '../data/projectsData'
import GlassCard from '../components/GlassCard'
import SectionTitle from '../components/SectionTitle'

function ProjectsPage() {
  const categories = useMemo(() => [
    { id: 'featured', label: 'Featured' },
    { id: 'automation', label: 'Automation' },
    { id: 'academic', label: 'Academic' }
  ], [])
  const [activeCategory, setActiveCategory] = useState('featured')
  const filtered = PROJECTS.filter(project => project.category === activeCategory)

  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-8">
      <GlassCard>
        <SectionTitle eyebrow="Projects" title="Project guide" description="Filter by category." />
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`tab ${id === activeCategory ? 'tab-active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <motion.div key={project.slug} layout variants={SECTION_VARIANTS} initial="hidden" animate="visible" exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }}>
                <Link to={`/projects/${project.slug}`}>
                  <GlassCard className="project-tile">
                    <div className="text-xs uppercase tracking-[0.3em] text-da-silver/60 flex justify-end mb-1">
                      <span>{project.status}</span>
                    </div>
                    <h3 className="text-2xl font-heading text-da-silver mt-3">{project.title}</h3>
                    <p className="text-sm text-da-silver/70 mt-2">{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.stack.map(tech => (
                        <span key={tech} className="tag tag-ghost">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </GlassCard>
    </motion.div>
  )
}

export default ProjectsPage
