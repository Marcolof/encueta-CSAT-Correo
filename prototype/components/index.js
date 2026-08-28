function resolveButtonVariant(el) {
  if (el.classList.contains("app-header__burger")) return;
  el.classList.add("ui-button");
  el.classList.remove("button--accent", "button--transparent", "button--invert", "button--ghost", "button--icon", "button--outline", "button--square", "button--nav-item", "button--sidebar-action", "button--filter-clear", "button--select-trigger");
  if (el.classList.contains("login-submit")) el.classList.add("button--invert");
  else if (el.classList.contains("icon-button")) el.classList.add("button--ghost", "button--icon");
  else if (el.classList.contains("pagination-page")) el.classList.add("button--square");
  else if (el.classList.contains("pagination-direction")) el.classList.add("button--outline");
  else if (el.classList.contains("filter-clear")) el.classList.add("button--filter-clear");
  else if (el.classList.contains("custom-select__trigger")) el.classList.add("button--select-trigger");
  else if (el.classList.contains("primary")) el.classList.add("button--accent");
  else if (el.classList.contains("tab")) return;
  else if (el.closest("#mainNav")) el.classList.add("button--nav-item");
  else if (el.closest(".sidebar-bottom")) el.classList.add("button--sidebar-action");
  else el.classList.add("button--ghost");
}
const Button={mount(root=document){root.querySelectorAll("button").forEach(resolveButtonVariant)}};
const Input={mount(root=document){root.querySelectorAll("input").forEach(el=>el.classList.add("ui-input"))}};
const Select={mount(root=document){root.querySelectorAll("select").forEach(el=>el.classList.add("ui-select"))}};

const eyeShowSvg = '<svg class="lucide-icon eye-show" aria-hidden="true" viewBox="0 0 24 24"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>';
const eyeHideSvg = '<svg class="lucide-icon eye-hide" aria-hidden="true" viewBox="0 0 24 24"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.8 10.8 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>';

/**
 * Fábrica reutilizable de campos de formulario, equivalente al componente
 * Input de Figma (Label + Field + Helper, con estado Password opcional).
 * Devuelve { field, input } — `field` es el <div class="field"> listo para
 * insertar en el DOM, `input` es el <input> real para leer/escribir su valor.
 */
const Field = {
  create({
    id,
    type = "text",
    label,
    value = "",
    placeholder,
    helper,
    required = false,
    showLabel = true,
  } = {}) {
    const field = document.createElement("div");
    field.className = "field";

    if (showLabel && label) {
      const labelEl = document.createElement("label");
      if (required) labelEl.className = "required";
      if (id) labelEl.htmlFor = id;
      labelEl.textContent = label;
      field.appendChild(labelEl);
    }

    let input;
    if (type === "password") {
      if (!id) throw new Error("Field.create: los campos type=\"password\" necesitan un id (lo usa el toggle de mostrar/ocultar).");
      const control = document.createElement("div");
      control.className = "password-control";
      input = document.createElement("input");
      input.type = "password";
      input.id = id;
      if (value) input.value = value;
      if (placeholder) input.placeholder = placeholder;

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "password-toggle";
      toggle.setAttribute("aria-label", "Mostrar contraseña");
      toggle.setAttribute("aria-pressed", "false");
      toggle.innerHTML = eyeShowSvg + eyeHideSvg;
      toggle.addEventListener("click", () => togglePassword(id, toggle));

      control.append(input, toggle);
      field.appendChild(control);
    } else {
      input = document.createElement("input");
      input.type = type;
      if (id) input.id = id;
      if (value) input.value = value;
      if (placeholder) input.placeholder = placeholder;
      field.appendChild(input);
    }

    if (helper) {
      const small = document.createElement("small");
      small.className = "muted";
      small.textContent = helper;
      field.appendChild(small);
    }

    return { field, input };
  },
};
const Navbar={mount(root=document){
  root.querySelector("aside")?.classList.add("ui-sidebar");
  root.querySelector("#mainNav")?.classList.add("ui-navbar");
  root.querySelectorAll(".pagination-nav.ui-navbar").forEach(nav => nav.classList.remove("ui-navbar"));
}};
const Footer={mount(root=document){const main=root.querySelector("main");if(!main||main.querySelector(".app-footer"))return;const footer=document.createElement("footer");footer.className="app-footer";footer.textContent="CSAT Backoffice · Prototipo funcional";main.appendChild(footer)}};

function normalizeFilterText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();
}

function getChipConfig(select) {
  const placeholder = normalizeFilterText(select.options[0]?.textContent);
  if (placeholder.includes("segment")) return {label: "Segmento:", empty: "Todos"};
  if (placeholder.includes("region")) return {label: "Región:", empty: "Todas"};
  if (placeholder.includes("rol")) return {label: "Rol:", empty: "Todos"};
  return {label: "Filtro:", empty: "Todos"};
}

function bindChipFilter(select) {
  if (select.dataset.chipBound === "true") return;
  const config = getChipConfig(select);
  const wrapper = document.createElement("div");
  wrapper.className = "filter-chip";
  const label = document.createElement("span");
  label.className = "filter-chip__label";
  label.textContent = config.label;
  select.options[0].textContent = config.empty;
  select.parentNode.insertBefore(wrapper, select);
  wrapper.append(label, select);

  const update = () => wrapper.classList.toggle("is-active", select.selectedIndex > 0);
  select.addEventListener("change", update);
  select.dataset.chipBound = "true";
  update();
}

const ChipFilter={mount(root=document){root.querySelectorAll(".filters select").forEach(bindChipFilter)}};

const selectChevron = '<svg class="lucide-icon custom-select__chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>';
const selectCheck = '<svg class="lucide-icon custom-select__check" aria-hidden="true" viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"/></svg>';

function closeCustomSelects(except) {
  document.querySelectorAll(".custom-select.is-open").forEach(wrapper => {
    if (wrapper === except) return;
    wrapper.classList.remove("is-open");
    wrapper.querySelector(".custom-select__trigger")?.setAttribute("aria-expanded", "false");
    const menu = wrapper.querySelector(".custom-select__menu");
    if (menu) menu.hidden = true;
  });
}

function bindCustomSelect(select) {
  if (select.dataset.customSelectBound === "true") return;
  const wrapper = document.createElement("div");
  wrapper.className = `custom-select${select.closest(".filter-chip") ? " custom-select--chip" : ""}`;
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "ui-button custom-select__trigger button--select-trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  const value = document.createElement("span");
  value.className = "custom-select__value";
  // En los chips, la etiqueta ("Segmento:") pasa a vivir DENTRO del trigger para que
  // toda la superficie del chip sea un único control tocable y focusable.
  const chipLabel = select.closest(".filter-chip")?.querySelector(".filter-chip__label");
  if (chipLabel) trigger.append(chipLabel);
  trigger.append(value);
  trigger.insertAdjacentHTML("beforeend", selectChevron);

  const menu = document.createElement("div");
  menu.className = "custom-select__menu";
  menu.setAttribute("role", "listbox");
  menu.hidden = true;

  Array.from(select.options).forEach((option, index) => {
    const item = document.createElement("div");
    item.className = "custom-select__option";
    item.setAttribute("role", "option");
    item.tabIndex = -1;
    item.dataset.index = String(index);
    item.innerHTML = `<span>${option.textContent}</span>${selectCheck}`;
    const choose = () => {
      if (option.disabled) return;
      select.selectedIndex = index;
      select.dispatchEvent(new Event("change", {bubbles:true}));
      select._customSelectUpdate?.();
      closeCustomSelects();
      trigger.focus();
    };
    item.addEventListener("click", choose);
    item.addEventListener("keydown", event => {
      const items = Array.from(menu.querySelectorAll(".custom-select__option:not(.is-disabled)"));
      const position = items.indexOf(item);
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const step = event.key === "ArrowDown" ? 1 : -1;
        items[(position + step + items.length) % items.length]?.focus();
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        choose();
      } else if (event.key === "Escape") {
        closeCustomSelects();
        trigger.focus();
      }
    });
    menu.appendChild(item);
  });

  select.parentNode.insertBefore(wrapper, select);
  wrapper.append(trigger, menu, select);
  select.classList.add("select-native-hidden");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");

  const update = () => {
    const selected = select.options[select.selectedIndex];
    value.textContent = selected?.textContent || "Seleccionar";
    // Si la etiqueta ya está dentro del trigger, su propio texto nombra el control:
    // un aria-label lo duplicaría.
    if (!chipLabel) {
      const outerLabel = select.closest(".filter-chip")?.querySelector(".filter-chip__label")?.textContent || "Seleccionar";
      trigger.setAttribute("aria-label", `${outerLabel} ${value.textContent}`);
    }
    trigger.disabled = select.disabled;
    menu.querySelectorAll(".custom-select__option").forEach((item, index) => {
      const isSelected = index === select.selectedIndex;
      item.classList.toggle("is-selected", isSelected);
      item.classList.toggle("is-disabled", Boolean(select.options[index]?.disabled));
      item.setAttribute("aria-selected", String(isSelected));
    });
  };
  select._customSelectUpdate = update;
  select.addEventListener("change", update);

  trigger.addEventListener("click", event => {
    event.stopPropagation();
    if (trigger.disabled) return;
    const opening = !wrapper.classList.contains("is-open");
    closeCustomSelects(wrapper);
    wrapper.classList.toggle("is-open", opening);
    trigger.setAttribute("aria-expanded", String(opening));
    menu.hidden = !opening;
  });
  trigger.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!wrapper.classList.contains("is-open")) trigger.click();
      menu.querySelector(".custom-select__option.is-selected")?.focus();
    } else if (event.key === "Escape") {
      closeCustomSelects();
    }
  });
  wrapper.addEventListener("click", event => event.stopPropagation());
  select.dataset.customSelectBound = "true";
  update();
}

const CustomSelect={mount(root=document){root.querySelectorAll("select").forEach(bindCustomSelect)}};
window.syncCustomSelects = (root=document) => root.querySelectorAll("select").forEach(select => select._customSelectUpdate?.());
if (!window._customSelectDismissBound) {
  document.addEventListener("click", () => closeCustomSelects());
  window._customSelectDismissBound = true;
}

function bindFilter(filters) {
  if (filters.dataset.filterBound === "true") return;

  const panel = filters.closest(".panel") || filters.nextElementSibling;
  const table = panel?.querySelector("table");
  const rows = table ? Array.from(table.querySelectorAll("tbody tr")) : [];
  const search = filters.querySelector('input[type="search"]');
  const selects = Array.from(filters.querySelectorAll("select"));
  const clearButton = Array.from(filters.children).find(element => element.tagName === "BUTTON");
  if (!panel || !table || !rows.length || !clearButton) return;

  clearButton.type = "button";
  clearButton.className = "ui-button filter-clear button--filter-clear";
  clearButton.innerHTML = 'Limpiar filtros <svg class="lucide-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  clearButton.hidden = true;

  const result = document.createElement("p");
  result.className = "filter-results";
  result.setAttribute("role", "status");
  result.setAttribute("aria-live", "polite");
  result.hidden = true;
  table.before(result);

  const apply = () => {
    const query = normalizeFilterText(search?.value);
    const selectedValues = selects
      .filter(select => select.selectedIndex > 0)
      .map(select => normalizeFilterText(select.value));
    const hasActiveFilters = Boolean(query || selectedValues.length);
    search?.classList.toggle("is-filtered", Boolean(query));
    let visibleCount = 0;

    rows.forEach(row => {
      const rowText = normalizeFilterText(row.textContent);
      const matches = (!query || rowText.includes(query)) &&
        selectedValues.every(value => rowText.includes(value));
      row.dataset.filterMatch = String(matches);
      if (!panel._pagination) row.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    panel._pagination?.refresh(true);

    result.hidden = !hasActiveFilters;
    clearButton.hidden = !hasActiveFilters;
    filters.classList.toggle("has-active-filters", hasActiveFilters);
    result.classList.toggle("is-empty", visibleCount === 0);
    result.textContent = visibleCount === 0
      ? "No se encontraron resultados con los filtros seleccionados."
      : `${visibleCount} ${visibleCount === 1 ? "resultado" : "resultados"}`;
  };

  clearButton.addEventListener("click", event => {
    event.preventDefault();
    if (search) search.value = "";
    selects.forEach(select => {
      select.selectedIndex = 0;
      select.closest(".filter-chip")?.classList.remove("is-active");
      select._customSelectUpdate?.();
    });
    apply();
  });
  search?.addEventListener("input", apply);
  selects.forEach(select => select.addEventListener("change", apply));

  filters.dataset.filterBound = "true";
}

const Filter={mount(root=document){root.querySelectorAll(".filters").forEach(bindFilter)}};

const chevron = direction => `<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}"/></svg>`;

function paginationItems(current, total) {
  if (total <= 7) return Array.from({length: total}, (_, index) => index + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

function bindPagination(table) {
  if (table.dataset.paginationBound === "true") return;
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  if (rows.length <= 10) return;

  const panel = table.closest(".panel") || table.parentElement;
  const footer = document.createElement("div");
  footer.className = "pagination";
  footer.innerHTML = '<p class="pagination-summary" aria-live="polite"></p><nav class="pagination-nav" aria-label="Paginación del listado"></nav>';
  table.after(footer);
  const summary = footer.querySelector(".pagination-summary");
  const nav = footer.querySelector(".pagination-nav");
  let currentPage = 1;

  const refresh = resetPage => {
    const eligibleRows = rows.filter(row => row.dataset.filterMatch !== "false");
    const totalPages = Math.max(1, Math.ceil(eligibleRows.length / 10));
    if (resetPage) currentPage = 1;
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * 10;
    const end = Math.min(start + 10, eligibleRows.length);

    rows.forEach(row => { row.hidden = true; });
    eligibleRows.slice(start, end).forEach(row => { row.hidden = false; });
    footer.hidden = eligibleRows.length <= 10;
    summary.textContent = eligibleRows.length
      ? `Mostrando ${start + 1}–${end} de ${eligibleRows.length} resultados`
      : "No hay resultados para mostrar";

    nav.replaceChildren();
    const addButton = (label, page, options = {}) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = options.page
        ? "ui-button pagination-page button--square"
        : "ui-button pagination-direction button--outline";
      if (options.active) {
        button.classList.add("is-active");
        button.setAttribute("aria-current", "page");
      }
      button.disabled = options.disabled || false;
      button.innerHTML = options.html || label;
      button.setAttribute("aria-label", options.ariaLabel || label);
      button.addEventListener("click", () => { currentPage = page; refresh(false); });
      nav.appendChild(button);
    };

    addButton("Anterior", currentPage - 1, {disabled: currentPage === 1, html: `${chevron("left")}<span>Anterior</span>`});
    paginationItems(currentPage, totalPages).forEach(item => {
      if (item === "…") {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = item;
        nav.appendChild(ellipsis);
      } else {
        addButton(String(item), item, {page: true, active: item === currentPage, ariaLabel: `Página ${item}`});
      }
    });
    addButton("Siguiente", currentPage + 1, {disabled: currentPage === totalPages, html: `<span>Siguiente</span>${chevron("right")}`});
  };

  panel._pagination = {refresh};
  table.dataset.paginationBound = "true";
  refresh(true);
}

const Pagination={mount(root=document){root.querySelectorAll("table").forEach(bindPagination)}};
function mountComponents(root=document){Navbar.mount(root);Button.mount(root);Input.mount(root);Select.mount(root);ChipFilter.mount(root);CustomSelect.mount(root);Filter.mount(root);Pagination.mount(root);Footer.mount(root)}
function boot(){mountComponents();new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===Node.ELEMENT_NODE)mountComponents(node.parentElement||node)}))).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
