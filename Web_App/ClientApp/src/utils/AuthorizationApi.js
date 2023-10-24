﻿export const login = (login, password) => {
    return fetch('https://localhost:7257/Authorization/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ login, password })
    })
        .then(res => {
            console.log(res.headers.get('set-cookie')); // undefined
            console.log(document.cookie); // nope
            return res.json();
        })
};
export const signup = (login, email, password, passwordConfirm) => {
    return fetch('https://localhost:7257/registration/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, email, password, passwordConfirm }),
    })
        .then((response) => {
            return response.json();
        });
};

export const refreshTokens = () => {
    return fetch('https://localhost:7257/token/refresh_access_token',
        {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => {
                console.log(res.headers.get('set-cookie')); // undefined
                console.log(document.cookie); // nope
                return res.json();
        })
};
