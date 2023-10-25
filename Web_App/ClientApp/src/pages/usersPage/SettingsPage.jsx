import React, { useState, useContext, useEffect } from 'react';
import LogoutModal from "../../components/MyModal/LogOutModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { fetchGetUserDataProfile, fetchUpdatePhotoUser } from "../../utils/userApi"

import Spinner from '../../components/Spinner/Spinner';
import Message from "../../components/Message/Message";
import ErrorMessage from "../../components/Message/ErrorMessage";


const SettingsPage = () => {


   


    const [modalLoginChangeVisability, setModalLoginChangeVisability] = useState(false)
    const [modalEmailChangeVisability, setModalEmailChangeVisability] = useState(false)
    const [modalPasswordChangeVisability, setModalPasswordChangeVisability] = useState(false)

    const [newLogin, setNewLogn] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');


    const [isLoading, setIsLoading] = useState(true);


    const userID = localStorage.getItem('UserID');

    const [userProfile, setUserProfile] = useState([])


    const [showPassword, setShowPassword] = useState(false);



    const [isMessage, setIsMessage] = useState(false);
    const [isError, setIsError] = useState(false);

    const [message, setMessage] = useState("");


    



    const getInitialFormData = () => ({
            userid: userID,
            Image: null,
    });
    const [formData, setFormData] = useState(getInitialFormData());
    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            Image: e.target.files[0],
        }));
    };




    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const changeAvatar = async (e) => {
        if (formData.Image) {
            await fetchUpdatePhotoUser(formData);
            setFormData(getInitialFormData());
            uploadUserData();
            setMessage("You avatar successfully added!")
            getMessage();
        }
        else {
            setMessage("Choise avatar, please!")
            getErrorMessage();
        }
       
    };
    const changeLogin = () => {

    }
    const changeEmail = () => {

    }
    const changePassword = () => {

    }
    const clearVariables = () => {
        setCurrentPassword('');
        setNewLogn('');
    }

    const uploadUserData = async () => {
        setIsLoading(true);
        fetchGetUserDataProfile(userID)
            .then((data) => {
                console.log(data);
                setUserProfile(data);
            })
            .catch(() => {
               /* setMessage("Bad data loading");
                getErrorMessage();*/
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    }
    const getMessage = () => {
        setIsMessage(true);
        setTimeout(() => setIsMessage(false), 4000);
    }
    const getErrorMessage = () => {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
    }

    useEffect(() => {
        uploadUserData();
    }, []);

    return (
        <>
            {isLoading ?
                <div className="flex text-center items-center justify-center w-full h-96">
                    < Spinner />
                </div> :
                <div className="mt-5 w-full">
                    {isMessage ?
                        <Message param={message} />
                        :
                        <></>
                    }
                    {isError ?
                        <ErrorMessage param={message} />
                        :
                        <></>}
                    <h1 className="text-5xl font-bold text-center hover:text-primary-300 ease-in-out duration-300 max-2xl:text-3xl">Settings</h1>
                    <section className="border-primary-500  flex items-center justify-center border-b">
                        <div className="bg-primary-100 p-5 flex rounded-xl shadow-lg max-w-3xl m-28">
                            <div class="w-1/2">
                                <p className="text-primary-300 text-xl flex justify-center">Profile photo:</p>
                                <img
                                    src={`data:image/jpeg;base64,${userProfile.photo.toString('base64')}`}
                                    className="rounded-2xl w-[240px] h-[220px] my-5"
                                        alt="photoprofile" />
                                <label htmlFor="Image" className="block text-sm font-medium text-primary-300 mx-2">
                                    Change photo
                                </label>
                                <input
                                    type="file"
                                    id="Image"
                                    name="Image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="border border-primary-200 rounded-lg p-2 w-full cursor-pointer"
                                />
                                <button className="w-1/2 rounded-lg bg-primary-200 mt-5 font-semibold px-2 py-2 hover:bg-secondary hover:text-primary-100"
                                    onClick={changeAvatar}
                                >Apply

                                </button>
                            </div>
                            <div className="w-1/2">
                                <p className="text-primary-300 text-xl flex justify-center mb-10">Global info:</p>
                                <div class="border-b border-primary-200 flex-col flex justify-between items-start w-3/4 pb-3 m-5 hover:scale-105 duration-300 cursor-pointer ">
                                    <div class="w-full flex flex-col justify-start items-start space-y-2">
                                        <a class="text-sm font-semibold leading-2 text-primary-400 hover:text-secondary" onClick={() => setModalLoginChangeVisability(true)}>Change Login: { }</a>
                                    </div>
                                </div>
                                <div class="border-b border-primary-200 flex-col flex justify-between items-start w-3/4 pb-3 m-5 hover:scale-105 duration-300 cursor-pointer">
                                    <div class="w-full flex flex-col justify-start items-start space-y-2">
                                        <a class="text-sm font-semibold leading-2 text-primary-400 hover:text-secondary" onClick={() => setModalEmailChangeVisability(true)}>Change Email: { }</a>
                                    </div>
                                </div>
                                <div class="border-b border-primary-200 flex-col flex justify-between items-start w-3/4 pb-3 m-5 hover:scale-105 duration-300 cursor-pointer">
                                    <div class="w-full flex flex-col justify-start items-start space-y-2">
                                        <a class="text-sm font-semibold leading-2 text-primary-400 hover:text-secondary" onClick={() => setModalPasswordChangeVisability(true)}>Change password:</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <LogoutModal visible={modalLoginChangeVisability} setVisible={setModalLoginChangeVisability}>
                        <div className="space-y-4">
                            <div className="flex justify-center text-xl font-semibold whitespace-nowrap text-primary-300">Change login</div>
                            <form className="mt-6">
                                <input
                                    id="uname"
                                    name="uname"
                                    type="uname"
                                    autoComplete="uname"
                                    required
                                    value={newLogin}
                                    onChange={(e) => setNewLogn(e.target.value)}
                                    placeholder="New login*"
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                />
                            </form>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-10 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                    placeholder="Current password*"
                                />
                                <span
                                    className="absolute right-3 top-4 mt-1 cursor-pointer text-primary-400"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <i><FontAwesomeIcon icon={faEyeSlash} /></i> : <i><FontAwesomeIcon icon={faEye} /></i>}
                                </span>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-6/12 text-center bg-primary-200 rounded-lg px-4 py-2 mt-2 hover:bg-secondary duration-200 hover:text-primary-100"
                                    onClick={changeLogin}                        >
                                    Apply</button>
                            </div>
                        </div>
                    </LogoutModal>
                    <LogoutModal visible={modalEmailChangeVisability} setVisible={setModalEmailChangeVisability}>
                        <div className="space-y-4">
                            <div className="flex justify-center text-xl font-semibold whitespace-nowrap text-primary-300">Change email</div>
                            <form className="mt-6">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="New email*"
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                />
                            </form>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-10 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                    placeholder="Current password*"
                                />
                                <span
                                    className="absolute right-3 top-4 mt-1 cursor-pointer text-primary-400"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <i><FontAwesomeIcon icon={faEyeSlash} /></i> : <i><FontAwesomeIcon icon={faEye} /></i>}
                                </span>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-6/12 text-center bg-primary-200 rounded-lg px-4 py-2 mt-2 hover:bg-secondary duration-200 hover:text-primary-100"
                                    onClick={changeEmail}                        >
                                    Apply</button>
                            </div>
                        </div>
                    </LogoutModal>
                    <LogoutModal visible={modalPasswordChangeVisability} setVisible={setModalPasswordChangeVisability}>
                        <div className="space-y-4">
                            <div className="flex justify-center text-xl font-semibold whitespace-nowrap text-primary-300">Change password</div>
                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-10 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                    placeholder="Current password*"
                                />

                            </div>
                            <div className="relative">
                                <input
                                    id="newpassword"
                                    name="newpassword"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New password*"
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                />
                                <span
                                    className="absolute right-3 top-4 mt-1 cursor-pointer text-primary-400"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <i><FontAwesomeIcon icon={faEyeSlash} /></i> : <i><FontAwesomeIcon icon={faEye} /></i>}
                                </span>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    required
                                    value={repeatNewPassword}
                                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                                    placeholder="Repeat new password*"
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                />
                                <div className="flex justify-center">
                                    <button className="w-6/12 text-center bg-primary-200 rounded-lg px-4 py-2 mt-2 hover:bg-secondary duration-200 hover:text-primary-100"
                                        onClick={changePassword}                        >
                                        Apply</button>
                                </div>
                            </div>
                        </div>
                    </LogoutModal>
                </div>
            }
            </>

    
    );

};
export default SettingsPage;