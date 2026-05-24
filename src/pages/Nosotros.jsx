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
// COMPARE DATA (Para el nuevo Carrusel Móvil)
// ─────────────────────────────────────────────────────────────────────────────
const COMPARE_DATA = [
  {
    id: 'speed',
    katan: { title: 'Carga en un parpadeo (<1.5s)', desc: 'Código limpio que hace que la página aparezca al instante para que nadie se canse de esperar y se vaya a la competencia.' },
    wp: { title: '3–8s de carga media', desc: 'Si la web lenta frustra fácilmente a tus clientes. Si tarda más de 3 segundos, mucha gente cierra la pestaña y te olvida.' }
  },
  {
    id: 'code',
    katan: { title: 'Código 100% tuyo, sin licencias', desc: 'Te entregamos el código sin renovaciones anuales, sin dependencia de terceros.' },
    wp: { title: 'Dependencia de licencias', desc: 'Múltiples dependencias de sistemas de terceros. Cada uno con su renovación.' }
  },
  {
    id: 'security',
    katan: { title: 'Seguridad blindada', desc: 'Sin plugins vulnerables. Sin actualizaciones que rompen la web en cualquier momento.' },
    wp: { title: 'El 43% de la web usa plantillas genéricas', desc: 'El objetivo favorito de los atacantes. Una vulnerabilidad afecta a millones de sitios a la vez.' }
  },
  {
    id: 'price',
    katan: { title: 'Precio cerrado desde el comienzo', desc: 'El presupuesto que firmas es el que aparece en la factura. Sin letra pequeña.' },
    wp: { title: 'Añadidos sorpresa garantizados', desc: 'El presupuesto inicial crece con cada "añade esta función" que aparece en el camino.' }
  }
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
// COMPARE MOBILE CARRUSEL (móvil <900px)
// ─────────────────────────────────────────────────────────────────────────────
function CompareMobile() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const next = () => { if (currentIndex < COMPARE_DATA.length - 1) { setDir(1); setCurrentIndex(prev => prev + 1) } }
  const prev = () => { if (currentIndex > 0) { setDir(-1); setCurrentIndex(prev => prev - 1) } }

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX) }
  const onTouchEndAction = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50 && currentIndex < COMPARE_DATA.length - 1) next()
    if (distance < -50 && currentIndex > 0) prev()
  }

  const current = COMPARE_DATA[currentIndex]

  return (
    <div className="compare-mobile">
      <div className="team-mobile__wrapper" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndAction}>
        
        {/* Reciclamos animación y estructura base de tarjeta */}
        <div key={current.id} className="team-mobile__card" data-dir={dir} style={{ padding: '2rem 1.5rem' }}>
          
          {/* KATAN INFO */}
          <div className="compare-mobile__half">
            <div className="compare__badge" style={{ marginBottom: '1rem', width: 'fit-content' }}>
              <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" alt="Katan" aria-hidden="true" style={{ height: '20px' }} />
            </div>
            <div className="compare__row" style={{ alignItems: 'flex-start' }}>
              <span className="compare__icon compare__icon--yes" style={{ marginTop: '4px' }}>✓</span>
              <div>
                <strong style={{ color: 'var(--blade)', fontSize: '1.15rem' }}>{current.katan.title}</strong>
                <p style={{ color: 'var(--steel)', fontSize: '0.95rem', marginTop: '0.4rem', lineHeight: '1.6' }}>{current.katan.desc}</p>
              </div>
            </div>
          </div>

          {/* VS SEPARATOR */}
          <div className="compare-mobile__vs"><span>vs.</span></div>

          {/* OTRAS AGENCIAS INFO */}
          <div className="compare-mobile__half">
            <div className="compare__badge compare__badge--wp" style={{ marginBottom: '1rem', width: 'fit-content' }}>Plantillas</div>
            <div className="compare__row" style={{ alignItems: 'flex-start' }}>
              <span className="compare__icon compare__icon--no" style={{ marginTop: '4px' }}>✗</span>
              <div>
                <strong style={{ color: 'var(--blade)', fontSize: '1.15rem' }}>{current.wp.title}</strong>
                <p style={{ color: 'var(--steel)', fontSize: '0.95rem', marginTop: '0.4rem', lineHeight: '1.6' }}>{current.wp.desc}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Controles reutilizados con las flechas latientes que hicimos antes */}
        <div className="team-mobile__controls" style={{ borderTop: '1px solid var(--ghost)' }}>
          <button className="team-mobile__arrow" onClick={prev} disabled={currentIndex === 0}>←</button>
          <div className="team-mobile__dots">
            {COMPARE_DATA.map((_, i) => (
              <button key={i} className={`team-mobile__dot ${i === currentIndex ? 'team-mobile__dot--active' : ''}`} onClick={() => { setDir(i > currentIndex ? 1 : -1); setCurrentIndex(i); }} />
            ))}
          </div>
          <button className="team-mobile__arrow" onClick={next} disabled={currentIndex === COMPARE_DATA.length - 1}>→</button>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPARE SCROLL DESKTOP  (≥900px) — all 4 cards in a horizontal scroll row
// ─────────────────────────────────────────────────────────────────────────────
function CompareScrollDesktop() {
  return (
    <div className="compare-scroll">
      {COMPARE_DATA.map((item) => (
        <div key={item.id} className="compare-scroll__card">
          <div className="compare-scroll__half compare-scroll__half--katan">
            <div className="compare__badge">
              <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" alt="Katan" style={{ height: '18px' }} />
            </div>
            <div className="compare__row">
              <span className="compare__icon compare__icon--yes">✓</span>
              <div>
                <strong>{item.katan.title}</strong>
                <p>{item.katan.desc}</p>
              </div>
            </div>
          </div>
          <div className="compare-scroll__vs"><span>vs.</span></div>
          <div className="compare-scroll__half compare-scroll__half--wp">
            <div className="compare__badge compare__badge--wp" style={{ marginBottom: '1.5rem' }}>Plantillas</div>
            <div className="compare__row">
              <span className="compare__icon compare__icon--no">✗</span>
              <div>
                <strong>{item.wp.title}</strong>
                <p>{item.wp.desc}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

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

      <section className="section section--gradient-bg" id="diferenciador">
        <div className="container">
          <header className="section__header">
            <p className="section-label">/Método</p>
            <h2 className="section__h2">Katan <span className="accent">vs.</span> Otras agencias</h2>
          </header>

          <CompareMobile />
          <CompareScrollDesktop />

          <blockquote className="pull-quote" style={{ marginTop: '3rem' }}>
            <p>"Hacemos que tu página se convierta en una herramienta útil para tu día a día, atrayendo a las personas que de verdad buscan tus servicios."</p>
          </blockquote>
        </div>
      </section>
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

        <section className="section section--gradient-bg" id="diferenciador">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Método</p>
              <h2 className="section__h2">Katan <span className="accent">vs.</span> Otras agencias</h2>
            </header>

            {/* CARRUSEL DE COMPARACIÓN (Solo Móvil) */}
            <CompareMobile />

            {/* LISTA COMPLETA DE COMPARACIÓN (Solo Desktop) */}
            <div className="compare-desktop">
              <div className="compare">
                <div className="compare__col compare__col--katan">
                  <div className="compare__badge">
                    <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" alt="" aria-hidden="true" />
                  </div>
                  <div className="compare__rows">
                    {COMPARE_DATA.map((row) => (
                      <div key={row.id} className="compare__row">
                        <span className="compare__icon compare__icon--yes">✓</span>
                        <div>
                          <strong>{row.katan.title}</strong>
                          <p>{row.katan.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="compare__sep" aria-hidden="true"><span>vs.</span></div>

                <div className="compare__col compare__col--wp">
                  <div className="compare__badge compare__badge--wp"> Plantillas</div>
                  <div className="compare__rows">
                    {COMPARE_DATA.map((row) => (
                      <div key={row.id} className="compare__row">
                        <span className="compare__icon compare__icon--no">✗</span>
                        <div>
                          <strong>{row.wp.title}</strong>
                          <p>{row.wp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <blockquote className="pull-quote" style={{ marginTop: '3rem' }}>
              <p>"Hacemos que tu página se convierta en una herramienta útil para tu día a día, atrayendo a las personas que de verdad buscan tus servicios."</p>
            </blockquote>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}