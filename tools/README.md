# Herramientas de build del Hub

Utilidades de Node usadas para generar el Hub (`index.html` + `/hub`). No son necesarias para navegar el sitio — todo el sitio funciona abriendo `index.html` directamente (`file://`), sin servidor.

## `md2html.js` — regenerar la documentación

Convierte cada `Documents/*.md` a `hub/docs/*.html` (usa `doc-template.html` como layout). Correrlo cada vez que se edite algo en `Documents/`:

```bash
node tools/md2html.js
```

Si se agrega o quita un archivo `.md` en `Documents/`, además hay que:
1. Correr el comando de arriba (genera/borra el `.html` correspondiente).
2. Agregar o quitar su card en `hub/documentacion.html`.

Parser Markdown propio y minimalista (sin dependencias): soporta headings, negrita/itálica, código inline y en bloque, tablas, listas (un nivel de anidado), blockquotes, `---` y links.

## `dev-server.js` — servidor local para probar con el Browser tool

Sirve el proyecto en `http://localhost:4531`. Solo hace falta para herramientas que no pueden abrir `file://` directamente (como el navegador embebido usado durante el desarrollo). El usuario final no lo necesita.

```bash
node tools/dev-server.js
```
