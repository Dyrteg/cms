import { getData } from "./modules/getData.js";
import { renderGoods } from "./modules/renderRow.js";
import { pagination } from "./modules/pagination.js";
import { openModal } from "./modules/modal.js";
import { total } from "./modules/total.js";
import { base64 } from "./modules/base64.js";

const URL_GOODS = 'https://peppered-lake-thing.glitch.me/api/goods';
const data = await getData(URL_GOODS);
const fullLength = 17;

renderGoods(data,10,fullLength);
pagination(data);
openModal();
total(data);
// getData()