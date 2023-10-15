// Login.js
import React, { useState } from 'react';
import { handleLoginError, login } from '../utils/userApi';

const LoginPage = () => {
    const [loginUser, setLoginUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        login(loginUser, passwordUser)
            .then((response) => {
                console.log('Login successful');
                console.log('Response:', response.data);
            })
            .catch((error) => {
                handleLoginError(error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-2">
                <div>
                    <h2 className="text-center text-4xl font-extrabold text-primary-700">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="login" className="sr-only" for="uName">uname</label>
                            <input
                                id="uname"
                                name="uname"
                                type="uname"
                                autoComplete="uname"
                                required
                                value={loginUser}
                                onChange={(e) => setLoginUser(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary-300 placeholder-primary-500 text-primary-500 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Username*"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={passwordUser}
                                onChange={(e) => setPasswordUser(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary-300 placeholder-primary-500 text-primary-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Password*"
                            />
                        </div>
                    </div>
                    <a class="text-primary-300 text-xs mt-10">*pola obowiązkowe
                    </a>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary-500 hover:text-secondary">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-400 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Log in
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;
