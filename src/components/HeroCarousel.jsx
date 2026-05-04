// HeroCarousel.jsx — Katan Studio
// Hero animado con carrusel, orbes y partículas de humo en transición
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ── Datos ─────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 'landing',
    num: '01',
    label: 'Landing Page',
    sublabel: 'Conversión máxima',
    desc: 'Una página enfocada en captar y convertir. Diseño sin distracciones, copy directo y velocidad de carga brutal.',
    price: 'Desde 350 €',
    color: '#FF0080',
    colorRgb: '255, 0, 128',
    tags: ['Diseño a medida', 'SEO On-Page', 'PageSpeed >90', '2–3 semanas'],
  },
  {
    id: 'corporativa',
    num: '02',
    label: 'Web Corporativa',
    sublabel: 'Presencia digital completa',
    desc: 'La estructura ideal para presentar tu negocio con claridad. Blog, múltiples secciones y SEO avanzado integrado.',
    price: 'Desde 750 €',
    color: '#FF0080',
    colorRgb: '0, 229, 255',
    tags: ['Hasta 10 páginas', 'Blog integrado', 'Schema Markup', '4–6 semanas'],
  },
  {
    id: 'ecommerce',
    num: '03',
    label: 'E-Commerce & App',
    sublabel: 'Vende sin límites',
    desc: 'Tienda lista para vender. Catálogo ilimitado, pagos integrados, panel de gestión y emails automáticos.',
    price: 'Desde 2.000 €',
    color: '#FF0080',
    colorRgb: '176, 110, 255',
    tags: ['Stripe / PayPal', 'Panel admin', 'Rich Snippets', '8–10 semanas'],
  },
]

// ── Generador de partículas de humo ───────────────────────────────
function makeParticles(color) {
  return Array.from({ length: 32 }, (_, i) => {
    const isSmoke = i < 12
    const angle = (i / 32) * Math.PI * 2 + (Math.random() - 0.5) * 1.2
    const dist   = isSmoke ? 80 + Math.random() * 160 : 60 + Math.random() * 220
    return {
      id: i,
      x:  40 + Math.random() * 20,
      y:  35 + Math.random() * 30,
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      size:    isSmoke ? 28 + Math.random() * 48 : 3 + Math.random() * 9,
      dur:     isSmoke ? 0.9 + Math.random() * 0.6 : 0.45 + Math.random() * 0.4,
      blurS:   isSmoke ? 8  : 0,
      blurE:   isSmoke ? 28 : 6,
      opS:     isSmoke ? 0.18 : 0.75,
      color,
    }
  })
}

// ── SVG Mockups ────────────────────────────────────────────────────
function LandingMockup({ color }) {
  return (
    <svg className="hc-svg" viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fondo */}
      <rect width="520" height="320" rx="14" fill="#0D0D1A" />
      {/* Chrome */}
      <rect width="520" height="34" rx="14" fill="#111120" />
      <rect y="22" width="520" height="12" fill="#111120" />
      <circle cx="18" cy="17" r="5.5" fill="#FF5F57" />
      <circle cx="35" cy="17" r="5.5" fill="#FFBD2E" />
      <circle cx="52" cy="17" r="5.5" fill="#28CA41" />
      <rect x="88" y="11" width="260" height="13" rx="6.5" fill="#1A1A2C" />
      <rect x="460" y="11" width="28" height="13" rx="3" fill="#1A1A2C" />
      {/* Nav */}
      <rect x="20" y="48" width="480" height="34" rx="5" fill="#111120" />
      <rect x="32" y="59" width="44" height="12" rx="2.5" fill={color} />
      <rect x="190" y="61" width="32" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.35" />
      <rect x="232" y="61" width="38" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.35" />
      <rect x="280" y="61" width="32" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.35" />
      <rect x="400" y="56" width="80" height="18" rx="4" fill={color} fillOpacity="0.9" />
      {/* Hero area */}
      <defs>
        <linearGradient id="lg-hero" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0D0D1A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="20" y="96" width="480" height="136" rx="5" fill="#0A0A14" />
      <rect x="20" y="96" width="480" height="136" rx="5" fill="url(#lg-hero)" />
      {/* Headline */}
      <rect x="44" y="116" width="200" height="18" rx="3.5" fill="#F0F4F8" fillOpacity="0.9" />
      <rect x="44" y="142" width="160" height="18" rx="3.5" fill="#F0F4F8" fillOpacity="0.9" />
      <rect x="44" y="170" width="230" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.5" />
      <rect x="44" y="183" width="190" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.35" />
      {/* CTA */}
      <rect x="44" y="200" width="100" height="22" rx="3" fill={color} className="hc-pulse-el" />
      <rect x="152" y="200" width="90" height="22" rx="3" fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Right image placeholder */}
      <rect x="310" y="100" width="180" height="124" rx="5" fill={color} fillOpacity="0.06" />
      <rect x="320" y="120" width="160" height="80" rx="4" fill={color} fillOpacity="0.08" />
      <rect x="334" y="134" width="132" height="52" rx="3" fill="#0D0D1A" />
      <rect x="344" y="145" width="80" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.5" />
      <rect x="344" y="159" width="60" height="8" rx="2" fill={color} fillOpacity="0.7" />
      {/* Feature trio */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={20 + i * 162} y="246" width="154" height="60" rx="5" fill="#111120" />
          <rect x={30 + i * 162} y="256" width={i === 1 ? 70 : 60} height="7" rx="2" fill={i === 1 ? color : '#F0F4F8'} fillOpacity={i === 1 ? 0.8 : 0.6} />
          <rect x={30 + i * 162} y="270" width="114" height="6" rx="2" fill="#8A9BB4" fillOpacity="0.35" />
          <rect x={30 + i * 162} y="282" width="90" height="6" rx="2" fill="#8A9BB4" fillOpacity="0.25" />
        </g>
      ))}
    </svg>
  )
}

function CorporativaMockup({ color }) {
  return (
    <svg className="hc-svg" viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="320" rx="14" fill="#0D0D1A" />
      <rect width="520" height="34" rx="14" fill="#111120" />
      <rect y="22" width="520" height="12" fill="#111120" />
      <circle cx="18" cy="17" r="5.5" fill="#FF5F57" />
      <circle cx="35" cy="17" r="5.5" fill="#FFBD2E" />
      <circle cx="52" cy="17" r="5.5" fill="#28CA41" />
      <rect x="88" y="11" width="260" height="13" rx="6.5" fill="#1A1A2C" />
      {/* Nav full width con links */}
      <rect x="20" y="48" width="480" height="34" rx="5" fill="#111120" />
      <rect x="32" y="58" width="40" height="14" rx="2.5" fill={color} />
      <rect x="148" y="61" width="36" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.4" />
      <rect x="194" y="61" width="40" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.4" />
      <rect x="244" y="61" width="34" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.4" />
      <rect x="288" y="61" width="44" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.4" />
      <rect x="340" y="61" width="30" height="8" rx="2" fill={color} fillOpacity="0.9" />
      <rect x="416" y="56" width="72" height="18" rx="4" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      {/* Layout 2 cols */}
      <rect x="20" y="96" width="124" height="210" rx="5" fill="#111120" />
      <rect x="32" y="110" width="56" height="9" rx="2" fill="#F0F4F8" fillOpacity="0.5" />
      <rect x="32" y="128" width="88" height="7" rx="2" fill={color} fillOpacity="0.85" />
      <rect x="32" y="142" width="76" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.35" />
      <rect x="32" y="156" width="84" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.35" />
      <rect x="32" y="170" width="68" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.35" />
      <rect x="32" y="184" width="80" height="1" fill="#1E1E2A" />
      <rect x="32" y="194" width="50" height="7" rx="2" fill="#F0F4F8" fillOpacity="0.5" />
      <rect x="32" y="208" width="88" height="44" rx="4" fill="#0A0A14" />
      <rect x="40" y="216" width="56" height="6" rx="2" fill="#F0F4F8" fillOpacity="0.4" />
      <rect x="40" y="228" width="70" height="6" rx="2" fill="#8A9BB4" fillOpacity="0.3" />
      <rect x="40" y="240" width="50" height="6" rx="2" fill="#8A9BB4" fillOpacity="0.25" />
      {/* Hero banner derecha */}
      <rect x="154" y="96" width="346" height="68" rx="5" fill="#0A0A14" />
      <defs>
        <linearGradient id="lg-corp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0A0A14" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="154" y="96" width="346" height="68" rx="5" fill="url(#lg-corp)" />
      <rect x="168" y="112" width="160" height="14" rx="3" fill="#F0F4F8" fillOpacity="0.85" />
      <rect x="168" y="132" width="250" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.45" />
      <rect x="168" y="145" width="200" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.3" />
      {/* Blog cards */}
      {[0,1].map(i => (
        <g key={i}>
          <rect x={154 + i * 178} y="174" width="168" height="132" rx="5" fill="#111120" stroke={i === 1 ? color : 'none'} strokeWidth={i === 1 ? 1 : 0} strokeOpacity="0.35" />
          <rect x={154 + i * 178} y="174" width="168" height="58" rx="5" fill={color} fillOpacity={i === 1 ? 0.15 : 0.07} />
          <rect x={164 + i * 178} y="176" width="148" height="52" rx="4" fill={color} fillOpacity={i === 1 ? 0.08 : 0.04} />
          <rect x={164 + i * 178} y="242" width="110" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.7" />
          <rect x={164 + i * 178} y="256" width="138" height="6" rx="2" fill="#8A9BB4" fillOpacity="0.4" />
          <rect x={164 + i * 178} y="268" width="110" height="6" rx="2" fill="#8A9BB4" fillOpacity="0.3" />
          <rect x={164 + i * 178} y="280" width="66" height="14" rx="3" fill={color} fillOpacity={i === 1 ? 0.9 : 0.6} />
        </g>
      ))}
      {/* Cursor parpadeante */}
      <rect x="356" y="12" width="2" height="10" rx="1" fill="#F0F4F8" fillOpacity="0.7" className="hc-cursor-el" />
    </svg>
  )
}

function EcommerceMockup({ color }) {
  return (
    <svg className="hc-svg" viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="320" rx="14" fill="#0D0D1A" />
      <rect width="520" height="34" rx="14" fill="#111120" />
      <rect y="22" width="520" height="12" fill="#111120" />
      <circle cx="18" cy="17" r="5.5" fill="#FF5F57" />
      <circle cx="35" cy="17" r="5.5" fill="#FFBD2E" />
      <circle cx="52" cy="17" r="5.5" fill="#28CA41" />
      <rect x="88" y="11" width="260" height="13" rx="6.5" fill="#1A1A2C" />
      <rect x="20" y="48" width="480" height="34" rx="5" fill="#111120" />
      <rect x="32" y="58" width="44" height="14" rx="2.5" fill={color} />
      <rect x="180" y="54" width="180" height="22" rx="11" fill="#1A1A2C" />
      <circle cx="350" cy="65" r="6" stroke="#8A9BB4" strokeWidth="1.5" fill="none" />
      <line x1="355" y1="70" x2="359" y2="74" stroke="#8A9BB4" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="404" y="57" width="22" height="18" rx="3" fill="none" stroke="#F0F4F8" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="408" cy="75" r="2.5" fill={color} />
      <circle cx="422" cy="75" r="2.5" fill={color} />
      <circle cx="424" cy="55" r="6" fill={color} />
      <text x="424" y="58.5" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif" fontWeight="bold">3</text>
      <rect x="440" y="55" width="52" height="22" rx="4" fill={color} fillOpacity="0.85" />
      <rect x="20" y="96" width="108" height="210" rx="5" fill="#111120" />
      <rect x="30" y="108" width="56" height="8" rx="2" fill="#F0F4F8" fillOpacity="0.6" />
      <rect x="30" y="124" width="86" height="1" fill="#1E1E2A" />
      <rect x="30" y="132" width="68" height="7" rx="2" fill={color} fillOpacity="0.85" />
      <rect x="30" y="146" width="58" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.35" />
      <rect x="30" y="160" width="72" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.35" />
      <rect x="30" y="174" width="60" height="7" rx="2" fill="#8A9BB4" fillOpacity="0.35" />
      <rect x="30" y="190" width="86" height="1" fill="#1E1E2A" />
      <rect x="30" y="200" width="44" height="7" rx="2" fill="#F0F4F8" fillOpacity="0.5" />
      <rect x="30" y="216" width="78" height="3" rx="1.5" fill="#1E1E2A" />
      <rect x="30" y="216" width="48" height="3" rx="1.5" fill={color} fillOpacity="0.8" />
      <circle cx="78" cy="217.5" r="5" fill={color} />
      <rect x="30" y="232" width="44" height="7" rx="2" fill="#F0F4F8" fillOpacity="0.5" />
      {[0,1,2,3].map(i => (
        <rect key={i} x={30 + i * 12} y="248" width="8" height="8" rx="1" fill={color} fillOpacity={i < 3 ? 0.9 : 0.2} />
      ))}
      {[0,1,2,3,4,5,6,7,8,9].map(i => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 140 + col * 132
        const y = 96 + row * 108
        const featured = i === 1
        return (
          <g key={i}>
            <rect x={x} y={y} width="122" height="98" rx="5"
              fill="#111120"
              stroke={featured ? color : '#1A1A2A'}
              strokeWidth={featured ? 1.2 : 0.5}
              strokeOpacity={featured ? 0.6 : 1}
            />
            <rect x={x} y={y} width="122" height="54" rx="5"
              fill={featured ? color : '#0A0A14'}
              fillOpacity={featured ? 0.15 : 1}
            />
            {featured && (
              <rect x={x+8} y={y+4} width="34" height="14" rx="3" fill={color} fillOpacity="0.9" />
            )}
            <rect x={x+8} y={y+62} width="68" height="7" rx="2" fill="#F0F4F8" fillOpacity="0.7" />
            <rect x={x+8} y={y+75} width="46" height="8" rx="2" fill={color} fillOpacity="0.9" />
            <rect x={x+76} y={y+72} width="38" height="16" rx="3" fill={color} fillOpacity={featured ? 1 : 0.55} />
          </g>
        )
      })}
    </svg>
  )
}

// ── CSS embebido ──────────────────────────────────────────────────
const CSS = `
/* ═══════════════════════════════════════════════
   HERO CAROUSEL — Katan Studio
   ═══════════════════════════════════════════════ */

.hc-wrap {
  position: relative;
  width: 100%;
  min-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #07070F;
}

/* ── Fondo ── */
.hc-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.hc-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* ── Orbes ── */
.hc-orb {
  position: absolute;
  border-radius: 50%;
  will-change: transform, background;
  pointer-events: none;
}
.hc-orb--1 {
  width: 720px; height: 720px;
  top: -240px; right: -120px;
  opacity: 0.13;
  filter: blur(100px);
  transition: background 1.4s ease;
  animation: orb1 11s ease-in-out infinite;
}
.hc-orb--2 {
  width: 560px; height: 560px;
  bottom: -180px; left: -120px;
  opacity: 0.09;
  filter: blur(80px);
  transition: background 1.4s ease;
  animation: orb2 15s ease-in-out infinite;
}
.hc-orb--3 {
  width: 380px; height: 380px;
  top: 28%; left: 42%;
  opacity: 0.07;
  filter: blur(70px);
  transition: background 1.4s ease;
  animation: orb3 13s ease-in-out infinite;
}
.hc-orb--4 {
  width: 200px; height: 200px;
  top: 60%; right: 25%;
  opacity: 0.08;
  filter: blur(50px);
  transition: background 1.4s ease;
  animation: orb4 9s ease-in-out infinite;
}

@keyframes orb1 {
  0%,100%  { transform: translate(0,0)     scale(1);    }
  33%      { transform: translate(-70px, 50px) scale(1.1); }
  66%      { transform: translate(45px,-40px) scale(0.93); }
}
@keyframes orb2 {
  0%,100%  { transform: translate(0,0)     scale(1);   }
  40%      { transform: translate(90px,-70px) scale(1.06); }
  72%      { transform: translate(-50px, 40px) scale(0.9);  }
}
@keyframes orb3 {
  0%,100%  { transform: translate(0,0)     scale(1);    }
  50%      { transform: translate(-70px,70px) scale(1.18); }
}
@keyframes orb4 {
  0%,100%  { transform: translate(0,0)     scale(1); }
  45%      { transform: translate(40px,-50px) scale(1.1); }
}

/* ── Partículas de humo ── */
.hc-particles {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  overflow: hidden;
}
.hc-particle {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: particle-fly var(--dur, 0.8s) forwards ease-out;
  will-change: transform, opacity, filter;
}
@keyframes particle-fly {
  0% {
    transform: translate(-50%,-50%) translate(0,0) scale(1);
    opacity: var(--ops, 0.8);
    filter: blur(var(--bs, 0px));
  }
  100% {
    transform: translate(-50%,-50%) translate(var(--dx,0),var(--dy,0)) scale(0);
    opacity: 0;
    filter: blur(var(--be, 12px));
  }
}

/* ── Layout principal ── */
.hc-inner {
  position: relative;
  z-index: 3;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 0;
  padding: 5.5rem 5vw 5rem;
  min-height: 78vh;
}

/* ── Lado texto ── */
.hc-left {
  padding-right: 4vw;
}

.hc-kicker {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
  transition: color 0.8s ease;
  animation: hc-up 0.65s cubic-bezier(0.16,1,0.3,1) both;
}
.hc-kicker::before {
  content: '';
  display: inline-block;
  width: 28px; height: 1px;
  background: currentColor;
  opacity: 0.55;
  flex-shrink: 0;
}

.hc-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2.6rem, 4.8vw, 5.2rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: #F0F4F8;
  margin-bottom: 1.6rem;
  animation: hc-up 0.65s 0.06s cubic-bezier(0.16,1,0.3,1) both;
}

.hc-desc {
  font-family: 'Instrument Sans', sans-serif;
  font-size: clamp(0.9rem, 1.15vw, 1.05rem);
  color: #8A9BB4;
  line-height: 1.75;
  max-width: 40ch;
  margin-bottom: 2rem;
  animation: hc-up 0.65s 0.12s cubic-bezier(0.16,1,0.3,1) both;
}

.hc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 2.6rem;
  animation: hc-up 0.65s 0.17s cubic-bezier(0.16,1,0.3,1) both;
}
.hc-tag {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  padding: 0.28rem 0.7rem;
  border: 1px solid var(--tc, #FF0080);
  color: var(--tc, #FF0080);
  opacity: 0.65;
  border-radius: 2px;
  transition: opacity 0.2s;
}
.hc-tag:hover { opacity: 1; }

.hc-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: hc-up 0.65s 0.22s cubic-bezier(0.16,1,0.3,1) both;
}

.hc-price {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #F0F4F8;
  white-space: nowrap;
}
.hc-price small {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  font-weight: 400;
  color: #8A9BB4;
  margin-left: 0.3rem;
}

.hc-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1.8rem;
  background: var(--cc, #FF0080);
  color: #fff;
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  clip-path: polygon(9px 0%, 100% 0%, calc(100% - 9px) 100%, 0% 100%);
  transition: filter 0.2s, transform 0.2s, background 0.8s ease;
  position: relative;
  overflow: hidden;
}
.hc-cta::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.12);
  opacity: 0;
  transition: opacity 0.2s;
}
.hc-cta:hover::after { opacity: 1; }
.hc-cta:hover { transform: translateY(-2px); filter: brightness(1.1); }

/* ── Lado mockup ── */
.hc-right {
  animation: hc-mockup-in 0.75s 0.08s cubic-bezier(0.16,1,0.3,1) both;
}

.hc-mockup-frame {
  border-radius: 16px;
  overflow: hidden;
  transition: box-shadow 1.2s ease;
  animation: hc-float 7s ease-in-out infinite;
  cursor: default;
}
.hc-mockup-frame:hover {
  animation-play-state: paused;
}

@keyframes hc-float {
  0%,100% { transform: translateY(0) rotate3d(1,0.2,0, 1deg); }
  50%     { transform: translateY(-14px) rotate3d(1,0.2,0,-1deg); }
}

.hc-svg {
  display: block;
  width: 100%;
  height: auto;
}

/* Animaciones internas SVG */
.hc-pulse-el {
  animation: hc-pulse 2.2s ease-in-out infinite;
}
@keyframes hc-pulse {
  0%,100% { opacity: 0.85; }
  50%     { opacity: 1; filter: brightness(1.18); }
}
.hc-cursor-el {
  animation: hc-blink 1.1s step-start infinite;
}
@keyframes hc-blink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0; }
}

/* ── Animaciones de entrada ── */
@keyframes hc-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes hc-mockup-in {
  from {
    opacity: 0;
    transform: perspective(900px) rotateY(10deg) translateX(32px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: perspective(900px) rotateY(0) translateX(0) scale(1);
  }
}

/* ── Barra de progreso activo ── */
.hc-prog-bar {
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  animation: hc-progress 5s linear forwards;
}

/* ESTA REGLA PAUSA LA BARRA VISUAL CUANDO EL USUARIO INTERACTÚA */
.hc-wrap.is-paused .hc-prog-bar {
  animation-play-state: paused !important;
}

@keyframes hc-progress {
  from { width: 0%; }
  to   { width: 100%; }
}

/* ── Navegación inferior ── */
.hc-nav {
  position: relative;
  z-index: 4;
  display: flex;
  border-top: 1px solid #1A1A28;
}

.hc-nav-btn {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  padding: 1.3rem 2.2rem;
  background: none;
  border: none;
  border-right: 1px solid #1A1A28;
  color: #8A9BB4;
  cursor: pointer;
  overflow: hidden;
  transition: background 0.25s, color 0.25s;
}
.hc-nav-btn:last-child { border-right: none; }
.hc-nav-btn:hover { background: rgba(255,255,255,0.022); color: #C8D4E0; }

.hc-nav-btn--active { color: #F0F4F8; background: rgba(255,255,255,0.016); }

.hc-nav-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.64rem;
  letter-spacing: 0.22em;
  opacity: 0.45;
  transition: opacity 0.25s, color 0.25s;
}
.hc-nav-btn--active .hc-nav-num {
  opacity: 1;
  color: var(--bc, #FF0080);
}

.hc-nav-label {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: color 0.25s;
}

/* ── Responsive ── */
@media (max-width: 960px) {
  .hc-inner {
    grid-template-columns: 1fr;
    padding: 4rem 1.5rem 3rem;
    min-height: auto;
    gap: 2.5rem;
  }
  .hc-left { padding-right: 0; }
  .hc-title { font-size: clamp(2rem, 7vw, 3rem); }
  .hc-orb--1 { width: 440px; height: 440px; }
  .hc-orb--2 { width: 320px; height: 320px; }
  .hc-orb--3, .hc-orb--4 { display: none; }
}
@media (max-width: 640px) {
  .hc-actions { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .hc-nav { flex-wrap: wrap; }
  .hc-nav-btn { min-width: 50%; padding: 1rem 1.2rem; }
  .hc-nav-btn:nth-child(2) { border-right: none; }
  .hc-nav-btn:nth-child(3) { border-top: 1px solid #1A1A28; border-right: none; min-width: 100%; }
}
`

// ── Componente principal ──────────────────────────────────────────
export default function HeroCarousel() {
  const [active, setActive]       = useState(0)
  const [particles, setParticles] = useState([])
  const [navKey, setNavKey]       = useState(0)
  const [isPaused, setIsPaused]   = useState(false)

  const prevRef    = useRef(null)
  const pTimerRef  = useRef(null)

  // Dispara partículas al cambiar slide
  useEffect(() => {
    if (prevRef.current !== null && prevRef.current !== active) {
      const color = SLIDES[prevRef.current].color
      clearTimeout(pTimerRef.current)
      setParticles(makeParticles(color))
      pTimerRef.current = setTimeout(() => setParticles([]), 1500)
    }
    prevRef.current = active
    setNavKey(k => k + 1)
  }, [active])



  const handleNav = (i) => {
    if (i === active) return
    setActive(i)
  }

  const slide = SLIDES[active]

  return (
    <>
      <style>{CSS}</style>
      <div 
        className={`hc-wrap ${isPaused ? 'is-paused' : ''}`}
        onMouseDown={(e) => {
          if (e.button === 0) setIsPaused(true) 
        }}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)} 
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >

        {/* ── Fondo con orbes ── */}
        <div className="hc-bg">
          <div className="hc-grid" />
          <div className="hc-orb hc-orb--1" style={{ background: slide.color }} />
          <div className="hc-orb hc-orb--2" style={{ background: slide.color }} />
          <div className="hc-orb hc-orb--3" style={{ background: slide.color }} />
          <div className="hc-orb hc-orb--4" style={{ background: slide.color }} />
        </div>

        {/* ── Partículas de transición ── */}
        <div className="hc-particles" aria-hidden="true">
          {particles.map(p => (
            <div
              key={p.id}
              className="hc-particle"
              style={{
                left:      `${p.x}%`,
                top:       `${p.y}%`,
                width:     `${p.size}px`,
                height:    `${p.size}px`,
                background: p.color,
                '--dx':    `${p.dx}px`,
                '--dy':    `${p.dy}px`,
                '--dur':   `${p.dur}s`,
                '--bs':    `${p.blurS}px`,
                '--be':    `${p.blurE}px`,
                '--ops':    p.opS,
              }}
            />
          ))}
        </div>

        {/* ── Contenido del slide ── */}
        <div className="hc-inner" key={active}>

          {/* Texto izquierda */}
          <div className="hc-left">
            <p className="hc-kicker" style={{ color: slide.color }}>
              {slide.num} — {slide.sublabel}
            </p>

            <h2 className="hc-title">{slide.label}</h2>

            <p className="hc-desc">{slide.desc}</p>

            <div className="hc-tags">
              {slide.tags.map(t => (
                <span key={t} className="hc-tag" style={{ '--tc': slide.color }}>{t}</span>
              ))}
            </div>

            <div className="hc-actions">
              <span className="hc-price">
                {slide.price}<small> + IVA</small>
              </span>
              <Link
                to="/contacto"
                className="hc-cta"
                style={{ '--cc': slide.color }}
              >
                Solicitar proyecto →
              </Link>
            </div>
          </div>

          {/* Mockup derecha */}
          <div className="hc-right">
            <div
              className="hc-mockup-frame"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.055),
                  0 50px 100px rgba(0,0,0,0.65),
                  0 0 90px 0 rgba(${slide.colorRgb}, 0.22)
                `,
              }}
            >
              {active === 0 && <LandingMockup    color={slide.color} />}
              {active === 1 && <CorporativaMockup color={slide.color} />}
              {active === 2 && <EcommerceMockup   color={slide.color} />}
            </div>
          </div>

        </div>

        {/* ── Navegación inferior ── */}
        <nav className="hc-nav" aria-label="Tipo de servicio">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`hc-nav-btn${active === i ? ' hc-nav-btn--active' : ''}`}
              style={{ '--bc': s.color }}
              onClick={() => handleNav(i)}
            >
              {/* Barra de progreso */}
              {active === i && (
                <div
                  key={navKey}
                  className="hc-prog-bar"
                  style={{ background: s.color }}
                  onAnimationEnd={() => setActive((a) => (a + 1) % SLIDES.length)}
                />
              )}
              <span className="hc-nav-num">{s.num}</span>
              <span className="hc-nav-label">{s.label}</span>
            </button>
          ))}
        </nav>

      </div>
    </>
  )
}