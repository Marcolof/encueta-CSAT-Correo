# Guía de estilos — Wireframe CSAT

**Estado:** Preliminar / Wireframe  
**Fecha:** 13/08/2026  
**Alcance:** únicamente baja fidelidad. No representa el diseño visual final.

---

## 1. Objetivo

Mantener una representación visual neutra que permita discutir:

- jerarquía;
- navegación;
- flujos;
- estados;
- permisos;
- densidad de información;

sin distraer la revisión con branding o decisiones estéticas definitivas.

---

## 2. Principio visual

**Blanco y negro, estilo wireframe.**

El diseño actual evita:

- colores de marca;
- sombras decorativas;
- gradientes;
- ilustraciones;
- iconografía compleja;
- efectos visuales innecesarios.

---

## 3. Paleta actual

### Fondo principal

`#FFFFFF`

### Texto principal / bordes fuertes

`#111111`

### Texto secundario

`#666666`

### Bordes secundarios

`#BDBDBD`

### Fondo de inputs deshabilitados

`#F3F3F3`

### Fondo neutro de headers/tablas

`#F7F7F7`

**Estado:** temporal.

---

## 4. Tipografía actual

Familia:

`Arial, Helvetica, sans-serif`

Uso exclusivo para wireframe.

Jerarquía aproximada:

- H1: 26 px.
- H2: 19 px.
- H3: 16 px.
- Base: 14 px.
- Texto auxiliar: 12 px.

**Pendiente:** tipografía oficial del producto.

---

## 5. Bordes

Wireframe actual:

- borde principal: `1px solid #111`;
- borde secundario: gris;
- componentes claramente delimitados;
- badges de estado con forma de píldora.

El borde funciona como principal recurso de agrupación.

---

## 6. Espaciado

Valores aproximados actuales:

- contenedor principal: 28 px;
- panel: 18 px;
- gap estándar: 10–16 px;
- padding de control: 9–10 px;
- separación vertical de paneles: 18 px.

**Estado:** no conforma todavía una escala de spacing formal.

---

## 7. Layout

### Desktop

Sidebar aproximado:

`220 px`

Contenido:

fluido.

### Formularios

- 2 columnas para grupos estándar;
- 3 columnas para métricas o campos cortos;
- colapsan a una columna en viewport reducido.

---

## 8. Botones

### Primario

- fondo negro;
- texto blanco;
- borde negro.

### Secundario

- fondo blanco;
- texto negro;
- borde negro.

### Deshabilitado

- opacidad reducida;
- cursor no interactivo.

**Pendiente:** estados hover, focus, pressed y loading definitivos.

---

## 9. Inputs

Wireframe:

- fondo blanco;
- borde negro;
- label visible arriba;
- ancho completo.

### Disabled

- fondo gris claro;
- texto gris;
- cursor no permitido.

Uso importante para perfil Controlador.

---

## 10. Tabs

Tab activo:

- fondo negro;
- texto blanco.

Tab inactivo:

- fondo blanco;
- texto negro;
- borde negro.

Tabs actuales:

- Todos;
- Activos;
- Borradores;
- Historial.

---

## 11. Tablas

- border-collapse;
- bordes visibles en todas las celdas;
- encabezado gris muy claro;
- acciones al final de la fila;
- alineación izquierda.

**Pendiente:** comportamiento para grandes volúmenes, sticky header, sorting y paginación.

---

## 12. Modales

Características actuales:

- backdrop oscuro semitransparente;
- caja blanca;
- borde negro;
- ancho aproximado máximo 620 px;
- header + cierre;
- acciones alineadas a la derecha.

Usos actuales:

- crear operativo;
- finalizar operativo;
- exportar resultados;
- crear usuario.

---

## 13. Estados

Actualmente se representan mediante texto + borde.

Ejemplos:

- Activo.
- Borrador.
- Finalizado.

No se asignaron colores semánticos deliberadamente.

---

## 14. Iconografía

Estado: **No definida**.

El wireframe utiliza texto y símbolos mínimos (`+`, `×`, `←`).

En UI final deberá definirse una librería de iconos y reglas de uso.

---

## 15. Accesibilidad visual

Pendiente para UI final:

- contraste WCAG;
- foco visible;
- tamaños mínimos de target;
- estados no basados solo en color;
- mensajes de error;
- disabled vs read-only.

---

## 16. Lo que NO debe interpretarse como diseño final

- Arial.
- sidebar de 220 px.
- blanco y negro.
- bordes negros.
- tamaños tipográficos.
- padding actual.
- estructura visual exacta de las tablas.
- botones negros.
- radios actuales.
- ausencia de iconos.

Todos estos elementos existen únicamente para sostener el wireframe.

---

## 17. Próxima etapa

Cuando exista definición UI:

1. identificar design system corporativo;
2. establecer tokens;
3. definir tipografía;
4. definir color;
5. establecer spacing;
6. diseñar componentes;
7. documentar estados;
8. validar accesibilidad;
9. reemplazar gradualmente esta guía.
