import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import '../styles/todo.css'

export default function TodoList({ user }) {
  const storageKey = `todos_${user.username}`

  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem(storageKey) || '[]')
  })
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos))
  }, [todos, storageKey])

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed))
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = (id) => {
    if (!editText.trim()) return
    setTodos(todos.map(t => t.id === id ? { ...t, text: editText.trim() } : t))
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const handleEditKey = (e, id) => {
    if (e.key === 'Enter') saveEdit(id)
    if (e.key === 'Escape') cancelEdit()
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') addTodo()
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const remaining = todos.filter(t => !t.completed).length

  return (
    <div className="todo_page">
      <div className="todo_block">
        <div className="container">
          <h3>Todo List</h3>
          <p className="todo_user">👤 {user.username}</p>

          <div className="todo_input_row">
            <input
              type="text"
              placeholder="Добавить задачу..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="todo_input"
            />
            <button className="btn todo_add_btn" onClick={addTodo}>Add</button>
          </div>

          <div className="todo_filters">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                className={`todo_filter_btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
              </button>
            ))}
          </div>

          <ul className="todo_list">
            {filtered.length === 0 && (
              <li className="todo_empty">Список пуст</li>
            )}
            {filtered.map(todo => (
              <li key={todo.id} className={`todo_item ${todo.completed ? 'completed' : ''}`}>
                {editingId === todo.id ? (
                  <>
                    <input
                      className="todo_edit_input"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => handleEditKey(e, todo.id)}
                      autoFocus
                    />
                    <button className="todo_save_btn" onClick={() => saveEdit(todo.id)}>✔</button>
                    <button className="todo_cancel_btn" onClick={cancelEdit}>✕</button>
                  </>
                ) : (
                  <>
                    <span className="todo_checkbox" onClick={() => toggleTodo(todo.id)}>
                      {todo.completed ? '✅' : '⬜'}
                    </span>
                    <span className="todo_text" onClick={() => toggleTodo(todo.id)}>
                      {todo.text}
                    </span>
                    <button className="todo_edit_btn" onClick={() => startEdit(todo)}>✏</button>
                    <button className="todo_delete" onClick={() => deleteTodo(todo.id)}>✕</button>
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="todo_footer_bar">
            <span style={{ color: '#888' }}>{remaining} задач осталось</span>
            {todos.some(t => t.completed) && (
              <button className="todo_clear_btn" onClick={clearCompleted}>
                Очистить выполненные
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}