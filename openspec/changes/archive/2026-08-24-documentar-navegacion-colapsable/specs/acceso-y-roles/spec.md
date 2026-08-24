## ADDED Requirements

### Requirement: Navegación colapsable

El sistema SHALL ofrecer, en el encabezado, un botón de menú que contrae y
expande la navegación lateral. En estado contraído, la navegación SHALL
mostrar únicamente los íconos de cada sección, sin sus etiquetas de texto.
La preferencia de estado (expandido o contraído) SHALL aplicarse solo a la
sesión en curso y no SHALL persistir al volver a ingresar al backoffice.

#### Scenario: Contraer la navegación

- **WHEN** el usuario presiona el botón de menú con la navegación expandida
- **THEN** la navegación lateral pasa a mostrar solo íconos
- **AND** el contenido principal ocupa el espacio liberado

#### Scenario: Expandir la navegación

- **WHEN** el usuario presiona el botón de menú con la navegación contraída
- **THEN** la navegación lateral vuelve a mostrar íconos y etiquetas
