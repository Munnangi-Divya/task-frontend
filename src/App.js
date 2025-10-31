
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </div>
  )
}
