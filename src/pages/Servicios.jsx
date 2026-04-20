import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Servicios() {
  return (
    <>
      <Helmet>
        <title>Servicios — Katan Studio</title>
        <meta name="description" content="Katan Studio — Landing Pages, Webs Corporativas y E-Commerce a medida. Código propio, precio cerrado." />
      </Helmet>

      <Header />

      <main>
        <section className="section" id="servicios-intro" style={{ paddingTop: '8rem' }}>
          <div className="container">
            <div className="services-intro-grid">
              <div className="services-intro__content">
                <p className="section-label">00 / Arquitectura</p>
                <h2 className="section__h2" style={{ marginBottom: '1.5rem' }}>
                  El sistema exacto<br /><span className="accent">para tu negocio.</span>
                </h2>

                <p className="services-intro__p">
                  No matamos moscas a cañonazos ni construimos rascacielos sobre arena. En Katan no
                  hacemos sobreventa; evaluamos tu modelo de negocio actual y desarrollamos la infraestructura
                  digital <strong>estrictamente necesaria para que escales</strong>.
                </p>

                <ul className="services-intro__list">
                  <li>
                    <strong>Vendes un servicio único o captas posibles clientes:</strong>
                    Tu sistema es la <span style={{ color: 'var(--blade)', fontWeight: 600 }}>Landing Page</span>. Una única página diseñada matemáticamente para la conversión pura. Cero distracciones, un solo objetivo.
                  </li>
                  <li>
                    <strong>Buscas imagen profesional y aparecer en las búsquedas:</strong>
                    Tu sistema es la <span style={{ color: 'var(--blade)', fontWeight: 600 }}>Web Corporativa</span>, tu oficina en internet. Varias secciones para detallar todo lo que haces, transmitir confianza y conseguir que Google te recomiende en tu sector.
                  </li>
                  <li>
                    <strong>Quieres generar mientras duermes:</strong>
                    Tu sistema es el <span style={{ color: 'var(--blade)', fontWeight: 600 }}>E-Commerce &amp; App</span>. Una máquina de ventas robusta, con pasarelas de pago integradas con cobros seguros y control total de lo que tienes en el almacén.
                  </li>
                </ul>

                <p className="services-intro__p">
                  Sea cual sea tu escenario, el motor base siempre es el mismo: <strong>código limpio,
                    seguridad blindada y cargas inferiores a 1.5 segundos</strong>.
                </p>
              </div>

              <div className="services-intro__visual">
                <div className="katan-abstract-art">
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="abstract-svg">
                    <circle cx="100" cy="100" r="80" stroke="var(--ghost)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="60" stroke="var(--steel)" strokeWidth="0.5" opacity="0.3" />
                    <path d="M 60 100 L 140 100" stroke="var(--edge)" strokeWidth="1.5" className="svg-pulse" />
                    <path d="M 100 60 L 100 140" stroke="var(--spark)" strokeWidth="1.5" className="svg-pulse-delay" />
                    <path d="M 100 75 L 122 112 H 78 Z" stroke="var(--edge)" strokeWidth="1.5" fill="var(--sheath)" strokeLinejoin="round" />
                    <circle cx="100" cy="100" r="3" fill="var(--spark)" />
                  </svg>
                  <div className="visual-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--dark" id="servicios">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Servicios</p>
              <h2 className="section__h2" style={{ textTransform: 'none' }}>Lo que construimos</h2>
            </header>

            <div className="services-grid">
              <article className="service-card" data-index="01">
                <div className="service-wireframe">
                  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="15" y="10" width="70" height="100" rx="3" stroke="var(--steel)" strokeWidth="1" fill="var(--sheath)" />
                    <rect x="20" y="16" width="15" height="3" rx="1.5" fill="var(--ghost)" />
                    <rect x="70" y="15" width="10" height="5" rx="2" fill="var(--edge)" />
                    <rect x="20" y="25" width="60" height="25" rx="2" fill="var(--ghost)" />
                    <rect x="20" y="55" width="16" height="16" rx="2" fill="var(--ghost)" />
                    <rect x="42" y="55" width="16" height="16" rx="2" fill="var(--ghost)" />
                    <rect x="64" y="55" width="16" height="16" rx="2" fill="var(--ghost)" />
                    <rect x="20" y="78" width="60" height="6" rx="2" fill="var(--ghost)" />
                    <rect x="20" y="98" width="25" height="5" rx="2" fill="var(--edge)" />
                  </svg>
                </div>
                <div className="service-card__top">
                  <span className="service-card__num">01</span>
                  <span className="service-card__tag">/ Landing Page</span>
                </div>
                <h3 className="service-card__title">Landing<br />Page</h3>
                <p className="service-card__desc">Ideal para profesionales y negocios que necesitan una presencia online sólida, rápida y orientada a generar clientes.</p>
                <ul className="service-card__features">
                  <li>1 a 3 páginas (Inicio, Servicios, Contacto)</li>
                  <li>Diseño responsive UI/UX a medida</li>
                  <li>Formulario de contacto funcional</li>
                  <li>SEO on-page básico integrado</li>
                  <li>Integración con Google Analytics</li>
                  <li>Alta velocidad (PageSpeed &gt;90)</li>
                  <li>1 ronda de revisiones</li>
                  <li>Entrega en 2-3 semanas</li>
                </ul>
                <div className="service-card__footer">
                  <span className="service-card__price">Desde <strong>350,00 €</strong> <span style={{ fontSize: '0.65rem', color: 'var(--steel)' }}>+ IVA</span></span>
                  <Link to="/contacto" className="service-card__link">Solicitar →</Link>
                </div>
              </article>

              <article className="service-card service-card--featured" data-index="02">
                <div className="service-wireframe">
                  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="15" y="10" width="70" height="100" rx="3" stroke="var(--steel)" strokeWidth="1" fill="var(--sheath)" />
                    <rect x="30" y="15" width="40" height="6" rx="3" fill="var(--ghost)" />
                    <circle cx="40" cy="18" r="1.5" fill="var(--steel)" />
                    <circle cx="50" cy="18" r="1.5" fill="var(--steel)" />
                    <circle cx="60" cy="18" r="1.5" fill="var(--steel)" />
                    <rect x="20" y="28" width="25" height="8" rx="2" fill="var(--ghost)" />
                    <rect x="52" y="28" width="28" height="25" rx="2" fill="var(--ghost)" />
                    <rect x="20" y="60" width="60" height="12" rx="2" fill="var(--ghost)" />
                    <rect x="20" y="78" width="27" height="18" rx="2" fill="var(--ghost)" />
                    <rect x="53" y="78" width="27" height="18" rx="2" fill="var(--edge)" />
                  </svg>
                </div>
                <div className="service-card__top">
                  <span className="service-card__num">02</span>
                  <span className="service-card__tag">/ Web Corporativa</span>
                </div>
                <h3 className="service-card__title">Web<br />Corporativa</h3>
                <p className="service-card__desc">Para empresas que necesitan una sede digital completa, con blog, posicionamiento avanzado y múltiples secciones estructuradas.</p>
                <ul className="service-card__features">
                  <li>5 a 10 páginas diseñadas a medida</li>
                  <li>Blog integrado y categorizado</li>
                  <li>SEO avanzado (Schema, XML, Core Vitals)</li>
                  <li>Formularios avanzados (reservas/presupuestos)</li>
                  <li>Multiidioma (hasta 2 idiomas)</li>
                  <li>Analytics + Search Console</li>
                  <li>3 rondas de revisiones</li>
                  <li>Entrega en 4-6 semanas</li>
                </ul>
                <div className="service-card__footer">
                  <span className="service-card__price">Desde <strong>750,00 €</strong> <span style={{ fontSize: '0.65rem', color: 'var(--steel)' }}>+ IVA</span></span>
                  <Link to="/contacto" className="service-card__link">Solicitar →</Link>
                </div>
              </article>

              <article className="service-card" data-index="03">
                <div className="service-wireframe">
                  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="15" y="10" width="70" height="100" rx="3" stroke="var(--steel)" strokeWidth="1" fill="var(--sheath)" />
                    <rect x="20" y="15" width="15" height="3" rx="1.5" fill="var(--ghost)" />
                    <path d="M 68 14 h 1.5 l 1.5 4 h 5 l 1 -3.5 h -6.5" stroke="var(--spark)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="72" cy="19.5" r="0.8" fill="var(--spark)" />
                    <circle cx="76" cy="19.5" r="0.8" fill="var(--spark)" />
                    <rect x="20" y="25" width="15" height="75" rx="2" fill="var(--ghost)" />
                    <rect x="40" y="25" width="18" height="18" rx="2" fill="var(--ghost)" />
                    <rect x="62" y="25" width="18" height="18" rx="2" fill="var(--ghost)" />
                    <rect x="40" y="48" width="18" height="18" rx="2" fill="var(--ghost)" />
                    <rect x="62" y="48" width="18" height="18" rx="2" fill="var(--ghost)" />
                    <rect x="40" y="71" width="18" height="18" rx="2" fill="var(--ghost)" />
                    <rect x="62" y="71" width="18" height="18" rx="2" fill="var(--ghost)" />
                  </svg>
                </div>
                <div className="service-card__top">
                  <span className="service-card__num">03</span>
                  <span className="service-card__tag">/ E-Commerce &amp; App</span>
                </div>
                <h3 className="service-card__title">E-commerce<br />&amp; App</h3>
                <p className="service-card__desc">Solución completa para vender online. Catálogo ilimitado, pasarela de pagos y gestión de envíos.</p>
                <ul className="service-card__features">
                  <li>Catálogo de productos escalable</li>
                  <li>Pasarela de pago (Stripe, PayPal, Redsys)</li>
                  <li>Panel de administración intuitivo</li>
                  <li>SEO técnico de producto (Rich Snippets)</li>
                  <li>Emails transaccionales automatizados</li>
                  <li>Multiidioma (hasta 3 idiomas)</li>
                  <li>5 rondas de revisiones</li>
                  <li>Entrega en 8-10 semanas</li>
                </ul>
                <div className="service-card__footer">
                  <span className="service-card__price">Desde <strong>2.000,00 €</strong> <span style={{ fontSize: '0.65rem', color: 'var(--steel)' }}>+ IVA</span></span>
                  <Link to="/contacto" className="service-card__link">Solicitar →</Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="specs" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <header className="section__header" style={{ marginBottom: '2.5rem' }}>
              <h2 className="section__h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', textTransform: 'none' }}>Especificaciones.</h2>
              <p className="section__sub">Comparativa técnica detallada de nuestros niveles de arquitectura.</p>
            </header>

            <div className="table-responsive">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>01 / Landing</th>
                    <th className="col-highlight">02 / Corporativa</th>
                    <th>03 / E-Commerce</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Número de páginas</strong></td><td>Hasta 5 páginas</td><td className="col-highlight">Hasta 10 páginas</td><td>Ilimitadas</td></tr>
                  <tr><td><strong>Diseño a medida</strong></td><td>100% Personalizado</td><td className="col-highlight">100% Personalizado</td><td>100% Personalizado</td></tr>
                  <tr><td><strong>Diseño Responsive</strong></td><td><span className="check-yes">✓</span></td><td className="col-highlight"><span className="check-yes">✓</span></td><td><span className="check-yes">✓</span></td></tr>
                  <tr><td><strong>SEO On-Page</strong></td><td>Básico</td><td className="col-highlight">Avanzado (Schema)</td><td>Avanzado + Rich Snippets</td></tr>
                  <tr><td><strong>Blog Integrado</strong></td><td><span className="check-no">—</span></td><td className="col-highlight"><span className="check-yes">✓</span></td><td><span className="check-yes">✓</span></td></tr>
                  <tr><td><strong>Multiidioma</strong></td><td><span className="check-no">—</span></td><td className="col-highlight">Hasta 2 idiomas</td><td>Hasta 3 idiomas</td></tr>
                  <tr><td><strong>Formularios de contacto</strong></td><td>1 formulario</td><td className="col-highlight">Avanzados / Múltiples</td><td>Avanzados / Múltiples</td></tr>
                  <tr><td><strong>Analítica Web</strong></td><td>Google Analytics</td><td className="col-highlight">Analytics + Search Console</td><td>Analytics + Search Console + E-comm</td></tr>
                  <tr><td><strong>Core Web Vitals</strong></td><td>Optimizado (&gt;90)</td><td className="col-highlight">Optimización Premium (&gt;95)</td><td>Optimización Premium</td></tr>
                  <tr><td><strong>Catálogo &amp; Pasarela de pago</strong></td><td><span className="check-no">—</span></td><td className="col-highlight"><span className="check-no">—</span></td><td>Ilimitado (Stripe/PayPal)</td></tr>
                  <tr><td><strong>Panel de administración</strong></td><td><span className="check-no">—</span></td><td className="col-highlight">Gestor básico (CMS)</td><td>Completo (Pedidos, stock)</td></tr>
                  <tr><td><strong>Rondas de revisiones</strong></td><td>1 ronda</td><td className="col-highlight">3 rondas</td><td>5 rondas</td></tr>
                  <tr><td><strong>Soporte post-lanzamiento</strong></td><td>15 días</td><td className="col-highlight">30 días</td><td>60 días</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section section--dark" id="modulos">
          <div className="container">
            <header className="section__header">
              <p className="section-label">/Extras</p>
              <h2 className="section__h2">Servicios adicionales y <br />extras</h2>
              <p className="section__sub">Añade lo que necesitas a tu proyecto. Precio fijo por módulo, sin sorpresas.</p>
            </header>

            <div className="modules-grid">
              {[
                { title: 'Dominio registrado', desc: 'Tu nombre en la red. Gestión, renovación y configuración DNS incluida. Compatible con .com, .es, .net y más.', price: 'Desde 15 €/año' },
                { title: 'Email corporativo', desc: 'Correo con tu dominio. Configuración de cuentas en Google Workspace u Outlook para una imagen profesional.', price: 'Desde 35 €/año' },
                { title: 'Página adicional', desc: 'Diseño y desarrollo de una página extra con contenido optimizado para SEO y coherencia visual con el resto del sitio.', price: 'Desde 50 €/pág.' },
                { title: 'Formulario Multipaso', desc: 'Lógica condicional para filtrar leads cualificados antes de que lleguen a tu bandeja. Sin llamadas innecesarias.', price: 'Desde 90 €' },
                { title: 'Sistema de Reservas', desc: 'Calendario de citas online sincronizado con tu agenda. Los clientes reservan solos, tú solo confirmas.', price: 'Desde 190 €' },
                { title: 'Blog Estático', desc: 'Sección de contenidos optimizada para posicionamiento orgánico. Ultra-rápido y sin CMS pesado que lastre la carga.', price: 'Desde 200 €' },
                { title: 'Copywriting', desc: 'Textos que cortan. Estudiamos tu negocio y escribimos directo para que tu cliente entienda en 3 segundos.', price: 'Desde 80 €/pág.' },
                { title: 'Pack Legal', desc: 'Aviso Legal, Política de Privacidad y banner de Cookies real y adaptado al RGPD. La web blindada legalmente.', price: '90 €' },
                { title: 'Integraciones API', desc: 'Conectamos con HubSpot, Notion, Mailchimp o Slack. Los contactos van directo a tu flujo, sin intervención manual.', price: '100–200 €' },
                { title: 'Diseño de logotipo', desc: 'Identidad visual completa: logo, tipografías y paleta de colores. Tu marca con personalidad propia desde el día 1.', price: 'Desde 150 €' },
                { title: 'Multiidioma', desc: 'Tu web en otro idioma. Traducción técnica del sitio manteniendo la velocidad de carga, sin plugins de terceros.', price: 'Desde 120 €/idioma' },
                { title: 'Mantenimiento', desc: 'Servidores CDN global, SSL activo y cambios de texto incluidos. Tú solo te preocupas del negocio.', price: '250–350 €/año' },
              ].map((mod) => (
                <div key={mod.title} className="module">
                  <Link to="/contacto" className="module__link">
                    <h4 className="module__title">{mod.title}</h4>
                    <p className="module__desc">{mod.desc}</p>
                    <div className="module__footer">
                      <span className="module__price">{mod.price}</span>
                    </div>
                  </Link>
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
