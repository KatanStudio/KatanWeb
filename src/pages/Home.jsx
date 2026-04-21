import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const FAQ_ITEMS = [
  {
    num: '01',
    question: '¿Hacéis webs en WordPress o usáis plantillas?',
    answer: 'No. Escribimos la arquitectura digital desde cero usando tecnologías modernas (React, Astro, HTML/CSS puro). Esto nos permite garantizar velocidades de carga de milisegundos, seguridad total y una escalabilidad que WordPress no puede ofrecer sin llenarse de plugins.',
  },
  {
    num: '02',
    question: '¿El precio puede variar a mitad del proyecto?',
    answer: 'Nunca. En Katan trabajamos con presupuestos cerrados. Tras analizar tu formulario inicial (briefing), te enviamos una propuesta con el coste exacto y las fechas de entrega. Lo que firmas el Día 1 es lo que pagas al terminar.',
  },
  {
    num: '03',
    question: '¿Podré modificar textos o fotos yo mismo?',
    answer: 'Por supuesto. Si eliges un plan de Web Corporativa o E-Commerce, integramos un panel de administración limpio y adaptado solo con las opciones que necesitas tocar, sin configuraciones complejas que puedan romper la web.',
  },
  {
    num: '04',
    question: '¿Qué pasa si mi negocio crece y necesito más funciones?',
    answer: 'Al desarrollar con código propio y arquitectura escalable, tu sistema no tiene techo. Podemos añadir bases de datos, pasarelas de pago, intranets o aplicaciones complejas en el futuro sin tener que tirar tu web actual a la basura.',
  },
  {
    num: '05',
    question: '¿Mi web estará optimizada para salir en Google?',
    answer: 'Sí, desde la primera línea de código. A diferencia de otras agencias que te cobran el "SEO" como un extra mágico, nosotros incluimos SEO técnico nativo (semántica perfecta, etiquetas Schema, y Core Web Vitals en verde). Una web que carga en menos de 1.5s ya tiene una ventaja brutal frente a tu competencia en Google.',
  },
  {
    num: '06',
    question: '¿Me obligáis a pagar un mantenimiento mensual?',
    answer: 'No creemos en secuestrar clientes. Al no usar WordPress ni plugins de terceros, tu web no se va a romper por falta de actualizaciones. El código te pertenece al 100%. Te configuramos el hosting de alto rendimiento y, si decides que quieres que te llevemos el mantenimiento, será porque quieres, no porque estés obligado a ello.',
  },
  {
    num: '07',
    question: '¿Qué pasa si el diseño inicial no me gusta?',
    answer: 'No dejamos margen al azar. Nuestro proceso incluye la fase de "Propuesta Visual" antes de escribir una sola línea de código. Dependiendo de tu plan, tienes entre 1 y 5 rondas de revisiones incluidas. No avanzamos al desarrollo hasta que la interfaz esté exactamente como tu negocio necesita.',
  },
  {
    num: '08',
    question: '¿Qué pasarelas de pago incluís en los E-Commerce?',
    answer: 'Integramos la infraestructura financiera más robusta del mercado: Stripe (para cobros con tarjeta, Apple Pay y Google Pay con cero fricción) y PayPal. Si tu mercado principal es España, también te dejamos funcionando Redsys para pagos directos y Bizum.',
  },
  {
    num: '09',
    question: '¿Realmente podéis entregar un proyecto en menos de 15 días?',
    answer: 'Sí, para Landing Pages y proyectos bien definidos. Nuestro secreto es el "Briefing" inicial. Al eliminar las típicas reuniones de "toma de contacto" y correos infinitos, si tú tienes claro tu producto y los textos listos, nosotros somos letales ejecutando el código. Sin tiempos muertos.',
  },
  {
    num: '10',
    question: '¿Por qué sois diferentes a una agencia de marketing tradicional?',
    answer: 'Porque no somos una agencia, somos un estudio de ingeniería web. Con nosotros no pagas el sueldo de comerciales, ni de "Account Managers", ni oficinas céntricas. Hablas directamente con Adrián y Alejandro, los desarrolladores que van a construir tu activo digital. Pagas exclusivamente por calidad y rendimiento.',
  },
]

function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i)

  return (
    <div className="faq-accordion">
      {FAQ_ITEMS.map((item, i) => (
        <div key={item.num} className={`faq-item${activeIndex === i ? ' is-active' : ''}`}>
          <button
            className="faq-question"
            aria-expanded={activeIndex === i}
            onClick={() => toggle(i)}
          >
            <span className="faq-num">{item.num}</span>
            <span className="faq-text">{item.question}</span>
            <span className="faq-icon"></span>
          </button>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function AnimFade({ children, className, ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`${className || ''} anim-fade${visible ? ' is-visible' : ''}`} {...props}>
      {children}
    </div>
  )
}

const TECH_BADGES = ['HTML5', 'CSS3 Custom', 'JavaScript (ES6+)', 'React', 'Astro', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Figma', 'Git']

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Katan — Sharp by Design</title>
        <meta name="description" content="Katan Studio — Webs que cortan. Código propio, precio cerrado, entrega en 10 días." />
      </Helmet>

      <Header />

      <main>
        <section className="hero" id="inicio">
          <div className="hero__visual">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
            <div className="glow-orb orb-3"></div>
            <div className="mesh-overlay"></div>
          </div>

          <div className="hero__content">
            <h1 className="hero__h1" style={{ textTransform: 'none' }}>
              Ingeniería web de<br /><span className="hero__h1-accent">alta precisión.</span>
            </h1>
            <p className="hero__sub">
              Tu web no es un folleto, es el escaparate más importante de tu negocio. <br /> Creamos páginas confiables para convertir usuarios en clientes.
            </p>
            <div className="hero__actions">
              <Link to="/servicios" className="btn btn--primary btn--chamfer">Nuestros servicios</Link>
              <Link to="/contacto" className="btn btn--ghost">Presupuesto rápido</Link>
            </div>
          </div>

          <div className="hero__stats">
            <div className="stat">
              <span className="stat__num">&lt;1.5s</span>
              <span className="stat__label">Carga Garantizada</span>
            </div>
            <div className="stat">
              <span className="stat__num">0</span>
              <span className="stat__label">Plantillas usadas</span>
            </div>
            <div className="stat">
              <span className="stat__num">100%</span>
              <span className="stat__label">Proyectos a tiempo</span>
            </div>
            <div className="stat">
              <span className="stat__num">365d</span>
              <span className="stat__label">Soporte y mantenimiento</span>
            </div>
          </div>
        </section>

        <section className="tech-stack">
          <div className="container">
            <p className="kicker" style={{ textAlign: 'center', marginBottom: '2rem' }}>/Tecnologías de última generación</p>
            <div className="tech-marquee">
              <div className="tech-marquee__track">
                {[...TECH_BADGES, ...TECH_BADGES].map((badge, i) => (
                  <span key={i} className="tech-badge">{badge}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="filosofia">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/El Estándar Katan</p>
              <h2 className="section__h2">Construimos sistemas,<br /><span className="accent">no folletos.</span></h2>
              <p className="section__sub">La mayoría de agencias te venden plantillas pesadas disfrazadas de diseño a medida.
                Nosotros escribimos arquitectura digital diseñada para dominar tu sector.</p>
            </header>

            <div className="modules-grid">
              <AnimFade className="module">
                <span className="module__price">01</span>
                <h3 className="module__title" style={{ margin: '0.5rem 0' }}>Velocidad letal</h3>
                <p className="module__desc">

                  ¿A quién le gusta esperar? <br /> El tiempo de tus clientes vale dinero. 
                  Si tu web tarda en abrir, se van a la competencia. 
                  Hacemos que no se te escape ni una sola oportunidad de venta.
                </p>
              </AnimFade>

              <AnimFade className="module module--recurring">
                <span className="module__price">02</span>
                <h3 className="module__title" style={{ margin: '0.5rem 0' }}>Código propio</h3>
                <p className="module__desc">
                  Sin constructores visuales limitantes, sin decenas de plugins vulnerables y sin renovaciones de licencias
                  sorpresa. El código que construimos es 100% tuyo desde el primer día.
                </p>
              </AnimFade>

              <AnimFade className="module">
                <span className="module__price">03</span>
                <h3 className="module__title" style={{ margin: '0.5rem 0' }}>Cero burocracia</h3>
                <p className="module__desc">
                  No tenemos "Account Managers" ni te hacemos perder el tiempo. Presupuesto cerrado en 48h. Hablas
                  directamente con los encargados de tu proyecto.
                </p>
              </AnimFade>
            </div>

            <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/nosotros" className="btn btn--ghost">Conoce la anti-agencia →</Link>
            </div>
          </div>
        </section>

        <section className="cta-section" id="contacto">
          <div className="cta-section__glow" aria-hidden="true"></div>
          <div className="container cta-section__container">
            <div className="cta-section__box">
              <p className="kicker kicker--center">// Contáctanos</p>
              <h2 className="cta-section__h2" style={{ textTransform: 'none' }}>¿Empezamos?</h2>
              <p className="cta-section__sub">
                Presupuesto cerrado en 48h. Sin letra pequeña. Sin reuniones eternas. Hablas directamente con los
                desarrolladores, nosotros picamos el código.
              </p>
              <div className="cta-actions">
                <Link to="/contacto" className="btn btn--primary btn--large btn--chamfer">Iniciar proyecto →</Link>
                <div className="cta-email-box">
                  <span className="cta-email-label">O envíanos un correo a:</span>
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
