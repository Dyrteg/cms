import { renderGoods } from "./renderRow.js";
import { getData } from "./getData.js";
export const pagination = (array) => {
    const data = array;
    const URL_GOODS = 'https://peppered-lake-thing.glitch.me/api/goods';
    const buttons = document.querySelectorAll('.control__btn');
    const pageNumber = document.querySelector('.page-number');
    let currentPage = 1
    let currentRows = 10;
    pageNumber.textContent = `${currentPage} - ${currentRows} of ${data.length}`
    buttons.forEach(e => {
        e.addEventListener('click', async() => {
            if (array.length === 10) {

                if (e.classList.contains('right-btn')) {
                    const tbody = document.querySelector('tbody');
                    const fullData = await getData(URL_GOODS);
                    const newData = fullData.slice(currentRows,currentRows + 10);
                    renderGoods(newData,10)
                }
                if (e.classList.contains('left-btn')) {
                    currentPage -= 1;
                    const tbody = document.querySelector('tbody');
                    const fullData = await getData(URL_GOODS);
                    const newData = fullData.slice(currentRows-10,currentRows);
                    const pageNumber = document.querySelector('.page-number');
                    renderGoods(newData,10)
                }
            };
        })
    });

}