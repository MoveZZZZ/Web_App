import { fetchWithAuthentication, } from './authenticationLogic';

export const fetchProducts = async (page, pageSize) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_IP}/products?page=${page}&pageSize=${pageSize}`);
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
        const response = await fetch(`${process.env.REACT_APP_API_IP}/products/search?name=${encodeURIComponent(name)}`);
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
    const apiUrl = `${process.env.REACT_APP_API_IP}/products/addproduct`;
    const body = new FormData();
    body.append('Name', formData.Name);
    body.append('Description', formData.Description);
    body.append('Cost', formData.Cost);
    body.append('Count', parseInt(formData.Count, 10));
    body.append('Image', formData.Image);
    const params = {
        method: 'POST',
        credentials: 'include',
        body,
    };
    return fetchWithAuthentication(apiUrl, params);
};
export const fetchGetTop3Products = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_IP}/products/gettop3products`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}