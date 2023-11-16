'use strict'
export const base64 = () => {
    const form = document.querySelector('.pop-up__main');
    const preview = form.querySelector('.preview-img');
    const file = form.querySelector('.add-img');
    const wrapper = form.querySelector('.error-wrapper');

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
            preview.src = src;
            wrapper.textContent = '';
        }else{
            wrapper.classList.add('error');
            wrapper.textContent = 'изображение не должно превышать размер 1 мб';
            preview.removeAttribute('src');
            
        }
    });

    form.addEventListener('submit',async event => {
        event.preventDefault()

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('data', data);
        data.image = await toBase64(data.image)
        console.log('data', data);

        fetch ('https://peppered-lake-thing.glitch.me/image/',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json; charset=UTF-8'
            },
        })
    })
}
