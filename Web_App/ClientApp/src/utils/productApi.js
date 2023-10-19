export const fetchProducts = async (page, pageSize) => {
    try {
        const response = await fetch(`https://localhost:7257/products?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchProductsByName = async (name, page, pageSize) => {
    try {
        const response = await fetch(`https://localhost:7257/products/search?name=${encodeURIComponent(name)}&page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};



