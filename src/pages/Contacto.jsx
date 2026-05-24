import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export function ContactoSection() {
  return (
    <section className="contacto-hero" id="contacto" style={{ textAlign: 'center' }}>
      <div className="contacto-hero__bg" aria-hidden="true">
        <div className="glow-orb orb-blue-1" />
        <div className="glow-orb orb-blue-2" />
      </div>
      <div className="container">
        <div className="contacto-hero__content">
          <p className="kicker kicker--center">// Respuesta en 24h</p>
          <h2 className="contacto-hero__h1" style={{ textTransform: 'none' }}>¿Empezamos?</h2>
          <p className="contacto-hero__sub">Presupuesto cerrado antes de empezar. Sin letra pequeña. Sin reuniones eternas.</p>
          <Link to="/briefing" className="btn btn--chamfer btn--large">Solicitar presupuesto</Link>
          <p className="contacto-hero__note">
            O escríbenos directamente a{' '}
            <a href="mailto:info@katan.es" className="contacto-hero__email">info@katan.es</a>
          </p>
        </div>
      </div>
    </section>
  )
}

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
            <div className="glow-orb orb-blue-1" />
            <div className="glow-orb orb-blue-2" />
          </div>
          <div className="container">
            <div className="contacto-hero__content">
              <p className="kicker kicker--center">// Respuesta en 24h</p>
              <h1 className="contacto-hero__h1" style={{ textTransform: 'none' }}>¿Empezamos?</h1>
              <p className="contacto-hero__sub">Presupuesto cerrado antes de empezar. Sin letra pequeña. Sin reuniones eternas.</p>
              <Link to="/briefing" className="btn btn--chamfer btn--large">Solicitar presupuesto</Link>
              <p className="contacto-hero__note">
                O escríbenos directamente a{' '}
                <a href="mailto:info@katan.es" className="contacto-hero__email">info@katan.es</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}