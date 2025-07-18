"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  MessageCircle, 
  User, 
  Clock, 
  Send,
  Search,
  Filter,
  Eye,
  Reply,
  MoreHorizontal,
  Phone,
  Mail,
  Star,
  AlertCircle,
  CheckCircle
} from 'react-feather';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      // Mock data - in production, this would come from your API
      const mockMessages = [
        {
          id: 1,
          type: 'chat',
          sender: 'Guest User',
          guestName: 'John Smith',
          email: 'john@example.com',
          phone: '+1 234 567 8900',
          subject: 'Room Service Query',
          message: 'Hi, I would like to know what time room service is available until? Also, do you have vegetarian options?',
          timestamp: '2025-01-18T10:30:00Z',
          status: 'unread',
          priority: 'normal',
          roomNumber: '301',
          sessionId: 'chat_12345',
          replies: [
            {
              id: 1,
              sender: 'Admin',
              message: 'Hello! Room service is available until 11 PM. Yes, we have many vegetarian options available.',
              timestamp: '2025-01-18T10:45:00Z'
            }
          ]
        },
        {
          id: 2,
          type: 'contact',
          sender: 'Maria Garcia',
          guestName: 'Maria Garcia',
          email: 'maria@example.com',
          phone: '+1 234 567 8901',
          subject: 'Booking Inquiry',
          message: 'Hello, I am interested in booking a room for next weekend. Do you have any availability for 2 adults and 1 child?',
          timestamp: '2025-01-18T09:15:00Z',
          status: 'unread',
          priority: 'high',
          roomNumber: null,
          sessionId: null,
          replies: []
        },
        {
          id: 3,
          type: 'chat',
          sender: 'Guest User',
          guestName: 'David Johnson',
          email: 'david@example.com',
          phone: '+1 234 567 8902',
          subject: 'WiFi Issue',
          message: 'I am having trouble connecting to the WiFi in my room. Can someone help me?',
          timestamp: '2025-01-18T08:45:00Z',
          status: 'read',
          priority: 'urgent',
          roomNumber: '205',
          sessionId: 'chat_12346',
          replies: [
            {
              id: 1,
              sender: 'Admin',
              message: 'I apologize for the inconvenience. I will send someone to your room to help you with the WiFi connection.',
              timestamp: '2025-01-18T08:50:00Z'
            },
            {
              id: 2,
              sender: 'Guest User',
              message: 'Thank you! That would be great.',
              timestamp: '2025-01-18T08:52:00Z'
            }
          ]
        },
        {
          id: 4,
          type: 'review',
          sender: 'Sarah Wilson',
          guestName: 'Sarah Wilson',
          email: 'sarah@example.com',
          phone: '+1 234 567 8903',
          subject: 'Great Stay Review',
          message: 'We had a wonderful stay at your hotel. The staff was very friendly and the room was clean and comfortable. Thank you!',
          timestamp: '2025-01-18T07:30:00Z',
          status: 'read',
          priority: 'normal',
          roomNumber: '401',
          sessionId: null,
          rating: 5,
          replies: []
        }
      ];
      
      setMessages(mockMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && message.status === 'unread') ||
                         (filter === 'urgent' && message.priority === 'urgent') ||
                         (filter === 'chat' && message.type === 'chat') ||
                         (filter === 'contact' && message.type === 'contact');
    
    const matchesSearch = message.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-green-100 text-green-800';
      case 'replied': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'chat': return <MessageCircle className="w-4 h-4" />;
      case 'contact': return <Mail className="w-4 h-4" />;
      case 'review': return <Star className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      setMessages(messages.map(msg => 
        msg.id === message.id 
          ? { ...msg, status: 'read' }
          : msg
      ));
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: selectedMessage.replies.length + 1,
      sender: 'Admin',
      message: replyText,
      timestamp: new Date().toISOString()
    };

    setMessages(messages.map(msg => 
      msg.id === selectedMessage.id 
        ? { ...msg, replies: [...msg.replies, newReply], status: 'replied' }
        : msg
    ));

    setSelectedMessage({
      ...selectedMessage,
      replies: [...selectedMessage.replies, newReply],
      status: 'replied'
    });

    setReplyText('');
    setShowReplyForm(false);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C46A26]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#4A3F36]">Messages & Chat</h1>
            <p className="text-gray-600 mt-1">Manage guest messages and chatbot conversations</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {filteredMessages.filter(m => m.status === 'unread').length} unread messages
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread</option>
                  <option value="urgent">Urgent</option>
                  <option value="chat">Chat Messages</option>
                  <option value="contact">Contact Forms</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#4A3F36]">Recent Messages</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(message.type)}
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`}></div>
                      </div>
                      <div>
                        <div className="font-medium text-[#4A3F36]">{message.guestName}</div>
                        <div className="text-sm text-gray-500">{message.subject}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(message.status)}`}>
                        {message.status}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{message.message}</p>
                  {message.roomNumber && (
                    <div className="text-xs text-gray-500 mt-1">Room {message.roomNumber}</div>
                  )}
                  {message.rating && (
                    <div className="flex items-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= message.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {selectedMessage ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[#4A3F36]">Message Details</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#C46A26] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-[#4A3F36]">{selectedMessage.guestName}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-4">
                        <span>{selectedMessage.email}</span>
                        {selectedMessage.phone && <span>{selectedMessage.phone}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    {/* Original Message */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-[#4A3F36]">{selectedMessage.guestName}</div>
                        <div className="text-xs text-gray-500">{formatTimestamp(selectedMessage.timestamp)}</div>
                      </div>
                      <p className="text-gray-700">{selectedMessage.message}</p>
                    </div>

                    {/* Replies */}
                    {selectedMessage.replies.map((reply) => (
                      <div key={reply.id} className={`rounded-lg p-4 ${
                        reply.sender === 'Admin' ? 'bg-[#C46A26] bg-opacity-10 ml-8' : 'bg-gray-50 mr-8'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-[#4A3F36]">{reply.sender}</div>
                          <div className="text-xs text-gray-500">{formatTimestamp(reply.timestamp)}</div>
                        </div>
                        <p className="text-gray-700">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply Form */}
                <div className="p-6 border-t border-gray-200">
                  {showReplyForm ? (
                    <div className="space-y-4">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                        rows="3"
                      ></textarea>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleReply}
                          className="flex items-center px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] transition-colors"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Reply
                        </button>
                        <button
                          onClick={() => setShowReplyForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowReplyForm(true)}
                      className="flex items-center px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] transition-colors"
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Reply to Message
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;