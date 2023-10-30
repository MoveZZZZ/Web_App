import React, { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { fetchMFAuthCodeSubmit, fetchIsExistOAuthUID } from "../../utils/AuthorizationApi"
import Spinner from '../../components/Spinner/Spinner';
import Message from "../../components/Message/Message";

const MFAAuthPage = () => {
    const { uid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);


    const [code, setCode] = useState("");
    const [isChanged, setIsChanged] = useState(false);

    const [responsemessage, setResponseMessage] = useState("");
    const [message, setMessage] = useState("");
    const [isMessage, setIsMessage] = useState(false);

    const handleCodeSubmit = async () => {
        setIsLoading(true);
        fetchMFAuthCodeSubmit(code, uid)
            .then((data) => {
                isCodeSeccessfulySubmited(data.message);
            })
            .catch((error) => {
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    }

    const isCodeSeccessfulySubmited = (message) => {
        if (!message) {
            setIsChanged(true);
            setResponseMessage("");
            setMessage("You were successfuly verified, redirecting to home page");
            getMessage();
            setTimeout(() => window.open("/", "_self"), 1400);
        }
        else {
            setResponseMessage(message);
        }
    }

    const isUidExist = async () => {
        setIsLoading(true);
        fetchIsExistOAuthUID(uid)
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
                                <label className="block text-primary-700">Verification Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        required
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="w-full px-4 py-3 pr-10 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none"
                                        placeholder="Password*"
                                    />
                                </div>
                            </div>
                            <p className="text-red text-xs">{responsemessage}</p>
                            <button
                                disabled={isChanged}
                                type="submit"
                                className="w-full block bg-primary-300 hover:bg-primary-200 duration-200 focus:bg-blue-400 text-primary-600 font-semibold rounded-lg px-4 py-3 mt-4"
                                onClick={handleCodeSubmit}>Submit</button>
                        </div>
                        :
                        <div className="text-center my-10">
                            <h1 className="font-bold text-xl">
                                Your token has been expired. Please, try again!
                            </h1>
                            <a href="/login" className="text-secondary border-b hover:text-primary-400 ease-in-out duration-150 w-auto">Click on this link for try again!</a>

                        </div>
                    }
                </div>
            }


        </>
    )
};

export default MFAAuthPage;
