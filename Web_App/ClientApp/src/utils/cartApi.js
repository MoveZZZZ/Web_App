export const addToCart = (productid, userid) => {
    return fetch('https://localhost:7257/cart/addtocart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productid, userid }),
    })
        .then((response) => {
            return response.json();
        });
}