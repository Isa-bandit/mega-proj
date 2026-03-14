import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../styles/login.css'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const users = JSON.parse(localStorage.getItem('registered_users') || '[]')
    const found = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    )

    if (found) {
      onLogin({ username: found.username, email: found.email })
      navigate('/')
    } else {
      setError('Неверный логин или пароль')
    }
    setLoading(false)
  }

  return (
    <div className="login_page">
      <div className="login_block">
        <div className="login_form_wrapper">
          <h3>Вход в аккаунт</h3>
          <form className="login_form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Входим...' : 'Войти'}
            </button>
            {error && <p className="login_error">{error}</p>}
          </form>
          <p style={{ color: '#888', fontSize: '14px', marginTop: '20px', textAlign: 'center' }}>
            Нет аккаунта?{' '}
            <Link to="/register" style={{ color: 'orange' }}>Зарегистрироваться</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
