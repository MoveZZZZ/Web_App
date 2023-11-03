import { fetchWithAuthentication, } from './AuthenticationLogic';

export const fetchAllOrders = async () => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallorder`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}

export const fetchAllOrderByEmail = async (Email) => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallorderbyemail`;
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
    const api = `${process.env.REACT_APP_API_IP}/order/admin/orderdetails`;
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
export const fetchOrderArchiveDetailsAdmin = async (orderID, username) => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/orderdetails/archive?orderID=${orderID}&username=${username}`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchDeleteOrderByID = async (orderID) => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/removeorder?orderID=${orderID}`;
    const params = {
        method: 'DELETE',
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}

export const fetchChangeProductData = async (formData) => {
    const api = `${process.env.REACT_APP_API_IP}/products/productdetails/admin/changeproduct`
    const params = {
        method: 'PUT',
        body: formData,
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchChangeProductDataWithoutImage = async (formData) => {
    const api = `${process.env.REACT_APP_API_IP}/products/productdetails/admin/changeproductwithoutimage`
    const params = {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchAllArchiveOrders = async () => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallarchiveorder`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchAllArchiveOrderByUsername = async (search) => {
    const params = {
        method: 'GET',
        credentials: 'include',
    };
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/order/admin/getallarchiveorder/searchusername?username=${encodeURIComponent(search)}`, params);
};
export const fetchAllOrdersLastDay = async () => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallorder/lastday`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchAllOrdersLastMonth = async () => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallorder/lastmonath`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchAllOrdersLastYear = async () => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallorder/lastyear`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchAllOrdersThisDay = async () => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallorder/today`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchAllOrdersThisMonth = async () => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallorder/thismonath`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
export const fetchAllOrdersThisYear = async () => {
    const api = `${process.env.REACT_APP_API_IP}/order/admin/getallorder/thisyear`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}
