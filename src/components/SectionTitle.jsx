const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="flex flex-col gap-2 mb-8">
    {eyebrow && <span className="text-xs uppercase tracking-[0.3em] text-da-gold/80">{eyebrow}</span>}
    <h2 className="text-3xl lg:text-4xl font-heading text-da-silver">{title}</h2>
    {description && <p className="text-sm text-da-silver/70 max-w-2xl">{description}</p>}
  </div>
)

export default SectionTitle
