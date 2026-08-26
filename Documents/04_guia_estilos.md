# Guía de estilos — Sistema CSAT

**Estado:** Vigente  
**Fecha:** 26/08/2026  
**Alcance:** el lenguaje visual real del prototipo navegable.

> **Historial:** hasta el 13/08/2026 este documento describía un wireframe en blanco
> y negro (Arial, bordes negros, sin color de marca ni iconografía). Esa etapa
> terminó: el prototipo tiene hoy identidad visual de Correo Argentino, sistema de
> tokens y librería de componentes. Este documento se reescribió por completo para
> reflejarlo.

---

## 1. Objetivo

Documentar el lenguaje visual que ya está implementado, para que cualquier pantalla
nueva se construya con los mismos valores en vez de inventar los suyos.

La fuente de verdad es [`prototype/styles/tokens.css`](../prototype/styles/tokens.css).
Si un valor de este documento y el del archivo no coinciden, **manda el archivo** —
y hay que corregir el documento.

---

## 2. Principio: nada se hardcodea

El color, la tipografía, el espaciado y los radios salen siempre de un token. No debe
existir un `#ffce00` ni un `padding: 13px` suelto dentro de un componente.

Los tokens están organizados en **tres capas**:

```txt
1. PRIMITIVE  → valor crudo, sin significado    (--gray-400: #cccccc)
2. SEMANTIC   → rol de uso                      (--border-default: var(--gray-400))
3. COMPONENT  → el componente consume el semantic
```

Un componente nunca debería usar un primitive directo. Dos colores parecidos con
intención distinta comparten primitive pero son **dos tokens distintos** — por
ejemplo `--color-hover-soft` y `--status-bg`, ambos sobre `--blue-50`.

---

## 3. Color

### Marca

| Token | Valor | Uso |
|---|---|---|
| `--color-brand` | `#ffce00` | Header de aplicación, botón acento, chips de paso |
| `--color-brand-hover` | `#eabb00` | Hover del botón acento |
| `--color-brand-dark` | `#152663` | Texto sobre amarillo, botón invertido, ítem de nav activo, fondo del login |
| `--color-brand-dark-soft` | `#22346f` | Variante suave del navy |
| `--color-brand-dark-hover` | `#263b7f` | Hover del botón invertido |

**Regla de contraste:** el amarillo nunca lleva texto blanco — siempre navy. El navy
sí lleva texto blanco. Es una decisión de legibilidad, no estética.

### Grises y texto

Escala de 11 pasos (`--gray-50` a `--gray-900`, más `--gray-650`), consumida por
semánticos de superficie, borde y texto:

```css
--surface-page:   var(--global-bg);   /* #fafafa — fondo de página */
--surface-raised: var(--white);       /* tarjeta, panel, modal, campo */
--surface-sunken: var(--gray-100);    /* hundido dentro de una card */
--surface-rail:   var(--gray-200);    /* riel de navegación */
--surface-translucent: var(--white-alpha-15); /* sobre fondo oscuro */

--text-primary:   var(--gray-900);    /* #191919 — nunca negro puro */
--text-secondary: var(--gray-800);    /* labels de campo */
--text-muted:     var(--gray-700);    /* texto de ayuda */
--text-subtle:    var(--gray-650);    /* footer */
--text-disabled:  var(--gray-600);
--text-on-dark:   var(--white);

--border-default: var(--gray-400);    /* inputs, cards */
--border-subtle:  var(--gray-200);    /* divisores de tabla */
--border-card:    #dfe3ea;            /* borde de panel */
--border-hover:   #cbd1dd;
```

`--text-base` (`#111827`) es el color de cuerpo del `body`, y `--text-caption`
(`#566174`) el de `.muted`.

### Estado y feedback

| Token | Valor | Uso |
|---|---|---|
| `--color-focus` | `#2196f3` | Borde de campo enfocado (deliberadamente distinto del navy de marca) |
| `--color-success` | `#10b981` | Indicador de éxito |
| `--status-bg` / `--status-text` | `#eef2ff` / `#2563d9` | Píldora de estado (Activo, Borrador, Finalizado) |
| `--color-info-bg` / `--color-info-border` / `--color-info-text` | `#fffaf0` / `#f6cf55` / `#9a3f0a` | Bloque de nota informativa |
| `--color-warning-text` | `#9a3f0a` | Mensaje de "sin resultados" en filtros |

### Superficie semitransparente

`--white-alpha-15` (`rgba(255,255,255,.15)`) → `--surface-translucent`. Se usa para
bloques apoyados sobre el navy, como la píldora de pasos del login. El alfa va en el
**color**, no en la opacidad del nodo: bajar la opacidad del elemento lavaría también
su contenido.

---

## 4. Tipografía

**Familia:** Gilroy (`--font-family-base`), con fallback a `system-ui`. Se cargan tres
cortes por `@font-face`: SemiBold (600), Bold (700) y Heavy (800–900).

**Peso mínimo 600.** El cuerpo de texto usa SemiBold, no Regular — es parte del look
reconocible del proyecto y no debe "corregirse" a 400.

```css
--font-weight-min:  600;   /* cuerpo, labels, botones */
--font-weight-bold: 700;   /* títulos, énfasis */
```

### Escala de tamaños

| Token | rem / px | Uso |
|---|---|---|
| `--font-size-sm` | 0.8125rem / 13px | Labels de campo, texto de ayuda |
| `--font-size-base` | 0.875rem / 14px | Cuerpo, inputs, celdas de tabla |
| `--font-size-lg` | 1rem / 16px | Subtítulo destacado, intro de card |
| `--font-size-display` | 2.625rem / 42px | Título de la pantalla de acceso |

Los títulos de pantalla interna usan la escala de `global.css`: `h1` 2rem, `h2`
1.35rem, `h3` 1rem. El paso `display` es exclusivo del login: si aparece dos veces en
la misma vista, está mal usado.

Interlineado: 1.2 en títulos, 1.5 en cuerpo.

---

## 5. Escalas dimensionales

### Espaciado — base 4px

```css
--space-1: .25rem;  /*  4px */   --space-6:  1.5rem;  /* 24px */
--space-2: .5rem;   /*  8px */   --space-8:  2rem;    /* 32px */
--space-3: .75rem;  /* 12px */   --space-10: 2.5rem;  /* 40px */
--space-4: 1rem;    /* 16px */   --space-12: 3rem;    /* 48px */
--space-5: 1.25rem; /* 20px */
```

### Radios

```css
--radius-xs:   5px;   /* inputs, selects */
--radius-sm:   6px;
--radius-md:  10px;   /* botones, tabs, paneles internos */
--radius-lg:  15px;   /* paneles, modal */
--radius-xl:  25px;   /* card de login */
--radius-pill: 32px;  /* badges, chips, píldoras de estado */
```

Lectura de jerarquía: radio chico (5–10px) = elemento funcional y denso; radio grande
(15–25px) = contenedor destacado.

### Sombras

```css
--shadow-row:      0 2px 2px 1px rgba(195,195,195,.25);
--shadow-dropdown: 0 .5rem 1rem rgba(0,0,0,.15);
--shadow-card:     0 2px 8px rgba(21,38,99,.04);
```

Tres niveles y no más. La sombra de card es navy con alfa muy bajo, no gris neutro.

### Layout y movimiento

```css
--sidebar-width: 240px;            --topbar-height: 72px;
--sidebar-width-collapsed: 76px;
--transition-base: .2s ease-in-out;                    /* hover, foco */
--transition-nav:  .26s cubic-bezier(.4,0,.2,1);       /* contraer navegación */
```

---

## 6. Componentes

### Botón

Base común a todas las variantes:

```css
min-height: 42px;
padding: .65rem 1.15rem;
border: 1px solid transparent;   /* reservado siempre, aunque no se vea */
border-radius: var(--radius-md);
font-size: .9375rem;  font-weight: 600;  line-height: 1.2;
```

El borde de 1px está **siempre presente, transparente si no se usa**: así ninguna
variante cambia de tamaño respecto de otra y no hay salto de layout en hover.

| Variante | Fondo | Texto | Uso |
|---|---|---|---|
| `--accent` | amarillo de marca | navy | Acción principal |
| `--invert` | navy | blanco | Acción principal sobre fondo claro, submit del login |
| `--transparent` | transparente | navy | Acción secundaria |
| `--ghost` | `--gray-100` | navy | Acción terciaria, 36px de alto |
| `--outline` | blanco + borde | navy | Acción en barra de filtros |
| `--square` | blanco, 42×42 | navy | Botón de sólo ícono |
| `--nav-item` | transparente, 48px | navy | Ítem de navegación lateral |

Estados transversales: `:hover` cambia fondo y borde; `:active` aplica
`inset 0 3px 5px rgba(0,0,0,.12)` (feedback de presión sin mover el botón);
`:focus-visible` dibuja `outline: 3px solid rgba(33,150,243,.3)`; `:disabled` va a
`--gray-100` con texto `--gray-500` y `cursor: not-allowed`.

### Campos

```css
min-height: 42px;  padding: 10px 12px;
border: 1px solid var(--border-default);
border-radius: var(--radius-xs);
font-size: .875rem;  font-weight: 600;
```

Label arriba del campo (13px, `--text-secondary`), texto de ayuda debajo
(`--text-muted`). Al enfocar, el borde pasa a `--color-focus` y se agrega un halo de
`3px rgba(33,150,243,.12)`. Deshabilitado: fondo `--gray-100`, borde `--gray-300`.

El campo de contraseña incluye un botón de mostrar/ocultar con íconos `eye` /
`eye-off` y `aria-pressed`.

### Tabs

Píldoras horizontales con `--radius-md`, sin subrayado. Inactivo: transparente con
texto `--text-muted`. Activo: fondo navy con texto blanco. Hover del inactivo: fondo
blanco y texto navy.

### Tabla

Bordes separados con `border-collapse: separate` y `overflow: hidden` sobre
`--radius-md`. Encabezado con fondo `--table-header-bg` (`#f1f3f6`) y texto
`--table-header-text` (`#4d586b`). Divisor inferior `--border-subtle`, sin bordes
verticales. Hover de fila: `--table-row-hover`. Acciones alineadas a la derecha.

### Modal

Backdrop `rgba(8,18,50,.55)` con `backdrop-filter: blur(2px)`. Caja blanca de
`min(620px, 100%)`, `--radius-lg`, sombra `--shadow-dropdown`, header con título y
cierre, acciones alineadas a la derecha.

### Navegación

Header amarillo de 72px con botón hamburguesa, logo, título y usuario. Sidebar clara
(`--sidebar-bg` `#f1f2f4`) de 240px que se contrae a 76px mostrando sólo íconos; la
etiqueta colapsa su ancho en vez de ocultarse, para que la transición no salte.

### Estados de producto

Píldora `--radius-pill` con `--status-bg` / `--status-text`. Los estados **Borrador**,
**Activo** y **Finalizado** se distinguen por texto, no sólo por color.

---

## 7. Iconografía

**Librería: Lucide.** Se insertan como **SVG inline** para que hereden `currentColor`
y acompañen el color del componente que los contiene.

```css
.lucide-icon { width:20px; height:20px; fill:none; stroke:currentColor;
               stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
```

24px en el botón hamburguesa, 19px en el toggle de contraseña, 18px en enlaces de
sección. No mezclar con otras librerías ni usar íconos rellenos.

---

## 8. Accesibilidad

Implementado hoy:

- `:focus-visible` visible en botones y campos, con `outline-offset`.
- Los estados de producto se leen por texto, no sólo por color.
- El botón hamburguesa expone `aria-expanded` y `aria-label`; el toggle de contraseña,
  `aria-pressed`.
- `@media (prefers-reduced-motion: reduce)` desactiva las transiciones de navegación.
- Campos deshabilitados con `cursor: not-allowed` y contraste propio.

**Pendiente de validación:** auditoría formal de contraste WCAG AA sobre la paleta,
recorrido completo por teclado y tamaños mínimos de área táctil. No están verificados.

---

## 9. Correspondencia con Figma

Los tokens de este documento existen también como **variables de Figma**, en las
colecciones `Primitives`, `Color`, `Spacing`, `Radius` y `Typography`. Cada variable
declara en su `codeSyntax` la variable CSS real que le corresponde.

Regla de sincronización: una variable de Figma sólo declara un `var(--…)` si esa
propiedad **existe y se usa** en `tokens.css`. Un valor que en código es un literal
suelto no debe inventar un token en Figma, y una propuesta de diseño todavía no
implementada se marca como tal en la descripción de la variable.
