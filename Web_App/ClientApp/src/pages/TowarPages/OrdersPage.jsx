import React, { useState, useContext, } from 'react';
import { useEffect } from 'react';
import imageShop from "../../assets/guns-shop.jpeg"
import { fetchAllUserOrders, } from "../../utils/orderAPI"
import { UserIDContext, } from "../../context";
import { Link } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';

const OrdersPage = () => {
    const userID = sessionStorage.getItem('ID');
    const [ordersList, setOrdersList] = useState([]);
    const [isLoadinh, setIsLoading] = useState(true);


    const handleOrdersUser = async () => {
        fetchAllUserOrders(userID)
            .then((data) => {
                setOrdersList(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000)
            })
    }

    useEffect(() => {
        handleOrdersUser();
    }, [])



    return (
        <div class="bg-white p-8 rounded-md w-full">
            <div class=" flex items-center justify-between pb-6">
                <div>
                    <h2 class="text-gray-600 font-semibold">Products Oder</h2>
                </div>
            </div>
            <div>
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Product list
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Created at
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersList.map((item) => (
                                    <tr className="hover:hover:bg-lightgrey cursor-pointer">
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                            <Link
                                                to='/orderdetails'
                                                state={{ orderID: item.orderID }}
                                            >
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 w-10 h-10">
                                                    <img class="w-full h-full rounded-full"
                                                        src={imageShop}
                                                        alt="" />
                                                </div>
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {item.productsString}
                                                    </p>
                                                </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link
                                                to='/orderdetails'
                                                state={{ orderID: item.orderID }}
                                            >
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                    {item.orderID}</p>
                                            </Link>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link
                                                to='/orderdetails'
                                                state={{ orderID: item.orderID }}
                                            >
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {item.dateTime.slice(0, 10)}
                                                </p>
                                            </Link>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link
                                                to='/orderdetails'
                                                state={{ orderID: item.orderID }}
                                            >
                                            <span
                                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden
                                                    class="absolute inset-0 bg-greenLight opacity-50 rounded-full"></span>
                                                <span class="relative">{item.status}</span>
                                                </span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default OrdersPage;