import { fetchWithAuthentication, } from './AuthenticationLogic';

export const fetchGetUserDataProfile = async (userID) => {
    const api = `https://localhost:7257/user/?userID=${userID}`;
    const params = {
        method: 'GET',
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}

export async function fetchUpdatePhotoUser(formData) {
    const api = 'https://localhost:7257/user/changeavatar';
    const body = new FormData();
    body.append('Image', formData.Image);
    body.append('userID', formData.userid);
    const params = {
        method: 'POST',
        credentials: 'include',
        body,
    };
    return fetchWithAuthentication(api, params);
}