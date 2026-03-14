import { useState, useEffect, useRef } from 'react'

export default function Stopwatch() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  const start = () => {
    if (running) return
    intervalRef.current = setInterval(() => setCount(c => c + 1), 1000)
    setRunning(true)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setCount(0)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div className="stopwatch">
      <div className="container">
        <h3>Timer</h3>
        <div className="time">
          <div className="time_block">
            <div className="interval">{count}</div>
          </div>
        </div>
        <div className="time_buttons">
          <button className="btn" onClick={start}>Start</button>
          <button className="btn" onClick={stop}>Stop</button>
          <button className="btn" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  )
}
