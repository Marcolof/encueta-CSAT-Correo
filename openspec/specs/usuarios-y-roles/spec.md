# usuarios-y-roles Specification

## Purpose
Define la administración de accesos del backoffice CSAT: quién puede gestionar usuarios, qué datos tiene un usuario, cómo se le asigna un rol y qué significa cada rol dentro del sistema.

## Requirements

### Requirement: Administración exclusiva del Admin

La administración de usuarios y roles SHALL estar disponible únicamente para el rol Admin. Ningún otro rol SHALL acceder a esta sección.

Toda esta capability es una **propuesta pendiente de validación**: la documentación funcional de origen no define roles ni administración de usuarios, y el esquema podría ser reemplazado por un sistema corporativo de identidades.

#### Scenario: Acceso del Admin

- **WHEN** un usuario Admin inicia sesión
- **THEN** accede a la administración de usuarios y roles

#### Scenario: Acceso de otros roles

- **WHEN** un usuario Operador o Controlador inicia sesión
- **THEN** la administración de usuarios y roles no está disponible en su navegación

### Requirement: Roles del backoffice

El sistema SHALL ofrecer tres roles asignables, cuyo alcance SHALL estar visible en la propia sección de administración:

- **Admin**: gestiona usuarios y roles.
- **Operador**: crea, configura, lanza y finaliza operativos.
- **Controlador**: consulta operativos Activos y Finalizados en modo solo lectura. No accede a los Borradores.

#### Scenario: Alcance de los roles a la vista

- **WHEN** el Admin abre la administración de usuarios
- **THEN** se describe el alcance de los roles Admin, Operador y Controlador

### Requirement: Listado de usuarios

La sección SHALL listar los usuarios con su nombre, su email y su rol, y SHALL ofrecer búsqueda por texto y filtro por rol. Con más de 10 usuarios, el listado SHALL paginarse igual que el resto de los listados del backoffice.

#### Scenario: Búsqueda de un usuario

- **WHEN** el Admin busca por texto o filtra por rol
- **THEN** el listado muestra solo los usuarios que cumplen los criterios
- **AND** se informa la cantidad de resultados

### Requirement: Alta de usuario

El alta de un usuario SHALL requerir nombre y apellido, email, contraseña y rol. Al confirmarse, el sistema SHALL informar el resultado de la operación.

En el prototipo actual no existen reglas reales de formato, longitud ni seguridad de contraseña, y el sistema SHALL advertirlo. Las políticas definitivas están **pendientes de definición**.

#### Scenario: Creación de un usuario

- **WHEN** el Admin completa nombre, email, contraseña y rol y confirma el alta
- **THEN** el sistema informa que el usuario fue creado

#### Scenario: Alta cancelada

- **WHEN** el Admin cancela el alta
- **THEN** no se crea ningún usuario

### Requirement: Edición de usuario

El sistema SHALL permitir editar un usuario existente desde su fila del listado, presentando sus datos actuales ya cargados y permitiendo cambiar su rol. El diálogo SHALL distinguirse del alta en su título y en su acción de confirmación, y al confirmar SHALL informar que los cambios fueron guardados.

#### Scenario: Edición de datos y rol

- **WHEN** el Admin abre la edición de un usuario del listado
- **THEN** el nombre, el email y el rol actuales aparecen precargados
- **AND** la acción de confirmación corresponde a guardar cambios, no a crear

### Requirement: Visibilidad de la contraseña

El campo de contraseña SHALL mostrarse oculto por omisión y SHALL ofrecer un control para revelarlo y volver a ocultarlo, informando su estado a las tecnologías de asistencia. Cada vez que se abre el diálogo, el campo SHALL volver al estado oculto.

#### Scenario: Revelar y ocultar

- **WHEN** el Admin usa el control de visibilidad del campo contraseña
- **THEN** el contenido se revela
- **AND** al usarlo de nuevo vuelve a ocultarse

#### Scenario: Reapertura del diálogo

- **WHEN** el Admin abre el diálogo de alta o de edición después de haber revelado una contraseña
- **THEN** el campo se presenta oculto
