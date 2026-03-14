import { useState, useEffect, useCallback } from 'react'

const generateRandomColor = () => {
  const hex = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) color += hex[Math.floor(Math.random() * 16)]
  return '#' + color
}

export default function ColorPicker({ onColorSelect }) {
  const [colors, setColors] = useState(['#FF5733', '#33FF57', '#3357FF', '#FF33F5'])

  const randomizeColors = useCallback(() => {
    setColors([
      generateRandomColor(),
      generateRandomColor(),
      generateRandomColor(),
      generateRandomColor(),
    ])
  }, [])

  useEffect(() => {
    randomizeColors()
    const handleKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        randomizeColors()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [randomizeColors])

  return (
    <div className="colors-buttons">
      {colors.map((color, i) => (
        <button
          key={i}
          className="btn btn-color"
          style={{ background: color }}
          onClick={() => onColorSelect(color)}
        >
          {color}
        </button>
      ))}
    </div>
  )
}
