import { useEffect, useRef } from 'react'

const TRAIL = 28
const EDGE = '255, 0, 128'   // --edge rosa
const SPARK = '0, 229, 255'  // --spark cian

export default function Cursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const trail = []
    let mx = -999, my = -999
    let raf

    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      trail.unshift({ x: mx, y: my })
      if (trail.length > TRAIL) trail.pop()

      if (trail.length < 2) {
        raf = requestAnimationFrame(draw)
        return
      }

      // Cola degradada de la punta al final
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = 1 - i / trail.length          // 0 = cola, 1 = punta
        const r = t * 5 + 1
        const alpha = t * 0.55

        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${EDGE}, ${alpha})`
        ctx.fill()
      }

      // Destello principal en la punta
      const { x, y } = trail[0]

      // Halo exterior — ilumina el contenido debajo
      const halo = ctx.createRadialGradient(x, y, 0, x, y, 72)
      halo.addColorStop(0,   `rgba(${SPARK}, 0.18)`)
      halo.addColorStop(0.5, `rgba(${EDGE},  0.08)`)
      halo.addColorStop(1,   `rgba(${EDGE},  0)`)
      ctx.beginPath()
      ctx.arc(x, y, 72, 0, Math.PI * 2)
      ctx.fillStyle = halo
      ctx.fill()

      // Núcleo blanco brillante
      const core = ctx.createRadialGradient(x, y, 0, x, y, 14)
      core.addColorStop(0,   'rgba(255, 255, 255, 1)')
      core.addColorStop(0.3, `rgba(${SPARK}, 0.85)`)
      core.addColorStop(0.7, `rgba(${EDGE},  0.4)`)
      core.addColorStop(1,   `rgba(${EDGE},  0)`)
      ctx.beginPath()
      ctx.arc(x, y, 14, 0, Math.PI * 2)
      ctx.fillStyle = core
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="cursor-canvas"
      aria-hidden="true"
    />
  )
}
