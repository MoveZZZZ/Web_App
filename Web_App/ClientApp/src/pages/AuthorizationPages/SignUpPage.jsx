// SignUp.js
import React, { useState } from 'react';
import { signup, } from '../../utils/AuthorizationApi';
import liveMaggotReaction from "../../assets/V1.gif";

import PasswordStrengthBar from 'react-password-strength-bar';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const SignUpPage = () => {
    const [loginUser, setLoginUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [passwordConfUser, setPasswordConfUser] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        signup(loginUser, emailUser, passwordUser, passwordConfUser)
            .then((response) => {
                setErrMsg(response.message);
                setPasswordUser("");
                setPasswordConfUser("");

            })
            .catch(() => {
                setErrMsg("");
                // eslint-disable-next-line no-restricted-globals
                location.replace("/login");
            })

    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section class="border-primary-500  flex items-center justify-center">
            <div class="bg-primary-100 p-5 flex rounded-xl shadow-lg max-w-4xl m-28">
                <div class="w-1/2 md:block hidden ">
                    <img
                        src={liveMaggotReaction}
                        className="rounded-2xl w-full h-auto object-cover"
                        alt="page gif" />
                </div>
                <div className="md:w-1/2 px-3">
                    <h2 className="text-2xl font-bold text-primary-300 ">Sign Up</h2>
                    <form className="mt-3">
                        <div>
                            <label class="block text-primary-700">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="username"
                                autoComplete="username"
                                required
                                value={loginUser}
                                onChange={(e) => setLoginUser(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                placeholder="Username*" />
                        </div>
                        <div class="mt-3">
                            <label class="block text-primary-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={emailUser}
                                onChange={(e) => setEmailUser(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                placeholder="Email*" />
                        </div>
                        <div className="mt-3">
                            <label className="block text-primary-700">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={passwordUser}
                                    onChange={(e) => setPasswordUser(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                    placeholder="Password*"
                                />
                                <span
                                    className="absolute right-3 top-4 mt-1 cursor-pointer text-primary-400"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <i><FontAwesomeIcon icon={faEyeSlash} /></i> : <i><FontAwesomeIcon icon={faEye}/></i>}
                                </span>
                            </div>
                        </div>
                        <PasswordStrengthBar password={passwordUser} />
                        <div class="mt-3">
                            <label className="block text-primary-700">Password Confirmation</label>
                            <input
                                id="passwordConf"
                                name="passwordConf"
                                type="password"
                                autoComplete="Password-confirm"
                                required
                                value={passwordConfUser}
                                onChange={(e) => setPasswordConfUser(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                placeholder="Repeat your password*" />
                        </div>
                        <p className="text-red text-xs">{errMsg}</p>
                        <button
                            type="submit"
                            className="w-full block bg-primary-300 hover:bg-primary-200 duration-200 focus:bg-blue-400 text-primary-600 font-semibold rounded-lg px-4 py-3 mt-4"
                            onClick={handleSignUp}>Create Account</button>
                    </form>
                    <div class="mt-3 grid grid-cols-3 items-center text-gray-500">
                        <hr class="border-secondary" />
                        <p class="text-center text-sm text-secondary">OR</p>
                        <hr class="border-secondary" />
                    </div>
                    <div class="text-sm flex justify-between items-center text-left">
                        <p>Already have an account?</p>
                        <a href="/login" >
                            <button class="py-2 px-5 ml-3 bg-primary-100 border rounded-xl hover:scale-110 duration-300 border-primary-300  ">Log In</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SignUpPage;