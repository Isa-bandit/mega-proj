import { useState, useEffect, useRef } from 'react'

const TABS = [
  {
    label: 'Делегирование событий',
    title: 'Делегирование событий',
    text: 'В JavaScript делегирование событий — это когда мы используем один обработчик для группы элементов вместо отдельного на каждый элемент.',
  },
  {
    label: 'Class List',
    title: 'classList',
    text: 'classList — свойство, которое позволяет работать с классами элемента HTML: добавлять, удалять или проверять наличие классов.',
  },
  {
    label: 'add()',
    title: 'add()',
    text: 'Метод add позволяет добавить новый класс к списку классов элемента. Например, element.classList.add("new-class").',
  },
  {
    label: 'remove()',
    title: 'remove()',
    text: 'Метод remove позволяет удалить класс из списка классов элемента. Например, element.classList.remove("old-class").',
  },
  {
    label: 'contains()',
    title: 'contains()',
    text: 'Метод contains проверяет, содержит ли элемент определённый класс. Возвращает true или false.',
  },
]

export default function TabSlider() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef(null)

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActive(i => (i + 1) % TABS.length)
    }, 3000)
  }

  useEffect(() => {
    startAutoPlay()
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleTab = (i) => {
    clearInterval(intervalRef.current)
    setActive(i)
    startAutoPlay()
  }

  return (
    <div className="tab_slider">
      <div className="container">
        <h3>Tab Slider</h3>
        <div className="tab_contents_block">
          <div className="tab_content_block">
            <h4>{TABS[active].title}</h4>
            <p>{TABS[active].text}</p>
          </div>
          <div className="tab_content_items">
            {TABS.map((tab, i) => (
              <div
                key={i}
                className={`tab_content_item ${i === active ? 'tab_content_item_active' : ''}`}
                onClick={() => handleTab(i)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
