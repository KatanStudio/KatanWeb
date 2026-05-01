import { useState, useCallback, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const PROJECTS = [
  {
    href: 'https://viananails.com/',
    category: 'ecommerce',
    img: '../../public/img/VianaNails.png',
    alt: 'Proyecto VianaNails',
    tag: 'E-Commerce',
    title: 'Viana Nails',
    problem: 'Academia de manicura que necesitaba gestionar cursos online y presenciales, con pagos integrados, usuarios y acceso a contenidos.',
    solution: 'Migración de E-commerce completo a una solucón más rapida y eficiente tras las numerosas quejas de clientes por los fallos y la lentitud.',
    technologies: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Figma'],
    external: true,
  },
  {
    href: 'https://xyloshome.com',
    category: 'landing',
    img: '/img/XylosHome.png',
    alt: 'Proyecto XylosHome',
    tag: 'Landing Page',
    title: 'Xylos Home',
    problem: 'Fabricantes de casas modulares sin presencia digital: necesitaban explicar su modelo de negocio, darse a conocer y convertir visitas en clientes.',
    solution: 'Landing page de alto impacto visual, clara para cualquier perfil de usuario y orientada a la conversión de potenciales clientes. Identidad visual completa creada por Katan.',
    technologies: ['React', 'Vite', 'Figma'],
    external: true,
  },
  {
    href: '#',
    category: 'corporate',
    img: '../../public/img/Katan.png',
    alt: 'Proyecto Katan',
    tag: 'Web Corporativa',
    title: 'Katan',
    metric: 'Pasarela Custom | 0% Fricción',
    external: false,
  },
  {
    href: '#',
    category: 'corporate',
    img: 'https://via.placeholder.com/800x600/14141A/F0F4F8?text=Mockup+Jenny+Records',
    alt: 'Proyecto Jenny Records',
    tag: 'Web Corporativa',
    title: 'Jenny Records',
    problem: 'Estudio de música sin presencia digital ni carta de presentación.',
    solution: 'Web corporativa con galería multimedia y sección "conócenos", desarrollada con la identidad corporativa y textos predefinidos del cliente.',
    technologies: ['React', 'TypeScript', 'Vite'],
    external: false,
  },
  {
    href: '#',
    category: 'landing',
    img: 'https://via.placeholder.com/800x600/14141A/F0F4F8?text=Mockup+Proyecto+5',
    alt: 'Proyecto 5',
    tag: 'Landing Page',
    title: 'Portfolio Diseñadora',
    metric: 'Maquetación Web',
    external: true,
  },
]

const FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'landing', label: 'Landing Pages' },
  { value: 'corporate', label: 'Corporativas' },
  { value: 'ecommerce', label: 'E-Commerce' },
]

const PER_PAGE = 2

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const swipeRef = useRef(null)

  const visible = PROJECTS.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  )

  const totalPages = Math.ceil(visible.length / PER_PAGE)
  const currentItems = visible.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  const handleFilter = useCallback((value) => {
    setActiveFilter(value)
    setPage(0)
    setMobileIndex(0)
    if (swipeRef.current) swipeRef.current.scrollTo({ left: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const el = swipeRef.current
    if (!el) return
    const handleScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth)
      setMobileIndex(Math.max(0, Math.min(i, visible.length - 1)))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [visible.length])

  const scrollToCard = (i) => {
    if (swipeRef.current) swipeRef.current.scrollTo({ left: swipeRef.current.clientWidth * i, behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>Portfolio — Katan Studio</title>
        <meta name="description" content="Katan Studio — Trabajos reales. Negocios que facturan gracias a arquitectura limpia y rápida." />
      </Helmet>

      <Header />

      <main>
        <section className="section section--orbs" id="portfolio">
          <div className="glow-orb orb-page-1" aria-hidden="true" />
          <div className="glow-orb orb-page-2" aria-hidden="true" />
          <div className="container">
            <header className="section__header" style={{ textAlign: 'center' }}>
              <p className="section-label" style={{ justifyContent: 'center' }}>
                <span style={{ flex: 0, marginRight: '1rem' }}>/Portfolio</span>
              </p>
              <h2 className="section__h2" style={{ textTransform: 'none' }}>Nuestros <span className="accent"> clientes.</span></h2>
              <p className="section__sub" style={{ margin: '1rem auto 0' }}>
                Ayudamos a negocios a facturar gracias a nuestra arquitectura
                limpia y rápida.
              </p>
            </header>

            <div className="portfolio-filters">
              {FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  className={`filter-btn${activeFilter === value ? ' is-active' : ''}`}
                  data-filter={value}
                  onClick={() => handleFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Desktop: paginación con flechas ── */}
            <div className="portfolio-carousel">
              <button
                className="portfolio-carousel__arrow"
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Página anterior"
              >&#8592;</button>
              <div className="portfolio-grid">
                {currentItems.map((project) => (
                  <a
                    key={project.title}
                    href={project.href}
                    className="portfolio-card"
                    data-category={project.category}
                    target={project.external ? '_blank' : undefined}
                    rel={project.external ? 'noreferrer' : undefined}
                  >
                    <div className="portfolio-card__img-wrap">
                      <img src={project.img} alt={project.alt} className="portfolio-card__img" />
                      <div className="portfolio-card__overlay">
                        <span className="btn btn--primary btn--chamfer">Ver proyecto</span>
                      </div>
                    </div>
                    <div className="portfolio-card__info">
                      <span className="portfolio-card__tag">{project.tag}</span>
                      <h3 className="portfolio-card__title" style={{ textTransform: 'none' }}>{project.title}</h3>
                      {project.problem ? (
                        <>
                          <div className="portfolio-card__desc-block">
                            <span className="portfolio-card__desc-label">Problema</span>
                            <p className="portfolio-card__desc-text">{project.problem}</p>
                          </div>
                          <div className="portfolio-card__desc-block">
                            <span className="portfolio-card__desc-label">Solución</span>
                            <p className="portfolio-card__desc-text">{project.solution}</p>
                          </div>
                          {project.technologies && (
                            <div className="portfolio-card__techs">
                              {project.technologies.map(tech => (
                                <span key={tech} className="portfolio-card__tech-chip">{tech}</span>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="portfolio-card__metric">{project.metric}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
              <button
                className="portfolio-carousel__arrow"
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                aria-label="Página siguiente"
              >&#8594;</button>
            </div>
            {totalPages > 1 && (
              <div className="portfolio-carousel__dots">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`portfolio-carousel__dot${i === page ? ' portfolio-carousel__dot--active' : ''}`}
                    onClick={() => setPage(i)}
                    aria-label={`Ir a página ${i + 1}`}
                  >{i + 1}</button>
                ))}
              </div>
            )}

            {/* ── Mobile: swipe con dedo ── */}
            <div className="portfolio-swipe-wrapper">
              <button
                className="portfolio-swipe__arrow portfolio-swipe__arrow--prev"
                onClick={() => scrollToCard(Math.max(0, mobileIndex - 1))}
                disabled={mobileIndex === 0}
                aria-label="Proyecto anterior"
              >&#8592;</button>
            <div className="portfolio-swipe" ref={swipeRef}>
              {visible.map((project) => (
                <div key={project.title} className="portfolio-swipe__item">
                  <a
                    href={project.href}
                    className="portfolio-card"
                    data-category={project.category}
                    target={project.external ? '_blank' : undefined}
                    rel={project.external ? 'noreferrer' : undefined}
                  >
                    <div className="portfolio-card__img-wrap">
                      <img src={project.img} alt={project.alt} className="portfolio-card__img" />
                      <div className="portfolio-card__overlay">
                        <span className="btn btn--primary btn--chamfer">Ver proyecto</span>
                      </div>
                    </div>
                    <div className="portfolio-card__info">
                      <span className="portfolio-card__tag">{project.tag}</span>
                      <h3 className="portfolio-card__title" style={{ textTransform: 'none' }}>{project.title}</h3>
                      {project.problem ? (
                        <>
                          <div className="portfolio-card__desc-block">
                            <span className="portfolio-card__desc-label">Problema</span>
                            <p className="portfolio-card__desc-text">{project.problem}</p>
                          </div>
                          <div className="portfolio-card__desc-block">
                            <span className="portfolio-card__desc-label">Solución</span>
                            <p className="portfolio-card__desc-text">{project.solution}</p>
                          </div>
                          {project.technologies && (
                            <div className="portfolio-card__techs">
                              {project.technologies.map(tech => (
                                <span key={tech} className="portfolio-card__tech-chip">{tech}</span>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="portfolio-card__metric">{project.metric}</p>
                      )}
                    </div>
                  </a>
                </div>
              ))}
            </div>
              <button
                className="portfolio-swipe__arrow portfolio-swipe__arrow--next"
                onClick={() => scrollToCard(Math.min(visible.length - 1, mobileIndex + 1))}
                disabled={mobileIndex >= visible.length - 1}
                aria-label="Proyecto siguiente"
              >&#8594;</button>
            </div>
            <div className="portfolio-swipe__dots">
              {visible.map((_, i) => (
                <button
                  key={i}
                  className={`portfolio-carousel__dot${i === mobileIndex ? ' portfolio-carousel__dot--active' : ''}`}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Ir al proyecto ${i + 1}`}
                >{i + 1}</button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
