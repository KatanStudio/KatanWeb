import { useState, useEffect } from 'react'

// Duración total del splash: 0,9 s. El fundido de salida (DONE_AT - EXIT_AT)
// debe coincidir con la transition de .loader en loader.css (400ms)
const VISIBLE_AT = 80
const EXIT_AT = 500
const DONE_AT = 900

export default function Loader() {
  const [phase, setPhase] = useState('enter')  // enter → visible → exit → done

  useEffect(() => {
    const t0 = setTimeout(() => setPhase('visible'), VISIBLE_AT)
    const t1 = setTimeout(() => setPhase('exit'), EXIT_AT)
    const t2 = setTimeout(() => setPhase('done'), DONE_AT)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`loader${phase === 'exit' ? ' loader--exit' : ''}`} aria-hidden="true">
      <div className={`loader__content${phase !== 'enter' ? ' loader__content--visible' : ''}`}>
        <img
          src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg"
          alt=""
          className="loader__logo"
        />
        <div className="loader__dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}
