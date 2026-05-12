import React, { useEffect, useState, useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import PetCard from '../components/PetCard'
import { petApi } from '../api/petApi'
import FilterListIcon from '@mui/icons-material/FilterList'
import PetsIcon from '@mui/icons-material/Pets'

const SPECIES = ['All','Dog','Cat','Bird','Fish']
const STATUSES = ['All','AVAILABLE','SOLD','RESERVED']

export default function GalleryPage() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [species, setSpecies] = useState('All')
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [snack, setSnack] = useState(null)

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true)
      const params = {}
      if (species !== 'All') params.species = species
      if (status  !== 'All') params.status  = status
      const { data } = await petApi.getAll(params)
      setPets(data)
    } catch {
      setSnack({ type:'error', msg:'Failed to load pets. Is the backend running?' })
    } finally {
      setLoading(false)
    }
  }, [species, status])

  useEffect(() => { fetchPets() }, [fetchPets])

  const filtered = pets.filter(p =>
    search === '' ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.breed ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#6c63ff]/10 border border-[#6c63ff]/20 rounded-full px-4 py-1.5 text-sm text-[#6c63ff] font-medium mb-4">
          <PetsIcon fontSize="small" /> Find Your Perfect Companion
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-4" style={{ fontFamily:"'Space Grotesk',sans-serif" }}>
          Pet <span className="bg-gradient-to-r from-[#6c63ff] to-[#a855f7] bg-clip-text text-transparent">Gallery</span>
        </h1>
        <p className="text-[#8896ab] text-lg max-w-xl mx-auto">
          Browse our curated selection of lovable pets — dogs, cats, birds &amp; fish — ready to join your family.
        </p>
      </section>

      {/* Filters */}
      <section className="glass p-5 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <FilterListIcon className="text-[#8896ab]" />

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or breed…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-0 bg-[#0d0f14] border border-[#2a3247] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#6c63ff] transition-colors"
        />

        {/* Species pills */}
        <div className="flex gap-2 flex-wrap">
          {SPECIES.map(s => (
            <button key={s} onClick={() => setSpecies(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                ${species === s
                  ? 'bg-[#6c63ff] border-[#6c63ff] text-white shadow-lg shadow-[#6c63ff]/30'
                  : 'bg-transparent border-[#2a3247] text-[#8896ab] hover:border-[#6c63ff] hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Status pills */}
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                ${status === s
                  ? 'bg-[#a855f7] border-[#a855f7] text-white shadow-lg shadow-[#a855f7]/30'
                  : 'bg-transparent border-[#2a3247] text-[#8896ab] hover:border-[#a855f7] hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <p className="text-sm text-[#8896ab] mb-6">
        Showing <span className="text-white font-semibold">{filtered.length}</span> pet{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress sx={{ color:'#6c63ff' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">🐾</span>
          <p className="text-[#8896ab] text-lg">No pets found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((pet, i) => (
            <div key={pet.id} style={{ animationDelay: `${i * 60}ms` }}>
              <PetCard pet={pet} isAdmin={false} />
            </div>
          ))}
        </div>
      )}

      <Snackbar open={!!snack} autoHideDuration={4000} onClose={() => setSnack(null)}>
        <Alert severity={snack?.type} onClose={() => setSnack(null)}>{snack?.msg}</Alert>
      </Snackbar>
    </main>
  )
}
