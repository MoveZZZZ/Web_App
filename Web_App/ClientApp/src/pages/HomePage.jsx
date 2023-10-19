import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "../context";
import React, { useState, useContext, useEffect } from 'react';

const HomePage = () => {
    const { userID, setUserID } = useContext(UserIDContext);
    const { userToken, setUserToken } = useContext(UserTokenContext);
    const { userRefreshToken, setUserRefreshToken } = useContext(UserRefreshTokenContext);

    return (
        <div>HOME</div>




    );
};

export default HomePage;