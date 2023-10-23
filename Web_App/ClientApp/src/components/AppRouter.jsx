﻿import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/AuthorizationPages/LoginPage";
import SignUpPage from "../pages/AuthorizationPages/SignUpPage";
import ProductPage from "../pages/TowarPages/ProductPage";
import ProductDetail from "../pages/TowarPages/ProductDetail";
import ShoppingCartPage from "../pages/TowarPages/ShoppingCartPage";
import FavoritePage from "../pages/TowarPages/FavoritePage";
import AddTowarPage from "../pages/TowarPages/AddTowarPage";

const AppRouter = () => {
    const { isAuth } = useContext(AuthContext);
    return (
        isAuth
            ?
            <Routes>
                <Route
                    element={<HomePage />}
                    path="/" />
                <Route
                    element={< ProductPage />}
                    path="/product" />
                <Route
                    element={<ProductDetail />}
                    path="/product/:id" />
                <Route
                    element={<ShoppingCartPage />}
                    path="/cart" />
                <Route
                    element={<FavoritePage />}
                    path="/favorite" />
                <Route
                    element={<AddTowarPage />}
                    path="/addtowar" />
                <Route
                    path="*"
                    element={<Navigate to="/" />} />
            </Routes>
            :
            <Routes>
                <Route
                    element={<HomePage />}
                    path="/" />
                <Route
                    element={<LoginPage />}
                    path="/login" />
                <Route
                    element={<SignUpPage />}
                    path="/signup" />
                <Route
                    element={< ProductPage />}
                    path="/product" />
                <Route
                    element={<ProductDetail />}
                    path="/product/:id" />
                <Route
                    element={<AddTowarPage />}
                    path="/addtowar" />

                <Route
                    path="*" element={<Navigate to="/login" />} />
            </Routes>

        
    )
}

export default AppRouter;