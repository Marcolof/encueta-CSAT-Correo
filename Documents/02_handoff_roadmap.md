# Hand-off y roadmap — Sistema CSAT

**Estado:** Documento vivo  
**Fecha:** 21/08/2026 (última actualización 31/08/2026)  
**Fase actual:** Prototipo de media fidelidad con dirección visual aplicada + línea base de specs

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

### Prototipo navegable

Ruta actual:

`prototype/index.html`

Reemplaza al wireframe en blanco y negro `csat_wireframe_backoffice_v6.html`, que queda obsoleto.

Características funcionales:

- login falso;
- navegación por rol;
- operativos con tabs;
- creación de operativo por modal;
- detalle de borrador;
- detalle de activo;
- historial;
- lectura restringida para Controlador;
- gestión preliminar de usuarios para Admin;
- deep-links `?goto=rol.vista[.variante]` para posicionar una vista sin interacción.

Características técnicas:

- HTML/CSS/JS sin build ni dependencias;
- tokens y componentes propios en `prototype/styles/` y `prototype/components/`;
- fuentes Gilroy locales, sin recursos externos.

### Hub del proyecto

`index.html` en la raíz, con cuatro accesos: prototipo, flujo de navegación, presentación y documentación.

- `hub/flujo.html` — cuadro de navegación por rol.
- `hub/presentacion.html` — instructivo de navegación de 18 slides. Las 10 pantallas que muestra
  **no son imágenes**: son iframes del prototipo real, escalados desde 1440×900 y con
  `pointer-events: none`. Se actualizan solos cuando cambia el prototipo.
- `hub/docs/` — versión HTML de estos documentos, generada con `node tools/md2html.js`.

### Línea base de specs (OpenSpec)

OpenSpec inicializado en el proyecto (schema `spec-driven`, integración con Claude Code).

Change activo: `documentar-backoffice-csat` — documenta el comportamiento **existente** del
backoffice en siete capabilities: `acceso-y-roles`, `operativos/listado`, `operativos/creacion`,
`operativos/configuracion-y-lanzamiento`, `operativos/seguimiento`,
`operativos/finalizacion-e-historial` y `usuarios-y-roles`.

Estado: propuesta y specs escritas, `openspec validate --strict` en verde.
**Pendiente de archivar** para consolidar en `openspec/specs/`.

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

- ve operativos Activos e Historial, en modo solo lectura;
- **no ve Borradores**: el tab no está disponible y el grupo "Borradores" tampoco aparece en el resumen del tab Todos (decisión 31/08/2026, revierte lo documentado antes);
- si abre el detalle de un operativo activo, los campos aparecen deshabilitados;
- no puede guardar, lanzar ni finalizar.

---

## 3.bis Decisiones de dirección visual — 21/08/2026

**Confirmado:** el proyecto se alinea al design system corporativo. Pedido de negocio.

Esto cierra la etapa de wireframe en blanco y negro: el prototipo pasa a media fidelidad con
la paleta amarillo `#ffce00` / azul marino `#152663`, tipografía Gilroy y componentes propios.

### Shell de la aplicación — cambio estructural

Reemplaza el layout anterior (sidebar navy flotante con logo arriba y usuario abajo):

- **Barra superior nueva**, antes inexistente: banda amarilla full-width de 72px, sticky, con
  hamburguesa, logo, título de la aplicación y usuario a la derecha (avatar con inicial +
  nombre + rol).
- **Sidebar invertida a fondo claro** (`#f1f2f4`), 240px, pegada al borde, sin logo ni bloque de
  usuario: solo navegación y "Cerrar sesión" al pie.
- **Item activo**: pill navy sólido sobre fondo claro. Se elimina el marcador amarillo lateral.
- **Contracción a solo iconos** (240px → 76px) desde la hamburguesa, con transición de 260ms.

### Criterios de interacción adoptados

- **Área tocable completa en los controles.** El chip de filtro pasó a ser un único botón que
  abarca todo el pill —etiqueta incluida— en lugar de tener el área activa limitada al valor y
  al chevron. Un solo control focusable por chip.
- **Transiciones interpoladas, sin saltos.** Se anima `grid-template-columns` en vez de la
  variable de ancho (las custom properties no interpolan), y los textos colapsan su ancho en
  lugar de usar `display: none`. Incluye `prefers-reduced-motion`.

### Deuda técnica registrada

- `prototype/index.html` conserva un bloque de estilos wireframe legado (Arial, bordes negros,
  estilos de login) que compite con el design system. Se le quitó el pintado de botones; el
  resto sigue activo. **Pendiente de limpieza.**
- Los `<button>` necesitan `appearance: none` explícito en `.ui-button`: sin eso el widget
  nativo del navegador pinta por encima del design system. Ya aplicado.
- El nombre del producto aparece de dos formas: "Sistema CSAT · Backoffice" en el hub y la
  presentación, y "Gestión de Operativos CSAT" en el header. **Pendiente de unificar.**

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
**Estado:** Completada — 21/08/2026

- revisar GDD-773;
- analizar arquitectura;
- consolidar términos;
- registrar dudas;
- construir wireframe básico;
- dejar el comportamiento existente escrito como specs verificables (OpenSpec).

**Salida:** entendimiento funcional compartido, con la línea base de comportamiento
documentada en el change `documentar-backoffice-csat`.

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
**Estado:** En curso desde el 21/08/2026

Se inició por pedido de negocio de alinear el producto al design system corporativo. La condición
de "no iniciar hasta tener lineamientos visuales aprobados" quedó satisfecha por esa definición.

Hecho:

- dirección visual aplicada a todas las vistas existentes;
- tokens, componentes y variantes de botón propios;
- shell rediseñado: barra superior amarilla + sidebar clara contraíble;
- criterio de área tocable completa en controles compuestos;
- transiciones y `prefers-reduced-motion`.

Pendiente:

- revisión de accesibilidad con criterio explícito (contraste, foco visible, orden de tabulación);
- comportamiento responsive por debajo de 700px;
- estados vacíos, de carga y de error con tratamiento visual;
- limpieza del bloque de estilos legado;
- unificación del nombre del producto.

**Salida:** prototipo de media/alta fidelidad alineado al design system.

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

**Bloqueante del proyecto:** realizar la reunión funcional usando las 6 preguntas abiertas de
`01_funcional.md` como agenda mínima. Ninguna de las seis se resolvió todavía, y la primera
—reglas de muestreo contra carga de Excel— sigue siendo la que puede invalidar el flujo de
creación completo.

**Acciones inmediatas, sin dependencias externas:**

1. archivar el change `documentar-backoffice-csat` para consolidar `openspec/specs/`;
2. limpiar el bloque de estilos legado de `prototype/index.html`;
3. unificar el nombre del producto entre hub, presentación y header;
4. revisar accesibilidad del shell nuevo (contraste sobre amarillo, foco visible, tabulación).

Luego de la reunión, actualizar:

1. `01_funcional.md`
2. `02_handoff_roadmap.md`
3. `03_ux.md`
4. `05_arquitectura.md`
5. specs de OpenSpec afectadas
6. prototipo

El diseño UI **ya no está en pausa**: la definición de alinearse al design system corporativo
habilitó la Fase 4. Lo que sigue pendiente es la validación de accesibilidad y responsive.

---

## 7.bis Registro de cambios

### 31/08/2026

- **Se retira el acceso del Controlador a Borradores** (decisión de producto). Hasta ahora
  el Controlador podía consultar borradores en modo solo lectura; ese acceso se elimina.
  El tab "Borradores" y su grupo dentro del resumen "Todos" quedan ocultos para ese rol.
  Actualizado en el prototipo (`configureNavigation()` en `prototype/index.html`), en
  `openspec/specs/acceso-y-roles/spec.md` (requisito "Consulta del Controlador") y en
  `openspec/specs/usuarios-y-roles/spec.md` (alcance del rol). La vista de detalle de un
  borrador ya no es alcanzable por el Controlador desde la navegación normal.

### 21/08/2026

- **OpenSpec incorporado al proyecto.** Inicializado con schema `spec-driven`. Change
  `documentar-backoffice-csat` con siete capabilities que documentan el comportamiento
  existente. Validado en estricto, sin archivar.
- **Dirección visual alineada al design system corporativo** (pedido de negocio). Cierra la
  etapa de wireframe en blanco y negro.
- **Shell rediseñado.** Barra superior amarilla nueva; sidebar invertida a fondo claro, 240px;
  item activo como pill navy; contracción a solo iconos con transición de 260ms.
- **Chip de filtro:** el área tocable pasó a ser todo el pill, con un único control focusable.
- **Corrección de base:** `appearance: none` en `.ui-button`, sin lo cual el widget nativo del
  navegador pinta por encima del design system.
- **Documentación:** hub con cuatro accesos y presentación de 18 slides que refleja el
  prototipo en vivo, por lo que absorbió el rediseño sin edición.
- Deuda registrada: bloque de estilos legado, doble nombre del producto.

---

## 8. Criterio de mantenimiento

Cada decisión futura debe clasificarse como:

- **Confirmado**
- **Hipótesis**
- **Pendiente**
- **Descartado**

Evitar convertir una hipótesis del prototipo en requerimiento funcional sin validación.

Esto aplica también a las specs de OpenSpec: describen el comportamiento **actual del
prototipo**, no comportamiento aprobado por negocio. Lo que allí figura como "pendiente de
definición" o "pendiente de validación" debe seguir marcado así hasta que exista una decisión.
