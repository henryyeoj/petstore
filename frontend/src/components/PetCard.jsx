import React, { useState } from 'react'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PetsIcon from '@mui/icons-material/Pets'

const SPECIES_EMOJI = { Dog: '🐶', Cat: '🐱', Bird: '🦜', Fish: '🐟' }

const STATUS_COLORS = {
  AVAILABLE: { bg: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30', dot: 'bg-emerald-500' },
  SOLD:      { bg: 'bg-red-500/15    text-red-700    border-red-500/30',      dot: 'bg-red-500'     },
  RESERVED:  { bg: 'bg-amber-500/15  text-amber-700  border-amber-500/30',    dot: 'bg-amber-500'   },
}

export default function PetCard({ pet, onEdit, onDelete, isAdmin = false }) {
  const [imgErr, setImgErr] = useState(false)
  const sc = STATUS_COLORS[pet.status] ?? STATUS_COLORS.AVAILABLE

  return (
    <article className="glass overflow-hidden flex flex-col group hover:border-[var(--color-accent)]/50 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 fade-in-up">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[var(--color-surface2)]">
        {pet.imageUrl && !imgErr ? (
          <img
            src={pet.imageUrl}
            alt={pet.name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
            {SPECIES_EMOJI[pet.species] ?? '🐾'}
          </div>
        )}

        {/* Status badge */}
        <span className={`absolute top-3 left-3 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} animate-pulse`} />
          {pet.status}
        </span>

        {/* Species emoji overlay */}
        <span className="absolute top-3 right-3 text-xl bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
          {SPECIES_EMOJI[pet.species] ?? '🐾'}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-bold text-lg text-[var(--color-text)] leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {pet.name}
          </h3>
          <p className="text-sm text-[var(--color-muted)] mt-0.5">
            {pet.species}{pet.breed ? ` · ${pet.breed}` : ''}{pet.age != null ? ` · ${pet.age}mo` : ''}
          </p>
        </div>

        {pet.description && (
          <p className="text-sm text-[var(--color-muted)] line-clamp-2 leading-relaxed">{pet.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
          <span className="text-xl font-bold text-[var(--color-accent)]">
            ${parseFloat(pet.price).toFixed(2)}
          </span>

          {isAdmin && (
            <div className="flex gap-1">
              <Tooltip title="Edit" arrow>
                <IconButton size="small" onClick={() => onEdit(pet)}
                  sx={{ color:'var(--color-muted)', '&:hover':{ color:'var(--color-accent)', bgcolor:'rgba(249,115,22,0.1)' } }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton size="small" onClick={() => onDelete(pet.id)}
                  sx={{ color:'var(--color-muted)', '&:hover':{ color:'var(--color-accent2)', bgcolor:'rgba(14,165,233,0.1)' } }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
