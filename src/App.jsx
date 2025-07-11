import React from 'react';
import Navbar from './components/Navbar';
import ContactUsPage from './pages/feedback';
import OrderPage from './pages/order'
import ReservationPage from './pages/Reservation'
import HeroCarousel from './components/hero';
import Home from './pages/Home';
import { BrowserRouter , Routes, Route,} from 'react-router-dom';

import "./index.css"

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route index element={<Home/>}/>
    <Route path="/order" element ={<OrderPage/>}/>
    <Route path="/reservation" element={<ReservationPage/>}/>
    <Route path="/contact" element={<ContactUsPage/>}/>

   </Routes>
   </BrowserRouter>
   </>
   
  );
}

export default App;