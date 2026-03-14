import { useState, useEffect } from 'react'

export default function CardSwitcher() {
  const [count, setCount] = useState(1)
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCard = async (id) => {
    setLoading(true)
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      const data = await res.json()
      setCard(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCard(1) }, [])

  const prev = () => {
    const next = count === 1 ? 200 : count - 1
    setCount(next)
    fetchCard(next)
  }

  const next = () => {
    const next = count === 200 ? 1 : count + 1
    setCount(next)
    fetchCard(next)
  }

  return (
    <div className="card_switcher">
      <div className="container">
        <h3>Card Switcher</h3>
        <div className="inner_card_switcher">
          <button className="btn" onClick={prev}>prev</button>
          <div className="card">
            {loading ? (
              <p>Loading...</p>
            ) : card ? (
              <>
                <p>{card.title}</p>
                <p style={{ color: card.completed ? 'green' : 'red' }}>
                  {card.completed ? 'Completed' : 'Not completed'}
                </p>
                <span>#{card.id}</span>
              </>
            ) : null}
          </div>
          <button className="btn" onClick={next}>next</button>
        </div>
      </div>
    </div>
  )
}
