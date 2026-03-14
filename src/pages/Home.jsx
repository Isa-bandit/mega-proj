import { useState } from 'react'
import Footer from '../components/Footer'
import ColorPicker from '../components/home/ColorPicker'
import Slider from '../components/home/Slider'
import '../styles/style.css'

export default function Home() {
  const [titleColor, setTitleColor] = useState('#F79300')

  return (
    <div className="wrapper">
      <div className="main_block" style={{ paddingTop: '160px' }}>
        <div className="container">
          <div className="inner_main">
            <h1>
              <strong style={{ color: titleColor }}>JavaScript</strong> — на самом деле очень легко и просто!
            </h1>
            <ColorPicker onColorSelect={setTitleColor} />
          </div>
        </div>
      </div>
      <Slider />
      <Footer />
    </div>
  )
}
