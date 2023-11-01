import { fetchWithAuthentication, } from './AuthenticationLogic';

export const fetchGetAllCountry = () => {
    const api = 'https://localhost:7257/accesspoint/getallaccesspointcountry';
    const params = {
        credentials: 'include',
        method: 'GET',
    };
    return fetchWithAuthentication(api, params);
}


export const fetchGetAllAPStateCountry = (Country) => {
    const api = `https://localhost:7257/accesspoint/getallaccesspointstatethecountry?Country=${Country}`;
    const params = {
        credentials: 'include',
        method: 'GET',
    };
    return fetchWithAuthentication(api, params);
}

export const fetchGetAllCitysTheState = (State) => {
    const api = `https://localhost:7257/accesspoint/getallcitysthestate?State=${State}`;
    const params = {
        method: 'GET',
        credentials: 'include',
    }
    return fetchWithAuthentication(api, params);
}

export const fetchGetAllAPTheStateAndCity = (State, City) => {
    const api = `https://localhost:7257/accesspoint/getallaccesspointthestateandcity?State=${State}&City=${City}`;
    const params = {
        method: 'GET',
        credentials: 'include',
    }
    return fetchWithAuthentication(api, params);
}