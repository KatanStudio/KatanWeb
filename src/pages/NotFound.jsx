import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada — Katan Studio</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Header />

      <main>
        <div className="container">
          <div className="legal-hero">
            <p className="kicker">// error 404</p>
            <h1 className="legal-h1">página no encontrada.</h1>
            <p className="section__sub">La URL que buscas no existe o ha cambiado de sitio.</p>
            <Link to="/" className="btn btn--primary btn--chamfer">Volver al inicio</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
