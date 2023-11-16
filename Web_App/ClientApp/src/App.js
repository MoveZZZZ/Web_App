import React, { useEffect, useState } from 'react';
import { AuthContext, } from "./context";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter";
import { refreshTokens } from "./utils/authenticationLogic";


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
            setTimeout(() => 2500);
            if (!res.message) {
                if (res.userRole === 'ADMIN') {
                    setIsAdmin(true);
                }
                sessionStorage.setItem("ID", res.userID);
            }
            if (sessionStorage.getItem("ID")) {
                setIsAuth(true);
                setUserID(sessionStorage.getItem("ID"));
            }
            setIsLoading(false);
        }
        dataLoader();
    }, []);


    return (
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
    )
}
export default App;