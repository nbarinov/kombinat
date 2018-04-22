export const arrayFilter = (array, q) => {
    const headers = Object.keys(array[0] || {});
    const query = q.toLowerCase();
    
    return array.filter(item => {
        for(let i = 0; i < headers.length; i++) {
            const value = new String(item[headers[i]]).toString().toLowerCase();

            if (value.includes(query)) return item;
        }
    });
};