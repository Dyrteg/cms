import { getData } from "./getData.js";
const options = document.querySelector('#number');
export const renderGoods = (data, length, fullLength) => {
    const tbody = document.querySelector('tbody');
    const pageNumber = document.querySelector('.page-number');
    const allLength = fullLength;
    pageNumber.textContent = `1 - ${length} of ${allLength}`
    data.length = length
    const goodsHTML = data.map(goods =>
        `
            <tr class="item">
                <td class="id">${goods.id}</td>
                <td class="title">${goods.title}</td>
                <td class="category">${goods.category}</td>
                <td class="units">${goods.units}</td>
                <td class="count">${goods.count}</td>
                <td class="price">${goods.price}</td>
                <td class="total">${goods.price * goods.count}</td>
                <td>
                    <div class="buttons__wrapper">
                        <button class="wrapper-btn">
                            <img src="${goods.image == 'image/notimage.jpg' ? './assets/img/carbon_no-image.svg' : './assets/img/clarity_picture-line.svg'}" alt="" class="btn-icon image">
                        </button>
                        <button class="wrapper-btn">
                            <img src="./assets/img/akar-icons_edit.svg" alt="" class="btn-icon edit">
                        </button>
                        <button class="wrapper-btn">
                            <img src="./assets/img/ant-design_delete-outlined.svg" alt="" class="btn-icon delete">
                        </button>
                    </div>
                </td>
        </tr>
    ` 
    );
    tbody.innerHTML = goodsHTML.join('');
}

options.addEventListener('change', async(data) => {
    const URL_GOODS = 'https://peppered-lake-thing.glitch.me/api/goods';
    const myData = await getData(URL_GOODS)
    renderGoods(myData, options.value);

})