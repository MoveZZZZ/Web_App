import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { fetchGetAllClientCartItems, fetchRemoveFromCart, } from "../../utils/cartApi"
import { fetchCreateOrder, } from "../../utils/orderAPI"
import Message from "../../components/Message/Message";
import ErrorMessage from "../../components/Message/ErrorMessage";

import { fetchGetAllAPCity, fetchGetAllAPTheCity, fetchGetAllAPState, fetchGetAllAPTheState, fetchGetAllCitysTheState, fetchGetAllAPTheStateAndCity } from "../../utils/accessPointsAPI"

const ShoppingCartPage = () => {


    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedItemList, setSelectedItemList] = useState([]);
    const [selectedItemCountList, setSelectedItemCountList] = useState([]);


    const [isPlaceOrderClick, setIsPlaceOrderClick] = useState(false);


    const userID = localStorage.getItem('UserID');


    const [isMessage, setIsMessage] = useState(false);


    const [message, setMessage] = useState("");


    const [isError, setIsError] = useState(false);


    const [totalOrderSum, setTotalOrderSum] = useState(0);


    const [statesList, setStatesList] = useState([]);
    const [citysList, setCitysList] = useState([]);
    const [accesspointsList, setAccesspointsList] = useState([]);

    const [choisedState, setChoisedState] = useState();
    const [choisedCity, setChoisedCity] = useState();
    const [choisedAP, setChoisedAP] = useState(null);


    const [orderComment, setOrderComment] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("Card");


    const uploadData = async () => {
        setIsLoading(true);
        fetchGetAllClientCartItems(userID)
            .then((data) => {
                setCartItems(data.towar);
            })
            .catch(() => {
                setMessage("Bad data loading");
                getErrorMessage();
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);
            });
    }
    const uploadStates = async () => {
        fetchGetAllAPState()
            .then((response) => {
                setStatesList(response.states);
            })
            .catch(() => {
                setMessage("Bad data loading");
                getErrorMessage();
            })
    }

    useEffect(() => {
        uploadData();
        uploadStates();
    }, []);



    const removeFromCart = (itemId) => {

        fetchRemoveFromCart(userID, itemId)
            .then((data) => {

                setMessage("Your item removed from Cart!");
                getMessage();

                uploadData();
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            })
            .catch(() => {
            })
        

    };
    const placeOrder = () => {
        if (selectedItemList.length) {
            setIsPlaceOrderClick(true);
        }
        else {
            setMessage("Choise item(s), please!");
            getErrorMessage();
        }

    };
    const createOrder = () => {

        if (selectedItemList &&
            choisedAP
        ) {
            fetchCreateOrder(userID, selectedItemList, selectedItemCountList, totalOrderSum, orderComment, choisedAP.id, paymentMethod)
                .then((data) => {
                    setTimeout(() => {
                        window.open("/orders", "_self");
                        setIsLoading(false);
                    }, 2000);
                })
                .catch(() => {
                    setMessage("Bad data loading");
                    getErrorMessage();
                })
            setMessage("Your order successefely added!")
            getMessage();
        }
        else if (!choisedAP) {
            setMessage("Choise addres!")
            getErrorMessage();
        }
    };
    const removeOrder = () => {
        setIsPlaceOrderClick(false);
        setOrderComment("");
        setTotalOrderSum(0);
        uploadData();
        setSelectedItemList([]);
        setSelectedItemList([]);
        setChoisedCity();
        setChoisedAP([]);
        setChoisedState();
        setCitysList([]);
        setAccesspointsList([]);
        setChoisedAP(null);

    };
    const toggleSelect = (itemId, sum, itemCount) => {
        if (selectedItemList.includes(itemId)) {
            setSelectedItemList(selectedItemList.filter((item) => item !== itemId));
            setSelectedItemCountList(selectedItemCountList.filter((item) => item !== itemCount))
            setTotalOrderSum(totalOrderSum - sum);
        } else {
            setSelectedItemList([...selectedItemList, itemId]);
            setSelectedItemCountList([...selectedItemCountList, itemCount]);
            setTotalOrderSum(totalOrderSum + sum);
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



    const uploadAccessPoints = async (city) => {
        fetchGetAllAPTheStateAndCity(choisedState, city)
            .then((response) => {
                setAccesspointsList(response.accesPoints);
            })
            .catch(() => {
                setMessage("Bad data loading");
                getErrorMessage();
            });

    }
    const uploadCitys = async (state) => {
        fetchGetAllCitysTheState(state)
            .then((response) => {

                setCitysList(response.citys);
            })
            .catch(() => {
                setMessage("Bad data loading");
                getErrorMessage();
            });
    }

    const handleSelectState = (event) => {
        if (event.target.value != "None") {
            uploadCitys(event.target.value)
        } else {
            setChoisedAP(null);
            setCitysList([]);
            setAccesspointsList([]);
        }
        setChoisedState(event.target.value)
    }
    const handleSelectCity = (event) => {
        if (event.target.value != "None") {
            uploadAccessPoints(event.target.value);
        } else {
            setAccesspointsList([]);
            setChoisedAP(null);
        }
        setChoisedCity(event.target.value)

    }
    const handleSelectAP = (event) => {
        const name = event.target.value;
        const selectedAPinMethod = accesspointsList.find((ap) => ap.name === name);
        setChoisedAP(selectedAPinMethod);
    }
    const handlePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
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
                    <div class="bg-white rounded-md w-auto-full align-20[px] ">
                        <div class=" flex items-center justify-between">
                            <div>
                                <h2 class="text-gray-600 font-semibold">Favorite</h2>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div class="-mx-4 sm:-mx-8 px-4 sm:px-4 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
                                    <table class="min-w-full leading-normal ">
                                        <thead>
                                            <tr>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Count
                                                </th>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Total
                                                </th>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Option
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center break-all">
                                            {cartItems.map((item) => (
                                                <tr key={item.towarID}>
                                                    <td className="px-5 py-5 border-b border-primary-200 bg-white text-xl">
                                                        <div class="flex-shrink-0 w-20 h-20">
                                                            <Link to={`/product/${item.towarID}`}>
                                                                <img
                                                                    src={`data:image/jpeg;base64,${item.image.toString('base64')}`}
                                                                    alt={item.towarName}
                                                                    className="w-full h-full rounded-full object-cover hover: bg-primary-200 maxmax-w-2xl transition duration-300 ease-in-out hover:scale-110" />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-primary-200 bg-white text-xs">
                                                        <Link to={`/product/${item.towarID}`}>{item.towarName}</Link>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-primary-200 bg-white text-sm">${item.towarPrice.toFixed(2)}</td>
                                                    <td className="px-5 py-5 border-b border-primary-200 bg-white text-sm">{item.count}</td>
                                                    <td className="px-5 py-5 border-b border-primary-200 bg-white text-sm">${item.sumPrice}</td>
                                                    <td className="px-5 py-5 border-b border-primary-200 bg-white text-sm">
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
                                                            onChange={() => toggleSelect(item.towarID, item.sumPrice, item.count)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {!isPlaceOrderClick && !selectedItemList.length ? (
                            <div className="flex justify-end">
                                <button
                                    onClick={placeOrder}
                                    className="bg-primary-500 text-primary-100 px-4 py-2 mb-4 rounded hover:bg-secondary m-5"
                                >
                                    Place Order
                                </button>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <div className="relative flex py-5 items-center">
                                        <div className="flex-grow border-t border-primary-400"></div>
                                        <span className="flex-shrink mx-4 text-primary-400">Order details</span>
                                        <div className="flex-grow border-t border-primary-400"></div>
                                    </div>

                                    <div className="flex justify-center items-center">
                                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-4 py-4 overflow-x-auto">
                                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
                                                <table className="min-w-full leading-normal">
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Title
                                                            </th>
                                                            <th
                                                                class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Price
                                                            </th>
                                                            <th
                                                                class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Count
                                                            </th>
                                                            <th
                                                                class="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Total
                                                            </th>


                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-center break-all">
                                                        {cartItems.map((item) => (
                                                            <tr key={item.towarID}>
                                                                {selectedItemList.includes(item.towarID) ? (
                                                                    <>
                                                                        <td className="px-5 py-5 border-b border-primary-200 bg-white text-xl">{item.towarName}</td>
                                                                        <td className="px-5 py-5 border-b border-primary-200 bg-white text-xl">${item.towarPrice.toFixed(2)}</td>
                                                                        <td className="px-5 py-5 border-b border-primary-200 bg-white text-xl">{item.count}</td>
                                                                        <td className="px-5 py-5 border-b border-primary-200 bg-white text-xl">${item.sumPrice}</td>
                                                                    </>
                                                                ) : null
                                                                }
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center gap-6">
                                        <div>
                                            <select className="w-32 mt-10 text-primary-400 bg-white border rounded-md 
                                        shadow-sm outline-none appearance-none focus:border-secondary text-center px-5 py-5 bg-white text-xs"
                                                onChange={handleSelectState}>
                                                <option key="None">None</option>
                                                {statesList.map((stateItem) => (
                                                    <option key={stateItem}>{stateItem}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {citysList.length ? (
                                            <div>
                                                <select className="w-32 mt-10 text-primary-400 bg-white border rounded-md 
                                        shadow-sm outline-none appearance-none focus:border-secondary text-center px-5 py-5 bg-white text-xs"
                                                    onChange={handleSelectCity}>
                                                    <option key="None">None</option>
                                                    {citysList.map((cityItem) => (
                                                        <option key={cityItem}>{cityItem}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        )
                                            :
                                            (
                                                <></>
                                            )}
                                        {accesspointsList.length ? (
                                            <>
                                                <div>
                                                    <select className="w-32 mt-10 text-primary-400 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-secondary text-center px-5 py-5 bg-white text-xs"
                                                        onChange={handleSelectAP}>
                                                        <option key="None">None</option>
                                                        {accesspointsList.map((accesPList) => (
                                                            <option key={accesPList}>{accesPList.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </>
                                        )
                                            :
                                            (
                                                <></>
                                            )}
                                        {choisedAP &&
                                            <>
                                                <p className="mt-10 text-2xl text-bolid">Full addres shop:</p>
                                                <div className="mt-10 text-xl text-bolid"><h1>{choisedAP.buildingNumber} {choisedAP.street} St, {choisedAP.city}, {choisedAP.postIndex}, {choisedAP.state} </h1></div>
                                            </>
                                        }
                                    </div>
                                    <input htmlFor="large-input"
                                        id="uname"
                                        name="uname"
                                        value={orderComment}
                                        type="uname"
                                        autoComplete="uname"
                                        onChange={(e) => setOrderComment(e.target.value)}
                                        required
                                        placeholder="Write comment to your order"
                                        className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                    />
                                    <p className="flex justify-end mt-2">Payment method:</p>
                                    <div className="flex justify-end">
                                        <select className="w-40 px-4 py-2 text-primary-400 bg-white border rounded-md
                                        shadow-sm outline-none appearance-none focus:border-secondary text-center"
                                            onChange={handlePaymentMethod}>
                                            <option key="Card">Card</option>
                                            <option key="Cash">Cash</option>
                                        </select>
                                    </div>
                                    <p className="flex justify-end text-xl">Total sum: ${totalOrderSum}</p>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={createOrder}
                                            className="bg-primary-500 text-primary-100 px-4 py-2 mb-4 rounded hover:bg-secondary m-5"
                                        >
                                            Place Order
                                        </button>
                                        <button
                                            onClick={removeOrder}
                                            className="bg-primary-500 text-primary-100 px-4 py-2 mb-4 rounded hover:bg-secondary m-5"
                                        >
                                            Back
                                        </button>

                                    </div>
                                </div>
                            </>

                        )}

                    </div>
                </div>
            }

        </>

    );
};
export default ShoppingCartPage;