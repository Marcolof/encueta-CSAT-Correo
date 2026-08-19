# Documentación funcional — Sistema CSAT

**Proyecto:** Sistema automatizado de envío y medición de encuestas CSAT  
**Referencia principal:** GDD-773 — Sistema de envío y medición de encuestas (Metodología CSAT)  
**Estado:** Borrador de trabajo  
**Fecha:** 13/08/2026  
**Objetivo del documento:** consolidar el entendimiento funcional actual para diseño UX, desarrollo y futuras validaciones con negocio.

---

## 1. Resumen

El sistema tiene como objetivo automatizar el envío y la medición de encuestas de satisfacción bajo metodología CSAT para entregas de Paquetería eCommerce de Correo Argentino.

La solución deberá integrarse con sistemas operativos de Correo Argentino para identificar eventos del ciclo de vida de un envío y utilizar esos eventos como disparadores funcionales de encuestas.

El canal inicial previsto es WhatsApp, mediante un proveedor/integrador externo.

Los resultados de las encuestas deberán quedar asociados al envío correspondiente y persistidos para su posterior consumo por Analytics/BI.

---

## 2. Problema actual

El proceso actual se realiza de forma mayormente manual:

1. Se seleccionan datos de envíos por período.
2. La información pasa por un proceso de normalización.
3. Los datos se entregan a un tercero.
4. El tercero realiza el envío de la encuesta.
5. Los resultados regresan a Correo Argentino.
6. Los resultados se almacenan/procesan para su análisis.

La nueva solución busca automatizar ese circuito y disponer de un backend permanente que permita ejecutar los operativos de encuestas sin depender de tareas manuales recurrentes.

---

## 3. Objetivos funcionales

- Automatizar la selección de casos elegibles.
- Disparar encuestas según eventos configurados del journey del envío.
- Enviar encuestas vía WhatsApp.
- Asociar cada encuesta a un ID de envío.
- Registrar estados de envío y respuesta.
- Persistir los resultados.
- Permitir que Marketing configure operativos de encuestas.
- Permitir seguimiento operativo.
- Disponibilizar información para Analytics/BI.
- Reducir la dependencia de archivos y tareas manuales.

---

## 4. Conceptos principales

### 4.1 Operativo de encuesta

Se entiende por **operativo** una configuración temporal que define qué población de envíos deberá ser evaluada, durante qué período, con qué reglas de selección y qué encuesta se utilizará.

Esta definición es una interpretación funcional utilizada para estructurar el front y debe validarse con negocio.

### 4.2 Evento T&T

T&T corresponde a **Track & Trace**, sistema de trazabilidad de envíos.

Los eventos T&T funcionan como disparadores de la encuesta. En la documentación actual aparecen, entre otros:

- `P0=1`: entrega efectiva en domicilio.
- `P0=3`: entrega efectiva en sucursal.

### 4.3 CSAT

La encuesta utiliza una escala configurable de 1 a 5.

Clasificación inicial documentada:

- **Promotor:** 4 y 5.
- **Detractor:** 1, 2 y 3.

La pregunta principal documentada es:

> ¿Cómo calificarías tu experiencia de entrega?

Dependiendo de la puntuación y del tipo de entrega, se realizan preguntas adicionales para identificar aspectos positivos o problemas.

---

## 5. Segmentos iniciales

Primera etapa documentada:

- Mercado Libre.
- MiCorreo.

Segunda etapa prevista:

- Otros clientes corporativos.

**Nota:** Mercado Libre se interpreta actualmente como un segmento/origen de envíos, no como una integración directa del sistema. Esto deberá confirmarse si la arquitectura evoluciona.

---

## 6. Estados de un operativo

### Borrador

- Estado inicial por defecto.
- No ejecuta encuestas.
- Puede editarse.
- Debe completar los campos obligatorios antes de poder lanzarse.

### Activo

- Operativo lanzado.
- Participa del proceso automatizado de selección y envío.
- Puede finalizar por fecha programada o manualmente.
- Los permisos de edición durante este estado están pendientes de definición.

### Finalizado

- Deja de incorporar nuevos casos.
- Se consulta desde Historial.
- Mantiene información de configuración, ejecución y resultados.

**Pendiente:** confirmar qué ocurre con respuestas que llegan luego del cierre del operativo.

---

## 7. Creación de un operativo

La creación inicial se plantea mediante un modal simple.

Campos iniciales:

- Nombre del operativo. **Obligatorio**
- Fecha de inicio. **Obligatorio**
- Fecha de finalización. **Obligatorio**

Al confirmar:

- se crea en estado **Borrador**;
- no se selecciona manualmente el estado;
- el usuario continúa la configuración desde el detalle del borrador.

---

## 8. Configuración de un borrador

### 8.1 Datos generales

- Nombre.
- Fecha de inicio.
- Fecha de finalización.

### 8.2 Público y segmentación

Campos propuestos en el wireframe:

- Origen / segmento.
- Región / provincia.
- Tipo de entrega.
- Evento T&T disparador.

Valores iniciales considerados:

**Origen / segmento**
- Mercado Libre.
- MiCorreo.

**Tipo de entrega**
- Entrega en domicilio.
- Entrega en sucursal.

**Eventos**
- P0=1 — Entrega efectiva en domicilio.
- P0=3 — Entrega efectiva en sucursal.

### 8.3 Muestreo

- Cantidad diaria.
- Límite total opcional.
- Frecuencia.

El documento establece una muestra estadística diaria segmentada por región según definición de Marketing.

**Pendiente crítico:** confirmar si Marketing define reglas de muestreo y el sistema selecciona los casos, o si Marketing continúa proporcionando una muestra mediante Excel.

### 8.4 Encuesta

- Plantilla.
- Escala.
- Pregunta principal.
- Preguntas condicionales según respuesta.

Actualmente el wireframe simplifica esta sección mediante una plantilla preconfigurada.

---

## 9. Lanzamiento de un operativo

Un borrador solo puede lanzarse cuando todos los campos obligatorios estén completos.

Acción:

**Lanzar operativo**

Resultado esperado:

`Borrador → Activo`

El sistema deberá impedir el lanzamiento cuando falte información obligatoria.

---

## 10. Finalización

Un operativo activo puede finalizar:

1. automáticamente por la fecha final configurada;
2. manualmente por un usuario con permisos.

### Finalización manual

Se propone modal con:

- confirmación de la acción;
- motivo de finalización opcional;
- botón **Finalizar operativo**.

Resultado esperado:

`Activo → Finalizado`

Al finalizar:

- deja de seleccionar nuevos casos;
- deja de generar nuevos envíos de encuesta;
- pasa a Historial.

Se eliminó de la propuesta la acción de “generar información para Analytics al finalizar”, ya que la arquitectura analizada sugiere persistencia continua de resultados.

---

## 11. Seguimiento de un operativo activo

Se propone que el detalle muestre indicadores operativos básicos.

### Indicadores acumulados

- Encuestas enviadas.
- Encuestas respondidas.
- Tasa de respuesta.

### Ejecución del día

- Muestra prevista.
- Casos seleccionados.
- Encuestas enviadas.
- Pendientes.
- Respuestas recibidas.
- Última ejecución.
- Próxima ejecución.

El objetivo es que el usuario pueda responder rápidamente:

> ¿El operativo está ejecutándose según lo previsto?

No se busca replicar un dashboard completo de BI dentro del backoffice.

---

## 12. Operativos — estructura de navegación

Dentro de **Operativos** existen cuatro tabs:

### Todos

- No tiene filtros.
- Solo muestra Activos y Borradores.
- Muestra hasta 3 registros por grupo.
- Si existen más registros, aparece:
  - **Ver más activos**
  - **Ver más borradores**
- Los botones llevan al tab correspondiente.

### Activos

- Lista completa de operativos activos.
- Puede incluir búsqueda y filtros.

### Borradores

- Lista completa de borradores.
- Puede incluir búsqueda y filtros.

### Historial

- Solo muestra operativos finalizados.
- Puede incluir búsqueda y filtros.
- No aparece mezclado con la actividad actual.

---

## 13. Usuarios y permisos — propuesta pendiente de validación

La documentación de origen no define roles funcionales ni administración de usuarios.

El mockup incorpora una propuesta para no dejar sin representar autenticación, acceso y permisos.

### Admin

Propuesta:

- gestionar usuarios;
- asignar roles;
- activar/inactivar accesos.

### Operador

Propuesta:

- crear operativos;
- editar borradores;
- lanzar operativos;
- consultar activos;
- finalizar operativos.

### Controlador

Definición actual del mockup:

- puede consultar todos los operativos;
- puede visualizar borradores;
- no puede modificar configuración;
- inputs, selects y acciones de gestión aparecen deshabilitados;
- puede consultar activos e historial.

**Pendiente:** validar si el Controlador necesita una exportación manual de resultados.

---

## 14. Login — mockup

Se representa un login con:

- Usuario / email.
- Contraseña.

Para el prototipo actual:

- no existe autenticación real;
- no se valida usuario;
- no se valida contraseña;
- los perfiles pueden seleccionarse libremente para demostrar el comportamiento del sistema.

En una implementación real deberá definirse si la autenticación se resuelve:

- dentro de la aplicación;
- mediante SSO;
- mediante Active Directory;
- mediante otro sistema corporativo.

---

## 15. Alta de usuario — mockup

Campos actuales:

- Nombre y apellido.
- Email.
- Contraseña.
- Rol.

No existen reglas reales de seguridad para contraseña en el prototipo.

La gestión de usuarios y roles es una propuesta UX y no un requerimiento confirmado del GDD-773.

---

## 16. Resultados y Analytics

Entendimiento actual:

- las respuestas recibidas se procesan en backend;
- se asocian al envío;
- se almacenan en una BD CSAT;
- Analytics/BI consume esos resultados de manera periódica.

Por este motivo, **finalizar un operativo no debería ser el momento en que se “entregan” los resultados**.

La finalización solo detiene la producción de nuevos casos.

Una exportación manual CSV/Excel puede existir como herramienta adicional, pero no debe confundirse con la integración automática hacia Analytics.

---

## 17. Trazabilidad mínima

Cada encuesta debería permitir asociar:

- ID de envío.
- Evento operativo.
- Fecha del evento.
- Fecha de envío de encuesta.
- Fecha de respuesta.
- Estado de encuesta.
- Respuesta CSAT.
- Comentarios / respuestas adicionales cuando correspondan.

Estados de encuesta mencionados en la documentación:

- enviada;
- respondida;
- expirada.

---

## 18. Reglas funcionales identificadas

1. Todo operativo nuevo nace como Borrador.
2. Un borrador no puede lanzarse si faltan campos obligatorios.
3. Un operativo finalizado no aparece en la vista general “Todos”.
4. Historial contiene únicamente finalizados.
5. El Controlador no puede editar configuración.
6. Marketing define la lógica de población/muestreo.
7. La muestra se ejecuta con una lógica diaria.
8. Las encuestas se asocian obligatoriamente a un ID de envío.
9. Los resultados deben persistirse.
10. El cierre manual no debe implicar necesariamente una exportación.
11. Mercado Libre y MiCorreo forman parte del alcance inicial.
12. WhatsApp es el canal inicial de encuestas.

---

## 19. Integraciones funcionales conocidas

- Track & Trace / T&T.
- Proveedor/integrador de WhatsApp.
- BD CSAT.
- Consumidor Analytics / Clixsense.
- WISE aparece en el documento funcional, pero su ubicación en la arquitectura actual está pendiente de validación.
- CRM / sistema de reclamos aparece como posible integración futura.

---

## 20. Fuera de alcance o no confirmado

No se consideran confirmados todavía:

- reglas definitivas de autenticación;
- roles definitivos;
- administración real de usuarios;
- políticas de contraseña;
- SSO / AD;
- permisos de edición sobre operativos activos;
- exportación manual requerida por Controlador;
- formato definitivo del dashboard;
- necesidad de cargar Excel;
- comportamiento de respuestas tardías;
- integración definitiva con WISE;
- frecuencia definitiva de consumo de Analytics;
- diseño visual final.

---

## 21. Preguntas pendientes para la próxima reunión

1. ¿Marketing define reglas de muestreo o continúa proporcionando una muestra mediante Excel?
2. ¿Analytics consume automáticamente la BD CSAT cada 15 minutos o existe alguna acción manual de exportación?
3. ¿Qué ocurre con respuestas que llegan después de finalizar un operativo?
4. ¿WISE sigue formando parte de la arquitectura y en qué punto del flujo interviene?
5. ¿Qué campos pueden modificarse una vez lanzado el operativo?
6. ¿Cómo se resolverán autenticación y autorización? ¿Los usuarios se administrarán dentro de esta aplicación o mediante un sistema corporativo existente?

---

## 22. Estado actual

**Nivel de definición funcional:** Medio / en relevamiento.

Existe suficiente información para construir:

- arquitectura de información preliminar;
- flujos principales;
- wireframes;
- mockup navegable.

No existe todavía suficiente definición para cerrar:

- seguridad;
- permisos;
- comportamiento completo de datos;
- arquitectura definitiva;
- diseño UI;
- criterios de edición de operativos activos;
- exportaciones/manual reporting.
