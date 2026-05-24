import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NAV_SECTIONS = [
  { id: 'inicio',    label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'portfolio', label: 'Proyectos' },
  { id: 'nosotros',  label: 'Por qué Katan' },
  { id: 'proceso',   label: 'Proceso' },
  { id: 'faq',       label: 'FAQ' },
  { id: 'contacto',  label: 'Contacto' },
]

const TABBAR_LINKS = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" />
        <path d="M9 21V13h6v8" />
      </svg>
    ),
  },
  {
    id: 'servicios',
    label: 'Servicios',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'portfolio',
    label: 'Proyectos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'nosotros',
    label: 'Nosotros',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'proceso',
    label: 'Proceso',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const location = useLocation()
  const isMainPage = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMainPage) return

    const sectionIds = NAV_SECTIONS.map(s => s.id)
    const navHeight = 80

    const handleScroll = () => {
      const scrollY = window.scrollY + navHeight + 40

      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMainPage, location.pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleNavClick = (e, id) => {
    setMenuOpen(false)
    if (isMainPage) {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getHref = (id) => isMainPage ? `#${id}` : `/#${id}`
  const isActive = (id) => isMainPage ? activeSection === id : false

  return (
    <>
      {/* Desktop + Tablet */}
      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`} id="nav">
        <div className="nav__inner">
          <a href={getHref('inicio')} className="nav__brand" aria-label="Katan Studio — Inicio" onClick={(e) => handleNavClick(e, 'inicio')}>
            <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" className="nav__logo" alt="" aria-hidden="true" />
          </a>

          <nav className="nav__links" aria-label="Navegación principal">
            {NAV_SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={getHref(id)}
                className={`nav__link${isActive(id) ? ' is-active' : ''}`}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href={getHref('contacto')}
            className="btn btn--primary nav__cta"
            onClick={(e) => handleNavClick(e, 'contacto')}
          >
            Presupuesto gratis
          </a>

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
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={getHref(id)}
              className={`nav__mobile-link${isActive(id) ? ' is-active' : ''}`}
              onClick={(e) => handleNavClick(e, id)}
            >
              {label}
            </a>
          ))}
          <a
            href={getHref('contacto')}
            className="btn btn--primary"
            style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}
            onClick={(e) => handleNavClick(e, 'contacto')}
          >
            Presupuesto gratis
          </a>
        </div>
      </header>

      {/* Móvil: barra superior slim */}
      <header className={`nav nav--mobile-top${scrolled ? ' nav--scrolled' : ''}`} aria-hidden="true">
        <div className="nav__inner">
          <a href={getHref('inicio')} className="nav__brand" tabIndex={-1} onClick={(e) => handleNavClick(e, 'inicio')}>
            <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" className="nav__logo" alt="" aria-hidden="true" />
          </a>
          <a
            href={getHref('contacto')}
            className="btn btn--primary nav__cta--mobile-top"
            tabIndex={-1}
            onClick={(e) => handleNavClick(e, 'contacto')}
          >
            Presupuesto gratis
          </a>
        </div>
      </header>

      {/* Móvil: tab bar inferior */}
      <nav className="tabbar" aria-label="Navegación principal">
        <ul className="tabbar__list">
          {TABBAR_LINKS.map(({ id, label, icon }) => (
            <li key={id} className="tabbar__item">
              <a
                href={getHref(id)}
                className={`tabbar__link${isActive(id) ? ' tabbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, id)}
              >
                <span className="tabbar__icon">{icon}</span>
                <span className="tabbar__label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
