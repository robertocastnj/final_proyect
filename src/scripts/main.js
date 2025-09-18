/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
import { getInfo, renderCards } from './utils.js'

let staysArray = []

const main = async () => {
  staysArray = await getInfo() // traemos todos los stays
  renderCards(staysArray) // renderizamos inicialmente
}

main()
