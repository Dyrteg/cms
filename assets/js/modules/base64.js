'use strict'
export default base64 = () => {
    const file = document.querySelector('.file');
    const preview = document.querySelector('.preview');
    const form = document.querySelector('.form-input');

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
        if(file.files.length > 0){
            const src = URL.createObjectURL(file.files[0]);
            preview.style.display = 'block';
            preview.src = src;
            document.body.style.backgroundImage = `url(${src})`
        }

        // console.log(file.files);
    });

    form.addEventListener('submit',async event => {
        event.preventDefault()

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('data', data);
        data.image = await toBase64(data.image)
        console.log('data', data);

        fetch ('https://peppered-lake-thing.glitch.me/api/goods',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json; charset=UTF-8'
            },
        })
    })
}
