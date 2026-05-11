# KatanWeb
`// sharp by design`

Web corporativa oficial de **Katan Studio** — agencia de desarrollo web a medida.
Construida con código propio, sin constructores visuales ni plantillas.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework UI | React 18 |
| Bundler | Vite 8 (Rolldown) |
| Routing | React Router 6 |
| SEO | React Helmet Async |
| Formularios | HubSpot Forms API |
| Estilos | CSS puro — Variables, Grid, Flexbox |

Solo frontend. No hay servidor propio: los formularios de contacto y briefing
se envían directamente a HubSpot desde el browser.

---

## Estructura

```
src/
  components/       ← Header, Footer, componentes reutilizables
  pages/
    Home.jsx
    Nosotros.jsx
    Servicios.jsx
    Portfolio.jsx
    Proceso.jsx
    Briefing.jsx    ← Formulario multistep de briefing (→ HubSpot)
    Contacto.jsx
    Faq.jsx
    AvisoLegal.jsx
    Privacidad.jsx
    Cookies.jsx
public/             ← Assets estáticos
```

---

## Variables de entorno

Copia `.env.example` como `.env.local` y rellena:

```bash
VITE_HUBSPOT_PORTAL_ID=   # ID del portal HubSpot
VITE_HUBSPOT_FORM_ID=     # UUID del formulario HubSpot
```

---

## Instalación y desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Genera /dist
npm run preview   # Preview del build en local
```

---

## Rama de trabajo

```
main          ← producción
  └── develop ← integración
        └── feature/* / fix/* / chore/*
```

Push a `main` solo mediante PR desde `develop`. Ver `KATAN_STANDARDS.md`.

---

*© 2026 Katan Studio. Código y diseño de uso exclusivo — no reproducir ni usar como plantilla.*
