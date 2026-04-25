import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const PROJECTS = [
  {
    href: 'https://xyloshome.com',
    category: 'landing',
    img: '/img/XylosHome.png',
    alt: 'Proyecto 1',
    tag: 'Landing Page',
    title: 'Xylos Home',
    metric: 'Identidad corporativa, copywritting y maquetación de la web',
    external: true,
  },
  {
    href: '#',
    category: 'corporate',
    img: 'https://via.placeholder.com/800x600/14141A/F0F4F8?text=Mockup+Proyecto+2',
    alt: 'Proyecto 2',
    tag: 'Web Corporativa',
    title: 'Estudio Arquitectura',
    metric: 'SEO Técnico | Arquitectura CMS',
    external: false,
  },
  {
    href: '#',
    category: 'ecommerce',
    img: 'https://via.placeholder.com/800x600/14141A/F0F4F8?text=Mockup+Proyecto+3',
    alt: 'Proyecto 3',
    tag: 'E-Commerce',
    title: 'Nova Tech Store',
    metric: 'Pasarela Custom | 0% Fricción',
    external: false,
  },
  {
    href: '#',
    category: 'landing',
    img: 'https://via.placeholder.com/800x600/14141A/F0F4F8?text=Mockup+Proyecto+4',
    alt: 'Proyecto 4',
    tag: 'Landing Page',
    title: 'Clínica Dental Madrid',
    metric: 'Sistema de Reservas Integrado',
    external: false,
  },
]

const FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'landing', label: 'Landing Pages' },
  { value: 'corporate', label: 'Corporativas' },
  { value: 'ecommerce', label: 'E-Commerce' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visible = PROJECTS.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  )

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
                  onClick={() => setActiveFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="portfolio-grid">
              {visible.map((project) => (
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
                    <p className="portfolio-card__metric">{project.metric}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
