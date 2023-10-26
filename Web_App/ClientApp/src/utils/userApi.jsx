export const fetchGetUserDataProfile = async (userID) => {
    return fetch(`https://localhost:7257/user/?userID=${userID}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        });

}
export async function fetchUpdatePhotoUser (formData) {
    const apiUrl = 'https://localhost:7257/user/changeavatar';
    const body = new FormData();
    body.append('Image', formData.Image);
    body.append('userID', formData.userid);
    console.log(formData);
    const response = await fetch(apiUrl, {
        method: 'POST',
        body,
    });
    return response.json();
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