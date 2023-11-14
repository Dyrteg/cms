export const getData = async(url) => {
    
    const data = fetch(url);
    const result = await data.then(response => response.json())

    return result
}