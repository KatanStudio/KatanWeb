// ── Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!open));
    mobileMenu.setAttribute('aria-hidden', String(open));
    hamburger.classList.toggle('is-open', !open);
    mobileMenu.classList.toggle('is-open', !open);
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
    });
});

// ── Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.service-card, .module, .process__step, .compare__col, .compare__col--wp').forEach(el => {
    el.classList.add('anim-fade');
    observer.observe(el);
});


document.addEventListener('DOMContentLoaded', function() {
  
  // ─── LÓGICA DEL BANNER DE COOKIES ───
  const btnAceptar = document.getElementById('btn-aceptar-cookies');
  const bannerCookies = document.getElementById('banner-cookies');

  if (btnAceptar && bannerCookies) {
    
    // 1. Comprobación inicial: Ya aceptó las cookies?
    if (localStorage.getItem('katanCookiesAceptadas') === 'true') {
      // Si ya las aceptó, ocultamos el banner de golpe, sin animaciones ni esperas.
      bannerCookies.style.display = 'none';
    }

    // 2. Acción al hacer clic en "Aceptar"
    btnAceptar.addEventListener('click', function() {
      // Guardamos la decisión en la memoria del navegador
      localStorage.setItem('katanCookiesAceptadas', 'true');
      
      // Ejecutamos la animación de salida (la clase que creamos en CSS)
      bannerCookies.classList.add('cookies-banner--hidden');
      
      // Lo eliminamos del flujo visual tras terminar la animación (600ms)
      setTimeout(() => {
        bannerCookies.style.display = 'none';
      }, 600); 
    });
  }

});
