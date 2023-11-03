export const refreshTokens = async () => {
    return await fetch(`${process.env.REACT_APP_API_IP}/token/refresh_access_token`,
        {
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => {
            return response.json();
        });
};

export const logoutCookieCleanUp = async () => {
    await fetch(`${process.env.REACT_APP_API_IP}/token/logout`,
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
            // eslint-disable-next-line no-restricted-globals
            location.replace("/login");
        }
    }
    return res.json();;
}