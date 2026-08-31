## MODIFIED Requirements

### Requirement: Consulta del Controlador

El sistema SHALL permitir al rol Controlador consultar los operativos en estado
Activo y Finalizado, sin poder modificar su configuración. El Controlador NO
SHALL tener acceso a los operativos en estado Borrador: el tab "Borradores"
NO SHALL ofrecerse en su navegación, y el grupo "Borradores" NO SHALL
aparecer en el resumen del tab "Todos" para este rol.

La necesidad de que el Controlador cuente además con una exportación manual de
resultados es una **hipótesis pendiente de validación**.

#### Scenario: Navegación del Controlador sin Borradores

- **WHEN** un usuario Controlador abre la vista de Operativos
- **THEN** el tab "Borradores" no está disponible
- **AND** el resumen del tab "Todos" no muestra el grupo "Borradores"

#### Scenario: Controlador abre un borrador

- **WHEN** un usuario Controlador está en la vista de Operativos
- **THEN** no tiene ninguna vía de navegación hacia el detalle de un operativo en estado Borrador

#### Scenario: Controlador consulta resultados

- **WHEN** un usuario Controlador abre el detalle de un operativo activo o finalizado
- **THEN** puede consultar sus indicadores y su configuración, con los campos deshabilitados
- **AND** dispone de la acción de exportación manual de resultados
