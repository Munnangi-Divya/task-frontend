
import axios from 'axios'

const BASE = process.env.REACT_APP_API_URL || 'https://task-backend-jpz0.onrender.com/api'

const api = axios.create({
  baseURL: BASE,
  timeout: 15000
})

export async function fetchTasks(params = {}) {
  const r = await api.get('/tasks', { params })
  return r.data
}

export async function createTask(payload) {
  const r = await api.post('/tasks', payload)
  return r.data
}

export async function updateTask(id, payload) {
  const r = await api.patch(`/tasks/${id}`, payload)
  return r.data
}

export async function getInsights() {
  const r = await api.get('/tasks/insights')
  return r.data
}

export default api
