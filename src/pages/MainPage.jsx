import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { ServiciosSection } from './Servicios.jsx'
import { PortfolioSection } from './Portfolio.jsx'
import { NosotrosSection } from './Nosotros.jsx'
import { ProcesoSection } from './Proceso.jsx'
import { FaqSection } from './Faq.jsx'
import { ContactoSection } from './Contacto.jsx'

// ─── FlipCard helper ─────────────────────────────────────────────────────────
function FlipCard({ children, className, ...props }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <AnimFade
      className={`${className || ''} ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      {...props}
    >
      {children}
    </AnimFade>
  )
}

// ─── AnimFade helper ─────────────────────────────────────────────────────────
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

// ─── Tech badges ─────────────────────────────────────────────────────────────
// Iconos de Simple Icons servidos en local (public/icons/tech/<slug>.svg, con el color de marca ya aplicado)
const TECH_ROW_1 = [
  { label: 'HTML5',        slug: 'html5' },
  { label: 'CSS3',         slug: 'css' },
  { label: 'JavaScript',   slug: 'javascript' },
  { label: 'TypeScript',   slug: 'typescript' },
  { label: 'React',        slug: 'react' },
  { label: 'React Router', slug: 'reactrouter' },
  { label: 'Next.js',      slug: 'nextdotjs' },
  { label: 'Vite',         slug: 'vite' },
  { label: 'Astro',        slug: 'astro' },
  { label: 'Tailwind CSS', slug: 'tailwindcss' },
  { label: 'Framer',       slug: 'framer' },
  { label: 'Figma',        slug: 'figma' },
]

const TECH_ROW_2 = [
  { label: 'Node.js',  slug: 'nodedotjs' },
  { label: 'Express',  slug: 'express' },
  { label: 'MongoDB',  slug: 'mongodb' },
  { label: 'Stripe',   slug: 'stripe' },
  { label: 'Zod',      slug: 'zod' },
  { label: 'Git',      slug: 'git' },
  { label: 'GitHub',   slug: 'github' },
  { label: 'ESLint',   slug: 'eslint' },
  { label: 'PostCSS',  slug: 'postcss' },
  { label: 'Nodemon',  slug: 'nodemon' },
  { label: 'Lucide',   slug: 'lucide' },
]

// ─────────────────────────────────────────────────────────────────────────────
export default function MainPage() {
  return (
    <>
      {/* Título y descripción deben coincidir con los de index.html */}
      <Helmet>
        <title>Diseño y desarrollo web y app | Katan Studio</title>
        <meta name="description" content="Estudio de desarrollo web en Toledo. Webs y aplicaciones a medida." />
        <link rel="canonical" href="https://katan.es/" />
      </Helmet>

      <Header />

      <main>
        {/* ── INICIO ── */}
        <section className="hero" id="inicio">
          <div className="hero__visual">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
            <div className="glow-orb orb-3"></div>
          </div>

          <div className="hero__content">
            <img
              src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoNegroCompleto.svg"
              className="hero__watermark"
              alt=""
              aria-hidden="true"
            />
            <h1 className="hero__h1 hero__h1--desktop" style={{ textTransform: 'none' }}>
              Creamos la web que tu negocio
              <br />
              <span className="hero__h1-accent">necesita para crecer.</span>
            </h1>
            <h1 className="hero__h1 hero__h1--mobile" style={{ textTransform: 'none' }}>
              Creamos la web<br />
              que tu negocio<br />
              <span className="hero__h1-accent">necesita para</span><br />
              <span className="hero__h1-accent">crecer.</span>
            </h1>
            <div className="hero__actions">
              <a href="#servicios" className="btn btn--primary btn--chamfer">Nuestros servicios</a>
              <a href="#contacto" className="btn btn--ghost">Presupuesto rápido</a>
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

        {/* ── TECH STACK ── */}
        <section className="tech-stack">
          <div className="container">
            <p className="kicker" style={{ textAlign: 'center', marginBottom: '2rem' }}>/Tecnologías de última generación</p>
            <div className="tech-marquee">
              <div className="tech-marquee__track">
                {[...TECH_ROW_1, ...TECH_ROW_1].map((badge, i) => (
                  <span key={i} className="tech-badge">
                    <img
                      src={`/icons/tech/${badge.slug}.svg`}
                      alt=""
                      className="tech-badge__icon"
                      width="18"
                      height="18"
                      aria-hidden="true"
                    />
                    <span className="tech-badge__label">{badge.label}</span>
                  </span>
                ))}
              </div>
              <div className="tech-marquee__track tech-marquee__track--reverse">
                {[...TECH_ROW_2, ...TECH_ROW_2].map((badge, i) => (
                  <span key={i} className="tech-badge">
                    <img
                      src={`/icons/tech/${badge.slug}.svg`}
                      alt=""
                      className="tech-badge__icon"
                      width="18"
                      height="18"
                      aria-hidden="true"
                    />
                    <span className="tech-badge__label">{badge.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FILOSOFÍA ── */}
        <section className="section" id="filosofia">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/El Estándar Katan</p>
              <h2 className="section__h2">Construimos sistemas,<br /><span className="accent">no folletos.</span></h2>
              <p className="section__sub">La mayoría de agencias de marketing utilizan plantillas pesadas disfrazadas de diseño a medida.
                Nosotros damos forma a tu proyecto para dominar tu sector.</p>
            </header>

            <div className="modules-grid">
              <FlipCard className="module-flip">
                <div className="module__inner">
                  <div className="module__front">
                    <span className="module__flip-hint">↻</span>
                    <span className="module__price">01</span>
                    <h3 className="module__title">Velocidad extrema.</h3>
                  </div>
                  <div className="module__back">
                    <span className="module__flip-hint">↺</span>
                    <span className="module__price">01</span>
                    <h3 className="module__title">Velocidad extrema.</h3>
                    <p className="module__desc">
                      ¿A quién le gusta esperar? <br /> El tiempo de tus clientes vale dinero.
                      Si tu web tarda en abrir, se van a la competencia.
                      Hacemos que no se te escape ni una sola oportunidad de venta.
                    </p>
                  </div>
                </div>
              </FlipCard>

              <FlipCard className="module-flip module-flip--cyan">
                <div className="module__inner">
                  <div className="module__front">
                    <span className="module__flip-hint">↻</span>
                    <span className="module__price">02</span>
                    <h3 className="module__title">Código propio.</h3>
                  </div>
                  <div className="module__back">
                    <span className="module__flip-hint">↺</span>
                    <span className="module__price">02</span>
                    <h3 className="module__title">Código propio.</h3>
                    <p className="module__desc">
                      El código que construimos es 100% tuyo desde el primer día. Sin parches externos que se rompen o te dejan la web abierta a hackers y sin renovaciones de licencias sorpresa.
                    </p>
                  </div>
                </div>
              </FlipCard>

              <FlipCard className="module-flip">
                <div className="module__inner">
                  <div className="module__front">
                    <span className="module__flip-hint">↻</span>
                    <span className="module__price">03</span>
                    <h3 className="module__title">Cero burocracia.</h3>
                  </div>
                  <div className="module__back">
                    <span className="module__flip-hint">↺</span>
                    <span className="module__price">03</span>
                    <h3 className="module__title">Cero burocracia.</h3>
                    <p className="module__desc">
                      No delegamos los proyectos a terceros ni te hacemos perder el tiempo. Presupuesto cerrado en 48h. Hablas directamente con los encargados de tu proyecto.
                    </p>
                  </div>
                </div>
              </FlipCard>
            </div>

            <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <a href="#nosotros" className="btn btn--ghost">Conoce la anti-agencia →</a>
            </div>
          </div>
        </section>

        {/* ── SERVICIOS ── */}
        <ServiciosSection />

        {/* ── PORTFOLIO ── */}
        <PortfolioSection />

        {/* ── NOSOTROS ── */}
        <NosotrosSection />

        {/* ── PROCESO ── */}
        <ProcesoSection />

        {/* ── FAQ ── */}
        <FaqSection />

        {/* ── CONTACTO ── */}
        <ContactoSection />
      </main>

      <Footer />
    </>
  )
}
