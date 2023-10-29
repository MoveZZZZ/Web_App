import snoopNavbar from "../../assets/snoopDogTr.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import LoginPage from "../../pages/AuthorizationPages/LoginPage";
import { AuthContext } from "../../context";
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutModal from "../MyModal/LogOutModal";
import cursedCat from "../../assets/cat.gif";
import { logoutCookieCleanUp, } from '../../utils/AuthenticationLogic';
import { menuLinks, menuAdminLinks } from '../../constants/constant';
import { fetchGetUserDataProfile, } from "../../utils/userApi"
import { useEffect } from 'react';


const Navbar = () => {
    const { isAuth, setIsAuth, isAdmin, setIsAdmin } = useContext(AuthContext);
    const [modalVisability, setModalVisability] = useState(false);
    const [userProfile, setUserProfile] = useState([]);
    const [isToggle, setIsToggle] = useState(false);
    const userID = sessionStorage.getItem('ID');

    const [isLoading, setIsLoading] = useState(true);

    const handleToggle = () => {
        setIsToggle(!isToggle)
    }

    const logout = () => {
        setIsAuth(false);
        setIsAdmin(false);
        sessionStorage.removeItem("ID");
        logoutCookieCleanUp();
        setModalVisability(false);
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const uploadUserData = async () => {
        if (userID) {
            setIsLoading(true);
            fetchGetUserDataProfile(userID)
                .then((data) => {
                    setUserProfile(data);
                })
                .catch(() => {
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 300);
                });
        }
       
    }

    useEffect(() => {
        uploadUserData();
    }, [userID]);

    useEffect(() => {

    }, [isAdmin]);

    return (
        
        <nav className="p-4 shadow-lg p-6 bg-primary-100">
                <div className="mx-3">
                    <div className="flex justify-between items-center ">
                        <Link to="/"
                            className="flex items-center opacity-100 transition duration-200 ease-in-out hover:scale-110">
                            <img src={snoopNavbar}
                                className="h-12 mr-3"
                                alt="Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">K*rwa</span>
                        </Link>
                        <div className="flex max-md:hidden">
                            {!isAdmin ? (
                                menuLinks.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        className={` ${location.pathname === item.link
                                            ? 'text-secondary mx-3'
                                            : 'text-primary-500 hover:text-primary-300 ease-in-out hover:text-secondary transition-transform mx-3 transition duration-200 hover:scale-110'
                                            }`}>
                                        {item.title}
                                        <i><FontAwesomeIcon icon={item.icon} className="ml-2" /></i>
                                    </Link>

                                ))
                            ) : (
                                menuAdminLinks.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        className={` ${location.pathname === item.link
                                            ? 'text-secondary mx-3'
                                            : 'text-primary-500 hover:text-primary-300 ease-in-out hover:text-secondary transition-transform mx-3 transition duration-200 ease-in-out hover:scale-110'
                                            }`}>
                                        {item.title}
                                        <i><FontAwesomeIcon icon={item.icon} className="ml-2" /></i>
                                    </Link>

                                ))
                            )}

                    </div>
                    {isAuth && !isLoading 
                        ? (
                                
                                <div className="flex space-x-2 max-md:hidden">
                                    <div>
                                        <button
                                            id="dropdownUserAvatarButton"
                                            data-dropdown-toggle="dropdownAvatar"
                                            className="flex mx-3 text-sm rounded-full md:mr-0"
                                            type="button"
                                            onClick={toggleMenu}
                                        >
                                            <span className="sr-only">Open user menu</span>
                                            <img className="w-8 h-8 rounded-full" src={`data:image/jpeg;base64,${userProfile.photo.toString('base64')}`} alt="user photo" />
                                        </button>
                                        {isMenuOpen && (
                                            <div
                                                id="dropdownAvatar"
                                                className="absolute right-0 mt-10 mx-2 bg-primary-100 divide-y divide-primary-200 rounded-lg shadow-xl w-60"
                                            >
                                                <div className="px-4 py-3 text-sm text-primary-500">
                                                    <div className="font-medium truncate">{userProfile.mail}</div>
                                                </div>
                                                <ul className="py-2 text-sm text-primary-500" aria-labelledby="dropdownUserAvatarButton">
                                                    <li>
                                                        <a href="/settings" className="block px-4 py-2 hover:text-secondary" onClick={closeMenu}>
                                                            Settings
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="py-2">
                                                    <a className="block px-4 py-2 text-sm text-primary-500 hover:text-secondary cursor-pointer" onClick={() => setModalVisability(true)}>
                                                        Sign out
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <LogoutModal visible={modalVisability} setVisible={setModalVisability}>
                                        <div className="space-y-4 z-10">
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
                                </div>
                            )
                            : (
                                <div className="flex space-x-2 max-md:hidden">
                                    <ul className="flex space-x-2">
                                        <li>
                                            <Link to="/login" className="text-white hover:text-primary-300 ease-in-out  hover:text-secondary">Sign In</Link>
                                        </li>
                                        <li>
                                            <p className="text-white">|</p>
                                        </li>
                                        <li>
                                            <Link to="/signup" className="text-white hover:text-primary-300 ease-in-out  hover:text-secondary">Sign Up</Link>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                        {isToggle ? (
                            <div
                                onClick={handleToggle}
                                className="hidden max-md:block"
                            >
                                <i className="text-2xl">
                                    <FontAwesomeIcon
                                        icon={faX}
                                        className="hover:text-secondary ease-in-out duration-150 cursor-pointer"
                                    />
                                </i>
                            </div>
                        ) : (
                            <div
                                onClick={handleToggle}
                                className="hidden max-md:block"
                            >
                                <i className="text-2xl">
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className="hover:text-secondary ease-in-out duration-150 cursor-pointer"
                                    />
                                </i>
                            </div>
                        )
                        }
                        {isToggle ? (
                            <div className="z-10 hidden max-md:block shadow-xl bg-primary-100 absolute top-24 right-0 w-72 h-98 border-2 border-primary-200">
                                <div className="flex gap-4 flex-col items-center">
                                    {isAuth ? (
                                        <div className="px-5 py-3 text-sm text-primary-500 flex justify-center items-center">
                                            <img className="w-8 h-8 rounded-full mr-3" src={`data:image/jpeg;base64,${userProfile.photo.toString('base64')}`} alt="user photo" />
                                            <div className="font-medium truncate">{userProfile.mail}</div>
                                        </div>
                                    ) : (
                                        <></>

                                    )}
                                    {isAdmin ? (
                                        menuAdminLinks.map((item) => (
                                            <Link
                                                key={item.id}
                                                to={item.link}
                                                className={` ${location.pathname === item.link
                                                    ? 'text-secondary mx-3'
                                                    : 'text-primary-500 hover:text-primary-300 ease-in-out hover:text-secondary transition-transform mx-3 transition duration-200 hover:scale-110'
                                                    } text-lg`}
                                                onClick={() => setIsToggle(false)}
                                            >
                                                {item.title}
                                                <i><FontAwesomeIcon icon={item.icon} className="ml-2" /></i>

                                            </Link>
                                        ))) : (
                                        menuLinks.map((item) => (
                                            <Link
                                                key={item.id}
                                                to={item.link}
                                                className={` ${location.pathname === item.link
                                                    ? 'text-secondary mx-3'
                                                    : 'text-primary-500 hover:text-primary-300 ease-in-out hover:text-secondary transition-transform mx-3 transition duration-200 hover:scale-110'
                                                    } text-lg`}
                                                onClick={() => setIsToggle(false)}
                                            >
                                                {item.title}
                                                <i><FontAwesomeIcon icon={item.icon} className="ml-2" /></i>
                                            </Link>
                                        )))
                                    }
                                    <div className="border-2 w-4/5 rounded-full border-primary-200" />
                                    {isAuth ? (
                                        <div className="flex flex-col gap-4">
                                            <ul className="text-base text-primary-500" aria-labelledby="dropdownUserAvatarButton">
                                                <li>
                                                    <a href="/settings" className="block px-4 hover:text-secondary" onClick={closeMenu}>
                                                        Settings
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="mb-4">
                                                <a className=" cursor-pointer block px-4 text-base text-primary-500 hover:text-secondary" onClick={() => setModalVisability(true)}>
                                                    Sign out
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4 justify-evenly mb-6">
                                            <Link>Sign In</Link>
                                            <p>|</p>
                                            <Link>Sign Up</Link>
                                        </div>)

                                    }

                                </div>
                            </div>
                        ) : (
                            <>
                            </>
                        )
                        }
                    </div>
                </div>
        </nav>

    );




};

export default Navbar;