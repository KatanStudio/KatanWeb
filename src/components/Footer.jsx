import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [cookiesAccepted, setCookiesAccepted] = useState(
    () => localStorage.getItem('katanCookiesAceptadas') === 'true'
  )
  const [bannerHiding, setBannerHiding] = useState(false)

  const acceptCookies = () => {
    localStorage.setItem('katanCookiesAceptadas', 'true')
    setBannerHiding(true)
    setTimeout(() => setCookiesAccepted(true), 600)
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__row">
          <img src="/logos/KATAN LOGO SVG (2).svg" className="footer__brand-logo" alt="Katan Studio" />
          <span className="footer__dot"></span>
          <span className="footer__tagline">// sharp by design</span>
        </div>

        <div className="footer__row footer__contact">
          <a href="mailto:katan.webs@gmail.com" className="contacto-hero__email">katan.webs@gmail.com</a>
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

      {!cookiesAccepted && (
        <div
          id="banner-cookies"
          className={`cookies-banner${bannerHiding ? ' cookies-banner--hidden' : ''}`}
        >
          <div className="container cookies-banner__inner">
            <p className="cookies-banner__text">
              Utilizamos cookies propias y de terceros para asegurar el rendimiento de la web.
              Sin rastreadores innecesarios.
            </p>
            <div className="cookies-banner__actions">
              <Link to="/legal/cookies" className="cookies-banner__link">Más información</Link>
              <button
                id="btn-aceptar-cookies"
                className="btn btn--primary btn--chamfer"
                onClick={acceptCookies}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
