# Workflow — KATANAWEB

## Agentes y responsabilidades

| Agente | Responsabilidad | Puede editar archivos |
|---|---|---|
| delivery-lead | Coordinación de sprint, asignación, cierre | No |
| architect-agent | Estructura, decisiones de migración, secuenciación | No |
| frontend-agent | Implementación HTML/CSS/JS y React/Vite | Sí |
| review-agent | Revisión de calidad, SEO, accesibilidad | No |
| documentation-agent | Sincronización de docs/ y CLAUDE.md | Sí (solo docs) |

## Flujo de un sprint

```
delivery-lead lee sprint + repo
        ↓
architect-agent (si hay decisiones de estructura o migración)
        ↓
frontend-agent implementa
        ↓
review-agent valida
        ↓
documentation-agent sincroniza (si hubo cambios relevantes)
        ↓
delivery-lead cierra y entrega resumen
```

## Reglas de coordinación

- Si dos tareas tocan el mismo archivo: secuenciales, nunca en paralelo
- Si las tareas son independientes: en paralelo
- Si la migración React está en scope: architect-agent define estructura antes de que frontend-agent implemente
- Las páginas de `/web/legal/` no se tocan salvo requerimiento explícito
- No se introducen dependencias externas sin validación de architect-agent

## Reglas de cierre de sprint

Un sprint solo se cierra cuando:
1. review-agent emite GO o GO with observations
2. documentation-agent ha sincronizado los docs afectados (si aplica)
3. No hay BLOCKERs abiertos

## Escalación al usuario

Solo se escala si:
1. Se requiere una acción manual que solo el usuario puede realizar
2. Hay un bloqueo técnico real que no puede resolverse de forma autónoma
3. Los requisitos del sprint contradicen el estado real del repositorio de forma irreconciliable

Formato obligatorio:
```
MANUAL_ACTION_REQUIRED:
- motivo:
- acción exacta:
- comando o pasos:
- impacto de no hacerlo:
```

## Gestión de sprints

- Los sprints se guardan en `docs/sprints/sprint-XX.md`
- El sprint activo es el de número más alto salvo indicación contraria
- El delivery-lead crea el archivo de sprint si no existe, usando la plantilla en documentation-agent.md
