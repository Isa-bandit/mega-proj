import { useState } from 'react'

export default function Weather() {
  const [city, setCity] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const search = async () => {
    if (!city.trim()) return
    setError('')
    setResult(null)
    const key = '0fa2bc6a87219ed75c6c82d41728c5bc'
    if (!key) {
      setError('API ключ не задан. ')
      return
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=ru`
      )
      const data = await res.json()
      if (data.cod === 200) {
        setResult({
          name: data.name,
          temp: Math.round(data.main.temp - 273),
          feels: Math.round(data.main.feels_like - 273),
          desc: data.weather[0].description,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        })
      } else {
        setError('Город не найден...')
      }
    } catch {
      setError('Ошибка сети.')
    }
  }

  const handleKey = (e) => { if (e.key === 'Enter') search() }

  return (
    <div className="weather">
      <div className="container">
        <h3>Weather</h3>
        <div className="inner_weather">
          <div>
            <input
              type="text"
              className="cityName"
              placeholder="Найти погоду в..."
              value={city}
              onChange={e => setCity(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="btn" onClick={search} style={{ marginTop: '12px' }}>
              Search
            </button>
          </div>
          <div>
            {error && <span style={{ color: 'red' }}>{error}</span>}
            {result && (
              <>
                <span className="city" style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  {result.name}
                </span>
                <hr />
                <span className="temp">{result.temp}°C — {result.desc}</span>
                <span style={{ fontSize: '18px', color: '#aaa' }}>
                  Ощущается как {result.feels}°C · Влажность {result.humidity}% · Ветер {result.wind} м/с
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
