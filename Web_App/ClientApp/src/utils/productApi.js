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

/*export const fetchAddTowar = async (id, name, description, cost, imageUrl, count) => {
    try {
        return fetch('https://localhost:7257/products/addproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, description, cost, imageUrl, count }),
        })
            .then((response) => {
                return response.json();
            });
    }
};*/



