import { memo } from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        'px-4 py-2 text-sm font-medium transition rounded-full relative',
        isActive ? 'text-da-gold bg-white/5 border border-da-gold/40 shadow-[0_0_20px_rgba(191,160,90,0.2)]' : 'text-da-silver/70 hover:text-da-silver'
      ].join(' ')
    }
  >
    {label}
  </NavLink>
)

export default memo(NavItem)
