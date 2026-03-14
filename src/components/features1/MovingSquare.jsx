import { useEffect, useRef } from 'react'

export default function MovingSquare() {
  const childRef = useRef(null)
  const parentRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0, dir: 1 })
  const frameRef = useRef(null)

  useEffect(() => {
    const step = () => {
      const parent = parentRef.current
      const child = childRef.current
      if (!parent || !child) return

      const max = parent.offsetWidth - child.offsetWidth
      const { x, y, dir } = posRef.current

      if (dir === 1) {
        if (x < max) { child.style.left = `${x}px`; posRef.current.x++ }
        else posRef.current.dir = 2
      } else if (dir === 2) {
        if (y < max) { child.style.top = `${y}px`; posRef.current.y++ }
        else posRef.current.dir = 3
      } else if (dir === 3) {
        if (x > 0) { child.style.left = `${x}px`; posRef.current.x-- }
        else posRef.current.dir = 4
      } else if (dir === 4) {
        if (y > 0) { child.style.top = `${y}px`; posRef.current.y-- }
        else { posRef.current.dir = 1; posRef.current.y = 0 }
      }

      frameRef.current = setTimeout(step, 1)
    }

    frameRef.current = setTimeout(step, 1)
    return () => clearTimeout(frameRef.current)
  }, [])

  return (
    <div className="move_block">
      <div className="container">
        <h3>Moving Square</h3>
        <div className="inner_move_block">
          <div className="parent_block" ref={parentRef}>
            <div className="child_block" ref={childRef}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
