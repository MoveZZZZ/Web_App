import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { fetchGetAllClientCartItems, } from "../../utils/cartApi"
import Message from "../../components/Message/Message";
import ErrorMessage from "../../components/Message/ErrorMessage";
//src = "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
//src={`/path-to-product-images/${item.id}.jpg`}
const ShoppingCartPage = () => {


    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedItemList, setSelectedItemList] = useState([]);



    const userID = localStorage.getItem('UserID');


    const [isMessage, setIsMessage] = useState(false);


    const [message, setMessage] = useState("");


    const [isError, setIsError] = useState(false);

    const uploadData = async () => {
        setIsLoading(true);
        fetchGetAllClientCartItems(userID)
            .then((data) => {
                setCartItems(data.towar);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);
            });
    }

    useEffect(() => {
        uploadData();
    }, []);



    const removeFromCart = (itemId) => {
        setMessage("Your item removed from Cart!");
        getMessage();

    };
    const placeOrder = () => {
        if (selectedItemList.length) {
        }
        else {
            setMessage("Choise item(s), please!");
            getErrorMessage();
        }
       
    };
    const toggleSelect = (itemId) => {
        if (selectedItemList.includes(itemId)) {
            setSelectedItemList(selectedItemList.filter((item) => item !== itemId));
        } else {
            setSelectedItemList([...selectedItemList, itemId]);
        }
    };

    const getMessage = () => {
        setIsMessage(true);
        setTimeout(() => setIsMessage(false), 2500);
    }
    const getErrorMessage = () => {
        setIsError(true);
        setTimeout(() => setIsError(false), 2500);
    }

    return (
         <>
            {isLoading ?
                <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div> :
                <div className="container mx-auto p-4">
                    {isMessage ?
                        <Message param={message} />
                        :
                        <></>
                    }
                    {isError ?
                        <ErrorMessage param={message} />
                    :
                    <></>}
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    <div className="w-full overflow-x-auto flex items-center justify-center ">
                        <table className="w-full table-fixed border border-collapse m-5">
                            <thead>
                                <tr>
                                    <th className="w-1/6 border p-2 rounded-tl-sm">Product</th>
                                    <th className="w-1/12 border p-2">Title</th>
                                    <th className="w-1/12 border p-2">Price</th>
                                    <th className="w-1/12 border p-2">Count</th>
                                    <th className="w-1/12 border p-2">Total</th>
                                    <th className="w-1/6 border p-2">Remove</th>
                                </tr>
                            </thead>
                            <tbody className="text-center break-all">
                                {cartItems.map((item) => (
                                    <tr key={item.towarID}>
                                        <td className="border p-2">
                                            <Link to={`/product/${item.towarID}`}>
                                                <img
                                                    src={`data:image/jpeg;base64,${item.image.toString('base64')}`}
                                                    alt={item.towarName}
                                                    className="object-cover hover: bg-primary-200 maxmax-w-2xl transition duration-300 ease-in-out hover:scale-110"
                                                />
                                            </Link>
                                        </td>
                                        <td className="border p-2 hover:text-secondary text-4xl">
                                            <Link to={`/product/${item.towarID}`}>{item.towarName}</Link>
                                        </td>
                                        <td className="border p-2">${item.towarPrice.toFixed(2)}</td>
                                        <td className="border p-2">{item.count}</td>
                                        <td className="border p-2">${item.sumPrice}</td>
                                        <td className="border p-2">
                                            <button
                                                onClick={() => removeFromCart(item.towarID)}
                                                className="text-primary-500 hover:text-red cursor-pointer">
                                                Remove
                                            </button>
                                            <a className="text-primary-500 mx-5">|</a>
                                            <a className="text-primary-500">Select</a>
                                            <input
                                                className="mx-4"
                                                type="checkbox"
                                                checked={item.selected}
                                                onChange={() => toggleSelect(item.towarID)}
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
                            className="bg-primary-500 text-primary-100 px-4 py-2 mb-4 rounded hover:bg-secondary m-5"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            }
           </>

    );
};
export default ShoppingCartPage;