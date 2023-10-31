import { fetchWithAuthentication, } from './AuthenticationLogic';

export const fetchAllOrders = async () => {
    const api = `https://localhost:7257/order/admin/getallorder`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}

export const fetchAllOrderByEmail = async (Email) => {
    const api = `https://localhost:7257/order/admin/getallorderbyemail`;
    //let email = encodeURIComponent(search);
    const params = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email }),
    };
    return fetchWithAuthentication(api, params);
};

export const fetchOrderDetailsAdmin = async (orderID, email) => {
    const api = `https://localhost:7257/order/admin/orderdetails`;
    const params = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID, email }),
    };
    return fetchWithAuthentication(api, params);
}
export const fetchDeleteOrderByID = async (orderID) => {
    const api = `https://localhost:7257/order/admin/removeorder?orderID=${orderID}`;
    const params = {
        method: 'DELETE',
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}

export const fetchChangeProductData = async (formData) => {
    const api = `https://localhost:7257/products/productdetails/admin/changeproduct`
    const params = {
        method: 'POST',
        body: formData,
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchChangeProductDataWithoutImage = async (formData) => {
    console.log(formData);
    const api = `https://localhost:7257/products/productdetails/admin/changeproductwithoutimage`
    const params = {
        method: 'POST',
        body: formData,
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}