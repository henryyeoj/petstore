import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
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
