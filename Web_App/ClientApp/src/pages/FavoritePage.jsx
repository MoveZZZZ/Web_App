import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FavoritePage = () => {
    const [favoriteItem, setFavoriteItem] = useState([
        {
            id: 1,
            name: 'Product 1',
            price: 19.99,
            description: 'adfsdfsdfafsdfgasdfsfsqadfasdfasfasfasfasdfsadfasdfasdfasdfasdf',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 29.99,
            description: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffxcvbxcvbxcbxcvbcxvb',
        },
        // Add more items as needed
    ]);

    const removeFromFavorite = (itemId) => {
        const updatedFavorite = favoriteItem.filter(item => item.id !== itemId);
        setFavoriteItem(updatedFavorite);
    };
    const placeOrder = () => {
        const selectedItems = favoriteItem.filter((item) => item.selected);
        if (selectedItems.length) {
            console.log('Selected Items for Order:', selectedItems);
        }
        else {
            console.log('Wypierdalaj');
        }

    };
    const toggleSelect = (itemId) => {
        const updatedFavorite = favoriteItem.map((item) => {
            if (item.id === itemId) {
                item.selected = !item.selected;
            }
            return item;
        });
        setFavoriteItem(updatedFavorite);
    };

    const addToCart = (itemId) => {
        ///
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Favorite</h1>
            <div className="w-full overflow-x-auto flex items-center justify-center">
                <table className="w-full table-fixed border border-collapse m-5">
                    <thead>
                        <tr>
                            <th className="w-1/12 border p-2">Product</th>
                            <th className="w-1/3 border p-2">Title</th>
                            <th className="w-1/2 border p-2">Details</th>
                            <th className="w-1/12 border p-2">Price</th>
                            <th className="w-1/6 border p-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody className="text-center break-all">
                        {favoriteItem.map((item) => (
                            <tr key={item.id}>
                                <td className="border p-2">
                                    <Link to={`/product/${item.id}`}>
                                        <img
                                            src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                                            alt={item.name}
                                            className="object-cover hover: bg-primary-200 maxmax-w-2xl transition duration-300 ease-in-out hover:scale-110"/>
                                    </Link>
                                </td>
                                <td className="border p-2 hover:text-secondary text-4xl">
                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                </td>
                                <td className="border p-2 flex-col text-justify">{item.description}</td>
                                <td className="border p-2">${item.price.toFixed(2)}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => removeFromFavorite(item.id)}
                                        className="text-primary-500 hover:text-red cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                    <a className="text-primary-500 mx-3">|</a>
                                    <button
                                        onClick={() => addToCart(item.id)}
                                        className="text-primary-500 hover:text-greenLight cursor-pointer">
                                        Add to cart
                                    </button>
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );





};
export default FavoritePage;