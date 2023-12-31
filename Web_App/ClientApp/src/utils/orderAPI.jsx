﻿import { fetchWithAuthentication, } from './authenticationLogic';

export const fetchCreateOrder = async (ClientID, TowarIdList, TowarCount, Cost, Ordercom, AccessPointId, PaymentMethod, ClientName, ClientLastName, Phone) => {
    const api = `${process.env.REACT_APP_API_IP}/order/addorder`;
    const params =
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ClientID, TowarIdList, TowarCount, Cost, Ordercom, AccessPointId, PaymentMethod, ClientName, ClientLastName, Phone })
    };
    return fetchWithAuthentication(api, params);
}

export const fetchOrderDetails = async (orderID, clientID) => {
    const api = `${process.env.REACT_APP_API_IP}/order/?orderID=${orderID}&clientID=${clientID}`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}

export const fetchAllUserOrders = async (userID) => {
    const api = `${process.env.REACT_APP_API_IP}/order/getallordersuser?userID=${userID}`;
    const params = {
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}