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
export async function fetchUpdateEmailUser(formData) {
    const apiUrl = 'https://localhost:7257/user/changeemail';
    const body = new FormData();
    body.append('UserID', formData.UserID);
    body.append('UserName', null);
    body.append('Email', formData.Email);
    body.append('Password', formData.Password);
    body.append('NewPassword', null);
    body.append('RepeatNewPassword', null);
    const response = await fetch(apiUrl, {
        method: 'POST',
        body,
    });
    return response.json();
}

export async function fetchUpdateLoginUser(formData) {
    const apiUrl = 'https://localhost:7257/user/changelogin';
    const body = new FormData();
    body.append('UserID', formData.UserID);
    body.append('UserName', formData.UserName);
    body.append('Email', null);
    body.append('Password', formData.Password);
    body.append('NewPassword', null);
    body.append('RepeatNewPassword', null);
    const response = await fetch(apiUrl, {
        method: 'POST',
        body,
    });
    return response.json();
}
export async function fetchUpdatePasswordUser(formData) {
    const apiUrl = 'https://localhost:7257/user/changepassword';
    const body = new FormData();
    body.append('UserID', formData.UserID);
    body.append('UserName', null);
    body.append('Email', null);
    body.append('Password', formData.Password);
    body.append('NewPassword', formData.NewPassword);
    body.append('RepeatNewPassword', formData.RepeatNewPassword);
    const response = await fetch(apiUrl, {
        method: 'POST',
        body,
    });
    return response.json();
}
export async function fetchUpdateRemoveAccoutUser(formData) {
    const apiUrl = 'https://localhost:7257/user/deleteaccount';
    const body = new FormData();
    body.append('UserID', formData.UserID);
    body.append('UserName', null);
    body.append('Email', null);
    body.append('Password', formData.Password);
    body.append('NewPassword', null);
    body.append('RepeatNewPassword', null);
    const response = await fetch(apiUrl, {
        method: 'POST',
        body,
    });
    return response.json();
}