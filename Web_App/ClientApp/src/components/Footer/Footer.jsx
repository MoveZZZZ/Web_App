import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
    return (
        <footer className="relative bg-primary-200 pt-8 pb-6 shadow-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-center lg:text-center">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl fonat-semibold text-primary-500">Let's keep in touch!</h4>
                        <div className="mt-6 lg:mb-0 mb-6">
                            <a href="https://www.facebook.com"><button className="bg-white text-primary-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:text-secondary" type="button">
                                <i><FontAwesomeIcon icon={faFacebook} /></i></button></a>
                            <a href="https://www.twitter.com"><button className="bg-white text-primary-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:text-secondary" type="button">
                                <i><FontAwesomeIcon icon={faTwitter} /></i></button></a>
                            <a href="https://www.github.com"><button herf="google.com" className="bg-white text-primary-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:text-secondary" type="button">
                                <i><FontAwesomeIcon icon={faGithub} /></i></button></a>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4 text-right lg:text-right">
                        <div className="flex flex-wrap items-top mb-6 ">
                            <div className="w-full lg:w-6/12 px-4">
                                <span className="block uppercase text-primary-500 text-sm font-semibold mb-2 content-right">Other Resources</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="text-primary-500 hover:hover:text-secondary font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">Terms &amp; Conditions</a>
                                    </li>
                                    <li>
                                        <a className="text-primary-500 hover:hover:text-secondary font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a className="text-primary-500 hover:hover:text-secondary font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;