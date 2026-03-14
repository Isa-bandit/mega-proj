import { useState } from 'react'

export default function Modal({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  if (!isOpen) return null

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Спасибо, ${name}! Мы перезвоним на ${phone}`)
    setName('')
    setPhone('')
    onClose()
  }

  return (
    <div className="modal" onClick={handleBackdrop}>
      <div className="modal_dialog">
        <div className="modal_content">
          <form onSubmit={handleSubmit}>
            <div className="modal_close" onClick={onClose}>&times;</div>
            <div className="modal_title">Мы свяжемся с вами как можно быстрее!</div>
            <input
              required
              placeholder="Ваше имя"
              type="text"
              className="modal_input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              required
              placeholder="Ваш номер телефона"
              type="text"
              className="modal_input"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <button type="submit" className="btn btn_dark btn_min" style={{ marginTop: '14px' }}>
              Перезвонить мне
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
