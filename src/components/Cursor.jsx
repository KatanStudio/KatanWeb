import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let x = 0, y = 0
    let rx = 0, ry = 0
    let raf
    let hovering = false

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
    }

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
      rx += (x - rx) * 0.1
      ry += (y - ry) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      hovering = true
      ringRef.current?.classList.add('is-hover')
      dotRef.current?.classList.add('is-hover')
    }
    const onLeave = () => {
      hovering = false
      ringRef.current?.classList.remove('is-hover')
      dotRef.current?.classList.remove('is-hover')
    }

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    addListeners()

    // Re-scan after navigation (SPA)
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
