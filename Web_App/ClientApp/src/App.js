import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import  ShoppingCartPage from "./pages/ShoppingCartPage";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={< ProductPage />} path="/product" />
                <Route element={<ProductDetail />} path="/product/:id" />
                <Route element={<ShoppingCartPage />} path="/cart" />
            </Routes>
            <Footer />
        </>
    );
};

export default App;