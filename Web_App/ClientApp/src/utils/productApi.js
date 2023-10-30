import { fetchWithAuthentication, } from './AuthenticationLogic';

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
    const body = new FormData();
    body.append('Name', formData.Name);
    body.append('Description', formData.Description);
    body.append('Cost', formData.Cost.toFixed(2).replace(".", ","));
    body.append('Count', parseInt(formData.Count, 10));
    body.append('Image', formData.Image);
    console.log(body);
    const params = {
        method: 'POST',
        credentials: 'include',
        body,
    };
    return fetchWithAuthentication(apiUrl, params);
};