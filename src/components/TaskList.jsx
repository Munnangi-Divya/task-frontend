import React from 'react'

function TaskItem({ t, onToggle }) {
  const due = t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No due'
  return (
    <div className={`task-item ${t.priority.toLowerCase()}`}>
      <div className="task-main">
        <h4 className="task-title">{t.title}</h4>
        <div className="task-desc">{t.description}</div>
        <div className="task-meta">
          <span className="chip">{t.priority}</span>
          <span className="status">{t.status}</span>
          <span className="due">{due}</span>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn" onClick={() => onToggle(t)}>
          {t.status === 'Done' ? 'Mark Todo' : 'Mark Done'}
        </button>
      </div>
    </div>
  )
}

export default function TaskList({ tasks, onToggle, loading }) {
  if (loading) return <div className="center muted">Loading...</div>
  if (!tasks || tasks.length === 0) return <div className="center muted">No tasks yet</div>

  return (
    <div className="task-list">
      {tasks.map(t => <TaskItem key={t._id} t={t} onToggle={onToggle} />)}
    </div>
  )
}
