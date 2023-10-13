export const login = (email, password) => {
    return fetch('https://localhost:7257/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        });
};

// Function to handle login errors
export const handleLoginError = (error) => {
    console.error('Login failed:', error.message);
};