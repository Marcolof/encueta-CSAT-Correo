# Restringir el acceso del Controlador a Borradores

## Why

Decisión de producto: el rol Controlador ya no debe poder ver los operativos en
estado Borrador. Hasta ahora podía consultarlos en modo solo lectura (requisito
"Consulta del Controlador" en `acceso-y-roles`). Se revierte esa capacidad: el
tab "Borradores" deja de estar disponible para este rol.

## What Changes

- El Controlador deja de tener acceso a los operativos en estado Borrador.
- El tab "Borradores" no se ofrece en su navegación, y el grupo "Borradores"
  tampoco aparece en el resumen del tab "Todos" para este rol.
- Se actualiza la descripción del alcance del rol Controlador en la sección de
  administración de usuarios.

## Impact

- Specs afectadas: `acceso-y-roles` (requisito "Consulta del Controlador"),
  `usuarios-y-roles` (requisito "Roles del backoffice").
- Código: `prototype/index.html` — `configureNavigation()` oculta el tab y el
  panel resumen; se corrige el texto de la card de permisos del Controlador.
