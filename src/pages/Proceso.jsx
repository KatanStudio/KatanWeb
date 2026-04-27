import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const STEPS = [
  {
    num: '01',
    time: 'Día 0',
    title: 'Llamada Inicial',
    micro: '15 min sin compromiso. Resolvemos tus dudas.',
    desc: 'Una llamada corta de 15–20 minutos. Sin presentaciones de empresa ni PowerPoints. Te explicamos cómo funciona el briefing (formulario), qué información necesitamos y resolvemos tus dudas antes de que lo rellenes.',
    detail: 'El objetivo no es venderte nada, es asegurarnos de que tienes todo claro para que el briefing sea útil de verdad. Tú rellenas el formulario cuando quieras, sin presión.',
  },
  {
    num: '02',
    time: 'Día 1',
    title: 'Formulario + Propuesta',
    micro: 'Arquitectura, precio cerrado y plazos en 48 h.',
    desc: 'Con el formulario en mano, analizamos tu proyecto y en menos de 48 horas te mandamos arquitectura, alcance, precio cerrado y las fechas orientadas. Lo que firmas el Día 1 es lo que pagas al terminar.',
    detail: 'Precio fijo. Sin letra pequeña. Sin "esto es un extra". Si algo cambia de alcance durante el proyecto, lo hablamos antes de ejecutarlo, nunca después.',
    highlight: true,
  },
  {
    num: '03',
    time: 'Días 2–4',
    title: 'Reunión De Arranque',
    micro: 'Presencial o por vídeo. Llegamos con demos.',
    desc: 'Aquí es donde nos juntamos en persona si estás en Toledo, Madrid o alrededores. Si no es posible presencialmente, lo hacemos por videollamada.',
    detail: 'Llegamos con demostraciones para que veas la dirección visual desde el primer momento. Hablamos del diseño, estructura y cualquier detalle que necesite ajuste antes de meternos de lleno en el código.',
  },
  {
    num: '04',
    time: 'Día 3 en adelante',
    title: 'Desarrollo',
    micro: 'Código propio, avances privados, mínimo 2 revisiones.',
    desc: 'Construimos tu sistema en código propio. Tienes posibilidad de ver un avance privado y dos rondas de revisión estructuradas incluidas.',
    detail: 'Las revisiones van por rondas, no por mensajes sueltos. Esto nos permite trabajar con foco y entregarte cambios de golpe, no a cuentagotas.',
    highlight: true,
  },
  {
    num: '05',
    time: 'Entrega definitiva',
    title: 'Corte Final',
    micro: 'Web publicada, código entregado, cero flecos.',
    desc: 'La web publicada, el dominio configurado, Core Web Vitals en verde y el código entregado al 100%. Cerramos con una última reunión/llamada de onboarding para que controles todo.',
    detail: 'Te entregamos acceso completo al hosting y una guía de uso si tienes panel de administración. Nada queda en el aire y, si tuvieras problemas, nos encargaríamos con el servicio de mantenimiento.',
  },
]

const COMM_ITEMS = [
  {
    label: 'Primera toma de contacto',
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
    desc: 'Si ya tienes tu dominio web comprado, solo necesitaremos un acceso temporal para enlazarlo. De todas formas, si aún no tienes uno, despreocúpate: nosotros nos encargamos de buscarlo, registrarlo y configurarlo todo.',
  },
  {
    num: '04',
    title: 'Un interlocutor principal',
    desc: 'Para que el proyecto avance sin malentendidos, es ideal que haya una sola persona en tu equipo encargada de unificar y pasarnos los cambios. Así evitamos cruces de correos e instrucciones contradictorias.',
  },
]

const CLAIMS = [
  'Precio cerrado desde el día 1',
  'Canal directo con nosotros',
  'Rondas de revisión estructuradas',
  'Te acompañamos en el lanzamiento Web',
]

export default function Proceso() {
  const [activeStep, setActiveStep] = useState(null)
  const [openReq, setOpenReq] = useState(null)
  const swipeRef = useRef(null)
  const [swipeIndex, setSwipeIndex] = useState(0)

  const scrollToCard = (i) => {
    const el = swipeRef.current
    if (!el) return
    el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = swipeRef.current
    if (!el) return
    const handleScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth)
      setSwipeIndex(Math.max(0, Math.min(i, STEPS.length - 1)))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Helmet>
        <title>Proceso — Katan Studio</title>
        <meta name="description" content="Katan Studio — Del brief al corte final. Cinco pasos. Reuniones en Toledo, Madrid y Ciudad Real. Ingeniería pura." />
      </Helmet>

      <Header />

      <main>

        {/* ── Hero de sección ── */}
        <section className="section section--orbs" id="proceso">
          <div className="glow-orb orb-page-1" aria-hidden="true" />
          <div className="glow-orb orb-page-2" aria-hidden="true" />
          <div className="container">
            <header className="section__header">
              <p className="section-label">05 / Proceso</p>
              <h2 className="section__h2" style={{ textTransform: 'none' }}>Del formulario al<br /><span className="accent">lanzamiento.</span></h2>
              <p className="section__sub">
                Sin burocracia, sin reuniones vacías. Cada contacto tiene un propósito claro
                y lo hacemos en persona siempre que podemos.
              </p>
            </header>

            {/* ── Timeline ── */}
            <div
              className={`proceso-timeline${activeStep !== null ? ' proceso-timeline--has-active' : ''}`}
              style={{ marginTop: '4rem' }}
              onMouseLeave={() => setActiveStep(null)}
            >
              {STEPS.map((step, i) => (
                <article
                  key={step.num}
                  className={`proceso-step${i === activeStep ? ' proceso-step--active' : ''}${step.highlight ? ' proceso-step--highlight' : ''}`}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                  onFocus={() => setActiveStep(i)}
                  tabIndex={0}
                  aria-expanded={i === activeStep}
                  aria-label={`Paso ${step.num}: ${step.title}`}
                >
                  <span className="proceso-step__dot" aria-hidden="true" />
                  <div className="proceso-step__inner">
                    <div className="proceso-step__header">
                      <span className="proceso-step__num">{step.num}</span>
                      <span className="proceso-step__time">{step.time}</span>
                    </div>
                    <h3 className="proceso-step__title">{step.title}</h3>
                    <p className="proceso-step__micro">{step.micro}</p>
                    <div className="proceso-step__body">
                      <div className="proceso-step__body-inner">
                        <p className="proceso-step__desc">{step.desc}</p>
                        <p className="proceso-step__detail">{step.detail}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ── Swipe carousel (mobile only) ── */}
            <div className="process-swipe" ref={swipeRef} style={{ marginTop: '4rem' }}>
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className={`process-card process-card--carousel is-visible${step.highlight ? ' process-card--highlight' : ''}`}
                >
                  <div className="process-card__header">
                    <span className="process-card__num">{step.num}</span>
                    <span className="process-card__time">{step.time}</span>
                  </div>
                  <h4 className="process-card__title">{step.title}</h4>
                  <p className="process-card__desc">{step.desc}</p>
                  <p className="process-card__detail">{step.detail}</p>
                </div>
              ))}
            </div>
            <div className="process-carousel__dots" style={{ marginTop: '1.25rem' }}>
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  className={`process-carousel__dot${i === swipeIndex ? ' process-carousel__dot--active' : ''}`}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Ir al paso ${i + 1}`}
                >{i + 1}</button>
              ))}
            </div>

            {/* ── Claims ── */}
            <div className="proceso-claims">
              {CLAIMS.map((claim, i) => (
                <div key={i} className="proceso-claims__item">
                  <span className="proceso-claims__mark" aria-hidden="true" />
                  <span>{claim}</span>
                </div>
              ))}
            </div>

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
          </div>
        </section>


        {/* ── Lo que necesitamos de ti ── */}
        <section className="section section--gradient-bg" id="requisitos">
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

            {/* Desktop ≥1200px: grid con hover reveal */}
            <div className="requisitos-grid">
              {REQUIREMENTS.map((req) => (
                <div key={req.num} className="requisito-item">
                  <span className="requisito-item__num">{req.num}</span>
                  <div className="requisito-item__content">
                    <h4 className="requisito-item__title">{req.title}</h4>
                    <p className="requisito-item__desc">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile <1200px: acordeón */}
            <div className="requisitos-accordion">
              {REQUIREMENTS.map((req, i) => (
                <div
                  key={req.num}
                  className={`requisito-acc__item${openReq === i ? ' requisito-acc__item--open' : ''}`}
                >
                  <button
                    className="requisito-acc__trigger"
                    onClick={() => setOpenReq(openReq === i ? null : i)}
                    aria-expanded={openReq === i}
                  >
                    <span className="requisito-acc__num">{req.num}</span>
                    <span className="requisito-acc__title">{req.title}</span>
                    <span className="requisito-acc__icon" aria-hidden="true">+</span>
                  </button>
                  <div className="requisito-acc__body">
                    <div className="requisito-acc__body-inner">
                      <p className="requisito-acc__desc">{req.desc}</p>
                    </div>
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