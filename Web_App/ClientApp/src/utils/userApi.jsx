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
    const response = await fetch(apiUrl, {
        method: 'POST',
        body,
    });
    return response.json();
}