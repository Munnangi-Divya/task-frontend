import React, { useState } from 'react'

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [due, setDue] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) return alert('Title required')
    onCreate({ title: title.trim(), description: desc, priority, dueDate: due || null })
    setTitle(''); setDesc(''); setPriority('Medium'); setDue('')
  }

  return (
    <form className="card task-form" onSubmit={submit}>
      <div className="form-row">
        <input
          className="input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title"
          autoComplete="off"
        />
        <select className="select" value={priority} onChange={e => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <textarea
        className="textarea"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="Short description (optional)"
      />

      <div className="form-row">
        <input className="input" type="date" value={due} onChange={e => setDue(e.target.value)} />
        <button className="btn primary" type="submit">Add Task</button>
      </div>
    </form>
  )
}
