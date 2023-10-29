import { fetchWithAuthentication, } from './AuthenticationLogic';

export const fetchAddToFavorite = (TowarId, ClientID) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ TowarId, ClientID }),
    }
    return fetchWithAuthentication('https://localhost:7257/favorite/addfavorite', params);
}

export const fetchGetAllIndexClientFavorite = (clientId) => {
    const params = {
        method: 'GET',
        credentials: 'include',
    };
    return fetchWithAuthentication(`https://localhost:7257/favorite/getlistfavorite?clientId=${clientId}`, params);
}

export const fetchRemoveFavoriteItem = (TowarId, ClientID) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ TowarId, ClientID }),
    };
    return fetchWithAuthentication('https://localhost:7257/favorite/removefavoriteitem', params);
        
}

export const fetchGetAllClientFavoriteItems = async (clientId) => {
    const params = { credentials: 'include' };
    return fetchWithAuthentication(`https://localhost:7257/favorite/getallfavoriteuser?userID=${clientId}`, params);
}