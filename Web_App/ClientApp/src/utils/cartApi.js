import { fetchWithAuthentication, } from './authenticationLogic';
//!
export const fetchAddToCart = async (IdClient, IdTowar, TowarCount) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ IdClient, IdTowar, TowarCount }),
    }
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/cart/addtocart`, params);
}
//!
export const fetchGetAllClientCartItems = async (clientId) => {
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/cart/getlistcart?userID=${clientId}`, { credentials: 'include', });
}

export const fetchRemoveFromCart = (IdClient, IdTowar) => {
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ IdClient, IdTowar }),
    }
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/cart/removefromcart`, params);
}


export const fetchGetAllIndexClientCart = (clientId) => {
    const params =
    {
        method: 'GET',
        credentials: 'include',
    }
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/cart/getindexlistcart?userID=${clientId}`, params);
}