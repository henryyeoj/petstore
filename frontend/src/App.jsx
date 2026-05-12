import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import GalleryPage from './pages/GalleryPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  console.log('App: Rendering...')
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        <Navbar />
        <Routes>
          <Route path="/"      element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
