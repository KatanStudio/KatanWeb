import { useState, useRef, useCallback } from 'react'
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
// TEAM MOBILE  (móvil <900px) — lista estática, uno debajo del otro
// ─────────────────────────────────────────────────────────────────────────────
function TeamMobile() {
  return (
    <div className="team-mobile">
      {TEAM.map((member) => (
        <div key={member.id} className="team-mobile__card">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="team-mobile__img-wrap"
            aria-label={`LinkedIn de ${member.name}`}
          >
            <img src={member.img} alt={member.alt} className="team-mobile__img" />
            <div className="team-mobile__img-overlay" aria-hidden="true" />
            <div className="team-mobile__img-badge" aria-hidden="true">
              <span className="team-mobile__num">{member.num}</span>
            </div>
          </a>
          <div className="team-mobile__body">
            <span className="team-mobile__tag">{member.tag}</span>
            <h3 className="team-mobile__name">{member.name}</h3>
            <p className="team-mobile__desc">{member.fullBio}</p>
            <a href={member.linkedin} target="_blank" rel="noreferrer" className="team-mobile__link">
              Ver LinkedIn →
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TEAM STAGE  (desktop ≥900px) — grid animado estilo Jenny Records
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
  const bioAnimClass = closing
    ? `team-bio--to-${bioDirection}`
    : `team-bio--from-${bioDirection}`

  return (
    <div className={`team-stage${expanded ? ` team-stage--${expanded}-open` : ''}`}>
      {TEAM.map((member, idx) => {
        const isActive = expanded === member.id
        const isHidden = expanded !== null && !isActive

        return (
          <div
            key={member.id}
            className={`team-col${isActive ? ' team-col--active' : ''}${isHidden ? ' team-col--hidden' : ''}`}
            style={{ gridColumn: idx + 1, gridRow: 1 }}
          >
            <div className="team-photo-wrap" onClick={() => toggle(member.id)} aria-hidden="true">
              <img src={member.img} alt={member.alt} className="team-photo" />
              <div className="team-photo-overlay" aria-hidden="true" />
              <div className="team-photo-badge" aria-hidden="true">
                <span>{member.num}</span>
              </div>
            </div>

            <div className="team-col-footer">
              <div className="team-col-label">
                <span className="team-col-num">{member.num}</span>
                <span className="team-col-sep">/</span>
                <span className="team-col-tag">{member.tag}</span>
              </div>
              <h3 className="team-col-name">{member.name}</h3>
              <button
                className={`team-toggle${isActive ? ' team-toggle--open' : ''}`}
                onClick={() => toggle(member.id)}
                aria-expanded={isActive}
              >
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
        <div
          className={`team-bio ${bioAnimClass}`}
          key={bioDisplayPerson.id}
          style={{ gridColumn: bioCol, gridRow: 1 }}
        >
          <p className="team-bio-kicker">{bioDisplayPerson.num} / {bioDisplayPerson.tag}</p>
          <h3 className="team-bio-name">{bioDisplayPerson.name}</h3>

          <ul className="team-bio-highlights">
            {bioDisplayPerson.highlights.map((h, i) => (
              <li key={h} className="team-bio-highlight" style={{ '--i': i }}>
                <span className="team-bio-dot" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <div className="team-bio-body">
            {bioDisplayPerson.fullBio.split('\n\n').map((para, i) => (
              <p key={i} style={{ '--i': i }}>{para}</p>
            ))}
          </div>

          <a
            href={bioDisplayPerson.linkedin}
            target="_blank"
            rel="noreferrer"
            className="team-bio-linkedin"
          >
            Ver en LinkedIn →
          </a>
        </div>
      )}
    </div>
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

            {/* Lista en móvil, stage en desktop — CSS controla cuál se ve */}
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

            <div className="compare">
              <div className="compare__col compare__col--katan">
                <div className="compare__badge">
                  <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" alt="" aria-hidden="true" />
                </div>
                <div className="compare__rows">
                  {[
                    { title: 'Carga en un parpadeo (<1.5s)', desc: 'Código limpio que hace que la página aparezca al instante para que nadie se canse de esperar y se vaya a la competencia.' },
                    { title: 'Código 100% tuyo, sin licencias', desc: 'Te entregamos el código sin renovaciones anuales, sin dependencia de terceros.' },
                    { title: 'Seguridad blindada', desc: 'Sin plugins vulnerables. Sin actualizaciones que rompen la web en cualquier momento.' },
                    { title: 'Precio cerrado desde el comienzo', desc: 'El presupuesto que firmas es el que aparece en la factura. Sin letra pequeña.' },
                  ].map((row) => (
                    <div key={row.title} className="compare__row">
                      <span className="compare__icon compare__icon--yes">✓</span>
                      <div>
                        <strong>{row.title}</strong>
                        <p>{row.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="compare__sep" aria-hidden="true"><span>vs.</span></div>

              <div className="compare__col compare__col--wp">
                <div className="compare__badge compare__badge--wp"> Plantillas</div>
                <div className="compare__rows">
                  {[
                    { title: '3–8s de carga media', desc: 'Si la web lenta frustra fácilmente a tus clientes. Si tarda más de 3 segundos, mucha gente cierra la pestaña y te olvida.' },
                    { title: 'Dependencia de licencias', desc: 'Múltiples dependencias de sistemas de terceros. Cada uno con su renovación.' },
                    { title: 'El 43% de la web usa plantillas genéricas', desc: 'El objetivo favorito de los atacantes. Una vulnerabilidad afecta a millones de sitios a la vez.' },
                    { title: 'Añadidos sorpresa garantizados', desc: 'El presupuesto inicial crece con cada "añade esta función" que aparece en el camino.' },
                  ].map((row) => (
                    <div key={row.title} className="compare__row">
                      <span className="compare__icon compare__icon--no">✗</span>
                      <div>
                        <strong>{row.title}</strong>
                        <p>{row.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <blockquote className="pull-quote">
              <p>"Hacemos que tu página se convierta en una herramienta útil para tu día a día, atrayendo a las personas que de verdad buscan tus servicios."</p>
            </blockquote>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}