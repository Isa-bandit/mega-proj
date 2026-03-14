import { useState, useEffect } from 'react'

const SLIDES = [
  {
    title: 'Regular Expression',
    text: 'Простыми словами, регулярное выражение — это набор символов, который задаёт правила для поиска и сопоставления текста.',
    link: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions',
  },
  {
    title: 'Recursion',
    text: 'Рекурсия — это когда функция вызывает саму себя для решения задачи, пока не достигнет условия выхода.',
    link: 'https://learn.javascript.ru/recursion',
  },
  {
    title: 'JSON',
    text: 'JSON — способ представления данных в виде текста, чтобы они могли легко использоваться различными программами.',
    link: 'https://developer.mozilla.org/ru/docs/Learn/JavaScript/Objects/JSON',
  },
  {
    title: 'Event Loop',
    text: 'Event loop похож на дежурного, который непрерывно проверяет, произошло ли событие, и реагирует на него.',
    link: 'https://highload.today/kak-ustroen-event-loop-v-javascript-parallelnaya-model-i-tsikl-sobytij/',
  },
]

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex(i => (i + 1) % SLIDES.length)
    }, 10000)
    return () => clearInterval(id)
  }, [])

  const prev = () => setSlideIndex(i => (i > 0 ? i - 1 : SLIDES.length - 1))
  const next = () => setSlideIndex(i => (i < SLIDES.length - 1 ? i + 1 : 0))

  return (
    <div className="slider_block">
      <div className="container">
        <div className="inner_slider">
          <div className="slider">
            <button className="btn-slide" onClick={prev}>&lt;prev</button>
            {SLIDES.map((slide, i) => (
              <div key={i} className={`slide ${i === slideIndex ? 'active_slide' : ''}`}>
                <div className="slide_card">
                  <h3>{slide.title}</h3>
                  <p>{slide.text}</p>
                  <a href={slide.link} target="_blank" rel="noreferrer">узнать подробнее</a>
                </div>
              </div>
            ))}
            <button className="btn-slide" onClick={next}>next&gt;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
