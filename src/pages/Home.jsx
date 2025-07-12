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
      <Navbar /> {/* Your Navbar */}
      <HeroCarousel />
      <section id="our-story" className="py-16 bg-rose-100 dark:bg-[#4a3a3a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
          <OurStory onOpenChatbot={toggleChatbot} />
        </div>
      </section>

      <SignatureDishes/>

      <Footer /> 

      <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
    </>
  );
}
