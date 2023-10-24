import { refreshTokens, } from './AuthorizationApi';

export const fetchAddToCart = async (IdClient, IdTowar, TowarCount) => {
    const response = await fetch('https://localhost:7257/cart/addtocart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ IdClient, IdTowar, TowarCount }),
    })
    if (response.status === 401) {
        if (refreshTokens()) {
            console.log("Tokens Successfully refreshed")
            fetchAddToCart(IdClient, IdTowar, TowarCount);
        }
        else {
            throw new Error('Some authorization/authentication problems');
        }
    }
    return response.json();
}

export const fetchGetAllClientCartItems = async (clientId) => {
    try {
        const response = await fetch(`https://localhost:7257/cart/getlistcart?userID=${clientId}`, { credentials: 'include', });
        if (response.status === 401) {
            if (refreshTokens()) {
                console.log("Tokens Successfully refreshed")
                fetchGetAllClientCartItems(clientId);
            }
            else {
                throw new Error('Some authorization/authentication problems');
            }
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchRemoveFromCart = async (IdClient, IdTowar) => {
    const response = await fetch('https://localhost:7257/cart/removefromcart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        credentials: 'include',
        body: JSON.stringify({ IdClient, IdTowar}),
    })
    if (response.status === 401) {
        if (refreshTokens()) {
            console.log("Tokens Successfully refreshed")
            fetchRemoveFromCart(IdClient, IdTowar);
        }
        else {
            throw new Error('Some authorization/authentication problems');
        }
    }
        
}
export const fetchGetAllIndexClientCart = async(clientId) => {
    const response = await fetch(`https://localhost:7257/cart/getindexlistcart?userID=${clientId}`, {
        method: 'GET',
        credentials: 'include',
    })
    if (response.status === 401) {
        if (refreshTokens()) {
            console.log("Tokens Successfully refreshed")
            fetchGetAllIndexClientCart(clientId);
        }
        else {
            throw new Error('Some authorization/authentication problems');
        }
    }
}