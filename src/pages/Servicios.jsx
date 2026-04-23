import { useState, useEffect, useRef, memo, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  Globe, Mail, FilePlus, ListFilter, CalendarDays,
  BookOpen, PenLine, ShieldCheck, Plug, Palette,
  Languages, Server,
} from 'lucide-react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'



// ─────────────────────────────────────────────────────────────────────────────
// SVG MOCKUPS 
// ─────────────────────────────────────────────────────────────────────────────

const LandingDemo = memo(function LandingDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <defs>
        <pattern id="sw-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#1A1A28" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill="url(#sw-grid)" />
      <circle cx="600" cy="300" r="400" fill="#FF0080" fillOpacity="0.05" />
      <circle cx="600" cy="300" r="200" fill="#FF0080" fillOpacity="0.08" />
      <rect x="150" y="60" width="900" height="50" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="180" y="80" width="40" height="10" rx="2" fill="#FF0080" />
      <rect x="940" y="75" width="80" height="20" rx="4" fill="#FF0080" fillOpacity="0.8" />
      <rect x="350" y="190" width="500" height="50" rx="4" fill="#16162A" />
      <rect x="410" y="260" width="380" height="24" rx="4" fill="#16162A" />
      <rect x="510" y="340" width="180" height="44" rx="4" fill="#FF0080" fillOpacity="0.85" />
      <rect x="200" y="430" width="240" height="100" rx="4" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="480" y="430" width="240" height="100" rx="4" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="760" y="430" width="240" height="100" rx="4" fill="#0E0E1C" stroke="#1E1E2A" />
    </svg>
  )
})

const CorporativaDemo = memo(function CorporativaDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#sw-grid)" />
      <circle cx="300" cy="400" r="350" fill="#00E5FF" fillOpacity="0.03" />
      <circle cx="900" cy="200" r="350" fill="#FF0080" fillOpacity="0.04" />
      <rect x="150" y="60" width="900" height="50" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="155" y="155" width="420" height="36" rx="4" fill="#16162A" />
      <rect x="155" y="208" width="220" height="18" rx="4" fill="#16162A" />
      <rect x="155" y="238" width="160" height="18" rx="4" fill="#16162A" />
      <rect x="155" y="280" width="120" height="36" rx="4" fill="#FF0080" fillOpacity="0.8" />
      <rect x="155" y="340" width="290" height="200" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="465" y="340" width="290" height="200" rx="6" fill="#0E0E1C" stroke="#00E5FF" strokeOpacity="0.3" />
      <rect x="775" y="340" width="270" height="200" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
    </svg>
  )
})

const EcommerceDemo = memo(function EcommerceDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#sw-grid)" />
      <circle cx="700" cy="300" r="420" fill="#FF0080" fillOpacity="0.04" />
      <rect x="150" y="60" width="900" height="50" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="850" y="75" width="120" height="20" rx="4" fill="#16162A" />
      {/* ── Carrito de la compra ── */}
      <g stroke="#FF0080" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 996 75 h 5 l 4 13 h 14 l 3 -9.5 h -18" />
        <circle cx="1007" cy="94" r="2.5" fill="#FF0080" stroke="none" />
        <circle cx="1018" cy="94" r="2.5" fill="#FF0080" stroke="none" />
      </g>      {/* Sidebar */}
      <rect x="150" y="130" width="190" height="420" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="172" y="158" width="130" height="10" rx="2" fill="#16162A" />
      <rect x="172" y="180" width="100" height="8" rx="2" fill="#16162A" />
      <rect x="172" y="200" width="115" height="8" rx="2" fill="#16162A" />
      <rect x="172" y="220" width="90" height="8" rx="2" fill="#16162A" />
      {/* Product grid */}
      <rect x="360" y="130" width="200" height="240" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="580" y="130" width="200" height="240" rx="6" fill="#0E0E1C" stroke="#FF0080" strokeOpacity="0.4" />
      <rect x="800" y="130" width="200" height="240" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="360" y="390" width="200" height="160" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="580" y="390" width="200" height="160" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="800" y="390" width="200" height="160" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
    </svg>
  )
})

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE DATA
// Each service has: id, num, label, desc, features[], price, demo (JSX)
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'landing',
    num: '01',
    label: 'Landing Page',
    desc: 'Presencia digital afilada. Una página diseñada para captar la atención y convertir visitantes en clientes desde el primer momento.',
    price: 'Desde 350 €',
    features: [
      '1 a 3 páginas (Inicio, Servicios, Contacto)',
      'Diseño responsive a medida',
      'Formulario de contacto funcional dependiendo de tus intereses.',
      'Posicionamiento SEO on-page básico integrado',
      'Integración con Google Analytics',
      'Alta velocidad (PageSpeed > 90)',
      '2 ronda de revisiones.',
    ],
    demo: <LandingDemo />,
  },
  {
    id: 'corporativa',
    num: '02',
    label: 'Web Corporativa',
    desc: 'La sede digital completa de tu empresa. Blog, múltiples secciones y posicionamiento avanzado para escalar tu autoridad online.',
    price: 'Desde 750 €',
    features: [
      '5 a 10 páginas diseñadas a medida.',
      'Blog integrado y categorizado.',
      'SEO avanzado (herramientas como Schema, XML, Core Vitals).',
      'Formularios avanzados.',
      'Reservas y panel de control de las mismas.',
      'Multiidioma (hasta 2 idiomas).',
      'Analytics + Search Console.',
      '3 rondas de revisiones.',
    ],
    demo: <CorporativaDemo />,
  },
  {
    id: 'ecommerce',
    num: '03',
    label: 'E-Commerce & App',
    desc: 'Solución completa para vender online. Catálogo ilimitado, pasarela de pagos y gestión de pedidos bajo un panel propio.',
    price: 'Desde 2.000 €',
    features: [
      'Catálogo de productos escalable.',
      'Pasarela de pago (Stripe, PayPal, Redsys).',
      'Tu panel de administración intuitivo para actualizar a tu gusto.',
      'SEO técnico de producto (Rich Snippets).',
      'Emails transaccionales automatizados.',
      '5 rondas de revisiones.',
    ],
    demo: <EcommerceDemo />,
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// EXTRAS DATA — icon (lucide-react), title, desc, price
// ─────────────────────────────────────────────────────────────────────────────
const EXTRAS = [
  { icon: Globe, title: 'Dominio registrado', desc: 'Gestión, renovación y configuración del servidor incluida.', price: 'Desde 15€/año' },
  { icon: Mail, title: 'Email corporativo', desc: 'Correo con tu dominio en Google Workspace u Outlook.', price: 'Desde 35 €/año' },
  { icon: FilePlus, title: 'Página adicional', desc: 'Contenido SEO-optimizado con total coherencia visual.', price: 'Desde 50 €/pág.' },
  { icon: ListFilter, title: 'Formulario Multipaso', desc: 'Formulario especializado para filtrar clientes.', price: 'Desde 90 €' },
  { icon: CalendarDays, title: 'Sistema de Reservas', desc: 'Calendario sincronizado. Los clientes reservan solos, con posibilidad de manejarlo.', price: 'Desde 190 €' },
  { icon: BookOpen, title: 'Blog Estático', desc: 'Sección de contenidos ultra-rápida. Sin gestor de contenidos pesado.', price: 'Desde 200 €' },
  { icon: PenLine, title: 'Copywriting', desc: 'Textos de la web a medida para que tu cliente entienda en 3 segundos.', price: 'Desde 80 €/pág.' },
  { icon: ShieldCheck, title: 'Pack Legal', desc: 'Aviso Legal, Privacidad y Cookies adaptados al RGPD.', price: '90 €' },
  { icon: Plug, title: 'Integraciones API', desc: 'HubSpot, Notion, Mailchimp o Slack. Cero intervención.', price: '100–200 €' },
  { icon: Palette, title: 'Diseño de logotipo', desc: 'Logo, tipografías, paleta, tonos de uso y mockups. Identidad visual completa.', price: 'Desde 150 €' },
  { icon: Languages, title: 'Multiidioma', desc: 'Tu web en otro idioma sin plugins con traductor especializado. Velocidad preservada.', price: 'Desde 120 €/idioma' },
  { icon: Server, title: 'Mantenimiento & Hosting', desc: 'CDN global, SSL activo y cambios de texto incluidos.', price: '250–350 €/año' },
]

// ─────────────────────────────────────────────────────────────────────────────
// TICKET 1 — INTERACTIVE SERVICE SWITCHER (Con Auto-Play y Partículas)
// ─────────────────────────────────────────────────────────────────────────────

// Generador de partículas — PERF: reducido de 24 a 12 partículas.
// Las partículas tipo "smoke" con blur se eliminaron porque el CSS ya no anima
// filter (demasiado costoso). Solo partículas pequeñas sólidas.
function makeParticles(color) {
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.8
    const dist = 50 + Math.random() * 140
    return {
      id: i,
      x: 50 + (Math.random() - 0.5) * 16,
      y: 50 + (Math.random() - 0.5) * 16,
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      size: 3 + Math.random() * 8,
      dur: 0.35 + Math.random() * 0.35,
      opS: 0.7 + Math.random() * 0.3,
      color,
    }
  })
}

// Colores para las partículas de cada servicio
const SVC_COLORS = ['#FF0080', '#FF0080', '#FF0080'];

function ServiceSwitcher() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [particles, setParticles] = useState([])
  const prevRef = useRef(null)
  const pTimerRef = useRef(null)

  // PERF: useCallback evita recrear esta función en cada render, lo que
  // a su vez evita que los botones de tab se re-rendericen innecesariamente
  const handleSelect = useCallback((i) => {
    setActive(prev => {
      if (i === prev) return prev
      return i
    })
    setAnimKey(k => k + 1)
  }, [])

  // Efecto que lanza partículas al cambiar de slide
  useEffect(() => {
    if (prevRef.current !== null && prevRef.current !== active) {
      const color = SVC_COLORS[active] || '#FF0080'
      clearTimeout(pTimerRef.current)
      setParticles(makeParticles(color))
      // PERF: timeout ajustado a la duración real de la animación más larga (0.7s)
      pTimerRef.current = setTimeout(() => setParticles([]), 800)
    }
    prevRef.current = active
    // Limpiar al desmontar
    return () => clearTimeout(pTimerRef.current)
  }, [active])

  const svc = SERVICES[active]

  return (
    <div
      className={`svc-sw ${isPaused ? 'is-paused' : ''}`}
      // Pausamos el auto-play SOLO si el usuario mantiene pulsado (click o touch)
      onMouseDown={(e) => {
        // Nos aseguramos de que sea el click principal (izquierdo)
        if (e.button === 0) setIsPaused(true)
      }}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)} // Por si hacen click, arrastran el ratón fuera y sueltan
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >


      {/* ── Fondo con orbes animados (NUEVO) ── */}
      <div className="svc-sw__bg" aria-hidden="true">
        <div className="svc-sw__orb svc-sw__orb--1" style={{ background: SVC_COLORS[active] || 'var(--edge)' }} />
        <div className="svc-sw__orb svc-sw__orb--2" style={{ background: SVC_COLORS[active] || 'var(--edge)' }} />
        <div className="svc-sw__orb svc-sw__orb--3" style={{ background: SVC_COLORS[active] || 'var(--edge)' }} />
      </div>

      {/* ── Tab row ── */}
      <div className="svc-sw__tabs" role="tablist" aria-label="Tipo de servicio">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={active === i}
            className={`svc-sw__tab${active === i ? ' svc-sw__tab--active' : ''}`}
            onClick={() => handleSelect(i)}
            style={{ position: 'relative' }} // Necesario para la barra de progreso
          >
            {/* Barra de progreso de auto-play */}
            {active === i && (
              <div
                key={animKey}
                className="svc-sw__prog-bar"
                style={{ background: SVC_COLORS[i] || 'var(--edge)' }}
                onAnimationEnd={() => handleSelect((active + 1) % SERVICES.length)}
              />
            )}
            <span className="svc-sw__tab-num">{s.num}</span>
            <span className="svc-sw__tab-label">{s.label}</span>
          </button>
        ))}
      </div>

      {/* ── Content panel ── */}
      <div className="svc-sw__panel" key={animKey} role="tabpanel">

        {/* LEFT: copy + CTA */}
        <div className="svc-sw__left">
          <p className="kicker" style={{ color: SVC_COLORS[active] }}>
            {svc.num} // {svc.label}
          </p>
          <h2 className="svc-sw__title">{svc.label}</h2>
          <p className="svc-sw__desc">{svc.desc}</p>

          <ul className="svc-sw__features">
            {svc.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>


        </div>

        {/* RIGHT: mockup visual */}
        <div className="svc-sw__right" aria-hidden="true" style={{ position: 'relative' }}>
          <div className="svc-sw__mockup">
            <span className="svc-sw__corner svc-sw__corner--tl" />
            <span className="svc-sw__corner svc-sw__corner--br" />
            {svc.demo}

            {/* Capa de partículas de transición */}
            <div className="hc-particles" aria-hidden="true">
              {particles.map(p => (
                <div
                  key={p.id}
                  className="hc-particle"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    background: p.color,
                    '--dx': `${p.dx}px`,
                    '--dy': `${p.dy}px`,
                    '--dur': `${p.dur}s`,
                    '--ops': p.opS,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="svc-sw__footer">
            <div className="svc-sw__price-wrap">
              <span className="svc-sw__price">{svc.price}</span>
              <span className="svc-sw__price-note">+ IVA</span>
            </div>
            <Link to="/contacto" className="btn btn--chamfer btn--large" style={{ background: SVC_COLORS[active] }}>
              Solicitar Presupuesto →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── TICKET 3: Extras Carousel (Marquee) ──────────────────────────────────────
// PERF: memo() evita que todos los badges del marquee se re-rendericen
// cuando uno solo cambia su estado open/close
const ExtraBadge = memo(function ExtraBadge({ title, desc, price, onEnter, onLeave }) {
  const [open, setOpen] = useState(false)

  const handleEnter = () => { setOpen(true); onEnter() }
  const handleLeave = () => { setOpen(false); onLeave() }
  const handleClick = () => {
    const next = !open
    setOpen(next)
    if (next) onEnter(); else onLeave()
  }

  return (
    <div
      className={`extras-badge${open ? ' extras-badge--open' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button className="extras-badge__face" onClick={handleClick} aria-expanded={open}>
        <span className="extras-badge__title">{title}</span>
        <span className="extras-badge__price">{price}</span>
      </button>
      <div className="extras-badge__body">
        <p className="extras-badge__desc">{desc}</p>
        <Link to="/contacto" className="extras-badge__cta">Solicitar →</Link>
      </div>
    </div>
  )
})

function ExtrasMarquee() {
  const [paused, setPaused] = useState(false)
  // PERF: useCallback estabiliza las referencias de onEnter/onLeave.
  // Sin esto, memo() en ExtraBadge no funciona — recibe props nuevas en cada render.
  const handleEnter = useCallback(() => setPaused(true), [])
  const handleLeave = useCallback(() => setPaused(false), [])
  return (
    <div className="extras-marquee">
      <div className={`extras-marquee__track${paused ? ' extras-marquee__track--paused' : ''}`}>
        {/* Duplicamos el array para lograr el efecto infinito sin cortes */}
        {[...EXTRAS, ...EXTRAS].map((e, i) => (
          <ExtraBadge
            key={i}
            title={e.title}
            desc={e.desc}
            price={e.price}
            onEnter={handleEnter}
            onLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Servicios() {
  return (
    <>
      <Helmet>
        <title>Servicios — Katan Studio</title>
        <meta
          name="description"
          content="Katan Studio — Landing Pages, Webs Corporativas y E-Commerce a medida. Código propio, precio cerrado."
        />
      </Helmet>

      <Header />

      <main>

        {/* ── TICKET 1: Hero Switcher ──────────────────────────────────────── */}
        <section
          className="section"
          id="servicios-selector"
          style={{ paddingTop: '7rem', borderTop: 'none' }}
        >
          <div className="container">
            <header className="section__header" style={{ marginBottom: '2.5rem' }}>
              <p className="section-label">/Servicios</p>
              <h1 className="section__h2" style={{ marginBottom: '0.75rem' }}>
                Lo que construimos.
              </h1>
              <p className="section__sub">
                Cada proyecto, precio cerrado. Sin sorpresas.
              </p>
            </header>
            <ServiceSwitcher />
          </div>
        </section>
        {/* ── TICKET 3: Extras Marquee ────────────────────────────────────────── */}
        <section className="section section--dark" id="modulos" style={{ overflowX: 'hidden' }}>
          <div className="container">
            <header className="section__header" style={{ marginBottom: '3rem' }}>
              <p className="section-label">/Extras</p>
              <h2 className="section__h2">Servicios adicionales</h2>
              <p className="section__sub">
                Precio fijo por módulo. Sin sorpresas. Contrátalos con tu web o después.
              </p>
            </header>
          </div>

          {/* El carrusel va fuera del container para ocupar todo el ancho */}
          <ExtrasMarquee />

          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3.5rem' }}>
            <p className="section__sub" style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.4rem' }}>
              ¿No encuentras el servicio exacto o necesitas algo a medida?
            </p>
            <a href="mailto:katan.webs@gmail.com" className="btn btn--ghost">
              Cuéntanos tu idea →
            </a>
          </div>


        </section>

        {/* ── TICKET 4: Specs Table (unchanged) ───────────────────────────── */}
        <section className="section" id="specs" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <header className="section__header" style={{ marginBottom: '2.5rem' }}>
              <h2
                className="section__h2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', textTransform: 'none' }}
              >
                Especificaciones.
              </h2>
              <p className="section__sub">
                Comparativa técnica detallada de nuestros niveles de arquitectura.
              </p>
            </header>

            <div className="table-responsive">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>01 / Landing</th>
                    <th className="col-highlight">02 / Corporativa</th>
                    <th>03 / E-Commerce</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Número de páginas</strong></td>
                    <td>Hasta 5 páginas</td>
                    <td className="col-highlight">Hasta 10 páginas</td>
                    <td>Ilimitadas</td>
                  </tr>
                  <tr>
                    <td><strong>Diseño a medida</strong></td>
                    <td>100% Personalizado</td>
                    <td className="col-highlight">100% Personalizado</td>
                    <td>100% Personalizado</td>
                  </tr>
                  <tr>
                    <td><strong>Diseño Responsive</strong></td>
                    <td><span className="check-yes">✓</span></td>
                    <td className="col-highlight"><span className="check-yes">✓</span></td>
                    <td><span className="check-yes">✓</span></td>
                  </tr>
                  <tr>
                    <td><strong>SEO On-Page</strong></td>
                    <td>Básico</td>
                    <td className="col-highlight">Avanzado (Schema)</td>
                    <td>Avanzado + Rich Snippets</td>
                  </tr>
                  <tr>
                    <td><strong>Blog Integrado</strong></td>
                    <td><span className="check-no">—</span></td>
                    <td className="col-highlight"><span className="check-yes">✓</span></td>
                    <td><span className="check-yes">✓</span></td>
                  </tr>
                  <tr>
                    <td><strong>Multiidioma</strong></td>
                    <td><span className="check-no">—</span></td>
                    <td className="col-highlight">Hasta 2 idiomas</td>
                    <td>Hasta 3 idiomas</td>
                  </tr>
                  <tr>
                    <td><strong>Formularios de contacto</strong></td>
                    <td>1 formulario</td>
                    <td className="col-highlight">Avanzados / Múltiples</td>
                    <td>Avanzados / Múltiples</td>
                  </tr>
                  <tr>
                    <td><strong>Analítica Web</strong></td>
                    <td>Google Analytics</td>
                    <td className="col-highlight">Analytics + Search Console</td>
                    <td>Analytics + Search Console + E-comm</td>
                  </tr>
                  <tr>
                    <td><strong>Core Web Vitals</strong></td>
                    <td>Optimizado (&gt;90)</td>
                    <td className="col-highlight">Optimización Premium (&gt;95)</td>
                    <td>Optimización Premium</td>
                  </tr>
                  <tr>
                    <td><strong>Catálogo &amp; Pasarela</strong></td>
                    <td><span className="check-no">—</span></td>
                    <td className="col-highlight"><span className="check-no">—</span></td>
                    <td>Ilimitado (Stripe / PayPal)</td>
                  </tr>
                  <tr>
                    <td><strong>Panel de administración</strong></td>
                    <td><span className="check-no">—</span></td>
                    <td className="col-highlight">Gestor básico (CMS)</td>
                    <td>Completo (Pedidos, stock)</td>
                  </tr>
                  <tr>
                    <td><strong>Rondas de revisiones</strong></td>
                    <td>1 ronda</td>
                    <td className="col-highlight">3 rondas</td>
                    <td>5 rondas</td>
                  </tr>
                  <tr>
                    <td><strong>Soporte post-lanzamiento</strong></td>
                    <td>15 días</td>
                    <td className="col-highlight">30 días</td>
                    <td>60 días</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── TICKET 5: CTA Final ──────────────────────────────────────────── */}
        <section className="section cta-final" id="presupuesto">
          {/* Ambient glow */}
          <div className="cta-final__glow" aria-hidden="true" />

          <div className="container">
            <div className="cta-final__inner">
              <p className="cta-final__label">/ Siguiente paso</p>

              <h2 className="cta-final__h2">
                ¿Listo para llevar tu<br />
                <span style={{ color: 'var(--edge)' }}>negocio al siguiente nivel?</span>
              </h2>

              <p className="cta-final__sub">
                Cuéntanos tu proyecto. Respuesta en menos de 24&nbsp;h,
                presupuesto cerrado sin ninguna sorpresa.
              </p>

              <div className="cta-final__actions">
                <Link to="/contacto" className="btn btn--chamfer btn--large">
                  Pedir Presupuesto →
                </Link>
                <Link to="/proceso" className="btn btn--ghost">
                  Ver cómo trabajamos
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="cta-final__proof">
                <span>+40 proyectos entregados</span>
                <span className="cta-final__proof-dot" />
                <span>PageSpeed &gt; 95 garantizado</span>
                <span className="cta-final__proof-dot" />
                <span>Código sin dependencias innecesarias</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}