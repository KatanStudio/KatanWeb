import { useState, useEffect } from 'react'

export default function Loader() {
  const [phase, setPhase] = useState('enter')  // enter → visible → exit → done

  useEffect(() => {
    const t0 = setTimeout(() => setPhase('visible'), 80)
    const t1 = setTimeout(() => setPhase('exit'), 2000)
    const t2 = setTimeout(() => setPhase('done'), 2800)
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
