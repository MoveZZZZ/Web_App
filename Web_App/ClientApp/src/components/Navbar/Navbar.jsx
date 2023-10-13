import snoop from "../../assets/Snoopy.gif";

const Navbar = () => {
    return (
        <nav className="p-4 shadow-xl p-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-extrabold text-4xl flex justify-between items-center gap-4">
                        {/**<img src="https://media3.giphy.com/media/wAxlCmeX1ri1y/giphy.gif?cid=ecf05e4706rq3jxzj6un1y0lvlq6v4hovuds1yve63a02b06&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="A dancing cat GIF" width="150" />*/}
                        <img src={snoop} width="100" className="border-2 border-primary-500"/>
                        <a href="/" className="hover:text-">Сzołgizda</a>
                    </div>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="text-white hover:text-primary-500 ease-in-out hover:border-b-4 hover:border-primary-500">Home</a>
                        </li>
                        <li>
                            
                        </li>
                        <li>
                            <a href="/contact" className="text-white hover:text-primary-500 ease-in-out hover:border-b-4 hover:border-primary-500">Contact</a>
                        </li>
                    </ul>
                    <div>
                        <a href="/login" className="rounded-md bg-primary-500 p-3 text-background-color hover:bg-primary-700 easy-in-out duration-100">Login</a>
                    </div>
                </div>
            </div>
                            
        </nav>
    );
};

export default Navbar;