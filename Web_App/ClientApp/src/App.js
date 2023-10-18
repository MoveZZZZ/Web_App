import { Routes, Route } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "./context";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter";





/*import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCartPage from "./pages/ShoppingCartPage";*/

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [userID, setUserID] = useState("");
    const [userToken, setUserToken]=useState("");
    const [userRefreshToken, setUserRefreshToken] = useState("");
    return (
        <UserRefreshTokenContext.Provider value ={{
            userRefreshToken,
            setUserRefreshToken
        } }>
        <UserTokenContext.Provider value={{
            userToken,
            setUserToken
        }}>
        <UserIDContext.Provider value={{
            userID,
            setUserID
        } }>
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth 
        }}>
            <>
                <Navbar />
                <AppRouter/>
                <Footer />
            </>
            </AuthContext.Provider>
            </UserIDContext.Provider>
            </UserTokenContext.Provider>
        </UserRefreshTokenContext.Provider>
    )
}

export default App;