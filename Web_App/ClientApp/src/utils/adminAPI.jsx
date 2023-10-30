import { fetchWithAuthentication, } from './AuthenticationLogic';

export const fetchAllOrders = async () => {
    const api = `https://localhost:7257/order/admin/getallorder`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}

export const fetchAllOrderByEmail = async (search) => {
    const params = {
        method: 'GET',
        credentials: 'include',
    };
    return fetchWithAuthentication(`https://localhost:7257/order/admin/getallorderbyemail?userEmail=${encodeURIComponent(search)}`, params);
};

export const fetchOrderDetailsAdmin = async (orderID, userEmail) => {
    const api = `https://localhost:7257/order/admin/orderdetails?orderID=${orderID}&emailUser=${userEmail}`;
    const params = {
        credentials: 'include',
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