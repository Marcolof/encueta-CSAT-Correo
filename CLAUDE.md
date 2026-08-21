# Sistema CSAT — Backoffice de encuestas (Correo Argentino)

Backoffice para automatizar el envío y la medición de encuestas de satisfacción
(metodología CSAT) sobre entregas de Paquetería eCommerce. Referencia funcional: **GDD-773**.

Proyecto HTML/CSS/JS plano (sin build, sin frameworks). Todo abre con doble clic
sobre `index.html`; el único JS es clásico, para que funcione también vía `file://`.

## Documentación funcional

El comportamiento de este producto está documentado como especificaciones en
`openspec/specs/<area>/spec.md`. Cada archivo describe una parte del producto con
requisitos (`SHALL`) y escenarios (`WHEN`/`THEN`), en lenguaje de producto — sin
nombres de funciones, archivos ni librerías.

**Antes de implementar o modificar algo, leé la spec del área correspondiente.**
Si un cambio altera el comportamiento descrito, actualizá la spec en el mismo trabajo.

Áreas documentadas:

- `openspec/specs/acceso-y-roles/spec.md` — pantalla de acceso, perfiles Admin /
  Operador / Controlador, navegación y acciones habilitadas por rol, cierre de sesión.
- `openspec/specs/operativos/listado/spec.md` — vista de Operativos con sus cuatro
  tabs (Todos, Activos, Borradores, Historial), regla de resumen del tab Todos,
  búsqueda, chips de filtro, mensaje de resultados y paginación.
- `openspec/specs/operativos/creacion/spec.md` — alta de un operativo por modal
  (nombre y fechas) y creación en estado Borrador.
- `openspec/specs/operativos/configuracion-y-lanzamiento/spec.md` — los cuatro
  bloques de configuración del borrador, campos obligatorios, habilitación
  condicional de "Lanzar operativo" y transición Borrador → Activo.
- `openspec/specs/operativos/seguimiento/spec.md` — indicadores acumulados y
  ejecución del día de un operativo activo, más su configuración en modo consulta.
- `openspec/specs/operativos/finalizacion-e-historial/spec.md` — finalización
  programada y manual, transición Activo → Finalizado, paso a Historial y
  exportación manual de resultados.
- `openspec/specs/usuarios-y-roles/spec.md` — administración de accesos: listado,
  alta y edición de usuarios, asignación de rol y visibilidad de contraseña.

Ciclo de vida de un operativo: **Borrador → Activo → Finalizado**.

## Estructura del repositorio

- `index.html` — hub de entrada con las 4 secciones del proyecto.
- `prototype/` — prototipo navegable del backoffice (fuente de verdad del comportamiento).
- `hub/` — flujo de navegación, presentación y documentación renderizada a HTML.
- `Documents/` — documentos de relevamiento en Markdown (funcional, UX, arquitectura, roadmap).
- `tools/` — utilidades de build; `md2html.js` regenera `hub/docs/` desde `Documents/`.
- `openspec/` — specs publicadas e historial de changes.

## Convenciones

- **Estilos con tokens.** El color, el espaciado y los radios salen de
  `prototype/styles/tokens.css`. No hardcodear valores en los componentes.
- **Tipografía Gilroy**, con peso mínimo 600 (SemiBold) en este proyecto.
- **Iconos Lucide**, insertados como SVG inline para que hereden `currentColor`.
- Al editar cualquier `.md` de `Documents/`, correr `node tools/md2html.js` para
  regenerar la versión HTML del hub.

## Alcance y estado

Es un **prototipo de validación funcional**, no una implementación productiva:
el login no valida credenciales, los datos son de ejemplo y no hay persistencia
ni backend. Las integraciones descriptas en `Documents/05_arquitectura.md`
(Track & Trace, proveedor de WhatsApp, BD CSAT, Analytics) **no están implementadas**.

Varias reglas siguen pendientes de validación con negocio y están marcadas como
tales en los documentos: política de respuestas tardías, frecuencia de consumo de
Analytics, necesidad real de exportación manual y esquema definitivo de autenticación.
No convertirlas en requisitos sin confirmación.
