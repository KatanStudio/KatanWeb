import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/portfolio', label: 'Proyectos' },
  { to: '/nosotros', label: 'Por qué Katan' },
  { to: '/proceso', label: 'Proceso' },
  { to: '/Faq', label: 'FAQ' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`} id="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="Katan Studio — Inicio">
          <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" className="nav__logo" alt="" aria-hidden="true" />
        </Link>

        <nav className="nav__links" aria-label="Navegación principal">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav__link${isActive(to) ? ' is-active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link to="/contacto" className="btn btn--primary nav__cta">Presupuesto gratis</Link>

        <button
          className={`nav__hamburger${menuOpen ? ' is-open' : ''}`}
          aria-label="Menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav__hamburger-lines"><span></span><span></span></span>
          <span className="nav__hamburger-label">{menuOpen ? 'Cerrar' : 'Menú'}</span>
        </button>
      </div>

      <div className={`nav__mobile${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav__mobile-link${isActive(to) ? ' is-active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/contacto"
          className="btn btn--primary"
          style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}
        >
          Presupuesto gratis
        </Link>
      </div>
    </header>
  )
}
