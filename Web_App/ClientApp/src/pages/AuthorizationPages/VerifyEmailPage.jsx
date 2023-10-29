import React, { useState, useEffect, } from "react";
import { useParams,} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Message from "../../components/Message/Message";
import { fetchVerifyEmail } from "../../utils/AuthorizationApi"

const VerifyEmailPage = () => {

    const { uid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);


    const [message, setMessage] = useState("");
    const [isMessage, setIsMessage] = useState(false);


    const isSuccessChangePassword = (message) => {
        if (message === "Ok") {
            setIsValid(true);
            setIsMessage(true);
            setMessage("Yor mail succesfly veryfied. You will be redirected to the login page after 5 sekund!");
            getMessage();
            setTimeout(() => window.open("/login", "_self"), 4000);
        }
        else {
            setIsValid(false);
        }
    }

    const handleVerifyEmail = () => {
        setIsLoading(true);
        fetchVerifyEmail(uid)
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
        handleVerifyEmail();
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
                            <h1 className="font-bold text-xl">
                                Your mail is successfly veryfied.
                            </h1>
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


    );

}
export default VerifyEmailPage;