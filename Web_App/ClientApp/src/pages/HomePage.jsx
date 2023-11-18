import React, { useState, useContext, useEffect } from 'react';
import { fetchGetTop3Products } from "../utils/productApi"
import shopPhoto from "../assets/guns-shop.jpeg"
import shopPhoto1 from "../assets/guns_1.jpg"
import shopPhoto2 from "../assets/guns_2.jpg"
import Spinner from '../components/Spinner/Spinner';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [topProducst, setTopProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetViewDB = () => {
        setIsLoading(true);
        fetchGetTop3Products()
            .then((data) => {
                setTopProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    }
    useEffect(() => {
        handleGetViewDB();
    }, []);
    return (

        <>
            {isLoading ? (<div className="flex text-center items-center justify-center w-full h-96">
                < Spinner />
            </div >) : (
                <>
                    <div className="mt-16 w-full">
                            <h1 className="text-5xl font-bold text-center hover:text-primary-300 ease-in-out duration-300 cursor-default max-2xl:text-3xl">BigGuns Shop Top</h1>
                        <div className="container mx-auto w-2/3 gap-14 px-3 flex items-center mt-10 max-xl:flex-col">
                            <div className="flex flex-col w-1/2 max-xl:w-full justify-center items-start text-center md:text-left hover:scale-105 ease-in-out duration-300 cursor-default">
                                <p className="uppercase text-2xl max-2xl:text-lg text-center tracking-loose w-full ease-in-out duration-300">Unleash Your Inner Hero with Confidence at BigGuns!</p>
                                <h1 className="my-4 text-xl max-2xl:text-base font-bold text-center leading-tight ease-in-out duration-300">
                                    At BigGuns, we're not just in the business of selling firearms – we're in the business of empowering heroes. Our commitment to safety, expertise, and unwavering integrity sets us apart as the ultimate destination for all your firearm needs. With our fully licensed and dedicated team, we're your trusted partner in self-defense, sport shooting, and safeguarding what matters most.
                                </h1>
                            </div>
                            <div className="w-1/2 max-xl:w-full flex justify-center text-center">
                                <img className="w-full max-xl:w-2/3 max-lg:w-full rounded-lg z-50 hover:scale-105 ease-in-out duration-300" src={shopPhoto} />
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 mx-auto mt-16">
                        <h2 className="w-full text-5xl max-2xl:text-3xl font-bold leading-tight text-center text-primary-300 hover:text-black ease-in-out duration-300 cursor-default">
                            Why Choose BigGuns?
                        </h2>
                        <div className="flex items-center max-xl:text-center max-xl:flex-col w-full gap-14 mt-10">
                            <div className="w-1/2 max-xl:w-full flex flex-col gap-6">
                                <div className="hover:scale-105 ease-in-out duration-300">
                                    <h3 className="text-3xl max-2xl:text-xl w-full text-primary-300 font-bold ease-in-out duration-300 cursor-default">
                                        Licensed Excellence
                                    </h3>
                                    <p className="text-primary-500 mt-4 max-2xl:text-base ease-in-out duration-300 cursor-default">
                                        Your peace of mind begins with us. Our federal and state licenses ensure that every transaction is legal, secure, and worry-free.
                                    </p>
                                </div>
                                <div className="hover:scale-105 ease-in-out duration-300">
                                    <h3 className="text-3xl max-2xl:text-xl text-primary-300 font-bold ease-in-out duration-300 cursor-default">
                                        Expert Guidance
                                    </h3>
                                    <p className="text-primary-500 mt-4 max-2xl:text-base ease-in-out duration-300 cursor-default">
                                        Whether you're a seasoned marksman or a first-time gun owner, our knowledgeable team is here to provide you with personalized advice and support to help you make the right choice.
                                    </p>
                                </div>
                            </div>
                                <div className="w-1/2 max-xl:w-full flex justify-center text-center">
                                    <img className="w-full max-xl:w-2/3 max-lg:w-full rounded-lg z-50 hover:scale-105 ease-in-out duration-300" src={shopPhoto1} />
                            </div>
                        </div>
                        <div className="flex items-center max-xl:flex-col max-xl:text-center w-full gap-14 mt-16">
                            <div className="w-1/2 max-xl:w-2/3 max-lg:w-full flex justify-center text-center">
                                <img className="w-full rounded-lg  z-50 hover:scale-105 ease-in-out duration-300" src={shopPhoto2} />
                            </div>
                            <div className="w-1/2 max-xl:w-full flex flex-col gap-6">
                                <div className="hover:scale-105 ease-in-out duration-300">
                                    <h3 className="text-3xl max-2xl:text-xl w-full text-primary-300 font-bold ease-in-out duration-300 cursor-default">
                                        Wide Selection
                                    </h3>
                                    <p className="text-primary-500 mt-4 max-2xl:text-base ease-in-out duration-300 cursor-default">
                                        Discover a vast array of firearms, accessories, and ammunition, all carefully selected to meet the highest standards of quality and performance.
                                    </p>
                                </div>
                                <div className="hover:scale-105 ease-in-out duration-300">
                                    <h3 className="text-3xl max-2xl:text-xl text-primary-300 font-bold ease-in-out duration-300 cursor-default">
                                        Safety First
                                    </h3>
                                    <p className="text-primary-500 mt-4 max-2xl:text-base ease-in-out duration-300 cursor-default">
                                        We prioritize responsible firearm ownership and offer educational resources to ensure you're well-prepared to handle your firearms safely.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="bg-primary-200 py-8 mt-16">
                        <div className="container mx-auto px-2 pt-4 pb-12 text-primary-500">
                            <h2 className="w-full my-2 text-5xl max-2xl:text-3xl font-bold leading-tight text-center text-primary-400 hover:text-black ease-in-out duration-300 cursor-default">
                                Most Popular
                            </h2>
                            <div className="flex max-lg:flex-col justify-center my-10">
                                    <div className="flex flex-col w-1/4 h-96 max-lg:w-5/6 mt-4 max-md:mt-0 mx-0 max-lg:mx-auto bg-white ease-in-out duration-300 cursor-default">
                                    <div className="flex-1 bg-primary-100 text-primary-400 rounded-lg overflow-hidden shadow-xl max-lg:mb-10 max-lg:scale-100 max-lg:hover:scale-105 scale-105 hover:scale-110 ease-in-out duration-300">
                                        <Link to={`/product/${topProducst[1].id}`}>
                                            <div className="p-8 text-3xl max-2xl:text-xl font-bold text-center ease-in-out duration-300 cursor-default">
                                                {topProducst[1].name}
                                            </div>
                                                <img src={`data:image/jpeg;base64,${topProducst[1].imageUrl.toString('base64')}`} className="w-full h-80 rounded-lg"></img>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex flex-col w-1/3 h-fit max-lg:w-5/6 -mt-7 mx-0 max-lg:mx-auto mt-4 max-sm:-mt-6 shadow-lg z-10 ease-in-out duration-300 cursor-default">
                                        <div className="flex-1 bg-primary-100 rounded-lg overflow-hidden shadow-xl hover:scale-105 ease-in-out duration-300 cursor-default">
                                            <Link to={`/product/${topProducst[0].id}`} className="h-full">
                                            <div className="w-full p-8 text-3xl max-2xl:text-xl font-bold text-center ease-in-out duration-300 cursor-default">
                                                {topProducst[0].name}
                                            </div>
                                                <img src={`data:image/jpeg;base64,${topProducst[0].imageUrl.toString('base64')}`} className="w-full h-80 bg-cover rounded-lg p-0"></img>
                                        </Link>
                                    </div>
                                </div>
                                    <div className="flex flex-col w-1/4 h-96 max-lg:w-5/6 mt-4 max-md:mt-6 mx-0 max-lg:mx-auto bg-white ease-in-out duration-300 cursor-default">
                                    <div className="flex-1 bg-primary-100 text-primary-400 rounded-lg overflow-hidden shadow-xl max-lg:scale-100 max-lg:hover:scale-105 scale-105 hover:scale-110 ease-in-out duration-300 cursor-default">
                                        <Link to={`/product/${topProducst[2].id}`}>
                                            <div className="p-8 text-3xl max-2xl:text-xl font-bold text-center ease-in-out duration-300 cursor-default">
                                                {topProducst[2].name}
                                            </div>
                                                <img src={`data:image/jpeg;base64,${topProducst[2].imageUrl.toString('base64')}`} className="w-full h-80 rounded-lg"></img>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="container w-2/3 flex mx-auto items-center justify-center flex-wrap pt-4 pb-12 gap-6 mt-16">
                        <h2 className="w-full my-2 text-5xl max-2xl:text-3xl font-bold leading-tight text-center text-gray-800 hover:text-primary-300 ease-in-out duration-300 cursor-default">
                            Mission
                        </h2>
                        <p className="text-center hover:scale-105 ease-in-out duration-300 cursor-default">
                            Our mission is not just to sell you a firearm; it's to equip you with the tools, knowledge, and confidence to protect your loved ones, embrace your passions, and stand as the hero you were born to be.
                        </p>
                    </div>
                    <div className="w-2/3 border-solid border-black border-2 mx-auto my-16"></div>
                    <div className="container w-2/3 flex mx-auto items-center justify-center flex-wrap pt-4 pb-12 gap-6 mt-16">
                        <h2 className="w-full my-2 text-5xl max-2xl:text-3xl font-bold leading-tight text-center text-gray-800 hover:text-primary-300 ease-in-out duration-300 cursor-default">
                            Call to Action
                        </h2>
                        <p className="text-center hover:scale-105 ease-in-out duration-300 cursor-default">
                            
                        </p>
                    </div>
                </>)}
        </>
    );
};

export default HomePage;