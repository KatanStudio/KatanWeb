import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Privacidad() {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad — Katan Studio</title>
        <meta name="description" content="Tus datos son tuyos. Aquí te explicamos cómo los protegemos y para qué los usamos." />
      </Helmet>

      <Header />

      <main>
        <div className="container">
          <div className="legal-hero">
            <p className="kicker">// protección de datos</p>
            <h1 className="legal-h1">política de privacidad.</h1>
            <p className="section__sub">Tus datos son tuyos. Aquí te explicamos cómo los protegemos y para qué los usamos.</p>
          </div>
        </div>

        <div className="container">
          <div className="legal-content">

            <h2>1. Responsable del tratamiento</h2>
            <p>A efectos de lo previsto en el Reglamento General de Protección de Datos (RGPD), los datos de contacto del responsable de esta web son:</p>

            <table className="legal-table">
              <tbody>
                <tr>
                  <td rowSpan="2"><strong>Titulares</strong></td>
                  <td>Adrián Lozano Díaz (Katan)</td>
                </tr>
                <tr>
                  <td>Alejandro Quintana Rodríguez (Katan)</td>
                </tr>
                <tr>
                  <td><strong>Email de contacto</strong></td>
                  <td><a href="mailto:info@katan.es" style={{ color: 'var(--spark)' }}>info@katan.es</a></td>
                </tr>
              </tbody>
            </table>

            <h2>2. Finalidad del tratamiento</h2>
            <p>No recopilamos datos que no necesitamos. Si contactas con nosotros o rellenas nuestro briefing, usaremos tu información exclusivamente para:</p>
            <ul>
              <li>Responder a tus consultas o solicitudes de presupuesto.</li>
              <li>Gestionar el desarrollo de tu proyecto web (facturación, comunicación, entregas).</li>
              <li>No te enviaremos newsletters ni publicidad no solicitada. Cero spam.</li>
            </ul>

            <h2>3. Legitimación</h2>
            <p>La base legal para el tratamiento de tus datos es la <strong>ejecución de un contrato</strong> (cuando desarrollamos tu web) o tu <strong>consentimiento expreso</strong> (cuando nos envías un mensaje voluntariamente a través del formulario de briefing o email).</p>

            <h2>4. Conservación de los datos</h2>
            <p>Mantendremos tus datos en nuestro sistema solo el tiempo necesario para cumplir con la finalidad para la que se solicitaron (ej. mientras dure el desarrollo de tu web) y para determinar posibles responsabilidades legales que pudieran derivarse.</p>

            <h2>5. Destinatarios y cesión de datos</h2>
            <p>Tus datos no se venden ni se ceden a terceros. Nunca. Solo compartimos la información estrictamente necesaria con los proveedores de servicios que nos permiten operar (por ejemplo, nuestro proveedor de hosting o el servicio de correo electrónico), los cuales operan bajo sus propios y estrictos protocolos de seguridad.</p>

            <h2>6. Tus derechos</h2>
            <p>El control sobre tus datos lo tienes tú. En cualquier momento puedes ejercer tus derechos de:</p>
            <ul>
              <li><strong>Acceso:</strong> Saber qué datos tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> Pedirnos que borremos todo tu rastro de nuestro sistema.</li>
              <li><strong>Oposición y limitación:</strong> Oponerte al tratamiento de tus datos.</li>
            </ul>
            <p>Para ejercerlos, simplemente escribe un email directo a <a href="mailto:info@katan.es" style={{ color: 'var(--spark)' }}>info@katan.es</a>. Lo procesaremos sin fricciones.</p>

            <h2>7. Medidas de seguridad</h2>
            <p>Hacemos webs seguras y tratamos tus datos de la misma manera. Hemos adoptado las medidas técnicas necesarias (como certificados SSL y encriptación básica) para evitar el acceso no autorizado o la pérdida de tu información.</p>

            <div className="legal-footer-nav">
              <Link to="/legal/aviso-legal">Aviso legal</Link>
              <Link to="/legal/privacidad" className="active">Privacidad</Link>
              <Link to="/legal/cookies">Cookies</Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
