import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { preresetpass } from '../../utils/AuthorizationApi';
import Spooky from "../../assets/KABAN.gif";

const ResetPage = () => {
    const { uid } = useParams();
    const [email, setEmail] = useState('');
    const [errMsg, setErr] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!uidcheck(uid))
        {
            //MODAL HERE
            alert("WARNING WHIS LINK IS EXPIRED, YPU WILL BE REDIRECT TO THE LOGIN PAGE");
            setTimeout(() =>
                // eslint-disable-next-line no-restricted-globals
                location.replace("/login"), 1000);
        }
        setIsLoading(false);
    })

    const uidcheck = (uid) =>
    {
        return true;
    }

    const handlePreReset = (e) => {
        e.preventDefault();
        preresetpass(email);
        setEmail("");
    };

    return (
        <section class="border-primary-500  flex items-center justify-center">
            <div class="bg-primary-100 p-5 flex rounded-xl shadow-lg max-w-6xl m-28">
                <div class="w-1/2 md:block hidden ">
                    <img
                        src={Spooky}
                        className="rounded-2xl w-[400px] h-auto object-cover"
                        alt="page gif" />
                </div>
                <div className="md:w-1/2 px-3  space-y-4">
                    <h2 className="text-2xl font-bold text-primary-300 ">{uid}</h2>
                    <form className="mt-3">
                        <div class="mt-3">
                            <label class="block text-primary-700">Email</label>
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
                    <div class="mt-7 grid grid-cols-3 items-center text-gray-500">
                        <hr class="border-secondary" />
                        <p class="text-center text-sm text-secondary">OR</p>
                        <hr class="border-secondary" />
                    </div>
                    <div class="text-sm flex justify-between items-center mt-3 text-left">
                        <p>If yor remembered password</p>
                        <a href="/login" >
                            <button class="py-2 px-5 ml-3 bg-primary-100 border rounded-xl hover:scale-110 duration-300 border-primary-300  ">Register</button>
                        </a>
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
    )
};

export default ResetPage;