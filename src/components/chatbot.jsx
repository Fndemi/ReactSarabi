import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Sarabi! Ask me about our menu, hours, or reservations.",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Expanded responses with multiple answers for each category
  const responses = {
    menu: {
      popular: [
        "Our Signature Tilapia is the most popular! Lake Victoria tilapia in coconut curry with spinach.",
        "Many guests love our Sarabi Gourmet Beef Burger with avocado and peri-peri aioli.",
        "The Swahili Seafood Coconut Noodles are also a crowd favorite!",
      ],
      vegan: [
        "We have several vegan options including our African Lentil Bolognese!",
        "Try our plant-based burger made with African yam and mushroom patty.",
        "Our roasted vegetable platter with peanut sauce is completely plant-based.",
      ],
      chef: [
        "Our Chef's Special is the Dry-Aged Signature Steak with herb butter!",
        "The Pan-African Spiced Chicken Pizza is another chef recommendation.",
        "For seafood lovers, the Lakeside Salmon with Mango Salsa is exceptional.",
      ],
    },
    hours: {
      general: "We're open daily from 9:00 AM to 12:00 AM.",
      weekends: "On weekends we open at 8:30 AM for brunch service!",
      holidays: "Holiday hours may vary - please call ahead on major holidays.",
    },
    reservations: {
      how: "You can reserve online through our website or call us at +111 01 22 32 23",
      group:
        "For groups larger than 8, please call at least 24 hours in advance.",
      cancel:
        "Cancellations require 2 hours notice to avoid a $20 fee per person.",
    },
    default: [
      "I can help with menu questions, hours, reservations and more!",
      "Would you like to know about our most popular dishes?",
      "Need help making a reservation? I can guide you!",
    ],
  };

  // Sample questions to display as quick prompts
  const sampleQuestions = [
    "What's your most popular dish?",
    "Do you have vegan options?",
    "What are your opening hours?",
    "How do I make a reservation?",
    "Where are you located?",
    "What's the chef's recommendation today?",
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add message to chat
  const addMessage = (text, isUser = false) => {
    setMessages((prev) => [...prev, { text, isUser }]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = inputValue.trim();

    if (message) {
      addMessage(message, true);
      setInputValue("");
      setIsTyping(true);

      // Simulate bot response after delay
      setTimeout(() => {
        setIsTyping(false);

        let response =
          responses.default[
            Math.floor(Math.random() * responses.default.length)
          ];
        const lowerMsg = message.toLowerCase();

        if (
          lowerMsg.includes("popular") ||
          lowerMsg.includes("best") ||
          lowerMsg.includes("favorite")
        ) {
          response =
            responses.menu.popular[
              Math.floor(Math.random() * responses.menu.popular.length)
            ];
        } else if (
          lowerMsg.includes("vegan") ||
          lowerMsg.includes("vegetarian")
        ) {
          response =
            responses.menu.vegan[
              Math.floor(Math.random() * responses.menu.vegan.length)
            ];
        } else if (
          lowerMsg.includes("hour") ||
          lowerMsg.includes("open") ||
          lowerMsg.includes("close")
        ) {
          if (lowerMsg.includes("weekend")) {
            response = responses.hours.weekends;
          } else {
            response = responses.hours.general;
          }
        } else if (
          lowerMsg.includes("reserv") ||
          lowerMsg.includes("book") ||
          lowerMsg.includes("table")
        ) {
          if (lowerMsg.includes("group") || lowerMsg.includes("large")) {
            response = responses.reservations.group;
          } else if (lowerMsg.includes("cancel")) {
            response = responses.reservations.cancel;
          } else {
            response = responses.reservations.how;
          }
        } else if (
          lowerMsg.includes("chef") ||
          lowerMsg.includes("recommend") ||
          lowerMsg.includes("special")
        ) {
          response =
            responses.menu.chef[
              Math.floor(Math.random() * responses.menu.chef.length)
            ];
        }

        addMessage(response, false);
      }, 1500);
    }
  };

  // Quick prompt buttons
  const handleQuickPrompt = (prompt) => {
    addMessage(prompt, true); // Add user message immediately
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);

      const lowerMsg = prompt.toLowerCase();
      let response =
        responses.default[Math.floor(Math.random() * responses.default.length)];

      if (
        lowerMsg.includes("popular") ||
        lowerMsg.includes("best") ||
        lowerMsg.includes("favorite")
      ) {
        response =
          responses.menu.popular[
            Math.floor(Math.random() * responses.menu.popular.length)
          ];
      } else if (
        lowerMsg.includes("vegan") ||
        lowerMsg.includes("vegetarian")
      ) {
        response =
          responses.menu.vegan[
            Math.floor(Math.random() * responses.menu.vegan.length)
          ];
      } else if (
        lowerMsg.includes("hour") ||
        lowerMsg.includes("open") ||
        lowerMsg.includes("close")
      ) {
        if (lowerMsg.includes("weekend")) {
          response = responses.hours.weekends;
        } else {
          response = responses.hours.general;
        }
      } else if (
        lowerMsg.includes("reserv") ||
        lowerMsg.includes("book") ||
        lowerMsg.includes("table")
      ) {
        if (lowerMsg.includes("group") || lowerMsg.includes("large")) {
          response = responses.reservations.group;
        } else if (lowerMsg.includes("cancel")) {
          response = responses.reservations.cancel;
        } else {
          response = responses.reservations.how;
        }
      } else if (
        lowerMsg.includes("chef") ||
        lowerMsg.includes("recommend") ||
        lowerMsg.includes("special")
      ) {
        response =
          responses.menu.chef[
            Math.floor(Math.random() * responses.menu.chef.length)
          ];
      }

      addMessage(response, false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-40"
        aria-label="Open chatbot"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.4994 6.25C39.7095 6.25 41.8291 7.12797 43.3919 8.69078C44.9547 10.2536 45.8327 12.3732 45.8327 14.5833V31.25C45.8327 33.4601 44.9547 35.5798 43.3919 37.1426C41.8291 38.7054 39.7095 39.5833 37.4994 39.5833H27.6577L17.7368 45.5354C17.4381 45.7147 17.0991 45.8162 16.751 45.8306C16.4028 45.845 16.0566 45.7719 15.7441 45.6179C15.4315 45.4639 15.1625 45.2339 14.9618 44.9491C14.7611 44.6643 14.6351 44.3337 14.5952 43.9875L14.5827 43.75V39.5833H12.4993C10.3613 39.5833 8.30512 38.7616 6.75599 37.2881C5.20686 35.8146 4.28333 33.802 4.17643 31.6667L4.16602 31.25V14.5833C4.16602 12.3732 5.04399 10.2536 6.60679 8.69078C8.1696 7.12797 10.2892 6.25 12.4993 6.25H37.4994ZM31.666 25.5958C31.2715 25.2091 30.7395 24.9949 30.1871 25.0004C29.6346 25.0059 29.107 25.2305 28.7202 25.625C28.2352 26.1201 27.6563 26.5135 27.0174 26.782C26.3785 27.0505 25.6924 27.1889 24.9994 27.1889C24.3063 27.1889 23.6202 27.0505 22.9813 26.782C22.3424 26.5135 21.7635 26.1201 21.2785 25.625C20.8898 25.2396 20.365 25.0228 19.8176 25.0213C19.2702 25.0197 18.7442 25.2337 18.3534 25.6169C17.9625 26.0001 17.7381 26.5218 17.7288 27.0691C17.7195 27.6164 17.9259 28.1454 18.3035 28.5417C19.1764 29.4324 20.2182 30.14 21.3679 30.623C22.5177 31.1061 23.7522 31.3549 24.9994 31.3549C26.2465 31.3549 27.481 31.1061 28.6308 30.623C29.7805 30.14 30.8223 29.4324 31.6952 28.5417C32.0819 28.1471 32.2961 27.6151 32.2906 27.0627C32.2851 26.5103 32.0605 25.9826 31.666 25.5958ZM19.8119 16.6667H19.791C19.2385 16.6667 18.7086 16.8862 18.3179 17.2769C17.9272 17.6676 17.7077 18.1975 17.7077 18.75C17.7077 19.3025 17.9272 19.8324 18.3179 20.2231C18.7086 20.6138 19.2385 20.8333 19.791 20.8333H19.8119C20.3644 20.8333 20.8943 20.6138 21.285 20.2231C21.6757 19.8324 21.8952 19.3025 21.8952 18.75C21.8952 18.1975 21.6757 17.6676 21.285 17.2769C20.8943 16.8862 20.3644 16.6667 19.8119 16.6667ZM30.2285 16.6667H30.2077C29.6551 16.6667 29.1252 16.8862 28.7345 17.2769C28.3438 17.6676 28.1244 18.1975 28.1244 18.75C28.1244 19.3025 28.3438 19.8324 28.7345 20.2231C29.1252 20.6138 29.6551 20.8333 30.2077 20.8333H30.2285C30.7811 20.8333 31.311 20.6138 31.7017 20.2231C32.0924 19.8324 32.3119 19.3025 32.3119 18.75C32.3119 18.1975 32.0924 17.6676 31.7017 17.2769C31.311 16.8862 30.7811 16.6667 30.2285 16.6667Z"
            fill="#836262"
          ></path>
        </svg>
      </button>

      {/* Chatbot Container */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Chatbot Header */}
            <header className="bg-[#917474] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaRobot className="text-xl" />
                <h2 className="text-lg font-semibold">
                  Sarabi Dining Assistant
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
                className="text-white hover:text--[#917474] transition"
              >
                <FaTimes />
              </button>
            </header>

            {/* Message Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#f5f0f0]">
              {/* Sample Questions always visible at top */}
              <div className="flex flex-wrap gap-2 pb-4">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(question)}
                    className="prompt-btn text-xs bg-[#C39797] bg-opacity-30 hover:bg-opacity-40 text-[#5a3e3e] py-1 px-3 rounded-full transition"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Messages */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#C39797] text-white flex items-center justify-center flex-shrink-0">
                      <FaRobot />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.isUser
                        ? "bg-[#C39797] bg-opacity-80 text-white"
                        : "bg-[#C39797] bg-opacity-20"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(message.text),
                      }}
                    />
                  </div>
                  {message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#C39797] text-white flex items-center justify-center flex-shrink-0">
                      <FaUser />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C39797] text-white flex items-center justify-center flex-shrink-0">
                    <FaRobot />
                  </div>
                  <div className="bg-[#C39797] bg-opacity-20 rounded-lg p-3 max-w-[80%] flex items-center gap-1">
                    <span className="text-[#5a3e3e]">Bot is typing</span>
                    <div className="typing-dots flex gap-1">
                      <div className="w-2 h-2 bg-[#5a3e3e] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#5a3e3e] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#5a3e3e] rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <footer className="border-t border-[#C39797] border-opacity-30 p-3 bg-white">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 border border-[#C39797] border-opacity-30 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#C39797] focus:ring-opacity-50 text-[#5a3e3e]"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="bg-[#C39797] hover:bg-[#a57f7f] text-white p-2 rounded-full transition"
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </form>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
