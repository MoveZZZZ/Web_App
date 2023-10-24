export const fetchCreateOrder = async (ClientID, TowarIdList, TowarCount, Cost, Ordercom, AccessPointId, PaymentMethod) => {
    return fetch('https://localhost:7257/order/addorder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ClientID, TowarIdList, TowarCount, Cost, Ordercom, AccessPointId, PaymentMethod })
    })
        .then((response) => {
            return response.json();
        })
}
export const fetchOrderDetails = async (orderID, clientID) => {
    try {
        const response = await fetch(`https://localhost:7257/order/?orderID=${orderID}&clientID=${clientID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export const fetchAllUserOrders = async (userID) => {
    try {
        const response = await fetch(`https://localhost:7257/order/getallordersuser?userID=${userID}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw error;
    }
}