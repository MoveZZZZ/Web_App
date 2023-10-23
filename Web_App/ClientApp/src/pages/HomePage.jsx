import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "../context";
import React, { useState, useContext, useEffect } from 'react';
import { refreshTokens, } from '../utils/AuthorizationApi';


const HomePage = () => {
    const TestAction = (e) => {
        e.preventDefault();
        refreshTokens()
            .then((response) => {
                console.log("Zaebok");
            })
            .catch((response) => {
                console.log("Nie Zaebok");
            })

    }
    return (
    
        <div>
            <button onClick={TestAction} class="py-2 px-5 ml-3 bg-primary-100 border rounded-xl hover:scale-110 duration-300 border-primary-300  ">
                ????????
            </button>
        </div>
    );
};

export default HomePage;