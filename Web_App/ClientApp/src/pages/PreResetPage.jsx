
import React, { useState } from 'react';
import { handleLoginError, preresetpass } from '../utils/userApi';

const ForgotPasswordPreResetPage = () => {
    const [login, setLogin] = useState('');

    const handlePreReset = (e) => {
        e.preventDefault();
        preresetpass(login)
            .then((response) => {
                console.log('Email with reset link were sent!');
                alert("Check your email!");
            })
            .catch((error) => {
                console.log(error.response.data);
                handleLoginError(error);
            });
        setLogin("");
    };
}