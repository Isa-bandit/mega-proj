import { useState } from 'react'

const regExp = /^[a-z0-9]+@gmail\.com$/i

export default function GmailChecker() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)

  const check = () => setResult(regExp.test(value) ? 'OK' : 'NOT OK')

  return (
    <div className="gmail_block">
      <div className="container">
        <h3>Gmail Checker</h3>
        <div className="inner_gmail_block">
          <div className="form_gmail">
            <input
              type="text"
              placeholder="your gmail"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <button className="btn" onClick={check}>Check gmail</button>
            {result && (
              <span className="checker" style={{ color: result === 'OK' ? 'green' : 'red' }}>
                {result}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
