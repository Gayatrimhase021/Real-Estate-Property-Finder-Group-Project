import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./views/About/About";
import Wishlist from "./views/Wishlist/Wishlist";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFound from "./views/notfound/Notfound";
import Home from "./views/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;