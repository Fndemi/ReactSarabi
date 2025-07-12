import React, { useState } from "react";
import Navbar from "../components/Navbar"; // Navbar is rendered here in your current setup
import HeroCarousel from "../components/hero";
import OurStory from "../components/story"; // Import the OurStory component
import Footer from "../components/footer"; // Footer is rendered here in your current setup
import Chatbot from "../components/chatbot";
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
      <section id="our-story" >
        <div>
         
          <OurStory onOpenChatbot={toggleChatbot} />
        </div>
      </section>

      <SignatureDishes/>

      <Footer /> 

      <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
    </>
  );
}
