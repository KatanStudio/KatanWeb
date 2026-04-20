import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const KatanLogo = () => (
  <svg className="nav__logo" width="36" height="36" viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <path d="M0 0 H96 V82 L82 96 H0 Z" fill="#1E1E2A" />
    <path d="M82 96 L96 82" stroke="#FF0080" strokeWidth="2.5" />
    <rect x="26" y="22" width="7" height="52" fill="#F0F4F8" />
    <path d="M33 48 L63 22 H72 L42 48 Z" fill="#F0F4F8" />
    <path d="M33 48 L63 74 H72 L42 48 Z" fill="#F0F4F8" />
    <circle cx="33" cy="48" r="3.5" fill="#FF0080" />
  </svg>
)

export default function Briefing() {
  return (
    <>
      <Helmet>
        <title>Iniciar Proyecto — Katan Studio</title>
        <meta name="description" content="Katan Studio — Datos precisos. Presupuesto exacto. Rellena el briefing y recibe tu propuesta en menos de 24 horas." />
      </Helmet>

      <nav className="nav nav--scrolled">
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label="Katan Studio — Inicio">
            <KatanLogo />
            <span className="nav__wordmark">katan</span>
          </Link>
          <Link to="/" className="btn btn--ghost" style={{ fontSize: '0.7rem' }}>← Volver</Link>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '1rem', maxWidth: '800px' }}>
        <div className="legal-hero" style={{ borderBottom: 'none', paddingBottom: '1rem' }}>
          <p className="kicker">// project initialization</p>
          <h1 className="legal-h1">briefing.</h1>
          <p className="section__sub">Datos precisos. Presupuesto exacto. Rellena esto y te enviamos la propuesta en menos de 24 horas.</p>
        </div>

        <form action="" method="POST" className="katan-form">
          <fieldset>
            <legend className="kicker" style={{ color: 'var(--steel)' }}>01 // Identificación</legend>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre o Empresa <span className="accent">*</span></label>
                <input type="text" name="Nombre" placeholder="Ej: Acme Corp" required />
              </div>
              <div className="form-group">
                <label>Email <span className="accent">*</span></label>
                <input type="email" name="Email" placeholder="contacto@empresa.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>¿A qué te dedicas y qué vendes? <span className="accent">*</span></label>
              <textarea name="Negocio" rows="3" placeholder="Ve al grano. ¿Cuál es tu producto o servicio principal?" required></textarea>
            </div>
          </fieldset>

          <fieldset>
            <legend className="kicker" style={{ color: 'var(--steel)' }}>02 // Arquitectura</legend>
            <div className="form-group">
              <label>¿Qué nivel de servicio necesitas? <span className="accent">*</span></label>
              <div className="radio-grid">
                <label className="radio-card">
                  <input type="radio" name="Servicio" value="Landing Page" required />
                  <div className="card-content">
                    <span className="title">01 / Landing Page</span>
                    <span className="desc">1 sola URL. Conversión pura. (Desde 350€)</span>
                  </div>
                </label>
                <label className="radio-card">
                  <input type="radio" name="Servicio" value="Web Corporativa" />
                  <div className="card-content">
                    <span className="title">02 / Web Corporativa</span>
                    <span className="desc">Multipágina. Autoridad. (Desde 750€)</span>
                  </div>
                </label>
                <label className="radio-card">
                  <input type="radio" name="Servicio" value="E-Commerce / App" />
                  <div className="card-content">
                    <span className="title">03 / E-Commerce / App</span>
                    <span className="desc">Transacciones y negocio. (Desde 1.400€)</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Módulos de precisión adicionales (Opcional)</label>
              <div className="checkbox-grid">
                <label className="check-box"><input type="checkbox" name="Extras" value="Formulario Multipaso" /> Formulario Multipaso avanzado</label>
                <label className="check-box"><input type="checkbox" name="Extras" value="Sistema de Reservas" /> Sistema de Reservas / Calendario</label>
                <label className="check-box"><input type="checkbox" name="Extras" value="Blog CMS" /> Integración de Blog (CMS estático)</label>
                <label className="check-box"><input type="checkbox" name="Extras" value="Multiidioma" /> Arquitectura Multiidioma</label>
                <label className="check-box"><input type="checkbox" name="Extras" value="Copywriting" /> Copywriting (Redacción de textos)</label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="kicker" style={{ color: 'var(--steel)' }}>03 // Materiales</legend>
            <div className="form-group">
              <label>¿Tienes identidad visual y textos preparados?</label>
              <select name="Materiales" required defaultValue="">
                <option value="" disabled>Selecciona una opción...</option>
                <option value="Todo listo">Tengo logo, colores, fotos y textos definitivos.</option>
                <option value="A medias">Tengo logo, pero necesito ayuda con textos o fotos.</option>
                <option value="Nada">No tengo nada, partimos de cero.</option>
              </select>
            </div>
            <div className="form-group">
              <label>Referencias visuales</label>
              <textarea name="Referencias" rows="2" placeholder="Pega aquí URLs de webs que te gusten (o que odies)."></textarea>
            </div>
          </fieldset>

          <fieldset style={{ borderBottom: 'none' }}>
            <legend className="kicker" style={{ color: 'var(--steel)' }}>04 // Ejecución</legend>
            <div className="form-row">
              <div className="form-group">
                <label>Plazo estimado</label>
                <select name="Plazo" defaultValue="Estándar">
                  <option value="Estándar">Estándar (3-4 semanas)</option>
                  <option value="Urgente">Urgente (Menos de 15 días)</option>
                  <option value="Sin prisa">Sin prisa (Fecha flexible)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Presupuesto disponible <span className="accent">*</span></label>
                <select name="Presupuesto" required defaultValue="">
                  <option value="" disabled>Selecciona horquilla...</option>
                  <option value="Menos de 350€">Menos de 350€ (No encaja con Katan)</option>
                  <option value="350€ - 750€">350€ - 750€</option>
                  <option value="750€ - 1.400€">750€ - 1.500€</option>
                  <option value="Más de 1.400€">Más de 1.500€</option>
                </select>
              </div>
            </div>
          </fieldset>

          <button type="submit" className="btn btn--primary btn--large" style={{ width: '100%', marginTop: '2rem' }}>
            Enviar especificaciones
          </button>
        </form>
      </div>
    </>
  )
}
