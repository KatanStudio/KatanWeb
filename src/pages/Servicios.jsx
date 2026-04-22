import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'
import ServicesCarousel from '../components/ServicesCarousel.jsx'

// ── Service data ────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'landing',
    num: '01',
    label: 'Landing Page',
    desc: 'Una página enfocada en captar y convertir.',
    price: 'Desde 350 €',
    demo: <LandingDemo />,
  },
  {
    id: 'corporativa',
    num: '02',
    label: 'Web Corporativa',
    desc: 'La estructura ideal para presentar tu negocio con claridad.',
    price: 'Desde 750 €',
    demo: <CorporativaDemo />,
  },
  {
    id: 'ecommerce',
    num: '03',
    label: 'E-Commerce & App',
    desc: 'Una tienda preparada para vender de forma simple y directa.',
    price: 'Desde 2.000 €',
    demo: <EcommerceDemo />,
  },
]

// ── Extras data ─────────────────────────────────────────────────
const EXTRAS = [
  { title: 'Dominio registrado', desc: 'Tu nombre en la red. Gestión, renovación y configuración DNS incluida.', price: 'Desde 15 €/año' },
  { title: 'Email corporativo', desc: 'Correo con tu dominio en Google Workspace u Outlook.', price: 'Desde 35 €/año' },
  { title: 'Página adicional', desc: 'Página extra con contenido optimizado para SEO y coherencia visual.', price: 'Desde 50 €/pág.' },
  { title: 'Formulario Multipaso', desc: 'Lógica condicional para filtrar leads cualificados. Sin llamadas innecesarias.', price: 'Desde 90 €' },
  { title: 'Sistema de Reservas', desc: 'Calendario de citas sincronizado con tu agenda. Los clientes reservan solos.', price: 'Desde 190 €' },
  { title: 'Blog Estático', desc: 'Sección de contenidos ultra-rápida. Sin CMS pesado que lastre la carga.', price: 'Desde 200 €' },
  { title: 'Copywriting', desc: 'Textos que cortan. Escribimos directo para que tu cliente entienda en 3 segundos.', price: 'Desde 80 €/pág.' },
  { title: 'Pack Legal', desc: 'Aviso Legal, Privacidad y Cookies adaptados al RGPD. La web blindada legalmente.', price: '90 €' },
  { title: 'Integraciones API', desc: 'Conectamos con HubSpot, Notion, Mailchimp o Slack. Cero intervención manual.', price: '100–200 €' },
  { title: 'Diseño de logotipo', desc: 'Logo, tipografías y paleta de colores. Identidad visual completa desde el día 1.', price: 'Desde 150 €' },
  { title: 'Multiidioma', desc: 'Tu web en otro idioma sin plugins. Velocidad de carga preservada.', price: 'Desde 120 €/idioma' },
  { title: 'Mantenimiento & Hosting', desc: 'CDN global, SSL activo y cambios de texto incluidos. Tú solo piensas en tu negocio.', price: '250–350 €/año' },
]

function LandingDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <defs>
        <pattern id="ld-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#1A1A28" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill="url(#ld-grid)" />
      <circle cx="600" cy="300" r="400" fill="#FF0080" fillOpacity="0.04" />
      <circle cx="600" cy="300" r="200" fill="#FF0080" fillOpacity="0.08" />
      <rect x="150" y="60" width="900" height="50" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="180" y="80" width="40" height="10" rx="2" fill="#FF0080" />
      <rect x="940" y="75" width="80" height="20" rx="4" fill="#FF0080" fillOpacity="0.8" />
      <rect x="350" y="220" width="500" height="40" rx="4" fill="#16162A" />
      <rect x="420" y="280" width="360" height="20" rx="4" fill="#16162A" />
      <rect x="520" y="360" width="160" height="40" rx="4" fill="#FF0080" fillOpacity="0.8" />
    </svg>
  )
}

function CorporativaDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#ld-grid)" />
      <circle cx="300" cy="400" r="350" fill="#00E5FF" fillOpacity="0.03" />
      <circle cx="900" cy="200" r="350" fill="#FF0080" fillOpacity="0.03" />
      <rect x="150" y="60" width="900" height="50" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="150" y="160" width="400" height="30" rx="4" fill="#16162A" />
      <rect x="150" y="210" width="200" height="16" rx="4" fill="#16162A" />
      <rect x="150" y="290" width="280" height="220" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="460" y="290" width="280" height="220" rx="6" fill="#0E0E1C" stroke="#00E5FF" strokeOpacity="0.3" />
      <rect x="770" y="290" width="280" height="220" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
    </svg>
  )
}

function EcommerceDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#ld-grid)" />
      <circle cx="600" cy="300" r="400" fill="#FF0080" fillOpacity="0.04" />
      <rect x="150" y="60" width="900" height="50" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="850" y="75" width="120" height="20" rx="4" fill="#16162A" />
      <circle cx="1010" cy="85" r="10" fill="#FF0080" />
      <rect x="150" y="150" width="200" height="380" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="180" y="190" width="120" height="12" rx="2" fill="#16162A" />
      <rect x="390" y="150" width="200" height="260" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="610" y="150" width="200" height="260" rx="6" fill="#0E0E1C" stroke="#FF0080" strokeOpacity="0.4" />
      <rect x="830" y="150" width="200" height="260" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
    </svg>
  )
}

function ServiceSelector() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const handleSelect = (i) => { if (i === active) return; setActive(i); setAnimKey(k => k + 1) }
  const svc = SERVICES[active]
  return (
    <div className="svc-selector">
      <div className="svc-tabs" role="tablist">
        {SERVICES.map((s, i) => (
          <button key={s.id} role="tab" aria-selected={active === i}
            className={`svc-tab${active === i ? ' svc-tab--active' : ''}`}
            onClick={() => handleSelect(i)}>
            <span className="svc-tab__label">{s.label}</span>
          </button>
        ))}
      </div>
      <div className="svc-panel" key={animKey} role="tabpanel">
        <div className="svc-panel__bg" aria-hidden="true">{svc.demo}</div>
        <div className="svc-panel__overlay" aria-hidden="true" />
        <div className="svc-panel__content">
          <div className="svc-panel__top-left">
            <p className="kicker" style={{ color: 'var(--spark)', marginBottom: '1rem' }}>{svc.num} // {svc.label}</p>
            <p className="svc-panel__intro">{svc.desc}</p>
          </div>
          <div className="svc-panel__center">
            <h3 className="svc-panel__huge-title">{svc.label}</h3>
            <div className="svc-panel__actions">
              <span className="svc-panel__price">{svc.price}<span> + IVA</span></span>
              <Link to="/contacto" className="btn btn--primary btn--chamfer">Solicitar proyecto →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExtraBadge({ title, desc, price, onEnter, onLeave }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`extras-badge${open ? ' extras-badge--open' : ''}`}
      onMouseEnter={() => { setOpen(true); onEnter() }}
      onMouseLeave={() => { setOpen(false); onLeave() }}>
      <button className="extras-badge__face" onClick={() => { const n = !open; setOpen(n); if (n) onEnter(); else onLeave() }} aria-expanded={open}>
        <span className="extras-badge__title">{title}</span>
        <span className="extras-badge__price">{price}</span>
      </button>
      <div className="extras-badge__body">
        <p className="extras-badge__desc">{desc}</p>
        <Link to="/contacto" className="extras-badge__cta">Solicitar →</Link>
      </div>
    </div>
  )
}

function ExtrasMarquee() {
  const [paused, setPaused] = useState(false)
  return (
    <div className="extras-marquee">
      <div className={`extras-marquee__track${paused ? ' extras-marquee__track--paused' : ''}`}>
        {[...EXTRAS, ...EXTRAS].map((e, i) => (
          <ExtraBadge key={i} title={e.title} desc={e.desc} price={e.price}
            onEnter={() => setPaused(true)} onLeave={() => setPaused(false)} />
        ))}
      </div>
    </div>
  )
}

export default function Servicios() {
  return (
    <>
      <Helmet>
        <title>Servicios — Katan Studio</title>
        <meta name="description" content="Katan Studio — Landing Pages, Webs Corporativas y E-Commerce a medida. Código propio, precio cerrado." />
      </Helmet>
      <Header />
      <main>
        <section id="servicios-selector" style={{ paddingTop: '0', borderTop: 'none' }}>
          <HeroCarousel />
        </section>

        <section className="section section--dark" id="servicios">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Servicios</p>
              <h2 className="section__h2" style={{ textTransform: 'none' }}>Lo que construimos</h2>
            </header>
            {/* Carrusel 3D — componente en src/components/ServicesCarousel.jsx */}
            <ServicesCarousel />
          </div>
        </section>

        <section className="section" id="specs" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <header className="section__header" style={{ marginBottom: '2.5rem' }}>
              <h2 className="section__h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', textTransform: 'none' }}>Especificaciones.</h2>
              <p className="section__sub">Comparativa técnica detallada de nuestros niveles de arquitectura.</p>
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
                  <tr><td><strong>Número de páginas</strong></td><td>Hasta 5 páginas</td><td className="col-highlight">Hasta 10 páginas</td><td>Ilimitadas</td></tr>
                  <tr><td><strong>Diseño a medida</strong></td><td>100% Personalizado</td><td className="col-highlight">100% Personalizado</td><td>100% Personalizado</td></tr>
                  <tr><td><strong>Diseño Responsive</strong></td><td><span className="check-yes">✓</span></td><td className="col-highlight"><span className="check-yes">✓</span></td><td><span className="check-yes">✓</span></td></tr>
                  <tr><td><strong>SEO On-Page</strong></td><td>Básico</td><td className="col-highlight">Avanzado (Schema)</td><td>Avanzado + Rich Snippets</td></tr>
                  <tr><td><strong>Blog Integrado</strong></td><td><span className="check-no">—</span></td><td className="col-highlight"><span className="check-yes">✓</span></td><td><span className="check-yes">✓</span></td></tr>
                  <tr><td><strong>Multiidioma</strong></td><td><span className="check-no">—</span></td><td className="col-highlight">Hasta 2 idiomas</td><td>Hasta 3 idiomas</td></tr>
                  <tr><td><strong>Formularios de contacto</strong></td><td>1 formulario</td><td className="col-highlight">Avanzados / Múltiples</td><td>Avanzados / Múltiples</td></tr>
                  <tr><td><strong>Analítica Web</strong></td><td>Google Analytics</td><td className="col-highlight">Analytics + Search Console</td><td>Analytics + Search Console + E-comm</td></tr>
                  <tr><td><strong>Core Web Vitals</strong></td><td>Optimizado (&gt;90)</td><td className="col-highlight">Optimización Premium (&gt;95)</td><td>Optimización Premium</td></tr>
                  <tr><td><strong>Catálogo &amp; Pasarela</strong></td><td><span className="check-no">—</span></td><td className="col-highlight"><span className="check-no">—</span></td><td>Ilimitado (Stripe/PayPal)</td></tr>
                  <tr><td><strong>Panel de administración</strong></td><td><span className="check-no">—</span></td><td className="col-highlight">Gestor básico (CMS)</td><td>Completo (Pedidos, stock)</td></tr>
                  <tr><td><strong>Rondas de revisiones</strong></td><td>1 ronda</td><td className="col-highlight">3 rondas</td><td>5 rondas</td></tr>
                  <tr><td><strong>Soporte post-lanzamiento</strong></td><td>15 días</td><td className="col-highlight">30 días</td><td>60 días</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section section--dark" id="modulos">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Extras</p>
              <h2 className="section__h2">Módulos adicionales</h2>
              <p className="section__sub">Precio fijo por módulo. Sin sorpresas. Contrátalos con tu web o después.</p>
            </header>
            <ExtrasMarquee />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}