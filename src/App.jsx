import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your page components
import Home from "./pages/Home";
import ContactUsPage from "./pages/feedback";
import OrderPage from "./pages/order";
import ReservationPage from "./pages/Reservation";
// REMOVED: OurStory is now integrated into Home.jsx, so no standalone route here.
// import OurStory from "./components/story";

// Import your menu-related components (keeping them as they were in your provided App.jsx)
import Appetizers from "./pages/Menu/Appetizers";
import Desserts from "./pages/Menu/Desserts";
import Mains from "./pages/Menu/Mains";
import MainDishes from "./components/main-dishes";
import MenuLayout from "./pages/Menu/MenuLayout"; // Keep this import as it was

import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main application routes */}
          <Route index element={<Home />} /> {/* Home page */}
          <Route path="/order" element={<OrderPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          {/* REMOVED: The dedicated route for OurStory.
              OurStory will now be a section within the Home page. */}
          {/* <Route path="/our-story" element={<OurStory />} /> */}

          {/* Keep your existing menu routes as they were in your provided App.jsx */}
          <Route path="/appetizers" element={<Appetizers />} />
          <Route path="/Desserts" element={<Desserts />} />
          <Route path="/mains" element={<Mains />} />
          <Route path="/menu" element={<MainDishes />} />
          <Route path="/layout" element={<MenuLayout/>}/> {/* Keep this as it was */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
