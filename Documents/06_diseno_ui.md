# Diseño UI — Sistema CSAT

**Estado:** En curso  
**Fecha:** 26/08/2026  
**Fase actual:** sistema de diseño implementado; validación visual con negocio pendiente.

> **Historial:** hasta el 13/08/2026 este documento estaba marcado como "PENDIENTE /
> No iniciado" y listaba tipografía, paleta, iconografía, spacing, radios y
> componentes como cosas por definir. Todas están definidas e implementadas. El
> documento se reescribió para reflejar el estado real.

---

## 1. Propósito

Describir el estado del diseño visual del producto: qué existe, dónde vive y qué
falta. Para los valores concretos (color, tipografía, medidas, anatomía de
componentes) el documento de referencia es
[`04_guia_estilos.md`](04_guia_estilos.md); acá se documenta el **sistema** y su
estado, no los tokens uno por uno.

---

## 2. Dónde vive el diseño

El sistema existe en dos lugares que se mantienen en paridad:

| | Código | Figma |
|---|---|---|
| **Tokens** | [`prototype/styles/tokens.css`](../prototype/styles/tokens.css) | Colecciones `Primitives`, `Color`, `Spacing`, `Radius`, `Typography` |
| **Componentes** | `prototype/components/*.css` | Board *Components*, 21 componentes |
| **Pantallas** | `prototype/index.html` | Sección *Claude Screens* |

**La fuente de verdad del comportamiento es el prototipo**, no Figma. Figma es la
superficie de diseño y de handoff: sirve para explorar y para documentar el sistema,
pero si las dos versiones difieren en cómo se comporta algo, manda el prototipo.

Los tokens sí se mantienen sincronizados en ambas direcciones, con una regla: una
variable de Figma declara un `var(--…)` sólo si esa propiedad existe y se usa
realmente en `tokens.css`.

---

## 3. Definiciones tomadas

Lo que en la etapa de wireframe figuraba como pendiente, hoy está resuelto:

- **Design system corporativo:** no se encontró un design system formal de Correo
  Argentino disponible para reutilizar. Se construyó uno propio, tomando la identidad
  de marca (amarillo `#ffce00`, navy `#152663`, logo) del sitio público y de la
  maqueta MiCorreo como referencia visual.
- **Tipografía:** Gilroy, con peso mínimo 600.
- **Paleta:** tres capas de tokens, con marca, escala de grises de 11 pasos y colores
  de estado. Detalle en `04_guia_estilos.md`.
- **Iconografía:** Lucide, como SVG inline heredando `currentColor`.
- **Spacing, radios y elevación:** escalas cerradas de 9, 6 y 3 pasos respectivamente.
- **Densidad:** controles de 42px de alto, ítems de navegación de 48px.

---

## 4. Librería de componentes

21 componentes en Figma, con variantes de estado, ligados a variables:

| Componente | Variantes |
|---|---|
| Input | Default · Hover · Focus · Filled · Error · Disabled |
| Select | Default · Hover · Focus · Selected · Disabled |
| Select Option | Default · Hover · Selected · Selected Hover · Disabled |
| Select Menu | — |
| Button | 5 variantes (Accent, Invert, Transparent, Ghost, Outline) × 3 estados |
| Filter Chip | Default · Hover · Focus · Active |
| Tab Item / Tabs | Default · Hover · Active |
| Table Row / Table | Header · Default · Hover |
| Pagination Page / Pagination | Default · Hover · Active |
| Badge | Info · Success · Warning · Neutral |
| Sidebar Option / Sidebar | Default · Hover · Active — Expanded · Collapsed |
| App Header | — |
| Burger Button | Default · Hover |
| Panel · Metric · Note · Modal | — |

**Fuera de la librería.** Tres casos distintos, que conviene no mezclar:

- **Existen en el prototipo pero no tienen componente en Figma:** `textarea` y el
  selector de fecha, que hoy usa el campo nativo `type="date"` — su apariencia la
  define el navegador, no el design system.
- **No existen en ningún lado:** tooltip.
- **Sólo queda CSS huérfano:** `.check-row` está declarado en `global.css` pero
  ningún marcado lo usa; no hay checkboxes en el prototipo. Es CSS muerto a limpiar.

---

## 5. Estados

### Estados de interacción implementados

`default`, `hover`, `focus`, `pressed`, `disabled` y `read-only` están implementados
en código y modelados en Figma (salvo `pressed` y `read-only`, que existen sólo en
código).

**No implementados:** `loading` y `error` de campo. El estado `Error` del componente
Input existe en Figma como **propuesta**, sin equivalente en el prototipo — la
validación de formularios todavía no está resuelta.

### Estados de producto

Representados hoy con píldora de estado y texto: **Borrador**, **Activo**,
**Finalizado**, y **modo solo lectura** para el perfil Controlador (campos
deshabilitados más aviso explícito).

Los estados **configuración incompleta**, **sin resultados**, **error de
integración**, **ejecución parcial** y **operativo sin casos elegibles** aparecen
descriptos en el documento funcional pero **no tienen tratamiento visual definido**.
Es la brecha más grande que le queda al diseño.

---

## 6. Responsive

El prototipo es **desktop-first** y contempla tres cortes:

- `1100px` — el login pasa a una columna; filtros y grillas se reducen; las tablas
  scrollean horizontalmente.
- `900px` — la sidebar pasa a horizontal y deja de contraerse; se oculta la identidad
  del usuario en el header.
- `600px` — padding reducido y grillas a una sola columna.

**Alcance real pendiente de confirmación con negocio.** Es un backoffice operativo y
no está validado que se use en mobile; los cortes existen para que no se rompa, no
porque haya un diseño mobile aprobado.

---

## 7. Accesibilidad

Ver el detalle en [`04_guia_estilos.md`](04_guia_estilos.md) § 8. Resumen: hay foco
visible, estados que no dependen sólo del color, atributos ARIA en los controles
compuestos y respeto por `prefers-reduced-motion`.

**Sin verificar:** contraste WCAG AA sobre la paleta completa, recorrido por teclado
de punta a punta y tamaños mínimos de área táctil.

---

## 8. Qué falta

1. **Validación visual con negocio.** El diseño no fue aprobado formalmente por el
   cliente; se construyó a partir de la identidad de marca existente.
2. **Tratamiento visual de los estados excepcionales** del punto 5.
3. **Validación de formularios**: mensajes de error, campos requeridos, estado
   `loading` de las acciones.
4. **Auditoría de accesibilidad.**
5. **Componentes faltantes en la librería**: textarea y selector de fecha (hoy nativo).
6. **Definir el alcance responsive real.**

Ninguno de estos puntos bloquea la validación funcional del prototipo, que es su
objetivo actual.
