'use strict'

const getData = async() => {
    const data = await fetch(`https://peppered-lake-thing.glitch.me/api/goods`);
    return data.json()
}



export { getData }
