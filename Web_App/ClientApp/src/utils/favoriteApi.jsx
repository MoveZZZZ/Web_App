import { fetchWithAuthentication, } from './authenticationLogic';

export const fetchAddToFavorite = (TowarId, ClientID) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ TowarId, ClientID }),
    }
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/favorite/addfavorite`, params);
}

export const fetchGetAllIndexClientFavorite = (clientId) => {
    const params = {
        method: 'GET',
        credentials: 'include',
    };
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/favorite/getlistfavorite?clientId=${clientId}`, params);
}

export const fetchRemoveFavoriteItem = (TowarId, ClientID) => {
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ TowarId, ClientID }),
    };
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/favorite/removefavoriteitem`, params);

}

export const fetchGetAllClientFavoriteItems = async (clientId) => {
    const params = { credentials: 'include' };
    return fetchWithAuthentication(`${process.env.REACT_APP_API_IP}/favorite/getallfavoriteuser?userID=${clientId}`, params);
}