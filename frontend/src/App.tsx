import React from "react";
import BooksPage from "./pages/BooksPage";
import AddBook from "./pages/AddBook";
import CartPage from "./pages/CartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";


const App: React.FC = () => {

   

    return (
    <>
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<BooksPage />} />
                    <Route path="/addBook/:title/:bookID/:price" element={<AddBook />} />
                    <Route path="/CartPage" element={<CartPage />} />
                </Routes>
            </Router>
        </CartProvider>
    </>
    );
};

export default App;


