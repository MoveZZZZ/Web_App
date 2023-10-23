export const fetchCreateOrder = async (ClientID, TowarIdList, TowarCount, Cost, Ordercom, AccessPointId, PaymentMethod) => {
    return fetch('https://localhost:7257/order/addorder',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ClientID, TowarIdList, TowarCount, Cost, Ordercom, AccessPointId, PaymentMethod})
    })
        .then((response) => {
            return response.json();
        })
}