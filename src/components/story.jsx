import React from 'react';
import storyImage from '../assets/images/story.png'; // Assuming your story.png is in assets/images

const OurStory = ({ onOpenChatbot }) => { // Destructure onOpenChatbot from props 
  return (
    <section id="our-story" className="py-12 md:py-16 relative bg-[#F8F1F1] ">
      <article className="max-w-6xl mx-auto px-6 relative">

        {/* Chat Button with SVG icon */}
        <button
          onClick={onOpenChatbot} // Call the passed function
          className="absolute top-6 right-6 md:top-6 md:right-6 transition-transform hover:scale-105 z-10"
          aria-label="Open chatbot"
        >
          <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.5003 0.25C35.7105 0.25 37.8301 1.12797 39.3929 2.69078C40.9557 4.25358 41.8337 6.3732 41.8337 8.58333V25.25C41.8337 27.4601 40.9557 29.5798 39.3929 31.1426C37.8301 32.7054 35.7105 33.5833 33.5003 33.5833H23.6587L13.7378 39.5354C13.4391 39.7147 13.1001 39.8162 12.7519 39.8306C12.4038 39.845 12.0576 39.7719 11.745 39.6179C11.4325 39.4639 11.1635 39.2339 10.9628 38.9491C10.7621 38.6643 10.636 38.3337 10.5962 37.9875L10.5837 37.75V33.5833H8.50033C6.36232 33.5833 4.3061 32.7616 2.75697 31.2881C1.20784 29.8146 0.284309 27.802 0.177409 25.6667L0.166992 25.25V8.58333C0.166992 6.3732 1.04497 4.25358 2.60777 2.69078C4.17057 1.12797 6.29019 0.25 8.50033 0.25H33.5003ZM27.667 19.5958C27.2725 19.2091 26.7405 18.9949 26.188 19.0004C25.6356 19.0059 25.108 19.2305 24.7212 19.625C24.2362 20.1201 23.6573 20.5135 23.0184 20.782C22.3795 21.0505 21.6934 21.1889 21.0003 21.1889C20.3073 21.1889 19.6212 21.0505 18.9823 20.782C18.3433 20.5135 17.7645 20.1201 17.2795 19.625C16.8907 19.2396 16.366 19.0228 15.8186 19.0213C15.2712 19.0197 14.7452 19.2337 14.3543 19.6169C13.9635 20.0001 13.7391 20.5218 13.7298 21.0691C13.7205 21.6164 13.9269 22.1454 14.3045 22.5417C15.1774 23.4324 16.2192 24.14 17.3689 24.623C18.5187 25.1061 19.7532 25.3549 21.0003 25.3549C22.2474 25.3549 23.482 25.1061 24.6317 24.623C25.7815 24.14 26.8233 23.4324 27.6962 22.5417C28.0829 22.1471 28.2971 21.6151 28.2916 21.0627C28.2861 20.5103 28.0615 19.9826 27.667 19.5958ZM15.8128 10.6667H15.792C15.2395 10.6667 14.7096 10.8862 14.3189 11.2769C13.9282 11.6676 13.7087 12.1975 13.7087 12.75C13.7087 13.3025 13.9282 13.8324 14.3189 14.2231C14.7096 14.6138 15.2395 14.8333 15.792 14.8333H15.8128C16.3654 14.8333 16.8953 14.6138 17.286 14.2231C17.6767 13.8324 17.8962 13.3025 17.8962 12.75C17.8962 12.1975 17.6767 11.6676 17.286 11.2769C16.8953 10.8862 16.3654 10.6667 15.8128 10.6667ZM26.2295 10.6667H26.2087C25.6561 10.6667 25.1262 10.8862 24.7355 11.2769C24.3448 11.6676 24.1253 12.1975 24.1253 12.75C24.1253 13.3025 24.3448 13.8324 24.7355 14.2231C25.1262 14.6138 25.6561 14.8333 26.2087 14.8333H26.2295C26.782 14.8333 27.3119 14.6138 27.7026 14.2231C28.0933 13.8324 28.3128 13.3025 28.3128 12.75C28.3128 12.1975 28.0933 11.6676 27.7026 11.2769C27.3119 10.8862 26.782 10.6667 26.2295 10.6667Z" fill="#836262"/>
          </svg>
        </button>

        {/* Headings */}
        <header className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4 [text-shadow:_0px_4px_4px_rgba(0,0,0,0.25)]">
            Our Story
          </h2>
          <h3 className="text-xl md:text-2xl text-black font-medium italic">Authenticity, Hospitality, Connection</h3>
        </header>

        {/* Main Story Content */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-6 items-stretch">

          {/* Restaurant Image with explicit dimensions */}
          <figure className="w-full h-[300px] md:h-[350px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
            <img src={storyImage} alt="Interior of The Sarabi Restaurant"
              className="w-full h-full object-cover" />
          </figure>

          <section className="flex flex-col justify-center px-0 sm:px-2 md:px-4 h-full">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed md:leading-loose text-balance">
              At The Sarabi Restaurant, our journey began with a simple passion: to bring people together over food that warms the heart and feeds the soul. Founded in Westlands, Nairobi, we blend family traditions with modern culinary art, crafting Pan-African fusion dishes from the freshest local ingredients. We pride ourselves on warm hospitality and a vibrant atmosphere, ensuring every visit feels like a memorable return home.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed md:leading-loose mt-3 md:mt-4">
              Thank you for being part of our story.
            </p>
          </section>
        </section>
      </article>
    </section>
  );
};

export default OurStory;