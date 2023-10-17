import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "../context";
import React, { useState, useContext, useEffect } from 'react';

const HomePage = () => {
    const { userID, setUserID } = useContext(UserIDContext);
    const { userToken, setUserToken } = useContext(UserTokenContext);
    const { userRefreshToken, setUserRefreshToken } = useContext(UserRefreshTokenContext);

    return (
        <div className="text-xs break-normal">
        <div>{userID}</div>
        <div>{userToken}</div>
            <div>{userRefreshToken}</div>
        </div>




    );
};

export default HomePage;