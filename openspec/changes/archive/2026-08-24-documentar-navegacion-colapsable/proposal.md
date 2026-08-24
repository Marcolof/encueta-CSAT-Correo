# Documentar navegación colapsable

## Why

El backoffice incorporó un botón de menú (hamburguesa) en el encabezado que
permite contraer y expandir la navegación lateral. Este comportamiento ya
está implementado en el prototipo pero no estaba documentado en la spec de
`acceso-y-roles`.

## What Changes

- Se agrega el requisito "Navegación colapsable" a `acceso-y-roles`,
  describiendo el botón de menú, el estado contraído (solo íconos) y que la
  preferencia no persiste entre sesiones.

## Impact

- Specs afectadas: `acceso-y-roles`
- Sin impacto en código: el comportamiento ya está implementado en el
  prototipo (`prototype/index.html`, `prototype/components/navbar.css`).
