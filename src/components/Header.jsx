import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/nosotros', label: 'Por qué Katan' },
  { to: '/proceso', label: 'Proceso' },
  { to: '/contacto', label: 'Contacto' },
]

const KatanLogo = () => (
  <svg className="nav__logo" width="36" height="36" viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <path d="M0 0 H96 V82 L82 96 H0 Z" fill="#1E1E2A" />
    <path d="M82 96 L96 82" stroke="#FF0080" strokeWidth="2.5" />
    <rect x="26" y="22" width="7" height="52" fill="#F0F4F8" />
    <path d="M33 48 L63 22 H72 L42 48 Z" fill="#F0F4F8" />
    <path d="M33 48 L63 74 H72 L42 48 Z" fill="#F0F4F8" />
    <circle cx="33" cy="48" r="3.5" fill="#FF0080" />
  </svg>
)

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
  }, [location.pathname])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`} id="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="Katan Studio — Inicio">
          <KatanLogo />
          <span className="nav__wordmark">katan</span>
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
          <span></span><span></span>
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
