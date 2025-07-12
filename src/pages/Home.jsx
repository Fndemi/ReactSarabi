import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/hero";
import OurStory from "../components/story";
import Footer from "../components/footer";
import Chatbot from "../components/chatbot"; // Import the Chatbot component
import SignatureDishes from "../components/signature-dishes";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <OurStory onOpenChatbot={toggleChatbot} />{" "}
            <SignatureDishes/>

      {/* Pass the toggle function to OurStory */}
      <Footer />
      {/* Render the Chatbot component and pass the state and setter */}
      <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
    </>
  );
}
