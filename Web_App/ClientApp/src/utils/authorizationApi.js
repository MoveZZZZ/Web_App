export const login = (login, password) => {
    return fetch(`${process.env.REACT_APP_API_IP}/Authorization/login`, {
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
    return fetch(`${process.env.REACT_APP_API_IP}/registration/signup`, {
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

export const preresetpass = (Email) => {
    return fetch(`${process.env.REACT_APP_API_IP}/passwordreset/genresetmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email }),
    }).then((response) => {
        return response.json();
    });

};

export const fetchIsExistUID = async (UID) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_IP}/passwordreset/checklink`, {
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

export const fetchChangePassword = (Password, ConfirmPassword, UID) => {
    return fetch(`${process.env.REACT_APP_API_IP}/passwordreset/recoverypage/changepassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Password, ConfirmPassword, UID }),
    })
        .then((response) => {
            return response.json();
        });
}

export const fetchIsExistOAuthUID = async (UID) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_IP}/mfauth/checklink`, {
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

export const fetchMFAuthCodeSubmit = async (Code, UID) => {
    return fetch(`${process.env.REACT_APP_API_IP}/mfauth/codesubmit`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Code, UID }),
    })
        .then((response) => {
            return response.json();
        });
}

export const fetchVerifyEmail = async (UID) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_IP}/registration/verifymail`, {
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

