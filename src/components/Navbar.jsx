import { Link } from 'react-router-dom'
import '../styles/style.css'

export default function Navbar({ user, onLogout, onOpenModal }) {
  return (
    <div className="header">
      <div className="container">
        <div className="inner_header">
          <Link to="/">
            <div className="logotype">
              <h2 style={{ fontSize: '22px', margin: 0 }}>Java<span style={{ color: 'white' }}>Script</span></h2>
            </div>
          </Link>

          <ul className="menu">
            <li className="menu_link"><Link to="/features1">Features 1</Link></li>
            <li className="menu_link"><Link to="/features2">Features 2</Link></li>
            <li className="menu_link"><Link to="/converter">Converter</Link></li>
            {user && <li className="menu_link"><Link to="/todo">Todo List</Link></li>}
            <li className="menu_link">
              <a href="https://t.me/abdrv9" target="_blank" rel="noreferrer">Send Feedback</a>
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user ? (
              <div className="user_badge">
                <span>👤 {user.username}</span>
                <button className="logout_btn" onClick={onLogout}>Log out</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/login">
                  <button className="btn" style={{ width: '100px', height: '40px', fontSize: '15px' }}>Log in</button>
                </Link>
                <Link to="/register">
                  <button className="btn" style={{ width: '110px', height: '40px', fontSize: '15px', background: 'orange', color: 'black', border: 'none' }}>Register</button>
                </Link>
              </div>
            )}
            <button className="btn" onClick={onOpenModal} style={{ width: '120px', height: '40px', fontSize: '15px' }}>
              Click me!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
