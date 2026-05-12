import axios from 'axios'

const api = axios.create({
  // If VITE_API_URL is set (e.g. on Render), use it and append /api
  // Otherwise, use /api (which works with Vite proxy in local dev)
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api` 
    : '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const petApi = {
  getAll:   (params) => api.get('/pets', { params }),
  getById:  (id)     => api.get(`/pets/${id}`),
  create:   (data)   => api.post('/pets', data),
  update:   (id, data) => api.put(`/pets/${id}`, data),
  delete:   (id)     => api.delete(`/pets/${id}`),
}

export default api
