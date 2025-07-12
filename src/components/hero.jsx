import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import your images
import centerCarouselImg from '../assets/images/centercarousel.jpg';
import rightCarouselImg from '../assets/images/rightcarousel.jpg';
import leftCarouselImg from '../assets/images/leftcarousel.jpg';

const HeroCarousel = () => {
  const swiperRef = useRef(null);
  const typingIntervalsRef = useRef([]);

  useEffect(() => {
    // Add typewriter styles dynamically (if not already in global CSS)
    const style = document.createElement('style');
    style.textContent = `
      .typewriter-text {
        display: inline-block;
        position: relative;
      }
      .typewriter-cursor {
        display: inline-block;
        margin-left: 2px;
        animation: blink 1s infinite;
        color: #EB9D69;
      }
      @keyframes blink {
        0%, 100% { opacity: 1 }
        50% { opacity: 0 }
      }
    `;
    document.head.appendChild(style);

    // Initialize Swiper
    swiperRef.current = new Swiper('.swiper', {
      modules: [Autoplay, Navigation, Pagination, EffectFade],
      autoplay: {
        delay: 5000, // 5 seconds per slide
        disableOnInteraction: false,
        waitForTransition: true
      },
      loop: true,
      speed: 1000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        init: function() {
          prepareTypewriterElements();
          startTypewriter(this.slides[this.activeIndex]);
        },
        slideChangeTransitionStart: function() {
          resetAllTypewriters();
        },
        slideChangeTransitionEnd: function() {
          startTypewriter(this.slides[this.activeIndex]);
        }
      }
    });

    // Cleanup Swiper and intervals on component unmount
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }
      resetAllTypewriters();
      document.head.removeChild(style); // Remove dynamically added style
    };
  }, []);

  const prepareTypewriterElements = () => {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      const headings = slide.querySelectorAll('h1, h2');
      headings.forEach(heading => {
        if (!heading.dataset.originalText) { // Avoid re-processing if already done
          const originalText = heading.textContent;
          heading.dataset.originalText = originalText; // Store original text
          heading.innerHTML = '';
          
          const textSpan = document.createElement('span');
          textSpan.className = 'typewriter-text';
          
          const cursorSpan = document.createElement('span');
          cursorSpan.className = 'typewriter-cursor';
          cursorSpan.textContent = '|';
          
          heading.appendChild(textSpan);
          heading.appendChild(cursorSpan);
        }
      });
    });
  };

  const resetAllTypewriters = () => {
    typingIntervalsRef.current.forEach(interval => clearInterval(interval));
    typingIntervalsRef.current = [];
    
    const allTypewriters = document.querySelectorAll('.typewriter-text');
    allTypewriters.forEach(tw => {
      tw.textContent = '';
    });
  };

  const startTypewriter = (slide) => {
    const typewriterElements = slide.querySelectorAll('.typewriter-text');
    
    typewriterElements.forEach((element, index) => {
      const originalText = element.parentElement.dataset.originalText; // Get original text from parent heading
      if (!originalText) return; // Should not happen if prepareTypewriterElements runs correctly
      
      let i = 0;
      
      const delay = index * 300; // Stagger the typing start for each element
      
      const timeoutId = setTimeout(() => {
        const interval = setInterval(() => {
          if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 100); // Typing speed
        
        typingIntervalsRef.current.push(interval);
      }, delay);
      
      typingIntervalsRef.current.push(timeoutId); // Also store timeout IDs for cleanup
    });
  };

  return (
    <section className="swiper h-[90vh] min-h-[600px] max-h-[900px] relative mt-15 " aria-label="Restaurant highlights">
      <div className="swiper-wrapper">
        {/* Slide 1 - Center Image */}
        <article className="swiper-slide relative">
          <img src={centerCarouselImg} alt="The Sarabi restaurant interior" 
            className="absolute inset-0 w-full h-full object-cover" />
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 [text-shadow:_0_4px_4px_rgba(0,0,0,0.7)]">
                <h1 className="text-5xl md:text-7xl lg:text-6xl font-light text-white">The Sarabi Restaurant</h1>
                <h2 className="text-4xl md:text-6xl lg:text-5xl font-light text-white mt-4 italic">Freshness | Culture | Community</h2>
              </div>
              {/* Button adjustments: Always flex-row */}
              <div className="flex flex-row gap-4 justify-center"> {/* Changed flex-col to flex-row for mobile */}
                <a href="/order" className="bg-[#EB9D69] text-white hover:bg-[#e08d55] font-medium 
                                                   py-3 px-8 rounded-full text-lg 
                                                   transition duration-300"> {/* Removed w-fit as they will grow to content */}
                  Order Now
                </a>
                <a href="/reservation" className="bg-[#EB9D69] text-white hover:bg-[#e08d55] font-medium 
                                                      py-3 px-8 rounded-full text-lg 
                                                      transition duration-300"> {/* Removed w-fit */}
                  Reserve Seat
                </a>
              </div>
            </div>
          </div>
        </article>
        
        {/* Slide 2 - Right Image */}
        <article className="swiper-slide relative">
          <img src={rightCarouselImg} alt="Delicious food at The Sarabi" 
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 [text-shadow:_0_4px_4px_rgba(0,0,0,0.7)]">
                <h1 className="text-5xl md:text-7xl lg:text-6xl font-light text-white">The Sarabi Restaurant</h1>
                <h2 className="text-4xl md:text-6xl lg:text-5xl font-light text-white mt-4 italic">Freshness | Culture | Community</h2>
              </div>
              {/* Button adjustments: Always flex-row */}
              <div className="flex flex-row gap-4 justify-center">
                <a href="/order" className="bg-[#EB9D69] text-white hover:bg-[#e08d55] font-medium 
                                                   py-3 px-8 rounded-full text-lg 
                                                   transition duration-300">
                  Order Now
                </a>
                <a href="/reservation" className="bg-[#EB9D69] text-white hover:bg-[#e08d55] font-medium 
                                                      py-3 px-8 rounded-full text-lg 
                                                      transition duration-300">
                  Reserve Seat
                </a>
              </div>
            </div>
          </div>
        </article>
        
        {/* Slide 3 - Left Image */}
        <article className="swiper-slide relative">
          <img src={leftCarouselImg} alt="Cozy dining atmosphere" 
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 [text-shadow:_0_4px_4px_rgba(0,0,0,0.7)]">
                <h1 className="text-5xl md:text-7xl lg:text-6xl font-light text-white">The Sarabi Restaurant</h1>
                <h2 className="text-4xl md:text-6xl lg:text-5xl font-light text-white mt-4 italic">Freshness | Culture | Community</h2>
              </div>
              {/* Button adjustments: Always flex-row */}
              <div className="flex flex-row gap-4 justify-center">
                <a href="/order" className="bg-[#EB9D69] text-white hover:bg-[#e08d55] font-medium 
                                                   py-3 px-8 rounded-full text-lg 
                                                   transition duration-300">
                  Order Now
                </a>
                <a href="/reservation" className="bg-[#EB9D69] text-white hover:bg-[#e08d55] font-medium 
                                                      py-3 px-8 rounded-full text-lg 
                                                      transition duration-300">
                  Reserve Seat
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      {/* Carousel Controls */}
      <div className="swiper-pagination !bottom-8"></div>
      <button className="swiper-button-next !text-white !right-8" aria-label="Next slide"></button>
      <button className="swiper-button-prev !text-white !left-8" aria-label="Previous slide"></button>
    </section>  
  );
};

export default HeroCarousel;