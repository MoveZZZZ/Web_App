import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { fetchGetAllClientCartItems, fetchRemoveFromCart, } from "../../utils/cartApi"
import { fetchCreateOrder, } from "../../utils/orderAPI"
import Message from "../../components/Message/Message";
import ErrorMessage from "../../components/Message/ErrorMessage";

import { fetchGetAllCitysTheState, fetchGetAllAPTheStateAndCity, fetchGetAllCountry, fetchGetAllAPStateCountry } from "../../utils/accessPointsAPI"

const ShoppingCartPage = () => {


    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItemList, setSelectedItemList] = useState([]);
    const [selectedItemCountList, setSelectedItemCountList] = useState([]);
    const [isPlaceOrderClick, setIsPlaceOrderClick] = useState(false);
    const userID = sessionStorage.getItem('ID');
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [totalOrderSum, setTotalOrderSum] = useState(0);
    const [coutryList, setCountryList] = useState([]);
    const [statesList, setStatesList] = useState([]);
    const [citysList, setCitysList] = useState([]);
    const [accesspointsList, setAccesspointsList] = useState([]);
    const [choisedState, setChoisedState] = useState();
    const [choisedCity, setChoisedCity] = useState();
    const [choisedAP, setChoisedAP] = useState(null);
    const [orderComment, setOrderComment] = useState("");
    const [userName, setUserName] = useState("");
    const [userLastname, setUserLastname] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [isCheckedTerms, setIsCheckedTerms] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Card");
    const [isCreated, setIsCreated] = useState(false);

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

    const uploadCoutry = async () => {
        fetchGetAllCountry()
            .then((response) => {
                setCountryList(response.countries);
            })
            .catch(() => {
                setMessage("Bad data loading");
                getErrorMessage();
            })
    }

    const removeFromCart = (itemId) => {

        fetchRemoveFromCart(userID, itemId)
            .then((data) => {
                setMessage("Your item removed from Cart!");
                getMessage();
                uploadData();
                setSelectedItemCountList([]);
                setSelectedItemList([]);
                setTotalOrderSum();
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

    const handleChangeTerms = () => {
        setIsCheckedTerms(!isCheckedTerms);
    };

    const createOrder = () => {

        if (selectedItemList &&
            choisedAP && !isCreated && userName && userLastname && userPhone && isCheckedTerms
        ) {
            fetchCreateOrder(userID, selectedItemList, selectedItemCountList, totalOrderSum, orderComment, choisedAP.id, paymentMethod, userName, userLastname, userPhone)
                .then((data) => {
                    if (data.message !== "") {
                        setMessage(data.message);
                        getErrorMessage();
                    }
                    else {
                        setIsCreated(true);
                        setTimeout(() => {
                            window.open("/orders", "_self");

                            setIsLoading(false);
                        }, 2000);
                        setMessage("Your order successefely added!")
                        getMessage();
                    }
                })
                .catch(() => {
                    setMessage("Bad data loading");
                    getErrorMessage();
                })

        }
        else if (!choisedAP) {
            setMessage("Choise addres!")
            getErrorMessage();
        }
        else if (!isCheckedTerms) {
            setMessage("Accept terms!")
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
        setIsCheckedTerms(false);
        setUserName("");
        setUserLastname("");
        setUserPhone("");

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

    const uploadStates = async (country) => {
        fetchGetAllAPStateCountry(country)
            .then((response) => {
                setStatesList(response.states);
            })
            .catch(() => {
                setMessage("Bad data loading");
                getErrorMessage();
            })
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

    const handleSelectCountry = (event) => {
        if (event.target.value != "None") {
            uploadStates(event.target.value)
        } else {
            setCitysList([]);
            setStatesList([]);
            setAccesspointsList([]);
        }
        setChoisedState(event.target.value)
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

    useEffect(() => {
        uploadData();
        uploadCoutry();
    }, []);

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
                    <div className="bg-white rounded-md w-auto-full align-20[px] ">
                        <div className=" flex items-center justify-center">
                            <div >
                                <h2 className="text-gray-600 font-semibold">Cart</h2>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-4 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
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
                                                    Price
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Count
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Total
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Option
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center break-all">
                                            {cartItems.map((item) => (
                                                <tr key={item.towarID} className="hover:hover:bg-lightgrey cursor-pointer">
                                                    <td className="px-5 py-5 border-b border-primary-200 bg-white text-xl">
                                                        <div className="flex-shrink-0 w-20 h-20">
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
                                                        <input
                                                            className="hover:cursor-pointer"
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
                                <div className="grid grid-row">
                                    <div className="relative flex py-5 items-center">
                                        <div className="flex-grow border-t border-primary-400"></div>
                                        <span className="flex-shrink mx-4 text-primary-400">Order details</span>
                                        <div className="flex-grow border-t border-primary-400"></div>
                                    </div>

                                    <div className="flex justify-center items-center">
                                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-4 py-4 overflow-x-auto">
                                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
                                                <table className="min-w-full leading-normal">
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Title
                                                            </th>
                                                            <th
                                                                className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Price
                                                            </th>
                                                            <th
                                                                className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Count
                                                            </th>
                                                            <th
                                                                className="px-5 py-3 border-b-2 border-primary-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                                    <h1 className="flex justify-center">Choise shop address</h1>
                                    <div className="flex justify-center items-center gap-6 mt-5">
                                        <div>
                                            <select className="w-40 max-sm:w-20 text-primary-400 bg-white border rounded-md 
                                        shadow-sm outline-none appearance-none focus:border-secondary text-center py-2 bg-white text-xs"
                                                onChange={handleSelectCountry}>
                                                <option key="None">None</option>
                                                {coutryList.map((countryItem) => (
                                                    <option key={countryItem}>{countryItem}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {statesList.length ? (
                                            <div>
                                                <select className="w-40 max-sm:w-20 text-primary-400 bg-white border rounded-md 
                                        shadow-sm outline-none appearance-none focus:border-secondary text-center py-2 bg-white text-xs"
                                                    onChange={handleSelectState}>
                                                    <option key="None">None</option>
                                                    {statesList.map((stateItem) => (
                                                        <option key={stateItem}>{stateItem}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : (<></>)}
                                        {citysList.length ? (
                                            <div>
                                                <select className="w-40 max-sm:w-20 text-primary-400 bg-white border rounded-md 
                                        shadow-sm outline-none appearance-none focus:border-secondary text-center py-2 bg-white text-xs"
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
                                                    <select className="w-40 max-sm:w-20 text-primary-400 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-secondary text-center py-2 bg-white text-xs"
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
                                    </div>
                                    <div className="grid grid-cols-3 flex justify-center items-between mt-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 text-center">Write you firstname*</label>
                                            <input
                                                id="firstname"
                                                name="firstname"
                                                value={userName}
                                                type="text"
                                                autoComplete="firstname"
                                                onChange={(e) => setUserName(e.target.value)}
                                                required
                                                placeholder="Your name"
                                                className="w-11/12 px-4 py-3 mx-2 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 text-center">Write you lastname*</label>
                                            <input
                                                id="lastname"
                                                name="lastname"
                                                value={userLastname}
                                                type="text"
                                                autoComplete="lastname"
                                                onChange={(e) => setUserLastname(e.target.value)}
                                                required
                                                placeholder="Your lastname"
                                                className="w-11/12 px-4 py-3 mx-2 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 text-center">Write you phone number*</label>
                                            <input
                                                id="lastname"
                                                name="lastname"
                                                value={userPhone}
                                                type="text"
                                                autoComplete="lastname"
                                                onChange={(e) => setUserPhone(e.target.value)}
                                                required
                                                placeholder="Your phone"
                                                className="w-11/12 px-4 py-3 mx-2 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-5">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 text-center">Write you comment</label>
                                            <input
                                                id="uname"
                                                name="uname"
                                                value={orderComment}
                                                type="text"
                                                autoComplete="uname"
                                                onChange={(e) => setOrderComment(e.target.value)}
                                                required
                                                placeholder="Write comment to your order"
                                                className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <p className="flex justify-end mt-2">Payment method:</p>
                                    <div className="flex justify-end">
                                        <select className="w-40 px-4 py-2 text-primary-400 bg-white border rounded-md
                                        shadow-sm outline-none appearance-none focus:border-secondary text-center"
                                            onChange={handlePaymentMethod}>
                                            <option key="Card">Card</option>
                                            <option key="Cash">Cash</option>
                                        </select>
                                    </div>
                                    {userName && userLastname && userPhone.length > 9 ?
                                        <>
                                            <div className="relative flex py-5 items-center">
                                                <div className="flex-grow border-t border-primary-400"></div>
                                                <span className="flex-shrink mx-4 text-primary-400">Order summary</span>
                                                <div className="flex-grow border-t border-primary-400"></div>
                                            </div>
                                            <div className="w-full flex justify-center">
                                                <div className="grid grot-cols-3 flex justify-center items-center w-1/2">
                                                    {choisedAP &&
                                                        <div className="flex justify-center mt-5 text-xl max-sm:text-sm font-bold">
                                                            <p>Full addres shop:</p>
                                                            <h1 className="ml-5">{choisedAP.buildingNumber} {choisedAP.street} St, {choisedAP.city}, {choisedAP.postIndex}, {choisedAP.state}, {choisedAP.country}</h1>
                                                        </div>
                                                    }
                                                    <div className="flex justify-center mt-5 text-xl max-sm:text-sm font-bold">
                                                        <p>Client data:</p>
                                                        <h1 className="ml-5">{userName} {userLastname}, phone: {userPhone}</h1>
                                                    </div>
                                                    <div className="flex justify-center mt-5 text-xl max-sm:text-sm font-bold">
                                                        <p>Total sum:</p>
                                                        <h1 className="ml-5">${totalOrderSum}</h1>
                                                    </div>
                                                    <label className="block text-xl font-medium text-gray-700 text-center m-5"> Accept terms
                                                        <input className="ml-5"
                                                            type="checkbox"
                                                            checked={isCheckedTerms}
                                                            onChange={handleChangeTerms}
                                                        />

                                                    </label>
                                                </div>

                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={createOrder}
                                                    className="bg-primary-500 text-primary-100 px-6 py-2 rounded hover:bg-secondary"
                                                >
                                                    Buy
                                                </button>
                                                <button
                                                    onClick={removeOrder}
                                                    className="bg-primary-500 text-primary-100 px-6 py-2 rounded hover:bg-secondary ml-10"
                                                >
                                                    Back
                                                </button>

                                            </div>
                                        </>
                                        : null
                                    }

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