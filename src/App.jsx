import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your page components
import Home from "./pages/Home";
import ContactUsPage from "./pages/feedback";
import OrderPage from "./pages/order";
import ReservationPage from "./pages/Reservation";

import Appetizers from "./pages/Menu/Appetizers";
import Desserts from "./pages/Menu/Desserts";
import Mains from "./pages/Menu/Mains";
import MainDishes from "./components/main-dishes";
import MenuLayout from "./pages/Menu/MenuLayout"; 

import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route index element={<Home />} /> {/* Home page */}
          <Route path="/order" element={<OrderPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          
          <Route path="/appetizers" element={<Appetizers />} />
          <Route path="/Desserts" element={<Desserts />} />
          <Route path="/mains" element={<Mains />} />
          <Route path="/menu" element={<MainDishes />} />
          <Route path="/layout" element={<MenuLayout/>}/> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
