"use client";

import { createTheme, ThemeProvider } from "flowbite-react";
import Navbar from "./components/navbar/page";
import Slide from "./slider/page";
import Footer from "./components/footer/page";
import RoomCards from "./roomcards/page";
import ExperiencesGrid from "./middle/page";
import { useState, useEffect } from "react";
import FacilitySection from "./components/hotel_facilities/page";
import HotelJumbotron from "./components/hotel_jambatron/page";
import EnhancedChatbot from "./components/enhanced-chatbot/EnhancedChatbot";
import "flowbite";

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
      secondary: "bg-blue-500 hover:bg-blue-600",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm your hotel assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let botReply = "I'm happy to help with that. For immediate assistance, you can also call our front desk at extension 0.";
      if (input.toLowerCase().includes("hello") || input.toLowerCase().includes("hi")) {
        botReply = "Hello! Welcome to La Brezi Suites. How can I assist you today?";
      } else if (input.toLowerCase().includes("help")) {
        botReply = "I can help with room service, spa bookings, restaurant reservations, and general inquiries. What do you need?";
      } else if (input.toLowerCase().includes("reservation")) {
        botReply = "For reservations, you can book directly through our website or call +1 (555) 123-4567. Would you like me to direct you to our booking page?";
      } else if (input.toLowerCase().includes("bye") || input.toLowerCase().includes("goodbye")) {
        botReply = "Thank you for chatting with us! Have a wonderful stay at La Brezi Suites!";
      }
      
      setMessages([...newMessages, { from: "bot", text: botReply }]);
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      {loading ? (
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center p-10"
        >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <Navbar />
          <Slide />
          <ExperiencesGrid />
          <RoomCards />
          <HotelJumbotron />
          <FacilitySection />
          <Footer />

          {/* Floating Chatbot Button */}
          <div className="fixed bottom-5 right-5 z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#C46A26] hover:bg-[#A85B1F] text-white rounded-full p-4 shadow-lg transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>

          {/* Chatbot Window */}
          {isOpen && (
            <div className="fixed bottom-20 right-5 w-80 h-[500px] bg-white rounded-t-lg shadow-xl flex flex-col overflow-hidden z-50 border border-gray-200">
              {/* Chat Header */}
              <div className="bg-[#4A3F36] text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="font-medium">Hotel Assistant</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Welcome Message */}
              <div className="p-4 bg-[#F6F0E5] border-b border-[#C49A6C]">
                <p className="text-sm text-[#4A3F36]">Welcome back. Let us know if you have any questions.</p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-[#F9F9F9]">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.from === "user" 
                          ? "bg-[#C46A26] text-white rounded-tr-none" 
                          : "bg-white text-[#4A3F36] border border-[#C49A6C] rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 text-right opacity-70">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Write a message..."
                    className="w-full border border-[#C49A6C] rounded-lg p-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#C46A26]"
                  />
                  <button
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#C46A26] hover:text-[#A85B1F]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </ThemeProvider>
  );
}