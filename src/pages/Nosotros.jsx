import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Nosotros() {
  return (
    <>
      <Helmet>
        <title>Por qué Katan — Katan Studio</title>
        <meta name="description" content="Katan Studio — La anti-agencia. Dos desarrolladores, cero intermediarios. Código artesanal vs WordPress." />
      </Helmet>

      <Header />

      <main>
        <section className="section" id="el-estudio">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/El Estudio</p>
              <h2 className="section__h2">La anti-agencia.<br /><span className="accent">cero intermediarios.</span></h2>
              <p className="section__sub" style={{ maxWidth: '60ch', fontSize: '1.1rem', marginTop: '1.5rem' }}>
                No somos una agencia tradicional llena de burocracia, reuniones inútiles y plantillas
                recicladas. Somos Katan: un estudio independiente formado por dos desarrolladores. Tú hablas con nosotros,
                nosotros escribimos el código.
              </p>
            </header>

            <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '4rem' }}>
              <a href="https://www.linkedin.com/in/adrián-lozano" target="_blank" rel="noreferrer">
                <div className="service-card">
                  <div className="service-card__top">
                    <span className="service-card__num">_dev.01</span>
                    <span className="service-card__tag">Negocio &amp; UI/UX</span>
                  </div>
                  <div className="team-img-wrap">
                    <img src="/img/FotoAdrian.jpg" alt="Adrián Lozano" className="team-img" width="120" height="120" />
                  </div>
                  <h3 className="service-card__title" style={{ margin: '1.5rem 0 0.5rem' }}>Adrián Lozano</h3>
                  <p className="service-card__desc">
                    Graduado en ADE (UCLM) y desarrollador web (DAW). Fusiono la estrategia comercial con la
                    ejecución técnica. Mi obsesión es que la interfaz no solo tenga un código impecable, sino
                    que cargue en &lt;1.5s y esté diseñada matemáticamente para vender.
                  </p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/alejandro-quintana-rodriguez/" target="_blank" rel="noreferrer">
                <div className="service-card">
                  <div className="service-card__top">
                    <span className="service-card__num">_dev.02</span>
                    <span className="service-card__tag">Arquitectura &amp; Lógica</span>
                  </div>
                  <div className="team-img-wrap">
                    <img src="/img/FotoAlejandro.jpg" alt="Alejandro Quintana" className="team-img" width="120" height="120" />
                  </div>
                  <h3 className="service-card__title" style={{ margin: '1.5rem 0 0.5rem' }}>Alejandro Quintana</h3>
                  <p className="service-card__desc">
                    Graduado en Ingeniería Informática (UCLM) y curtido en gestión de proyectos ágiles (Scrum).
                    Especialista en la estructura profunda. Construyo arquitectura escalable, bases de datos
                    eficientes y lógica compleja para que tu sistema funcione sin fisuras.
                  </p>
                </div>
              </a>
            </div>

            <div className="module module--recurring" style={{ maxWidth: '1100px' }}>
              <h3 className="module__price" style={{ marginBottom: '1rem' }}>Nuestra experiencia en la trinchera</h3>
              <p className="module__desc" style={{ fontSize: '0.95rem' }}>
                Llevamos a la espalda numerosos proyectos sin un solo cliente que haya tenido que recurrir a mantenimiento de
                emergencia o negocios perdiendo dinero porque su web tarda 8 segundos en cargar o
                porque un plugin se rompió el fin de semana.
                <br /><br />
                Por eso fundamos Katan. Para ofrecer una alternativa premium, basada en <strong> código
                  artesanal, seguridad nativa y velocidades extremas</strong>. No inventamos la rueda,
                simplemente la construimos con la máxima precisión.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="diferenciador">
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
                    { title: 'Precio cerrado desde el día 1', desc: 'El presupuesto que firmas es el que aparece en la factura. Sin letra pequeña.' },
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
                    { title: '43% de la web usa WP', desc: 'El target favorito de los atacantes. Una vulnerabilidad afecta a millones de sitios a la vez.' },
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

            <blockquote className="pull-quote">
              <p>"Tu web actual tarda 8 segundos en cargar. La nuestra tarda menos de 1.5. La diferencia no es diseño — es código."</p>
            </blockquote>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
