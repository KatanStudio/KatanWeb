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

// ─── LÓGICA DEL PORTFOLIO ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 1. Quitar clase active de todos los botones
        filterBtns.forEach(b => b.classList.remove('is-active'));
        // 2. Añadir clase active al botón clicado
        btn.classList.add('is-active');

        // 3. Obtener el filtro seleccionado (landing, corporate, ecommerce, all)
        const filterValue = btn.getAttribute('data-filter');

        // 4. Mostrar/Ocultar tarjetas
        portfolioCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // --- AUTO-HIGHLIGHT NAV LINKS ---
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const allLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

allLinks.forEach(link => {
  // Si el href del enlace coincide con la página actual
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('is-active');
  } else {
    link.classList.remove('is-active');
  }
});

// --- LÓGICA DEL ACORDEÓN FAQ ---
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Encuentra el contenedor padre (faq-item)
      const faqItem = question.parentElement;
      
      // Comprueba si ya está activo
      const isActive = faqItem.classList.contains('is-active');

      // Opcional: Cierra todos los demás antes de abrir este (comenta este bloque si quieres que se puedan abrir varios a la vez)
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('is-active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Si no estaba activo, ábrelo
      if (!isActive) {
        faqItem.classList.add('is-active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
