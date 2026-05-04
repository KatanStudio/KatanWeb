# Sprint 01 — Migración base a React + Vite

## Objetivo
Migrar el proyecto de HTML/CSS/JS puro a React + Vite manteniendo la paridad visual y funcional exacta con el sitio actual. Este sprint establece la estructura de componentes que usarán todos los sprints posteriores.

Al finalizar este sprint, el sitio debe verse y funcionar exactamente igual que ahora, pero sobre la nueva base tecnológica.

## Contexto
- Stack actual: HTML + CSS + JS puro en `/web/`
- Stack objetivo: React + Vite en `/src/`
- Sin backend, sin SSR — sitio estático
- El archivo `/web/style.css` es la referencia visual definitiva
- Las páginas de `/web/legal/` NO se migran en este sprint

## Tareas

### Fase 1 — Inicialización (architect-agent primero)
- [x] architect-agent define la estructura de carpetas `/src/` antes de que frontend-agent toque nada
- [x] Inicializar proyecto Vite con React en la raíz (junto a `/web/`, sin reemplazarla todavía)
- [x] Configurar Vite para que el build output sea compatible con despliegue estático

### Fase 2 — Componentes compartidos
- [x] Extraer `<Header />` desde el header común de las páginas actuales
- [x] Extraer `<Footer />` desde el footer común
- [x] Nav integrado en Header (lógica de menú móvil + active states con useLocation)
- [x] Migrar `/web/style.css` a `/src/index.css` sin modificar ninguna regla
- [x] Copiar `/web/img/` a `/public/img/` (assets estáticos)

### Fase 3 — Migración de páginas
Migrar cada página como componente en `/src/pages/`. Orden obligatorio:
- [x] `index.html` → `src/pages/Home.jsx` (establece el patrón)
- [x] `servicios.html` → `src/pages/Servicios.jsx`
- [x] `nosotros.html` → `src/pages/Nosotros.jsx`
- [x] `proceso.html` → `src/pages/Proceso.jsx`
- [x] `portfolio.html` → `src/pages/Portfolio.jsx`
- [x] `briefing.html` → `src/pages/Briefing.jsx`
- [x] `contacto.html` → `src/pages/Contacto.jsx`

### Fase 4 — Routing
- [x] Instalar React Router
- [x] Configurar rutas en `src/App.jsx` para que cada página sea accesible en su URL actual (e.g. `/servicios`, `/nosotros`)
- [x] Verificar que los links internos entre páginas funcionan correctamente

### Fase 5 — Validación final
- [x] El sitio en `localhost` es visualmente idéntico al original en todas las páginas migradas
- [x] `npm run build` completa sin errores (590ms, build limpio)
- [x] Las páginas de `/web/legal/` siguen accesibles (no se han tocado)

## Definition of Done
- [x] `npm run dev` levanta el sitio sin errores
- [x] `npm run build` produce un build estático limpio
- [x] Paridad visual confirmada en todas las páginas migradas
- [x] SEO básico preservado: `<title>` y `<meta description>` en cada página (react-helmet-async)
- [x] `/web/` se mantiene intacta
- [ ] review-agent ha emitido GO o GO with observations
- [ ] documentation-agent ha actualizado `CLAUDE.md` (cambio de fase activa) y este archivo

## Archivos afectados
**Nuevos:**
- `package.json`, `vite.config.js`
- `src/main.jsx`, `src/App.jsx`, `src/index.css`
- `src/components/Header.jsx`, `Footer.jsx`, `Nav.jsx`
- `src/pages/Home.jsx`, `Servicios.jsx`, `Nosotros.jsx`, `Proceso.jsx`, `Portfolio.jsx`, `Briefing.jsx`, `Contacto.jsx`
- `public/img/` (copia de `/web/img/`)

**No tocar:**
- `/web/` completo (referencia visual, se borra solo tras GO del review-agent)
- `/web/legal/`

## Notas
- Si durante la migración de `index.html` aparece JS complejo en `script.js`, frontend-agent debe señalarlo como candidato a hook de React antes de implementarlo — no migrar JS complejo sin validación de architect-agent
- React Helmet (o react-helmet-async) es la solución recomendada para `<title>` y `<meta>` por página
- El sprint 02 añadirá la animación scroll-driven — no anticipar nada de esa lógica aquí
