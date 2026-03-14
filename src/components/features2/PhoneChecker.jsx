import { useState } from 'react'

const regExp = /^\+996[25793]\d{2}\d{2}\d{2}\d{2}$/

export default function PhoneChecker() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)

  const check = () => setResult(regExp.test(value.trim()) ? 'OK' : 'NOT OK')

  return (
    <div className="phone_block">
      <div className="container">
        <h3>Phone Checker</h3>
        <div className="inner_phone_block">
          <div className="form_phone">
            <label htmlFor="phone_input">Phone Number</label>
            <input
              id="phone_input"
              type="text"
              placeholder="+996 XXX XX-XX-XX"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <button className="btn" onClick={check}>Check number</button>
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
