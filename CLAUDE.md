# KATANAWEB

Web de servicios de desarrollo para negocios locales. Ofrecemos diseño y desarrollo web a medida.

## Stack actual
HTML + CSS + JS puro. Sin frameworks, sin build tools, sin dependencias externas.

## Stack objetivo
React + Vite. Migración progresiva página por página.
Backend previsto para una fase posterior (no en scope actual).

## Estructura del repositorio
```
web/
  img/          → assets estáticos
  legal/        → páginas legales (aviso-legal, cookies, privacidad)
  index.html
  briefing.html
  contacto.html
  nosotros.html
  portfolio.html
  proceso.html
  servicios.html
  script.js
  style.css
docs/
  sprints/      → un archivo .md por sprint
  project-purpose.md
  workflow.md
```

## Convenciones actuales
- CSS con nomenclatura BEM
- Sin frameworks CSS externos
- SEO es prioritario — los clientes finales son negocios locales
- Accesibilidad básica obligatoria (alt en imágenes, semántica HTML5)
- Las páginas legales (aviso-legal, cookies, privacidad) no se tocan salvo requerimiento explícito

## Migración a React (cuando aplique)
- Bundler: Vite
- Componentes reutilizables en `src/components/`
- Una página por archivo en `src/pages/`
- Migrar primero `index.html` para establecer el patrón
- Extraer header, footer y nav como componentes antes de migrar el resto
- No introducir backend ni lógica de servidor en esta fase

## Gestión de sprints
- Cada sprint tiene su archivo en `docs/sprints/sprint-XX.md`
- El sprint activo es el de número más alto salvo indicación contraria
- El delivery-lead lee siempre el sprint antes de actuar

## Prioridades del proyecto
1. Tiempo de carga y rendimiento
2. SEO on-page
3. Claridad y mantenibilidad del código
4. Diseño consistente entre páginas
