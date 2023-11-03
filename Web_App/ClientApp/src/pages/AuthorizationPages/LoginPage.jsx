import React, { useState, useContext, useEffect, useRef } from 'react';
import { login, } from '../../utils/AuthorizationApi';
import snoopSec from "../../assets/snoopSec.gif";
import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "../../context";
import ReCAPTCHA from "react-google-recaptcha";
import Message from "../../components/Message/Message";

const LoginPage = () => {
    const [loginUser, setLoginUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const recaptcha = useRef();

    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault()
        const captchaValue = recaptcha.current.getValue();
        if (!captchaValue) {

            setErrMsg("Please verify the reCAPTCHA!");
        }
        else {
            let response = await login(loginUser, passwordUser)
            if (!response.message && !response.uid) {
                // eslint-disable-next-line no-restricted-globals
                location.replace("/login");
            }
            if (response.uid) {
                setMessage("Hi, verefication code has ben send to your email!")
                getMessage();
                setTimeout(() => window.open("/oauth/"+ response.uid, "_self"), 2500);
            }
            else {
                setErrMsg(response.message);
                recaptcha.current.reset();
            }
        }
        setLoginUser("");
        setPasswordUser("");
    }
    const getMessage = () => {
        setIsMessage(true);
        setTimeout(() => setIsMessage(false), 2500);
    }
    return (
        <>
        { isMessage ? <Message param={message} /> : null }
        <section className="border-primary-500  flex items-center justify-center">
            <div className="bg-primary-100 p-5 flex rounded-xl shadow-lg max-w-3xl m-28">
                <div className="w-1/2 md:block hidden ">
                    <img
                        src={snoopSec}
                        className="rounded-2xl w-auto h-auto"
                        alt="page gif" />
                </div>
                <div className="md:w-1/2 px-5">
                    <h2 className="text-2xl font-bold text-primary-300 ">Login</h2>
                    <form className="mt-6">
                        <div>
                            <label className="block text-primary-700">Username</label>
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
                        <div className="mt-4">
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
                            <a href="/passwordrecovery"
                                className="text-sm font-semibold text-primary-600 hover:text-secondary">Forgot Password?</a>
                        </div>
                        <p className="text-red text-xs">{errMsg}</p>
                        <button
                            type="submit"
                            className="w-full block bg-primary-300 hover:bg-primary-200 duration-200 focus:bg-blue-400 text-primary-600 font-semibold rounded-lg px-4 py-3 mt-3 mb-4"
                            onClick={handleLogin}>Log In</button>
                            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={recaptcha} />
                    </form>

                    <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
                        <hr className="border-secondary" />
                        <p className="text-center text-sm text-secondary">OR</p>
                        <hr className="border-secondary" />
                    </div>

                    <div className="text-sm flex justify-between items-center mt-3 text-left">
                        <p>If you don't have an account...</p>
                        <a href="/signup" >
                            <button className="py-2 px-5 ml-3 bg-primary-100 border rounded-xl hover:scale-110 duration-300 border-primary-300  ">Register</button>
                        </a>
                    </div>
                </div>



            </div>
            </section>
        </>
    );
};

export default LoginPage;