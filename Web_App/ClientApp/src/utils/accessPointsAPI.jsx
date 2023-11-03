import { fetchWithAuthentication, } from './AuthenticationLogic';

export const fetchGetAllCountry = () => {
    const api = `${process.env.REACT_APP_API_IP}/accesspoint/getallaccesspointcountry`;
    const params = {
        credentials: 'include',
        method: 'GET',
    };
    return fetchWithAuthentication(api, params);
}


export const fetchGetAllAPStateCountry = (Country) => {
    const api = `${process.env.REACT_APP_API_IP}/accesspoint/getallaccesspointstatethecountry?Country=${Country}`;
    const params = {
        credentials: 'include',
        method: 'GET',
    };
    return fetchWithAuthentication(api, params);
}

export const fetchGetAllCitysTheState = (State) => {
    const api = `${process.env.REACT_APP_API_IP}/accesspoint/getallcitysthestate?State=${State}`;
    const params = {
        method: 'GET',
        credentials: 'include',
    }
    return fetchWithAuthentication(api, params);
}

export const fetchGetAllAPTheStateAndCity = (State, City) => {
    const api = `${process.env.REACT_APP_API_IP}/accesspoint/getallaccesspointthestateandcity?State=${State}&City=${City}`;
    const params = {
        method: 'GET',
        credentials: 'include',
    }
    return fetchWithAuthentication(api, params);
}