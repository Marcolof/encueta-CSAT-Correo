# Estructura del proyecto "Sistema CSAT" — explicación para replicar

Documento de referencia para explicarle a otra IA / otro proyecto cómo está armado
esto y cómo se trabaja. Proyecto real: backoffice de encuestas de satisfacción
(CSAT) para Correo Argentino.

---

## 1. Qué tipo de proyecto es

Sitio **estático puro**: HTML + CSS + JavaScript clásico.

- **No hay build.** No hay `package.json`, ni bundler, ni framework, ni npm install.
- **No hay backend.** Los datos son de ejemplo, hardcodeados en el JS del prototipo.
- Todo el sitio se puede abrir con **doble clic sobre `index.html`** y funciona
  igual que en el servidor (por eso el JS es clásico, sin `import`/`export` de
  módulos ES: los módulos ES no funcionan vía `file://`).
- Node solo se usa para **dos scripts de utilidad** (ver punto 5), nunca para servir
  el sitio en producción.

Esta decisión es central: hace que el proyecto sea trivialmente compartible,
versionable y desplegable, y que cualquiera pueda abrirlo sin instalar nada.

---

## 2. Qué es el "Hub"

El **Hub** es la portada del proyecto: un `index.html` en la raíz que funciona como
**punto de entrada único** a todo el material. En vez de mandarle al cliente cinco
links sueltos (el prototipo por un lado, el PDF por otro, el diagrama por otro), se
le manda **una sola URL** y desde ahí navega todo.

El Hub es literalmente una página con:
- Header con logo del cliente + título del proyecto.
- Un "hero" con el estado del proyecto (ej: `Borrador · En relevamiento`).
- Un **grid de tarjetas numeradas** (01, 02, 03, 04), una por módulo.
- Footer con la referencia funcional (ticket/épica del proyecto).

Cada tarjeta es un `<a class="hub-card">` con: número, ícono SVG inline, título,
descripción, un tag (`Interactivo`, `Diagrama`, `Slides`, `7 documentos`) y un
"Ver más →".

### Los 4 módulos del Hub

| # | Módulo | Archivo | Qué es |
|---|--------|---------|--------|
| 01 | **Prototipo navegable** | `prototype/index.html` | La maqueta funcional real, clickeable. Login por rol, listados, tabs, modales, ABM. Es la fuente de verdad del comportamiento. |
| 02 | **Flujo de navegación** | `hub/flujo.html` | Diagrama de todas las pantallas, tabs y modales y cómo se relacionan, organizado por rol. |
| 03 | **Presentación** | `hub/presentacion.html` | Deck de slides paginado, navegable por teclado, que recorre el flujo completo del producto con capturas del prototipo embebidas. Sirve para presentarle al cliente sin compartir pantalla. |
| 04 | **Documentación** | `hub/documentacion.html` + `hub/docs/*.html` | Documentos funcionales (funcional, UX, guía de estilos, arquitectura, roadmap) renderizados a HTML desde Markdown. |

---

## 3. Estructura de carpetas

```
proyecto/
├── index.html              ← EL HUB (portada, punto de entrada)
├── CLAUDE.md               ← instrucciones para la IA (contexto del proyecto)
├── .gitignore
│
├── prototype/              ← MÓDULO 01: la maqueta navegable
│   ├── index.html          ← toda la app en un solo HTML (con su JS inline)
│   ├── styles/
│   │   ├── tokens.css      ← design tokens (colores, tipografía, espaciado, radios)
│   │   └── global.css      ← estilos base y de layout
│   ├── components/         ← un CSS por componente
│   │   ├── button.css
│   │   ├── navbar.css
│   │   ├── tabs.css
│   │   ├── form-controls.css
│   │   ├── custom-select.css
│   │   ├── filter-chip.css
│   │   ├── pagination.css
│   │   ├── footer.css
│   │   └── index.js        ← el único JS de componentes (clásico, no módulo)
│   └── assets/             ← logo, fuentes, íconos del prototipo
│
├── hub/                    ← MÓDULOS 02, 03, 04
│   ├── hub.css             ← estilos de la portada
│   ├── doc.css             ← estilos de las páginas de documentación
│   ├── flujo.html          ← módulo 02
│   ├── presentacion.html   ← módulo 03
│   ├── documentacion.html  ← módulo 04 (índice de documentos)
│   └── docs/               ← HTML GENERADO (no se edita a mano)
│       ├── 01_funcional.html
│       ├── ...
│       └── manifest.json   ← índice {file, slug, title} de cada doc
│
├── Documents/              ← FUENTE DE VERDAD de la documentación (Markdown)
│   ├── README.md
│   ├── 01_funcional.md
│   ├── 02_handoff_roadmap.md
│   ├── 03_ux.md
│   ├── 04_guia_estilos.md
│   ├── 05_arquitectura.md
│   └── 06_diseno_ui.md
│
├── assets/                 ← logo e íconos SVG compartidos por el hub
│
├── tools/                  ← utilidades Node (solo para desarrollo)
│   ├── md2html.js          ← convierte Documents/*.md → hub/docs/*.html
│   ├── doc-template.html   ← layout que usa md2html
│   ├── dev-server.js       ← server estático local (puerto 4531)
│   └── README.md
│
└── openspec/               ← especificaciones funcionales versionadas
    ├── config.yaml
    ├── specs/              ← specs vigentes, por área
    │   ├── acceso-y-roles/spec.md
    │   ├── operativos/<subárea>/spec.md
    │   └── usuarios-y-roles/spec.md
    └── changes/archive/    ← historial de cambios ya aplicados
```

---

## 4. Los tres pilares de organización

### a) Design tokens centralizados

Todo el color, tipografía, espaciado y radio sale de `prototype/styles/tokens.css`
como CSS custom properties. **Nada se hardcodea en los componentes.** La estructura
es de 3 capas:

1. **Primitives** — valores crudos: `--gray-400: #cccccc`, `--blue-50: #eef2ff`.
2. **Semantic** — alias con significado: `--border-default: var(--gray-400)`,
   `--status-bg: var(--blue-50)`.
3. **Component** — los componentes consumen solo los semantic.

Esto permite que dos colores parecidos compartan el mismo primitive pero sigan
siendo dos tokens distintos (con distinta intención), y que un cambio de marca se
haga en un solo archivo.

### b) Documentación en Markdown, publicada a HTML

Se escribe en `Documents/*.md` (cómodo de editar y de versionar en git) y se
genera `hub/docs/*.html` con `node tools/md2html.js`. El parser de Markdown es
propio y sin dependencias (soporta headings, negrita/itálica, código, tablas,
listas, blockquotes, links).

**Regla:** al editar cualquier `.md`, correr `node tools/md2html.js` para regenerar
el HTML. Si se agrega o quita un `.md`, además hay que agregar/quitar su card en
`hub/documentacion.html`.

### c) OpenSpec — el comportamiento documentado aparte del código

`openspec/specs/<área>/spec.md` describe **qué hace el producto**, en lenguaje de
producto (requisitos `SHALL` y escenarios `WHEN`/`THEN`), sin nombres de archivos,
funciones ni librerías. Está deliberadamente separado de la documentación de
`Documents/` (que es más narrativa) y del código.

Flujo de trabajo: se propone un *change* → se valida → se archiva, y al archivarse
sus deltas se integran a las specs vigentes. El historial queda en
`openspec/changes/archive/`.

Importante: las specs documentan **comportamiento**, no diseño visual. Un rediseño
de colores no genera spec; un botón nuevo que cambia la navegación, sí.

### d) `CLAUDE.md` — el contexto para la IA

Archivo en la raíz que le dice a cualquier sesión nueva de IA: qué es el proyecto,
dónde están las specs, cuáles son las convenciones (tokens, tipografía, íconos
Lucide como SVG inline, correr `md2html` al editar docs), y qué reglas de negocio
siguen pendientes de validación (para que la IA no las convierta en requisitos sin
confirmación). Es lo que hace que el proyecto sea "auto-explicativo" para la IA.

---

## 5. Herramientas Node (solo desarrollo)

Ninguna es necesaria para navegar el sitio.

```bash
node tools/md2html.js      # regenera hub/docs/ desde Documents/
node tools/dev-server.js   # sirve el proyecto en http://localhost:4531
```

El `dev-server.js` es un server estático mínimo. Solo hace falta para herramientas
que no pueden abrir `file://` (como navegadores embebidos durante el desarrollo).
El usuario final nunca lo necesita.

---

## 6. Cómo se trabaja con GitHub

- Repo único para todo el proyecto: `https://github.com/Marcolof/encueta-CSAT-Correo` (público).
- Rama única: **`main`**. No se usan feature branches en este proyecto.
- Commits en español, descriptivos, uno por cambio conceptual. Ejemplos reales:
  - `Rediseñar la navegación: header amarillo + sidebar colapsable`
  - `Centralizar colores hardcodeados en tokens.css`
  - `Documentar el comportamiento del backoffice como specs OpenSpec`
- **Nunca se hace force-push ni se amenda un commit ya pusheado.** Siempre commit nuevo.
- Antes de commitear siempre se revisa `git status` y `git diff` para no subir
  archivos de más.
- El `.gitignore` excluye deliberadamente `html reference/` — es una copia local
  capturada del sitio real del cliente, y el repo es público. También ignora
  `Thumbs.db` y `.DS_Store`.

Flujo típico:
```bash
git status -sb
git add <archivos>
git diff --cached --stat
git commit -m "Mensaje descriptivo en español"
git push
```

---

## 7. Cómo se trabaja con Vercel

- El proyecto de Vercel está **conectado directamente al repo de GitHub**
  (`encueta-csat-correo`).
- Como es un sitio estático sin `package.json`, **no hay build step**: Vercel sirve
  los archivos tal cual están en el repo. No hay configuración especial ni
  `vercel.json`.
- **Cada push a `main` dispara un deploy automático.** Ese es todo el ciclo: se
  commitea, se pushea, y a los segundos el cliente ve los cambios en la URL pública.
- La URL pública de Vercel es lo que se le comparte al cliente para validar. Como el
  Hub es el `index.html` de la raíz, la URL raíz ya abre el Hub, y desde ahí el
  cliente navega el prototipo, el flujo, la presentación y la documentación.

Esto es lo que hace que el ciclo de validación con cliente sea tan corto:
**editar → commit → push → el cliente ya lo ve.**

---

## 8. Resumen de lo replicable

Lo que vale la pena copiar a otro proyecto no es el contenido de CSAT, sino el patrón:

1. **Sitio estático sin build**, para que abra con doble clic y despliegue sin config.
2. **Un Hub como portada** (`index.html` en la raíz) con tarjetas a cada módulo, para
   compartir una sola URL con el cliente.
3. **Módulos separados y navegables**: prototipo + flujo de navegación + presentación
   + documentación.
4. **Design tokens en 3 capas** centralizados en un solo CSS.
5. **Documentación en Markdown** como fuente de verdad, publicada a HTML por script.
6. **Comportamiento especificado aparte** (OpenSpec) del código y del diseño visual.
7. **`CLAUDE.md` en la raíz** para que la IA arranque con contexto en cada sesión.
8. **GitHub → Vercel con deploy automático en cada push a `main`**, para validar
   con el cliente en minutos.
