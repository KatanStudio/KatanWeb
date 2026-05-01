import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'



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

const TECH_BADGES = [
  { label: 'HTML5',        slug: 'html5' },
  { label: 'CSS3',         slug: 'css' },
  { label: 'JavaScript',   slug: 'javascript' },
  { label: 'TypeScript',   slug: 'typescript' },
  { label: 'React',        slug: 'react' },
  { label: 'Vite',         slug: 'vite' },
  { label: 'Astro',        slug: 'astro' },
  { label: 'Tailwind CSS', slug: 'tailwindcss' },
  { label: 'Node.js',      slug: 'nodedotjs' },
  { label: 'PostgreSQL',   slug: 'postgresql' },
  { label: 'Figma',        slug: 'figma' },
  { label: 'Git',          slug: 'git' },
]

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
              Creamos la web que tu negocio<br /><span className="hero__h1-accent">necesita para crecer.</span>
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
                  <span key={i} className="tech-badge">
                    <img
                      src={`https://cdn.simpleicons.org/${badge.slug}/ffffff`}
                      alt=""
                      className="tech-badge__icon"
                      width="18"
                      height="18"
                      loading="lazy"
                      aria-hidden="true"
                    />
                    <span className="tech-badge__label">{badge.label}</span>
                  </span>
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
              <p className="section__sub">La mayoría de agencias de markeitng te venden plantillas pesadas disfrazadas de diseño a medida.
                Nosotros damos forma a tu proyecto para dominar tu sector.</p>
            </header>

            <div className="modules-grid">
              <AnimFade className="module">
                <span className="module__price">01</span>
                <h3 className="module__title" style={{ margin: '0.5rem 0' }}>Velocidad extrema.</h3>
                <p className="module__desc">

                  ¿A quién le gusta esperar? <br /> El tiempo de tus clientes vale dinero. 
                  Si tu web tarda en abrir, se van a la competencia. 
                  Hacemos que no se te escape ni una sola oportunidad de venta.
                </p>
              </AnimFade>

              <AnimFade className="module module--recurring">
                <span className="module__price">02</span>
                <h3 className="module__title" style={{ margin: '0.5rem 0' }}>Código propio.</h3>
                <p className="module__desc">
                  El código que construimos es 100% tuyo desde el primer día. Sin parches externos que se rompen o te dejan la web abierta a hackers y sin renovaciones de licencias
                  sorpresa. 
                </p>
              </AnimFade>

              <AnimFade className="module">
                <span className="module__price">03</span>
                <h3 className="module__title" style={{ margin: '0.5rem 0' }}>Cero burocracia.</h3>
                <p className="module__desc">
                  No delegamos los proyectos a terceros ni te hacemos perder el tiempo. Presupuesto cerrado en 48h. Hablas
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
              <h2 className="cta-section__h2" style={{ textTransform: 'none' }}>Empecemos con una llamada.</h2>
              <p className="cta-section__sub">
                Presupuesto cerrado en 48h. Sin letra pequeña. Sin reuniones eternas. Hablas directamente con los
                desarrolladores, nosotros escribimos el código.
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
