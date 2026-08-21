# operativos/finalizacion-e-historial Specification

## Purpose
Define cómo termina la vida de un operativo de encuesta: la finalización programada y la manual, el efecto del cierre sobre la selección de casos, y cómo se consulta después un operativo cerrado junto con la exportación manual de sus resultados.

## Requirements

### Requirement: Finalización manual con confirmación

El sistema SHALL permitir al rol Operador finalizar manualmente un operativo activo, siempre a través de una confirmación previa que explique el efecto del cierre y admita un **motivo de finalización opcional**.

#### Scenario: Confirmación del cierre

- **WHEN** un usuario Operador solicita finalizar un operativo activo
- **THEN** el sistema pide confirmación explicando que el operativo pasará a Historial y dejará de seleccionar casos
- **AND** ofrece registrar un motivo de finalización opcional

#### Scenario: Cierre cancelado

- **WHEN** el usuario cancela la confirmación
- **THEN** el operativo permanece en estado Activo

### Requirement: Finalización programada por fecha

Un operativo activo SHALL finalizar automáticamente al llegar la fecha de finalización configurada, sin intervención del usuario.

#### Scenario: Llegada de la fecha final

- **WHEN** se alcanza la fecha de finalización configurada de un operativo activo
- **THEN** el operativo pasa a estado Finalizado

### Requirement: Efecto de la finalización

Al finalizar, el operativo SHALL pasar de **Activo** a **Finalizado**, SHALL dejar de incorporar nuevos casos y de generar nuevos envíos de encuesta, y SHALL pasar a consultarse desde Historial. Los resultados ya recibidos SHALL permanecer almacenados y disponibles para su consumo posterior.

La finalización NO SHALL implicar la generación de una entrega de información para Analytics.

#### Scenario: Operativo finalizado

- **WHEN** un operativo se finaliza, sea de forma manual o programada
- **THEN** su estado es Finalizado
- **AND** deja de seleccionar nuevos casos y de enviar nuevas encuestas
- **AND** pasa a estar disponible en Historial
- **AND** los resultados ya recibidos permanecen almacenados

### Requirement: Detalle del operativo finalizado

El detalle de un operativo finalizado SHALL mostrar sus resultados acumulados —encuestas enviadas, respondidas y CSAT promedio— y los datos del cierre: fecha, tipo de finalización (programada o manual) y situación de los resultados.

#### Scenario: Consulta de un operativo cerrado

- **WHEN** el usuario abre un operativo desde Historial
- **THEN** se muestran las encuestas enviadas, las respondidas y el CSAT promedio
- **AND** se muestran la fecha de cierre y el tipo de finalización
- **AND** se aclara que el cierre no generó la información para Analytics

### Requirement: Exportación manual de resultados

El sistema SHALL ofrecer al rol Controlador una exportación manual de resultados sobre operativos activos y finalizados, con selección de período, contenido y formato de archivo. Esta salida SHALL presentarse como herramienta de consulta o análisis externo y NO SHALL presentarse como sustituto del consumo automático de Analytics.

La existencia definitiva de esta función es una **hipótesis pendiente de validación** y el sistema SHALL indicarlo.

#### Scenario: Exportación por el Controlador

- **WHEN** un usuario Controlador solicita exportar los resultados de un operativo
- **THEN** puede elegir período, contenido y formato antes de confirmar
- **AND** el sistema aclara que la exportación no reemplaza el consumo automático de Analytics

#### Scenario: Rol sin exportación

- **WHEN** un usuario que no es Controlador abre el detalle de un operativo activo
- **THEN** la acción de exportar resultados no se ofrece
