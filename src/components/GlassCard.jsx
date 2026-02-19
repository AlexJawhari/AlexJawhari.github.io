import { memo } from 'react'

const GlassCard = ({ children, className = '' }) => (
  <div className={`glass-panel border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden ${className}`}>
    {children}
  </div>
)

export default memo(GlassCard)
