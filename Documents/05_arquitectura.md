# Arquitectura — Sistema CSAT

**Estado:** Preliminar / basada en GDD-773 + diagrama técnico revisado  
**Fecha:** 13/08/2026  
**Nivel de certeza:** Medio

---

## 1. Objetivo

Documentar el entendimiento actual de los componentes e intercambios de información que soportan el sistema CSAT.

Este documento no reemplaza una especificación técnica de arquitectura.

---

## 2. Vista conceptual

Flujo interpretado:

`T&T / fuentes operativas`
→ `ingesta / selección`
→ `backend CSAT`
→ `BD CSAT`
→ `proveedor WhatsApp`
→ `Webhook`
→ `BD CSAT`
→ `Analytics / Clixsense`

Existe además una tarea programada que ejecutaría parte del procesamiento de forma periódica.

---

## 3. T&T / Track & Trace

T&T corresponde a Track & Trace.

Función:

- proveer eventos del ciclo de vida del envío;
- permitir identificar casos elegibles.

Ejemplos documentados:

- P0=1 — entrega efectiva en domicilio.
- P0=3 — entrega efectiva en sucursal.

---

## 4. Ingesta

El diagrama técnico muestra una etapa de ingesta previa al backend.

Interpretación:

- extrae datos;
- prepara la muestra;
- entrega datos al backend.

El diagrama menciona un archivo Excel / muestra MKT.

**Pendiente crítico:** confirmar si esto representa el proceso definitivo o únicamente una etapa transitoria/manual.

---

## 5. Backend CSAT

El backend actúa como capa intermedia.

Responsabilidades interpretadas:

- recibir/obtener muestra;
- gestionar operativos;
- identificar pendientes;
- preparar envíos;
- comunicarse con proveedor WhatsApp;
- procesar respuestas;
- persistir resultados;
- exponer información a otros consumidores.

En el diagrama se distinguen:

### API Core

Procesamiento principal.

### Webhook Receiver

Recepción de eventos/respuestas provenientes del proveedor externo.

---

## 6. Proveedor WhatsApp

Canal externo responsable del envío de encuestas.

Flujo esperado:

1. backend envía datos al proveedor;
2. proveedor contacta al usuario vía WhatsApp;
3. usuario responde;
4. proveedor notifica la respuesta al Webhook Receiver.

**Pendiente:** proveedor definitivo, contrato técnico, plantillas y reglas de Meta.

---

## 7. Webhook

Función:

- recibir respuestas/eventos asíncronos;
- evitar polling constante del proveedor;
- asociar la respuesta con la encuesta/envío;
- actualizar persistencia.

Debe contar con:

- autenticación;
- validación de origen;
- manejo de reintentos;
- idempotencia;
- logging.

Estos puntos son lineamientos técnicos recomendados; no todos están detallados en el GDD.

---

## 8. BD CSAT

El diagrama muestra persistencia dedicada.

Entidades interpretadas:

- contactos;
- envíos;
- resultados.

La documentación funcional exige trazabilidad por ID de envío.

Información mínima esperable:

- identificador de envío;
- teléfono/contacto;
- operativo;
- evento;
- fechas;
- estado de encuesta;
- respuesta;
- comentarios.

---

## 9. Analytics / Clixsense

Entendimiento actual:

- consume resultados persistidos;
- consumo periódico;
- no depende del cierre del operativo.

El diagrama analizado menciona un consumo cada 15 minutos.

**Pendiente:** validar si 15 minutos es definitivo y si existe además exportación manual.

---

## 10. Tarea programada

El diagrama muestra una tarea programada.

Interpretación:

- ejecuta la selección/procesamiento de muestra;
- aplica una frecuencia diaria o periódica.

Esto coincide con la definición funcional de muestra diaria por región.

**Pendiente:** frecuencia técnica real y responsabilidades exactas del job.

---

## 11. Seguridad

El material funcional menciona validación de seguridad y accesos.

El diagrama técnico contempla exposición HTTPS y una capa de securización/API management.

Para el front todavía no se definió:

- login real;
- SSO;
- Active Directory;
- OAuth/OIDC;
- JWT;
- sesiones;
- políticas de contraseña;
- matriz de permisos.

Los roles del wireframe son una hipótesis de producto, no arquitectura confirmada.

---

## 12. WISE

WISE aparece en el GDD asociado a recuperación/asociación de información y normalización de teléfonos.

No aparece claramente representado en el diagrama técnico revisado.

Estado:

**Pendiente de validación.**

Preguntas:

- ¿sigue siendo parte del MVP?
- ¿el backend consulta WISE?
- ¿la información ya llega desde otra fuente?
- ¿se eliminó del diseño técnico?

---

## 13. Mercado Libre y MiCorreo

Se consideran segmentos iniciales.

No se observa actualmente una integración directa Mercado Libre → sistema CSAT en el diagrama revisado.

Esto refuerza la interpretación de que son atributos/segmentos de la población de envíos.

---

## 14. Normalización telefónica

El GDD exige normalización al formato internacional.

Ejemplo funcional:

`+54 9 ...`

La ubicación exacta del proceso debe definirse técnicamente.

Candidato lógico:

backend / capa de ingesta.

---

## 15. Estados técnicos de encuesta

La documentación menciona:

- enviada;
- respondida;
- expirada.

Sería conveniente contemplar también estados técnicos internos, aunque no necesariamente visibles al usuario:

- pendiente;
- procesando;
- error de envío;
- reintento;
- descartada.

**Estado:** recomendación, no requerimiento confirmado.

---

## 16. Observabilidad recomendada

No definida aún.

Para producción debería contemplarse:

- logs;
- métricas;
- trazabilidad por ID;
- alertas de integración;
- monitoreo de jobs;
- monitoreo de webhooks;
- auditoría;
- errores del proveedor.

---

## 17. Flujo funcional-técnico interpretado

### Lanzamiento

1. Operador lanza operativo.
2. Operativo queda activo.
3. Job evalúa período y reglas.
4. T&T provee casos elegibles.
5. Se aplica muestreo.
6. Se normalizan datos.
7. Se persiste/actualiza información.
8. Se envía al proveedor WhatsApp.

### Respuesta

1. Usuario responde.
2. Proveedor llama al webhook.
3. Backend valida.
4. Se asocia respuesta.
5. Se persiste resultado.
6. Analytics lo consume posteriormente.

### Cierre

1. Llega fecha final o se ejecuta cierre manual.
2. Operativo pasa a finalizado.
3. Se detiene selección de nuevos casos.
4. Los datos existentes permanecen persistidos.

**Pendiente:** política para respuestas tardías.

---

## 18. Decisiones técnicas todavía abiertas

- estrategia real de ingesta;
- Excel sí/no;
- frecuencia de job;
- frecuencia de Analytics;
- WISE;
- autenticación del front;
- autorización;
- proveedor WhatsApp;
- formato de persistencia;
- exportación manual;
- retención de datos;
- tratamiento de PII;
- auditoría;
- respuesta tardía;
- reintentos;
- edición de operativos activos.

---

## 19. Riesgos

- mala calidad de eventos T&T;
- teléfonos inválidos;
- inconsistencias entre encuesta e ID de envío;
- indisponibilidad del proveedor;
- duplicación de encuestas;
- fallos de webhook;
- desvío de muestra;
- discrepancias entre reglas de Marketing y selección real;
- seguridad de datos personales;
- falta de definición de permisos.

---

## 20. Próxima actualización

Actualizar este documento luego de la próxima reunión funcional y, si es posible, acompañarlo con:

- diagrama de secuencia;
- diagrama de componentes;
- modelo de datos;
- matriz de integraciones;
- contratos API.
