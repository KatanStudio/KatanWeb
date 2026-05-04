import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Footer from '../components/Footer.jsx'

// ─────────────────────────────────────────────
// 🔧 CONFIGURACIÓN HUBSPOT
// ─────────────────────────────────────────────
const HUBSPOT_PORTAL_ID = '148402397';
const HUBSPOT_FORM_ID   = 'c2601690-8d77-4f53-9477-13415070a477';
// ─────────────────────────────────────────────

const EXTRAS_LIST = [
  'Dominio registrado',
  'Email corporativo',
  'Página adicional',
  'Formulario Multipaso',
  'Sistema de Reservas',
  'Blog Estático',
  'Copywriting',
  'Pack Legal',
  'Integraciones API',
  'Identidad Corporativa',
  'Multiidioma',
  'Mantenimiento & Hosting',
  'Revisiones evolutivas',
];

const SECTORES = [
  'Tecnología / Software',
  'Salud / Bienestar',
  'Hostelería / Turismo',
  'Comercio / Retail',
  'Servicios B2B (Empresas)',
  'Educación / Formación',
  'Arte / Entretenimiento / Creativo',
  'Construcción / Inmobiliaria',
  'Otro'
];

export default function Briefing() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    prefijo: '+34',
    empresa: '',
    sector: '',
    negocio: '',
    publico: '',
    objetivo: '',
    competidores: '',
    servicio: '',
    extras: [],
    materiales: '',
    referencias: '',
    plazo: '',
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

  const nextStep = (e) => {
    const form = e.target.closest('form');
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step + 1);
  };

  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step - 1);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // ENVÍO A HUBSPOT
  //
  // Campos fusionados:
  //   · firstname + lastname  → se envían separados (HubSpot los une en "Nombre completo" automáticamente)
  //   · servicios             → tipo de web + extras en una sola propiedad personalizada
  //
  // Propiedades personalizadas necesarias en HubSpot (9 en total):
  //   sector, negocio, publico_objetivo, objetivo_web, competidores,
  //   servicios, materiales_disponibles, referencias_visuales,
  //   nivel_urgencia, presupuesto_estimado
  // ─────────────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg('');

    const extrasTexto = formData.extras.length > 0
      ? `\nExtras: ${formData.extras.join(', ')}`
      : '\nExtras: Ninguno';

    const serviciosFusionado = `Tipo de web: ${formData.servicio}${extrasTexto}`;

    const fields = [
      // ── Propiedades ESTÁNDAR (no hay que crearlas en HubSpot) ──
      { name: 'firstname', value: formData.nombre },
      { name: 'lastname',  value: formData.apellidos },
      { name: 'email',     value: formData.email },
      { name: 'phone',     value: `${formData.prefijo} ${formData.telefono}` },
      { name: 'company',   value: formData.empresa },

      // ── Propiedades PERSONALIZADAS ──
      { name: 'sector',                 value: formData.sector },
      { name: 'negocio',                value: formData.negocio },
      { name: 'publico_objetivo',       value: formData.publico },
      { name: 'objetivo_web',           value: formData.objetivo },
      { name: 'competidores',           value: formData.competidores },
      { name: 'servicios',              value: serviciosFusionado },  // ← tipo web + extras fusionados
      { name: 'materiales_disponibles', value: formData.materiales },
      { name: 'referencias_visuales',   value: formData.referencias },
      { name: 'nivel_urgencia',         value: formData.plazo },
      { name: 'presupuesto_estimado',   value: formData.presupuesto },
    ];

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields,
            context: {
              pageUri: window.location.href,
              pageName: 'Briefing — Katan Studio',
            },
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || `Error ${res.status}`);
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      console.error('HubSpot submit error:', err);
      setErrorMsg('Hubo un problema al enviar el formulario. Por favor inténtalo de nuevo o escríbenos directamente.');
    } finally {
      setSending(false);
    }
  };

  // VISTA DE GRACIAS
  if (submitted) {
    return (
      <div style={{ display: 'grid', gridTemplateRows: '1fr auto', minHeight: '100svh' }}>
        <div className="container" style={{ padding: '6rem 1rem' }}>
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img src="/logos/wetransfer_katan_2026-05-04_0628/KATAN LOGO SVG (2).svg" alt="Katan Studio" style={{ height: '90px', width: 'auto', marginBottom: '1.5rem' }} />
            <h1 className="legal-h1">¡Briefing recibido!</h1>
            <p className="section__sub" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
              Gracias por confiar en Katan. Hemos recibido tus especificaciones y nuestro equipo las está analizando.
              Te enviaremos una propuesta detallada en menos de 48 horas.
            </p>
            <Link to="/" className="btn btn--primary">Volver al inicio</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateRows: '1fr auto', minHeight: '100svh' }}>
      <Helmet>
        <title>Briefing — Katan Studio</title>
      </Helmet>

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb orb-alt-1" aria-hidden="true" />
        <div className="glow-orb orb-alt-2" aria-hidden="true" />
        <nav className="nav nav--scrolled">
          <div className="nav__inner">
            <Link to="/" className="nav__brand" aria-label="Katan Studio — Inicio">
              <img src="/logos/wetransfer_katan_2026-05-04_0628/KATAN LOGO SVG (2).svg" className="nav__logo" alt="" aria-hidden="true" />
            </Link>
            {step > 0 && (
              <button
                type="button"
                className="btn btn--ghost"
                style={{ fontSize: '0.7rem' }}
                onClick={() => setShowConfirm(true)}
              >
                ← Cancelar
              </button>
            )}
          </div>
        </nav>

        <div className="container" style={{ paddingTop: '2rem', maxWidth: '800px' }}>

          {step === 0 && (
            <div className="intro-screen" style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p className="kicker">// kickstart</p>
              <h1 className="legal-h1" style={{ textTransform: 'none' }}>Vamos a dar forma a <span className="accent"> tu idea.</span></h1>
              <p className="section__sub" style={{ marginBottom: '3rem', textAlign: 'center', margin: '0 auto 3rem', maxWidth: '520px' }}>Responde a unas preguntas clave para recibir tu presupuesto exacto.</p>
              <button type="button" onClick={nextStep} className="btn btn--primary btn--large">Empezar formulario (4 min)</button> <br />
              <Link to="/contacto" className="btn btn--ghost" style={{ marginTop: '1rem', display: 'inline-block' }}>← Volver atrás</Link>
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
                      <label>Nombre <span style={{color:'var(--edge)'}}>*</span></label>
                      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Tu nombre" />
                    </div>
                    <div className="form-group">
                      <label>Apellidos <span style={{color:'var(--edge)'}}>*</span></label>
                      <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required placeholder="Tus apellidos" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email de contacto <span style={{color:'var(--edge)'}}>*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="hola@tuweb.com" />
                    </div>
                    <div className="form-group">
                      <label>Teléfono <span style={{color:'var(--edge)'}}>*</span></label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select name="prefijo" value={formData.prefijo} onChange={handleChange} style={{ width: '180px', flexShrink: 0 }}>
                          <optgroup label="EUROPA">
                            <option value="+34">🇪🇸 España (+34)</option>
                            <option value="+376">🇦🇩 Andorra (+376)</option>
                            <option value="+351">🇵🇹 Portugal (+351)</option>
                            <option value="+33">🇫🇷 Francia (+33)</option>
                            <option value="+39">🇮🇹 Italia (+39)</option>
                            <option value="+49">🇩🇪 Alemania (+49)</option>
                            <option value="+44">🇬🇧 Reino Unido (+44)</option>
                            <option value="+353">🇮🇪 Irlanda (+353)</option>
                            <option value="+355">🇦🇱 Albania (+355)</option>
                            <option value="+43">🇦🇹 Austria (+43)</option>
                            <option value="+32">🇧🇪 Bélgica (+32)</option>
                            <option value="+375">🇧🇾 Bielorrusia (+375)</option>
                            <option value="+387">🇧🇦 Bosnia y Herc. (+387)</option>
                            <option value="+359">🇧🇬 Bulgaria (+359)</option>
                            <option value="+357">🇨🇾 Chipre (+357)</option>
                            <option value="+385">🇭🇷 Croacia (+385)</option>
                            <option value="+45">🇩🇰 Dinamarca (+45)</option>
                            <option value="+421">🇸🇰 Eslovaquia (+421)</option>
                            <option value="+386">🇸🇮 Eslovenia (+386)</option>
                            <option value="+372">🇪🇪 Estonia (+372)</option>
                            <option value="+358">🇫🇮 Finlandia (+358)</option>
                            <option value="+995">🇬🇪 Georgia (+995)</option>
                            <option value="+30">🇬🇷 Grecia (+30)</option>
                            <option value="+36">🇭🇺 Hungría (+36)</option>
                            <option value="+354">🇮🇸 Islandia (+354)</option>
                            <option value="+371">🇱🇻 Letonia (+371)</option>
                            <option value="+423">🇱🇮 Liechtenstein (+423)</option>
                            <option value="+370">🇱🇹 Lituania (+370)</option>
                            <option value="+352">🇱🇺 Luxemburgo (+352)</option>
                            <option value="+389">🇲🇰 Macedonia del Norte (+389)</option>
                            <option value="+356">🇲🇹 Malta (+356)</option>
                            <option value="+373">🇲🇩 Moldavia (+373)</option>
                            <option value="+377">🇲🇨 Mónaco (+377)</option>
                            <option value="+382">🇲🇪 Montenegro (+382)</option>
                            <option value="+47">🇳🇴 Noruega (+47)</option>
                            <option value="+31">🇳🇱 Países Bajos (+31)</option>
                            <option value="+48">🇵🇱 Polonia (+48)</option>
                            <option value="+420">🇨🇿 Rep. Checa (+420)</option>
                            <option value="+40">🇷🇴 Rumanía (+40)</option>
                            <option value="+378">🇸🇲 San Marino (+378)</option>
                            <option value="+381">🇷🇸 Serbia (+381)</option>
                            <option value="+46">🇸🇪 Suecia (+46)</option>
                            <option value="+41">🇨🇭 Suiza (+41)</option>
                            <option value="+380">🇺🇦 Ucrania (+380)</option>
                            <option value="+379">🇻🇦 Vaticano (+379)</option>
                          </optgroup>
                          <optgroup label="NORTEAMÉRICA">
                            <option value="+1">🇺🇸 USA (+1)</option>
                            <option value="+1">🇨🇦 Canadá (+1)</option>
                            <option value="+52">🇲🇽 México (+52)</option>
                          </optgroup>
                          <optgroup label="CENTROAMÉRICA Y CARIBE">
                            <option value="+506">🇨🇷 Costa Rica (+506)</option>
                            <option value="+53">🇨🇺 Cuba (+53)</option>
                            <option value="+503">🇸🇻 El Salvador (+503)</option>
                            <option value="+502">🇬🇹 Guatemala (+502)</option>
                            <option value="+504">🇭🇳 Honduras (+504)</option>
                            <option value="+505">🇳🇮 Nicaragua (+505)</option>
                            <option value="+507">🇵🇦 Panamá (+507)</option>
                            <option value="+1">🇵🇷 Puerto Rico (+1)</option>
                            <option value="+1">🇩🇴 Rep. Dominicana (+1)</option>
                          </optgroup>
                          <optgroup label="SUDAMÉRICA">
                            <option value="+54">🇦🇷 Argentina (+54)</option>
                            <option value="+591">🇧🇴 Bolivia (+591)</option>
                            <option value="+55">🇧🇷 Brasil (+55)</option>
                            <option value="+56">🇨🇱 Chile (+56)</option>
                            <option value="+57">🇨🇴 Colombia (+57)</option>
                            <option value="+593">🇪🇨 Ecuador (+593)</option>
                            <option value="+595">🇵🇾 Paraguay (+595)</option>
                            <option value="+51">🇵🇪 Perú (+51)</option>
                            <option value="+598">🇺🇾 Uruguay (+598)</option>
                            <option value="+58">🇻🇪 Venezuela (+58)</option>
                          </optgroup>
                        </select>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={(e) => {
                            const valorFiltrado = e.target.value.replace(/[^0-9\s]/g, '');
                            handleChange({ target: { name: 'telefono', value: valorFiltrado, type: 'text' } });
                          }}
                          required
                          placeholder="600 000 000"
                          style={{ flex: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Nombre de la empresa o proyecto <span style={{color:'var(--edge)'}}>*</span></label>
                    <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required placeholder="El nombre de tu marca" />
                  </div>
                </fieldset>
              )}

              {/* PASO 2: ESTRATEGIA */}
              {step === 2 && (
                <fieldset className="fade-in">
                  <legend className="kicker">02 // Estrategia de Negocio</legend>
                  <div className="form-group">
                    <label>Sector principal <span style={{color:'var(--edge)'}}>*</span></label>
                    <select name="sector" value={formData.sector} onChange={handleChange} required>
                      <option value="">Selecciona tu sector...</option>
                      {SECTORES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>¿A qué se dedica tu negocio exactamente? <span style={{color:'var(--edge)'}}>*</span></label>
                    <textarea name="negocio" value={formData.negocio} onChange={handleChange} required rows="2" placeholder="Explícanos qué vendes o qué servicio ofreces..."></textarea>
                  </div>
                  <div className="form-group">
                    <label>¿Cuál es el objetivo principal de la web?</label>
                    <textarea name="objetivo" value={formData.objetivo} onChange={handleChange} rows="2" placeholder="Ej: Conseguir contactos, vender productos online, validar una idea de negocio..."></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>¿Quién es tu cliente ideal?</label>
                      <input type="text" name="publico" value={formData.publico} onChange={handleChange} placeholder="Ej: Empresas locales, parejas jóvenes..." />
                    </div>
                    <div className="form-group">
                      <label>¿Competidores de referencia?</label>
                      <input type="text" name="competidores" value={formData.competidores} onChange={handleChange} placeholder="Marcas que compitan contigo" />
                    </div>
                  </div>
                </fieldset>
              )}

              {/* PASO 3: ARQUITECTURA & EXTRAS */}
              {step === 3 && (
                <fieldset className="fade-in">
                  <legend className="kicker">03 // Configuración del Sistema</legend>
                  <div className="form-group">
                    <label>Tipo de estructura principal <span style={{color:'var(--edge)'}}>*</span></label>
                    <div className="radio-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                      <label className="radio-card">
                        <input type="radio" name="servicio" value="Landing" checked={formData.servicio === 'Landing'} onChange={handleChange} required />
                        <div className="card-content"><span className="title">Landing Page</span><span className="desc">Conversión y ventas (1 pág)</span></div>
                      </label>
                      <label className="radio-card">
                        <input type="radio" name="servicio" value="Corporativa" checked={formData.servicio === 'Corporativa'} onChange={handleChange} />
                        <div className="card-content"><span className="title">Web Corporativa</span><span className="desc">Múltiples secciones y SEO</span></div>
                      </label>
                      <label className="radio-card">
                        <input type="radio" name="servicio" value="E-commerce" checked={formData.servicio === 'E-commerce'} onChange={handleChange} />
                        <div className="card-content"><span className="title">E-commerce</span><span className="desc">Catálogo y pagos online</span></div>
                      </label>
                      <label className="radio-card">
                        <input type="radio" name="servicio" value="Orientacion" checked={formData.servicio === 'Orientacion'} onChange={handleChange} />
                        <div className="card-content"><span className="title">No estoy seguro</span><span className="desc">Necesito asesoramiento</span></div>
                      </label>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: '2.5rem' }}>
                    <label>Servicios adicionales (Selecciona los que necesites)</label>
                    <div className="checkbox-grid">
                      {EXTRAS_LIST.map((ext) => (
                        <label key={ext} className="check-box">
                          <input
                            type="checkbox"
                            name="extras"
                            value={ext}
                            checked={formData.extras.includes(ext)}
                            onChange={handleChange}
                          />
                          <span>{ext}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </fieldset>
              )}

              {/* PASO 4: MATERIALES */}
              {step === 4 && (
                <fieldset className="fade-in">
                  <legend className="kicker">04 // Activos y Referencias</legend>
                  <div className="form-group">
                    <label>¿Qué materiales tienes preparados actualmente? <span style={{color:'var(--edge)'}}>*</span></label>
                    <select name="materiales" value={formData.materiales} onChange={handleChange} required>
                      <option value="">Selecciona una opción...</option>
                      <option value="Todo">Tengo de todo (Logotipo, colores, textos escritos y fotos/vídeos)</option>
                      <option value="Faltan Textos/Fotos">Tengo logotipo y colores, pero me faltan los textos o las fotos</option>
                      <option value="Falta Identidad">Tengo los textos/fotos, pero necesito diseño de logotipo</option>
                      <option value="Nada">No tengo nada, tenemos que empezar desde cero</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Referencias visuales (URLs)</label>
                    <textarea name="referencias" value={formData.referencias} onChange={handleChange} rows="3" placeholder="Péganos enlaces a webs que te gusten por su diseño, colores o estructura..."></textarea>
                  </div>
                </fieldset>
              )}

              {/* PASO 5: CIERRE Y LEGAL */}
              {step === 5 && (
                <fieldset className="fade-in" style={{ border: 'none' }}>
                  <legend className="kicker">05 // Lanzamiento</legend>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Inversión prevista para este proyecto <span style={{color:'var(--edge)'}}>*</span></label>
                      <select name="presupuesto" value={formData.presupuesto} onChange={handleChange} required>
                        <option value="">Selecciona una horquilla...</option>
                        <option value="350-750">350€ - 750€</option>
                        <option value="750-1500">750€ - 1.500€</option>
                        <option value="1500-3000">1.500€ - 3.000€</option>
                        <option value="3000+">+ 3.000€</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nivel de urgencia <span style={{color:'var(--edge)'}}>*</span></label>
                      <select name="plazo" value={formData.plazo} onChange={handleChange} required>
                        <option value="">Selecciona urgencia...</option>
                        <option value="Tranquilo">Tranquilo (Sin prisa, prioridad a la calidad)</option>
                        <option value="Normal">Normal (Flujo de trabajo estándar)</option>
                        <option value="Prioritario">Prioritario (Lo necesito lo antes posible)</option>
                      </select>
                      <p style={{ fontSize: '0.75rem', color: 'var(--steel)', marginTop: '0.5rem', lineHeight: '1.4' }}>
                        * <strong>Sé sincero.</strong> Indicar "Sin prisa" no significa que vayamos a retrasar tu proyecto, simplemente nos da flexibilidad para organizar los recursos.
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--sheath)', borderRadius: '8px', border: '1px solid var(--ghost)' }}>
                    <label className="check-box" style={{ display: 'flex', gap: '1rem', cursor: 'pointer', alignItems: 'flex-start' }}>
                      <input type="checkbox" name="aceptaLegal" checked={formData.aceptaLegal} onChange={handleChange} required style={{ marginTop: '0.2rem' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--steel)', lineHeight: '1.5' }}>
                        He leído y acepto la <Link to="/politica-de-privacidad" style={{ color: 'var(--spark)', textDecoration: 'underline' }}>Política de Privacidad</Link>.
                        Comprendo que Katan Studio tratará mis datos con la finalidad de gestionar mi solicitud de presupuesto, basado en mi consentimiento.
                      </span>
                    </label>
                  </div>

                  {errorMsg && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: '6px', color: '#ff5050', fontSize: '0.85rem' }}>
                      {errorMsg}
                    </div>
                  )}
                </fieldset>
              )}

              <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                <button type="button" onClick={prevStep} className="btn btn--ghost" style={{ flex: 1 }}>← Atrás</button>
                {step < 5 ? (
                  <button type="button" onClick={nextStep} className="btn btn--primary" style={{ flex: 2 }}>Siguiente paso</button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn--primary btn--chamfer"
                    style={{ flex: 2, background: 'var(--spark)', border: 'none', color: '#000', opacity: sending ? 0.7 : 1 }}
                    disabled={sending}
                  >
                    {sending ? 'Enviando...' : 'Finalizar y enviar briefing'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {showConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.8)',
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setShowConfirm(false)}
          >
            <div
              style={{
                background: 'var(--sheath)',
                border: '1px solid var(--ghost)',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '420px',
                width: '100%',
                textAlign: 'center',
              }}
              onClick={e => e.stopPropagation()}
            >
              <h3
                id="confirm-title"
                style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', color: 'var(--blade)', marginBottom: '0.75rem' }}
              >
                ¿Seguro que quieres salir?
              </h3>
              <p style={{ color: 'var(--steel)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                Perderás toda la información que has introducido y tendrás que empezar desde cero.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn btn--ghost"
                  style={{ flex: 1 }}
                  onClick={() => setShowConfirm(false)}
                >
                  Seguir rellenando
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  style={{ flex: 1, background: 'var(--edge)', border: 'none', color: '#fff' }}
                  onClick={() => navigate('/contacto')}
                >
                  Sí, salir
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}