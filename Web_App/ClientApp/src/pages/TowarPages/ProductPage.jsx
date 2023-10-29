import React, { useState, useEffect } from 'react';
import { Select, Option } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { fetchProducts, fetchProductsByName, } from '../../utils/productApi';
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Spinner from '../../components/Spinner/Spinner';

const ProductPage = () => {
    const [productes, setProductes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [isSearchnig, setIsSearching] = useState(false);


    const [isLoading, setIsLoading] = useState(true);


    const loadProducts = async () => {
        setIsLoading(true);
        fetchProducts(currentPage, 25)
            .then((data) => {
                setProductes(data.products);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    };
    const searchProductsByName = (query) => {
        setErrMsg("");
        if (query) {
            setIsLoading(true);
            setIsSearching(true);
            fetchProductsByName(query)
                .then((data) => {
                    if (data.products.length == 0) {
                        setErrMsg("Nie znalieziono żadnych produktów!");
                    }
                    setProductes(data.products);
                    setTotalPages(data.totalPages);
                })
                .catch((error) => {
                    console.error('Error fetching products by name:', error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                });

        }
        else {
            setIsSearching(false);
            loadProducts();
        }
    };
    useEffect(() => {
        searchProductsByName(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        loadProducts();
    }, [currentPage]);

    const handleSearchInputChange = _.debounce((e) => setSearchQuery(e.target.value), 1000);

    return (
        <>
            <div className="flex justify-center items-center px-16">
                <div className="mt-6 w-4/5 flex flex-col justify-between items-center">
                <div className="flex gap-2 mt-3 w-3/5 max-sm:w-full">
                    <i className="mt-2"><FontAwesomeIcon icon={faSearch} /></i>
                    <input
                        type="text"
                        placeholder="Search by product name"
                        onChange={handleSearchInputChange}
                        className="w-full p-2 mb-2 rounded border border-primary-300 text-secondary placeholder-primary-300"
                    />
                </div>
                <div className="text-3xl text-center text-red">{errMsg}</div>
                </div>
            </div>
            {isLoading ?

                <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div>
                :
                <div className="mt-16 mb-16 flex justify-center flex-col items-center">
                    {errMsg ? <></>
                        :
                        <div className="w-4/5 flex flex-wrap items-center justify-center gap-6 mx-5">
                            {productes.map((product) => (
                                <Link to={`/product/${product.id}`} key={product.id}>
                                    <div key={product.id} className="w-64 bg-primary-100 max-sm:w-min-11/12 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-2xl border border-primary-200">
                                        <img className="w-64 h-64 rounded-t-xl" src={`data:image/jpeg;base64,${product.imageUrl.toString('base64')}`} />
                                        <p className="text-lg font-bold text-proimary-500 truncate block capitalize mx-2">{product.name}</p>
                                        <p className="text-sm text-gray-600 truncate mx-2">{product.description}</p>
                                        <p className="text-lg font-semibold text-primary-500 cursor-auto mx-2 my-5 flex justify-end">{product.cost}$</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    }
                    {!errMsg && !isSearchnig &&
                        <div className=" mt-16 flex items-center justify-center  hrounded-xl text-gray-600 overflow-hidden">
                            <button
                                onClick={() => {
                                    setCurrentPage(currentPage - 1);
                                    window.scrollTo(0, 0);
                                }}
                                className={`mx-2 my-2 p-2 rounded ${currentPage === 1
                                    ? 'bg-white border border-primary-500 cursor-not-allowed'
                                    : 'bg-primary-100 border border-primary-500 hover-bg-secondary'}`}
                                disabled={currentPage === 1}
                            >
                                &lt; Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentPage(index + 1);
                                        window.scrollTo(0, 0); 
                                    }}
                                    className={`mx-2 p-2 rounded ${currentPage === index + 1
                                        ? 'bg-primary-100 text-primary-500 cursor-not-allowed'
                                        : 'bg-primary-100 border border-primary-500 hover-bg-secondary'}`}
                                    disabled={currentPage === index + 1}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setCurrentPage(currentPage + 1);
                                    window.scrollTo(0, 0); 
                                }}
                                className={`mx-2 my-2 p-2 rounded ${currentPage === totalPages
                                    ? 'bg-white border border-primary-500 cursor-not-allowed'
                                    : 'bg-white border border-gray-300 hover-bg-secondary'
                                    }`}
                                disabled={currentPage === totalPages}
                            >
                                Next &gt;
                            </button>
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default ProductPage;