import { useState, useEffect } from 'react'

// Using dummyjson.com/quotes — free, no key, always online
export default function RandomQuotes() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const randomId = Math.floor(Math.random() * 100) + 1
      const res = await fetch(`https://dummyjson.com/quotes/${randomId}`)
      const data = await res.json()
      setQuote({ content: data.quote, author: data.author })
    } catch {
      setQuote({ content: 'Could not load quote.', author: '' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchQuote() }, [])

  return (
    <div style={{ background: 'black', padding: '100px 0' }}>
      <div className="container">
        <h3>Random Quote</h3>
        <div style={{
          marginTop: '50px',
          border: '1px solid orange',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        }}>
          {loading ? (
            <p style={{ color: 'white', fontSize: '22px' }}>Loading...</p>
          ) : quote ? (
            <>
              <p style={{ color: 'white', fontSize: '22px', fontStyle: 'italic', maxWidth: '700px' }}>
                &ldquo;{quote.content}&rdquo;
              </p>
              <p style={{ color: 'orange', fontSize: '18px' }}>— {quote.author}</p>
            </>
          ) : null}
          <button className="btn" onClick={fetchQuote} style={{ marginTop: '10px' }}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  )
}
