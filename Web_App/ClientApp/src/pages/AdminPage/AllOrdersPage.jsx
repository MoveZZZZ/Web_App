﻿import React, { useState, useEffect} from 'react';
import {
    fetchAllOrders, fetchAllOrderByEmail, fetchDeleteOrderByID, fetchAllOrdersThisDay
    , fetchAllOrdersLastDay, fetchAllOrdersLastMonth, fetchAllOrdersThisMonth, fetchAllOrdersThisYear, fetchAllOrdersLastYear} from "../../utils/adminAPI"
import { Link } from 'react-router-dom';
import _ from "lodash";
import Spinner from '../../components/Spinner/Spinner';



const AllOrdersPage = () => {
    const [ordersList, setOrdersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const [searchQuery, setSearchQuery] = useState('');

    const [sortList, setSortList] = useState(["Current day", "Last day", "Current month", "Last month", "Current year","Last year"])
 

    const handleOrdersUser = async () => {
        fetchAllOrders()
            .then((data) => {
                setIsLoading(true);
                setOrdersList(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
    }

    const searchOrderByEmail = async (query) => {
        if (query) {
            fetchAllOrderByEmail(query)
                .then((data) => {
                    setOrdersList(data);
                    setIsLoading(true);
                })
                .catch((error) => {
                    console.error('Error fetching products by name:', error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000)
                })
        }
        else {
            handleOrdersUser();
        }
    };

    const removeOrder = async (orderid) => {
        setIsLoading(true);
        fetchDeleteOrderByID(orderid)
            .then((data) => {
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1500)
                handleOrdersUser();
            })
    }

    const getOrderThisDay = async () => {
        fetchAllOrdersThisDay()
            .then((data) => {
                setOrdersList(data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
    }

    const getOrderLastDay = async () => {
        fetchAllOrdersLastDay()
            .then((data) => {
                setOrdersList(data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
    }

    const getOrderThisMonth = async () => {
        fetchAllOrdersThisMonth()
            .then((data) => {
                setOrdersList(data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
    }

    const getOrderLastMonth = async () => {
        fetchAllOrdersLastMonth()
            .then((data) => {
                setOrdersList(data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
    }

    const getOrderThisYear = async () => {
        fetchAllOrdersThisYear()
            .then((data) => {
                setOrdersList(data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
    }

    const getOrderLastYear = async () => {
        fetchAllOrdersLastYear()
            .then((data) => {
                setOrdersList(data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
    }

    const handleSort = async (event) => {
        const option = event.target.value;
        if (option === "Current day")
            getOrderThisDay();
        else if (option === "Last day")
            getOrderLastDay();
        else if (option === "Current month")
            getOrderThisMonth();
        else if (option === "Last month")
            getOrderLastMonth();
        else if (option === "Current year")
            getOrderThisYear();
        else if (option === "Last year")
            getOrderLastYear();
        else
            handleOrdersUser();
    }

    useEffect(() => {
        searchOrderByEmail(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        handleOrdersUser();
    }, [])

    const handleSearchInputChange = _.debounce((e) => setSearchQuery(e.target.value), 1000);

    return (
        <>
            <div className=" flex items-center justify-between pb-6 mt-10">
                <div>
                    <h2 className="text-primary-400 font-semibold ml-10">Products Oder</h2>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <div>
                            <select className="w-40 max-sm:w-20 mx-24 text-primary-400 bg-white border rounded-md 
                                        shadow-sm outline-none appearance-none focus:border-secondary text-center py-2 bg-white text-xs"
                                onChange={handleSort}>
                                <option key="All time">All time</option>
                                {sortList.map((sort) => (
                                    <option key={sort}>{sort}</option>
                                ))}
                            </select>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="bg-gray-50 outline-none ml-1 block " type="text" placeholder="search..." onChange={handleSearchInputChange} />
                    </div>
                </div>
            </div>
            {isLoading ?
                <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div >
                :
                <div className="bg-white p-8 rounded-md w-full">
                    <div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                User Email
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Order ID
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Created at
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Remove order
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ordersList.map((item) => (
                                            <tr key={item.orderID} className="hover:hover:bg-lightgrey cursor-pointer">
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                                    <Link
                                                        to='/admin/orderdetails'
                                                        state={{ orderID: item.orderID, userEmail: item.userEmail }}
                                                    >
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 w-10 h-10">
                                                                <img className="w-full h-full rounded-full"
                                                                    src={`data:image/jpeg;base64,${item.userPhoto.toString('base64')}`}
                                                                    alt="" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {item.userEmail}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <Link
                                                        to='/admin/orderdetails'
                                                        state={{ orderID: item.orderID, userEmail: item.userEmail }}
                                                    >
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {item.orderID}</p>
                                                    </Link>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <Link
                                                        to='/admin/orderdetails'
                                                        state={{ orderID: item.orderID, userEmail: item.userEmail }}
                                                    >
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {item.dateTime.slice(0, 10)}
                                                        </p>
                                                    </Link>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <Link
                                                        to='/admin/orderdetails'
                                                        state={{ orderID: item.orderID, userEmail: item.userEmail }}
                                                    >
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                            <span aria-hidden
                                                                className="absolute inset-0 bg-greenLight opacity-50 rounded-full"></span>
                                                            <span className="relative">{item.status}</span>
                                                        </span>
                                                    </Link>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {item.status !== "Payment" ?
                                                        <button className="bg-red rounded-full px-4 py-1 hover:bg-greenLight" onClick={() => {
                                                            removeOrder(item.orderID);
                                                        }}>
                                                            Remove</button>
                                                        : null}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    );





}
export default AllOrdersPage;