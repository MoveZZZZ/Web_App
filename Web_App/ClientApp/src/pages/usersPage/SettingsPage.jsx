import React, { useState, useContext, useEffect } from 'react';
import LogoutModal from "../../components/MyModal/LogOutModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { fetchGetUserDataProfile, fetchUpdatePhotoUser, fetchUpdateEmailUser, fetchUpdateLoginUser, fetchUpdatePasswordUser, fetchUpdateRemoveAccoutUser } from "../../utils/userApi"

import Spinner from '../../components/Spinner/Spinner';
import Message from "../../components/Message/Message";
import ErrorMessage from "../../components/Message/ErrorMessage";
import { logoutCookieCleanUp } from '../../utils/AuthenticationLogic';


const SettingsPage = () => {

    const allowedFileExtensions = ['jpg', 'jpeg', 'png'];

    const [modalLoginChangeVisability, setModalLoginChangeVisability] = useState(false)
    const [modalEmailChangeVisability, setModalEmailChangeVisability] = useState(false)
    const [modalPasswordChangeVisability, setModalPasswordChangeVisability] = useState(false)
    const [modalDeleteAccounteVisability, setModalDeleteAccountVisability] = useState(false)

    const [isLoading, setIsLoading] = useState(true);
    const userID = sessionStorage.getItem('ID');
    const [userProfile, setUserProfile] = useState([])
    const [showPassword, setShowPassword] = useState(false);

    const [isMessage, setIsMessage] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

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


    const getInitialFormDataChange = () => ({
        UserID: userID,
        UserName: "",
        Email: "",
        Password: "",
        NewPassword: "",
        RepeatNewPassword: "",
    });
    const [formDataChange, setFormDataChange] = useState(getInitialFormDataChange());

    const checkImageSize = () => {
        if (formData.Image && formData.Image.size > 5 * 1024 * 1024) {
            return false;
        }
        return true;
    }
    const checkImageFormat = () => {
        if (formData.Image) {
            const fileExtension = formData.Image.name.split('.').pop().toLowerCase();
            if (!allowedFileExtensions.includes(fileExtension)) {
                return false;
            }
        }
        return true;
    }

    const changeAvatar = async (e) => {
        if (formData.Image && checkImageSize() && checkImageFormat()) {
            const a = await fetchUpdatePhotoUser(formData);
            if (a.message === "Ok") {
                setFormData(getInitialFormData());
                uploadUserData();
                setMessage("You avatar successfully added!")
                getMessage();
            }
            else {
                setFormData(getInitialFormData());
                setMessage("Bad file format!");
                getErrorMessage();
            }
           
        }
        else if (!checkImageSize()) {
            formData.Image = null;
            setMessage("You image is too long!");
            getErrorMessage();
        }
        else if (!checkImageFormat())
        {
            formData.Image = null;
            setMessage("The image is in a bad format!");
            getErrorMessage();
        }
        else
        {
            setMessage("Choise avatar, please!")
            getErrorMessage();
        }

    };
    const handleInputChange = async (e) => {
        const { name, value, type } = e.target;
        setFormDataChange((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value,
        }));
    };
    const isSuccesChangeLogin = (message) => {
        if (message === "Login successfully changed") {
            setModalLoginChangeVisability(false);
            setMessage(message)
            getMessage();
            uploadUserData();
        }
        else {
            setResponseMessage(message);
        }
    }
    const changeLogin = async () => {
        if (formDataChange.UserID && formDataChange.UserName && formDataChange.Password) {
            const response = await fetchUpdateLoginUser(formDataChange);
            setFormDataChange(getInitialFormDataChange());
            isSuccesChangeLogin(response.message);
        }
        else
            setResponseMessage("Write data!");
    }
    const isSuccessChangeEmail = (message) => {
        if (message === "Email successfully changed") {
            setModalEmailChangeVisability(false);
            setMessage(message)
            getMessage();
            uploadUserData();
        }
        else {
            setResponseMessage(message);
        }
    }
    const changeEmail = async () => {
        if (formDataChange.UserID && formDataChange.Email && formDataChange.Password) {
            const response = await fetchUpdateEmailUser(formDataChange);
            setFormDataChange(getInitialFormDataChange());
            isSuccessChangeEmail(response.message);
        }
        else
            setResponseMessage("Write data!");
    }
    const isSuccessChangePassword = (message) => {
        if (message === "Your password successfully changed!") {
            setModalPasswordChangeVisability(false);
            setMessage(message)
            getMessage();
            uploadUserData();
        }
        else {
            setResponseMessage(message);
        }
    }
    const changePassword = async () => {

        if (formDataChange.UserID && formDataChange.Password && formDataChange.NewPassword && formDataChange.RepeatNewPassword) {
            const response = await fetchUpdatePasswordUser(formDataChange);
            setFormDataChange(getInitialFormDataChange());
            isSuccessChangePassword(response.message);
        }
        else
            setResponseMessage("Write data!");

    }
    const isSuccessDeleteAccount = (message) => {
        if (message === "Your account successfully removed!") {
            setModalDeleteAccountVisability(false);
            setMessage(message)
            getMessage();
            logoutCookieCleanUp();
            setTimeout(() =>
                window.open("/", "_self"), 4000)
        }
        else {
            setResponseMessage(message);
        }
    }
    const removeAccount = async () => {
        if (formDataChange.UserID && formDataChange.Password) {
            const response = await fetchUpdateRemoveAccoutUser(formDataChange);
            setFormDataChange(getInitialFormDataChange());
            isSuccessDeleteAccount(response.message);
        }
        else
            setResponseMessage("Write data!");
    }


    const uploadUserData = async () => {
        setIsLoading(true);
        fetchGetUserDataProfile(userID)
            .then((data) => {
                setUserProfile(data);
            })
            .catch(() => {
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
    const clearData = () => {
        setFormDataChange(getInitialFormDataChange());
        setShowPassword(false);
        setResponseMessage("");
    }

    useEffect(() => {
        clearData();
    }, [modalLoginChangeVisability]);

    useEffect(() => {
        clearData();
    }, [modalEmailChangeVisability]);

    useEffect(() => {
        clearData();
    }, [modalPasswordChangeVisability]);

    useEffect(() => {
        clearData();
    }, [modalDeleteAccounteVisability]);



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
                    <h1 className="text-2xl font-bold text-center hover:text-primary-300 ease-in-out duration-300 mt-20">Settings</h1>
                    <section className="border-primary-500  flex items-center justify-center ">
                        <div className="bg-primary-100 p-5 flex rounded-xl shadow-lg max-w-3xl m-20">
                            <div className="w-5/12">
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
                            <div className="w-1/2 ml-10">
                                <p className="text-primary-300 text-xl flex justify-center mb-10">Global info:</p>
                                <div className="border-b border-primary-200 flex-col flex justify-between items-start w-11/12 pb-3 m-5 hover:scale-105 duration-300 cursor-pointer ">
                                    <div className="w-full flex flex-col justify-start items-center space-y-2">
                                        <a className="text-sm font-semibold leading-2 text-primary-400 hover:text-secondary" onClick={() => setModalLoginChangeVisability(true)}>Change Login ({userProfile.login})</a>
                                    </div>
                                </div>
                                <div className="border-b border-primary-200 flex-col flex justify-between items-start w-11/12 pb-3 m-5 hover:scale-105 duration-300 cursor-pointer">
                                    <div className="w-full flex flex-col justify-start items-center space-y-2">
                                        <a className="text-sm font-semibold leading-2 text-primary-400 hover:text-secondary" onClick={() => setModalEmailChangeVisability(true)}>Change Email ({userProfile.mail})</a>
                                    </div>
                                </div>
                                <div className="border-b border-primary-200 flex-col flex justify-between items-start w-11/12 pb-3 m-5 hover:scale-105 duration-300 cursor-pointer">
                                    <div className="w-full flex flex-col justify-start items-center space-y-2">
                                        <a className="text-sm font-semibold leading-2 text-primary-400 hover:text-secondary" onClick={() => setModalPasswordChangeVisability(true)}>Change password</a>
                                    </div>
                                </div>
                                <div className="border-b border-primary-200 flex-col flex justify-between items-start w-11/12 pb-3 m-5 hover:scale-105 duration-300 cursor-pointer">
                                    <div className="w-full flex flex-col justify-start items-center space-y-2">
                                        <a className="text-sm font-semibold leading-2 text-primary-400 hover:text-secondary" onClick={() => setModalDeleteAccountVisability(true)}>Remove account</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <LogoutModal visible={modalLoginChangeVisability} setVisible={setModalLoginChangeVisability}>
                        <div className="space-y-2">
                            <div className="flex justify-center text-xl font-semibold whitespace-nowrap text-primary-300">Change login</div>
                            <form className="mt-6">
                                <input
                                    id="UserName"
                                    name="UserName"
                                    type="text"
                                    required
                                    value={formDataChange.UserName}
                                    onChange={handleInputChange}
                                    placeholder="New login*"
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                />
                            </form>
                            <div className="relative">
                                <input
                                    id="Password"
                                    name="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formDataChange.Password}
                                    onChange={handleInputChange}
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
                            <p className="flex justify-start text-sm text-red">{responseMessage}</p>
                            <div className="flex justify-center">
                                <button className="w-6/12 text-center bg-primary-200 rounded-lg px-4 py-2 hover:bg-secondary duration-200 hover:text-primary-100"
                                    onClick={changeLogin}                        >
                                    Apply</button>
                            </div>
                        </div>
                    </LogoutModal>
                    <LogoutModal visible={modalEmailChangeVisability} setVisible={setModalEmailChangeVisability}>
                        <div className="space-y-2">
                            <div className="flex justify-center text-xl font-semibold whitespace-nowrap text-primary-300">Change email</div>
                            <form className="mt-6">
                                <input
                                    id="Email"
                                    name="Email"
                                    type="email"
                                    required
                                    onChange={handleInputChange}
                                    value={formDataChange.Email}
                                    placeholder="New email*"
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                />
                            </form>
                            <div className="relative">
                                <input
                                    id="Password"
                                    name="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formDataChange.Password}
                                    onChange={handleInputChange}
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
                            <p className="flex justify-start text-sm text-red">{responseMessage}</p>
                            <div className="flex justify-center">
                                <button className="w-6/12 text-center bg-primary-200 rounded-lg px-4 py-2 mt-2 hover:bg-secondary duration-200 hover:text-primary-100"
                                    onClick={changeEmail}                        >
                                    Apply</button>
                            </div>
                        </div>
                    </LogoutModal>
                    <LogoutModal visible={modalPasswordChangeVisability} setVisible={setModalPasswordChangeVisability}>
                        <div className="space-y-2">
                            <div className="flex justify-center text-xl font-semibold whitespace-nowrap text-primary-300">Change password</div>
                            <div>
                                <input
                                    type="password"
                                    id="Password"
                                    name="Password"
                                    required
                                    onChange={handleInputChange}
                                    value={formDataChange.Password}
                                    className="w-full px-4 py-3 pr-10 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                    placeholder="Current password*"
                                />

                            </div>
                            <div className="relative">
                                <input
                                    id="NewPassword"
                                    name="NewPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onChange={handleInputChange}
                                    value={formDataChange.NewPassword}
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
                                    id="RepeatNewPassword"
                                    name="RepeatNewPassword"
                                    type="password"
                                    required
                                    onChange={handleInputChange}
                                    value={formDataChange.RepeatNewPassword}
                                    placeholder="Repeat new password*"
                                    className="w-full px-4 py-3 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                />
                                <p className="flex justify-start text-sm text-red">{responseMessage}</p>
                                <div className="flex justify-center">
                                    <button className="w-6/12 text-center bg-primary-200 rounded-lg px-4 py-2 mt-2 hover:bg-secondary duration-200 hover:text-primary-100"
                                        onClick={changePassword}                        >
                                        Apply</button>
                                </div>
                            </div>
                        </div>
                    </LogoutModal>
                    <LogoutModal visible={modalDeleteAccounteVisability} setVisible={setModalDeleteAccountVisability}>
                        <div className="space-y-2">
                            <div className="flex justify-center text-xl font-semibold whitespace-nowrap text-primary-300">Delete account</div>
                            <div>
                                <input
                                    type="password"
                                    id="Password"
                                    name="Password"
                                    required
                                    onChange={handleInputChange}
                                    value={formDataChange.Password}
                                    className="w-full px-4 py-3 pr-10 rounded-lg bg-primary-100 mt-2 border focus:border-secondary focus:bg-primary-100 focus:outline-none hover:scale-105 duration-200"
                                    placeholder="Current password*"
                                />

                            </div>
                            <p className="flex justify-start text-sm text-red">{responseMessage}</p>
                            <div className="flex justify-center">
                                <button className="w-6/12 text-center bg-primary-200 rounded-lg px-4 py-2 mt-2 hover:bg-secondary duration-200 hover:text-primary-100"
                                    onClick={removeAccount}                        >
                                    Apply</button>
                            </div>
                        </div>
                    </LogoutModal>

                </div>
            }
        </>


    );

};
export default SettingsPage;