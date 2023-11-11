import React, { useState, useEffect } from 'react';
import { preresetpass } from '../../utils/AuthorizationApi';
import Spooky from "../../assets/KABAN.gif";
import Message from "../../components/Message/Message";
import Spinner from '../../components/Spinner/Spinner';

const ForgotPasswordPreResetPage = () => {
    const [email, setEmail] = useState('');
    const [errMsg, setErr] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [isMessage, setIsMessage] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [message, setMessage] = useState("");


    const checkMailLenght = () => {
        if (email.length > 128)
            return false;
        return true;
    }


    const handlePreReset = async(e) => {
        e.preventDefault();
        if (checkMailLenght() && !isClick) {
            setIsClick(true)
            let res = await preresetpass(email);
            setMessage(res.message)
            getMessage();
            setEmail("");
        }
    };
    const getMessage = () => {
        setIsMessage(true);
        setTimeout(() => setIsMessage(false), 4000);
    }

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, [])

    return (
        <>
        { isLoading?
                <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div >
                :
                <div>
                    {isMessage ?
                        <Message param={message} />
                        :
                        <></>
                    }
        <section className="border-primary-500  flex items-center justify-center">
            <div className="bg-primary-100 p-5 flex rounded-xl shadow-lg max-w-6xl m-28">
                <div className="w-1/2 md:block hidden ">
                    <img
                        src={Spooky}
                        className="rounded-2xl w-[400px] h-auto object-cover"
                        alt="page gif" />
                </div>
                <div className="md:w-1/2 px-3  space-y-4">
                    <h2 className="text-2xl font-bold text-primary-300 flex justify-center">Password Reset Page</h2>
                    <form className="mt-3">
                        <div className="mt-3">
                            <label className="block text-primary-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                placeholder="Email*" />
                        </div>
                        <p className="text-red text-xs">{errMsg}</p>
                        <button
                            type="submit"
                            className="w-full block bg-primary-300 hover:bg-primary-200 duration-200 focus:bg-blue-400 text-primary-600 font-semibold rounded-lg px-4 py-3 mt-4"
                            onClick={handlePreReset}>Send Reset Email</button>
                    </form>
                    <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
                        <hr className="border-secondary" />
                        <p className="text-center text-sm text-secondary">OR</p>
                        <hr className="border-secondary" />
                    </div>
                    <div className="text-sm flex justify-between items-center mt-3 text-left">
                        <p>If yor remembered password</p>
                        <a href="/login" >
                            <button className="py-2 px-5 ml-3 bg-primary-100 border rounded-xl hover:scale-110 duration-300 border-primary-300  ">Login</button>
                        </a>
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
                </div>

            }   
        </>
    )
};

export default ForgotPasswordPreResetPage;