import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import ImageSlider from "./Components/ImageSlide/ImageSlide";
import Booking from "./Components/Booking/Booking";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Main />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
            <ImageSlider />
            <Booking />

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
