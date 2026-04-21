import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState } from 'react'

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
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false); // Estado para la ventana de gracias

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    negocio: '',
    publico: '', // Nuevo
    competidores: '', // Nuevo
    servicio: '',
    extras: [],
    materiales: '',
    referencias: '',
    plazo: 'Estándar',
    presupuesto: '',
    aceptaLegal: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'extras') {
      let nuevosExtras = [...formData.extras];
      checked ? nuevosExtras.push(value) : nuevosExtras = nuevosExtras.filter(item => item !== value);
      setFormData({ ...formData, extras: nuevosExtras });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step + 1);
  };
  
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí conectarías con Formspree usando fetch para evitar su ventana de éxito
    // Por ahora simulamos el envío:
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // VISTA DE GRACIAS
  if (submitted) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <div className="fade-in">
          <div style={{ marginBottom: '2rem' }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--spark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className="legal-h1">¡Briefing recibido!</h1>
          <p className="section__sub" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
            Gracias por confiar en Katan. Hemos recibido tus especificaciones y nuestro equipo las está analizando. 
            Te enviaremos una propuesta detallada en menos de 48 horas.
          </p>
          <Link to="/" className="btn btn--primary">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Briefing — Katan Studio</title>
      </Helmet>

      <nav className="nav nav--scrolled">
        <div className="nav__inner">
          <Link to="/" className="nav__brand"><KatanLogo /><span className="nav__wordmark">katan</span></Link>
          {step > 0 && <button onClick={() => setStep(0)} className="btn btn--ghost" style={{ fontSize: '0.7rem' }}>← Cancelar</button>}
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '2rem', maxWidth: '800px', minHeight: '70vh' }}>
        
        {step === 0 && (
          <div className="intro-screen" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p className="kicker">// kickstart</p>
            <h1 className="legal-h1" style={{textTransform: 'none'}}>Vamos a dar forma a tu idea.</h1>
            <p className="section__sub" style={{ marginBottom: '3rem' }}>Responde a unas preguntas clave para recibir tu presupuesto exacto.</p>
            <button onClick={nextStep} className="btn btn--primary btn--large">Empezar briefing (2 min)</button>
          </div>
        )}

        {step > 0 && (
          <form onSubmit={handleSubmit} className="katan-form">
            <div className="progress-bar" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--steel)', marginBottom: '0.5rem' }}>
                <span>PROGRESO DEL DISEÑO</span>
                <span>{Math.round((step / 5) * 100)}%</span>
              </div>
              <div style={{ height: '2px', background: 'var(--ghost)' }}>
                <div style={{ height: '100%', background: 'var(--spark)', width: `${(step / 5) * 100}%`, transition: 'width 0.4s ease' }}></div>
              </div>
            </div>

            {/* PASO 1: CONTACTO */}
            {step === 1 && (
              <fieldset className="fade-in">
                <legend className="kicker">01 // Identificación</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tu nombre o marca</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="form-group">
                    <label>Email de contacto</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="hola@tuweb.com" />
                  </div>
                </div>
              </fieldset>
            )}

            {/* PASO 2: ESTRATEGIA (NUEVO) */}
            {step === 2 && (
              <fieldset className="fade-in">
                <legend className="kicker">02 // Modelo de Negocio</legend>
                <div className="form-group">
                  <label>¿A qué te dedicas exactamente?</label>
                  <textarea name="negocio" value={formData.negocio} onChange={handleChange} required rows="2" placeholder="Describe brevemente tu actividad..."></textarea>
                </div>
                <div className="form-group">
                  <label>¿Quién es tu cliente ideal?</label>
                  <input type="text" name="publico" value={formData.publico} onChange={handleChange} placeholder="Ej: Empresas de tecnología, Parejas jóvenes..." />
                </div>
                <div className="form-group">
                  <label>¿Algún competidor que debamos tener en cuenta?</label>
                  <input type="text" name="competidores" value={formData.competidores} onChange={handleChange} placeholder="Webs que compitan contigo en tu sector..." />
                </div>
              </fieldset>
            )}

            {/* PASO 3: ARQUITECTURA */}
            {step === 3 && (
              <fieldset className="fade-in">
                <legend className="kicker">03 // Configuración del Sistema</legend>
                <div className="form-group">
                  <label>Tipo de estructura principal</label>
                  <div className="radio-grid">
                    <label className="radio-card">
                      <input type="radio" name="servicio" value="Landing" checked={formData.servicio === 'Landing'} onChange={handleChange} required />
                      <div className="card-content"><span className="title">Landing Page</span><span className="desc">Conversión y ventas.</span></div>
                    </label>
                    <label className="radio-card">
                      <input type="radio" name="servicio" value="Corporativa" checked={formData.servicio === 'Corporativa'} onChange={handleChange} />
                      <div className="card-content"><span className="title">Corporativa</span><span className="desc">Imagen, secciones y reservas</span></div>
                    </label>
                    <label className="radio-card">
                      <input type="radio" name="servicio" value="E-commerce" checked={formData.servicio === 'Comercio electrónico'} onChange={handleChange} />
                      <div className="card-content"><span className="title">Comercio electrónico</span><span className="desc">Ventas y stock</span></div>
                    </label>
                  </div>
                </div>
              </fieldset>
            )}

            {/* PASO 4: MATERIALES */}
            {step === 4 && (
              <fieldset className="fade-in">
                <legend className="kicker">04 // Activos y Referencias</legend>
                <div className="form-group">
                  <label>Estado de los materiales</label>
                  <select name="materiales" value={formData.materiales} onChange={handleChange} required>
                    <option value="">Selecciona...</option>
                    <option value="Listo">Tengo todo (Logo, textos, fotos)</option>
                    <option value="Parcial">Tengo logo pero necesito textos</option>
                    <option value="Nada">No tengo nada todavía</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Referencias visuales (URLs)</label>
                  <textarea name="referencias" value={formData.referencias} onChange={handleChange} rows="2" placeholder="Webs que te gusten estéticamente..."></textarea>
                </div>
              </fieldset>
            )}

            {/* PASO 5: CIERRE Y LEGAL */}
            {step === 5 && (
              <fieldset className="fade-in" style={{ border: 'none' }}>
                <legend className="kicker">05 // Lanzamiento</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label>Inversión prevista</label>
                    <select name="presupuesto" value={formData.presupuesto} onChange={handleChange} required>
                      <option value="">Selecciona horquilla...</option>
                      <option value="350-750">350€ - 750€</option>
                      <option value="750-1500">750€ - 1.500€</option>
                      <option value="1500+">+1.500€</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Urgencia</label>
                    <select name="plazo" value={formData.plazo} onChange={handleChange}>
                      <option value="Estándar">Estándar (3-4 semanas)</option>
                      <option value="Urgente">Urgente (Prioritario)</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--sheath)', borderRadius: '8px', border: '1px solid var(--ghost)' }}>
                  <label className="check-box" style={{ display: 'flex', gap: '1rem', cursor: 'pointer' }}>
                    <input type="checkbox" name="aceptaLegal" checked={formData.aceptaLegal} onChange={handleChange} required />
                    <span style={{ fontSize: '0.8rem', color: 'var(--steel)' }}>He leído y acepto la <Link to="/politica-de-privacidad" style={{ color: 'var(--spark)', textDecoration: 'underline' }}>Política de Privacidad</Link>. 
                        Comprendo que Katan Studio tratará mis datos con la finalidad de gestionar mi solicitud de presupuesto, basado en mi consentimiento.</span>
                  </label>
                </div>
              </fieldset>
            )}

            <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
              <button type="button" onClick={prevStep} className="btn btn--ghost" style={{ flex: 1 }}>← Atrás</button>
              {step < 5 ? (
                <button type="button" onClick={nextStep} className="btn btn--primary" style={{ flex: 2 }}>Siguiente paso</button>
              ) : (
                <button type="submit" className="btn btn--primary" style={{ flex: 2, background: 'var(--spark)', border: 'none', color: 'white' }}>Finalizar y enviar briefing</button>
              )}
            </div>
          </form>
        )}
      </div>
    </>
  )
}