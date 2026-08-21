import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./views/About/About";
import Wishlist from "./views/Wishlist/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;