import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchIsExistUID } from "../../utils/AuthorizationApi"
import Spooky from "../../assets/KABAN.gif";
import Spinner from '../../components/Spinner/Spinner';

const ResetPage = () => {
    const { uid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);


    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

   

    const isUidExist = async () => {
        setIsLoading(true);
        fetchIsExistUID(uid)
            .then((data) => {
                if (data.message === "Ok") {
                    setIsValid(true);
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

    const handleChangPassword = async () => {

    }
    useEffect(() => {
        isUidExist();
    },[])


    return (
            <>
            {isLoading ?
                 <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div>
                :
                <div className="flex justify-center p-6 bg-white rounded-lg shadow-lg">
                    {isValid ?
                        <div >
                            <div className="mt-3">
                                <label className="block text-primary-700">Password</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 pr-10 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                        placeholder="Password*"
                                    />
                                </div>
                            </div>
                            <div class="mt-3">
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
                            </div>
                            <button
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