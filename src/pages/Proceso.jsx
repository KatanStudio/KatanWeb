import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const STEPS = [
  {
    num: '01',
    time: 'Día 0',
    title: 'Llamada inicial',
    desc: 'Una llamada corta de 15–20 minutos. Sin presentaciones de empresa ni PowerPoints. Te explicamos cómo funciona el briefing (formulario), qué información necesitamos y resolvemos tus dudas antes de que lo rellenes.',
    detail: 'El objetivo no es venderte nada, es asegurarnos de que tienes todo claro para que el briefing sea útil de verdad. Tú rellenas el formulario cuando quieras, sin presión.',
    icon: '📞',
  },
  {
    num: '02',
    time: 'Día 1',
    title: 'Formulario + propuesta',
    desc: 'Con el formulario en mano, analizamos tu proyecto y en menos de 48 horas te mandamos arquitectura, alcance,  precio cerrado y las fechas orientadas. Lo que firmas el Día 1 es lo que pagas al terminar.',
    detail: 'Precio fijo. Sin letra pequeña. Sin "esto es un extra". Si algo cambia de alcance durante el proyecto, lo hablamos antes de ejecutarlo, nunca después.',
    icon: '📋',
  },
  {
    num: '03',
    time: 'Días 2–4',
    title: 'Reunión de arranque',
    desc: 'Aquí es donde nos juntamos en persona si estás en Toledo, Madrid o alrededores. Si no es posible presencialmente, lo hacemos por videollamada.',
    detail: 'Llegamos con demostraciones para que veas la dirección visual desde el primer momento. Hablamos del diseño, estructura y cualquier detalle que necesite ajuste antes de meternos de lleno en el código.',
    icon: '🤝',
    highlight: true,
  },
  {
    num: '04',
    time: 'Día 3 en adelante',
    title: 'Desarrollo',
    desc: 'Construimos tu sistema en código propio. Tienes posibilidad de ver un avance privado y dos rondas de revisión estructuradas incluidas.',
    detail: 'Las revisiones van por rondas, no por mensajes sueltos. Esto nos permite trabajar con foco y entregarte cambios de golpe, no a cuentagotas.',
    icon: '⚙️',
  },
  {
    num: '05',
    time: 'Entrega definitiva',
    title: 'Corte final',
    desc: 'La web publicada, el dominio configurado, Core Web Vitals en verde y el código entregado al 100%. Cerramos con una última reunión/llamada de onboarding para que controles todo.',
    detail: 'Te entregamos acceso completo al hosting y una guía de uso si tienes panel de administración. Nada queda en el aire y, si tuvieras problemas, nos encargaríamos con el servicio de mantenimiento.',
    icon: '🚀',
  },
]

const COMM_ITEMS = [
  {
    label: 'pRIMERA Toma de contacto',
    channel: 'Llamada de 15–20 min',
    desc: 'Explicamos el proceso y el formulario. Sin compromiso ni presentaciones largas.',
    color: 'var(--spark)',
  },
  {
    label: 'Durante el proyecto',
    channel: 'Canal directo contigo',
    desc: 'Hablas con Adrián y Alejandro, no con un intermediario. Seremos los encargados totales de tu proyecto.',
    color: 'var(--edge)',
  },
  {
    label: 'Revisiones',
    channel: 'Rondas estructuradas',
    desc: 'Los cambios se agrupan por ronda, no por mensajes sueltos. Así el trabajo tiene foco y calidad.',
    color: 'var(--spark)',
  },
  {
    label: 'Reuniones presenciales',
    channel: 'Toledo · Madrid · Alrededores',
    desc: 'Si estás cerca, nos reunimos en persona. Si no, videollamada.',
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
    title: 'Tu contenido (o el nuestro)',
    desc: 'Si ya tienes tus textos y fotografías listas, genial, las integramos. Si partes de cero o necesitas ayuda, no te agobies: ofrecemos servicios de redacción y diseño para crear todo el material por ti.',
  },
  {
    num: '02',
    title: 'Revisiones a tu ritmo',
    desc: 'Trabajamos mediante rondas de revisión estructuradas. No queremos meterte prisa, tómate tu tiempo para revisarlo todo con calma. Solo te pedimos mantener una comunicación fluida para no perder la inercia del proyecto.',
  },
  {
    num: '03',
    title: 'Gestión del dominio',
    desc: 'Si ya tienes tu dominio web comprado, solo necesitaremos un acceso temporal para enlazarlo. Si aún no tienes uno, despreocúpate: nosotros nos encargamos de buscarlo, registrarlo y configurarlo todo.',
  },
  {
    num: '04',
    title: 'Un interlocutor principal',
    desc: 'Para que el proyecto avance sin malentendidos, es ideal que haya una sola persona en tu equipo encargada de unificar y pasarnos los cambios. Así evitamos cruces de correos e instrucciones contradictorias.',
  },
]


/**
 * Hook: observa un contenedor y añade .is-visible a sus hijos
 * con el selector indicado cuando entran en el viewport.
 */
function useStaggerReveal(containerRef, childSelector = '.process-card') {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll(childSelector)
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            // Una vez visible, dejamos de observar esa card
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,   // card visible al 12% → dispara
        rootMargin: '0px 0px -40px 0px', // pequeño offset inferior
      }
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [containerRef, childSelector])
}

export default function Proceso() {
  const gridRef = useRef(null)
  useStaggerReveal(gridRef, '.process-card')

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
                  detrás de un gestor de clientes. Creemos en el contacto directo, en las reuniones con propósito
                  y en que la primera vez que te enseñamos algo ya tiene que impresionarte.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Si estás en <strong>Toledo, Madrid</strong> o alrededores, nos reunimos en persona.
                  Si no, por videollamada. Siempre con algo concreto que enseñarte, nunca a mano vacía.
                </p>
              </div>
              <div className="proceso-philosophy__badge">
                <span className="proceso-badge-num">0</span>
                <span className="proceso-badge-label">Intermediarios<br />directo a los creadores</span>
              </div>
            </div>

            {/* ── Steps ── */}
            <div className="process-grid" style={{ marginTop: '4rem' }} ref={gridRef}>
              {STEPS.map((step) => (
                <div key={step.num} className={`process-card${step.highlight ? ' process-card--highlight' : ''}`}>
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
                  Si tu empresa está en <strong>Toledo, Madrid</strong> o cualquier
                  zona cercana, nos reunimos en persona. Creemos que hay decisiones que se toman
                  mejor mirándose a los ojos y con un café delante.
                </p>
              </div>
              <div className="proceso-presencial-banner__zones">
                {['Toledo', 'Madrid', 'Ciudad Real', 'Talavera', 'y más'].map(city => (
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
                Para entregar en los dias pactados necesitamos que el cliente también sea ágil.
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