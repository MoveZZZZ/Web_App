import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { fetchDetailsProduct, } from '../../utils/productDetailsApi';
import { fetchAddToCart, fetchGetAllIndexClientCart, fetchRemoveFromCart, } from '../../utils/cartApi';
import { fetchAddToFavorite, fetchGetAllIndexClientFavorite, fetchRemoveFavoriteItem } from "../../utils/favoriteApi"
import { fetchChangeProductData, fetchChangeProductDataWithoutImage } from "../../utils/adminAPI"
import Spinner from '../../components/Spinner/Spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus, faHeartCircleXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Message from "../../components/Message/Message";
import { AuthContext } from "../../context";



const ProductDetail = () => {
    const { isAdmin } = useContext(AuthContext);
    const { id } = useParams();
    const userID = sessionStorage.getItem('ID');
    const [count, setCount] = useState(0);
    const [productDetails, setProductDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteID, setFavoriteID] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [cartID, setCartID] = useState([]);
    const [isCart, setIsCart] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(productDetails.description);
    const [editedImage, setEditedImage] = useState('');
    const [editedPrice, setEditedPrice] = useState(productDetails.cost);
    const [editedStock, setEditedStock] = useState(productDetails.count);


    const increaseCount = () => {
        if (count < productDetails.count) {
            setCount(count + 1);
        }
    }

    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const handleData = async () => {
        setIsLoading(true);
        fetchDetailsProduct(id)
            .then((data) => {
                setProductDetails(data);
                setEditedDescription(data.description);
                setEditedPrice(data.cost);
                setEditedStock(data.count)
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 250);
            });
    }

    const isInFavorite = () => {
        if (favoriteID.includes(parseInt(id, 10))) {
            return true;
        }
        return false;
    }

    const isInCart = () => {
        if (cartID.includes(parseInt(id, 10))) {
            return true;
        }
        return false;
    }

    const handleCartItems = async () => {
        fetchGetAllIndexClientCart(userID)
            .then((data) => {
                setCartID(data.cartIndexesList);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
    }

    const handleFavorite = async () => {
        fetchGetAllIndexClientFavorite(userID)
            .then((data) => {
                setFavoriteID(data.listIndex);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
    }

    const addToFavorite = async () => {
        fetchAddToFavorite(id, userID)
            .then((data) => {
                setSuccessMessage("Your item added successfully!");
                getMessage();
                setIsLoading(true);
                setIsFavorite(true);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            });
    }

    const removeToFavorite = async () => {
        fetchRemoveFavoriteItem(id, userID)
            .then((data) => {
                setSuccessMessage("Your item removed successfully!");
                getMessage();
                setIsLoading(true);
                handleFavorite();
            })
            .catch((error) => {
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            });
    }

    const addItemsToCart = async () => {
        fetchAddToCart(userID, id, count)
            .then((data) => {
                setSuccessMessage("Your item added to Cart!");
                getMessage();
                setIsLoading(true);
                setIsCart(true);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            });
    }

    const removeItemsFromCart = async () => {
        fetchRemoveFromCart(userID, id)
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
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            });
    }

    const getMessage = () => {
        setIsMessage(true);
        setTimeout(() => setIsMessage(false), 5000);
    }

    const saveChanges = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('Id', id);
        formData.append('Name', editedPrice);
        formData.append('Description', editedDescription);
        formData.append('Cost', editedPrice.toString().replace(",", "."));
        formData.append('Count', parseInt(editedStock));

        if (editedImage) {
            formData.append('Image', editedImage);
            fetchChangeProductData(formData)
                .then((data) => {

                })
                .catch((error) => {
                    console.error(error);
                })
        }
        else {
            fetchChangeProductDataWithoutImage(formData)
                .then((data) => {

                })
                .catch((error) => {
                    console.error(error);
                })
        }

        setTimeout(() => {
            handleData();
            setIsLoading(false);
        }, 1000);
        setIsEditing(false);
    };

    useEffect(() => {
        handleData();
        if (userID) {
            handleFavorite();
            handleCartItems();
        }
    }, []);

    useEffect(() => {
        if (userID) {
            const isFav = isInFavorite();
            setIsFavorite(isFav)
        }
    }, [favoriteID]);

    useEffect(() => {
        if (userID) {
            const isAdded = isInCart();
            setIsCart(isAdded)
        }
    }, [cartID]);

    return (
        <>
            {isLoading ?
                <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div> :
                <div className="flex p-6 bg-white rounded-lg shadow-lg">
                    {isMessage ?
                        <Message param={successMessage} />
                        :
                        <></>
                    }
                    <div className="w-full flex justify-evenly max-lg:items-center gap-6 max-lg:flex-col mt-16 mb-16">
                        <div className="flex flex-col justify-between gap-6 p-6">
                            <img
                                src={`data:image/jpeg;base64,${productDetails.imageUrl.toString('base64')}`}
                                alt={productDetails.name}
                                className="w-xl h-xl  rounded-md shadow-md object-cover"
                            />
                            {isEditing ? (
                                <input
                                    type="file"
                                    id="Image"
                                    name="Image"
                                    accept="image/*"
                                    onChange={(e) => setEditedImage(e.target.files[0])}
                                    className="border border-gray-300 rounded-lg p-2 h-12 w-full mt-5"
                                />
                            ) : (
                                null
                            )}
                        </div>
                        <div className="w-1/2 max-lg:w-full max-lg:px-16 max-sm:px-4">
                            <h1 className="text-3xl font-semibold text-primary-700 text-center mb-4">
                                {productDetails.name}</h1>
                            {isEditing ? (
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    className="text-lg mb-4 text-primary-400 text-justify w-full h-2/3"
                                />
                            ) : (
                                <p className="text-lg mb-4 text-primary-500 text-justify">
                                    {productDetails.description}
                                </p>
                            )}
                            <div className="flex justify-between mb-4">
                                {isEditing ? (
                                    <input
                                        placeholder="Price"
                                        type="number"
                                        value={editedPrice}
                                        onChange={(e) => setEditedPrice(e.target.value)}
                                        className="text-primary-600 font-bold"
                                    />
                                ) : (
                                    <span className="text-primary-600 font-bold">Price: ${productDetails.cost.toFixed(2)}</span>
                                )}
                                {isEditing ? (
                                    <>
                                        <input
                                            type="number"
                                            value={editedStock}
                                            onChange={(e) => setEditedStock(e.target.value)}
                                            className="text-primary-600 font-bold"
                                        />
                                    </>
                                ) : (
                                    <span className="text-primary-600 font-bold">In Stock: {productDetails.count}</span>
                                )}
                            </div>
                            <div className="flex justify-start items-center gap-6">
                                {isAdmin ? (
                                    <div className="flex w-full justify-center items-center">
                                        {isEditing ? (

                                            <button
                                                className="w-72 bg-primary-300 text-white rounded-full px-6 py-2 hover:bg-primary-400 focus:outline-none"
                                                onClick={saveChanges}
                                            >
                                                Save Changes
                                            </button>
                                        ) : (
                                            <button
                                                className="w-72 bg-primary-300 text-white rounded-full px-6 py-2 hover:bg-primary-400 focus:outline-none"
                                                onClick={() => setIsEditing(!isEditing)}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                ) : null}
                                {!isAdmin ? (
                                    <>
                                        {isCart ? (
                                            <div className="w-full flex justify-center itesm-center">
                                                <button className="bg-primary-300 text-white rounded-full px-6 py-2 hover:bg-primary-400 focus:outline-none"
                                                    onClick={removeItemsFromCart}>
                                                    Remove from Cart
                                                </button>
                                                {!isAdmin ?
                                                    <i>{!isFavorite ? <FontAwesomeIcon
                                                        icon={faHeartCirclePlus}
                                                        className="fa-2x text-primary-300 hover:text-red cursor-pointer focus:outline-none mx-10 my-2"
                                                        onClick={() => {
                                                            addToFavorite();
                                                        }
                                                        }
                                                    /> : <FontAwesomeIcon
                                                        icon={faHeartCircleXmark}
                                                        className="fa-2x text-red hover:text-primary-400 cursor-pointer focus:outline-none mx-10 my-2"
                                                        onClick={() => { removeToFavorite() }
                                                        }
                                                    />}
                                                    </i>
                                                    : null
                                                }
                                            </div>
                                        ) : (
                                            <div className="flex gap-6 justify-center w-full max-sm:flex-col max-sm:items-center">
                                                <button
                                                    className={`${count === 0
                                                        ? 'bg-primary-300 text-white rounded-full px-6 py-2 hover:bg-primary-400 focus:outline-none cursor-not-allowed'
                                                        : 'bg-primary-300 text-white rounded-full px-6 py-2 hover:bg-primary-400 focus:outline-none'}
                                                        max-sm:w-72`}
                                                    disabled={count === 0}
                                                    onClick={addItemsToCart}>
                                                    Add to Cart
                                                </button>
                                                <div className="flex items-center justify-evenly gap-3">
                                                    <button className="rounded-full bg-primary-300 px-6 py-2 hover:bg-secondary ease-in-out duration-150 font-bold text-center"
                                                        onClick={increaseCount}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                        />
                                                    </button>

                                                    <p className="text-xl mx-2">
                                                        {count}
                                                    </p>

                                                    <button className="rounded-full bg-primary-300 px-6 py-2 hover:bg-secondary ease-in-out duration-150 font-bold text-center"
                                                        onClick={decreaseCount}>
                                                        <FontAwesomeIcon
                                                            icon={faMinus}
                                                        />
                                                    </button>
                                                </div>
                                                {!isAdmin ?
                                                    <i>{!isFavorite ? <FontAwesomeIcon
                                                        icon={faHeartCirclePlus}
                                                        className="fa-2x text-primary-300 hover:text-red cursor-pointer focus:outline-none"
                                                        onClick={() => {
                                                            addToFavorite();
                                                        }
                                                        }
                                                    /> : <FontAwesomeIcon
                                                        icon={faHeartCircleXmark}
                                                        className="fa-2x text-red hover:text-primary-400 cursor-pointer focus:outline-none"
                                                        onClick={() => { removeToFavorite() }
                                                        }
                                                    />}
                                                    </i>
                                                    : null
                                                }
                                            </div>
                                        )}
                                    </>
                                )
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProductDetail;