/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
import { stays } from './stays.js'

const getInfo = async () => {
  return stays
}

const fillCrads = (data) => {
  const { superHost, title, rating, type, beds = `No Info`, photo } = data
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

const renderCards = async (staysArray) => {
  const container = document.getElementById('cardsContainer')
  if (!container) return console.error(`No se encontró el contenedor`)

  container.innerHTML = ''
  staysArray.forEach((stay) => {
    const card = fillCrads(stay)
    container.appendChild(card)
  })
}

export { getInfo, renderCards }
