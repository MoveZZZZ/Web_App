export const fetchDetailsProduct = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_IP}/products/getproductinfo?id=${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}




