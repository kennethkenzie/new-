"use client";

import { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, User, Users, MessageCircle, X, Send, Globe, CheckCircle } from 'react-feather';

const EnhancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [language, setLanguage] = useState('en');
  const [languages, setLanguages] = useState([]);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    roomType: 'double'
  });
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize chatbot
  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    // Load languages
    loadLanguages();
    
    // Load conversation history
    loadConversationHistory(newSessionId);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadLanguages = async () => {
    try {
      const response = await fetch('/api/chatbot/languages');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setLanguages(data.languages);
    } catch (error) {
      console.error('Failed to load languages:', error);
      // Set default languages if API fails
      setLanguages([
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
      ]);
    }
  };

  const loadConversationHistory = async (currentSessionId) => {
    try {
      const response = await fetch(`/api/chatbot?sessionId=${currentSessionId}&language=${language}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.welcomeMessage) {
        setMessages([{
          id: Date.now(),
          type: 'assistant',
          content: data.welcomeMessage,
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('Failed to load conversation history:', error);
      // Set default welcome message if API fails
      setMessages([{
        id: Date.now(),
        type: 'assistant',
        content: 'Hello! I\'m your hotel assistant. How can I help you today?',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sessionId,
          language
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.response) {
        const assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
          suggestions: data.suggestions || []
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Show booking form if booking intent detected
        if (data.isBookingIntent) {
          setShowBookingForm(true);
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'I apologize, but I\'m having trouble processing your request. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage();
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setShowLanguageSelector(false);
    // Reload conversation with new language
    loadConversationHistory(sessionId);
  };

  const handleBooking = async () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/chatbot/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          sessionId
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setBookingConfirmation(data.booking);
        setShowBookingForm(false);
        
        // Add booking confirmation message
        const confirmationMessage = {
          id: Date.now(),
          type: 'assistant',
          content: data.message,
          timestamp: new Date().toISOString(),
          isBookingConfirmation: true
        };
        
        setMessages(prev => [...prev, confirmationMessage]);
      } else {
        alert(data.error || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMinCheckOutDate = () => {
    if (!bookingData.checkIn) return getMinDate();
    const checkIn = new Date(bookingData.checkIn);
    checkIn.setDate(checkIn.getDate() + 1);
    return checkIn.toISOString().split('T')[0];
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#C46A26] hover:bg-[#A85B1F] text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Enhanced Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#4A3F36] to-[#C46A26] text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <div>
                <h3 className="font-semibold">La Brezi Assistant</h3>
                <p className="text-xs opacity-75">AI-Powered Hotel Concierge</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="flex items-center gap-1 px-2 py-1 bg-white bg-opacity-20 rounded text-xs hover:bg-opacity-30 transition-all"
                >
                  <Globe size={14} />
                  {currentLanguage?.flag} {currentLanguage?.name}
                </button>
                
                {showLanguageSelector && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded shadow-lg border overflow-hidden">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-xs"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-4 py-2 ${
                  msg.type === 'user' 
                    ? 'bg-[#C46A26] text-white' 
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-60">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  
                  {/* Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {msg.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Booking Confirmation */}
                  {msg.isBookingConfirmation && bookingConfirmation && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                        <CheckCircle size={16} />
                        Booking Confirmed
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        ID: {bookingConfirmation.bookingId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white rounded-lg px-4 py-2 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Booking Form Modal */}
          {showBookingForm && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Book Your Room</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Check-in</label>
                      <input
                        type="date"
                        value={bookingData.checkIn}
                        min={getMinDate()}
                        onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                        className="w-full p-2 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Check-out</label>
                      <input
                        type="date"
                        value={bookingData.checkOut}
                        min={getMinCheckOutDate()}
                        onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                        className="w-full p-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Adults</label>
                      <select
                        value={bookingData.adults}
                        onChange={(e) => setBookingData({...bookingData, adults: parseInt(e.target.value)})}
                        className="w-full p-2 border rounded text-sm"
                      >
                        {[1,2,3,4].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Children</label>
                      <select
                        value={bookingData.children}
                        onChange={(e) => setBookingData({...bookingData, children: parseInt(e.target.value)})}
                        className="w-full p-2 border rounded text-sm"
                      >
                        {[0,1,2,3,4].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Room Type</label>
                    <select
                      value={bookingData.roomType}
                      onChange={(e) => setBookingData({...bookingData, roomType: e.target.value})}
                      className="w-full p-2 border rounded text-sm"
                    >
                      <option value="double">Double Room - $278/night</option>
                      <option value="twin">Twin Suite - $499/night</option>
                      <option value="executive">Executive Suite - $599/night</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-[#C46A26] text-white rounded hover:bg-[#A85B1F] disabled:opacity-50 text-sm"
                  >
                    {loading ? 'Booking...' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                disabled={loading}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C46A26] disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedChatbot;