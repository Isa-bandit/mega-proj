import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../styles/login.css'

export default function Register({ onLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Пароли не совпадают')
      return
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов')
      return
    }

    const users = JSON.parse(localStorage.getItem('registered_users') || '[]')

    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      setError('Пользователь с таким логином уже существует')
      return
    }
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError('Этот email уже зарегистрирован')
      return
    }

    const newUser = { username, email, password }
    users.push(newUser)
    localStorage.setItem('registered_users', JSON.stringify(users))

    onLogin({ username, email })
    navigate('/')
  }

  return (
    <div className="login_page">
      <div className="login_block">
        <div className="login_form_wrapper">
          <h3>Регистрация</h3>
          <form className="login_form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль (мин. 6 символов)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
            <button className="btn" type="submit">
              Зарегистрироваться
            </button>
            {error && <p className="login_error">{error}</p>}
          </form>
          <p style={{ color: '#888', fontSize: '14px', marginTop: '20px', textAlign: 'center' }}>
            Уже есть аккаунт?{' '}
            <Link to="/login" style={{ color: 'orange' }}>Войти</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
