import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Contacto() {
  return (
    <>
      <Helmet>
        <title>Contacto — Katan Studio</title>
        <meta name="description" content="Katan Studio — Presupuesto cerrado antes de empezar. Sin letra pequeña. Sin reuniones eternas." />
      </Helmet>

      <Header />

      <main>
        <section className="cta-section" id="contacto">
          <div className="cta-section__bg" aria-hidden="true">
            <svg className="cta-section__k" viewBox="0 0 96 96" fill="none" aria-hidden="true">
              <path d="M0 0 H96 V82 L82 96 H0 Z" fill="#FF0080" />
              <path d="M82 96 L96 82" stroke="#FF0080" strokeWidth="2" />
              <rect x="26" y="22" width="7" height="52" fill="#FF0080" />
              <path d="M33 48 L63 22 H72 L42 48 Z" fill="#FF0080" />
              <path d="M33 48 L63 74 H72 L42 48 Z" fill="#FF0080" />
              <circle cx="33" cy="48" r="3.5" fill="#FF0080" />
            </svg>
          </div>
          <div className="container">
            <div className="cta-section__content">
              <p className="kicker">// Respuesta en 24h</p>
              <h2 className="cta-section__h2" style={{ textTransform: 'none' }}>¿Empezamos?</h2>
              <p className="cta-section__sub">Presupuesto cerrado antes de empezar. Sin letra pequeña. Sin reuniones eternas.</p>
              <Link to="/briefing" className="btn btn--chamfer btn--large">Solicitar presupuesto</Link>
              <p className="cta-section__note">
                O escríbenos directamente a{' '}
                <a href="mailto:katan.webs@gmail.com" className="cta-section__email">katan.webs@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
