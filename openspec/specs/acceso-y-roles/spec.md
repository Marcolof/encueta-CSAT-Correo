# acceso-y-roles Specification

## Purpose
Define cómo se accede al backoffice CSAT y cómo el perfil del usuario determina qué puede ver y qué puede hacer: qué navegación se le presenta, qué acciones de gestión tiene habilitadas y en qué casos la información se muestra en modo consulta.

## Requirements

### Requirement: Acceso al backoffice

El sistema SHALL presentar una pantalla de acceso con campos de usuario y contraseña antes de mostrar cualquier vista del backoffice, y SHALL identificar al usuario autenticado con su nombre y su rol dentro de la aplicación.

En el prototipo actual el acceso es de demostración: no se valida usuario ni contraseña y el perfil se elige libremente. La forma definitiva de autenticación (propia, SSO, Active Directory u otro sistema corporativo) está **pendiente de definición**.

#### Scenario: Ingreso al backoffice

- **WHEN** el usuario accede al sistema sin sesión iniciada
- **THEN** se muestra la pantalla de acceso
- **AND** no se muestra ninguna vista del backoffice

#### Scenario: Sesión identificada

- **WHEN** el usuario ingresa con un perfil
- **THEN** el backoffice muestra el nombre del usuario y el rol vigente
- **AND** la navegación disponible corresponde a ese rol

### Requirement: Navegación según rol

El sistema SHALL exponer únicamente las secciones que corresponden al rol de la sesión. El rol **Admin** SHALL acceder solo a la administración de usuarios y roles. Los roles **Operador** y **Controlador** SHALL acceder a la sección de Operativos.

#### Scenario: Navegación del Admin

- **WHEN** un usuario Admin inicia sesión
- **THEN** la navegación ofrece únicamente "Usuarios y roles"
- **AND** esa vista se muestra como pantalla inicial

#### Scenario: Navegación del Operador y del Controlador

- **WHEN** un usuario Operador o Controlador inicia sesión
- **THEN** la navegación ofrece "Operativos"
- **AND** la vista inicial es el listado de operativos posicionado en el tab "Todos"

### Requirement: Gestión de operativos exclusiva del Operador

El sistema SHALL habilitar las acciones que modifican operativos únicamente al rol Operador. Esto incluye crear un operativo, editar la configuración de un borrador, lanzarlo y finalizarlo.

#### Scenario: Operador con acciones de gestión

- **WHEN** un usuario Operador está en el listado de operativos
- **THEN** la acción "Crear operativo" está disponible
- **AND** al abrir un operativo activo la acción "Finalizar operativo" está disponible

#### Scenario: Rol sin permisos de gestión

- **WHEN** un usuario que no es Operador está en el listado de operativos
- **THEN** la acción "Crear operativo" no se ofrece
- **AND** la acción "Finalizar operativo" no se ofrece en el detalle de un operativo activo

### Requirement: Consulta del Controlador

El sistema SHALL permitir al rol Controlador consultar todos los operativos, incluidos los borradores, sin poder modificar su configuración. Al abrir un borrador, los campos SHALL presentarse deshabilitados, las acciones de guardado y lanzamiento SHALL estar ausentes y el sistema SHALL informar que la vista es de solo lectura.

La necesidad de que el Controlador cuente además con una exportación manual de resultados es una **hipótesis pendiente de validación**.

#### Scenario: Controlador abre un borrador

- **WHEN** un usuario Controlador abre el detalle de un operativo en estado Borrador
- **THEN** todos los campos de configuración se muestran deshabilitados
- **AND** no se ofrecen las acciones de guardar ni de lanzar
- **AND** se muestra un aviso de que la consulta es de solo lectura

#### Scenario: Controlador consulta resultados

- **WHEN** un usuario Controlador abre el detalle de un operativo activo o finalizado
- **THEN** puede consultar sus indicadores y su configuración
- **AND** dispone de la acción de exportación manual de resultados

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión desde cualquier vista del backoffice. Al cerrarla, SHALL volver a la pantalla de acceso y SHALL cerrar cualquier diálogo abierto.

#### Scenario: Cierre de sesión con un diálogo abierto

- **WHEN** el usuario cierra la sesión mientras un diálogo está abierto
- **THEN** el diálogo se cierra
- **AND** se muestra la pantalla de acceso
