import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchOrderArchiveDetailsAdmin, } from "../../utils/adminAPI"
import Spinner from '../../components/Spinner/Spinner';
import baseImage from "../../assets/userPhoto.png"

const AdminOrderDetailsArchivePage = () => {

    const userID = sessionStorage.getItem('ID');
    const location = useLocation();

    const [orderID, setOrderID] = useState(1);

    const [orderDetailData, setOrderDetailData] = useState();
    const [orderDetailProducts, setorderDetailProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);



    const handleOrderDetails = async () => {
        setIsLoading(true);
        fetchOrderArchiveDetailsAdmin(location.state.orderID, location.state.userEmail)
            .then((data) => {
                setOrderDetailData(data);
                setorderDetailProducts(data.productOrderList);

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
                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div className="flex justify-start item-start space-y-2 flex-col">
                        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order # {orderDetailData.orderID}</h1>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>

                                {orderDetailProducts.map((items) =>
                                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                        <div className="pb-4 md:pb-4 w-full md:w-40">
                                            <img className="w-32 h-32 rounded-full"
                                                src={`data:image/jpeg;base64,${items.imageUrl.toString('base64')}`}
                                                alt="dress" />
                                        </div>
                                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-16 space-y-4 md:space-y-0">
                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{items.nameProduct}</h3>
                                            </div>
                                            <div className="flex justify-between space-x-8 items-start w-full">
                                                <p className="text-base dark:text-white xl:text-lg leading-6">${items.productCost.toFixed(2)}</p>
                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{items.countProduct}</p>
                                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">${items.productCostSummary.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div >

                                )}




                            </div>
                            <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div className="flex justify-between w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${orderDetailData.cost.toFixed(2)}</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$0.00</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                        <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${orderDetailData.cost.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
                            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                <div className="flex flex-col justify-start items-start flex-shrink-0">
                                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                        <img className="w-8 h-8 rounded-full" src={baseImage} alt="user photo" />
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{orderDetailData.userName}</p>
                                            <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">{orderDetailData.totalOrdersClient} Previous Orders</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-primary-300 opacity-50 rounded-full"></span>
                                            <span className="relative">{orderDetailData.status}</span>
                                        </span>

                                    </div>
                                </div>
                                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{orderDetailData.shopAddress}</p>
                                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Client Data</p>
                                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 -mt-5">Dear {orderDetailData.clientName} {orderDetailData.clientLastname}, phone: {orderDetailData.phones}</p>
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
export default AdminOrderDetailsArchivePage;