import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/hero";
import OurStory from "../components/story";
import Footer from "../components/footer";
import SignatureDishes from "../components/signature-dishes";
import Chatbot from "../components/chatbot"; // Import the Chatbot component

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      <Navbar />
      <HeroCarousel />
      <OurStory onOpenChatbot={toggleChatbot} /> <SignatureDishes />
      {/* Render the Footer component */}
      {/* Pass the toggle function to OurStory */}
      <Footer />
      {/* Render the Chatbot component and pass the state and setter */}
      <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
    </>
  );
}
