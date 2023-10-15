export const fetchDetailsProduct = async (id) => {
    try {
        const response = await fetch(`https://localhost:7257/products/getproductinfo?id=${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }

    
}