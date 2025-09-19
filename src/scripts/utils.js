/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
import { stays } from './stays.js'

/* Solo copia el array */
const getInfo = async () => {
  return stays
}

/* Diseño de Cards*/
const fillCrads = (data) => {
  /* Desestructurar objeto */
  const { superHost, title, rating, type, beds = `No Info`, photo } = data

  /* Crear card */
  const card = document.createElement('div')
  card.classList = `flex flex-col gap-2`
  card.innerHTML = `
    <img
          src=${photo}
          alt=${type}
          class="w-full object-cover rounded-2xl hover:scale-105 sm:max-h-50 md:max-h-50 "
        />
        ${
          superHost
            ? `<span class="bg-gray-100 text-[0.7rem] w-min p-1 rounded-2xl">Superhost</span>`
            : ''
        }
        <div
          class="flex justify-between items-center text-sm text-gray-500 mt-1"
        >
          <span>${type} · ${beds ?? 'No Info'} beds</span>
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
  `
  return card
}

/* Hacer skeletons de carga de datos */
function showSkeletons(container) {
  container.innerHTML = ''
  /* Mostrar solo 6 */
  for (let i = 0; i < 6; i++) {
    const skeleton = document.createElement('div')
    skeleton.classList.add('animate-pulse', 'flex', 'flex-col', 'gap-2')
    skeleton.innerHTML = `
      <div class="bg-gray-300 h-40 w-full rounded-2xl"></div>
      <div class="bg-gray-300 h-4 w-3/4 rounded"></div>
      <div class="bg-gray-300 h-4 w-1/2 rounded"></div>
    `
    container.appendChild(skeleton)
  }
}

/* Renderiza las cards en el main */
const renderCards = async (staysArray) => {
  const container = document.getElementById('cardsContainer')
  if (!container) return console.error(`No se encontró el contenedor`)

  /* Mostrar primero los skeletons */
  showSkeletons(container, 6)

  /* Simular delay */
  await new Promise((resolve) => setTimeout(resolve, 1000))

  /* Vacia el container de skeltons y agrega las cards */
  container.innerHTML = ''
  staysArray.forEach((stay) => {
    const card = fillCrads(stay)
    container.appendChild(card)
  })

  /* Coloca las ubicaciones disponibles */
  const staysCount = document.getElementById('staysCount')
  staysArray.length > 1
    ? (staysCount.textContent = `${staysArray.length - 1}+ stays`)
    : (staysCount.textContent = `${staysArray.length} stays`)
}

/* Arir y cerrar el modal */
function setupModalHandlers() {
  const modal = document.getElementById('modal')
  const modalContent = document.getElementById('modal_in')
  const searchButtons = document.querySelectorAll('.search-bar-button')
  const closeModalButton = document.getElementById('header_button')

  /* Mostrar modal */
  searchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden')
    })
  })

  /* Cerrar modal con botón */
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      modal.classList.add('hidden')
    })
  }

  /* Cerrar modal con click fuera del modal */
  modal.addEventListener('click', (e) => {
    const isInside = modalContent.contains(e.target)
    if (!isInside) {
      modal.classList.add('hidden')
    }
  })
}

/* Filtro ciudades en modal */
function setupLocationDropdown() {
  const input = document.getElementById('miInput')
  const location_info = document.getElementById('location_info')
  const guestContainer = document.getElementById('guestDropdownContainer')
  const add_location = document.getElementById('add_location')

  /* Crear un array solo de ciudades*/
  const cities = [...new Set(stays.map((stay) => stay.city))]

  /* Crear una lista de elementos */
  const dropdown = document.createElement('ul')
  dropdown.classList.add(
    'flex',
    'bg-white',
    'flex-col',
    'rounded-lg',
    'mt-2',
    'w-full',
    'text-sm',
    'max-h-60',
    'overflow-y-auto'
  )
  location_info.appendChild(dropdown)

  /* Función para actualizar la lista */
  const updateDropdown = (filter = '') => {
    /* Inicialmente vacia */
    dropdown.innerHTML = ''

    /* Función para filtrar ciudades */
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(filter.toLowerCase())
    )

    /* Si no encuentra ninguna coinicidencia crea un error de no match */
    if (filtered.length === 0) {
      const noMatch = document.createElement('li')
      noMatch.textContent = 'No matches found'
      noMatch.classList.add('px-4', 'py-2', 'text-red-500')
      dropdown.appendChild(noMatch)
      return
    }

    /* Crear los elementos de la lista de cada ciudad filtrada*/
    filtered.forEach((city) => {
      const li = document.createElement('li')
      li.classList.add(
        'flex',
        'items-center',
        'gap-2',
        'px-4',
        'py-2',
        'hover:bg-gray-100',
        'cursor-pointer'
      )
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0v10" />
        </svg>
        <span>${city}, Finland</span>
      `

      li.addEventListener('click', (e) => {
        e.stopPropagation()
        input.value = city
        add_location.textContent = city
      })

      dropdown.appendChild(li)
    })
  }

  /* Mostrar todas las ciudades al enfocar Location */
  input.addEventListener('focus', () => {
    location_info.classList.remove('hidden')
    guestContainer.classList.add('hidden')
    updateDropdown()
  })

  /* Actualizar mientras escribe */
  input.addEventListener('input', () => {
    updateDropdown(input.value.trim())
  })

  /* Ocultar dropdown si se da clic fuera */
  document.addEventListener('click', (e) => {
    if (!location_info.contains(e.target) && e.target !== input) {
      dropdown.innerHTML = ''
    }
  })
}

/* Función para mostrar huespedes */
function setupGuestsFilter(renderCards) {
  const guestContainer = document.getElementById('guestDropdownContainer')
  const guestInput = document.getElementById('guestInput')
  const add_location = document.getElementById('add_location')

  /* Crear la sección de adultos */
  const adultsBlock = document.createElement('div')
  adultsBlock.classList.add('flex', 'flex-col', 'gap-1.5')
  adultsBlock.innerHTML = `
    <span class="text-[0.9rem] font-bold">Adults</span>
    <span class="text-gray-400">Ages 13 or above</span>
    <div class="flex items-center gap-2">
      <button class="inc_button px-2  border rounded">-</button>
      <span class="count">0</span>
      <button class="inc_button px-2  border rounded">+</button>
    </div>
  `

  /* Crear la sección de niños */
  const childrenBlock = document.createElement('div')
  childrenBlock.classList.add('flex', 'flex-col', 'gap-1.5')
  childrenBlock.innerHTML = `
    <span class="text-[0.9rem] font-bold">Children</span>
    <span class="text-gray-400">Ages 12 or below</span>
    <div class="flex items-center gap-2">
      <button class="inc_button px-2  border rounded">-</button>
      <span class="count">0</span>
      <button class="inc_button px-2  border rounded">+</button>
    </div>
  `

  guestContainer.appendChild(adultsBlock)
  guestContainer.appendChild(childrenBlock)

  /* IUnicializar los contadores */
  let adults = 0
  let children = 0

  /* Seleccionar todos los botones */
  const adultBtns = adultsBlock.querySelectorAll('.inc_button')
  const adultSpan = adultsBlock.querySelector('.count')
  const childBtns = childrenBlock.querySelectorAll('.inc_button')
  const childSpan = childrenBlock.querySelector('.count')

  /* Función para mostrar los datos de huespedes y la suma total */
  const updateCount = () => {
    adultSpan.textContent = adults
    childSpan.textContent = children
    const totalGuests = adults + children
    guestInput.value = totalGuests > 0 ? `${totalGuests} guests` : ''
    add_guest.textContent = totalGuests
  }

  /* Seguún se seleccione un botón agregar o decrementar sin bajar del 0 */
  adultBtns[0].addEventListener('click', () => {
    if (adults > 0) adults--
    updateCount()
  })
  adultBtns[1].addEventListener('click', () => {
    adults++
    updateCount()
  })
  childBtns[0].addEventListener('click', () => {
    if (children > 0) children--
    updateCount()
  })
  childBtns[1].addEventListener('click', () => {
    children++
    updateCount()
  })

  /* Desplegar con el input y ocular lo demás */
  const locationInfo = document.getElementById('location_info')
  const add_guest = document.getElementById('add_guest')

  guestInput.addEventListener('focus', () => {
    guestContainer.classList.remove('hidden')
    if (locationInfo) locationInfo.classList.add('hidden')
  })

  /* Hacer la busqueda filtrada solo cuando se de click en search */
  const searchBtn = document.querySelector('#searchBtn button')
  searchBtn.addEventListener('click', () => {
    const totalGuests = adults + children
    const cityInput = document.getElementById('miInput')?.value.trim() || ''
    let filtered = stays

    if (cityInput)
      filtered = filtered.filter(
        (stay) => stay.city.toLowerCase() === cityInput.toLowerCase()
      )
    if (totalGuests > 0)
      filtered = filtered.filter((stay) => stay.maxGuests >= totalGuests)

    const cardsContainer = document.getElementById('cardsContainer')
    if (filtered.length === 0) {
      cardsContainer.innerHTML = `<p class="text-gray-500 text-lg">No stays found</p>`
      add_guest.textContent = 'Add guests'
      add_location.textContent = 'Add location'
    } else {
      renderCards(filtered)
    }

    /* Cerrar el modal */
    guestContainer.classList.add('hidden')
    if (modal) modal.classList.add('hidden')
  })
}

export {
  getInfo,
  renderCards,
  setupModalHandlers,
  setupLocationDropdown,
  setupGuestsFilter,
}
