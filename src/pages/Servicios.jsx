import { useState, useEffect, useRef, memo, useCallback, Fragment } from 'react'
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

const AppDemo = memo(function AppDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#sw-grid)" />
      <circle cx="600" cy="300" r="400" fill="#FF0080" fillOpacity="0.04" />
      <circle cx="600" cy="300" r="180" fill="#FF0080" fillOpacity="0.04" />
      {/* ── Panel izquierdo: admin/backend ── */}
      <rect x="50" y="80" width="320" height="60" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="70" y="98" width="80" height="10" rx="3" fill="#16162A" />
      <rect x="70" y="116" width="60" height="8" rx="2" fill="#FF0080" fillOpacity="0.6" />
      <rect x="50" y="158" width="320" height="100" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="70" y="176" width="100" height="10" rx="3" fill="#16162A" />
      <rect x="70" y="196" width="60" height="32" rx="4" fill="#16162A" />
      <rect x="148" y="196" width="60" height="32" rx="4" fill="#16162A" />
      <rect x="226" y="196" width="60" height="32" rx="4" fill="#FF0080" fillOpacity="0.3" />
      <rect x="50" y="276" width="320" height="60" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="70" y="294" width="120" height="10" rx="3" fill="#16162A" />
      <rect x="50" y="354" width="320" height="80" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="70" y="372" width="100" height="10" rx="3" fill="#16162A" />
      <rect x="240" y="369" width="80" height="24" rx="4" fill="#FF0080" fillOpacity="0.7" />
      {/* ── Marco del teléfono ── */}
      <rect x="432" y="15" width="336" height="570" rx="34" fill="#0D0D1A" stroke="#252535" strokeWidth="2" />
      <rect x="444" y="48" width="312" height="504" rx="10" fill="#07070F" />
      <rect x="554" y="48" width="92" height="18" rx="9" fill="#0D0D1A" />
      {/* Header de la app */}
      <rect x="444" y="66" width="312" height="48" fill="#0B0B18" />
      <rect x="460" y="82" width="90" height="14" rx="3" fill="#FF0080" fillOpacity="0.8" />
      <circle cx="736" cy="90" r="12" fill="#1A1A28" />
      <circle cx="736" cy="90" r="5" fill="#FF0080" fillOpacity="0.6" />
      {/* Tarjeta hero */}
      <rect x="454" y="124" width="292" height="110" rx="8" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="468" y="140" width="140" height="14" rx="3" fill="#16162A" />
      <rect x="468" y="162" width="100" height="9" rx="2" fill="#16162A" />
      <rect x="468" y="204" width="90" height="18" rx="4" fill="#FF0080" fillOpacity="0.85" />
      {/* Dos tarjetas de funcionalidad */}
      <rect x="454" y="246" width="140" height="110" rx="8" fill="#0E0E1C" stroke="#1E1E2A" />
      <rect x="606" y="246" width="140" height="110" rx="8" fill="#0E0E1C" stroke="#FF0080" strokeOpacity="0.35" />
      <rect x="468" y="262" width="80" height="9" rx="2" fill="#16162A" />
      <rect x="620" y="262" width="80" height="9" rx="2" fill="#16162A" />
      <rect x="468" y="318" width="74" height="20" rx="4" fill="#FF0080" fillOpacity="0.65" />
      <rect x="620" y="318" width="74" height="20" rx="4" fill="#16162A" />
      {/* Filas de lista */}
      <rect x="454" y="368" width="292" height="44" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <circle cx="478" cy="390" r="10" fill="#1A1A28" />
      <rect x="498" y="383" width="100" height="9" rx="2" fill="#16162A" />
      <rect x="454" y="422" width="292" height="44" rx="6" fill="#0E0E1C" stroke="#1E1E2A" />
      <circle cx="478" cy="444" r="10" fill="#FF0080" fillOpacity="0.15" />
      <rect x="498" y="437" width="100" height="9" rx="2" fill="#16162A" />
      {/* Nav inferior */}
      <rect x="444" y="504" width="312" height="48" fill="#0B0B18" />
      <circle cx="504" cy="528" r="14" fill="#FF0080" fillOpacity="0.12" />
      <circle cx="504" cy="528" r="5" fill="#FF0080" />
      <circle cx="564" cy="528" r="5" fill="#252535" />
      <circle cx="624" cy="528" r="5" fill="#252535" />
      <circle cx="684" cy="528" r="5" fill="#252535" />
      <circle cx="744" cy="528" r="5" fill="#252535" />
      {/* ── Panel derecho: notificaciones/actividad ── */}
      <rect x="830" y="80" width="320" height="72" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="850" y="98" width="60" height="10" rx="3" fill="#FF0080" fillOpacity="0.6" />
      <rect x="850" y="116" width="120" height="8" rx="2" fill="#16162A" />
      <rect x="830" y="170" width="320" height="72" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="850" y="188" width="80" height="10" rx="3" fill="#16162A" />
      <rect x="850" y="206" width="100" height="8" rx="2" fill="#16162A" />
      <rect x="830" y="260" width="320" height="72" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="850" y="278" width="100" height="10" rx="3" fill="#16162A" />
      <rect x="850" y="296" width="70" height="8" rx="2" fill="#16162A" />
      <rect x="830" y="350" width="320" height="72" rx="6" fill="#0B0B16" stroke="#1E1E2A" />
      <rect x="850" y="368" width="80" height="10" rx="3" fill="#16162A" />
      <rect x="850" y="386" width="120" height="8" rx="2" fill="#16162A" />
      <rect x="830" y="440" width="320" height="60" rx="6" fill="#0B0B16" stroke="#FF0080" strokeOpacity="0.28" />
      <rect x="850" y="456" width="100" height="10" rx="3" fill="#16162A" />
      <rect x="850" y="474" width="70" height="8" rx="2" fill="#FF0080" fillOpacity="0.5" />
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
    short: 'LP',
    desc: 'Ideal si lo que quieres es una sola página diseñada para captar la atención y convertir visitantes en clientes desde el primer momento.', //poner en negrita lo de una sola página
    price: 'Desde 350 €',
    features: [
      '1 a 5 secciones (Inicio, Quiénes Somos, Servicios...)',
      'Diseño ajustado a cualquier dispositvo.',
      'Formulario básico de contacto.',
      'Posicionamiento SEO básico integrado.',
      'Integración con Google Analytics.', //añadir link a Google Analytics que lleven al faq por si no saben lo que es
      'Alta velocidad, tu página carga en un pestañeo.', 
      '2 ronda de revisiones correctivas.', //añadir enlace a FAQ ppara explicar la diferencia entre correctivas y evolutivas
    ],
    demo: <LandingDemo />,
  },
  {
    id: 'corporativa',
    num: '02',
    label: 'Web Corporativa',
    short: 'WEB',
    desc: 'La sede digital completa de tu empresa. Blog, múltiples páginas y posicionamiento avanzado para escalar tu presencia online.', //poner en negrita lo de páginas
    price: 'Desde 750 €',
    features: [
      'de 1 a 10 páginas diseñadas a medida.', //poner en negrita lo de páginas
      'Blog a tu gusto con filtro de categorías.',
      'Posicionamiento SEO avanzado integrado.',
      'Formulario básico de contacto.',
      'Panel de control de gestión de contenido.',
      'Alta velocidad, sin importar la cantidad de contenido.',
      '3 rondas de revisiones correctivas.',
    ],
    demo: <CorporativaDemo />,
  },
  {
    id: 'ecommerce',
    num: '03',
    label: 'E-Commerce',
    short: 'EC',
    desc: 'Solución completa para vender online. Catálogo ilimitado, pasarela de pagos y gestión de pedidos bajo un panel propio.',
    price: 'Desde 2.000 €',
    features: [
      'Catálogo de productos escalable.',
      'Pasarela de pago (Stripe, PayPal, Redsys).',
      'Tu panel de administración intuitivo para actualizar a tu gusto.',
      'SEO técnico de producto.',
      'Emails automatizados.',
      '5 rondas de revisiones correctivas.',
    ],
    demo: <EcommerceDemo />,
  },
  {
    id: 'app',
    num: '04',
    label: 'App',
    short: 'APP',
    desc: 'Lleva tu negocio al bolsillo de tus clientes con una app nativa o híbrida. Diseñada para convertir, retener y fidelizar desde el primer toque.',
    price: 'Desde 3.000 €',
    features: [
      'Diseño UI/UX nativo para iOS y Android.',
      'Notificaciones push y mensajería in-app.',
      'Publicación en App Store y Google Play.',
      'Panel de gestión y métricas de uso en tiempo real.',
      'Integración con pasarelas de pago (Stripe).',
      '5 rondas de revisiones correctivas.',
    ],
    demo: <AppDemo />,
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// EXTRAS DATA — icon (lucide-react), title, desc, price
// ─────────────────────────────────────────────────────────────────────────────
const EXTRAS = [
  { icon: Globe, title: 'Dominio registrado', desc: 'Gestión, renovación y configuración del servidor incluida.' },
  { icon: Mail, title: 'Email corporativo', desc: 'Creación de correo corporativo asociado a tu dominio.' },
  { icon: FilePlus, title: 'Página adicional', desc: 'Amplia el número de páginas de tu web si superas el límite incluido.' },
  { icon: ListFilter, title: 'Formulario Multipaso', desc: 'Formulario avanzado dedicado a filtrar clientes.' },
  { icon: CalendarDays, title: 'Sistema de Reservas', desc: 'Calendario sincronizado. Los clientes reservan solos, con posibilidad de gestionarlo.' },
  { icon: BookOpen, title: 'Blog Estático', desc: 'Sección de contenidos personalizada. Con panel de control incluido.' },
  { icon: PenLine, title: 'Copywriting', desc: 'Textos de la web a medida para que tu cliente entienda tu negocio en 3 segundos.' },
  { icon: ShieldCheck, title: 'Pack Legal', desc: 'Redacción de la documentación legal: Privacidad, Cookies y Aviso Legal, adaptados al RGPD.' },
  { icon: Plug, title: 'Integraciones API', desc: 'Integración de aplicaciones de terceros' },
  { icon: Palette, title: 'Identidad Corporativa', desc: 'Logo, tipografías, paleta de colores, tonos de uso y mockups. Identidad visual completa.' },
  { icon: Languages, title: 'Multiidioma', desc: 'Tu web en otro idioma con traductor especializado, manteniendo la velocidad.' },
  { icon: Server, title: 'Mantenimiento & Hosting', desc: 'Alojamiento en un servidor.' },
  { icon: Globe, title: 'Revisiones evolutivas', desc: 'Ideal para cuando quieres ampliar tu proyecto una vez te lo hayamos entregado.' },
]

// ─────────────────────────────────────────────────────────────────────────────
// SPECS TABLE DATA & CAROUSEL (mobile)
// ─────────────────────────────────────────────────────────────────────────────
const Y = <span className="check-yes">✓</span>
const N = <span className="check-no">—</span>

const SPECS_COLS = ['01 / Landing', '02 / Corporativa', '03 / E-Commerce', '04 / App']

const SPECS_ROWS = [
  { label: 'Contenido',               values: ['Hasta 5 páginas',       'Hasta 10 páginas',           'Ilimitadas',                 'Pantallas ilimitadas'] },
  { label: 'Diseño a medida',         values: ['100% Personalizado',    '100% Personalizado',         '100% Personalizado',         '100% Personalizado'] },
  { label: 'Diseño Responsive',       values: [Y,                       Y,                            Y,                            Y] },
  { label: 'SEO On-Page',             values: ['Básico',                'Avanzado (Schema)',           'Avanzado + Rich Snippets',   N] },
  { label: 'Blog Integrado',          values: [N,                       Y,                            Y,                            N] },
  { label: 'Multiidioma',             values: [N,                       'Hasta 2 idiomas',             'Hasta 3 idiomas',            'Hasta 2 idiomas'] },
  { label: 'Formularios de contacto', values: ['1 formulario',          'Avanzados / Múltiples',      'Avanzados / Múltiples',      'Formularios in-app'] },
  { label: 'Analítica Web',           values: ['Google Analytics',      'Analytics + Search Console', 'Analytics + SC + E-comm',    'Analytics + Firebase'] },
  { label: 'Core Web Vitals',         values: ['Optimizado (>90)',      'Premium (>95)',               'Premium',                    N] },
  { label: 'Catálogo & Pasarela',     values: [N,                       N,                            'Ilimitado (Stripe / PayPal)', 'Integrable (Stripe)'] },
  { label: 'Panel de administración', values: [N,                       'Gestor básico (CMS)',         'Completo (Pedidos, stock)',   'Dashboard completo'] },
  { label: 'Rondas de revisiones',    values: ['1 ronda',               '3 rondas',                   '5 rondas',                   '5 rondas'] },
  { label: 'Soporte post-lanzamiento',values: ['15 días',               '30 días',                    '60 días',                    '60 días'] },
]

function SpecsCarousel() {
  const [active, setActive]   = useState(0)
  const [dir, setDir]         = useState(1)
  const [animKey, setAnimKey] = useState(0)
  const touchStartX           = useRef(null)

  const navigate = (next) => {
    if (next < 0 || next > 3) return
    setDir(next > active ? 1 : -1)
    setActive(next)
    setAnimKey(k => k + 1)
  }

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50)  navigate(active + 1)
    else if (diff < -50) navigate(active - 1)
    touchStartX.current = null
  }

  const animClass   = dir > 0 ? 'specs-carousel__val--from-right' : 'specs-carousel__val--from-left'
  const isHighlight = active === 1

  const Nav = () => (
    <div className="specs-carousel__nav">
      <button
        className="specs-carousel__arrow"
        onClick={() => navigate(active - 1)}
        disabled={active === 0}
        aria-label="Anterior"
      >←</button>

      <div className="specs-carousel__nav-center">
        <div className="specs-carousel__dots" role="tablist">
          {SPECS_COLS.map((col, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={col}
              className={`specs-carousel__dot${i === active ? ' specs-carousel__dot--active' : ''}`}
              onClick={() => navigate(i)}
            />
          ))}
        </div>
      </div>

      <button
        className="specs-carousel__arrow"
        onClick={() => navigate(active + 1)}
        disabled={active === 3}
        aria-label="Siguiente"
      >→</button>
    </div>
  )

  return (
    <div
      className="specs-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Navigation superior ── */}
      <Nav />

      <div className="specs-carousel__grid">

        {/* ── Header row ── */}
        <div className="specs-carousel__cell specs-carousel__cell--th-label" />
        <div
          key={`h-${animKey}`}
          className={`specs-carousel__cell specs-carousel__cell--th${isHighlight ? ' specs-carousel__cell--highlight-th' : ''} ${animClass}`}
        >
          {SPECS_COLS[active]}
        </div>

        {/* ── Data rows ── */}
        {SPECS_ROWS.map((row, i) => (
          <Fragment key={i}>
            <div className="specs-carousel__cell specs-carousel__cell--label">
              <strong>{row.label}</strong>
            </div>
            <div
              key={`v-${animKey}-${i}`}
              className={`specs-carousel__cell${isHighlight ? ' specs-carousel__cell--highlight' : ''} ${animClass}`}
            >
              {row.values[active]}
            </div>
          </Fragment>
        ))}
      </div>

      {/* ── Navigation inferior ── */}
      <Nav />
    </div>
  )
}

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
const SVC_COLORS = ['#FF0080', '#FF0080', '#FF0080', '#FF0080'];

function ServiceSwitcher() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [particles, setParticles] = useState([])
  const prevRef = useRef(null)
  const pTimerRef = useRef(null)
  const touchStartX = useRef(null)

  const handleSelect = useCallback((i) => {
    setActive(prev => {
      if (i === prev) return prev
      return i
    })
    setAnimKey(k => k + 1)
  }, [])

  useEffect(() => {
    if (prevRef.current !== null && prevRef.current !== active) {
      const color = SVC_COLORS[active] || '#FF0080'
      clearTimeout(pTimerRef.current)
      setParticles(makeParticles(color))
      pTimerRef.current = setTimeout(() => setParticles([]), 800)
    }
    prevRef.current = active
    return () => clearTimeout(pTimerRef.current)
  }, [active])

  const svc = SERVICES[active]

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) handleSelect(Math.min(SERVICES.length - 1, active + 1))
    else if (delta < -50) handleSelect(Math.max(0, active - 1))
    touchStartX.current = null
  }

  return (
    <div className="svc-sw" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* ── Fondo con orbes animados — solo desktop (en móvil los gestiona PageOrbs) ── */}
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
          >
            <span className="svc-sw__tab-num">{s.num}</span>
            <span className="svc-sw__tab-label svc-sw__tab-label--full">{s.label}</span>
            <span className="svc-sw__tab-label svc-sw__tab-label--short">{s.short}</span>
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

          {/* Footer aquí también para móvil (en desktop se oculta via CSS) */}
          <div className="svc-sw__footer svc-sw__footer--mobile">
            <div className="svc-sw__price-wrap">
              <span className="svc-sw__price">{svc.price}</span>
              <span className="svc-sw__price-note">+ IVA</span>
            </div>
            <Link to="/contacto" className="btn btn--chamfer btn--large" style={{ background: SVC_COLORS[active] }}>
              Solicitar Presupuesto →
            </Link>
          </div>
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
          {/* Footer original — solo visible en desktop */}
          <div className="svc-sw__footer svc-sw__footer--desktop">
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
const ExtraBadge = memo(function ExtraBadge({ title, desc, open, onToggle, onMouseEnter, onMouseLeave, isMobile }) {
  return (
    <div
      className={`extras-badge${open ? " extras-badge--open" : ""}${isMobile ? " extras-badge--mobile" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="extras-badge__face" onClick={onToggle} aria-expanded={open}>
        <span className="extras-badge__title">{title}</span>
      </button>
      <div className="extras-badge__body">
        <p className="extras-badge__desc">{desc}</p>
        <Link to="/contacto" className="extras-badge__cta">Solicitar →</Link>
      </div>
    </div>
  )
})

function ExtrasMarquee() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animDir, setAnimDir]         = useState(1)
  const [animKey, setAnimKey]         = useState(0)
  const touchStartX                   = useRef(null)

  const navigate = useCallback((next) => {
    if (next < 0 || next >= EXTRAS.length) return
    setAnimDir(next > activeIndex ? 1 : -1)
    setActiveIndex(next)
    setAnimKey(k => k + 1)
  }, [activeIndex])

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50)       navigate(activeIndex + 1)
    else if (diff < -50) navigate(activeIndex - 1)
    touchStartX.current = null
  }

  const extra     = EXTRAS[activeIndex]
  const animClass = animDir > 0 ? 'em-card--from-right' : 'em-card--from-left'

  const WINDOW = 5
  const half   = Math.floor(WINDOW / 2)
  const total  = EXTRAS.length
  let winStart = Math.max(0, activeIndex - half)
  let winEnd   = winStart + WINDOW
  if (winEnd > total) { winEnd = total; winStart = Math.max(0, total - WINDOW) }
  const visibleDots = Array.from({ length: total }, (_, i) => i).slice(winStart, winEnd)

  const marqueeItems = [...EXTRAS, ...EXTRAS]

  return (
    <div>
      {/* Navegador de tarjetas — siempre visible en todas las pantallas */}
      <div className="em-wrap" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="em-nav em-nav--dots-only">
          <div className="em-dots" role="tablist">
            {visibleDots.map((i) => (
              <button key={i} role="tab" aria-selected={i === activeIndex}
                className={`em-dot${i === activeIndex ? ' em-dot--active' : ''}`}
                onClick={() => navigate(i)} aria-label={EXTRAS[i].title} />
            ))}
          </div>
        </div>

        <div className="em-stage">
          <div key={animKey} className={`em-card ${animClass}`}>
            <ExtraBadge
              title={extra.title} desc={extra.desc}
              open={true}
              onToggle={undefined}
              isMobile={true}
            />
          </div>
        </div>

        <div className="em-nav em-nav--bottom">
          <button className="em-arrow" onClick={() => navigate(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Anterior">←</button>
          <span className="em-counter">{activeIndex + 1} / {EXTRAS.length}</span>
          <button className="em-arrow" onClick={() => navigate(activeIndex + 1)} disabled={activeIndex === EXTRAS.length - 1} aria-label="Siguiente">→</button>
        </div>
      </div>

      {/* Carrusel visual — solo muestra los títulos, sin precio ni desplegable */}
      <div className="extras-marquee">
        <div className="extras-marquee__track">
          {marqueeItems.map((e, i) => (
            <div key={i} className="extras-badge extras-badge--visual">
              <span className="extras-badge__title">{e.title}</span>
            </div>
          ))}
        </div>
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

      {/*
        Orbes de ambiente para móvil — position: fixed para cubrir toda la página.
        En desktop están desactivados via CSS (los gestiona .svc-sw__bg en su sección).
        Usamos mix-blend-mode: screen + pointer-events: none para que no bloqueen
        ninguna interacción ni oscurezcan el texto sobre fondos oscuros.
      */}
      <div className="page-orbs" aria-hidden="true">
        <div className="page-orbs__orb page-orbs__orb--1" />
        <div className="page-orbs__orb page-orbs__orb--2" />
      </div>

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
                Lo que <span className="accent"> construimos.</span>
              </h1>
              <p className="section__sub">
                Cada proyecto, precio cerrado. Sin sorpresas.
              </p><p className="section__sub">
                ¿No sabes qué se adapta mejor a tu negocio?
              </p> <br />
              <a href="mailto:info@katan.es" className="btn btn--ghost">
              Escribenos y te asesoramos gratis →
            </a>
            </header>
            <ServiceSwitcher />
          </div>
        </section>
        {/* ── TICKET 3: Extras Marquee ────────────────────────────────────────── */}
        <section className="section section--dark" id="modulos">
          <div className="container">
            <header className="section__header" style={{ marginBottom: '3rem' }}>
              <p className="section-label">/Extras</p>
              <h2 className="section__h2">Servicios <span className="accent">adicionales.</span></h2>
              <p className="section__sub">
                Precio fijo por módulo. Sin sorpresas. Elige cuando contratarlos.
              </p>
            </header>
          </div>

          {/* El carrusel va fuera del container para ocupar todo el ancho */}
          <ExtrasMarquee />

          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3.5rem' }}>
            <p className="section__sub" style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.4rem' }}>
              ¿No encuentras el servicio exacto o necesitas algo a medida?
            </p>
            <a href="mailto:info@katan.es" className="btn btn--ghost">
              Cuéntanos tu idea →
            </a>
          </div>


        </section>

        {/* ── TICKET 4: Specs Table (unchanged) ───────────────────────────── */}
        <section className="section section--dark" id="specs" style={{ paddingTop: '2rem' }}>
          {/* Orbes de fondo */}
          <div className="specs__visual" aria-hidden="true">
            <div className="glow-orb orb-specs-1"></div>
            <div className="glow-orb orb-specs-2"></div>
          </div>
          <div className="container">
            <header className="section__header" style={{ marginBottom: '2.5rem' }}>
              <h2
                className="section__h2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', textTransform: 'none' }}
              >
                Especificaciones <span className="accent"> técnicas.</span>
              </h2>
              <p className="section__sub">
                Comparativa técnica detallada de nuestros serviciones.
              </p>
            </header>

            <SpecsCarousel />

            <div className="table-responsive">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>01 / Landing</th>
                    <th className="col-highlight">02 / Corporativa</th>
                    <th>03 / E-Commerce</th>
                    <th>04 / App</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Contenido</strong></td>
                    <td>Hasta 5 secciones</td>
                    <td className="col-highlight">Hasta 10 páginas</td>
                    <td>Ilimitado</td>
                    <td>Pantallas ilimitadas</td>
                  </tr>
                  <tr>
                    <td><strong>Diseño a medida</strong></td>
                    <td>100% Personalizado</td>
                    <td className="col-highlight">100% Personalizado</td>
                    <td>100% Personalizado</td>
                    <td>100% Personalizado</td>
                  </tr>
                  <tr>
                    <td><strong>Diseño Responsive</strong></td>
                    <td><span className="check-yes">✓</span></td>
                    <td className="col-highlight"><span className="check-yes">✓</span></td>
                    <td><span className="check-yes">✓</span></td>
                    <td><span className="check-yes">✓</span></td>
                  </tr>
                  <tr>
                    <td><strong>SEO On-Page</strong></td>
                    <td>Básico</td>
                    <td className="col-highlight">Avanzado (Schema)</td>
                    <td>Avanzado + Rich Snippets</td>
                    <td><span className="check-no">—</span></td>
                  </tr>
                  <tr>
                    <td><strong>Blog Integrado</strong></td>
                    <td><span className="check-no">—</span></td>
                    <td className="col-highlight"><span className="check-yes">✓</span></td>
                    <td><span className="check-yes">✓</span></td>
                    <td><span className="check-no">—</span></td>
                  </tr>
                  <tr>
                    <td><strong>Multiidioma</strong></td>
                    <td><span className="check-no">—</span></td>
                    <td className="col-highlight">Hasta 2 idiomas</td>
                    <td>Hasta 3 idiomas</td>
                    <td>Hasta 2 idiomas</td>
                  </tr>
                  <tr>
                    <td><strong>Formularios de contacto</strong></td>
                    <td>Formulario básico</td>
                    <td className="col-highlight">Avanzados / Múltiples</td>
                    <td>Avanzados / Múltiples</td>
                    <td>Formularios in-app</td>
                  </tr>
                  <tr>
                    <td><strong>Analítica Web</strong></td>
                    <td>Google Analytics</td>
                    <td className="col-highlight">Analytics + Search Console</td>
                    <td>Analytics + SC + E-comm</td>
                    <td>Analytics + Firebase</td>
                  </tr>
                  <tr>
                    <td><strong>Core Web Vitals</strong></td>
                    <td>Optimizado (&gt;90)</td>
                    <td className="col-highlight">Optimización Premium (&gt;95)</td>
                    <td>Optimización Premium</td>
                    <td><span className="check-no">—</span></td>
                  </tr>
                  <tr>
                    <td><strong>Catálogo &amp; Pasarela</strong></td>
                    <td><span className="check-no">—</span></td>
                    <td className="col-highlight"><span className="check-no">—</span></td>
                    <td>Ilimitado (Stripe / PayPal)</td>
                    <td>Integrable (Stripe)</td>
                  </tr>
                  <tr>
                    <td><strong>Panel de administración</strong></td>
                    <td><span className="check-no">—</span></td>
                    <td className="col-highlight">Gestor básico (CMS)</td>
                    <td>Completo (Pedidos, stock)</td>
                    <td>Dashboard completo</td>
                  </tr>
                  <tr>
                    <td><strong>Rondas de revisiones</strong></td>
                    <td>2 rondas correctivas</td>
                    <td className="col-highlight">3 rondas correctivas</td>
                    <td>5 rondas correctivas</td>
                    <td>5 rondas correctivas</td>
                  </tr>
                  <tr>
                    <td><strong>Soporte post-lanzamiento</strong></td>
                    <td>15 días</td>
                    <td className="col-highlight">30 días</td>
                    <td>60 días</td>
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
                Cuéntanos tu proyecto. Respuesta en menos de 48&nbsp;h,
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
                <span>Proyectos entregados a tiempo</span>
                <span className="cta-final__proof-dot" />
                <span>PageSpeed &gt; 95 garantizado</span>
                <span className="cta-final__proof-dot" />
                <span>Código sin dependencias innecesarias</span>
                <span className="cta-final__proof-dot" />
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}