import React, { useEffect, useState, useCallback } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import AddIcon from '@mui/icons-material/Add'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PetCard from '../components/PetCard'
import PetModal from '../components/PetModal'
import { petApi } from '../api/petApi'
import { TOKENS } from '../theme/tokens'

export default function AdminPage() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [snack, setSnack] = useState(null)

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await petApi.getAll()
      setPets(data)
    } catch {
      setSnack({ type:'error', msg:'Failed to load pets.' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPets() }, [fetchPets])

  const openAdd = () => { setEditTarget(null); setModalOpen(true) }
  const openEdit = (pet) => { setEditTarget(pet); setModalOpen(true) }

  const handleSave = async (data) => {
    try {
      if (editTarget) {
        await petApi.update(editTarget.id, data)
        setSnack({ type:'success', msg:`${data.name} updated!` })
      } else {
        await petApi.create(data)
        setSnack({ type:'success', msg:`${data.name} added!` })
      }
      fetchPets()
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to save pet.'
      setSnack({ type:'error', msg: errorMsg })
      throw err // Rethrow to let the modal know it failed
    }
  }

  const handleDelete = async () => {
    try {
      await petApi.delete(deleteId)
      setSnack({ type:'success', msg:'Pet deleted.' })
      fetchPets()
    } catch {
      setSnack({ type:'error', msg:'Delete failed.' })
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent2)] flex items-center justify-center">
              <AdminPanelSettingsIcon className="text-[var(--color-surface)]" />
            </div>
            <h1 className="text-3xl font-black" style={{ fontFamily:"'Space Grotesk',sans-serif" }}>
              Admin Panel
            </h1>
          </div>
          <p className="text-[var(--color-muted)]">Manage your pet inventory — create, update, or remove listings.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-[var(--color-surface)] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent2)] hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[var(--color-accent)]/30"
        >
          <AddIcon fontSize="small" />
          Add Pet
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label:'Total Pets',  value: pets.length,                              color: TOKENS.accent },
          { label:'Available',   value: pets.filter(p=>p.status==='AVAILABLE').length, color:'#10b981' },
          { label:'Reserved',    value: pets.filter(p=>p.status==='RESERVED').length,  color:'#f59e0b' },
          { label:'Sold',        value: pets.filter(p=>p.status==='SOLD').length,       color:'#ef4444' },
        ].map(s => (
          <div key={s.label} className="glass p-4">
            <p className="text-[var(--color-muted)] text-xs font-medium uppercase tracking-wider">{s.label}</p>
            <p className="text-3xl font-black mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress sx={{ color: TOKENS.accent }} />
        </div>
      ) : pets.length === 0 ? (
        <div className="glass flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">🐾</span>
          <p className="text-[var(--color-muted)] text-lg mb-4">No pets yet.</p>
          <button onClick={openAdd} className="px-6 py-2.5 rounded-xl bg-[var(--color-accent)] text-[var(--color-surface)] font-semibold hover:opacity-90 transition">
            Add First Pet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pets.map((pet, i) => (
            <div key={pet.id} style={{ animationDelay: `${i * 60}ms` }}>
              <PetCard pet={pet} isAdmin onEdit={openEdit} onDelete={setDeleteId} />
            </div>
          ))}
        </div>
      )}

      {/* Pet Modal */}
      <PetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editTarget}
      />

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}
        PaperProps={{ sx:{ background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:2 } }}>
        <DialogTitle sx={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700 }}>
          ⚠️ Delete Pet?
        </DialogTitle>
        <DialogContent>
          <p className="text-[var(--color-muted)]">This action is permanent and cannot be undone.</p>
        </DialogContent>
        <DialogActions sx={{ p:2, gap:1 }}>
          <Button onClick={() => setDeleteId(null)} variant="outlined" color="inherit" sx={{ borderColor:'var(--color-border)' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!snack} autoHideDuration={3500} onClose={() => setSnack(null)}>
        <Alert severity={snack?.type} onClose={() => setSnack(null)}>{snack?.msg}</Alert>
      </Snackbar>
    </main>
  )
}
