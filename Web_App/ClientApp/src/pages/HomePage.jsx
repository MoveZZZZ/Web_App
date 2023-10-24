import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "../context";
import React, { useState, useContext, useEffect } from 'react';

import shopPhoto from "../assets/guns-shop.jpeg"
import { refreshTokens, } from '../utils/AuthorizationApi';



const HomePage = () => {
    
    return (
        <>
            <div class="mt-16 w-full">
                <h1 className="text-5xl font-bold text-center">K*rwa Shop Top Zajebis</h1>
                <div class="container mx-auto w-2/3 gap-10 px-3 flex flex-col md:flex-row items-center mt-10">
                    <div class="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left hover:scale-105 ease-in-out duration-300">
                        <p class="uppercase text-2xl text-center tracking-loose w-full">Unleash Your Inner Hero with Confidence at K*rwa!</p>
                        <h1 class="my-4 text-xl font-bold text-center leading-tight">
                            At K*rwa, we're not just in the business of selling firearms – we're in the business of empowering heroes. Our commitment to safety, expertise, and unwavering integrity sets us apart as the ultimate destination for all your firearm needs. With our fully licensed and dedicated team, we're your trusted partner in self-defense, sport shooting, and safeguarding what matters most.
                        </h1>
                    </div>
                    <div class="w-full md:w-1/2 text-center">
                        <img class="w-full rounded-lg md:w-full z-50 m-5 hover:scale-105 ease-in-out duration-300" src={shopPhoto} />
                    </div>
                </div>
            </div>
            <div class="w-2/3 mx-auto mt-16">
                <h2 class="w-full text-5xl font-bold leading-tight text-center text-primary-300">
                    Why Choose K*rwa?
                </h2>
                <div class="flex items-center w-full px-3 gap-10 mt-10">
                    <div class="w-1/2 flex flex-col gap-6">
                        <div className="hover:scale-105 ease-in-out duration-300">
                            <h3 class="text-3xl w-full text-primary-300 font-bold">
                                Licensed Excellence
                            </h3>
                            <p class="text-primary-500 mt-4">
                                Your peace of mind begins with us. Our federal and state licenses ensure that every transaction is legal, secure, and worry-free.
                            </p>
                        </div>
                        <div className="hover:scale-105 ease-in-out duration-300">
                            <h3 class="text-3xl text-primary-300 font-bold">
                                Expert Guidance
                            </h3>
                            <p class="text-primary-500 mt-4">
                                Whether you're a seasoned marksman or a first-time gun owner, our knowledgeable team is here to provide you with personalized advice and support to help you make the right choice.
                            </p>
                        </div>
                    </div>
                    <div class="w-1/2 md:w-1/2 text-center">
                        <img class="w-full rounded-lg md:w-full z-50 m-5 hover:scale-105 ease-in-out duration-300" src={shopPhoto} />
                    </div>
                </div>
                <div class="flex items-center w-full px-3 gap-10 mt-10">
                    <div class="w-full md:w-1/2 text-center">
                        <img class="w-full rounded-lg md:w-full z-50 hover:scale-105 ease-in-out duration-300" src={shopPhoto} />
                    </div>
                    <div class="w-1/2 flex flex-col gap-6">
                        <div className="hover:scale-105 ease-in-out duration-300">
                            <h3 class="text-3xl w-full text-primary-300 font-bold">
                                Wide Selection
                            </h3>
                            <p class="text-primary-500 mt-4">
                                Discover a vast array of firearms, accessories, and ammunition, all carefully selected to meet the highest standards of quality and performance.
                            </p>
                        </div>
                        <div className="hover:scale-105 ease-in-out duration-300">
                            <h3 class="text-3xl text-primary-300 font-bold">
                                Safety First
                            </h3>
                            <p class="text-primary-500 mt-4">
                                We prioritize responsible firearm ownership and offer educational resources to ensure you're well-prepared to handle your firearms safely.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <section class="bg-primary-200 py-8 mt-16">
                <div class="container mx-auto px-2 pt-4 pb-12 text-primary-500">
                    <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-primary-400">
                        Most Popular
                    </h2>
                    <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
                        <div class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
                            <div class="flex-1 bg-primary-100 text-primary-400 rounded-t rounded-b-none overflow-hidden shadow">
                                <div class="p-8 text-3xl font-bold text-center border-b-4">
                                    AK-58
                                </div>
                                <img src={shopPhoto} className="w-full"></img>
                            </div>
                        </div>
                        <div class="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-primary-100 mt-4 sm:-mt-6 shadow-lg z-10">
                            <div class="flex-1 bg-primary-100 rounded-t rounded-b-none overflow-hidden shadow">
                                <div class="w-full p-8 text-3xl font-bold text-center">AK-1777</div>
                                <img src={shopPhoto} className="w-full"></img>
                            </div>
                        </div>
                        <div class="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
                            <div class="flex-1 bg-primary-100 text-primary-400 rounded-t rounded-b-none overflow-hidden shadow">
                                <div class="p-8 text-3xl font-bold text-center border-b-4">
                                    AK-47
                                </div>
                                <img src={shopPhoto} className="w-full"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="bg-white border-b py-8">
                <div class="container mx-auto flex flex-wrap pt-4 pb-12">
                    <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Mission
                    </h2>
                    <p>
                        Our mission is not just to sell you a firearm; it's to equip you with the tools, knowledge, and confidence to protect your loved ones, embrace your passions, and stand as the hero you were born to be.
                    </p>
                </div>
            </section>
            <section class="container mx-auto text-center py-6 mb-12">
                <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
                    Call to Action
                </h2>
                <div class="w-full mb-4">
                    <div class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
                </div>

                <h3 class="my-4 text-3xl leading-tight">
                    PIZDAPIZDAPIZDAPIZDAPIZDAPIZDAPIZDAPIZDAPIZDA
                </h3>
            </section>
        </>
    );
};

export default HomePage;