import "./App.css";
import React from "react";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import ImageSlider from "./Components/ImageSlide/ImageSlide";
import Booking from "./Components/Booking/Booking";

function App() {
  return (
    <div className="App">
      <Main />
      <ImageSlider />
      <Booking />
      <Footer />
    </div>
  );
}

export default App;
