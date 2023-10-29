import { fetchWithAuthentication, } from './AuthenticationLogic';
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
    return fetchWithAuthentication('https://localhost:7257/cart/addtocart', params);
}
//!
export const fetchGetAllClientCartItems = async (clientId) => {
    return fetchWithAuthentication(`https://localhost:7257/cart/getlistcart?userID=${clientId}`, { credentials: 'include', });
}

export const fetchRemoveFromCart = (IdClient, IdTowar) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ IdClient, IdTowar }),
    }
    return fetchWithAuthentication('https://localhost:7257/cart/removefromcart', params);
}


export const fetchGetAllIndexClientCart = (clientId) => {
    const params =
    {
        method: 'GET',
        credentials: 'include',
    }
    return fetchWithAuthentication(`https://localhost:7257/cart/getindexlistcart?userID=${clientId}`, params);
}