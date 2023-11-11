import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/AuthorizationPages/LoginPage";
import SignUpPage from "../pages/AuthorizationPages/RegistrationPage";
import ProductPage from "../pages/TowarPages/ProductPage";
import ProductDetail from "../pages/TowarPages/ProductDetail";
import ShoppingCartPage from "../pages/TowarPages/ShoppingCartPage";
import FavoritePage from "../pages/TowarPages/FavoritePage";
import AddTowarPage from "../pages/AdminPage/AddTowarPage";
import OrdersPage from "../pages/TowarPages/OrdersPage";
import Spinner from '../components/Spinner/Spinner';
import OrderDetailsPage from "../pages/TowarPages/OrderDetailsPage";
import SettingsPage from "../pages/usersPage/SettingsPage";
import VerifyMailBeforeChange from "../pages/usersPage/VerifyMailBeforeChange";
import ForgotPasswordPreResetPage from "../pages/AuthorizationPages/PreResetPasswordPage";
import ResetPage from "../pages/AuthorizationPages/RecoveryPasswordPage";
import AllOrderPage from "../pages/AdminPage/AllOrdersPage"
import AdminOrderDetailsPage from "../pages/AdminPage/AdminOrderDetailsPage";
import AllOrdersArchivePage from "../pages/AdminPage/AllOrdersArchivePage";
import AdminOrderDetailsArchivePage from "../pages/AdminPage/AdminOrderDetailsArchivePage";
import VerifyEmailPage from "../pages/AuthorizationPages/VerifyEmailPage";
import MFAAuthPage from "../pages/AuthorizationPages/2FA_VerificationCodePage";


const AppRouter = () => {
    const { isAuth, isLoading, isAdmin } = useContext(AuthContext);
    if (isLoading) {
        return (
            <div className="flex justify-center w-full">
                <Spinner />
            </div>
        )
    }
    return (
        isAuth
            ?
            isAdmin ?
                <Routes>
                    <Route
                        element={<AdminOrderDetailsPage />}
                        path="/admin/orderdetails" />
                    <Route
                        element={<AdminOrderDetailsArchivePage />}
                        path="/admin/orderdetails/archive" />
                    <Route
                        element={<AddTowarPage />}
                        path="admin/addtowar" />
                    <Route
                        element={<AllOrderPage />}
                        path="/admin/getallorder" />
                    <Route
                        element={<AllOrdersArchivePage />}
                        path="/admin/getallorderarchive" />
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
                        element={<SettingsPage />}
                        path="/settings"
                    />
                    <Route
                        element={< VerifyMailBeforeChange />}
                        path="/verifychangedmail/:uid" />
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
                        element={<OrdersPage />}
                        path="/orders" />
                    <Route
                        element={<OrderDetailsPage />}
                        path="/orderdetails" />
                    <Route
                        element={<SettingsPage />}
                        path="/settings"
                    />
                    <Route
                        element={< VerifyMailBeforeChange />}
                        path="/verifychangedmail/:uid" />
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
                    element={<ForgotPasswordPreResetPage />}
                    path="/passwordrecovery" />
                <Route
                    element={<ResetPage />}
                    path="/recoverypage/:uid" />
                <Route
                    element={< VerifyEmailPage />}
                    path="/mailverification/:uid" />
                <Route
                    element={< MFAAuthPage />}
                    path="/oauth/:uid" />
                <Route
                    element={< VerifyMailBeforeChange />}
                    path="/verifychangedmail/:uid" />
                <Route
                    path="*" element={<Navigate to="/login" />} />
            </Routes>


    )

}

export default AppRouter;