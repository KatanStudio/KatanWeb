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
        <section className="contacto-hero" id="contacto" style={{ textAlign: 'center' }}>
          <div className="contacto-hero__bg" aria-hidden="true">
            <div className="glow-orb orb-page-1" />
            <div className="glow-orb orb-page-2" />
            <img src="/logos/KATAN LOGO SVG (3).svg" className="contacto-hero__k" alt="" aria-hidden="true" />
          </div>
          <div className="container">
            <div className="contacto-hero__content">
              <p className="kicker kicker--center">// Respuesta en 24h</p>
              <h1 className="contacto-hero__h1" style={{ textTransform: 'none' }}>¿Empezamos?</h1>
              <p className="contacto-hero__sub">Presupuesto cerrado antes de empezar. Sin letra pequeña. Sin reuniones eternas.</p>
              <Link to="/briefing" className="btn btn--chamfer btn--large">Solicitar presupuesto</Link>
              <p className="contacto-hero__note">
                O escríbenos directamente a{' '}
                <a href="mailto:katan.webs@gmail.com" className="contacto-hero__email">katan.webs@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}