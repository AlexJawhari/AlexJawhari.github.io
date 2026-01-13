import NavItem from './NavItem'
import { SITE } from '../data/siteData'

function Header() {
  return (
    <header className="relative z-20">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-da-silver font-heading text-xl">{SITE.name}</span>
          <p className="text-xs text-da-silver/60 tracking-[0.4em] uppercase">Software engineer</p>
        </div>
        <nav className="flex flex-wrap gap-2">
          <NavItem to="/" label="Landing" />
          <NavItem to="/about" label="About" />
          <NavItem to="/projects" label="Projects" />
          <NavItem to="/resume" label="Resume" />
          <NavItem to="/contact" label="Contact" />
        </nav>
      </div>
    </header>
  )
}

export default Header
