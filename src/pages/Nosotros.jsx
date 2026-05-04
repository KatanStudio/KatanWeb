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
    num: '_dev.01',
    tag: 'Negocio & UI/UX',
    name: 'Adrián Lozano',
    img: '/img/FotoAdrian.jpg',
    alt: 'Adrián Lozano',
    linkedin: 'https://www.linkedin.com/in/adrián-lozano',
    imgSide: 'left',
    desc: 'Graduado en ADE (UCLM) y desarrollador web (DAW). Como responsable de Experiencia e Interfaz de Usuario (UI/UX) y Negocio, traduzco tus objetivos comerciales a código de alto rendimiento. Mi cometido es eliminar cualquier obstáculo entre tu cliente y la venta mediante interfaces limpias y arquitectura lógica.',
  },
  {
    num: '_dev.02',
    tag: 'Gestión & Lógica',
    name: 'Alejandro Quintana',
    img: '/img/FotoAlejandro.png',
    alt: 'Alejandro Quintana',
    linkedin: 'https://www.linkedin.com/in/alejandro-quintana-rodriguez/',
    imgSide: 'right',
    desc: 'Graduado en Ingeniería Informática (UCLM) y curtido en gestión de proyectos ágiles. Me encargo de eliminar el ruido entre lo que tu negocio pide y lo se muestra en la web, transformando tus ideas en requisitos técnicos. Construyo proyectos escalables, bases de datos eficientes y lógica compleja. Escribo el software para que tu sistema soporte el crecimiento de tu negocio, sin errores y sin fisuras.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TEAM CAROUSEL
// Móvil  (<900px): tarjeta con foto grande, dots, flechas y swipe táctil
// Desktop (≥900px): stage foto|texto de pantalla completa con controles
// ─────────────────────────────────────────────────────────────────────────────
function TeamCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [animKey, setAnimKey] = useState(0)
  const touchStartX = useRef(null)

  const navigate = useCallback((next) => {
    if (next < 0 || next >= TEAM.length) return
    setDir(next > active ? 1 : -1)
    setActive(next)
    setAnimKey(k => k + 1)
  }, [active])

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) navigate(active + 1)
    else if (diff < -50) navigate(active - 1)
    touchStartX.current = null
  }

  const member = TEAM[active]

  return (
    <div style={{ marginBottom: '4rem' }}>

      {/* ══ MÓVIL: carrusel de tarjeta ════════════════════════════════════════ */}
      <div
        className="team-mobile"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Card animada — key fuerza re-mount para animar */}
        <div key={animKey} className="team-mobile__card" data-dir={dir}>

          {/* Foto como enlace a LinkedIn */}
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

          {/* Bloque de texto */}
          <div className="team-mobile__body">
            <span className="team-mobile__tag">{member.tag}</span>
            <h3 className="team-mobile__name">{member.name}</h3>
            <p className="team-mobile__desc">{member.desc}</p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="team-mobile__link"
            >
              Ver LinkedIn →
            </a>
          </div>
        </div>

        {/* Controles: flechas + dots */}
        <div className="team-mobile__controls">
          <button
            className="team-mobile__arrow"
            onClick={() => navigate(active - 1)}
            disabled={active === 0}
            aria-label="Anterior"
          >←</button>

          <div className="team-mobile__dots" role="tablist">
            {TEAM.map((m, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={m.name}
                className={`team-mobile__dot${i === active ? ' team-mobile__dot--active' : ''}`}
                onClick={() => navigate(i)}
              />
            ))}
          </div>

          <button
            className="team-mobile__arrow"
            onClick={() => navigate(active + 1)}
            disabled={active === TEAM.length - 1}
            aria-label="Siguiente"
          >→</button>
        </div>

        <p className="team-mobile__hint" aria-hidden="true">← desliza para ver el equipo →</p>
      </div>


      {/* ══ DESKTOP: stage foto|texto ═════════════════════════════════════════ */}
      <div className="team-carousel">

        <div
          key={`desk-${animKey}`}
          className="team-carousel__stage"
          data-dir={dir}
        >
          {/* Foto */}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`team-carousel__img-wrap team-carousel__img-wrap--${member.imgSide}`}
            aria-label={`LinkedIn de ${member.name}`}
          >
            <div className="team-carousel__img-frame">
              <img src={member.img} alt={member.alt} className="team-carousel__img" />
              <div className="team-carousel__img-glow" aria-hidden="true" />
            </div>
          </a>

          {/* Texto */}
          <div className={`team-carousel__text team-carousel__text--${member.imgSide}`}>
            <div className="team-carousel__top">
              <span className="service-card__num">{member.num}</span>
              <span className="service-card__tag">{member.tag}</span>
            </div>
            <h3 className="team-carousel__name">{member.name}</h3>
            <p className="team-carousel__desc">{member.desc}</p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="team-carousel__link"
            >
              Ver en LinkedIn →
            </a>
          </div>
        </div>

        {/* Controles desktop */}
        <div className="team-carousel__controls">
          <button
            className="team-carousel__arrow"
            onClick={() => navigate(active - 1)}
            disabled={active === 0}
            aria-label="Anterior"
          >←</button>

          <div className="team-carousel__dots" role="tablist">
            {TEAM.map((m, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={m.name}
                className={`team-carousel__dot${i === active ? ' team-carousel__dot--active' : ''}`}
                onClick={() => navigate(i)}
              />
            ))}
          </div>

          <button
            className="team-carousel__arrow"
            onClick={() => navigate(active + 1)}
            disabled={active === TEAM.length - 1}
            aria-label="Siguiente"
          >→</button>
        </div>

      </div>
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

            {/* ── Carrusel del equipo ── */}
            <TeamCarousel />

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
                  <img src="/logos/wetransfer_katan_2026-05-04_0628/KATAN LOGO SVG (2).svg" alt="" aria-hidden="true" width="100" height="50" />
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