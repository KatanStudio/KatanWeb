import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Cookies() {
  return (
    <>
      <Helmet>
        <title>Política de Cookies — Katan Studio</title>
        <meta name="description" content="Información clara sobre el uso de cookies en nuestro sistema." />
      </Helmet>

      <Header />

      <main>
        <div className="container">
          <div className="legal-hero">
            <p className="kicker">// transparencia técnica</p>
            <h1 className="legal-h1">política de cookies.</h1>
            <p className="section__sub">Información clara sobre el uso de cookies en nuestro sistema.</p>
          </div>
        </div>

        <div className="container">
          <div className="legal-content">

            <h2>1. ¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo al visitar una página web. Sirven para recordar información técnica sobre tu sesión y garantizar que todo funcione rápido y sin errores.</p>

            <h2>2. Tipos de cookies utilizadas</h2>
            <p>Construimos webs sin código innecesario, y aplicamos la misma regla aquí. Usamos lo justo y necesario:</p>

            <table className="legal-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Técnicas</strong></td>
                  <td>Imprescindibles para el correcto funcionamiento del sitio web (navegación segura, carga de recursos).</td>
                  <td><span className="badge badge--necesaria">Necesaria</span></td>
                </tr>
                <tr>
                  <td><strong>Personalización</strong></td>
                  <td>Permiten recordar preferencias como si ya has cerrado el aviso de cookies.</td>
                  <td><span className="badge badge--necesaria">Necesaria</span></td>
                </tr>
                <tr>
                  <td><strong>Análisis</strong></td>
                  <td>Medición estadística anónima para saber cuánta gente nos visita y optimizar el rendimiento.</td>
                  <td><span className="badge badge--analitica">Analítica</span></td>
                </tr>
              </tbody>
            </table>

            <h2>3. Cookies de terceros</h2>
            <p>Este sitio web puede utilizar servicios de terceros (como análisis estadístico) que recopilan información de forma anónima. Nunca vendemos datos a terceros ni usamos cookies para publicidad invasiva.</p>

            <h2>4. Consentimiento</h2>
            <p>Al acceder al sitio web, se te informa del uso de cookies. La aceptación expresa a través del banner, o la continuación explícita de la navegación, implica la aceptación de su uso bajo estas condiciones.</p>

            <h2>5. Cómo desactivar las cookies</h2>
            <p>Puedes auditar, bloquear o eliminar las cookies instaladas en tu dispositivo configurando tu navegador:</p>
            <ul>
              <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
              <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad</li>
              <li><strong>Safari:</strong> Preferencias → Privacidad</li>
              <li><strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios</li>
            </ul>
            <p>Ten en cuenta que bloquear las cookies técnicas puede romper el diseño o funcionalidad del sitio.</p>

            <div className="legal-footer-nav">
              <Link to="/legal/aviso-legal">Aviso legal</Link>
              <Link to="/legal/privacidad">Privacidad</Link>
              <Link to="/legal/cookies" className="active">Cookies</Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
