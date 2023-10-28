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

export const preresetpass = (email) => {
    return fetch(`https://localhost:7257/passwordreset/genresetmail?email=${email}`, { method: 'POST', });
}

export const uidcheck = (uid) => {
    return fetch(`https://localhost:7257/passwordreset/checklink?uid=${uid}`, { method: 'POST', });
}

