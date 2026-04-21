# Sprint 2 — Rediseño interactivo de la vista de Servicios

## Objetivo
Elevar la sección de `Servicios` para que deje de ser una introducción estática y pase a ser una experiencia visual e interactiva, alineada con la identidad de la web y orientada a explicar mejor cada tipo de servicio.

## Alcance
- Sustituir el bloque actual de introducción de `Servicios` por una vista dinámica tipo carrusel / selector
- Mostrar tres estados principales:
  - `Landing Page`
  - `Web Corporativa`
  - `E-Commerce`
- Hacer que cada estado muestre una demo visual representativa del tipo de web correspondiente
- Adaptar el componente a la paleta y lenguaje visual reales de la web actual
- Mantener el resto de la página de `Servicios` estable salvo donde sea necesario para integrar el nuevo bloque
- Rediseñar la sección de `Servicios extra`
- Reutilizar el patrón visual de la sección `Tecnologías` de `Inicio` como referencia estructural
- Mostrar inicialmente solo el título de cada servicio extra
- Desplegar el contenido actual del extra al hacer hover
- Garantizar comportamiento responsive en desktop y mobile
- Mantener accesibilidad y legibilidad en todos los estados

## Fuera de alcance
- Rebranding completo de la web
- Reescritura global del copy de todos los servicios
- Añadir animaciones pesadas o dependientes de librerías externas innecesarias
- Crear demos funcionales completas de cada tipo de web
- Integración con backend, CMS o datos remotos
- Reestructurar otras páginas fuera de `Servicios`
- Añadir nuevos extras no definidos actualmente

## Entregables
- Nuevo bloque Hero / intro dinámico en `Servicios`
- Navegación inferior o lateral para alternar entre los tres servicios principales
- Tres demos visuales integradas:
  - una demo de landing page
  - una demo de web corporativa
  - una demo de e-commerce
- Sistema de estilos conectado con los colores reales de la marca
- Sección `Servicios extra` rediseñada con patrón compacto y desplegable en hover
- Contenido actual de extras preservado y reubicado dentro del nuevo patrón
- Ajustes responsive y de interacción
- Código limpio, reusable y consistente con la arquitectura actual del frontend

## Definition of Done
- La página `Servicios` muestra un bloque inicial interactivo en lugar de una intro estática
- El usuario puede cambiar entre `Landing Page`, `Web Corporativa` y `E-Commerce`
- Cada opción muestra una demo visual diferenciada y reconocible
- Los colores del componente respetan la identidad visual de la web
- La transición entre estados resulta fluida y clara
- La sección `Servicios extra` muestra solo títulos en reposo
- Al pasar el cursor por cada extra se despliega su contenido correspondiente
- En mobile existe una alternativa usable al hover
- No se rompe la maquetación general de la página
- El código queda preparado para futuras ampliaciones o refinamientos visuales

## Riesgos
- Introducir demasiado ruido visual en una sección que debe vender claridad
- Crear una demo demasiado decorativa y poco alineada con el estilo real de la marca
- Basar la interacción solo en hover y degradar la experiencia móvil
- Duplicar lógica o estilos que ya existen en otros componentes
- Acoplar demasiado el componente a textos fijos y dificultar cambios futuros
- Sobrecargar la página con animaciones innecesarias

## Decisiones de implementación
- Priorizar una solución en React simple y mantenible
- Usar estado local para controlar el servicio activo
- No depender de librerías adicionales si el comportamiento puede resolverse con React + CSS
- Las demos visuales deben parecer vistas reales de producto, no simples fondos abstractos
- Los fondos, acentos, bordes y overlays deben salir de la identidad visual existente de la web
- El patrón de `Servicios extra` debe inspirarse en `Tecnologías`, pero adaptado a contenido expandible
- En desktop el despliegue principal será por hover
- En mobile el mismo contenido debe poder abrirse por tap / click o en modo expandible equivalente
- Mantener separación clara entre:
  - datos del componente
  - estructura JSX
  - estilos
  - microinteracciones

## Tareas esperadas
- Revisar la implementación actual de `Servicios`
- Revisar la sección `Tecnologías` de `Inicio` para reutilizar patrón visual
- Definir la estructura de datos de los tres servicios principales
- Diseñar el bloque dinámico principal
- Implementar la navegación entre vistas
- Diseñar e integrar las tres demos visuales
- Adaptar colores, brillos, fondos y contraste al sistema visual actual
- Rediseñar `Servicios extra` en formato compacto expandible
- Reubicar el contenido actual de extras sin perder información
- Ajustar responsive
- Validar accesibilidad básica:
  - contraste
  - foco
  - navegación por teclado donde aplique
  - comportamiento alternativo al hover
- Hacer revisión final visual y de consistencia

## Criterios funcionales
### Hero dinámico de Servicios
- Debe existir un estado activo visible en todo momento
- El cambio de servicio debe actualizar:
  - título
  - descripción
  - demo visual asociada
- La demo debe comunicar el tipo de solución sin necesidad de mucho texto
- El componente debe transmitir sensación premium y de producto

### Servicios extra
- En estado inicial solo debe verse el título de cada extra
- El contenido detallado solo aparece al interactuar
- Debe existir una jerarquía visual clara entre extras
- El despliegue no debe resultar brusco ni romper el layout

## Notas para el Delivery Lead
- Priorizar claridad comercial sobre espectacularidad visual
- No copiar literalmente el estilo de referencia externa; adaptarlo a la identidad propia
- La demo visual debe vender el servicio, no distraer
- Evitar una implementación rígida difícil de editar después
- Si hay conflicto entre estética y mantenibilidad, priorizar mantenibilidad sin perder impacto
- Cerrar el sprint solo cuando desktop y mobile queden resueltos