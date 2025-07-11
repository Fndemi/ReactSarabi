import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";

// Chatbot now accepts isOpen and setIsOpen as props
const Chatbot = ({ isOpen, setIsOpen }) => {
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
      {/* Removed the floating chat button from here */}

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