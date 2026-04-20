import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function AvisoLegal() {
  return (
    <>
      <Helmet>
        <title>Aviso Legal — Katan Studio</title>
        <meta name="description" content="Información identificativa y normas de uso del sitio web de Katan Studio." />
      </Helmet>

      <Header />

      <main>
        <div className="container">
          <div className="legal-hero">
            <p className="kicker">// compliance &amp; legal</p>
            <h1 className="legal-h1">Aviso legal</h1>
            <p className="section__sub">Información identificativa y normas de uso del sitio web.</p>
          </div>
        </div>

        <div className="container">
          <div className="legal-content">

            <h2>1. Datos identificativos</h2>
            <p>En cumplimiento con el deber de información recogido en la Ley 34/2002, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa que este sitio web es titularidad de:</p>

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
                  <td><strong>NIF / DNI</strong></td>
                  <td>[Tu NIF/DNI]</td>
                </tr>
                <tr>
                  <td><strong>Email de contacto</strong></td>
                  <td><a href="mailto:katan.webs@gmail.com" style={{ color: 'var(--spark)' }}>katan.webs@gmail.com</a></td>
                </tr>
              </tbody>
            </table>

            <h2>2. Usuarios y uso del sitio web</h2>
            <p>El acceso y/o uso de este portal te atribuye la condición de usuario, aceptando desde dicho acceso las condiciones de uso aquí reflejadas. Este sitio web proporciona información sobre servicios de desarrollo web, portfolio de proyectos y contacto directo. Como usuario, asumes la responsabilidad del uso correcto del portal y te comprometes a no realizar actividades ilícitas, ilegales o contrarias a la buena fe.</p>

            <h2>3. Propiedad intelectual e industrial</h2>
            <p>Katan Studio es titular de todos los derechos de propiedad intelectual e industrial de esta página web, así como de los elementos contenidos en la misma (a título enunciativo: código fuente, diseño de interfaces, logotipo, paleta de colores, textos y arquitectura).</p>
            <p><strong>Cualquier reproducción, distribución o comunicación pública de la totalidad o parte de los contenidos de esta web sin autorización expresa queda terminantemente prohibida.</strong> No copies nuestro código ni uses nuestra identidad visual para otros proyectos.</p>

            <h2>4. Exclusión de garantías y responsabilidad</h2>
            <p>Katan Studio ha adoptado todas las medidas tecnológicas necesarias para evitar daños a los usuarios. Sin embargo, no nos hacemos responsables de los perjuicios que se pudieran derivar de la caída de servidores de terceros, problemas de conexión del usuario o la presencia de software malicioso insertado por terceros de forma ilícita.</p>

            <h2>5. Enlaces (Links)</h2>
            <p>En el caso de que en este sitio web se dispusiesen enlaces hacia otros sitios de Internet (como enlaces a proyectos de clientes o redes sociales), no ejerceremos ningún tipo de control sobre dichos sitios ni sus contenidos. En ningún caso asumiremos responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.</p>

            <h2>6. Derecho de exclusión y modificaciones</h2>
            <p>Nos reservamos el derecho a denegar o retirar el acceso al portal sin necesidad de preaviso a aquellos usuarios que incumplan las presentes condiciones. Asimismo, nos reservamos el derecho a realizar sin previo aviso las modificaciones que consideremos oportunas en la web, pudiendo cambiar, suprimir o añadir contenidos y servicios.</p>

            <h2>7. Legislación aplicable y jurisdicción</h2>
            <p>La relación entre Katan y el usuario se regirá por la normativa española vigente. Cualquier controversia técnica o legal se someterá a los Juzgados y Tribunales españoles correspondientes.</p>

            <div className="legal-footer-nav">
              <Link to="/legal/aviso-legal" className="active">Aviso legal</Link>
              <Link to="/legal/privacidad">Privacidad</Link>
              <Link to="/legal/cookies">Cookies</Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
