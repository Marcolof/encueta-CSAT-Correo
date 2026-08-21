## Purpose

Define el alta de un operativo de encuesta: el mínimo de datos necesarios para crearlo, el estado en que nace y cómo continúa el usuario hacia su configuración.

## ADDED Requirements

### Requirement: Alta desde el listado de operativos

El sistema SHALL ofrecer la creación de un operativo como acción principal dentro de la vista de Operativos, disponible únicamente para el rol Operador. La creación NO SHALL ser una opción fija de la navegación principal.

#### Scenario: Operador inicia una creación

- **WHEN** un usuario Operador usa la acción de crear operativo
- **THEN** se abre el diálogo de alta

#### Scenario: Rol sin permiso de creación

- **WHEN** un usuario que no es Operador está en la vista de Operativos
- **THEN** la acción de crear operativo no está disponible

### Requirement: Datos mínimos del alta

El alta SHALL requerir tres datos obligatorios: **nombre del operativo**, **fecha de inicio** y **fecha de finalización**. Si falta alguno, el sistema NO SHALL crear el operativo y SHALL informar al usuario qué datos debe completar.

#### Scenario: Alta con datos completos

- **WHEN** el usuario confirma el alta con nombre, fecha de inicio y fecha de finalización
- **THEN** el operativo se crea

#### Scenario: Alta incompleta

- **WHEN** el usuario confirma el alta sin alguno de los tres datos obligatorios
- **THEN** el operativo no se crea
- **AND** el sistema informa que debe completar nombre, fecha de inicio y fecha de finalización

### Requirement: Todo operativo nuevo nace como Borrador

El operativo creado SHALL quedar en estado **Borrador**. El estado NO SHALL ser seleccionable por el usuario durante el alta.

#### Scenario: Estado inicial

- **WHEN** se crea un operativo
- **THEN** su estado es Borrador
- **AND** en ningún momento del alta se ofrece elegir el estado

### Requirement: Continuidad hacia la configuración

Tras crear el operativo, el sistema SHALL llevar al usuario al detalle del borrador recién creado, con los datos ingresados en el alta ya cargados, para que continúe la configuración.

#### Scenario: Paso a la configuración

- **WHEN** el alta se completa correctamente
- **THEN** se muestra el detalle del borrador
- **AND** el nombre y las fechas ingresadas aparecen ya cargados
- **AND** el sistema indica el estado de la configuración pendiente
