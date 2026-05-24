import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/team-carousel.css'

// ─────────────────────────────────────────────────────────────────────────────
// TEAM DATA
// ─────────────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    id: 'adrian',
    num: '_dev.01',
    tag: 'Negocio & UI/UX',
    name: 'Adrián Lozano',
    img: '/img/AdrianDefinitivaV2.webp',
    alt: 'Adrián Lozano',
    linkedin: 'https://www.linkedin.com/in/adrián-lozano',
    highlights: [
      'Grado en ADE — UCLM',
      'Ciclo Formativo DAW (Desarrollo de Aplicaciones Web)',
      'Especialista en UI/UX e interfaces orientadas a conversión',
      'Código de alto rendimiento para eliminar fricciones de venta',
    ],
    fullBio: 'Como responsable de Estrategia de Negocio y UI/UX, mi misión es transformar tus objetivos comerciales en experiencias digitales que realmente conviertan. Combino mi visión empresarial con el desarrollo técnico para crear interfaces limpias, atractivas y de alto rendimiento. \n\n Mi enfoque se centra en diseñar el camino perfecto para tu usuario: elimino cualquier fricción u obstáculo visual mediante una arquitectura lógica y fluida, garantizando que el diseño de tu plataforma no solo sea estético, sino el motor principal de tus ventas.',
  },
  {
    id: 'alejandro',
    num: '_dev.02',
    tag: 'Gestión & Lógica',
    name: 'Alejandro Quintana',
    img: '/img/AlejandroDefinitivaV2.webp',
    alt: 'Alejandro Quintana',
    linkedin: 'https://www.linkedin.com/in/alejandro-quintana-rodriguez/',
    highlights: [
      'Grado en Ingeniería Informática — UCLM',
      'Gestión de proyectos ágiles (Scrum / Kanban)',
      'Backend, bases de datos y sistemas escalables',
      'Transformación de requisitos de negocio a arquitectura técnica',
    ],
    fullBio: 'Como especialista en Gestión y Arquitectura Lógica, soy el traductor entre las necesidades de tu negocio y la realidad técnica. Mi trabajo ocurre en el "backstage": construyo los cimientos invisibles pero fundamentales de tu proyecto. Desarrollo bases de datos eficientes, sistemas  escalables y lógica compleja, escribiendo un código robusto y libre de errores. \n\n Mi objetivo es que tu plataforma tenga la fuerza, la velocidad y la estabilidad para soportar el crecimiento de tu empresa, sin cuellos de botella que lo imposibiliten.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// COMPARE DATA — enriquecido con métricas visuales
// ─────────────────────────────────────────────────────────────────────────────
const COMPARE_DATA = [
  {
    id: 'speed',
    category: 'Velocidad de carga',
    katan: {
      metric: '< 1.5s',
      bar: 15,
      label: 'Velocidad real',
      title: 'Carga en un parpadeo',
      desc: 'Código limpio sin plugins ni capas de JS innecesarias. Tu página aparece antes de que el cliente parpadee.',
    },
    wp: {
      metric: '3 – 8s',
      bar: 78,
      label: 'Velocidad media',
      title: 'El 40% abandona a los 3s',
      desc: 'Cada segundo de espera cuesta ventas. Las plantillas acumulan scripts que nadie pidió y nadie puede quitar.',
    },
  },
  {
    id: 'code',
    category: 'Propiedad del código',
    katan: {
      metric: '100%',
      bar: 100,
      label: 'Tuyo para siempre',
      title: 'Código que te pertenece',
      desc: 'Te entregamos el repositorio completo. Sin renovaciones, sin dependencias de terceros, sin ataduras.',
    },
    wp: {
      metric: '0%',
      bar: 0,
      label: 'Propiedad real',
      title: 'Licencias de por vida',
      desc: 'Tu web vive en una plataforma de terceros. Si cierran, suben precios o cambian condiciones, tú dependes de ellos.',
    },
  },
  {
    id: 'security',
    category: 'Seguridad',
    katan: {
      metric: '0',
      bar: 0,
      label: 'Vulnerabilidades',
      title: 'Sin superficie de ataque',
      desc: 'Sin plugins de terceros que parchear. Sin actualizaciones que rompen la web a las 3am. Sin vectores de entrada.',
    },
    wp: {
      metric: '43%',
      bar: 43,
      label: 'De la web con plantillas',
      title: 'El objetivo favorito de hackers',
      desc: 'Una vulnerabilidad en un plugin popular afecta a millones de webs a la vez. La tuya incluida.',
    },
  },
  {
    id: 'price',
    category: 'Precio',
    katan: {
      metric: '= €',
      bar: 100,
      label: 'Precio cerrado siempre',
      title: 'Sin letra pequeña',
      desc: 'El presupuesto que firmas es el que aparece en la factura. El alcance está definido antes de empezar.',
    },
    wp: {
      metric: '+ ???',
      bar: 0,
      label: 'Coste real desconocido',
      title: 'Añadidos sorpresa garantizados',
      desc: 'Cada "arreglo rápido" se cobra aparte. El presupuesto inicial crece con cada reunión y cada cambio de última hora.',
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TEAM MOBILE  (móvil <900px)
// ─────────────────────────────────────────────────────────────────────────────
function TeamMobile() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const member = TEAM[currentIndex]

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isModalOpen])

  const next = () => { if (currentIndex < TEAM.length - 1) { setDir(1); setCurrentIndex(prev => prev + 1) } }
  const prev = () => { if (currentIndex > 0) { setDir(-1); setCurrentIndex(prev => prev - 1) } }

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX) }
  const onTouchEndAction = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50 && currentIndex < TEAM.length - 1) next()
    if (distance < -50 && currentIndex > 0) prev()
  }

  const modalContent = isModalOpen && (
    <div className="team-modal-overlay" onClick={() => setIsModalOpen(false)}>
      <div className="team-modal-content" onClick={e => e.stopPropagation()}>
        <button className="team-modal-x" onClick={() => setIsModalOpen(false)} aria-label="Cerrar modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <p className="team-bio-kicker">{member.num} / {member.tag}</p>
        <h3 className="team-bio-name">{member.name}</h3>
        <ul className="team-bio-highlights">
          {member.highlights.map((h, i) => (
            <li key={h} className="team-bio-highlight" style={{ '--i': i }}>
              <span className="team-bio-dot" aria-hidden="true" />{h}
            </li>
          ))}
        </ul>
        <div className="team-bio-body">
          {member.fullBio.split('\n\n').map((para, i) => (
            <p key={i} style={{ '--i': i }}>{para}</p>
          ))}
        </div>
        <div className="team-modal-footer">
          <a href={member.linkedin} target="_blank" rel="noreferrer" className="team-bio-btn">Ver en LinkedIn →</a>
          <button className="team-bio-btn" onClick={() => setIsModalOpen(false)}>
            Cerrar
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: 'rotate(180deg)' }}>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="team-mobile">
        <div className="team-mobile__wrapper" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndAction}>
          <div key={member.id} className="team-mobile__card" data-dir={dir}>
            <div className="team-mobile__img-wrap" onClick={() => setIsModalOpen(true)}>
              <img src={member.img} alt={member.alt} className="team-mobile__img" />
              <div className="team-mobile__img-overlay" aria-hidden="true" />
              <div className="team-mobile__img-badge" aria-hidden="true"><span className="team-mobile__num">{member.num}</span></div>
            </div>
            <div className="team-mobile__body">
              <div className="team-col-label" style={{ marginBottom: '0.5rem' }}>
                <span className="team-col-num">{member.num}</span><span className="team-col-sep">/</span><span className="team-col-tag">{member.tag}</span>
              </div>
              <h3 className="team-mobile__name">{member.name}</h3>
              <button className="team-toggle" onClick={() => setIsModalOpen(true)} style={{ marginTop: '0.5rem' }}>
                <span>Ver más</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="team-mobile__controls">
            <button className="team-mobile__arrow" onClick={prev} disabled={currentIndex === 0} aria-label="Anterior">←</button>
            <div className="team-mobile__dots">
              {TEAM.map((_, i) => (
                <button key={i} className={`team-mobile__dot ${i === currentIndex ? 'team-mobile__dot--active' : ''}`} onClick={() => { setDir(i > currentIndex ? 1 : -1); setCurrentIndex(i) }} aria-label={`Ver miembro ${i + 1}`} />
              ))}
            </div>
            <button className="team-mobile__arrow" onClick={next} disabled={currentIndex === TEAM.length - 1} aria-label="Siguiente">→</button>
          </div>
        </div>
      </div>
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPARE MOBILE CARRUSEL (< 900px) — con métricas grandes
// ─────────────────────────────────────────────────────────────────────────────
function CompareMobile() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const next = () => { if (currentIndex < COMPARE_DATA.length - 1) { setDir(1); setCurrentIndex(p => p + 1) } }
  const prev = () => { if (currentIndex > 0) { setDir(-1); setCurrentIndex(p => p - 1) } }
  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX) }
  const onTouchEndAction = () => {
    if (!touchStart || !touchEnd) return
    const d = touchStart - touchEnd
    if (d > 50) next()
    if (d < -50) prev()
  }
  const current = COMPARE_DATA[currentIndex]

  return (
    <div className="compare-mobile">
      <div className="team-mobile__wrapper" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndAction}>
        <div key={current.id} className="team-mobile__card" data-dir={dir}>
          {/* Categoría */}
          <div className="cmp-mob__cat">
            <span className="cmp-mob__cat-icon">{CATEGORY_ICONS[current.id]}</span>
            <span className="cmp-mob__cat-label">{current.category}</span>
          </div>
          {/* Katan */}
          <div className="cmp-mob__half cmp-mob__half--katan">
            <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" alt="Katan" className="cmp-mob__logo" />
            <div className="cmp-mob__metric">{current.katan.metric}</div>
            {current.id === 'speed' && <div className="cmp-bar"><div className="cmp-bar__fill cmp-bar__fill--good" style={{ width: `${current.katan.bar}%` }} /></div>}
            <strong className="cmp-mob__title">{current.katan.title}</strong>
            <p className="cmp-mob__desc">{current.katan.desc}</p>
          </div>
          {/* VS */}
          <div className="compare-mobile__vs"><span>vs.</span></div>
          {/* Plantillas */}
          <div className="cmp-mob__half cmp-mob__half--wp">
            <span className="cmp-mob__wp-label">Plantillas</span>
            <div className="cmp-mob__metric cmp-mob__metric--bad">{current.wp.metric}</div>
            {current.id === 'speed' && <div className="cmp-bar"><div className="cmp-bar__fill cmp-bar__fill--bad" style={{ width: `${current.wp.bar}%` }} /></div>}
            <strong className="cmp-mob__title">{current.wp.title}</strong>
            <p className="cmp-mob__desc">{current.wp.desc}</p>
          </div>
        </div>
        <div className="team-mobile__controls" style={{ borderTop: '1px solid var(--ghost)' }}>
          <button className="team-mobile__arrow" onClick={prev} disabled={currentIndex === 0}>←</button>
          <div className="team-mobile__dots">
            {COMPARE_DATA.map((_, i) => (
              <button key={i} className={`team-mobile__dot ${i === currentIndex ? 'team-mobile__dot--active' : ''}`} onClick={() => { setDir(i > currentIndex ? 1 : -1); setCurrentIndex(i) }} />
            ))}
          </div>
          <button className="team-mobile__arrow" onClick={next} disabled={currentIndex === COMPARE_DATA.length - 1}>→</button>
        </div>
      </div>
    </div>
  )
}

// ─── Iconos SVG por categoría ───────────────────────────────────────────────
const CATEGORY_ICONS = {
  speed: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  security: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  price: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPARE VISUAL DESKTOP  (≥900px) — duel rows con métricas grandes
// ─────────────────────────────────────────────────────────────────────────────
function CompareVisualDesktop() {
  return (
    <div className="cmp-visual">
      {/* Cabeceras de columna */}
      <div className="cmp-visual__header">
        <div className="cmp-visual__col-head cmp-visual__col-head--katan">
          <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" alt="Katan Studio" className="cmp-visual__col-logo" />
        </div>
        <div className="cmp-visual__col-spacer" />
        <div className="cmp-visual__col-head cmp-visual__col-head--wp">
          <span className="cmp-visual__col-wp-label">Plantillas /<br/>Otras agencias</span>
        </div>
      </div>

      {/* Filas de comparativa */}
      {COMPARE_DATA.map((item, idx) => (
        <div key={item.id} className={`cmp-row${idx % 2 === 1 ? ' cmp-row--alt' : ''}`}>
          {/* Categoría centrada */}
          <div className="cmp-row__category">
            <span className="cmp-row__cat-icon">{CATEGORY_ICONS[item.id]}</span>
            <span className="cmp-row__cat-label">{item.category}</span>
          </div>

          <div className="cmp-row__body">
            {/* Lado Katan */}
            <div className="cmp-side cmp-side--katan">
              <div className="cmp-side__metric">{item.katan.metric}</div>
              <div className="cmp-side__bar-wrap">
                {item.id === 'speed' && (
                  <div className="cmp-bar cmp-bar--speed">
                    <div className="cmp-bar__fill cmp-bar__fill--good" style={{ width: `${item.katan.bar}%` }} />
                    <span className="cmp-bar__label">{item.katan.label}</span>
                  </div>
                )}
                {item.id === 'code' && (
                  <div className="cmp-ownership cmp-ownership--good">
                    <span className="cmp-ownership__check">✓</span>
                    <span>{item.katan.label}</span>
                  </div>
                )}
                {item.id === 'security' && (
                  <div className="cmp-shield cmp-shield--good">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,0,128,0.15)" stroke="#FF0080" strokeWidth="1.5"/>
                      <path d="M9 12l2 2 4-4" stroke="#FF0080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{item.katan.label}</span>
                  </div>
                )}
                {item.id === 'price' && (
                  <div className="cmp-price-tag cmp-price-tag--good">
                    <span className="cmp-price-tag__badge">CERRADO</span>
                    <span>{item.katan.label}</span>
                  </div>
                )}
              </div>
              <h4 className="cmp-side__title">{item.katan.title}</h4>
              <p className="cmp-side__desc">{item.katan.desc}</p>
            </div>

            {/* Separador VS */}
            <div className="cmp-vs" aria-hidden="true"><span>vs.</span></div>

            {/* Lado Plantillas */}
            <div className="cmp-side cmp-side--wp">
              <div className="cmp-side__metric cmp-side__metric--bad">{item.wp.metric}</div>
              <div className="cmp-side__bar-wrap">
                {item.id === 'speed' && (
                  <div className="cmp-bar cmp-bar--speed">
                    <div className="cmp-bar__fill cmp-bar__fill--bad" style={{ width: `${item.wp.bar}%` }} />
                    <span className="cmp-bar__label">{item.wp.label}</span>
                  </div>
                )}
                {item.id === 'code' && (
                  <div className="cmp-ownership cmp-ownership--bad">
                    <span className="cmp-ownership__check">✗</span>
                    <span>{item.wp.label}</span>
                  </div>
                )}
                {item.id === 'security' && (
                  <div className="cmp-shield cmp-shield--bad">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(138,155,180,0.08)" stroke="#8A9BB4" strokeWidth="1.5" strokeDasharray="3 2"/>
                      <line x1="9" y1="9" x2="15" y2="15" stroke="#8A9BB4" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="15" y1="9" x2="9" y2="15" stroke="#8A9BB4" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    <span>{item.wp.label}</span>
                  </div>
                )}
                {item.id === 'price' && (
                  <div className="cmp-price-tag cmp-price-tag--bad">
                    <span className="cmp-price-tag__badge cmp-price-tag__badge--bad">VARIABLE</span>
                    <span>{item.wp.label}</span>
                  </div>
                )}
              </div>
              <h4 className="cmp-side__title">{item.wp.title}</h4>
              <p className="cmp-side__desc">{item.wp.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPARE MOBILE CARD  (< 900px) — una carta a la vez, más visual
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// TEAM STAGE  (desktop ≥900px)
// ─────────────────────────────────────────────────────────────────────────────
function TeamStage() {
  const [expanded, setExpanded] = useState(null)
  const [bioVisible, setBioVisible] = useState(null)
  const [closing, setClosing] = useState(false)
  const closingTimer = useRef(null)

  const toggle = useCallback((id) => {
    if (closingTimer.current) clearTimeout(closingTimer.current)

    if (closing && bioVisible === id) {
      setExpanded(id)
      setClosing(false)
      return
    }

    if (expanded === id) {
      setExpanded(null)
      setClosing(true)
      closingTimer.current = setTimeout(() => {
        setBioVisible(null)
        setClosing(false)
      }, 420)
    } else {
      setClosing(false)
      setBioVisible(id)
      setExpanded(id)
    }
  }, [expanded, bioVisible, closing])

  const bioDisplayPerson = bioVisible ? TEAM.find(m => m.id === bioVisible) : null
  const bioDisplayIdx = bioVisible ? TEAM.findIndex(m => m.id === bioVisible) : -1
  const bioCol = bioDisplayIdx === 0 ? 2 : 1
  const bioDirection = bioDisplayIdx === 1 ? 'left' : 'right'
  const bioAnimClass = closing ? `team-bio--to-${bioDirection}` : `team-bio--from-${bioDirection}`

  return (
    <div className={`team-stage${expanded ? ` team-stage--${expanded}-open` : ''}`}>
      {TEAM.map((member, idx) => {
        const isActive = expanded === member.id
        const isHidden = expanded !== null && !isActive

        return (
          <div key={member.id} className={`team-col${isActive ? ' team-col--active' : ''}${isHidden ? ' team-col--hidden' : ''}`} style={{ gridColumn: idx + 1, gridRow: 1 }}>
            <div className="team-photo-wrap" onClick={() => toggle(member.id)} aria-hidden="true">
              <img src={member.img} alt={member.alt} className="team-photo" />
              <div className="team-photo-overlay" aria-hidden="true" />
              <div className="team-photo-badge" aria-hidden="true"><span>{member.num}</span></div>
            </div>
            <div className="team-col-footer">
              <div className="team-col-label">
                <span className="team-col-num">{member.num}</span><span className="team-col-sep">/</span><span className="team-col-tag">{member.tag}</span>
              </div>
              <h3 className="team-col-name">{member.name}</h3>
              <button className={`team-toggle${isActive ? ' team-toggle--open' : ''}`} onClick={() => toggle(member.id)} aria-expanded={isActive}>
                <span>{isActive ? 'Cerrar' : 'Ver más'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )
      })}

      {bioDisplayPerson && (
        <div className={`team-bio ${bioAnimClass}`} key={bioDisplayPerson.id} style={{ gridColumn: bioCol, gridRow: 1 }}>
          <p className="team-bio-kicker">{bioDisplayPerson.num} / {bioDisplayPerson.tag}</p>
          <h3 className="team-bio-name">{bioDisplayPerson.name}</h3>
          <ul className="team-bio-highlights">
            {bioDisplayPerson.highlights.map((h, i) => (
              <li key={h} className="team-bio-highlight" style={{ '--i': i }}><span className="team-bio-dot" aria-hidden="true" />{h}</li>
            ))}
          </ul>
          <div className="team-bio-body">
            {bioDisplayPerson.fullBio.split('\n\n').map((para, i) => (
              <p key={i} style={{ '--i': i }}>{para}</p>
            ))}
          </div>
          <a href={bioDisplayPerson.linkedin} target="_blank" rel="noreferrer" className="team-bio-btn">Ver en LinkedIn →</a>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPARE HORIZONTAL  (desktop ≥1200px) — scroll-jacked horizontal panning
// ─────────────────────────────────────────────────────────────────────────────
function CompareHorizontal() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const progressBarRef = useRef(null)
  const progressLabelRef = useRef(null)

  useEffect(() => {
    let maxTranslate = 0

    const measure = () => {
      const track = trackRef.current
      const outer = outerRef.current
      if (!track || !outer) return
      if (window.innerWidth < 1200) { outer.style.height = 'auto'; return }
      maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth + 80)
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
        const n = Math.min(COMPARE_DATA.length - 1, Math.round(p * (COMPARE_DATA.length - 1))) + 1
        progressLabelRef.current.textContent = `${String(n).padStart(2, '0')} / ${String(COMPARE_DATA.length).padStart(2, '0')}`
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
    <div ref={outerRef} className="cmp-hs">
      <div className="cmp-hs__sticky">
        <div className="cmp-hs__head">
          <p className="section-label">/Método</p>
          <h2 className="section__h2">Katan <span className="accent">vs.</span> Otras agencias</h2>
        </div>

        <div className="cmp-hs__track-wrap">
          <div ref={trackRef} className="cmp-hs__track">
            {COMPARE_DATA.map((item) => (
              <div key={item.id} className="cmp-hs__card">
                <div className="cmp-hs__cat">
                  <span className="cmp-hs__cat-icon">{CATEGORY_ICONS[item.id]}</span>
                  <span className="cmp-hs__cat-label">{item.category}</span>
                </div>
                <div className="cmp-hs__body">
                  {/* Katan */}
                  <div className="cmp-hs__side cmp-hs__side--katan">
                    <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" alt="Katan" className="cmp-hs__logo" />
                    <div className="cmp-hs__metric">{item.katan.metric}</div>
                    <div className="cmp-hs__indicator">
                      {item.id === 'speed' && (
                        <div className="cmp-bar cmp-bar--speed">
                          <div className="cmp-bar__fill cmp-bar__fill--good" style={{ width: `${item.katan.bar}%` }} />
                          <span className="cmp-bar__label">{item.katan.label}</span>
                        </div>
                      )}
                      {item.id === 'code' && (
                        <div className="cmp-ownership cmp-ownership--good">
                          <span className="cmp-ownership__check">✓</span>
                          <span>{item.katan.label}</span>
                        </div>
                      )}
                      {item.id === 'security' && (
                        <div className="cmp-shield cmp-shield--good">
                          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,0,128,0.15)" stroke="#FF0080" strokeWidth="1.5"/>
                            <path d="M9 12l2 2 4-4" stroke="#FF0080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{item.katan.label}</span>
                        </div>
                      )}
                      {item.id === 'price' && (
                        <div className="cmp-price-tag cmp-price-tag--good">
                          <span className="cmp-price-tag__badge">CERRADO</span>
                          <span>{item.katan.label}</span>
                        </div>
                      )}
                    </div>
                    <h4 className="cmp-hs__title">{item.katan.title}</h4>
                    <p className="cmp-hs__desc">{item.katan.desc}</p>
                  </div>

                  <div className="cmp-hs__vs" aria-hidden="true"><span>vs.</span></div>

                  {/* Otras agencias */}
                  <div className="cmp-hs__side cmp-hs__side--wp">
                    <span className="cmp-hs__wp-label">Otras agencias</span>
                    <div className="cmp-hs__metric cmp-hs__metric--bad">{item.wp.metric}</div>
                    <div className="cmp-hs__indicator">
                      {item.id === 'speed' && (
                        <div className="cmp-bar cmp-bar--speed">
                          <div className="cmp-bar__fill cmp-bar__fill--bad" style={{ width: `${item.wp.bar}%` }} />
                          <span className="cmp-bar__label">{item.wp.label}</span>
                        </div>
                      )}
                      {item.id === 'code' && (
                        <div className="cmp-ownership cmp-ownership--bad">
                          <span className="cmp-ownership__check">✗</span>
                          <span>{item.wp.label}</span>
                        </div>
                      )}
                      {item.id === 'security' && (
                        <div className="cmp-shield cmp-shield--bad">
                          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(138,155,180,0.08)" stroke="#8A9BB4" strokeWidth="1.5" strokeDasharray="3 2"/>
                            <line x1="9" y1="9" x2="15" y2="15" stroke="#8A9BB4" strokeWidth="1.8" strokeLinecap="round"/>
                            <line x1="15" y1="9" x2="9" y2="15" stroke="#8A9BB4" strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                          <span>{item.wp.label}</span>
                        </div>
                      )}
                      {item.id === 'price' && (
                        <div className="cmp-price-tag cmp-price-tag--bad">
                          <span className="cmp-price-tag__badge cmp-price-tag__badge--bad">VARIABLE</span>
                          <span>{item.wp.label}</span>
                        </div>
                      )}
                    </div>
                    <h4 className="cmp-hs__title cmp-hs__title--muted">{item.wp.title}</h4>
                    <p className="cmp-hs__desc">{item.wp.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cmp-hs__progress">
          <span ref={progressLabelRef} className="cmp-hs__progress-label">
            01 / {String(COMPARE_DATA.length).padStart(2, '0')}
          </span>
          <div className="cmp-hs__progress-bar-wrap">
            <div ref={progressBarRef} className="cmp-hs__progress-bar" />
          </div>
          <span className="cmp-hs__hint">↓ scroll</span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION EXPORT — used by MainPage for single-page scroll layout
// ─────────────────────────────────────────────────────────────────────────────
export function NosotrosSection() {
  return (
    <>
      <section className="section section--orbs" id="nosotros">
        <div className="glow-orb orb-blue-1" aria-hidden="true" />
        <div className="glow-orb orb-blue-2" aria-hidden="true" />
        <div className="container">
          <header className="section__header">
            <p className="section-label">/El Estudio</p>
            <h2 className="section__h2">La anti-agencia.<br /><span className="accent">Cero intermediarios.</span></h2>
            <p className="section__sub" style={{ maxWidth: '60ch', fontSize: '1.1rem', marginTop: '1.5rem', color: 'white' }}>
              No somos una agencia tradicional llena de burocracia, reuniones inútiles y plantillas
              recicladas. Somos Katan: un estudio independiente formado por dos desarrolladores. Tú hablas con nosotros,
              y te ayudamos a llevar tu negocio a internet.
            </p>
          </header>

          <TeamMobile />
          <TeamStage />

          <div className="module module--recurring" style={{ maxWidth: '100%' }}>
            <h3 className="module__price" style={{ marginBottom: '1rem' }}>Nuestra experiencia en la trinchera</h3>
            <p className="module__desc" style={{ fontSize: '1.2rem' }}>
              Llevamos a la espalda numerosos proyectos sin un solo cliente que haya tenido que recurrir a mantenimiento de
              emergencia o negocios perdiendo dinero.

              Por eso fundamos Katan, para ofrecer una alternativa cercana,<strong> soluciones profesionales y acercar tu negocio al público</strong>.
              No reinventamos la rueda, simplemente le damos un enfoque correcto.
            </p>
          </div>
        </div>
      </section>

      <span id="diferenciador" style={{ display: 'block', height: 0, visibility: 'hidden' }} aria-hidden="true" />
      <section className="section section--gradient-bg cmp-mob-wrap">
        <div className="container">
          <header className="section__header">
            <p className="section-label">/Método</p>
            <h2 className="section__h2">Katan <span className="accent">vs.</span> Otras agencias</h2>
          </header>
          <CompareMobile />
          <blockquote className="pull-quote" style={{ marginTop: '3rem' }}>
            <p>"Hacemos que tu página se convierta en una herramienta útil para tu día a día, atrayendo a las personas que de verdad buscan tus servicios."</p>
          </blockquote>
        </div>
      </section>
      <CompareHorizontal />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Nosotros() {
  return (
    <>
      <Helmet>
        <title>Por qué Katan — Katan Studio</title>
        <meta name="description" content="Katan Studio — La anti-agencia. Dos desarrolladores, cero intermediarios. Código artesanal vs WordPress." />
      </Helmet>

      <Header />

      <main>
        <section className="section section--orbs" id="el-estudio">
          <div className="glow-orb orb-blue-1" aria-hidden="true" />
          <div className="glow-orb orb-blue-2" aria-hidden="true" />
          <div className="container">
            <header className="section__header">
              <p className="section-label">/El Estudio</p>
              <h2 className="section__h2">La anti-agencia.<br /><span className="accent">Cero intermediarios.</span></h2>
              <p className="section__sub" style={{ maxWidth: '60ch', fontSize: '1.1rem', marginTop: '1.5rem', color: 'white' }}>
                No somos una agencia tradicional llena de burocracia, reuniones inútiles y plantillas
                recicladas. Somos Katan: un estudio independiente formado por dos desarrolladores. Tú hablas con nosotros,
                y te ayudamos a llevar tu negocio a internet.
              </p>
            </header>

            <TeamMobile />
            <TeamStage />

            <div className="module module--recurring" style={{ maxWidth: '100%' }}>
              <h3 className="module__price" style={{ marginBottom: '1rem' }}>Nuestra experiencia en la trinchera</h3>
              <p className="module__desc" style={{ fontSize: '1.2rem' }}>
                Llevamos a la espalda numerosos proyectos sin un solo cliente que haya tenido que recurrir a mantenimiento de
                emergencia o negocios perdiendo dinero.

                Por eso fundamos Katan, para ofrecer una alternativa cercana,<strong> soluciones profesionales y acercar tu negocio al público</strong>.
                No reinventamos la rueda, simplemente le damos un enfoque correcto.
              </p>
            </div>
          </div>
        </section>

        <span id="diferenciador" style={{ display: 'block', height: 0, visibility: 'hidden' }} aria-hidden="true" />
        <section className="section section--gradient-bg cmp-mob-wrap">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Método</p>
              <h2 className="section__h2">Katan <span className="accent">vs.</span> Otras agencias</h2>
            </header>
            <CompareMobile />
            <blockquote className="pull-quote" style={{ marginTop: '3rem' }}>
              <p>"Hacemos que tu página se convierta en una herramienta útil para tu día a día, atrayendo a las personas que de verdad buscan tus servicios."</p>
            </blockquote>
          </div>
        </section>
        <CompareHorizontal />
      </main>

      <Footer />
    </>
  )
}