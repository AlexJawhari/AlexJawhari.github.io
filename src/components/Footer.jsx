import { SITE } from '../data/siteData'

function Footer() {
  return (
    <footer className="py-10 text-center text-xs text-da-silver/60">
      © {new Date().getFullYear()} {SITE.name}. Crafted with orbitals, cards, and deliberate code.
    </footer>
  )
}

export default Footer
