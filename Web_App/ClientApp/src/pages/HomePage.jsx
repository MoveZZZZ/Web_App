import { AuthContext, UserIDContext, UserTokenContext, UserRefreshTokenContext, } from "../context";
import React, { useState, useContext, useEffect } from 'react';

import shopPhoto from "../assets/guns-shop.jpeg"
import { refreshTokens, } from '../utils/AuthorizationApi';



const HomePage = () => {

    return (
        <>
            <div class="mt-16 w-full">
                <h1 className="text-5xl font-bold text-center hover:text-primary-300 ease-in-out duration-300 max-2xl:text-3xl">K*rwa Shop Top Zajebis</h1>
                <div class="container mx-auto w-2/3 gap-14 px-3 flex items-center mt-10 max-xl:flex-col">
                    <div class="flex flex-col w-1/2 max-xl:w-full justify-center items-start text-center md:text-left hover:scale-105 ease-in-out duration-300">
                        <p class="uppercase text-2xl max-2xl:text-lg text-center tracking-loose w-full ease-in-out duration-300">Unleash Your Inner Hero with Confidence at K*rwa!</p>
                        <h1 class="my-4 text-xl max-2xl:text-base font-bold text-center leading-tight ease-in-out duration-300">
                            At K*rwa, we're not just in the business of selling firearms – we're in the business of empowering heroes. Our commitment to safety, expertise, and unwavering integrity sets us apart as the ultimate destination for all your firearm needs. With our fully licensed and dedicated team, we're your trusted partner in self-defense, sport shooting, and safeguarding what matters most.
                        </h1>
                    </div>
                    <div class="w-1/2 max-xl:w-full flex justify-center text-center">
                        <img class="w-full max-xl:w-2/3 max-lg:w-full rounded-lg z-50 hover:scale-105 ease-in-out duration-300" src={shopPhoto} />
                    </div>
                </div>
            </div>
            <div class="w-2/3 mx-auto mt-16">
                <h2 class="w-full text-5xl max-2xl:text-3xl font-bold leading-tight text-center text-primary-300 hover:text-black ease-in-out duration-300">
                    Why Choose K*rwa?
                </h2>
                <div class="flex items-center max-xl:text-center max-xl:flex-col w-full gap-14 mt-10">
                    <div class="w-1/2 max-xl:w-full flex flex-col gap-6">
                        <div className="hover:scale-105 ease-in-out duration-300">
                            <h3 class="text-3xl max-2xl:text-xl w-full text-primary-300 font-bold ease-in-out duration-300">
                                Licensed Excellence
                            </h3>
                            <p class="text-primary-500 mt-4 max-2xl:text-base ease-in-out duration-300">
                                Your peace of mind begins with us. Our federal and state licenses ensure that every transaction is legal, secure, and worry-free.
                            </p>
                        </div>
                        <div className="hover:scale-105 ease-in-out duration-300">
                            <h3 class="text-3xl max-2xl:text-xl text-primary-300 font-bold ease-in-out duration-300">
                                Expert Guidance
                            </h3>
                            <p class="text-primary-500 mt-4 max-2xl:text-base ease-in-out duration-300">
                                Whether you're a seasoned marksman or a first-time gun owner, our knowledgeable team is here to provide you with personalized advice and support to help you make the right choice.
                            </p>
                        </div>
                    </div>
                    <div class="w-1/2 max-xl:w-full flex justify-center text-center">
                        <img class="w-full max-xl:w-2/3 max-lg:w-full rounded-lg z-50 hover:scale-105 ease-in-out duration-300" src={shopPhoto} />
                    </div>
                </div>
                <div class="flex items-center max-xl:flex-col max-xl:text-center w-full gap-14 mt-16">
                    <div class="w-1/2 max-xl:w-2/3 max-lg:w-full flex justify-center text-center">
                        <img class="w-full rounded-lg  z-50 hover:scale-105 ease-in-out duration-300" src={shopPhoto} />
                    </div>
                    <div class="w-1/2 max-xl:w-full flex flex-col gap-6">
                        <div className="hover:scale-105 ease-in-out duration-300">
                            <h3 class="text-3xl max-2xl:text-xl w-full text-primary-300 font-bold ease-in-out duration-300">
                                Wide Selection
                            </h3>
                            <p class="text-primary-500 mt-4 max-2xl:text-base ease-in-out duration-300">
                                Discover a vast array of firearms, accessories, and ammunition, all carefully selected to meet the highest standards of quality and performance.
                            </p>
                        </div>
                        <div className="hover:scale-105 ease-in-out duration-300">
                            <h3 class="text-3xl max-2xl:text-xl text-primary-300 font-bold ease-in-out duration-300">
                                Safety First
                            </h3>
                            <p class="text-primary-500 mt-4 max-2xl:text-base ease-in-out duration-300">
                                We prioritize responsible firearm ownership and offer educational resources to ensure you're well-prepared to handle your firearms safely.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <section class="bg-primary-200 py-8 mt-16">
                <div class="container mx-auto px-2 pt-4 pb-12 text-primary-500">
                    <h2 class="w-full my-2 text-5xl max-2xl:text-3xl font-bold leading-tight text-center text-primary-400 hover:text-black ease-in-out duration-300">
                        Most Popular
                    </h2>
                    <div class="flex max-lg:flex-col justify-center my-10">
                        <div class="flex flex-col w-1/4 max-lg:w-5/6 mt-4 max-md:mt-0 mx-0 max-lg:mx-auto bg-white ease-in-out duration-300">
                            <div class="flex-1 bg-primary-100 text-primary-400 rounded-lg overflow-hidden shadow-xl max-lg:mb-10 max-lg:scale-100 max-lg:hover:scale-105 scale-105 hover:scale-110 ease-in-out duration-300">
                                <div class="p-8 text-3xl max-2xl:text-xl font-bold text-center ease-in-out duration-300">
                                    AK-58
                                </div>
                                <img src={shopPhoto} className="w-full h-full rounded-lg"></img>
                            </div>
                        </div>
                        <div class="flex flex-col w-1/3 max-lg:w-5/6 -mt-6 mx-0 max-lg:mx-auto mt-4 max-sm:-mt-6 shadow-lg z-10 ease-in-out duration-300">
                            <div class="flex-1 bg-primary-100 rounded-lg overflow-hidden shadow-xl hover:scale-105 ease-in-out duration-300">
                                <div class="w-full p-8 text-3xl max-2xl:text-xl font-bold text-center ease-in-out duration-300">
                                    AK-1777
                                </div>
                                <img src={shopPhoto} className="w-full h-full rounded-lg"></img>
                            </div>
                        </div>
                        <div class="flex flex-col w-1/4 max-lg:w-5/6 mt-4 max-md:mt-6 mx-0 max-lg:mx-auto bg-white ease-in-out duration-300">
                            <div class="flex-1 bg-primary-100 text-primary-400 rounded-lg overflow-hidden shadow-xl max-lg:scale-100 max-lg:hover:scale-105 scale-105 hover:scale-110 ease-in-out duration-300">
                                <div class="p-8 text-3xl max-2xl:text-xl font-bold text-center ease-in-out duration-300">
                                    AK-47
                                </div>
                                <img src={shopPhoto} className="w-full h-full rounded-lg"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container w-2/3 flex mx-auto items-center justify-center flex-wrap pt-4 pb-12 gap-6 mt-16">
                <h2 class="w-full my-2 text-5xl max-2xl:text-3xl font-bold leading-tight text-center text-gray-800 hover:text-primary-300 ease-in-out duration-300">
                    Mission
                </h2>
                <p className="text-center hover:scale-105 ease-in-out duration-300">
                    Our mission is not just to sell you a firearm; it's to equip you with the tools, knowledge, and confidence to protect your loved ones, embrace your passions, and stand as the hero you were born to be.
                </p>
            </div>
            <div className="w-2/3 border-solid border-black border-2 mx-auto my-16"></div>
            <div class="container w-2/3 flex mx-auto items-center justify-center flex-wrap pt-4 pb-12 gap-6 mt-16">
                <h2 class="w-full my-2 text-5xl max-2xl:text-3xl font-bold leading-tight text-center text-gray-800 hover:text-primary-300 ease-in-out duration-300">
                    Call to Action
                </h2>
                <p className="text-center hover:scale-105 ease-in-out duration-300">
                    PIZDAPIZDAPIZDAPIZDAPIZDAPIZDAPIZDAPIZDAPIZDA
                </p>
            </div>
        </>
    );
};

export default HomePage;