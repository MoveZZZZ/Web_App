import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage";


const App = () => {
    return (
        <>
        <Navbar/>
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<LoginPage />} path="/login" />
            </Routes>
            <Footer/>
        </>
    );
};

export default App;