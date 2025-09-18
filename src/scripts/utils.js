/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
import { stays } from "./stays.js";

const getInfo = async () => {
  return stays;
};

const fillCrads = (data) => {
  const { superHost, title, rating, type, beds = `No Info`, photo } = data;
  const card = document.createElement("div");
  card.classList = `flex flex-col gap-2`;
  card.innerHTML = `
    <img
          src=${photo}
          alt=${type}
          class="w-full object-cover rounded-2xl hover:scale-105 sm:max-h-50 md:max-h-50 "
        />
        ${
          superHost
            ? `<span class="bg-gray-100 text-[0.7rem] w-min p-1 rounded-2xl">Superhost</span>`
            : ""
        }
        <div
          class="flex justify-between items-center text-sm text-gray-500 mt-1"
        >
          <span>${type} · ${beds ?? "No Info"} beds</span>
          <div class="flex flex-row gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#EB5757"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#EB5757"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span class="flex items-center space-x-1 font-semibold">${rating}</span>
          </div>
        </div>
        <h3 class="mt-1 font-semibold">
          ${title}
        </h3>
  `;
  return card;
};

const renderCards = async (staysArray) => {
  const container = document.getElementById("cardsContainer");
  if (!container) return console.error(`No se encontró el contenedor`);

  container.innerHTML = "";
  staysArray.forEach((stay) => {
    const card = fillCrads(stay);
    container.appendChild(card);
  });
};

/* Arir y cerrar el modal */

function setupModalHandlers() {
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector("div.bg-white");
  const searchButtons = document.querySelectorAll(".search-bar-button");
  const closeModalButton = document.getElementById("header_button");

  /* Mostrar modal */
  searchButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  });

  /* Cerrar modal con botón */
  if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Después (evita cerrar si interactúas con inputs o dropdowns):
  modal.addEventListener("click", (e) => {
    const isInside = modalContent.contains(e.target);
    const isButtonOrInput = ["BUTTON", "INPUT", "SPAN", "SVG", "PATH"].includes(
      e.target.tagName
    );
    if (!isInside || (!isInside && !isButtonOrInput)) {
      modal.classList.add("hidden");
    }
  });
}

/* Filtro ciudades en modal */

function setupLocationDropdown() {
  const input = document.getElementById("miInput");
  const parent = input.parentElement;

  /* Obtenemos ciudades únicas */
  const cities = [...new Set(stays.map((stay) => stay.city))];

  /*   Crear lista visible de sugerencias */
  const dropdown = document.createElement("ul");
  dropdown.classList.add(
    "absolute",
    "bg-white",
    "rounded-lg",
    "mt-2",
    "shadow-lg",
    "w-full",
    "z-50",
    "text-sm",
    "max-h-60",
    "overflow-y-auto"
  );
  dropdown.style.top = "100%";
  parent.style.position = "relative";

  parent.appendChild(dropdown);

  const updateDropdown = (filter = "") => {
    dropdown.innerHTML = "";

    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      const noMatch = document.createElement("li");
      noMatch.textContent = "No matches found";
      noMatch.classList.add("px-4", "py-2", "text-red-500");
      dropdown.appendChild(noMatch);
      return;
    }

    filtered.forEach((city) => {
      const li = document.createElement("li");
      li.classList.add(
        "flex",
        "items-center",
        "gap-2",
        "px-4",
        "py-2",
        "hover:bg-gray-100",
        "cursor-pointer"
      );
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0v10" />
        </svg>
        <span>${city}, Finland</span>
      `;

      li.addEventListener("click", () => {
        input.value = city;
        dropdown.innerHTML = "";

        /* Filtramos y renderizamos */
        const filteredStays = stays.filter((stay) => stay.city === city);
        renderCards(filteredStays);
      });

      dropdown.appendChild(li);
    });
  };

  /*  Mostrar todas al enfocar */
  input.addEventListener("focus", () => {
    updateDropdown();
  });

  /* Actualizar mientras escribe */
  input.addEventListener("input", () => {
    const search = input.value.trim();
    updateDropdown(search);
  });

  /* Ocultar al hacer clic fuera */
  document.addEventListener("click", (e) => {
    if (!parent.contains(e.target)) {
      dropdown.innerHTML = "";
    }
  });
}
export { getInfo, renderCards, setupModalHandlers, setupLocationDropdown };
