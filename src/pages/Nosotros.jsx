import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import '../styles/team-carousel.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const TEAM = [
  {
    num: '_dev.01',
    tag: 'Arquitectura & Lógica',
    name: 'Alejandro Quintana',
    img: '/img/FotoAlejandro.jpg',
    href: 'https://www.linkedin.com/in/alejandro-quintana-rodriguez/',
    desc: 'Graduado en Ingeniería Informática (UCLM) y curtido en gestión de proyectos ágiles (Scrum). Especialista en la estructura profunda del código. En Katan, construyo arquitecturas escalables, bases de datos eficientes y lógica compleja. Escribo el software para que tu sistema soporte el crecimiento de tu negocio, sin errores y sin fisuras.',
    imgSide: 'right',
  },
  {
    num: '_dev.02',
    tag: 'Negocio & UI/UX',
    name: 'Adrián Lozano',
    img: '/img/FotoAdrian.jpg',
    href: 'https://www.linkedin.com/in/adrián-lozano',
    desc: 'Graduado en ADE (UCLM) y desarrollador web (DAW). Como responsable de Experiencia e Interfaz de Usuario (UI/UX) y Negocio, traduzco tus objetivos comerciales a código de alto rendimiento. Mi cometido es eliminar cualquier obstáculo entre tu cliente y la venta mediante interfaces limpias y arquitectura lógica.',
    imgSide: 'left',
  }
]

export default function Nosotros() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [animDir, setAnimDir] = useState(1)

  // Mobile swipe state
  const [mobileActive, setMobileActive] = useState(0)
  const [mobileAnimKey, setMobileAnimKey] = useState(0)
  const [mobileAnimDir, setMobileAnimDir] = useState(1)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const navigate = (next) => {
    if (next < 0 || next >= TEAM.length) return
    setAnimDir(next > active ? 1 : -1)
    setActive(next)
    setAnimKey(k => k + 1)
  }

  const mobileNavigate = (next) => {
    if (next < 0 || next >= TEAM.length) return
    setMobileAnimDir(next > mobileActive ? 1 : -1)
    setMobileActive(next)
    setMobileAnimKey(k => k + 1)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    // Only swipe if horizontal movement dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      mobileNavigate(dx < 0 ? mobileActive + 1 : mobileActive - 1)
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const member = TEAM[active]
  const mobileMember = TEAM[mobileActive]

  return (
    <>
      <Helmet>
        <title>Por qué Katan — Katan Studio</title>
        <meta name="description" content="Katan Studio — La anti-agencia. Dos desarrolladores, cero intermediarios. Código artesanal vs WordPress." />
      </Helmet>

      <Header />

      <main>
        <section className="section section--orbs" id="el-estudio">
          <div className="glow-orb orb-page-1" aria-hidden="true" />
          <div className="glow-orb orb-page-2" aria-hidden="true" />
          <div className="container">
            <header className="section__header">
              <p className="section-label">/El Estudio</p>
              <h2 className="section__h2">La anti-agencia.<br /><span className="accent">cero intermediarios.</span></h2>
              <p className="section__sub" style={{ maxWidth: '60ch', fontSize: '1.1rem', marginTop: '1.5rem' }}>
                No somos una agencia tradicional llena de burocracia, reuniones inútiles y plantillas
                recicladas. Somos Katan: un estudio independiente formado por dos desarrolladores. Tú hablas con nosotros,
                nosotros te ayudamos a llevar a cabo tu  proyecto en la web.
              </p>
            </header>

            {/* ── Team carousel: desktop only ── */}
            <div className="team-carousel" style={{ marginBottom: '4rem' }}>

              {/* Slide animado */}
              <div className="team-carousel__stage" key={animKey}
                data-dir={animDir > 0 ? 'right' : 'left'}
                data-img={member.imgSide}
              >
                {/* Foto grande */}
                <a href={member.href} target="_blank" rel="noreferrer"
                  className={`team-carousel__img-wrap team-carousel__img-wrap--${member.imgSide}`}
                >
                  <div className="team-carousel__img-frame">
                    <img src={member.img} alt={member.name} className="team-carousel__img" />
                    <div className="team-carousel__img-glow" />
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
                  <a href={member.href} target="_blank" rel="noreferrer" className="team-carousel__link">
                    Ver LinkedIn →
                  </a>
                </div>
              </div>

              {/* Controles */}
              <div className="team-carousel__controls">
                <button
                  className="team-carousel__arrow"
                  onClick={() => navigate(active - 1)}
                  disabled={active === 0}
                  aria-label="Anterior"
                >←</button>

                <div className="team-carousel__dots">
                  {TEAM.map((_, i) => (
                    <button key={i}
                      className={`team-carousel__dot${i === active ? ' team-carousel__dot--active' : ''}`}
                      onClick={() => navigate(i)}
                      aria-label={TEAM[i].name}
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

              {/* Mobile carousel: swipeable */}
              <div
                className="team-mobile"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="team-mobile__card"
                  key={mobileAnimKey}
                  data-dir={mobileAnimDir > 0 ? '1' : '-1'}
                >
                  {/* Foto con overlay */}
                  <a
                    href={mobileMember.href}
                    target="_blank"
                    rel="noreferrer"
                    className="team-mobile__img-wrap"
                    aria-label={`LinkedIn de ${mobileMember.name}`}
                  >
                    <img
                      src={mobileMember.img}
                      alt={mobileMember.name}
                      className="team-mobile__img"
                    />
                    <div className="team-mobile__img-overlay" />
                    <div className="team-mobile__img-badge">
                      <span className="team-mobile__num">{mobileMember.num}</span>
                    </div>
                  </a>

                  {/* Contenido */}
                  <div className="team-mobile__body">
                    <p className="team-mobile__tag">{mobileMember.tag}</p>
                    <h3 className="team-mobile__name">{mobileMember.name}</h3>
                    <p className="team-mobile__desc">{mobileMember.desc}</p>
                    <a
                      href={mobileMember.href}
                      target="_blank"
                      rel="noreferrer"
                      className="team-mobile__link"
                    >
                      Ver LinkedIn →
                    </a>
                  </div>
                </div>

                {/* Controles móvil */}
                <div className="team-mobile__controls">
                  <button
                    className="team-mobile__arrow"
                    onClick={() => mobileNavigate(mobileActive - 1)}
                    disabled={mobileActive === 0}
                    aria-label="Anterior"
                  >←</button>

                  <div className="team-mobile__dots">
                    {TEAM.map((_, i) => (
                      <button
                        key={i}
                        className={`team-mobile__dot${i === mobileActive ? ' team-mobile__dot--active' : ''}`}
                        onClick={() => mobileNavigate(i)}
                        aria-label={TEAM[i].name}
                      />
                    ))}
                  </div>

                  <button
                    className="team-mobile__arrow"
                    onClick={() => mobileNavigate(mobileActive + 1)}
                    disabled={mobileActive === TEAM.length - 1}
                    aria-label="Siguiente"
                  >→</button>
                </div>

                {/* Hint de swipe — solo primera vez */}
                <p className="team-mobile__hint" aria-hidden="true">desliza para navegar</p>
              </div>

            </div>

            <div className="module module--recurring" style={{ maxWidth: '100%' }}>
              <h3 className="module__price" style={{ marginBottom: '1rem' }}>Nuestra experiencia en la trinchera</h3>
              <p className="module__desc" style={{ fontSize: '1.2rem' }}>
                Llevamos a la espalda numerosos proyectos sin un solo cliente que haya tenido que recurrir a mantenimiento de
                emergencia o negocios perdiendo dinero.
              
                Por eso fundamos Katan, para ofrecer una alternativa premium, basada en <strong> código
                  artesanal, seguridad nativa y velocidades extremas</strong>. No inventamos la rueda,
                simplemente la construimos con la máxima precisión.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--gradient-bg" id="diferenciador">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Método</p>
              <h2 className="section__h2">código artesanal<br /><span className="accent">vs.</span> wordpress</h2>
            </header>

            <div className="compare">
              <div className="compare__col compare__col--katan">
                <div className="compare__badge">
                  <svg width="20" height="20" viewBox="0 0 96 96" fill="none" aria-hidden="true">
                    <path d="M0 0 H96 V82 L82 96 H0 Z" fill="#1E1E2A" />
                    <path d="M82 96 L96 82" stroke="#FF0080" strokeWidth="3" />
                    <rect x="26" y="22" width="7" height="52" fill="#F0F4F8" />
                    <path d="M33 48 L63 22 H72 L42 48 Z" fill="#F0F4F8" />
                    <path d="M33 48 L63 74 H72 L42 48 Z" fill="#F0F4F8" />
                    <circle cx="33" cy="48" r="3.5" fill="#FF0080" />
                  </svg>
                  katan studio
                </div>
                <div className="compare__rows">
                  {[
                    { title: 'Carga <1.5s', desc: 'Código limpio, cero plugins innecesarios. Lo que tarda tu web es lo que pierde tu negocio.' },
                    { title: '100% tuyo, sin licencias', desc: 'El código te lo entregamos. Sin renovaciones anuales, sin dependencia de terceros.' },
                    { title: 'Seguridad blindada', desc: 'Sin plugins vulnerables. Sin actualizaciones que rompen la web un lunes por la mañana.' },
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
                <div className="compare__badge compare__badge--wp">WordPress / Plantillas</div>
                <div className="compare__rows">
                  {[
                    { title: '3–8s de carga media', desc: 'Plugins encadenados, temas genéricos, hosting compartido. Google te penaliza en silencio.' },
                    { title: 'Dependencia de licencias', desc: 'Tema premium, plugin de formularios, plugin de SEO, plugin de caché… cada uno con su renovación.' },
                    { title: '43% de la web usa WordPress o plantillas genéricas', desc: 'El target favorito de los atacantes. Una vulnerabilidad afecta a millones de sitios a la vez.' },
                    { title: 'Scope creep garantizado', desc: 'El presupuesto inicial crece con cada "solo añade este plugin" que aparece en el camino.' },
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

            <blockquote className="pull-quote" >
              <p>"Hacemos que tu página se convierta en una herramienta útil para tu día a día, atrayendo a las personas que de verdad buscan tus servicios."</p>
            </blockquote>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}