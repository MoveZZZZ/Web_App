export const fetchGetAllAPState = () => {
    return fetch('https://localhost:7257/accesspoint/getallaccesspointstate', {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        });
}
export const fetchGetAllAPCity = () => {
    return fetch('https://localhost:7257/accesspoint/getallaccesspointcity', {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        });
}
export const fetchGetAllAPTheState = (State) => {
    return fetch(`https://localhost:7257/accesspoint/getallaccesspointthestate?State=${State}`, {
        method: 'POST',
    })
        .then((response) => {
            return response.json();
        });
}
export const fetchGetAllAPTheStateAndCity = (State, City) => {
    return fetch(`https://localhost:7257/accesspoint/getallaccesspointthestateandcity?State=${State}&City=${City}`, {
        method: 'POST',
    })
        .then((response) => {
            return response.json();
        });
}
export const fetchGetAllCitysTheState = (State) => {
    return fetch(`https://localhost:7257/accesspoint/getallcitysthestate?State=${State}`, {
        method:'POST',
    })
        .then((response) => {
            return response.json();
        })
}