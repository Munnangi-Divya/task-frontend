
import React, { useEffect, useState } from 'react'
import { fetchTasks, createTask, updateTask, getInsights } from '../api/api'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import InsightsPanel from '../components/InsightPanel'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ sort: 'dueAsc' })

  async function load() {
    setLoading(true)
    try {
      const t = await fetchTasks(filters)
      setTasks(Array.isArray(t) ? t : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function fetchIns() {
    try {
      const r = await getInsights()
      setInsights(r)
    } catch (e) {
      setInsights(null)
    }
  }

  useEffect(() => {
    
    fetchIns()
  }, [filters])

  async function handleCreate(payload) {
    const res = await createTask(payload)
    if (res && res._id) {
      setTasks(prev => [res, ...prev])
      fetchIns()
    } else {
      alert(res.error || 'Could not create')
    }
  }

  async function toggleStatus(t) {
    const next = t.status === 'Done' ? 'Todo' : 'Done'
    const upd = await updateTask(t._id, { status: next })
    setTasks(prev => prev.map(p => p._id === upd._id ? upd : p))
    fetchIns()
  }

  return (
    <main className="container">
      <div className="header-row">
        <h1 className="title">Tasks</h1>
        <div className="controls">
          <label className="label">
            Status
            <select onChange={e => setFilters(f => ({ ...f, status: e.target.value || undefined }))}>
              <option value="">All</option>
              <option value="Todo">Todo</option>
              <option value="InProgress">InProgress</option>
              <option value="Done">Done</option>
            </select>
          </label>

          <label className="label">
            Priority
            <select onChange={e => setFilters(f => ({ ...f, priority: e.target.value || undefined }))}>
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>

          <button className="btn" onClick={load}>Refresh</button>
        </div>
      </div>

      <div className="main-grid">
        <div className="left-col">
          <TaskForm onCreate={handleCreate} />
          <TaskList tasks={tasks} onToggle={toggleStatus} loading={loading} />
        </div>
        <div className="right-col">
          <InsightsPanel insights={insights} />
        </div>
      </div>
    </main>
  )
}
