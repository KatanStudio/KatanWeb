import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const STEPS = [
  { num: '01', time: 'Día 0', title: 'briefing', desc: 'Cuéntanos qué necesitas. Un formulario asíncrono que define el proyecto completo. Nada de llamadas de "toma de contacto" para perder el tiempo.' },
  { num: '02', time: 'Día 1', title: 'propuesta', desc: 'En 24 horas te mandamos arquitectura, precio cerrado y plazo. Lo firmas y arrancamos el motor. Sin modificaciones sorpresa en la factura.' },
  { num: '03', time: 'Días 2–9', title: 'desarrollo', desc: 'Construimos tu sistema en código propio. Dos rondas de revisión incluidas. Tú vas viendo los avances de la interfaz en tiempo real en un enlace privado.' },
  { num: '04', time: 'Día 10', title: 'corte final', desc: 'La web publicada, optimizada para cargar en milisegundos, el dominio configurado y el código entregado. Tu negocio sube de nivel.' },
]

export default function Proceso() {
  return (
    <>
      <Helmet>
        <title>Proceso — Katan Studio</title>
        <meta name="description" content="Katan Studio — Del brief al corte final. Cuatro pasos. Sin reuniones innecesarias. Ingeniería pura." />
      </Helmet>

      <Header />

      <main>
        <section className="section" id="proceso">
          <div className="container">
            <header className="section__header">
              <p className="section-label">05 / Proceso</p>
              <h2 className="section__h2" style={{ textTransform: 'none' }}>Del brief al<br />corte final</h2>
              <p className="section__sub">Cuatro pasos. Sin reuniones innecesarias. Ingeniería pura.</p>
            </header>

            <div className="process-grid">
              {STEPS.map((step) => (
                <div key={step.num} className="process-card">
                  <div className="process-card__header">
                    <span className="process-card__num">{step.num}</span>
                    <span className="process-card__time">{step.time}</span>
                  </div>
                  <h4 className="process-card__title">{step.title}</h4>
                  <p className="process-card__desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
