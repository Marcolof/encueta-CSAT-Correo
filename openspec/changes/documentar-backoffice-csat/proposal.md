## Why

El comportamiento del backoffice CSAT hoy solo existe implícito en el prototipo navegable (`prototype/index.html`) y repartido entre siete documentos de relevamiento en `Documents/`. No hay una fuente única que diga qué hace el producto, así que cada sesión de trabajo — humana o de IA — tiene que volver a deducirlo leyendo el HTML.

Este change deja escrito, como specs verificables, el comportamiento que el prototipo ya define: acceso por rol, ciclo de vida de un operativo (Borrador → Activo → Finalizado), navegación de listados, configuración y lanzamiento, seguimiento, cierre y administración de usuarios.

## What Changes

- Se documenta el comportamiento observable **existente**; no se modifica una línea de código ni de estilos del prototipo.
- Se crean siete capabilities nuevas que cubren el backoffice completo.
- Se registra explícitamente qué reglas son del producto y qué partes son demostración del prototipo (login sin validación, datos de ejemplo fijos, confirmaciones por `alert()`, sin persistencia).
- Se registra explícitamente lo que el prototipo declara como **pendiente de validación con negocio**, sin convertirlo en requisito: política de respuestas tardías, frecuencia de consumo de Analytics, necesidad real de exportación manual, autenticación definitiva.
- No hay cambios de comportamiento: es una línea base de documentación.

## Capabilities

### New Capabilities

- `acceso-y-roles`: pantalla de acceso, selección de perfil Admin / Operador / Controlador, navegación y acciones habilitadas por rol, cierre de sesión.
- `operativos/listado`: vista de Operativos con sus cuatro tabs (Todos, Activos, Borradores, Historial), la regla de resumen del tab Todos, búsqueda, chips de filtro, mensaje de resultados y paginación de los listados.
- `operativos/creacion`: alta de un operativo mediante modal con nombre y fechas, y creación en estado Borrador.
- `operativos/configuracion-y-lanzamiento`: los cuatro bloques de configuración del borrador, campos obligatorios, habilitación condicional de "Lanzar operativo" y transición Borrador → Activo.
- `operativos/seguimiento`: indicadores acumulados y ejecución del día de un operativo activo, más la configuración vigente en modo consulta.
- `operativos/finalizacion-e-historial`: finalización programada y manual con motivo opcional, transición Activo → Finalizado, paso a Historial, detalle del operativo cerrado y exportación manual de resultados.
- `usuarios-y-roles`: administración de accesos del backoffice — listado, alta y edición de usuarios, asignación de rol y visibilidad de contraseña.

### Modified Capabilities

Ninguna: el proyecto no tiene specs previas.

## Impact

- **Código afectado:** ninguno. Este change no toca `prototype/`, `hub/`, `assets/` ni `tools/`.
- **Artefactos creados:** `openspec/specs/` con las siete capabilities al archivar.
- **Fuentes de evidencia:** `prototype/index.html` (vistas, validaciones y reglas por rol), `prototype/components/index.js` (filtros y paginación), y `Documents/01_funcional.md` + `Documents/03_ux.md` como contexto secundario.
- **Fuera de alcance:** el hub del proyecto (`index.html`, `hub/`), la presentación, los generadores de `tools/` y el backend/integraciones descriptos en `Documents/05_arquitectura.md`, que no están implementados.
