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

  // Remove hardcoded responses; use backend

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

  // Fetch bot response from FastAPI backend
  const fetchBotResponse = async (allMessages) => {
    try {
      const response = await fetch("https://sarabi-backend.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: allMessages.map((msg) => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.text,
          })),
        }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      return "Sorry, I couldn't reach the server.";
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = inputValue.trim();

    if (message) {
      addMessage(message, true);
      setInputValue("");
      setIsTyping(true);

      const newMessages = [...messages, { text: message, isUser: true }];
      const botReply = await fetchBotResponse(newMessages);

      setIsTyping(false);
      addMessage(botReply, false);
    }
  };

  // Quick prompt buttons
  const handleQuickPrompt = async (prompt) => {
    addMessage(prompt, true);
    setIsTyping(true);

    const newMessages = [...messages, { text: prompt, isUser: true }];
    const botReply = await fetchBotResponse(newMessages);

    setIsTyping(false);
    addMessage(botReply, false);
  };

  return (
    <>
      {/* Removed the floating chat button from here */}

      {/* Chatbot Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4"> {/* Removed bg-black bg-opacity-50 */}
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