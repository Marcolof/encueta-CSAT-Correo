# Prototipo CSAT — estilos y componentes

Abrir `index.html` directamente en el navegador. No requiere instalación ni servidor. Los componentes usan JavaScript clásico —no módulos ES— para mantener compatibilidad con apertura mediante `file://`.

## Estructura

- `styles/tokens.css`: paleta, espaciado, radios, sombras y tokens semánticos.
- `styles/global.css`: fuentes Gilroy locales, tipografía, superficies, tablas y layout general.
- `components/`: estilos de Button, Navbar/Sidebar, Input/Select, Tabs y Footer; `index.js` monta las clases reutilizables sin modificar la lógica funcional existente.
- `assets/fonts/`: copias locales de las seis variantes provistas de Gilroy. No se cargan recursos externos.
- `assets/icons/`: catálogo local de iconos Lucide. En los controles del sidebar se insertan como SVG inline para heredar `currentColor` y funcionar también bajo `file://`.

Los `select` eliminan el indicador nativo del navegador y usan `ChevronDown` de Lucide embebido en el componente, con padding derecho reservado para evitar superposición con el valor.

Los filtros de Activos, Borradores, Historial y Usuarios combinan búsqueda escrita y chips desplegables. La búsqueda y los selects filtran en tiempo real; los campos activos usan borde azul y hacen visible `Limpiar filtros`, con icono Lucide `X`. Al limpiar se restablecen búsqueda, chips, tabla y paginación sin recargar la página.

`components/filter-chip.css` contiene los estados normal, hover, focus, activo y responsive del componente. Sus superficies, bordes y foco se controlan mediante los tokens `--filter-chip-*` definidos en `styles/tokens.css`.

Todos los `select` se presentan mediante `components/custom-select.css`: el control nativo permanece oculto y sincronizado, mientras la interfaz visible usa un trigger, menú flotante, opción seleccionada, check Lucide y navegación básica por teclado. Los chips reutilizan una variante compacta del mismo dropdown y los formularios usan la variante de ancho completo.

Las tablas con más de 10 resultados incorporan automáticamente el componente `Pagination`: muestra 10 filas por página, rango visible, páginas numeradas cuadradas y controles Anterior/Siguiente con iconos Lucide. Los controles reutilizan las variantes globales `Button outline` y `Button square`. La paginación se recalcula al aplicar filtros y se oculta cuando quedan 10 coincidencias o menos.

## Decisiones y límites del LOOK-AND-FEEL-EXPORT

La fuente principal de UI es `html reference/MiCorreo_files/estilos.css` junto con `estilos-inputs.css`. Se reutilizaron la jerarquía amarillo `#ffce00` / azul marino `#152663`, botones pill, campos compactos con radio de 5 px y foco azul. Por decisión visual del prototipo, el peso tipográfico mínimo es Gilroy SemiBold (600); títulos y énfasis fuertes usan 700. `--global-bg: #fafafa` es el fondo común de todas las vistas internas; el login usa fondo amarillo. Se omitieron deliberadamente el contenido, navegación, sidebar y footer del sitio de referencia. Los recursos visuales oficiales se toman de la carpeta compartida `Encuesta CSAT/assets`; el login referencia directamente `../assets/logo correo argentino.svg`, sin duplicarlo ni modificarlo.

## Revisión visual integral

La dirección visual se aplicó a todas las vistas funcionales existentes: login, operativos, tabs, listados, detalles activo/borrador/finalizado, métricas, formularios, permisos, usuarios y modales. La sidebar conserva solamente las opciones reales de cada rol; no incorpora las opciones ilustrativas de la referencia visual.

El componente global `Button` asigna variantes reutilizables:

- `accent`: acción principal amarilla.
- `invert`: acción azul marino sobre superficies claras.
- `transparent`: controles sobre fondos oscuros o acciones secundarias con borde.
- `ghost`: acciones compactas en tablas, tarjetas y modales.
- `icon`: botones cuadrados sin texto.
- `nav-item`: navegación del sidebar; usa fondo azul suave, texto blanco, icono y marcador amarillos en estado activo.
- `sidebar-action`: acciones secundarias sobre el fondo azul del sidebar, con hover translúcido e icono amarillo.

Incluye estados `hover`, `focus-visible`, `active` y `disabled`. Un observador aplica las variantes también a la navegación que el prototipo genera dinámicamente según el rol.

Todas las variantes interactivas poseen un `hover` perceptible. Los botones activos de navegación, tabs y paginación pasan a `--color-brand-dark-hover` sin perder su indicador de selección; los controles deshabilitados no reaccionan al puntero.
