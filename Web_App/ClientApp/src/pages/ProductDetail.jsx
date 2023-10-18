import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { fetchDetailsProduct, } from '../utils/productDetailsApi';
import { addToCart, } from '../utils/cartApi';



const ProductDetail = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        fetchDetailsProduct(id-1)
            .then((data) => {
                setProductDetails(data);

            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);


    const addToCart = () => {
        addToCart(id, 1);
    }
  
    return (
        <div className="flex p-6 bg-white rounded-lg shadow-lg">
            <div className="w-1/2 pr-6 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold text-primary-700 text-center mb-4">
                    {productDetails.name}
                </h1>
                <img
                    src={productDetails.imageUrl}
                    alt={productDetails.name}
                    className="w-3/4 h-auto rounded-md shadow-md  object-center"
                />
            </div>
            <div className="w-1/2 mt-12">
                <p className="text-lg mb-4 text-gray-700 text-justify">
                    {productDetails.description}
                </p>
                <div className="flex justify-between mb-4">
                    <span className="text-primary-600 font-bold">Price: $99.99</span>
                    <span className="text-primary-600 font-bold">In Stock: 25</span>
                </div>
                <button className="bg-primary-300 text-white rounded-full px-6 py-2 hover:bg-primary-400 focus:outline-none" onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;