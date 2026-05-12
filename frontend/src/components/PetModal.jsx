import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: { mode: 'dark', primary: { main: '#6c63ff' } },
  components: {
    MuiDialog:        { styleOverrides: { paper: { background: '#161b26', border: '1px solid #2a3247', borderRadius: 12 } } },
    MuiInputBase:     { styleOverrides: { root: { fontSize: 14 } } },
    MuiOutlinedInput: { styleOverrides: { notchedOutline: { borderColor: '#2a3247' } } },
  },
})

const EMPTY = { name:'', species:'Dog', breed:'', age:'', price:'', description:'', imageUrl:'', status:'AVAILABLE' }

export default function PetModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initial ? { ...EMPTY, ...initial } : EMPTY)
    setErrors({})
  }, [initial, open])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.price)        e.price = 'Price is required'
    else if (Number(form.price) <= 0) e.price = 'Price must be positive'
    return e
  }

  const handleSave = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaving(true)
    try {
      await onSave({ ...form, age: form.age === '' ? null : Number(form.age), price: Number(form.price) })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
          {initial ? '✏️ Edit Pet' : '➕ Add New Pet'}
        </DialogTitle>
        <DialogContent dividers sx={{ display:'flex', flexDirection:'column', gap:2, pt:2 }}>
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Name *" value={form.name} onChange={set('name')}
              error={!!errors.name} helperText={errors.name} fullWidth />
            <TextField label="Species *" value={form.species} onChange={set('species')} select fullWidth>
              {['Dog','Cat','Bird','Fish'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField label="Breed" value={form.breed} onChange={set('breed')} fullWidth />
            <TextField label="Age (months)" type="number" value={form.age} onChange={set('age')} fullWidth
              inputProps={{ min:0 }} />
            <TextField label="Price ($) *" type="number" value={form.price} onChange={set('price')}
              error={!!errors.price} helperText={errors.price} fullWidth inputProps={{ min:0, step:'0.01' }} />
            <TextField label="Status" value={form.status} onChange={set('status')} select fullWidth>
              {['AVAILABLE','SOLD','RESERVED'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </div>
          <TextField label="Image URL" value={form.imageUrl} onChange={set('imageUrl')} fullWidth />
          <TextField label="Description" value={form.description} onChange={set('description')}
            multiline rows={3} fullWidth />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderColor:'#2a3247' }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary" disabled={saving}
            startIcon={saving ? <CircularProgress size={14} color="inherit" /> : null}>
            {saving ? 'Saving…' : 'Save Pet'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}
