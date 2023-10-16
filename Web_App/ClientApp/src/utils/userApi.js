export const login = (login, password) => {
    return fetch('https://localhost:7257/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    })
        .then((response) => {
            return response.json();
        });
};
