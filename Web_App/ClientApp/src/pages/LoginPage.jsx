// Login.js
import React, { useState, useContext, useEffect } from 'react';
import { handleLoginError, login } from '../utils/userApi';
import snoopSec from "../assets/snoopSec.gif";
import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "../context";

const LoginPage = () => {
    const [loginUser, setLoginUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [errMsg, setErrMsg] = useState('');



    const { isAuth, setIsAuth } = useContext(AuthContext);
    const { userID, setUserID } = useContext(UserIDContext);
    const { userToken, setUserToken } = useContext(UserTokenContext);
    const { userRefreshToken, setUserRefreshToken } = useContext(UserRefreshTokenContext);




/*    useEffect(() => {
        setUserID("");
        setUserToken("");
        setUserRefreshToken("");
        }, []);*/

    const handleLogin = () => {
        console.log("FIRST");
        console.log(userID);
        login(loginUser, passwordUser)
            .then((response) => {
                console.log(response);
                console.log("=================================");
                setUserID(response.userID);
                console.log(userID);
                setUserToken(response.userToken);
                console.log(userToken);
                setUserRefreshToken(response.userRefreshToken);
                console.log(userRefreshToken);
                setErrMsg("");

                setIsAuth(true);

            })
            .catch((error) => {
                setErrMsg("*bad login or password")
            });
        setLoginUser("");
        setPasswordUser("");
    }
    return (
        <section class="border-primary-500  flex items-center justify-center">
            <div class="bg-primary-100 p-5 flex rounded-xl shadow-lg max-w-3xl m-28">
                <div class="w-1/2 md:block hidden ">
                    <img src={snoopSec} className="rounded-2xl w-auto h-auto" alt="page gif" />
                </div>
                <div className="md:w-1/2 px-5">
                    <h2 className="text-2xl font-bold text-primary-300 ">Login</h2>
                    <form className="mt-6">
                        <div>
                            <label class="block text-primary-700">Username</label>
                            <input
                                id="uname"
                                name="uname"
                                type="uname"
                                autoComplete="uname"
                                required
                                value={loginUser}
                                onChange={(e) => setLoginUser(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                placeholder="Username*" />
                        </div>
                        <div class="mt-4">
                            <label className="block text-primary-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={passwordUser}
                                onChange={(e) => setPasswordUser(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                placeholder="Password*" />
                        </div>
                        <div className="text-right mt-2">
                            <a href="#" className="text-sm font-semibold text-primary-600 hover:text-secondary">Forgot Password?</a>
                        </div>
                        <p className="text-red text-xs">{errMsg}</p>
                        <button type="submit" className="w-full block bg-primary-300 hover:bg-primary-200 duration-200 focus:bg-blue-400 text-primary-600 font-semibold rounded-lg
                px-4 py-3 mt-3" onClick={handleLogin}>Log In</button>
                    </form>

                    <div class="mt-7 grid grid-cols-3 items-center text-gray-500">
                        <hr class="border-secondary" />
                        <p class="text-center text-sm text-secondary">OR</p>
                        <hr class="border-secondary" />
                    </div>

                    <div class="text-sm flex justify-between items-center mt-3 text-left">
                        <p>If you don't have an account...</p>
                        <a href="/signup" >
                        <button class="py-2 px-5 ml-3 bg-primary-100 border rounded-xl hover:scale-110 duration-300 border-primary-300  ">Register</button>
                        </a>
                    </div>
                </div>



            </div>
        </section>
    );
};

export default LoginPage;