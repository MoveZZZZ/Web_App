import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//src = "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
//src={`/path-to-product-images/${item.id}.jpg`}
const ShoppingCartPage = () => {


    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Product 1',
            price: 19.99,
        },
        {
            id: 2,
            name: 'Product 2',
            price: 29.99,
        },
        // Add more items as needed
    ]);

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
    };
    const placeOrder = () => {
        const selectedItems = cartItems.filter((item) => item.selected);
        if (selectedItems.length) {
            console.log('Selected Items for Order:', selectedItems);
        }
        else {
            console.log('Wypierdalaj');
        }
       
    };
    const toggleSelect = (itemId) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === itemId) {
                item.selected = !item.selected;
            }
            return item;
        });
        setCartItems(updatedCart);
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="w-full overflow-x-auto flex items-center justify-center">
                <table className="w-full table-fixed border border-collapse m-5">
                    <thead>
                        <tr>
                            <th className="w-1/12 border p-2">Product</th>
                            <th className="w-1/2 border p-2">Title</th>
                            <th className="w-2/6 border p-2">Price</th>
                            <th className="w-1/6 border p-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody className="text-center break-all">
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border p-2">
                                    <Link to={`/product/${item.id}`}>
                                    <img
                                        src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                                        alt={item.name}
                                        className="object-cover hover: bg-primary-200 maxmax-w-2xl transition duration-300 ease-in-out hover:scale-110"
                                        />
                                    </Link>
                                </td>
                                <td className="border p-2 hover:text-secondary">
                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                </td>
                                <td className="border p-2">${item.price.toFixed(2)}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-primary-500 hover:text-red cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                    <a className="text-primary-500 mx-5">|</a>
                                    <a className="text-primary-500">Select</a>
                                    <input
                                        className="mx-4"
                                        type="checkbox"
                                        checked={item.selected}
                                        onChange={() => toggleSelect(item.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="flex justify-end"> 
            <button
                onClick={placeOrder}
                    className="bg-primary-500 text-primary-100 px-4 py-2 mb-4 rounded hover:bg-secondary m-5 "
                disabled={cartItems.every((item) => !item.selected)}
            >
                Place Order
                </button>
            </div>
        </div>
    );
};
export default ShoppingCartPage;