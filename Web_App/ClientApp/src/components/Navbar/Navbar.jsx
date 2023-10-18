import snoopNavbar from "../../assets/snoopDogTr.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import LoginPage from "../../pages/LoginPage";
import { AuthContext } from "../../context";
import React, { useContext, useState } from 'react';
import { Link} from 'react-router-dom';
import LogoutModal from "../MyModal/LogOutModal";
import cursedCat from "../../assets/cat.gif";


const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const [modalVisability, setModalVisability] = useState(false);
    const [choosenPage, setChoosenPage] = useState(0);
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('accTk');
        setModalVisability(false);
        setChoosenPage(0);
    }

    return (
        <nav className="p-4 shadow-lg p-6 bg-primary-100">
            <div className="mx-3">
                <div className="flex justify-between items-center ">
                    <Link to="/" onClick={() => { setChoosenPage(0); }}
                        className="flex items-center opacity-100 transition duration-200 ease-in-out hover:scale-110">
                        <img src={snoopNavbar}
                            className="h-12 mr-3"
                            alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">K*rwa</span>
                    </Link>
                    <div className="flex justify-end ">
                        
                        <Link
                            to="/product"
                            onClick={() => { setChoosenPage(1); }}
                            className={` ${choosenPage === 1
                                ? 'text-secondary mx-3'
                                : 'text-primary-500 hover:text-primary-300 ease-in-out hover:text-secondary transition-transform mx-3 transition duration-200 ease-in-out hover:scale-110'
                                }`}>
                            Shop
                            <i><FontAwesomeIcon icon={faStore} className="ml-2" /></i>
                        </Link>
                        
                        <Link to="/cart"
                            onClick={() => { setChoosenPage(2); }}
                            className={` ${choosenPage === 2
                                ? 'text-secondary mx-3'
                                : 'text-white hover:text-primary-300 ease-in-out hover:text-secondary transition duration-200 mx-3 ease-in-out hover:scale-110'
                                }`}>
                            Cart
                            <i><FontAwesomeIcon icon={faCartShopping} className="ml-2" /></i>
                        </Link>

                        <Link to="/favorite"
                            onClick={() => { setChoosenPage(3); }}
                            className={` ${choosenPage === 3
                                ? 'text-secondary mx-3'
                                : 'text-white hover:text-primary-300 ease-in-out hover:text-secondary transition duration-200 mx-3 ease-in-out hover:scale-110'
                                }`}>
                        Favorite
                            <i><FontAwesomeIcon icon={faHeart} className="ml-2" /></i>
                        </Link>

                    </div>
                    <ul className="flex space-x-2">
                        {isAuth
                            ? (
                            <>
                                <li>
                                        <a onClick={() => { setChoosenPage(0); }}
                                            className="text-white hover:text-primary-300 ease-in-out  hover:text-secondary cursor-pointer"
                                            onClick={() => setModalVisability(true)}>Sign Out</a>
                                </li>
                                    <LogoutModal visible={modalVisability} setVisible={setModalVisability }>
                                        <div space-y-4>
                                            <div className="flex justify-center text-2xl font-semibold whitespace-nowrap dark:text-white">You are about to log out! Are you sure?</div>
                                            <div className="flex justify-center mt-4">
                                                <img src={cursedCat}
                                                    className="rounded-2xl w-full h-auto flex justify-center"
                                                    alt="I know your secret (0)_(0)" />
                                            </div>
                                            <div className="flex justify-center w-full space-x-2" >
                                                <button className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border font-semibold focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                                    onClick={logout}>Yes, log me out NOW!</button>
                                                <button className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border font-semibold focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                                    onClick={() => setModalVisability(false)}>I'll better to stay logged.</button>
                                            </div>
                                            
                                    </div>
                                </LogoutModal>
                            </>
                       
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