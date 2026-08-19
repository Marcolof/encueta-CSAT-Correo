# Hand-off y roadmap — Sistema CSAT

**Estado:** Documento vivo  
**Fecha:** 13/08/2026  
**Fase actual:** Descubrimiento funcional + wireframe navegable

---

## 1. Objetivo

Este documento permite retomar el proyecto sin perder contexto, decisiones tomadas, hipótesis y pendientes.

---

## 2. Artefactos existentes

### Fuente funcional

- GDD-773 — Sistema de envío y medición de encuestas (Metodología CSAT).

### Arquitectura analizada

Diagrama técnico con:

- fuentes T&T / Clixsense;
- script de ingesta;
- backend / API Core;
- Webhook Receiver;
- BD CSAT;
- proveedor externo para WhatsApp;
- consumidor Clixsense / Analytics;
- tarea programada;
- exposición HTTPS / capa de seguridad.

### Wireframe navegable

Versión actual:

`csat_wireframe_backoffice_v6.html`

Características:

- blanco y negro;
- estilo wireframe;
- login falso;
- navegación por rol;
- operativos con tabs;
- creación de operativo por modal;
- detalle de borrador;
- detalle de activo;
- historial;
- lectura restringida para Controlador;
- gestión preliminar de usuarios para Admin.

---

## 3. Decisiones UX tomadas

### Operativos

Estados simplificados:

`Borrador → Activo → Finalizado`

### Creación

No existe “Crear operativo” como opción fija del sidebar.

Desde la pantalla Operativos:

`+ Crear operativo → Modal → Crear borrador`

### Vista Operativos

Tabs:

- Todos.
- Activos.
- Borradores.
- Historial.

Regla del tab Todos:

- sin filtros;
- solo Activos y Borradores;
- máximo 3 registros por grupo;
- “Ver más” navega al tab específico.

### Finalizados

No se mezclan con el trabajo actual.

Se encuentran únicamente en Historial.

### Finalización

Puede ser:

- programada por fecha final;
- manual.

La finalización manual no genera obligatoriamente un archivo para Analytics.

### Controlador

- ve todos los operativos;
- puede abrir borradores;
- los campos aparecen deshabilitados;
- no puede guardar, lanzar ni finalizar.

---

## 4. Hipótesis actuales

Estas decisiones existen para poder continuar el prototipo, pero no están confirmadas por negocio.

- Admin / Operador / Controlador como roles.
- Administración interna de usuarios.
- Contraseña administrada por la aplicación.
- Controlador con capacidad de exportación manual.
- Respuestas tardías aceptadas después del cierre.
- Selección automática de muestra basada en reglas.
- Métricas operativas visibles dentro del backoffice.
- Frecuencia de consumo de Analytics.

---

## 5. Riesgos de diseño actuales

### 5.1 Diseñar sobre una muestra incorrecta

El mayor riesgo es no saber todavía si:

- Marketing carga un Excel con la muestra;

o

- Marketing define reglas y el sistema construye la muestra automáticamente.

Este punto cambia significativamente el flujo de creación/configuración.

### 5.2 Sobrediseñar Analytics

La arquitectura sugiere que Analytics consume directamente resultados persistidos.

No conviene construir un dashboard BI completo hasta confirmar qué visualizaciones deben vivir dentro de este backoffice.

### 5.3 Inventar permisos

Los roles actuales son útiles para el mockup, pero podrían ser reemplazados por un esquema corporativo.

### 5.4 Seguridad

El GDD menciona seguridad y accesos, pero no define autenticación de usuarios.

Debe validarse antes de implementación.

---

## 6. Roadmap propuesto

### Fase 0 — Consolidación del relevamiento
**Estado:** En curso

- revisar GDD-773;
- analizar arquitectura;
- consolidar términos;
- registrar dudas;
- construir wireframe básico.

**Salida:** entendimiento funcional compartido.

---

### Fase 1 — Validación con negocio
**Estado:** Pendiente

Resolver:

1. reglas de muestreo vs Excel;
2. consumo de Analytics;
3. respuestas posteriores al cierre;
4. rol de WISE;
5. edición de activos;
6. autenticación, roles y usuarios.

**Salida:** reglas funcionales cerradas para MVP.

---

### Fase 2 — Arquitectura de información UX
**Estado:** Parcial

Cerrar:

- navegación;
- jerarquía de operativos;
- creación;
- detalle;
- historial;
- permisos;
- configuraciones;
- estados vacíos;
- errores;
- confirmaciones.

**Salida:** sitemap y flujos definitivos.

---

### Fase 3 — Wireframe de alta cobertura
**Estado:** Iniciado

Agregar:

- todos los estados de pantalla;
- casos vacíos;
- errores de integración;
- errores de validación;
- estados de carga;
- paginación;
- permisos;
- acciones destructivas;
- confirmaciones;
- variantes según rol.

**Salida:** prototipo funcional completo en baja fidelidad.

---

### Fase 4 — Diseño UI
**Estado:** Pendiente

No iniciar hasta contar con:

- lineamientos visuales aprobados;
- sistema de diseño / componentes;
- branding;
- comportamiento responsive;
- definición de accesibilidad.

**Salida:** mockup visual de alta fidelidad.

---

### Fase 5 — Validación UX / UAT temprana
**Estado:** Pendiente

- revisión con Marketing;
- revisión con usuarios operadores;
- validación de lenguaje;
- validación de acciones;
- validación de permisos;
- recorrido completo de operativo.

**Salida:** ajustes funcionales previos al desarrollo.

---

### Fase 6 — Hand-off a desarrollo
**Estado:** Pendiente

Entregar:

- documentación funcional;
- reglas;
- estados;
- permisos;
- prototipo;
- componentes;
- criterios de aceptación;
- casos de error;
- decisiones de arquitectura de información.

---

## 7. Próxima acción recomendada

Realizar la próxima reunión funcional usando las 6 preguntas abiertas como agenda mínima.

Luego actualizar:

1. `01_funcional.md`
2. `02_handoff_roadmap.md`
3. `03_ux.md`
4. `05_arquitectura.md`
5. wireframe HTML

El diseño UI debe permanecer en estado **Pendiente** hasta contar con definiciones visuales reales.

---

## 8. Criterio de mantenimiento

Cada decisión futura debe clasificarse como:

- **Confirmado**
- **Hipótesis**
- **Pendiente**
- **Descartado**

Evitar convertir una hipótesis del wireframe en requerimiento funcional sin validación.
