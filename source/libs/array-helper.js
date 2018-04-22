export const arrayFilter = (array, q) => {
    const headers = Object.keys(array[0] || {});
    
    return array.filter(item => {
        for(let i = 0; i < headers.length; i++) {
            if (item[headers[i]].includes(q)) return item;
        }
    });
};