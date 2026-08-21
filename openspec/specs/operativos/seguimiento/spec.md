# operativos/seguimiento Specification

## Purpose
Define qué información de seguimiento ofrece el backoffice sobre un operativo activo, para que el usuario pueda responder si el operativo se está ejecutando según lo previsto sin recurrir a un tablero de análisis externo.

## Requirements

### Requirement: Indicadores acumulados del operativo

El detalle de un operativo activo SHALL mostrar sus indicadores acumulados: encuestas enviadas, encuestas respondidas y tasa de respuesta.

#### Scenario: Consulta de indicadores

- **WHEN** el usuario abre el detalle de un operativo activo
- **THEN** se muestran las encuestas enviadas, las respondidas y la tasa de respuesta

### Requirement: Ejecución del día

El detalle de un operativo activo SHALL mostrar el estado de la ejecución diaria: muestra prevista, casos seleccionados, encuestas enviadas, pendientes de envío, respuestas recibidas, fecha y hora de la última ejecución y la próxima ejecución programada.

El alcance del seguimiento SHALL limitarse a responder si el operativo se ejecuta según lo previsto; el sistema NO SHALL replicar un tablero completo de inteligencia de negocio dentro del backoffice.

#### Scenario: Seguimiento de la ejecución diaria

- **WHEN** el usuario consulta la ejecución del día de un operativo activo
- **THEN** se muestran la muestra prevista, los casos seleccionados y las encuestas enviadas
- **AND** se muestran los envíos pendientes y las respuestas recibidas
- **AND** se muestran la última ejecución y la próxima ejecución programada

### Requirement: Configuración vigente en modo consulta

El detalle de un operativo activo SHALL mostrar la configuración con la que está corriendo — período, segmento, región, tipo de entrega, evento disparador, muestra diaria y plantilla — en modo consulta.

Qué campos pueden modificarse una vez lanzado el operativo está **pendiente de definición**.

#### Scenario: Consulta de la configuración vigente

- **WHEN** el usuario abre el detalle de un operativo activo
- **THEN** puede consultar la configuración con la que el operativo está corriendo

### Requirement: Aviso de cierre programado

El detalle de un operativo activo SHALL informar la fecha en la que finalizará automáticamente y SHALL aclarar que también puede finalizarse manualmente antes de esa fecha, describiendo el efecto del cierre.

El tratamiento de las respuestas que llegan después del cierre está **pendiente de validación** y el sistema SHALL presentarlo como tal.

#### Scenario: Información de cierre

- **WHEN** el usuario abre el detalle de un operativo activo
- **THEN** se informa la fecha de finalización automática
- **AND** se aclara que puede finalizarse manualmente antes de esa fecha
- **AND** el criterio sobre respuestas posteriores al cierre se presenta como pendiente de validación

### Requirement: Disponibilidad de resultados independiente del cierre

El sistema SHALL informar que los resultados se persisten durante la ejecución del operativo y que el sistema analítico los consume de forma periódica. Finalizar un operativo NO SHALL ser el momento en que los resultados se entregan a Analytics.

La frecuencia exacta de ese consumo está **pendiente de validación** y el sistema SHALL presentarla como tal.

#### Scenario: Consulta sobre la disponibilidad de resultados

- **WHEN** el usuario consulta un operativo activo
- **THEN** se informa que los resultados se almacenan y se consumen de forma periódica
- **AND** se aclara que no es necesario finalizar el operativo para disponibilizarlos
