import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { fetchDetailsProduct, } from '../utils/productDetailsApi';
import { addToCart, } from '../utils/cartApi';
import Spinner from '../components/Spinner/Spinner';



const ProductDetail = () => {
    const { id } = useParams();

    const [productDetails, setProductDetails] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const handleData = async () => {
        setIsLoading(true);
        fetchDetailsProduct(id)
            .then((data) => {
                setProductDetails(data);
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
    useEffect(() => {
        handleData();
    },[]);

    const addToCart = () => {
        addToCart(id, 1);
    }
    return (
        <>
        { isLoading ?
                <div className = "flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div> :
        <div className="flex p-6 bg-white rounded-lg shadow-lg">
                    <div className="w-1/2 pr-6 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold text-primary-700 text-center mb-4">
                    {productDetails.name}
                </h1>
                <img
                    src={`data:image/jpeg;base64,${productDetails.imageUrl.toString('base64')}`}
                            alt={productDetails.name}
                            className="w-[1000px] h-[750px] rounded-md shadow-md  object-center"
                />
            </div>
                <div className="w-1/2 mt-12">
                    <p className="text-lg mb-4 text-primary-500 text-justify">
                        {productDetails.description}
                    </p>
                        <div className="flex justify-between mb-4">
                            <span className="text-primary-600 font-bold">Price: ${productDetails.cost}</span>
                            <span className="text-primary-600 font-bold">In Stock: {productDetails.count}</span>
                    </div>
                    <button className="bg-primary-300 text-white rounded-full px-6 py-2 hover:bg-primary-400 focus:outline-none"
                        onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
</div>
    }
        </>
            

    );
};

export default ProductDetail;