export const total = (data) => {
    let totalSum = document.querySelector('.sum');
    let value = 0;
    data.forEach(item => {
        value += (item.price * item.count); 
    });

    totalSum.textContent = value;

    return value;
}