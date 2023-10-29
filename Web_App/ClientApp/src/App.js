import { Routes, Route } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "./context";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter";
import { refreshTokens} from "./utils/AuthenticationLogic";
import { set } from "lodash";



const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [isAdmin, setIsAdmin] = useState(false);

    const [userID, setUserID] = useState("");
    const [userToken, setUserToken] = useState("");
    const [userRefreshToken, setUserRefreshToken] = useState("");

    useEffect(() => {
        const dataLoader = async () => { 
            let res = await refreshTokens();
            if (!res.message)
            {
                if (res.userRole === 'ADMIN')
                {
                    setIsAdmin(true);
                }
                sessionStorage.setItem("ID", res.userID);
            }
            if (sessionStorage.getItem("ID")) {
                //REMOVE LATER
                setIsAuth(true);
                setUserID(sessionStorage.getItem("ID"));
            }
            setIsLoading(false);
        }
        dataLoader();
    }, []);


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
                        isLoading,
                        isAdmin,
                        setIsAdmin
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