import snoopNavbar from "../../assets/snoopDogTr.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import LoginPage from "../../pages/LoginPage";
import React, { useState } from 'react';

const NavbarLogin = () => {

    return (

        <nav className="p-4 shadow-lg p-6 bg-primary-100">
            <div className="container mx-auto">
                <div className="flex justify-between items-center ">
                    <a href="/" className="flex items-center opacity-100 ">
                        <img src={snoopNavbar} className="h-12 mr-3" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">K*rwa</span>
                    </a>
                    <div className="flex justify-end">
                        <a href="/product" className="text-white hover:text-primary-300 ease-in-out hover:text-secondary mx-5">Shop<i>
                            <FontAwesomeIcon icon={faStore} className="ml-2" /></i></a>
                        <a href="/cart" className="text-white hover:text-primary-300 ease-in-out hover:text-secondary mx-5">Cart<i>
                            <FontAwesomeIcon icon={faCartShopping} className="ml-2" /></i></a>
                        <a href="/" className="text-white hover:text-primary-300 ease-in-out hover:text-secondary mx-5">Favorite<i>
                            <FontAwesomeIcon icon={faHeart} className="ml-2" /></i></a>
                    </div>
                    <ul className="flex space-x-2">
                        <li>
                        <a>Mamu ebal</a>
                        </li>
                    </ul>
                </div>


            </div>
        </nav>

    );
};

export default NavbarLogin;