import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchChangePassword, fetchIsExistUID } from "../../utils/authorizationApi"
import Spooky from "../../assets/KABAN.gif";
import Spinner from '../../components/Spinner/Spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthBar from 'react-password-strength-bar';
import Message from "../../components/Message/Message";

const ResetPage = () => {

    const { uid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [responsemessage, setResponseMessage] = useState("");
    const [message, setMessage] = useState("");
    const [isMessage, setIsMessage] = useState(false);

    const isSuccessChangePassword = (message) => {
        if (message === "Your password successfully changed!") {
            setIsChanged(true);
            setMessage("Your password succesfly changed. You will be redirected to the login page after 5 seconds!");
            getMessage();
            setTimeout(() => window.open("/login", "_self"), 4000);
        }
        else {
            setResponseMessage(message);
        }
    }

    const isUidExist = async () => {
        setIsLoading(true);
        fetchIsExistUID(uid)
            .then((data) => {
                if (data.message === "Valid!") {
                    setIsValid(true);
                }
                else {
                    setMessage(data.message);
                }

            })
            .catch((error) => {
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChangPassword = async () => {
        setIsLoading(true);
        fetchChangePassword(password, repeatPassword, uid)
            .then((data) => {
                isSuccessChangePassword(data.message);

            })
            .catch((error) => {
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    }

    const getMessage = () => {
        setIsMessage(true);
        setTimeout(() => setIsMessage(false), 4000);
    }

    useEffect(() => {
        isUidExist();
    }, [])


    return (
        <>
            {isLoading ?
                <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div>
                :
                <div className="flex justify-center p-6 bg-white rounded-lg shadow-lg">
                    {isMessage ?
                        <Message param={message} />
                        :
                        <></>
                    }
                    {isValid ?
                        <div >
                            <div>
                                <label className="block text-primary-700">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 pr-10 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                        placeholder="Password*"
                                    />
                                    <span
                                        className="absolute right-3 top-4 mt-1 cursor-pointer text-primary-400"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <i><FontAwesomeIcon icon={faEyeSlash} /></i> : <i><FontAwesomeIcon icon={faEye} /></i>}
                                    </span>
                                </div>
                                <PasswordStrengthBar password={password} />
                            </div>
                            <div>
                                <label className="block text-primary-700">Password Confirmation</label>
                                <input
                                    id="passwordConf"
                                    name="passwordConf"
                                    type="password"
                                    autoComplete="Password-confirm"
                                    required

                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                    placeholder="Repeat your password*" />
                                <p className="flex justify-start text-sm text-red">{responsemessage}</p>
                            </div>
                            <button
                                disabled={isChanged}
                                type="submit"
                                className="w-full block bg-primary-300 hover:bg-primary-200 duration-200 focus:bg-blue-400 text-primary-600 font-semibold rounded-lg px-4 py-3 mt-4"
                                onClick={handleChangPassword}>Change password</button>

                        </div>

                        :
                        <div className="text-center my-10">
                            <h1 className="font-bold text-xl">
                                Your token has been expired. Please, try again!
                            </h1>
                            <a href="/passwordrecovery" className="text-secondary border-b hover:text-primary-400 ease-in-out duration-150 w-auto">Click on this link for try again!</a>

                        </div>
                    }
                </div>
            }
        </>
    )
};
export default ResetPage;