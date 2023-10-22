export const fetchAddToFavorite = (TowarId, ClientID) => {
    return fetch('https://localhost:7257/favorite/addfavorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ TowarId, ClientID }),
    })
        .catch((error) => {
            return error;

    });
}
export const fetchGetAllIndexClientFavorite = (clientId) => {
    return fetch(`https://localhost:7257/favorite/getlistfavorite?clientId=${clientId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        });
}


export const fetchRemoveFavoriteItem = (TowarId, ClientID) => {
    return fetch('https://localhost:7257/favorite/removefavoriteitem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ TowarId, ClientID }),
    })
        .catch((error) => {
            return error;

        });
}


export const fetchGetAllClientFavoriteItems = async (clientId) => {
    try {
        const response = await fetch(`https://localhost:7257/favorite/getallfavoriteuser?userID=${clientId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
