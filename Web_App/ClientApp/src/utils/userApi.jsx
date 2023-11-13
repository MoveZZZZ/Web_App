import { fetchWithAuthentication, } from './authenticationLogic';

export const fetchGetUserDataProfile = async (userID) => {
    const api = `${process.env.REACT_APP_API_IP}/user/?userID=${userID}`;
    const params = {
        method: 'GET',
        credentials: 'include',
    };
    return fetchWithAuthentication(api, params);
}

export async function fetchUpdatePhotoUser(formData) {
    const api = `${process.env.REACT_APP_API_IP}/user/changeavatar`;
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
    const apiUrl = `${process.env.REACT_APP_API_IP}/user/changeemail`;
    const body = new FormData();
    body.append('UserID', formData.UserID);
    body.append('UserName', null);
    body.append('Email', formData.Email);
    body.append('Password', formData.Password);
    body.append('NewPassword', null);
    body.append('RepeatNewPassword', null);
    const params = {
        method: 'POST',
        credentials: 'include',
        body,
    };
    return fetchWithAuthentication(apiUrl, params);
}

export async function fetchUpdateLoginUser(formData) {
    const apiUrl = `${process.env.REACT_APP_API_IP}/user/changelogin`;
    const body = new FormData();
    body.append('UserID', formData.UserID);
    body.append('UserName', formData.UserName);
    body.append('Email', null);
    body.append('Password', formData.Password);
    body.append('NewPassword', null);
    body.append('RepeatNewPassword', null);
    const params = {
        method: 'POST',
        credentials: 'include',
        body,
    };
    return fetchWithAuthentication(apiUrl, params);
}
export async function fetchUpdatePasswordUser(formData) {
    const apiUrl = `${process.env.REACT_APP_API_IP}/user/changepassword`;
    const body = new FormData();
    body.append('UserID', formData.UserID);
    body.append('UserName', null);
    body.append('Email', null);
    body.append('Password', formData.Password);
    body.append('NewPassword', formData.NewPassword);
    body.append('RepeatNewPassword', formData.RepeatNewPassword);
    const params = {
        method: 'POST',
        credentials: 'include',
        body,
    };
    return fetchWithAuthentication(apiUrl, params);
}
export async function fetchUpdateRemoveAccoutUser(formData) {
    const apiUrl = `${process.env.REACT_APP_API_IP}/user/deleteaccount`;
    const body = new FormData();
    body.append('UserID', formData.UserID);
    body.append('UserName', null);
    body.append('Email', null);
    body.append('Password', formData.Password);
    body.append('NewPassword', null);
    body.append('RepeatNewPassword', null);
    const params = {
        method: 'DELETE',
        credentials: 'include',
        body,
    };
    return fetchWithAuthentication(apiUrl, params);
}

export const fetchVerifyEmailAfterChange = async (UID) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_IP}/user/verifymail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UID }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}