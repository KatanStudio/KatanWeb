import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ── Card data ────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'landing',
    num: '01',
    tag: 'Landing Page',
    title: ['Landing', 'Page'],
    desc: 'Ideal para profesionales y negocios que necesitan una presencia online sólida, rápida y orientada a generar clientes.',
    features: [
      '1 a 3 páginas (Inicio, Servicios, Contacto)',
      'Diseño responsive UI/UX a medida',
      'Formulario de contacto funcional',
      'SEO on-page básico integrado',
      'Integración con Google Analytics',
      'Alta velocidad (PageSpeed >90)',
      '1 ronda de revisiones',
      'Entrega en 2-3 semanas',
    ],
    price: '350,00 €',
    accentColor: 'var(--edge)',
    featured: false,
    wireframe: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="10" width="70" height="100" rx="3" stroke="var(--steel)" strokeWidth="1" fill="var(--sheath)" />
        <rect x="20" y="16" width="15" height="3" rx="1.5" fill="var(--ghost)" />
        <rect x="70" y="15" width="10" height="5" rx="2" fill="var(--edge)" />
        <rect x="20" y="25" width="60" height="25" rx="2" fill="var(--ghost)" />
        <rect x="20" y="55" width="16" height="16" rx="2" fill="var(--ghost)" />
        <rect x="42" y="55" width="16" height="16" rx="2" fill="var(--ghost)" />
        <rect x="64" y="55" width="16" height="16" rx="2" fill="var(--ghost)" />
        <rect x="20" y="78" width="60" height="6" rx="2" fill="var(--ghost)" />
        <rect x="20" y="98" width="25" height="5" rx="2" fill="var(--edge)" />
      </svg>
    ),
  },
  {
    id: 'corporativa',
    num: '02',
    tag: 'Web Corporativa',
    title: ['Web', 'Corporativa'],
    desc: 'Para empresas que necesitan una sede digital completa, con blog, posicionamiento avanzado y múltiples secciones estructuradas.',
    features: [
      '5 a 10 páginas diseñadas a medida',
      'Blog integrado y categorizado',
      'SEO avanzado (Schema, XML, Core Vitals)',
      'Formularios avanzados (reservas/presupuestos)',
      'Multiidioma (hasta 2 idiomas)',
      'Analytics + Search Console',
      '3 rondas de revisiones',
      'Entrega en 4-6 semanas',
    ],
    price: '750,00 €',
    accentColor: 'var(--edge)',
    featured: true,
    wireframe: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="10" width="70" height="100" rx="3" stroke="var(--steel)" strokeWidth="1" fill="var(--sheath)" />
        <rect x="30" y="15" width="40" height="6" rx="3" fill="var(--ghost)" />
        <circle cx="40" cy="18" r="1.5" fill="var(--steel)" />
        <circle cx="50" cy="18" r="1.5" fill="var(--steel)" />
        <circle cx="60" cy="18" r="1.5" fill="var(--steel)" />
        <rect x="20" y="28" width="25" height="8" rx="2" fill="var(--ghost)" />
        <rect x="52" y="28" width="28" height="25" rx="2" fill="var(--ghost)" />
        <rect x="20" y="60" width="60" height="12" rx="2" fill="var(--ghost)" />
        <rect x="20" y="78" width="27" height="18" rx="2" fill="var(--ghost)" />
        <rect x="53" y="78" width="27" height="18" rx="2" fill="var(--ghost)" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    num: '03',
    tag: 'E-Commerce & App',
    title: ['E-commerce', '& App'],
    desc: 'Solución completa para vender online. Catálogo ilimitado, pasarela de pagos y gestión de envíos.',
    features: [
      'Catálogo de productos escalable',
      'Pasarela de pago (Stripe, PayPal, Redsys)',
      'Panel de administración intuitivo',
      'SEO técnico de producto (Rich Snippets)',
      'Emails transaccionales automatizados',
      'Multiidioma (hasta 3 idiomas)',
      '5 rondas de revisiones',
      'Entrega en 8-10 semanas',
    ],
    price: '2.000,00 €',
    accentColor: 'var(--edge)',
    featured: false,
    wireframe: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="10" width="70" height="100" rx="3" stroke="var(--steel)" strokeWidth="1" fill="var(--sheath)" />
        <rect x="20" y="15" width="15" height="3" rx="1.5" fill="var(--ghost)" />
        <path d="M 68 14 h 1.5 l 1.5 4 h 5 l 1 -3.5 h -6.5" stroke="var(--spark)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="72" cy="19.5" r="0.8" fill="var(--spark)" />
        <circle cx="76" cy="19.5" r="0.8" fill="var(--spark)" />
        <rect x="20" y="25" width="15" height="75" rx="2" fill="var(--ghost)" />
        <rect x="40" y="25" width="18" height="18" rx="2" fill="var(--ghost)" />
        <rect x="62" y="25" width="18" height="18" rx="2" fill="var(--ghost)" />
        <rect x="40" y="48" width="18" height="18" rx="2" fill="var(--ghost)" />
        <rect x="62" y="48" width="18" height="18" rx="2" fill="var(--ghost)" />
        <rect x="40" y="71" width="18" height="18" rx="2" fill="var(--ghost)" />
        <rect x="62" y="71" width="18" height="18" rx="2" fill="var(--ghost)" />
      </svg>
    ),
  },
  {
    id: 'extras',
    num: '04',
    tag: 'Servicios Extra',
    title: ['Servicios', 'Extra'],
    desc: 'Amplía tu web con módulos a medida. Precio cerrado por módulo, sin sorpresas ni permanencias.',
    features: [
      'Dominio & email corporativo',
      'Formularios multipaso y reservas',
      'Blog estático ultrarrápido',
      'Copywriting a medida',
      'Pack Legal RGPD completo',
      'Integraciones API (HubSpot, Notion…)',
      'Multiidioma adicional',
      'y más módulos disponibles',
    ],
    price: '15 €',
    priceLabel: '/ módulo',
    accentColor: 'var(--spark)',
    featured: false,
    isExtras: true,
    wireframe: (
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="10" width="70" height="100" rx="3" stroke="var(--steel)" strokeWidth="1" fill="var(--sheath)" />
        <rect x="22" y="18" width="56" height="14" rx="2" fill="var(--ghost)" />
        <rect x="22" y="36" width="56" height="14" rx="2" fill="var(--ghost)" />
        <rect x="22" y="54" width="56" height="14" rx="2" fill="var(--ghost)" />
        <rect x="22" y="72" width="25" height="14" rx="2" fill="var(--ghost)" />
        <rect x="53" y="72" width="25" height="14" rx="2" fill="var(--ghost)" />
        <rect x="22" y="18" width="3" height="14" rx="1" fill="var(--spark)" />
        <rect x="22" y="36" width="3" height="14" rx="1" fill="var(--edge)" />
        <rect x="22" y="54" width="3" height="14" rx="1" fill="var(--spark)" />
        <rect x="30" y="92" width="40" height="10" rx="2" fill="var(--spark)" fillOpacity="0.15" stroke="var(--spark)" strokeWidth="0.5" />
      </svg>
    ),
  },
]

// ── Carousel positions config ────────────────────────────────────
// idx 0 = leftmost visible, idx 1 = center (active), idx 2 = right, idx 3 = hidden peek
const getSlotStyle = (slot, total) => {
  // slot: position relative to active (active=1 in 0-indexed visible slots)
  const configs = {
    // Left card: rotated, scaled back, shifted left
    left: {
      transform: 'perspective(1200px) translateX(-62%) translateZ(-120px) rotateY(18deg) scale(0.88)',
      zIndex: 1,
      opacity: 0.65,
      filter: 'brightness(0.6)',
    },
    // Center card: front and center
    center: {
      transform: 'perspective(1200px) translateX(0%) translateZ(0px) rotateY(0deg) scale(1)',
      zIndex: 10,
      opacity: 1,
      filter: 'brightness(1)',
    },
    // Right card: rotated opposite way
    right: {
      transform: 'perspective(1200px) translateX(62%) translateZ(-120px) rotateY(-18deg) scale(0.88)',
      zIndex: 1,
      opacity: 0.65,
      filter: 'brightness(0.6)',
    },
    // Peeking card: barely visible on far right
    peek: {
      transform: 'perspective(1200px) translateX(105%) translateZ(-200px) rotateY(-28deg) scale(0.75)',
      zIndex: 0,
      opacity: 0.35,
      filter: 'brightness(0.4)',
    },
    // Hidden
    hidden: {
      transform: 'perspective(1200px) translateX(130%) translateZ(-250px) rotateY(-35deg) scale(0.65)',
      zIndex: 0,
      opacity: 0,
      filter: 'brightness(0.2)',
    },
  }
  return configs[slot] || configs.hidden
}

export default function ServicesCarousel() {
  const [active, setActive] = useState(1) // start with index 1 (corporativa) as center
  const [prev, setPrev] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const autoRef = useRef(null)

  // Auto-advance hint animation on mount
  useEffect(() => {
    // Small peek animation to hint there's more
    const hint = setTimeout(() => {
      if (active === 1) {
        setActive(2)
        setTimeout(() => setActive(1), 800)
      }
    }, 1800)
    return () => clearTimeout(hint)
  }, [])

  const goTo = (idx) => {
    if (isAnimating || idx === active) return
    setIsAnimating(true)
    setPrev(active)
    setActive(idx)
    setTimeout(() => {
      setIsAnimating(false)
      setPrev(null)
    }, 480)
  }

  const prev_ = () => goTo(Math.max(0, active - 1))
  const next_ = () => goTo(Math.min(CARDS.length - 1, active + 1))

  // Compute slot for each card index
  const getSlot = (cardIdx) => {
    const diff = cardIdx - active
    if (diff === -1) return 'left'
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    if (diff === 2) return 'peek'
    return 'hidden'
  }

  const activeCard = CARDS[active]

  return (
    <div className="svc3d">
      {/* ── Stage ── */}
      <div className="svc3d__stage" aria-label="Carrusel de servicios">
        {CARDS.map((card, idx) => {
          const slot = getSlot(idx)
          const style = getSlotStyle(slot)
          const isCenter = slot === 'center'
          const isClickable = slot === 'left' || slot === 'right' || slot === 'peek'

          return (
            <article
              key={card.id}
              className={`svc3d__card${isCenter ? ' svc3d__card--active' : ''}${card.featured ? ' svc3d__card--featured' : ''}${card.isExtras ? ' svc3d__card--extras' : ''}`}
              style={style}
              onClick={isClickable ? () => goTo(idx) : undefined}
              aria-hidden={slot === 'hidden'}
              tabIndex={isClickable ? 0 : -1}
              onKeyDown={isClickable ? (e) => e.key === 'Enter' && goTo(idx) : undefined}
            >
              {/* Wireframe illustration */}
              <div className="svc3d__wireframe">
                {card.wireframe}
              </div>

              {/* Header */}
              <div className="svc3d__top">
                <span className="svc3d__num" style={{ color: card.accentColor }}>{card.num}</span>
                <span className="svc3d__tag">/ {card.tag}</span>
              </div>

              {/* Title */}
              <h3 className="svc3d__title" style={card.isExtras ? { color: 'var(--spark)' } : card.featured ? { color: 'var(--edge)' } : {}}>
                {card.title[0]}<br />{card.title[1]}
              </h3>

              {/* Desc */}
              <p className="svc3d__desc">{card.desc}</p>

              {/* Features list */}
              <ul className={`svc3d__features${card.isExtras ? ' svc3d__features--extras' : ''}`}>
                {card.features.map((f, i) => (
                  <li key={i} className={f.startsWith('y más') ? 'svc3d__features-more' : ''}>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="svc3d__footer">
                <span className="svc3d__price" style={card.isExtras ? { color: 'var(--spark)' } : {}}>
                  Desde <strong>{card.price}</strong>{' '}
                  <span className="svc3d__price-note">{card.priceLabel || '+ IVA'}</span>
                </span>
                <Link
                  to="/contacto"
                  className="svc3d__cta"
                  style={card.isExtras ? { color: 'var(--spark)' } : {}}
                  tabIndex={isCenter ? 0 : -1}
                >
                  {card.isExtras ? 'Ver extras →' : 'Solicitar →'}
                </Link>
              </div>

              {/* Click hint overlay for non-active cards */}
              {isClickable && (
                <div className="svc3d__click-hint" aria-hidden="true">
                  <span>{idx < active ? '←' : '→'}</span>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {/* ── Controls ── */}
      <div className="svc3d__controls">
        {/* Arrow prev */}
        <button
          className="svc3d__arrow svc3d__arrow--prev"
          onClick={prev_}
          disabled={active === 0}
          aria-label="Servicio anterior"
        >
          ←
        </button>

        {/* Dots */}
        <div className="svc3d__dots" role="tablist">
          {CARDS.map((card, idx) => (
            <button
              key={card.id}
              role="tab"
              aria-selected={active === idx}
              aria-label={`Ver ${card.tag}`}
              className={`svc3d__dot${active === idx ? ' svc3d__dot--active' : ''}${card.isExtras ? ' svc3d__dot--extras' : ''}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>

        {/* Arrow next */}
        <button
          className="svc3d__arrow svc3d__arrow--next"
          onClick={next_}
          disabled={active === CARDS.length - 1}
          aria-label="Servicio siguiente"
        >
          →
        </button>
      </div>

      {/* ── Scroll hint label ── */}
      <p className="svc3d__hint" aria-hidden="true">
        <span className="svc3d__hint-dot" style={{ background: activeCard.accentColor }} />
        {active + 1} / {CARDS.length} — {activeCard.tag}
        {active < CARDS.length - 1 && <span className="svc3d__hint-next"> · siguiente: {CARDS[active + 1].tag} →</span>}
      </p>
    </div>
  )
}
