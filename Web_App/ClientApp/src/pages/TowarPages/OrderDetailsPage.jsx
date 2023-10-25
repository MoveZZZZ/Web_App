import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchOrderDetails, } from "../../utils/orderAPI"
import Spinner from '../../components/Spinner/Spinner';

const OrderDetailsPage = (props) => {

    const userID = localStorage.getItem('UserID');
    const location = useLocation();

    const [orderID, setOrderID] = useState(1);

    const [orderDetailData, setOrderDetailData] = useState();
    const [orderDetailProducts, setorderDetailProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    console.log(location.state.orderID);
    console.log(userID);

    const handleOrderDetails = async () => {
        console.log(location.state.orderID);
        console.log(userID);
        setIsLoading(true);
        fetchOrderDetails(location.state.orderID, parseInt(userID, 10))
            .then((data) => {
                console.log(data);
                setOrderDetailData(data);
                setorderDetailProducts(data.productOrderList);
                console.log(data.productOrderList);

            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
            setTimeout(() => {
            setIsLoading(false);
            }, 500);
            });
    }


    useEffect(() => {
        handleOrderDetails();
    }, []);

return (
    <>
        {isLoading ?
            <div className="flex text-center items-center justify-center w-full h-96">
                < Spinner />
            </div>
            :
            <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div class="flex justify-start item-start space-y-2 flex-col">
                    <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order # {orderDetailData.orderID}</h1>
                </div>
                <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>

                            {orderDetailProducts.map((items) =>
                                <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                    <div class="pb-4 md:pb-4 w-full md:w-40">
                                        <img class="w-32 h-32 rounded-full"
                                            src={`data:image/jpeg;base64,${items.imageUrl.toString('base64')}`}
                                            alt="dress" />
                                    </div>
                                    <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-16 space-y-4 md:space-y-0">
                                        <div class="w-full flex flex-col justify-start items-start space-y-8">
                                            <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{items.nameProduct}</h3>
                                        </div>
                                        <div class="flex justify-between space-x-8 items-start w-full">
                                            <p class="text-base dark:text-white xl:text-lg leading-6">${items.productCost.toFixed(2)}</p>
                                            <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{items.countProduct}</p>
                                            <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">${items.productCostSummary.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div >

                            )}




                        </div>
                        <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div class="flex justify-between w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">${orderDetailData.cost.toFixed(2)}</p>
                                    </div>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">$0.00</p>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                    <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${orderDetailData.cost.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
                        <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div class="flex flex-col justify-start items-start flex-shrink-0">
                                <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <img className="w-8 h-8 rounded-full" src={`data:image/jpeg;base64,${orderDetailData.clientPhoto.toString('base64')}`} alt="user photo" />
                                    <div class="flex justify-start items-start flex-col space-y-2">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{orderDetailData.userName}</p>
                                        <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">{orderDetailData.totalOrdersClient} Previous Orders</p>
                                    </div>
                                </div>

                                <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <span
                                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            class="absolute inset-0 bg-greenLight opacity-50 rounded-full"></span>
                                        <span class="relative">{orderDetailData.status}</span>
                                    </span>
                                   
                                </div>
                            </div>
                            <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                    <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                        <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{orderDetailData.shopAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        }
        </>


);



};
export default OrderDetailsPage;