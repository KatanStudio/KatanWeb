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

// main.js - Actualizado con animación de deslizamiento

document.addEventListener('DOMContentLoaded', function () {

    const btnAceptar = document.getElementById('btn-aceptar-cookies');
    const bannerCookies = document.getElementById('banner-cookies');

    if (btnAceptar && bannerCookies) {
        btnAceptar.addEventListener('click', function () {
            // En lugar de .style.display = 'none', usamos la clase de CSS
            bannerCookies.classList.add('cookies-banner--hidden');

            // Opcional: Eliminar el elemento del DOM después de la animación 
            // para que no interfiera con lectores de pantalla
            setTimeout(() => {
                bannerCookies.style.display = 'none';
            }, 600); // 600ms coincide con la duración del CSS
        });
    }
});
