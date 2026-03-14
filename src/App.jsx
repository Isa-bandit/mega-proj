import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import Home from './pages/Home'
import Features1 from './pages/Features1'
import Features2 from './pages/Features2'
import TodoList from './pages/TodoList'
import Login from './pages/Login'
import Register from './pages/Register'
import Converter from './pages/Converter'
import './styles/core.css'

function AppContent() {
  const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('js_user')
    return saved ? JSON.parse(saved) : null
  })
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!modalOpen) setModalOpen(true)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('js_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('js_user')
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} onOpenModal={() => setModalOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features1" element={<Features1 />} />
        <Route path="/features2" element={<Features2 />} />
        <Route path="/todo" element={user ? <TodoList user={user} /> : <Navigate to="/login" />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register onLogin={handleLogin} />} />
      </Routes>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
