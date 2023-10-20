import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "../context";
import React, { useState, useContext, useEffect } from 'react';

const HomePage = () => {
    const { userID, setUserID } = useContext(UserIDContext);
    const { userToken, setUserToken } = useContext(UserTokenContext);
    const { userRefreshToken, setUserRefreshToken } = useContext(UserRefreshTokenContext);


    const [image, setImage] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);



    const handleDrop = (e) => {
        e.preventDefault();
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result;
                const imageBlob = new Blob([arrayBuffer], { type: file.type });
                setImageBlob(imageBlob);
                const formData = new FormData();
                formData.append('image', imageBlob, 'image.png');
                console.log(formData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                width: '300px',
                height: '300px',
                border: '2px dashed #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {image ? (
                <img
                    src={image}
                    alt="Uploaded"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            ) : (
                <p>Drag and drop an image here</p>
            )}
        </div>




    );
};

export default HomePage;