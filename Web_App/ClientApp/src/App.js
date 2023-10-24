import { Routes, Route } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "./context";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter";



const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userID, setUserID] = useState("");
    const [userToken, setUserToken] = useState("");
    const [userRefreshToken, setUserRefreshToken] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem('accTk')) {
            setIsAuth(true);
            setIsLoading(false);
        }
    }, []);

    console.log(localStorage.getItem('accTk'));

    return (
        <UserRefreshTokenContext.Provider value={{
            userRefreshToken,
            setUserRefreshToken
        }}>
            <UserTokenContext.Provider value={{
                userToken,
                setUserToken
            }}>
                <UserIDContext.Provider value={{
                    userID,
                    setUserID
                }}>
                    <AuthContext.Provider value={{
                        isAuth,
                        setIsAuth,
                        isLoading
                    }}>
                        <>
                            <Navbar />
                            <AppRouter />
                            <Footer />
                        </>
                    </AuthContext.Provider>
                </UserIDContext.Provider>
            </UserTokenContext.Provider>
        </UserRefreshTokenContext.Provider>
    )
}

export default App;