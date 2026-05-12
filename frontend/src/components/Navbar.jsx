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
            ? 'bg-[var(--color-accent)] text-[var(--color-surface)] shadow-lg shadow-[var(--color-accent)]/30'
            : 'text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface2)]'
          }`}
      >
        <Icon fontSize="small" />
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] backdrop-blur-xl bg-[var(--color-bg)]/85">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent2)] flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/30 group-hover:scale-110 transition-transform">
            <PetsIcon fontSize="small" className="text-[var(--color-surface)]" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Pet<span className="text-[var(--color-accent)]">Store</span>
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
