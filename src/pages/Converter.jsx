import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import ConverterForm from '../components/converter/ConverterForm'
import '../styles/converter.css'

export default function Converter() {
  const [rates, setRates] = useState(null)
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('KGS')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')

  useEffect(() => {
    const key = '0cb5d1a5b98040dc929607b4'
    if (!key) {
      setError('API ключ не задан. Смотри API_INSTRUCTIONS.md')
      setLoading(false)
      return
    }
    fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`)
      .then(r => r.json())
      .then(data => {
        if (data.result === 'success') {
          setRates(data.conversion_rates)
          setLastUpdate(data.time_last_update_utc?.split(' 00:')[0] || '')
        } else {
          setError('Ошибка загрузки курсов. Проверь API ключ.')
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Ошибка сети.')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!rates || !amount) { setResult(null); return }
    const inUSD = amount / rates[from]
    const converted = inUSD * rates[to]
    setResult(converted.toFixed(4))
  }, [rates, amount, from, to])

  const swap = () => { setFrom(to); setTo(from) }

  return (
    <div className="converter_page">
      <div className="converter_block" style={{ paddingTop: '140px' }}>
        <div className="container">
          <h3>Currency Converter</h3>
          {loading ? (
            <p style={{ color: 'white', textAlign: 'center', marginTop: '40px', fontSize: '22px' }}>
              Loading rates...
            </p>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '40px', fontSize: '20px' }}>
              {error}
            </p>
          ) : (
            <ConverterForm
              rates={rates}
              amount={amount}
              from={from}
              to={to}
              result={result}
              lastUpdate={lastUpdate}
              onAmountChange={setAmount}
              onFromChange={setFrom}
              onToChange={setTo}
              onSwap={swap}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
