import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PetsIcon from '@mui/icons-material/Pets'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

export default function Navbar() {
  const { pathname } = useLocation()

  const navLink = (to, label, Icon) => {
    const active = pathname === to
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${active
            ? 'bg-[#6c63ff] text-white shadow-lg shadow-[#6c63ff]/30'
            : 'text-[#8896ab] hover:text-white hover:bg-[#2a3247]'
          }`}
      >
        <Icon fontSize="small" />
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a3247] backdrop-blur-xl bg-[rgba(13,15,20,0.85)]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#a855f7] flex items-center justify-center shadow-lg shadow-[#6c63ff]/30 group-hover:scale-110 transition-transform">
            <PetsIcon fontSize="small" className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Pet<span className="text-[#6c63ff]">Store</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {navLink('/', 'Gallery', StorefrontIcon)}
          {navLink('/admin', 'Admin', AdminPanelSettingsIcon)}
        </div>
      </nav>
    </header>
  )
}
