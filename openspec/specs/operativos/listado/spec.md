# operativos/listado Specification

## Purpose
Define cómo se organiza y se recorre el inventario de operativos de encuesta: la separación entre el trabajo en curso y el histórico, la vista de resumen, y las herramientas de búsqueda, filtrado y paginación de cada listado.

## Requirements

### Requirement: Estructura de la vista de operativos

El sistema SHALL organizar los operativos en cuatro vistas: **Todos**, **Activos**, **Borradores** e **Historial**. La vista activa al entrar SHALL ser "Todos".

#### Scenario: Cambio de vista

- **WHEN** el usuario selecciona una de las cuatro vistas
- **THEN** se muestra únicamente el listado correspondiente
- **AND** la vista seleccionada queda marcada como activa

### Requirement: La vista Todos es un resumen del trabajo en curso

La vista **Todos** SHALL mostrar únicamente operativos Activos y Borradores, agrupados y con su total por grupo, con un máximo de 3 registros por grupo. SHALL ofrecer un acceso "Ver más" por grupo que lleve a la vista completa correspondiente. Esta vista NO SHALL ofrecer búsqueda ni filtros.

Los operativos Finalizados NO SHALL aparecer en la vista Todos.

#### Scenario: Resumen de activos y borradores

- **WHEN** el usuario abre la vista Todos
- **THEN** se muestran los grupos Activos y Borradores con su cantidad total
- **AND** cada grupo lista como máximo 3 operativos
- **AND** no se ofrecen campos de búsqueda ni filtros

#### Scenario: Acceso al listado completo

- **WHEN** el usuario usa "Ver más activos" o "Ver más borradores"
- **THEN** el sistema navega a la vista completa de ese grupo

#### Scenario: Los finalizados quedan fuera

- **WHEN** existen operativos en estado Finalizado
- **THEN** no aparecen en la vista Todos

### Requirement: Historial contiene solo operativos finalizados

La vista **Historial** SHALL listar únicamente operativos en estado Finalizado, sin mezclarlos con el trabajo en curso.

#### Scenario: Consulta del historial

- **WHEN** el usuario abre la vista Historial
- **THEN** todos los operativos listados están en estado Finalizado

### Requirement: Búsqueda y filtros de los listados

Las vistas Activos, Borradores e Historial SHALL ofrecer búsqueda por texto y filtros por segmento y por región. Los criterios SHALL aplicarse en el momento, de forma acumulativa (un registro se muestra solo si cumple todos los criterios activos), y sin recargar la página.

El sistema SHALL informar la cantidad de resultados y, cuando ninguno coincide, SHALL indicarlo explícitamente en lugar de mostrar una tabla vacía sin explicación.

#### Scenario: Filtrado acumulativo

- **WHEN** el usuario escribe un texto de búsqueda y además selecciona un segmento
- **THEN** se muestran solo los operativos que cumplen ambos criterios
- **AND** se informa la cantidad de resultados encontrados

#### Scenario: Sin coincidencias

- **WHEN** ningún operativo cumple los criterios aplicados
- **THEN** el sistema informa que no se encontraron resultados con los filtros seleccionados

### Requirement: Restablecer los filtros

Mientras haya al menos un criterio activo, el sistema SHALL ofrecer la acción de limpiar filtros, y SHALL ocultarla cuando no haya ninguno. Al limpiarlos, SHALL restablecer la búsqueda, los filtros, el listado completo y la paginación.

#### Scenario: Aparición de la acción

- **WHEN** el usuario aplica cualquier criterio de búsqueda o filtro
- **THEN** la acción de limpiar filtros pasa a estar disponible

#### Scenario: Limpieza de criterios

- **WHEN** el usuario limpia los filtros
- **THEN** la búsqueda y los filtros vuelven a su valor inicial
- **AND** se muestra el listado completo desde su primera página

### Requirement: Paginación de listados extensos

Cuando un listado tenga más de 10 registros, el sistema SHALL paginarlo mostrando 10 por página, SHALL informar el rango visible sobre el total y SHALL ofrecer navegación por página y controles Anterior/Siguiente. La paginación SHALL recalcularse cuando cambien los filtros y NO SHALL mostrarse cuando queden 10 registros o menos.

#### Scenario: Listado con más de 10 registros

- **WHEN** un listado tiene más de 10 registros
- **THEN** se muestran los primeros 10
- **AND** se informa el rango visible y el total
- **AND** se ofrecen los controles de navegación entre páginas

#### Scenario: Filtro que reduce el listado

- **WHEN** el usuario aplica filtros y las coincidencias quedan en 10 o menos
- **THEN** todas las coincidencias se muestran en una sola página
- **AND** los controles de paginación no se muestran
