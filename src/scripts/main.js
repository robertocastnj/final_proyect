import {
  getInfo,
  renderCards,
  setupModalHandlers,
  setupLocationDropdown,
} from "./utils.js";

let staysArray = [];

const main = async () => {
  staysArray = await getInfo();
  renderCards(staysArray);
};

main();
setupModalHandlers();
setupLocationDropdown();
