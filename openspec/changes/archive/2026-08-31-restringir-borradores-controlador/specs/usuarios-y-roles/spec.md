## MODIFIED Requirements

### Requirement: Roles del backoffice

El sistema SHALL ofrecer tres roles asignables, cuyo alcance SHALL estar visible en la propia sección de administración:

- **Admin**: gestiona usuarios y roles.
- **Operador**: crea, configura, lanza y finaliza operativos.
- **Controlador**: consulta operativos Activos y Finalizados en modo solo lectura. No accede a los Borradores.

#### Scenario: Alcance de los roles a la vista

- **WHEN** el Admin abre la administración de usuarios
- **THEN** se describe el alcance de los roles Admin, Operador y Controlador
