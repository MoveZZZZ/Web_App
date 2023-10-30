import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchGetAllClientFavoriteItems, fetchRemoveFavoriteItem } from '../../utils/favoriteApi';
import Spinner from '../../components/Spinner/Spinner';
import { fetchRemoveFromCart, fetchGetAllIndexClientCart } from '../../utils/cartApi';
import Message from "../../components/Message/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const FavoritePage = () => {
    const [favoriteItem, setFavoriteItem] = useState([]);

    const [totalSum, setTotalSum] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const userID = sessionStorage.getItem('ID');

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
    const toggleSelect = (itemId) => {
        const updatedFavorite = favoriteItem.map((item) => {
            if (item.id === itemId) {
                item.selected = !item.selected;
            }
            return item;
        });
        setFavoriteItem(updatedFavorite);
    };





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
                    <div className="bg-white rounded-md w-full">
                        <div className=" flex items-center justify-between">
                            <div>
                                <h2 className="text-gray-600 font-semibold">Favorite</h2>
                            </div>

                        </div>
                        <div>
                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-4 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal ">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Details
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Option
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center break-all">
                                            {favoriteItem.map((item) => (
                                                <tr key={item.productID}>
                                                    <td className="px-5 py-5 border-b border-primary-200 bg-white text-xs">
                                                        <div className="flex-shrink-0 w-20 h-20">
                                                            <Link to={`/product/${item.productID}`}>
                                                                <img
                                                                    src={`data:image/jpeg;base64,${item.imageUrl.toString('base64')}`}
                                                                    alt={item.productName}
                                                                    className="w-full h-full rounded-full object-cover hover: bg-primary-200 maxmax-w-2xl transition duration-300 ease-in-out hover:scale-110" />
                                                            </Link>
                                                        </div>

                                                    </td>
                                                    <td className="px-2 py-5 border-b border-primary-200 bg-white text-sm">
                                                        <Link to={`/product/${item.productID}`}>{item.productName}</Link>
                                                    </td>
                                                    <td className="px-2 py-2 border-b border-primary-200 bg-white text-xs text-justify">{item.description}</td>
                                                    <td className="px-2 py-2 border-b border-primary-200 bg-white text-sm">${item.cost.toFixed(2)}</td>
                                                    <td className="px-2 py-2 border-b border-primary-200 bg-white text-sm">
                                                        <button
                                                            onClick={() => removeFromFavorite(item.productID)}
                                                            className="text-primary-300 hover:text-red cursor-pointer"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className="mx-5 h-5" />

                                                        </button>
                                                        {isInCart(item.productID) ? <button
                                                            onClick={() => removeFromCart(item.productID)}
                                                            className="text-primary-300 hover:text-red cursor-pointer">
                                                            <FontAwesomeIcon icon={faCartShopping} className="mx-2 mt-5 h-5" />
                                                        </button> : <button
                                                            onClick={() => navigate(`/product/${item.productID}`)}

                                                            className="text-primary-300 hover:text-greenLight cursor-pointer">
                                                            <FontAwesomeIcon icon={faMoneyBill} className="mx-2 mt-5 h-5" />

                                                        </button>}


                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    );





};
export default FavoritePage;