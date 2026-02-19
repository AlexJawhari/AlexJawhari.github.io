import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SECTION_VARIANTS } from '../config/animationConfig'
import { PROJECTS } from '../data/projectsData'
import GlassCard from '../components/GlassCard'

function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find(item => item.slug === slug)

  if (!project) {
    return (
      <GlassCard className="mt-10">
        <p>Project not found.</p>
        <button className="pill-cta mt-4" onClick={() => navigate('/projects')}>
          Back to projects
        </button>
      </GlassCard>
    )
  }

  return (
    <motion.div variants={SECTION_VARIANTS} initial="hidden" animate="visible" className="space-y-10">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 blur-3xl" style={{ background: project.heroColor }} />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-da-silver/60 flex justify-end mb-4">
            <span>{project.status}</span>
          </div>
          <h1 className="text-4xl font-heading text-da-silver">{project.title}</h1>
          <p className="text-da-silver/70 text-base mt-4 max-w-3xl">{project.narrative}</p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <a href={project.repo} target="_blank" rel="noreferrer" className="pill-cta">
              View repository
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pill-cta">
                View live site
              </a>
            )}
            <button onClick={() => navigate(-1)} className="pill-ghost">
              Back
            </button>
          </div>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xl font-heading text-da-silver mb-4">Highlights</h3>
          <ul className="space-y-3 text-sm text-da-silver/80">
            {project.highlights.map(item => (
              <li key={item} className="flex gap-3">
                <span className="text-da-gold mt-1">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard>
          <h3 className="text-xl font-heading text-da-silver mb-4">Tech / tooling</h3>
          <div className="flex flex-wrap gap-3">
            {project.stack.map(item => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}

export default ProjectDetail
