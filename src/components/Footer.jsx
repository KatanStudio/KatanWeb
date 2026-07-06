import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [cookiePref, setCookiePref] = useState(
    () => localStorage.getItem('katanCookiesAceptadas')
  )
  const [bannerHiding, setBannerHiding] = useState(false)

  const dismissBanner = (pref) => {
    localStorage.setItem('katanCookiesAceptadas', pref)
    setBannerHiding(true)
    setTimeout(() => setCookiePref(pref), 600)
  }

  const acceptCookies = () => dismissBanner('accepted')
  const rejectCookies = () => dismissBanner('rejected')

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__row">
          <img src="/logos/wetransfer_katan_2026-05-04_0628/KATANLogoBlancoCompleto.svg" className="footer__brand-logo" alt="Katan Studio" />
          <span className="footer__dot"></span>
          <span className="footer__tagline">// sharp by design</span>
        </div>

        <div className="footer__row footer__contact">
          <a href="mailto:info@katan.es" className="contacto-hero__email">info@katan.es</a>
          <span className="footer__dot"></span>
          <span className="footer__text">España</span>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026 Katan Studio · Todos los derechos reservados</p>
          <div className="footer__legal-links">
            <Link to="/legal/aviso-legal" className="footer__link">Aviso Legal</Link>
            <span className="footer__pipe">|</span>
            <Link to="/legal/privacidad" className="footer__link">Política de Privacidad</Link>
            <span className="footer__pipe">|</span>
            <Link to="/legal/cookies" className="footer__link">Política de Cookies</Link>
          </div>
        </div>
      </div>

      {!cookiePref && (
        <div
          id="banner-cookies"
          className={`cookies-banner${bannerHiding ? ' cookies-banner--hidden' : ''}`}
        >
          <div className="container cookies-banner__inner">
            <p className="cookies-banner__text">
              Usamos <strong>cookies esenciales</strong> para el funcionamiento de la web y
              <strong> cookies analíticas</strong> para entender cómo la usas.
              Puedes aceptar todas o solo las esenciales.{' '}
              <Link to="/legal/cookies" className="cookies-banner__link">Más información</Link>
            </p>
            <div className="cookies-banner__actions">
              <button
                id="btn-rechazar-cookies"
                className="btn btn--ghost"
                onClick={rejectCookies}
              >
                Solo esenciales
              </button>
              <button
                id="btn-aceptar-cookies"
                className="btn btn--primary btn--chamfer"
                onClick={acceptCookies}
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
