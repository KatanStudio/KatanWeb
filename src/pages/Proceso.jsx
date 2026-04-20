import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const STEPS = [
  {
    num: '01',
    time: 'Día 0',
    title: 'Llamada inicial',
    desc: 'Una llamada corta de 15–20 minutos. Sin presentaciones de empresa ni PowerPoints. Te explicamos cómo funciona el briefing, qué información necesitamos y resolvemos tus dudas antes de que lo rellenes.',
    detail: 'El objetivo no es venderte nada, es asegurarnos de que tienes todo claro para que el briefing sea útil de verdad. Tú rellenas el formulario cuando quieras, sin presión.',
    icon: '📞',
  },
  {
    num: '02',
    time: 'Día 1',
    title: 'Briefing + propuesta',
    desc: 'Con el formulario en mano, analizamos tu proyecto y en menos de 24 horas te mandamos arquitectura, precio cerrado y fecha de entrega. Lo que firmas el Día 1 es lo que pagas al terminar.',
    detail: 'Precio fijo. Sin letra pequeña. Sin "esto es un extra". Si algo cambia de alcance durante el proyecto, lo hablamos antes de ejecutarlo, nunca después.',
    icon: '📋',
  },
  {
    num: '03',
    time: 'Días 2–4',
    title: 'Reunión de arranque',
    desc: 'Aquí es donde nos juntamos en persona si estás en Toledo, Madrid, Ciudad Real o alrededores. Si no es posible presencialmente, lo hacemos por videollamada.',
    detail: 'Llegamos con una demo funcional de tu proyecto para que veas la dirección visual desde el primer momento. Hablamos del diseño, estructura y cualquier detalle que necesite ajuste antes de meternos de lleno en el código.',
    icon: '🤝',
    highlight: true,
  },
  {
    num: '04',
    time: 'Días 3–9',
    title: 'Desarrollo',
    desc: 'Construimos tu sistema en código propio. Tienes acceso a un enlace de preview privado donde puedes ver los avances en tiempo real. Dos rondas de revisión estructuradas incluidas.',
    detail: 'Las revisiones van por rondas, no por mensajes sueltos. Esto nos permite trabajar con foco y entregarte cambios de golpe, no a cuentagotas.',
    icon: '⚙️',
  },
  {
    num: '05',
    time: 'Día 10',
    title: 'Corte final',
    desc: 'La web publicada, el dominio configurado, Core Web Vitals en verde y el código entregado al 100%. Cerramos con una última reunión/llamada de onboarding para que controles todo.',
    detail: 'Te entregamos acceso completo al hosting, al repositorio y una guía de uso si tienes panel de administración. Nada queda en el aire.',
    icon: '🚀',
  },
]

const COMM_ITEMS = [
  {
    label: 'Toma de contacto',
    channel: 'Llamada de 15–20 min',
    desc: 'Explicamos el proceso y el briefing. Sin compromiso. Sin presentaciones largas.',
    color: 'var(--spark)',
  },
  {
    label: 'Durante el proyecto',
    channel: 'Canal directo contigo',
    desc: 'WhatsApp o el canal que prefieras. Hablas con Adrián y Alejandro, no con un intermediario.',
    color: 'var(--edge)',
  },
  {
    label: 'Revisiones',
    channel: 'Rondas estructuradas',
    desc: 'Los cambios se agrupan por ronda, no por mensaje suelto. Así el trabajo tiene foco y calidad.',
    color: 'var(--spark)',
  },
  {
    label: 'Reuniones presenciales',
    channel: 'Toledo · Madrid · C. Real',
    desc: 'Si estás cerca, nos reunimos en persona. Si no, videollamada. Siempre con demo preparada.',
    color: 'var(--edge)',
  },
  {
    label: 'Entrega',
    channel: 'Reunión de onboarding',
    desc: 'Presencial o por videollamada. Te enseñamos todo y te entregamos los accesos.',
    color: 'var(--spark)',
  },
]

const REQUIREMENTS = [
  {
    num: '01',
    title: 'Textos e imágenes listos',
    desc: 'Necesitamos el contenido antes del Día 2. Si no los tienes, podemos orientarte, pero el plazo empieza cuando tenemos los materiales.',
  },
  {
    num: '02',
    title: 'Feedback en menos de 24h',
    desc: 'Cada ronda de revisión tiene un plazo. Si tardas en responder, el proyecto se retrasa. Somos rápidos construyendo, necesitamos que tú también seas ágil revisando.',
  },
  {
    num: '03',
    title: 'Acceso al dominio',
    desc: 'Para la entrega necesitamos acceso al panel de tu dominio o los datos del registrador. Nosotros lo configuramos todo.',
  },
  {
    num: '04',
    title: 'Una persona de contacto',
    desc: 'Funciona mejor cuando hay una persona que centraliza las decisiones. Evita que lleguen instrucciones contradictorias y el proyecto avanza más rápido.',
  },
]

const FAQ_PROCESS = [
  {
    q: '¿Podré ver la web antes de que esté terminada?',
    a: 'Sí, desde el Día 2 tienes acceso a un enlace de preview privado donde puedes ver el avance en tiempo real. No esperas a la entrega final para saber cómo va quedando.',
  },
  {
    q: '¿Qué pasa si necesito cambios después de la entrega?',
    a: 'El código es tuyo al 100%, puedes modificarlo libremente. Si quieres que lo hagamos nosotros, presupuestamos los cambios como un nuevo módulo. Sin contratos de mantenimiento obligatorios.',
  },
  {
    q: '¿Qué pasa si mis textos no están listos el Día 2?',
    a: 'El proyecto se pausa hasta tenerlos. El plazo de 10 días empieza a contar cuando tenemos todos los materiales. Te lo avisamos en el briefing para que lo planifiques con tiempo.',
  },
  {
    q: '¿Podemos hacer más de dos rondas de revisión?',
    a: 'Las dos rondas están incluidas en el precio. Si necesitas más, las presupuestamos aparte. En la práctica, con el briefing bien hecho y la reunión de arranque, dos rondas son más que suficientes.',
  },
  {
    q: '¿Hacéis reuniones fuera de Toledo/Madrid/Ciudad Real?',
    a: 'Si el proyecto lo justifica, sí. Pero para proyectos estándar preferimos videollamada para no alargar los tiempos. La reunión presencial aporta más valor en la fase de arranque que en cualquier otra.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' is-active' : ''}`}>
      <button className="faq-question" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="faq-text">{q}</span>
        <span className="faq-icon"></span>
      </button>
      <div className="faq-answer"><p>{a}</p></div>
    </div>
  )
}

export default function Proceso() {
  return (
    <>
      <Helmet>
        <title>Proceso — Katan Studio</title>
        <meta name="description" content="Katan Studio — Del brief al corte final. Cinco pasos. Reuniones en Toledo, Madrid y Ciudad Real. Ingeniería pura." />
      </Helmet>

      <Header />

      <main>

        {/* ── Hero de sección ── */}
        <section className="section" id="proceso">
          <div className="container">
            <header className="section__header">
              <p className="section-label">05 / Proceso</p>
              <h2 className="section__h2" style={{ textTransform: 'none' }}>Del brief al<br />corte final</h2>
              <p className="section__sub">
                Sin burocracia, sin reuniones vacías. Cada contacto tiene un propósito claro
                y lo hacemos en persona siempre que podemos.
              </p>
            </header>

            {/* ── Filosofía de contacto ── */}
            <div className="proceso-philosophy">
              <div className="proceso-philosophy__text">
                <p className="section-label" style={{ marginBottom: '1rem' }}>/Nuestra forma de trabajar</p>
                <p>
                  No somos de las agencias que te mandan un PDF con el proceso y luego desaparecen
                  detrás de un CRM. Creemos en el contacto directo, en las reuniones con propósito
                  y en que la primera vez que te enseñamos algo ya tiene que impresionarte.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Si estás en <strong>Toledo, Madrid, Ciudad Real</strong> o cerca, nos juntamos en persona.
                  Si no, videollamada. Siempre con algo concreto que enseñarte, nunca a mano vacía.
                </p>
              </div>
              <div className="proceso-philosophy__badge">
                <span className="proceso-badge-num">10</span>
                <span className="proceso-badge-label">días de media<br />por proyecto</span>
              </div>
            </div>

            {/* ── Steps ── */}
            <div className="process-grid" style={{ marginTop: '4rem' }}>
              {STEPS.map((step) => (
                <div key={step.num} className={`process-card${step.highlight ? ' process-card--highlight' : ''}`}>
                  {step.highlight && (
                    <div className="process-card__badge">Reunión presencial</div>
                  )}
                  <div className="process-card__header">
                    <span className="process-card__num">{step.num}</span>
                    <span className="process-card__time">{step.time}</span>
                  </div>
                  <h4 className="process-card__title">
                    <span className="process-card__icon">{step.icon}</span>
                    {step.title}
                  </h4>
                  <p className="process-card__desc">{step.desc}</p>
                  <p className="process-card__detail">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comunicación ── */}
        <section className="section section--dark" id="comunicacion">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Cómo nos comunicamos</p>
              <h2 className="section__h2" style={{ textTransform: 'none' }}>
                Siempre sabes<br /><span className="accent">con quién hablas.</span>
              </h2>
              <p className="section__sub">
                Sin Account Managers. Sin tickets de soporte. Hablas directamente con
                los dos ingenieros que construyen tu proyecto.
              </p>
            </header>

            <div className="comm-grid">
              {COMM_ITEMS.map((item, i) => (
                <div key={i} className="comm-item" style={{ '--comm-color': item.color }}>
                  <span className="comm-item__label">{item.label}</span>
                  <span className="comm-item__channel">{item.channel}</span>
                  <p className="comm-item__desc">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="proceso-presencial-banner">
              <div className="proceso-presencial-banner__content">
                <p className="proceso-presencial-banner__tag">// Reuniones presenciales</p>
                <p className="proceso-presencial-banner__text">
                  Si tu empresa está en <strong>Toledo, Madrid, Ciudad Real</strong> o cualquier
                  zona cercana, nos reunimos en persona. Creemos que hay decisiones que se toman
                  mejor mirándose a los ojos y con un café delante.
                </p>
              </div>
              <div className="proceso-presencial-banner__zones">
                {['Toledo', 'Madrid', 'Ciudad Real', 'Talavera', 'Cuenca', 'Albacete'].map(city => (
                  <span key={city} className="proceso-city-tag">{city}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Lo que necesitamos de ti ── */}
        <section className="section" id="requisitos">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Lo que necesitamos de ti</p>
              <h2 className="section__h2" style={{ textTransform: 'none' }}>
                El proyecto es<br /><span className="accent">un equipo.</span>
              </h2>
              <p className="section__sub">
                Para entregar en 10 días necesitamos que el cliente también sea ágil.
                Aquí están las únicas cosas que te pedimos.
              </p>
            </header>

            <div className="requisitos-grid">
              {REQUIREMENTS.map((req) => (
                <div key={req.num} className="requisito-item">
                  <span className="requisito-item__num">{req.num}</span>
                  <div>
                    <h4 className="requisito-item__title">{req.title}</h4>
                    <p className="requisito-item__desc">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ de proceso ── */}
        <section className="faq-section" id="faq-proceso">
          <div className="faq__visual" aria-hidden="true">
            <div className="glow-orb orb-faq-1"></div>
            <div className="glow-orb orb-faq-2"></div>
            <div className="mesh-overlay"></div>
          </div>
          <div className="container faq__container">
            <header className="section__header" style={{ textAlign: 'center' }}>
              <p className="section-label" style={{ justifyContent: 'center' }}>/ Dudas frecuentes sobre el proceso</p>
              <h2 className="section__h2" style={{ textTransform: 'lowercase' }}>
                preguntas<br /><span className="accent">del proceso.</span>
              </h2>
            </header>
            <div className="faq-accordion">
              {FAQ_PROCESS.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-section__glow" aria-hidden="true"></div>
          <div className="container cta-section__container">
            <div className="cta-section__box">
              <p className="kicker kicker--center">// Primer paso</p>
              <h2 className="cta-section__h2" style={{ textTransform: 'none' }}>¿Empezamos con una llamada?</h2>
              <p className="cta-section__sub">
                15 minutos. Te explicamos el briefing, resolvemos tus dudas y arrancamos.
                Sin compromiso, sin presentaciones largas.
              </p>
              <div className="cta-actions">
                <Link to="/contacto" className="btn btn--primary btn--large btn--chamfer">Solicitar llamada →</Link>
                <div className="cta-email-box">
                  <span className="cta-email-label">O escríbenos directamente:</span>
                  <a href="mailto:katan.webs@gmail.com" className="cta-email-link">katan.webs@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}