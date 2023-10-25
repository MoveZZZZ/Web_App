import { refreshTokens, } from './AuthorizationApi';

export const fetchAddToCart = async (IdClient, IdTowar, TowarCount) => {
    return fetch('https://localhost:7257/cart/addtocart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IdClient, IdTowar, TowarCount }),
    })
        .then((response) => {
            return response.json();
        });
}

export const fetchGetAllClientCartItems = async (clientId) => {
    try {
        const response = await fetch(`https://localhost:7257/cart/getlistcart?userID=${clientId}`, { credentials: 'include', });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const fetchRemoveFromCart = (IdClient, IdTowar) => {
    return fetch('https://localhost:7257/cart/removefromcart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IdClient, IdTowar }),
    })
        .catch((error) => {
            console.log(error)
        });
}


export const fetchGetAllIndexClientCart = (clientId) => {
    return fetch(`https://localhost:7257/cart/getindexlistcart?userID=${clientId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        });
}