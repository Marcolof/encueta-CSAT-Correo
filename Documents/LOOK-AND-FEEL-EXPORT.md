# Look & feel — export para otro proyecto (HTML/CSS)

Extracto del sistema visual de MiCorreo pensado para **portar a un proyecto HTML
distinto**, no para documentar este repo. No es una calca 1:1 de
[`DESIGN-TOKENS.md`](DESIGN-TOKENS.md) (que mapea el CSS legacy → tokens de *este*
proyecto): acá lo que importa es el **criterio** — jerarquía de color, escalas de
tamaño, anatomía de botones — descripto de forma genérica para que sirva de base en
otro contexto, con nombres de variable neutros (no ligados a la marca "Correo").

Lo que **no** se incluye a propósito: nada de layout específico de pantallas, nada de
copy, nada de lógica de negocio. Es sólo el lenguaje visual: color, tipografía,
espaciado, radios, sombras y la anatomía de los componentes base (botón, campo,
badge, tab, modal).

---

## 1. Cómo pensar el color: 3 capas

No hay que copiar los hex sueltos — hay que copiar la **estructura de tres capas**,
que es lo que realmente sostiene la consistencia:

```txt
1. PRIMITIVE  → valor crudo, sin significado ("amarillo #ffce00", "gris 700")
2. SEMANTIC   → rol de uso ("color de marca", "texto atenuado", "superficie elevada")
3. COMPONENT  → uso puntual de un componente ("fondo de botón primario")
```

Un componente **nunca** debería usar un valor `primitive` directo. Si un botón usa
`--color-brand` (semantic) y no `#ffce00` (primitive), cambiar la marca es cambiar
una sola línea. Esta regla importa más que los valores en sí.

### Jerarquía de color observada

- **1 color de marca dominante** (amarillo, `#ffce00`) — se usa en fondos de botón
  primario, header, bordes de foco visual, estado activo de tabs/stepper. Es el color
  de **acción e identidad**, no de texto (el contraste amarillo/blanco es pobre).
- **1 color de marca "oscuro" de apoyo** (azul marino, `#152663`) — hace de
  contraste de texto sobre amarillo (`color-brand-contrast`), y también de color de
  **link/acento** en superficies claras. Funciona como el "texto sobre marca" y como
  segundo color de marca en su propio derecho (headers de nodo tipo "fin de flujo",
  iconografía).
- **Escala de grises de 9 pasos** para todo lo que no es marca: superficies (fondo de
  página vs. tarjeta vs. hundido), bordes, texto en 4 niveles de énfasis
  (primario/secundario/atenuado/deshabilitado).
- **3 colores de estado** (error/éxito/advertencia), cada uno con su propio par
  fondo+texto+borde — nunca se reusa el rojo de error para otra cosa.

**Regla de contraste implícita en el original:** el amarillo de marca casi nunca lleva
texto blanco encima — siempre azul marino. El azul marino sí lleva texto blanco. Es
una decisión de contraste, no estética: mantenerla al portar.

### Paleta primitiva

| Token | Valor | Uso típico |
|---|---|---|
| `--color-brand` | `#ffce00` | Fondo de botón primario, header, foco, activo |
| `--color-brand-dark` | `#152663` | Texto sobre marca, links, acento, footer/fin de flujo |
| `--gray-50` | `#fafafa` | Fondo de página |
| `--gray-100` | `#f2f2f2` | Superficie "hundida" (inputs de sólo lectura, fondo de sección) |
| `--gray-200` | `#eeeeee` | Riel de navegación, hover de fila de tabla |
| `--gray-300` | `#d9d9d9` | Fondo deshabilitado |
| `--gray-400` | `#cccccc` | Borde por defecto (inputs, cards) |
| `--gray-500` | `#afaeae` | Borde secundario / divisor sutil |
| `--gray-600` | `#8a8a8a` | Texto deshabilitado |
| `--gray-650` | `#79747e` | Texto "subtle" (subtítulos, footer) |
| `--gray-700` | `#49454f` | Texto atenuado (labels, ayuda) |
| `--gray-800` | `#212529` | Texto secundario |
| `--gray-900` | `#191919` | Texto primario (nunca negro puro) |
| `--white` | `#ffffff` | Superficie elevada (tarjetas, modales, campos) |
| `--red-100` / `--red-600` / `--red-700` | `#ffd0d0` / `#d32f2f` / `#ed143d` | Fondo / texto / texto fuerte de error |
| `--green-100` / `--green-700` | `#d1e7dd` / `#0f5132` | Fondo / texto de éxito |
| `--yellow-100` / `--yellow-900` | `#fff3cd` / `#664d03` | Fondo / texto de advertencia |
| `--blue-focus` | `#2196f3` | Borde de campo enfocado (deliberadamente distinto del azul de marca) |

### Capa semántica (la que realmente se consume)

```css
/* Marca */
--color-brand-contrast: var(--color-brand-dark);
--color-accent:         var(--color-brand-dark);

/* Superficies, de "más plana" a "más elevada" */
--surface-page:     var(--gray-50);   /* body */
--surface-sunken:   var(--gray-100);  /* hundida dentro de una card */
--surface-rail:     var(--gray-200);  /* navegación lateral */
--surface-raised:   var(--white);     /* tarjeta, modal, campo */
--surface-brand:    var(--color-brand);
--surface-disabled: var(--gray-300);

/* Texto — 4 niveles de énfasis, nunca más */
--text-primary:  var(--gray-900);
--text-secondary: var(--gray-800);
--text-muted:    var(--gray-700);
--text-subtle:   var(--gray-650);
--text-disabled: var(--gray-600);
--text-link:     var(--color-brand-dark);
--text-inverse:  var(--white);

/* Bordes */
--border-default: var(--gray-400);
--border-subtle:  var(--gray-200);
--border-strong:  var(--color-brand);
--border-focus:   var(--blue-focus);

/* Feedback */
--feedback-danger-bg: var(--red-100);
--feedback-danger-text: var(--red-600);
--feedback-success-bg: var(--green-100);
--feedback-success-text: var(--green-700);
--feedback-warning-bg: #fff3cd;
--feedback-warning-text: #664d03;
```

---

## 2. Tipografía

**Familia:** una sola familia variable con pesos numéricos (el original usa
"Gilroy", geométrica sans-serif tipo Poppins/Montserrat/Circular). Si el proyecto
destino no tiene esa fuente, elegir cualquier geométrica sans de peso similar —
**lo que importa es tener 4 pesos disponibles**, no la fuente exacta.

```css
--font-family-base: 'Gilroy', system-ui, -apple-system, 'Segoe UI', sans-serif;

--font-weight-regular:  400;
--font-weight-medium:   500;  /* peso BASE del cuerpo de texto, no 400 */
--font-weight-semibold: 600;  /* botones, headers de tabla, badges */
--font-weight-bold:     700;  /* énfasis fuerte, títulos */
```

Detalle no obvio: el cuerpo de texto usa **500 (medium)** como peso base, no 400.
Da un trazo ligeramente más firme sin llegar a semibold — vale la pena replicarlo,
es parte del "look" reconocible.

### Escala de tamaños (9 pasos, con uso)

| Token | rem / px | Uso |
|---|---|---|
| `--text-3xs` | 0.6875rem / 11px | Label flotante ya subido (encima del campo) |
| `--text-2xs` | 0.71rem / ~11px | Texto auxiliar mínimo |
| `--text-xs` | 0.75rem / 12px | Referencias, footer, texto editable inline |
| `--text-sm` | 0.875rem / 14px | Inputs, ítems de dropdown, valores de resumen |
| `--text-md` | 0.9375rem / 15px | Saludo/texto de header |
| `--text-base` | 1rem / 16px | Botones, cuerpo de texto por defecto |
| `--text-lg` | 1.25rem / 20px | Subtítulos |
| `--text-xl` | 1.375rem / 22px | Título de modal |
| `--text-2xl` | 1.5rem / 24px | Título de página |

Interlineado: `tight` 1.2 (títulos), `snug` 1.25 (botones, UI compacta), `normal` 1.5
(cuerpo de texto largo).

---

## 3. Escalas dimensionales

### Espaciado — base 4px

```css
--space-1: 0.25rem;  /* 4px  — gap mínimo (ícono + texto) */
--space-2: 0.5rem;   /* 8px  — gap entre elementos relacionados */
--space-3: 0.75rem;  /* 12px — padding interno de card chica */
--space-4: 1rem;     /* 16px — padding estándar */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px — separación entre secciones */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px — separación grande / alto mínimo de banner */
```

Todo espaciado sale de esta escala. Ningún `padding: 13px` suelto.

### Radios — 9 pasos, de "casi recto" a "circular"

```css
--radius-hairline: 1px;   /* casi sin redondeo, uso muy puntual */
--radius-xs: 5px;         /* inputs, tab superior */
--radius-sm: 6px;         /* mensajes de error, pills de label pequeñas */
--radius-md: 10px;        /* filas de tabla, cards internas */
--radius-lg: 15px;        /* mapas, bloques grandes */
--radius-xl: 25px;        /* modales, botones (redondeo "pill" visible pero no total) */
--radius-2xl: 30px;       /* bloques de acceso/login */
--radius-pill: 32px;      /* badges */
--radius-full: 50%;       /* círculos (avatar, dot de stepper) */
```

Lectura de jerarquía: **radio chico (5–10px) = elemento funcional/denso** (input,
fila de tabla). **Radio grande (25px+) = contenedor destacado** (modal, botón,
tarjeta de acceso). El salto de 10px a 25px es deliberado — no hay un paso intermedio
de "15px genérico" para componentes cotidianos.

### Bordes y sombras

```css
--border-width-thin: 1px;    /* default: inputs, cards */
--border-width-base: 2px;    /* botones, tabs */
--border-width-thick: 3px;   /* subrayado de botón terciario */
--border-width-strong: 4px;  /* conector de stepper */

--shadow-row: 0 2px 2px 1px rgba(195, 195, 195, 0.25);   /* elevación mínima: fila, card */
--shadow-dropdown: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);    /* dropdown, modal */
--shadow-inset-active: inset 0 3px 5px rgba(0, 0, 0, 0.125); /* botón presionado */
```

Sólo 2 niveles reales de elevación (`row` y `dropdown/modal`) — no hay una escala de
sombras de 5 pasos. Evitar sobre-diseñar esa parte al portar.

### Transiciones

```css
--transition-fast: 0.2s ease-out;
--transition-base: 0.2s ease-in-out;
```

Todo (hover de botón, apertura de acordeón, cambio de tab) usa 200ms. Nada más lento
— la UI se siente "inmediata" a propósito.

---

## 4. Botones — anatomía completa

Es el componente con más criterio de diseño explícito, vale la pena portarlo entero.

### Estructura base (aplica a toda variante/tamaño)

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 44px;                 /* --button-height */
  padding: 0.5rem 1.2rem;           /* y x — nunca simétrico */
  border: 2px solid transparent;    /* grosor reservado SIEMPRE, aunque no se vea */
  border-radius: 25px;              /* --radius-xl */
  font-size: 1rem;                  /* --text-base */
  font-weight: 600;                 /* --font-weight-semibold, no bold */
  line-height: 1.25;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
}
.button:active:not(:disabled) {
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); /* feedback de presión, sin mover el botón */
}
```

Detalle clave: el `border` está **siempre presente a 2px, transparente si no se usa**
— así ningún botón cambia de tamaño al pasar de una variante con borde visible a una
sin borde. Evita el "salto" clásico de layout en hover.

### Variantes (jerarquía de 4 niveles)

| Variante | Fondo | Texto | Borde | Cuándo usarla |
|---|---|---|---|---|
| **Primary** | marca sólido | contraste de marca | marca | 1 por pantalla — la acción principal |
| **Secondary** | blanco | contraste de marca | marca | Acción alternativa, mismo peso visual que primary pero "vacía" |
| **Tertiary** | transparente | contraste de marca | sólo `border-bottom` 3px | Acción de bajo compromiso, visualmente más liviana |
| **Link** | transparente | color de link | ninguno | Navegación / acción inline dentro de texto |

```css
/* Primary */
.btn-primary { background: var(--color-brand); color: var(--color-brand-contrast); border-color: var(--color-brand); }
.btn-primary:hover  { background: rgba(255,206,0,0.6); color: rgba(21,38,99,0.8); }
.btn-primary:disabled { background: var(--gray-300); color: var(--gray-600); border-color: var(--gray-300); }

/* Secondary */
.btn-secondary { background: var(--white); color: var(--color-brand-contrast); border-color: var(--color-brand); }
.btn-secondary:hover { border-color: rgba(255,206,0,0.6); }

/* Tertiary — SIN border-radius, sólo subrayado */
.btn-tertiary {
  background: transparent; color: var(--color-brand-contrast);
  border: none; border-bottom: 3px solid var(--color-brand);
  border-radius: 0; padding-inline: 0.9rem;
}

/* Link */
.btn-link { background: transparent; color: var(--text-link); border: none; min-height: auto; padding: 0 0.7rem; }
.btn-link:hover { text-decoration: underline; }
```

Regla de hover consistente en las 3 variantes con fondo: **el hover siempre baja la
opacidad del color de marca al ~60%** (`rgba(255,206,0,0.6)`), nunca usa un color de
hover distinto. Es un solo patrón, no cuatro.

### Tamaños

| Tamaño | Alto | Uso |
|---|---|---|
| `sm` | 32px, padding `4px 12px`, texto 14px | Acciones secundarias en espacios chicos |
| `md` (default) | 44px | Estándar |
| ancho fijo 124px | alto default | Botones "Atrás/Siguiente" de wizard — **ancho fijo, no por contenido**, para que no salten de tamaño entre pasos |

### Forma

Por defecto el botón es **pill** (`border-radius` propio en las 4 esquinas). Existe
una variante **square** (`border-radius: 0`) para cuando el redondeo lo aporta un
contenedor externo que recorta con `overflow: hidden` — por ejemplo un botón "Pagar"
pegado al fondo de una tarjeta, donde sólo las esquinas inferiores de la tarjeta
(no del botón) están redondeadas. Vale la pena portar esta idea: **el redondeo lo
decide quién es el borde visual real**, no siempre el propio botón.

---

## 5. Campos de formulario

```css
--field-height: 38px;
--field-padding: 10px;
--field-font-size: 0.875rem;   /* --text-sm */
--field-radius: 5px;           /* --radius-xs — más chico que el de un botón */
--field-bg: var(--surface-raised);
--field-border: 1px solid var(--border-default);
--field-border-focus: 1px solid var(--blue-focus); /* azul de foco, DISTINTO del azul de marca */
--field-text: var(--gray-900);
```

Patrón de **label flotante**: reposa centrado verticalmente dentro del campo cuando
está vacío; al enfocar o tener valor, sube y se achica (`0.875rem` → `0.6875rem`),
cambiando de color atenuado a azul de foco. El "notch" que corta el borde del campo
donde se posa el label necesita un fondo sólido detrás del texto (blanco sobre
tarjeta; degradado de dos colores si el campo está sobre el fondo gris de página, para
que la mitad de arriba del label matchee el fondo de página y la de abajo el campo).

---

## 6. Otros componentes de referencia

Útiles como banco de medidas al construir un componente nuevo con "el mismo aire":

```css
/* Chrome de aplicación */
--header-height: 60px;
--sidebar-rail-width: 61px;      /* barra angosta con sólo íconos */
--sidebar-drawer-width: 340px;   /* drawer expandido en mobile */
--avatar-size: 40px;
--icon-size-ui: 24px;            /* íconos utilitarios */
--icon-size-nav: 30px;           /* íconos de navegación lateral, más grandes a propósito */

/* Badge */
--badge-padding: 0.25rem 0.625rem;
--badge-radius: 32px;            /* --radius-pill */
--badge-font-size: 0.75rem;
--badge-font-weight: 600;

/* Tabs */
--tab-border-width: 2px;         /* subrayado del tab activo */
--tab-radius: 5px 5px 0 0;       /* sólo esquinas superiores */

/* Tabla */
--table-row-gap: 5px;            /* filas SEPARADAS, no un bloque continuo con líneas divisorias */
--table-radius: 10px;

/* Modal */
--modal-radius: 25px;
--modal-width-sm: 300px;
--modal-width-md: 500px;
--modal-width-lg: 800px;
```

Dos decisiones estructurales que vale la pena replicar aunque no se copien los
números exactos:

1. **Las filas de tabla van separadas por `gap`, con radio y sombra propios cada
   una** (`--table-row-gap` + `--table-radius` + `--shadow-row`) — no es una tabla
   con líneas divisorias, es una lista de "tarjetas fila".
2. **El ícono de navegación lateral es más grande que el ícono de UI genérico**
   (30px vs. 24px) — la navegación se trata como un elemento de mayor jerarquía
   visual, no como un ícono utilitario más.

---

## 7. Bloque CSS listo para copiar

Variables mínimas para arrancar un proyecto nuevo con este mismo lenguaje visual.
Reemplazar `--color-brand` / `--color-brand-dark` por la paleta real del proyecto
destino — todo lo demás (estructura de capas, escalas, radios) es reusable tal cual.

```css
:root {
  /* Marca — reemplazar por la paleta del proyecto destino */
  --color-brand: #ffce00;
  --color-brand-dark: #152663;

  /* Grises */
  --gray-50: #fafafa;
  --gray-100: #f2f2f2;
  --gray-200: #eeeeee;
  --gray-300: #d9d9d9;
  --gray-400: #cccccc;
  --gray-600: #8a8a8a;
  --gray-700: #49454f;
  --gray-900: #191919;
  --white: #ffffff;

  /* Semántico */
  --surface-page: var(--gray-50);
  --surface-raised: var(--white);
  --surface-sunken: var(--gray-100);
  --text-primary: var(--gray-900);
  --text-muted: var(--gray-700);
  --text-disabled: var(--gray-600);
  --border-default: var(--gray-400);

  /* Tipografía */
  --font-family-base: 'Gilroy', system-ui, sans-serif;
  --font-weight-base: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.375rem;

  /* Espaciado */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Radios */
  --radius-xs: 5px;
  --radius-md: 10px;
  --radius-xl: 25px;
  --radius-pill: 32px;
  --radius-full: 50%;

  /* Bordes y sombras */
  --border-width-base: 2px;
  --shadow-row: 0 2px 2px 1px rgba(195, 195, 195, 0.25);
  --shadow-dropdown: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

  /* Movimiento */
  --transition-base: 0.2s ease-in-out;

  /* Botón — anatomía de referencia */
  --button-height: 44px;
  --button-padding-x: 1.2rem;
  --button-padding-y: 0.5rem;
  --button-radius: var(--radius-xl);
  --button-font-weight: var(--font-weight-semibold);
}
```

---

**Fuente:** extraído de [`src/styles/tokens.css`](../src/styles/tokens.css) y
[`src/shared/ui/Button`](../src/shared/ui/Button) de este proyecto (MiCorreo /
Correo Argentino), 2026-08-18. Pensado como punto de partida — no como copia
literal — para un proyecto HTML distinto.
