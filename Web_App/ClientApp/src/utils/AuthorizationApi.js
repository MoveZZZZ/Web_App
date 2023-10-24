
export const login = (login, password) => {
    return fetch('https://localhost:7257/Authorization/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ login, password })
    })
        .then(res => {
            return res.json();
        })
};
export const signup = (login, email, password, passwordConfirm) => {
    return fetch('https://localhost:7257/registration/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login, email, password, passwordConfirm }),
    })
        .then((response) => {
            return response.json();
        });
};

export const refreshTokens = async () => {
    return await fetch('https://localhost:7257/token/refresh_access_token',
        {
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => {
            return response.json();
        });   
};

export const logoutCookieCleanUp = async () => {
    await fetch('https://localhost:7257/token/logout',
        {
            method: 'GET',
            credentials: 'include'
        });
}