import { useState, useEffect, useRef, memo, useCallback, Fragment } from 'react'
import { createPortal } from 'react-dom'
import { Helmet } from 'react-helmet-async'
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
      <defs>
        <pattern id="sw-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.2" fill="#1E1E30" />
        </pattern>
        <linearGradient id="ld-hero-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF0080" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.07" />
        </linearGradient>
      </defs>
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#sw-grid)" />
      {/* Glow */}
      <circle cx="650" cy="260" r="380" fill="#FF0080" fillOpacity="0.1" />
      <circle cx="650" cy="260" r="200" fill="#FF0080" fillOpacity="0.12" />
      {/* Nav */}
      <rect x="80" y="42" width="1040" height="52" rx="6" fill="#0D0D1C" stroke="#252538" />
      <rect x="106" y="60" width="32" height="16" rx="3" fill="#FF0080" />
      <rect x="158" y="64" width="56" height="8" rx="2" fill="#252540" />
      <rect x="230" y="64" width="62" height="8" rx="2" fill="#252540" />
      <rect x="308" y="64" width="50" height="8" rx="2" fill="#252540" />
      <rect x="374" y="64" width="58" height="8" rx="2" fill="#252540" />
      <rect x="1010" y="56" width="88" height="24" rx="4" fill="#FF0080" fillOpacity="0.92" />
      {/* Hero text left */}
      <rect x="80" y="138" width="490" height="42" rx="4" fill="#252540" />
      <rect x="80" y="192" width="440" height="36" rx="4" fill="#1E1E30" />
      <rect x="80" y="244" width="340" height="16" rx="3" fill="#1A1A28" />
      <rect x="80" y="270" width="300" height="14" rx="3" fill="#1A1A28" />
      <rect x="80" y="308" width="164" height="44" rx="5" fill="#FF0080" fillOpacity="0.92" />
      <rect x="260" y="308" width="140" height="44" rx="5" fill="none" stroke="#FF0080" strokeOpacity="0.45" strokeWidth="1.5" />
      {/* Hero right: image block */}
      <rect x="640" y="118" width="500" height="330" rx="10" fill="#0D0D1A" stroke="#252538" />
      <rect x="640" y="118" width="500" height="330" rx="10" fill="url(#ld-hero-grad)" />
      <rect x="670" y="152" width="200" height="22" rx="3" fill="#252540" />
      <rect x="670" y="184" width="150" height="12" rx="2" fill="#1A1A28" />
      <rect x="670" y="208" width="120" height="12" rx="2" fill="#1A1A28" />
      <rect x="670" y="240" width="96" height="28" rx="4" fill="#FF0080" fillOpacity="0.85" />
      <rect x="890" y="148" width="216" height="280" rx="14" fill="#0B0B18" stroke="#252535" strokeWidth="1.5" />
      <rect x="904" y="176" width="188" height="220" rx="6" fill="#0F0F1E" />
      <rect x="914" y="192" width="110" height="10" rx="2" fill="#FF0080" fillOpacity="0.7" />
      <rect x="914" y="212" width="140" height="8" rx="2" fill="#1E1E2A" />
      <rect x="914" y="232" width="110" height="8" rx="2" fill="#1E1E2A" />
      <rect x="914" y="258" width="76" height="22" rx="3" fill="#FF0080" fillOpacity="0.8" />
      {/* Stats strip */}
      <rect x="80" y="476" width="1040" height="1" fill="#1E1E2A" />
      <rect x="80" y="492" width="200" height="70" rx="5" fill="#0D0D1C" stroke="#1E1E2A" />
      <rect x="102" y="508" width="72" height="16" rx="2" fill="#FF0080" fillOpacity="0.8" />
      <rect x="102" y="534" width="96" height="8" rx="2" fill="#1A1A28" />
      <rect x="300" y="492" width="200" height="70" rx="5" fill="#0D0D1C" stroke="#1E1E2A" />
      <rect x="322" y="508" width="72" height="16" rx="2" fill="#00E5FF" fillOpacity="0.65" />
      <rect x="322" y="534" width="96" height="8" rx="2" fill="#1A1A28" />
      <rect x="520" y="492" width="200" height="70" rx="5" fill="#0D0D1C" stroke="#1E1E2A" />
      <rect x="542" y="508" width="72" height="16" rx="2" fill="#FF0080" fillOpacity="0.65" />
      <rect x="542" y="534" width="96" height="8" rx="2" fill="#1A1A28" />
    </svg>
  )
})

const CorporativaDemo = memo(function CorporativaDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#sw-grid)" />
      <circle cx="240" cy="420" r="320" fill="#00E5FF" fillOpacity="0.06" />
      <circle cx="900" cy="180" r="300" fill="#FF0080" fillOpacity="0.07" />
      {/* Nav with multiple items */}
      <rect x="80" y="42" width="1040" height="52" rx="6" fill="#0D0D1C" stroke="#252538" />
      <rect x="106" y="60" width="32" height="16" rx="3" fill="#FF0080" />
      <rect x="158" y="63" width="54" height="8" rx="2" fill="#252540" />
      <rect x="228" y="63" width="62" height="8" rx="2" fill="#252540" />
      <rect x="306" y="63" width="48" height="8" rx="2" fill="#252540" />
      <rect x="370" y="63" width="66" height="8" rx="2" fill="#252540" />
      <rect x="452" y="63" width="54" height="8" rx="2" fill="#252540" />
      <rect x="1010" y="56" width="88" height="24" rx="4" fill="#FF0080" fillOpacity="0.9" />
      {/* Hero left text */}
      <rect x="80" y="136" width="460" height="40" rx="4" fill="#252540" />
      <rect x="80" y="186" width="380" height="26" rx="4" fill="#1E1E30" />
      <rect x="80" y="228" width="340" height="12" rx="3" fill="#1A1A28" />
      <rect x="80" y="250" width="300" height="12" rx="3" fill="#1A1A28" />
      <rect x="80" y="280" width="130" height="38" rx="4" fill="#FF0080" fillOpacity="0.9" />
      <rect x="226" y="280" width="130" height="38" rx="4" fill="none" stroke="#252540" strokeWidth="1.5" />
      {/* Hero right image */}
      <rect x="620" y="118" width="520" height="240" rx="8" fill="#0D0D1A" stroke="#252538" />
      <rect x="640" y="138" width="200" height="22" rx="3" fill="#252540" />
      <rect x="640" y="170" width="260" height="12" rx="2" fill="#1A1A28" />
      <rect x="640" y="192" width="220" height="12" rx="2" fill="#1A1A28" />
      <rect x="640" y="220" width="200" height="100" rx="6" fill="#1A1A28" stroke="#252538" />
      <rect x="860" y="138" width="248" height="200" rx="6" fill="#0B0B18" stroke="#252538" />
      <rect x="876" y="155" width="160" height="12" rx="2" fill="#252540" />
      <rect x="876" y="176" width="200" height="80" rx="4" fill="#1A1A28" />
      <rect x="876" y="266" width="110" height="12" rx="2" fill="#1A1A28" />
      <rect x="876" y="286" width="76" height="22" rx="3" fill="#FF0080" fillOpacity="0.75" />
      {/* Blog posts row */}
      <rect x="80" y="385" width="333" height="180" rx="8" fill="#0D0D1C" stroke="#252538" />
      <rect x="80" y="385" width="333" height="80" rx="8" fill="#1A1A28" />
      <rect x="100" y="476" width="160" height="12" rx="2" fill="#252540" />
      <rect x="100" y="498" width="200" height="8" rx="2" fill="#1A1A28" />
      <rect x="100" y="514" width="160" height="8" rx="2" fill="#1A1A28" />
      <rect x="432" y="385" width="333" height="180" rx="8" fill="#0D0D1C" stroke="#00E5FF" strokeOpacity="0.3" />
      <rect x="432" y="385" width="333" height="80" rx="8" fill="#1A1A28" />
      <rect x="452" y="476" width="160" height="12" rx="2" fill="#252540" />
      <rect x="452" y="498" width="200" height="8" rx="2" fill="#1A1A28" />
      <rect x="452" y="514" width="160" height="8" rx="2" fill="#1A1A28" />
      <rect x="784" y="385" width="336" height="180" rx="8" fill="#0D0D1C" stroke="#252538" />
      <rect x="784" y="385" width="336" height="80" rx="8" fill="#1A1A28" />
      <rect x="804" y="476" width="160" height="12" rx="2" fill="#252540" />
      <rect x="804" y="498" width="200" height="8" rx="2" fill="#1A1A28" />
      <rect x="804" y="514" width="160" height="8" rx="2" fill="#1A1A28" />
    </svg>
  )
})

const EcommerceDemo = memo(function EcommerceDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#sw-grid)" />
      <circle cx="750" cy="300" r="380" fill="#FF0080" fillOpacity="0.07" />
      {/* Nav */}
      <rect x="80" y="42" width="1040" height="52" rx="6" fill="#0D0D1C" stroke="#252538" />
      <rect x="106" y="60" width="32" height="16" rx="3" fill="#FF0080" />
      <rect x="160" y="64" width="52" height="8" rx="2" fill="#252540" />
      <rect x="228" y="64" width="60" height="8" rx="2" fill="#252540" />
      {/* Search bar */}
      <rect x="440" y="56" width="320" height="26" rx="13" fill="#0B0B18" stroke="#252538" />
      <rect x="460" y="65" width="100" height="8" rx="2" fill="#1A1A28" />
      {/* Cart icon with badge */}
      <g stroke="#FF0080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 1024 62 h 5 l 5 14 h 16 l 4 -10 h -21" />
        <circle cx="1036" cy="82" r="3" fill="#FF0080" stroke="none" />
        <circle cx="1048" cy="82" r="3" fill="#FF0080" stroke="none" />
      </g>
      <circle cx="1050" cy="63" r="8" fill="#FF0080" />
      <text x="1050" y="67" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">3</text>
      <rect x="1070" y="56" width="36" height="26" rx="4" fill="none" stroke="#252538" />
      {/* Sidebar filters */}
      <rect x="80" y="116" width="195" height="440" rx="6" fill="#0D0D1C" stroke="#252538" />
      <rect x="100" y="136" width="100" height="10" rx="2" fill="#252540" />
      <rect x="100" y="162" width="80" height="8" rx="2" fill="#1A1A28" />
      <rect x="100" y="180" width="95" height="8" rx="2" fill="#1A1A28" />
      <rect x="100" y="198" width="75" height="8" rx="2" fill="#1A1A28" />
      <rect x="100" y="216" width="88" height="8" rx="2" fill="#1A1A28" />
      <rect x="100" y="250" width="100" height="10" rx="2" fill="#252540" />
      {/* Price range slider */}
      <rect x="100" y="278" width="155" height="3" rx="2" fill="#1E1E2A" />
      <rect x="100" y="278" width="90" height="3" rx="2" fill="#FF0080" fillOpacity="0.8" />
      <circle cx="190" cy="280" r="5" fill="#FF0080" />
      {/* Product grid: 3 cols × 2 rows */}
      {[0, 1, 2].map(col => (
        <g key={`top-${col}`}>
          <rect x={292 + col * 306} y={116} width={292} height={230} rx="6" fill="#0D0D1C" stroke={col === 1 ? '#FF0080' : '#252538'} strokeOpacity={col === 1 ? 0.5 : 1} />
          {/* product image area */}
          <rect x={292 + col * 306} y={116} width={292} height={138} rx="6" fill={col === 1 ? 'rgba(255,0,128,0.12)' : '#111120'} />
          {/* product title */}
          <rect x={310 + col * 306} y={268} width={160} height={10} rx="2" fill="#252540" />
          {/* price */}
          <rect x={310 + col * 306} y={288} width={80} height={12} rx="2" fill="#FF0080" fillOpacity="0.8" />
          {/* add to cart */}
          <rect x={310 + col * 306} y={314} width={120} height={24} rx="4" fill={col === 1 ? '#FF0080' : 'none'} fillOpacity={col === 1 ? 0.85 : 0} stroke={col === 1 ? 'none' : '#252538'} />
        </g>
      ))}
      {[0, 1, 2].map(col => (
        <g key={`bot-${col}`}>
          <rect x={292 + col * 306} y={362} width={292} height={194} rx="6" fill="#0D0D1C" stroke="#252538" />
          <rect x={292 + col * 306} y={362} width={292} height={108} rx="6" fill="#111120" />
          <rect x={310 + col * 306} y={484} width={140} height={10} rx="2" fill="#252540" />
          <rect x={310 + col * 306} y={504} width={70} height={10} rx="2" fill="#FF0080" fillOpacity="0.7" />
          <rect x={310 + col * 306} y={526} width={110} height={22} rx="4" fill="none" stroke="#252538" />
        </g>
      ))}
    </svg>
  )
})

// Auto-discover service images from public/img/<folder>/.
// Drop any image into the folder and it appears in that service's carousel.
const _IMGS = import.meta.glob(
  '/public/img/{landing,corporativa,ecommerce,app}/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, as: 'url' }
)

function slidesInFolder(folder) {
  return Object.entries(_IMGS)
    .filter(([key]) => key.includes(`/img/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)
}

function ServiceCarousel({ slides, fallback = null }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (slides.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 3200)
    return () => clearInterval(t)
  }, [slides.length])
  if (!slides.length) return fallback
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }}
        />
      ))}
    </div>
  )
}

const AppDemo = memo(function AppDemo() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#07070F" />
      <rect width="1200" height="600" fill="url(#sw-grid)" />
      <circle cx="600" cy="300" r="400" fill="#FF0080" fillOpacity="0.09" />
      <circle cx="600" cy="300" r="180" fill="#FF0080" fillOpacity="0.1" />
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
    demo: <ServiceCarousel slides={slidesInFolder('landing')} fallback={<LandingDemo />} />,
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
    demo: <ServiceCarousel slides={slidesInFolder('corporativa')} fallback={<CorporativaDemo />} />,
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
    demo: <ServiceCarousel slides={slidesInFolder('ecommerce')} fallback={<EcommerceDemo />} />,
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
    demo: <ServiceCarousel slides={slidesInFolder('app')} fallback={<AppDemo />} />,
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

function SpecsCarousel({ initialCol = 0 }) {
  const [active, setActive]   = useState(initialCol)
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
// SPECS MODAL — full table popup with dynamic column highlight
// ─────────────────────────────────────────────────────────────────────────────
function SpecsModal({ colIndex, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return createPortal(
    <div className="specs-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="specs-modal" onClick={e => e.stopPropagation()}>
        <div className="specs-modal__header">
          <button className="specs-modal__close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="specs-modal__table-wrap">
          <SpecsCarousel initialCol={colIndex} />
          <div className="table-responsive">
            <table className="specs-table">
              <thead>
                <tr>
                  <th></th>
                  {SPECS_COLS.map((col, i) => (
                    <th key={i} className={i === colIndex ? 'col-highlight' : ''}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SPECS_ROWS.map((row, ri) => (
                  <tr key={ri}>
                    <td><strong>{row.label}</strong></td>
                    {row.values.map((val, vi) => (
                      <td key={vi} className={vi === colIndex ? 'col-highlight' : ''}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>,
    document.body
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
  const [specsCol, setSpecsCol] = useState(null)
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
      {specsCol !== null && <SpecsModal colIndex={specsCol} onClose={() => setSpecsCol(null)} />}

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
          <h2 className="svc-sw__title">
            <span style={{ color: SVC_COLORS[active] }}>{svc.num}</span> {svc.label}
          </h2>
          <p className="svc-sw__desc">{svc.desc}</p>

          <ul className="svc-sw__features">
            {svc.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <button className="specs-link-btn" onClick={() => setSpecsCol(active)}>Ver todo</button>

          {/* Footer aquí también para móvil (en desktop se oculta via CSS) */}
          <div className="svc-sw__footer svc-sw__footer--mobile">
            <div className="svc-sw__price-wrap">
              <span className="svc-sw__price">{svc.price}</span>
              <span className="svc-sw__price-note">+ IVA</span>
            </div>
            <a href="#contacto" className="btn btn--chamfer btn--large" style={{ background: SVC_COLORS[active] }}>
              Solicitar Presupuesto →
            </a>
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
            <a href="#contacto" className="btn btn--chamfer btn--large" style={{ background: SVC_COLORS[active] }}>
              Solicitar Presupuesto →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Extras Marquee (dos filas, estilo tech-stack) ─────────────────────────
const EXTRAS_ROW_1 = EXTRAS.slice(0, 7)
const EXTRAS_ROW_2 = EXTRAS.slice(7)

function ExtrasMarquee() {
  return (
    <div className="extras-marquee">
      <div className="extras-marquee__track">
        {[...EXTRAS_ROW_1, ...EXTRAS_ROW_1].map((e, i) => {
          const Icon = e.icon
          return (
            <div key={i} className="extras-card">
              <div className="extras-card__header">
                <Icon size={18} className="extras-card__icon" aria-hidden="true" />
                <span className="extras-card__title">{e.title}</span>
              </div>
              <p className="extras-card__desc">{e.desc}</p>
            </div>
          )
        })}
      </div>
      <div className="extras-marquee__track extras-marquee__track--reverse">
        {[...EXTRAS_ROW_2, ...EXTRAS_ROW_2].map((e, i) => {
          const Icon = e.icon
          return (
            <div key={i} className="extras-card">
              <div className="extras-card__header">
                <Icon size={18} className="extras-card__icon" aria-hidden="true" />
                <span className="extras-card__title">{e.title}</span>
              </div>
              <p className="extras-card__desc">{e.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HORIZONTAL SCROLL SERVICES — scroll-jacked horizontal card panning
// ─────────────────────────────────────────────────────────────────────────────
function ServiciosHorizontal() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const progressBarRef = useRef(null)
  const progressLabelRef = useRef(null)
  const [specsCol, setSpecsCol] = useState(null)

  useEffect(() => {
    let maxTranslate = 0

    const measure = () => {
      const track = trackRef.current
      const outer = outerRef.current
      if (!track || !outer) return
      if (window.innerWidth < 1200) {
        outer.style.height = 'auto'
        return
      }
      const paddingRight = parseFloat(getComputedStyle(track).paddingRight) || 0
      maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth - paddingRight + 108)
      outer.style.height = `${maxTranslate + window.innerHeight}px`
      handleScroll()
    }

    const handleScroll = () => {
      const el = outerRef.current
      const track = trackRef.current
      if (!el || !track || window.innerWidth < 1200 || maxTranslate <= 0) return
      const rect = el.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / maxTranslate))
      track.style.transform = `translateX(${-p * maxTranslate}px)`
      if (progressBarRef.current) progressBarRef.current.style.width = `${p * 100}%`
      if (progressLabelRef.current) {
        const n = Math.min(SERVICES.length - 1, Math.round(p * (SERVICES.length - 1))) + 1
        progressLabelRef.current.textContent =
          `${String(n).padStart(2, '0')} / ${String(SERVICES.length).padStart(2, '0')}`
      }
    }

    requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={outerRef} className="svc-hs" id="servicios">
      {specsCol !== null && <SpecsModal colIndex={specsCol} onClose={() => setSpecsCol(null)} />}
      <div className="svc-hs__sticky">

        <div className="svc-hs__head">
          <p className="section-label">/Servicios</p>
          <h2 className="section__h2">
            Lo que <span className="accent">construimos.</span>
          </h2>
        </div>

        <div className="svc-hs__track-wrap">
          <div ref={trackRef} className="svc-hs__track">
            {SERVICES.map((svc, idx) => (
              <article key={svc.id} className="svc-hs__card">
                <div className="svc-hs__card-left">
                  <h3 className="svc-hs__card-title">
                    <span className="svc-hs__card-num">{svc.num}</span> {svc.label}
                  </h3>
                  <p className="svc-hs__card-desc">{svc.desc}</p>
                  <ul className="svc-hs__card-features">
                    {svc.features.map((f, fi) => (
                      <li key={fi}>{f}</li>
                    ))}
                  </ul>
                  <button className="specs-link-btn" onClick={() => setSpecsCol(idx)}>Ver todo</button>
                  <div className="svc-hs__card-footer">
                    <div>
                      <span className="svc-hs__card-price">{svc.price}</span>
                      <span className="svc-hs__card-price-note"> + IVA</span>
                    </div>
                    <a href="#contacto" className="btn btn--chamfer">Solicitar →</a>
                  </div>
                </div>
                <div className="svc-hs__card-right" aria-hidden="true">
                  <div className="svc-hs__card-mockup">{svc.demo}</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="svc-hs__progress">
          <span ref={progressLabelRef} className="svc-hs__progress-label">
            01 / {String(SERVICES.length).padStart(2, '0')}
          </span>
          <div className="svc-hs__progress-bar-wrap">
            <div ref={progressBarRef} className="svc-hs__progress-bar" />
          </div>
          <span className="svc-hs__hint">↓ scroll</span>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION EXPORT — used by MainPage for single-page scroll layout
// ─────────────────────────────────────────────────────────────────────────────
export function ServiciosSection() {
  return (
    <>
      <ServiciosHorizontal />

      <section className="section section--dark" id="modulos">
        <div className="container">
          <header className="section__header" style={{ marginBottom: '3rem' }}>
            <p className="section-label">/Servicios adicionales</p>
          </header>
        </div>
        <ExtrasMarquee />
      </section>

    </>
  )
}

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

      </main>

      <Footer />
    </>
  )
}