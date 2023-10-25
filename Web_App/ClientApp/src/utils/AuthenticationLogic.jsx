
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

export async function fetchWithAuthentication(url, params) {
    let res = await fetch(url, params)
    if (res.status === 401) {
        const refreshHandle = await refreshTokens();
        if (!refreshHandle.message) {
            return fetchWithAuthentication(url, params);
        }
        else {
            sessionStorage.removeItem("ID");
            localStorage.removeItem("ID");
            // eslint-disable-next-line no-restricted-globals
            location.replace("/login");
        }
    }
    return res.json();;
}