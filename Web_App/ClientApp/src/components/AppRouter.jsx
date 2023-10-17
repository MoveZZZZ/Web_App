import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProductPage from "../pages/ProductPage";
import ProductDetail from "../pages/ProductDetail";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import FavoritePage from "../pages/FavoritePage";

const AppRouter = () => {
    const { isAuth } = useContext(AuthContext);
    console.log(isAuth);
    return (
        isAuth
            ?
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={< ProductPage />} path="/product" />
                <Route element={<ProductDetail />} path="/product/:id" />
                <Route element={<ShoppingCartPage />} path="/cart" />
                <Route element={<FavoritePage />} path="/favorite" />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            :
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={<SignUpPage />} path="/signup" />
                <Route element={< ProductPage />} path="/product" />
                <Route element={<ProductDetail />} path="/product/:id" />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>

        
    )
}

export default AppRouter;