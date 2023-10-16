import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={<SignUpPage />} path="/signup" />
                <Route element={< ProductPage />} path="/product" />
                <Route element={<ProductDetail />} path="/product/:id" />
            </Routes>
            <Footer />
        </>
    );
};

export default App;