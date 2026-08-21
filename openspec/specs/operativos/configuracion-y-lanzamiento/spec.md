# operativos/configuracion-y-lanzamiento Specification

## Purpose
Define qué se configura en un operativo en estado Borrador, qué datos son obligatorios para poder lanzarlo y cómo se produce la transición de Borrador a Activo.

## Requirements

### Requirement: Bloques de configuración del borrador

El detalle de un borrador SHALL organizar la configuración en cuatro bloques: **datos generales** (nombre y período), **público y segmentación** (origen/segmento, región, tipo de entrega y evento disparador), **muestreo** (cantidad diaria, límite total y frecuencia) y **encuesta** (plantilla y escala).

El evento disparador SHALL corresponder a un evento del sistema de trazabilidad de envíos: entrega efectiva en domicilio o entrega efectiva en sucursal.

#### Scenario: Consulta de la configuración

- **WHEN** el usuario abre el detalle de un borrador
- **THEN** se presentan los cuatro bloques de configuración
- **AND** el evento disparador ofrece las opciones de entrega efectiva en domicilio y en sucursal

### Requirement: Datos obligatorios para lanzar

El sistema SHALL exigir los siguientes datos para poder lanzar un operativo: nombre, fecha de inicio, fecha de finalización, segmento, región, tipo de entrega, evento disparador, cantidad diaria de muestreo, plantilla de encuesta y escala. El límite total y la frecuencia SHALL ser opcionales.

#### Scenario: Configuración incompleta

- **WHEN** falta al menos uno de los datos obligatorios
- **THEN** el sistema informa que faltan campos obligatorios
- **AND** la acción de lanzar el operativo permanece deshabilitada

#### Scenario: Configuración completa

- **WHEN** todos los datos obligatorios están completos
- **THEN** el sistema informa que la configuración está completa
- **AND** la acción de lanzar el operativo queda habilitada

### Requirement: Validación permanente de la configuración

El sistema SHALL reevaluar el estado de la configuración cada vez que el usuario modifica un campo, actualizando en el momento tanto el aviso de estado como la disponibilidad de la acción de lanzar, sin necesidad de guardar ni recargar.

#### Scenario: Se completa el último dato pendiente

- **WHEN** el usuario completa el único dato obligatorio que faltaba
- **THEN** el aviso pasa a indicar que la configuración está completa
- **AND** la acción de lanzar queda habilitada de inmediato

#### Scenario: Se vacía un dato obligatorio

- **WHEN** el usuario borra el contenido de un dato obligatorio ya completo
- **THEN** el aviso vuelve a indicar que faltan campos obligatorios
- **AND** la acción de lanzar vuelve a quedar deshabilitada

### Requirement: Lanzamiento del operativo

Al lanzarse, el operativo SHALL pasar de **Borrador** a **Activo** y SHALL empezar a participar del proceso automatizado de selección y envío de encuestas. El sistema SHALL confirmar el resultado y SHALL dejar al usuario en el listado de operativos activos.

El sistema NO SHALL permitir lanzar un operativo cuya configuración esté incompleta.

#### Scenario: Lanzamiento exitoso

- **WHEN** el usuario lanza un borrador con la configuración completa
- **THEN** el operativo pasa a estado Activo
- **AND** el sistema confirma el cambio de estado
- **AND** el usuario queda en el listado de operativos activos

#### Scenario: Intento de lanzamiento incompleto

- **WHEN** se intenta lanzar un borrador con datos obligatorios sin completar
- **THEN** el operativo permanece en estado Borrador

### Requirement: Consulta del borrador sin permisos de edición

Para un usuario sin permisos de gestión, el detalle del borrador SHALL presentarse en modo consulta: campos deshabilitados, sin acciones de guardado ni de lanzamiento, y con un aviso explícito de solo lectura en lugar del aviso de configuración pendiente.

#### Scenario: Apertura en modo consulta

- **WHEN** un usuario sin permisos de gestión abre un borrador
- **THEN** todos los campos aparecen deshabilitados
- **AND** no se ofrecen las acciones de guardar ni lanzar
- **AND** se muestra el aviso de solo lectura en lugar del aviso de campos obligatorios
