import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const FAQ_CATEGORIES = [
  {
    id: 'tecnologia',
    label: '01 / Tecnología',
    title: 'Tecnología y desarrollo',
    items: [
      {
        num: '01',
        question: '¿Hacéis webs en WordPress o usáis plantillas?',
        answer: 'No. Escribimos la arquitectura digital desde cero usando tecnologías modernas (React, Astro, HTML/CSS puro). Esto nos permite garantizar velocidades de carga de milisegundos, seguridad total y una escalabilidad que WordPress no puede ofrecer sin llenarse de plugins.',
      },
      {
        num: '02',
        question: '¿Podré modificar textos o fotos yo mismo?',
        answer: 'Por supuesto. Si eliges un plan de Web Corporativa o E-Commerce, integramos un panel de administración limpio y adaptado solo con las opciones que necesitas tocar, sin configuraciones complejas que puedan romper la web.',
      },
      {
        num: '03',
        question: '¿Qué pasa si mi negocio crece y necesito más funciones?',
        answer: 'Al desarrollar con código propio y arquitectura escalable, tu sistema no tiene techo. Podemos añadir bases de datos, pasarelas de pago, intranets o aplicaciones complejas en el futuro sin tener que tirar tu web actual a la basura.',
      },
      {
        num: '04',
        question: '¿Mi web estará optimizada para salir en Google?',
        answer: 'Sí, desde la primera línea de código. A diferencia de otras agencias que te cobran el "SEO" como un extra mágico, nosotros incluimos SEO técnico nativo (semántica perfecta, etiquetas Schema, y Core Web Vitals en verde). Una web que carga en menos de 1.5s ya tiene una ventaja brutal frente a tu competencia en Google.',
      },
      {
        num: '05',
        question: '¿Qué pasarelas de pago incluís en los E-Commerce?',
        answer: 'Integramos la infraestructura financiera más robusta del mercado: Stripe (para cobros con tarjeta, Apple Pay y Google Pay con cero fricción) y PayPal. Si tu mercado principal es España, también te dejamos funcionando Redsys para pagos directos y Bizum.',
      },
    ],
  },
  {
    id: 'precios',
    label: '02 / Precios',
    title: 'Precios y contratos',
    items: [
      {
        num: '01',
        question: '¿El precio puede variar a mitad del proyecto?',
        answer: 'Nunca. En Katan trabajamos con presupuestos cerrados. Tras analizar tu formulario inicial (briefing), te enviamos una propuesta con el coste exacto y las fechas de entrega. Lo que firmas el Día 1 es lo que pagas al terminar.',
      },
      {
        num: '02',
        question: '¿Me obligáis a pagar un mantenimiento mensual?',
        answer: 'No creemos en secuestrar clientes. Al no usar WordPress ni plugins de terceros, tu web no se va a romper por falta de actualizaciones. El código te pertenece al 100%. Te configuramos el hosting de alto rendimiento y, si decides que quieres que te llevemos el mantenimiento, será porque quieres, no porque estés obligado a ello.',
      },
      {
        num: '03',
        question: '¿Hay algún coste oculto después de la entrega?',
        answer: 'No. El único coste recurrente que tendrás es el hosting y el dominio, que son tuyos y los contratas directamente. Nosotros te ayudamos a configurarlos, pero la factura llega a tu nombre, no pasa por nosotros.',
      },
      {
        num: '04',
        question: '¿Cómo funciona el pago?',
        answer: 'Trabajamos con un pago dividido en dos partes: 50% al firmar el presupuesto y 50% en la entrega final. Sin sorpresas, sin pagos intermedios inesperados.',
      },
    ],
  },
  {
    id: 'proceso',
    label: '03 / Proceso',
    title: 'Proceso y plazos',
    items: [
      {
        num: '01',
        question: '¿Realmente podéis entregar un proyecto en 10 días?',
        answer: 'Sí, para Landing Pages y proyectos bien definidos. Nuestro proceso empieza con una llamada corta y un briefing detallado. Si tú tienes claro tu proyecto y los materiales listos, nosotros somos muy eficientes ejecutando. Sin tiempos muertos ni reuniones innecesarias.',
      },
      {
        num: '02',
        question: '¿Qué pasa si el diseño inicial no me gusta?',
        answer: 'No dejamos margen al azar. Nuestro proceso incluye una reunión de arranque donde te enseñamos una demo antes de escribir una sola línea de código definitiva. Dependiendo de tu plan, tienes entre 1 y 5 rondas de revisiones incluidas. No avanzamos al desarrollo hasta que la interfaz esté exactamente como tu negocio necesita.',
      },
      {
        num: '03',
        question: '¿Podré ver la web antes de que esté terminada?',
        answer: 'Sí, desde el principio del desarrollo tienes acceso a un enlace de preview privado donde puedes ver el avance en tiempo real. No esperas a la entrega final para saber cómo va quedando.',
      },
      {
        num: '04',
        question: '¿Hacéis reuniones presenciales?',
        answer: 'Sí. Si estás en Toledo, Madrid, Ciudad Real o zonas cercanas, preferimos quedar en persona. Creemos que hay decisiones que se toman mejor mirándose a los ojos. La primera toma de contacto es una llamada corta, pero la reunión de arranque del proyecto la hacemos presencialmente siempre que sea posible.',
      },
      {
        num: '05',
        question: '¿Qué necesito tener preparado para empezar?',
        answer: 'Principalmente: textos de tu negocio, imágenes o fotos (si las tienes), y claridad sobre qué quieres conseguir con la web. Si no tienes algo de esto, te orientamos. Cuanto más completo llegues al briefing, más rápido y preciso será el resultado.',
      },
    ],
  },
  {
    id: 'nosotros',
    label: '04 / Nosotros',
    title: 'Sobre Katan',
    items: [
      {
        num: '01',
        question: '¿Por qué sois diferentes a una agencia de marketing tradicional?',
        answer: 'Porque no somos una agencia, somos un estudio de ingeniería web. Con nosotros no pagas el sueldo de comerciales, ni de "Account Managers", ni oficinas céntricas. Hablas directamente con Adrián y Alejandro, los desarrolladores que van a construir tu activo digital. Pagas exclusivamente por calidad y rendimiento.',
      },
      {
        num: '02',
        question: '¿Con cuántos proyectos trabajáis a la vez?',
        answer: 'Trabajamos con un número limitado de proyectos simultáneos para garantizar la calidad y los plazos de entrega de cada cliente. No somos una factoría. Cuando aceptamos tu proyecto, es nuestra prioridad.',
      },
      {
        num: '03',
        question: '¿Dónde estáis ubicados?',
        answer: 'Somos de Toledo. Trabajamos con clientes de toda España de forma remota, pero hacemos reuniones presenciales en Toledo, Madrid, Ciudad Real y zonas cercanas. Si estás por aquí, te invitamos a un café.',
      },
      {
        num: '04',
        question: '¿Tenéis portfolio de proyectos anteriores?',
        answer: 'Sí. Puedes verlo en la sección Portfolio de la web. Si quieres ver algo específico o tienes preguntas sobre algún proyecto, escríbenos directamente.',
      },
    ],
  },
]

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' is-active' : ''}`}>
      <button className="faq-question" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="faq-num">{item.num}</span>
        <span className="faq-text">{item.question}</span>
        <span className="faq-icon"></span>
      </button>
      <div className="faq-answer">
        <p>{item.answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('tecnologia')

  const totalQuestions = FAQ_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <>
      <Helmet>
        <title>FAQ — Katan Studio</title>
        <meta name="description" content="Todas las respuestas sobre cómo trabajamos, precios, tecnología y proceso. Sin letra pequeña." />
      </Helmet>

      <Header />

      <main>

        {/* ── Hero ── */}
        <section className="faq-page-hero">
          <div className="faq__visual" aria-hidden="true">
            <div className="glow-orb orb-faq-1"></div>
            <div className="glow-orb orb-faq-2"></div>
            <div className="mesh-overlay"></div>
          </div>
          <div className="container faq-page-hero__inner">
            <div>
              <p className="section-label">/ FAQ</p>
              <h1 className="section__h2" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
                Todo lo que<br /><span className="accent">necesitas saber.</span>
              </h1>
              <p className="section__sub" style={{ marginTop: '1.25rem' }}>
                Sin letra pequeña, sin evasivas. Aquí están las respuestas a todo
                lo que suelen preguntarnos antes de arrancar un proyecto.
              </p>
            </div>
            <div className="faq-page-hero__meta">
              <div className="faq-hero-stat">
                <span className="faq-hero-stat__num">{totalQuestions}</span>
                <span className="faq-hero-stat__label">preguntas<br />respondidas</span>
              </div>
              <div className="faq-hero-stat">
                <span className="faq-hero-stat__num">{FAQ_CATEGORIES.length}</span>
                <span className="faq-hero-stat__label">categorías</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contenido principal ── */}
        <section className="faq-page-body">
          <div className="container faq-page-body__inner">

            {/* Sidebar de categorías */}
            <nav className="faq-page-nav" aria-label="Categorías FAQ">
              <p className="faq-page-nav__label">Categorías</p>
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`faq-page-nav__item${activeCategory === cat.id ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="faq-page-nav__cat-label">{cat.label}</span>
                  <span className="faq-page-nav__cat-title">{cat.title}</span>
                  <span className="faq-page-nav__count">{cat.items.length}</span>
                </button>
              ))}

              <div className="faq-page-nav__cta">
                <p>¿No encuentras tu respuesta?</p>
                <Link to="/contacto" className="btn btn--ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
                  Pregúntanos →
                </Link>
              </div>
            </nav>

            {/* Preguntas */}
            <div className="faq-page-content">
              {FAQ_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className={`faq-page-section${activeCategory === cat.id ? ' is-active' : ''}`}
                  aria-hidden={activeCategory !== cat.id}
                >
                  <header className="faq-page-section__header">
                    <p className="section-label" style={{ marginBottom: '0.5rem' }}>{cat.label}</p>
                    <h2 className="faq-page-section__title">{cat.title}</h2>
                  </header>
                  <div className="faq-accordion">
                    {cat.items.map((item) => (
                      <FaqItem key={item.num} item={item} />
                    ))}
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
              <p className="kicker kicker--center">// ¿Todo claro?</p>
              <h2 className="cta-section__h2" style={{ textTransform: 'none' }}>Empecemos con una llamada.</h2>
              <p className="cta-section__sub">
                15 minutos para contarnos tu proyecto. Sin presentaciones largas,
                sin compromiso. Solo claridad.
              </p>
              <div className="cta-actions">
                <Link to="/contacto" className="btn btn--primary btn--large btn--chamfer">Contactar ahora →</Link>
                <div className="cta-email-box">
                  <span className="cta-email-label">O escríbenos a:</span>
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
