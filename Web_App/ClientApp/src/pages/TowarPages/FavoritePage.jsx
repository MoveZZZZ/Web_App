import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchGetAllClientFavoriteItems, fetchRemoveFavoriteItem } from '../../utils/favoriteApi';
import Spinner from '../../components/Spinner/Spinner';
import {fetchRemoveFromCart, fetchGetAllIndexClientCart } from '../../utils/cartApi';
import Message from "../../components/Message/Message";

const FavoritePage = () => {
    const [favoriteItem, setFavoriteItem] = useState([]);

    const [totalSum, setTotalSum] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const userID = localStorage.getItem('UserID');

    const [cartID, setCartID] = useState([]);
    const [isCart, setIsCart] = useState(false);


    const [isMessage, setIsMessage] = useState(false);


    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleCartItems = async () => {
        fetchGetAllIndexClientCart(userID)
            .then((data) => {
                setCartID(data.cartIndexesList);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
    }


    const isInCart = (id) => {
        if (cartID.includes(parseInt(id, 10))) {
            return true;
        }
        return false;
    }
    const uploadData = async () => {
        setIsLoading(true);
        fetchGetAllClientFavoriteItems(userID)
            .then((data) => {
                setFavoriteItem(data.towars);
                setTotalSum(data.summary);
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
        handleCartItems();
        uploadData();
    }, []);

    const removeFromFavorite = (itemId) => {
        fetchRemoveFavoriteItem(itemId, userID)
            .then((data) => {
                setSuccessMessage("Your item removed from Favorite!");
                getMessage();
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                uploadData();
            });
    };

    const removeFromCart = (itemId) => {
        console.log(itemId);
        fetchRemoveFromCart(userID, itemId)
            .then((data) => {
                handleCartItems();
                setSuccessMessage("Your item removed from Cart!");
                getMessage();
                setIsCart(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                uploadData();
            });
    } 
    const getMessage = () => {
        setIsMessage(true);
        setTimeout(() => setIsMessage(false), 5000);
    }
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
    }




    return (
         <>
            {isLoading ?
                <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div> :
                <div className="container mx-auto p-4">
                    {isMessage ?
                        <Message param={successMessage} />
                        :
                        <></>
                    }
                    <h1 className="text-2xl font-semibold mb-4">Favorite</h1>
                    <div className="w-full overflow-x-auto flex items-center justify-center">
                        <table className="w-full table-fixed border border-collapse m-5">
                            <thead>
                                <tr>
                                    <th className="w-2/12 border p-2">Product</th>
                                    <th className="w-1/12 border p-2">Title</th>
                                    <th className="w-1/2 border p-2">Details</th>
                                    <th className="w-1/12 border p-2">Price</th>
                                    <th className="w-1/6 border p-2">Remove</th>
                                </tr>
                            </thead>
                            <tbody className="text-center break-all">
                                {favoriteItem.map((item) => (
                                    <tr key={item.productID}>
                                        <td className="border p-2">
                                            <Link to={`/product/${item.productID}`}>
                                                <img
                                                    src={`data:image/jpeg;base64,${item.imageUrl.toString('base64')}`}
                                                    alt={item.productName}
                                                    className="object-cover hover: bg-primary-200 maxmax-w-2xl transition duration-300 ease-in-out hover:scale-110" />
                                            </Link>
                                        </td>
                                        <td className="border p-2 hover:text-secondary text-2xl text-bolid">
                                            <Link to={`/product/${item.productID}`}>{item.productName}</Link>
                                        </td>
                                        <td className="border p-2 flex-col text-justify">{item.description}</td>
                                        <td className="border p-2">${item.cost.toFixed(2)}</td>
                                        <td className="border p-2">
                                            <button
                                                onClick={() => removeFromFavorite(item.productID)}
                                                className="text-primary-500 hover:text-red cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                            <a className="text-primary-500 mx-3">|</a>
                                            {isInCart(item.productID) ? <button
                                                onClick={() => removeFromCart(item.productID)}
                                                className="text-primary-500 hover:text-greenLight cursor-pointer">
                                                Remove from Cart
                                            </button> : <button
                                                    onClick={() => navigate(`/product/${item.productID}`)}
                                                
                                                className="text-primary-500 hover:text-greenLight cursor-pointer">
                                               Buy
                                            </button>}
                                            

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="flex justify-end mr-5 text-primary-500 text font-bold">Total favorite sum: {totalSum.toFixed(2)}$</div>
                </div>
            }
            </>
    );





};
export default FavoritePage;