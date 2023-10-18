import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchProductsByName, } from '../utils/productApi';
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ProductPage = () => {
    const [productes, setProductes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const loadProducts =() =>
    {
        fetchProducts(currentPage, 25)
            .then((data) => {
                setProductes(data.products);
                setTotalPages(data.totalPages);

            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };
    const searchProductsByName = (query) => {
        setErrMsg("");
        if (query) {
            fetchProductsByName(query, currentPage, 25)
                .then((data) => {
                    if (data.products.length == 0) {
                        setErrMsg("Nie znalieziono żadnych produktów!");
                    }
                    setProductes(data.products);
                    setTotalPages(data.totalPages);

                    
                })
                .catch((error) => {
                    console.error('Error fetching products by name:', error);
                });
        }
        else {
            loadProducts();
        } 
    };

    //const debouncedSearch = _.debounce((query)=>searchProductsByName(query), 700);

    useEffect(() => {
        searchProductsByName(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        loadProducts();
    }, [currentPage]);





    const handleSearchInputChange = _.debounce((e) => setSearchQuery(e.target.value), 500);

    return (
        <div>
            <div>
                <h1 className="text-6xl text-center m-4 text-secondary">Product List</h1>
            </div>

            <div className="mr-5 group content-end flex md:flex-row-reverse ">
                <i className="mr-5 mt-2"><FontAwesomeIcon icon={faSearch} /></i>
            <input
                type="text"
                placeholder="Search by product name"
                onChange={handleSearchInputChange}
                className="mr-5 p-2 mb-5 rounded border border-primary-300 text-secondary placeholder-primary-300"
                />
               
            </div>
            {errMsg ? <div className="text-5xl justify-center flex m-10">{errMsg}</div> :
                <div className="grid grid-cols-5 gap-6">
                    {productes.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id}>
                            <div key={product.id} className="bg-white shadow p-4 transition duration-200 ease-in-out hover:scale-105">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-4" />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-sm text-gray-600 truncate">{product.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            }
            <div>

            </div>
            {!errMsg &&
                <div className="mt-4 p-2 flex justify-center items-center">
                    <button
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                            window.scrollTo(0, 0); // Scroll to the top of the page
                        }}
                        className={`mx-2 my-2 p-2 rounded ${currentPage === 1 ? 'bg-white border border-primary-500 cursor-not-allowed' : 'bg-primary-100 border border-primary-500 hover-bg-secondary'}`}
                        disabled={currentPage === 1}
                    >
                        &lt; Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentPage(index + 1);
                                window.scrollTo(0, 0); // Scroll to the top of the page
                            }}
                            className={`mx-2 p-2 rounded ${currentPage === index + 1 ? 'bg-primary-100 text-primary-500 cursor-not-allowed' : 'bg-primary-100 border border-primary-500 hover-bg-secondary'}`}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                            window.scrollTo(0, 0); // Scroll to the top of the page
                        }}
                        className={`mx-2 my-2 p-2 rounded ${currentPage === totalPages ? 'bg-white border border-primary-500 cursor-not-allowed' : 'bg-white border border-gray-300 hover-bg-secondary'}`}
                        disabled={currentPage === totalPages}
                    >
                        Next &gt;
                    </button>
                </div>
            }
        </div>
    );
};

export default ProductPage;