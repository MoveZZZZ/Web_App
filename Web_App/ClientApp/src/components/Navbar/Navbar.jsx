import snoop from "../../assets/Snoopy.gif";
import snoop2 from "../../assets/snoopDogTr.gif";

const Navbar = () => {
    return (

        <nav className="p-4 shadow-lg p-6 bg-primary-100">
            <div className="container mx-auto">
                <div className="flex justify-between items-center ">
                    <a href="/" className="flex items-center opacity-100 ">
                        <img src={snoop2} className="h-12 mr-3" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">K*rwa</span>
                    </a>
                    <ul className="flex space-x-2">
                        <li>
                            <a href="/product" className="text-white hover:text-primary-300 ease-in-out hover:text-secondary">Product</a>
                        </li>
                        <li>
                            <a href="/login" className="text-white hover:text-primary-300 ease-in-out  hover:text-secondary">Sign In</a>
                        </li>
                        <li>
                            <a className="text-white">|</a>
                        </li>
                        <li>
                            <a href="/" className="text-white hover:text-primary-300 ease-in-out hover:text-secondary">Sign Up</a>
                        </li>
                    </ul>
                </div>

                </div>
        </nav>

    );
};

export default Navbar;