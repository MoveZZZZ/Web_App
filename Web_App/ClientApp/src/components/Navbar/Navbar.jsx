import snoopNavbar from "../../assets/snoopDogTr.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import LoginPage from "../../pages/LoginPage";
import { AuthContext } from "../../context";
import React, { useContext, useState } from 'react';
import { Link} from 'react-router-dom';

const Navbar = () => {
    const { isAuth, setIsAuth} = useContext(AuthContext);
    const logout = () => {

        setIsAuth(false);
    }


    return (

        <nav className="p-4 shadow-lg p-6 bg-primary-100">
            <div className="container mx-auto">
                <div className="flex justify-between items-center ">
                    <a href="/" className="flex items-center opacity-100 ">
                        <img src={snoopNavbar} className="h-12 mr-3" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">K*rwa</span>
                    </a>
                    <div className="flex justify-end">
                        <Link to="/product" className="text-white hover:text-primary-300 ease-in-out hover:text-secondary mx-5">
                            Shop
                            <i>
                                <FontAwesomeIcon icon={faStore} className="ml-2" /></i>
                        </Link>

                        <Link to="/cart" className="text-white hover:text-primary-300 ease-in-out hover:text-secondary mx-5">
                            Cart
                            <i>
                                <FontAwesomeIcon icon={faCartShopping} className="ml-2" /></i>
                        </Link>


                        <Link to="/favorite" className="text-white hover:text-primary-300 ease-in-out hover:text-secondary mx-5">
                        Favorite
                            <i>
                                <FontAwesomeIcon icon={faHeart} className="ml-2" /></i>
                        </Link>
                    </div>
                    <ul className="flex space-x-2">
                        {isAuth
                            ? (
                             <li>
                                    <Link to="/home" className="text-white hover:text-primary-300 ease-in-out  hover:text-secondary" onClick={logout}>Sign Out</Link>
                           </li>
                       
                        )                                
                            : (<>
                             <li>
                            <Link to="/login" className="text-white hover:text-primary-300 ease-in-out  hover:text-secondary">Sign In</Link>

                        </li>
                        <li>
                            <a className="text-white">|</a>
                        </li>
                        <li>

                            <Link to="/signup" className="text-white hover:text-primary-300 ease-in-out  hover:text-secondary">Sign Up</Link>
                                </li>
                            </>
                          
                        )
                           
                        }
                    </ul>
                </div>
                

            </div>
        </nav>

    );
};

export default Navbar;