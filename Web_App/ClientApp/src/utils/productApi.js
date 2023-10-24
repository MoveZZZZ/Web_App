import { refreshTokens, } from './AuthorizationApi';

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

export const fetchProductsByName = async (name) => {
    try {
        const response = await fetch(`https://localhost:7257/products/search?name=${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export async function addProduct(formData) {
    const apiUrl = 'https://localhost:7257/products/addproduct';
    console.log("ADD PROD")
    const body = new FormData();
    body.append('Name', formData.Name);
    body.append('Description', formData.Description);
    body.append('Cost', formData.Cost);
    body.append('Count', formData.Count);
    body.append('Image', formData.Image);
    const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        body,
    });
    if (response.status === 401) {
        if (refreshTokens()) {
            console.log("Tokens Successfully refreshed")
            addProduct(formData);
        }
        else {
            throw new Error('Some authorization/authentication problems');
        }
    }
    return response.json();
};


