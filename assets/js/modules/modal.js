import { getData } from "./getData.js";
import { loadStyle } from "./loadStyle.js";
import { error } from "./error.js";

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
        resolve(reader.result);
    })

    reader.addEventListener('error', err => {
        reject(err)
    })

    reader.readAsDataURL(file)
});

export const openModal = () => {
    const addGoods = document.querySelector('.add-product-btn');
    const URL_GOODS = 'https://peppered-lake-thing.glitch.me/api/goods';
    const URL_IMAGE = 'https://peppered-lake-thing.glitch.me/image'
    
    window.addEventListener('click', async({target}) => {
        if (target.classList.contains('edit')) {
        loadStyle('./assets/css/modal.css')
        const tr = target.closest('tr');
        const id = tr.querySelector('.id').textContent;
        const data = await getData(URL_GOODS + `/${id}`);
        const main = document.querySelector('.main');
        const modal = `
        <div class="pop-up-active active">
        <img class="pop-up__close" src="assets/img/Group 85.svg" onclick="">
        <div class="pop-up-container">
            
            <div class="pop-up__header">
                <h2 class="pop-up__title">Изменить товар</h2>
                
            </div>
            <form class="pop-up__main">

                <div class="left">
                    <div class="name-input">
                        <label>наименование</label>
                        <input type="text" required class="textarea-name input" name="title" value="${data.title}">
                    </div>
                    <div class="category-input">
                        <label>категория</label>
                        <input type="text" required class="textarea-category input" name="category" value="${data.category}">
                    </div>
                    <div class="units-input">
                        <label>единицы измерения</label>
                        <input type="text" required class="textarea-units input" name="units" value="${data.units}">
                    </div>
                    <div class="discount-input">
                        <label>discount</label>
                        <div class="group">
                            <input class="checkbox" type="checkbox">
                            <input disabled pattern="[0-9]{11}" class="textarea-discount input" name="discount" type="number">
                        </div>
                        
                    </div>
                    <div class="preview-wrapper">
                        <img class="preview-img" src="https://peppered-lake-thing.glitch.me/${data.image}" width="100px" height="100px">
                        <div class="error-wrapper"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="description-input">
                        <label>описание</label>
                        <textarea class="textarea-description" name="description">${data.description}</textarea>
                    </div>
                    <div class="amount-input">
                        <label>Количество</label>
                        <input required class="textarea-amount input" name="count" pattern="\d{1-4}" type="number" value="${data.count}" min=1>
                    </div>
                    <div class="price-input">
                        <label>цена</label>
                        <input required class="textarea-price input" name="price" pattern="\d{1-10}" type="number" value="${data.price}" min=1>
                    </div>
                    <label class="custom-file-upload">
                        <input type="file" class="add-img" name="image"/>
                        добавить изображение
                    </label>
                    
                    <button class="footer__btn" type="submit">
                        изменить товар
                    </button>
                </div>
                
            </form>
            <div class="pop-up__footer">
                <p class="footer__sum">Итоговая стоимость: <span class="sum-icon">$</span><span class="footer-sum"></span></p>
            </div>
        </div>
        
    </div>
        `
        main.insertAdjacentHTML('beforeend', modal)
        window.addEventListener('click', ({target}) =>{
            if (target.classList.contains('pop-up__close')) {
                target.closest('.pop-up-active').remove();
            }
        })
        const popUp = main.querySelector('.pop-up-active');
        const form = popUp.querySelector('form');
        const preview = form.querySelector('.preview-img');
        const file = form.querySelector('.add-img');
        const price = form.querySelector('.textarea-price');
        const sum = popUp.querySelector('.footer-sum');
        const count = form.querySelector('.textarea-amount');
        const title = form.querySelector('.textarea-name');
        const units = form.querySelector('.textarea-units')
        const category = form.querySelector('.textarea-category');
        const wrapper = form.querySelector('.error-wrapper');
        price.addEventListener('input', () => {
            let value = count.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                price.style.outline = 'none';
                price.style.borderColor = '#f00';
                price.value = '';
                price.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                price.style.border = '2px solid rgb(118,118,118)';
            }
        })
        count.addEventListener('input', () => {
            let value = count.value;
            const regEx = /[^\s]/
            sum.textContent = price.value * count.value;
            if (value.trim() == '' || !regEx.test(value)) {
                count.style.outline = 'none';
                count.style.borderColor = '#f00';
                count.value = '';
                count.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                count.style.border = '2px solid rgb(118,118,118)';
            }
        })
        category.addEventListener('input', () => {
            let value = category.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                category.style.outline = 'none';
                category.style.borderColor = '#f00';
                category.value = '';
                category.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                category.style.border = '2px solid rgb(118,118,118)';
            }
        });
        units.addEventListener('input', () => {
            let value = units.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                units.style.outline = 'none';
                units.style.borderColor = '#f00';
                units.value = '';
                units.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                units.style.border = '2px solid rgb(118,118,118)';
            }
        });
        title.addEventListener('input', () => {
            let value = title.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                title.style.outline = 'none';
                title.style.borderColor = '#f00';
                title.value = '';
                title.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                title.style.border = '2px solid rgb(118,118,118)';
            }
        });
        price.addEventListener('input', () => {
            sum.textContent = price.value * count.value;
        });
        sum.textContent = price.value * count.value;
        window.addEventListener('change', ({target})=>{
            if (target.classList.contains('checkbox')) {
                const checkbox = target;
                const wrapper = target.closest('.group');
                const discountInput = wrapper.querySelector('.textarea-discount');
                if (checkbox.checked == true) {
                    discountInput.addEventListener('input',() => {
                        sum.textContent = (+(price.value) - (discountInput.value * (1 / 100) * price.value)) * +(count.value)
                    })
                    discountInput.removeAttribute("disabled")
                    discountInput.setAttribute("required", '');
                }else{
                    discountInput.setAttribute("disabled","")
                }
            }
        })
        file.addEventListener('change', async( ) => {
            if(file.files.length > 0 && file.files[0].size < 1048576){
                const src = URL.createObjectURL(file.files[0]);
                preview.style.display = 'block';
                preview.style.width = "100px";
                preview.style.height = "100px";
                preview.src = src;
                wrapper.textContent = '';
            }else{
                preview.removeAttribute('src');
                wrapper.classList.add('error');
                wrapper.textContent = 'изображение не должно превышать размер 1 мб';
            }
        });
        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const price = document.querySelector('.textarea-price');
            const discount = document.querySelector('.textarea-discount');
            const file = document.querySelector('.add-img');
            const preview = document.querySelector('.preview-img');
            const form = document.querySelector('.pop-up__main');
            const wrapper = document.querySelector('.error-wrapper');

            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.addEventListener('loadend', () => {
                    resolve(reader.result);
                })

                reader.addEventListener('error', err => {
                    reject(err)
                })

                reader.readAsDataURL(file)
            });

            file.addEventListener('change', async( ) => {
                if(file.files.length > 0 && file.files[0].size < 1048576){
                    const src = URL.createObjectURL(file.files[0]);
                    preview.style.display = 'block';
                    preview.style.width = "100px";
                    preview.style.height = "100px";
                    preview.src = src;
                    wrapper.textContent = '';
                }else{
                    preview.removeAttribute('src');
                    wrapper.classList.add('error');
                    wrapper.textContent = 'изображение не должно превышать размер 1 мб';
                }
            });
        
            console.log(price.value);
            const formData = new FormData(e.target);
            const newGoods = Object.fromEntries(formData);
            newGoods.image = await toBase64(newGoods.image)
            fetch(URL_GOODS + `/${id}`,{
                method:'PATCH',
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(newGoods),
            }).then(popUp.remove())

            setTimeout(() => location.reload(), 1000);
        })
        };
    })
    
    addGoods.addEventListener('click', () => {
        loadStyle('./assets/css/modal.css')
        const main = document.querySelector('.main');
        const modal = `
        <div class="pop-up-active active">
        <img class="pop-up__close" src="assets/img/Group 85.svg" onclick="">
        <div class="pop-up-container">
            
            <div class="pop-up__header">
                <h2 class="pop-up__title">Добавить товар</h2>
                
            </div>
            <form class="pop-up__main">

                <div class="left">
                    <div class="name-input">
                        <label>наименование</label>
                        <input type="text" required class="textarea-name input" name="title"">
                    </div>
                    <div class="category-input">
                        <label>категория</label>
                        <input type="text" required class="textarea-category input" name="category">
                    </div>
                    <div class="units-input">
                        <label>единицы измерения</label>
                        <input type="text" required class="textarea-units input" name="units">
                    </div>
                    <div class="discount-input">
                        <label>discount</label>
                        <div class="group">
                            <input class="checkbox" type="checkbox">
                            <input disabled pattern="[0-9]{11}" class="textarea-discount input" name="discount" type="number">
                        </div>
                        
                    </div>
                    <div class="preview-wrapper">
                        <img class="preview-img">
                        <div class="error-wrapper"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="description-input">
                        <label>описание</label>
                        <textarea class="textarea-description" name="description"></textarea>
                    </div>
                    <div class="amount-input">
                        <label>Количество</label>
                        <input required class="textarea-amount input" name="count" pattern="\d{1-4}" type="number" min=0>
                    </div>
                    <div class="price-input">
                        <label>цена</label>
                        <input required class="textarea-price input" name="price" pattern="\d{1-10}" type="number" min=0>
                    </div>
                    <label class="custom-file-upload">
                        <input type="file" class="add-img" name="image"/>
                        добавить изображение
                    </label>
                    
                    <button class="footer__btn" type="submit">
                        добавить товар
                    </button>
                </div>
                
            </form>
            <div class="pop-up__footer">
                <p class="footer__sum">Итоговая стоимость: <span class="sum-icon">$</span><span class="footer-sum">0</span></p>
            </div>
        </div>
        
    </div>
        `
        main.insertAdjacentHTML('beforeend', modal)
        window.addEventListener('click', ({target}) =>{
            if (target.classList.contains('pop-up__close')) {
                const popup = target.closest('.pop-up-active');
                const form = popup.querySelector('.pop-up__main')
                form.reset();
                target.closest('.pop-up-active').remove();
            };
        })

        const popUp = main.querySelector('.pop-up-active');
        const form = popUp.querySelector('form');
        const preview = form.querySelector('.preview-img');
        const file = form.querySelector('.add-img');
        const wrapper = form.querySelector('.error-wrapper');
        const price = form.querySelector('.textarea-price');
        const sum = popUp.querySelector('.footer-sum');
        const count = form.querySelector('.textarea-amount');
        const title = form.querySelector('.textarea-name');
        const units = form.querySelector('.textarea-units')
        const category = form.querySelector('.textarea-category');
        price.addEventListener('input', () => {
            let value = count.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                price.style.outline = 'none';
                price.style.borderColor = '#f00';
                price.value = '';
                price.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                price.style.border = '2px solid rgb(118,118,118)';
            }
        })
        count.addEventListener('input', () => {
            let value = count.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                count.style.outline = 'none';
                count.style.borderColor = '#f00';
                count.value = '';
                count.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                count.style.border = '2px solid rgb(118,118,118)';
            }
        })
        category.addEventListener('input', () => {
            let value = category.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                category.style.outline = 'none';
                category.style.borderColor = '#f00';
                category.value = '';
                category.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                category.style.border = '2px solid rgb(118,118,118)';
            }
        });
        units.addEventListener('input', () => {
            let value = units.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                units.style.outline = 'none';
                units.style.borderColor = '#f00';
                units.value = '';
                units.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                units.style.border = '2px solid rgb(118,118,118)';
            }
        });
        title.addEventListener('input', () => {
            let value = title.value;
            const regEx = /[^\s]/

            if (value.trim() == '' || !regEx.test(value)) {
                title.style.outline = 'none';
                title.style.borderColor = '#f00';
                title.value = '';
                title.placeholder = 'Поле не может быть пустым'
            }else{
                value = value.trim();
                title.style.border = '2px solid rgb(118,118,118)';
            }
        });
        price.addEventListener('input', () => {
            sum.textContent = price.value * count.value;
        });
        window.addEventListener('change', ({target})=>{
            console.log(target);
            if (target.classList.contains('checkbox')) {
                const checkbox = target;
                const wrapper = target.closest('.group');
                const discountInput = wrapper.querySelector('.textarea-discount');
                if (checkbox.checked == true) {
                    discountInput.addEventListener('input',() => {
                        sum.textContent = (+(price.value) - (discountInput.value * (1 / 100) * price.value)) * +(count.value)
                    })
                    discountInput.removeAttribute("disabled")
                    discountInput.setAttribute("required", '');
                }else{
                    discountInput.setAttribute("disabled","")
                }
            }
        })
        file.addEventListener('change', async( ) => {
            if(file.files.length > 0 && file.files[0].size < 1048576){
                const src = URL.createObjectURL(file.files[0]);
                preview.style.display = 'block';
                preview.style.width = "100px";
                preview.style.height = "100px";
                preview.src = src;
                wrapper.textContent = '';
            }else{
                preview.removeAttribute('src');
                wrapper.classList.add('error');
                wrapper.textContent = 'изображение не должно превышать размер 1 мб';
            }
        });
        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const price = form.querySelector('.textarea-price');
            const discount = form.querySelector('.textarea-discount');

            const formData = new FormData(e.target);
            const newGoods = Object.fromEntries(formData);

            newGoods.image = await toBase64(newGoods.image)

            fetch(URL_GOODS,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(newGoods),
            }).then(response=>{console.log(response.text()); popUp.remove()})

            setTimeout(() => location.reload(), 1000);
        })
    })

    window.addEventListener('click', async({target}) => {
        if (target.classList.contains('delete')) {
            const tr = target.closest('tr');
            const id = tr.querySelector('.id').textContent;
            const data = await getData(URL_GOODS + `/${id}`);
            console.log(data);
            console.log(id);
			
			fetch(URL_GOODS + `/${id}`, {
				method: 'DELETE',
			})
			.then(response => response.json())	

			target.parentNode.parentNode.remove();

            setTimeout(() => location.reload(), 500);
        }
    });
    
    
    window.addEventListener('click', async({target}) => {
        if (target.classList.contains('image')) {
            let image = target.src.slice(33);
            if (image === 'carbon_no-image.svg') {
                error(target);
            } else {
                loadStyle('./assets/css/modal.css')
                const tr = target.closest('tr');
                const id = tr.querySelector('.id').textContent;
                const data = await getData(URL_GOODS + `/${id}`);
                const main = document.querySelector('.main');
                const modal = `
                <div class="pop-up-active active">
                <img class="pop-up__close" src="assets/img/Group 85.svg" onclick="">
                    <div class="preview-wrapper">
                        <img class="preview-img" src="https://peppered-lake-thing.glitch.me/${data.image}" width="700px" height="510px" style="margin-top: 50px; margin-left: 50px;">
                        <div class="error-wrapper"></div>
                    </div>
                </div>
                `
    
                main.insertAdjacentHTML('beforeend', modal)
                window.addEventListener('click', ({target}) =>{
                    if (target.classList.contains('pop-up__close')) {
                        target.closest('.pop-up-active').remove();
                    }
                })
            }
        }
    }); 
}   