"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaBed, FaUsers, FaCalendarAlt, FaCreditCard, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  const [bookingData, setBookingData] = useState({
    room: searchParams?.get('room') || 'double',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    specialRequests: '',
    guestInfo: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: ''
    },
    paymentInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: ''
    }
  });

  const rooms = {
    single: {
      title: "Single Room",
      price: 80000,
      currency: "UGX",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/LABREZI_SUITES_a1.png?updatedAt=1731996616563",
      maxGuests: 2,
      size: "14 m²"
    },
    double: {
      title: "Double Room", 
      price: 120000,
      currency: "UGX",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_8040.jpg?updatedAt=1731997026952",
      maxGuests: 3,
      size: "20 m²"
    },
    executive: {
      title: "Executive Suite",
      price: 250000,
      currency: "UGX", 
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/EXECTIVE_BIG_ROOM.png?updatedAt=1731996591628",
      maxGuests: 4,
      size: "40 m²"
    }
  };

  const selectedRoom = rooms[bookingData.room as keyof typeof rooms];

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomTotal = selectedRoom.price * nights;
    const taxes = roomTotal * 0.18; // 18% VAT
    return { nights, roomTotal, taxes, total: roomTotal + taxes };
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMinCheckOutDate = () => {
    if (!bookingData.checkIn) return getTodayDate();
    const checkIn = new Date(bookingData.checkIn);
    checkIn.setDate(checkIn.getDate() + 1);
    return checkIn.toISOString().split('T')[0];
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    if (section === 'root') {
      setBookingData(prev => ({ ...prev, [field]: value }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [section]: { ...prev[section as keyof typeof prev] as any, [field]: value }
      }));
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return bookingData.checkIn && bookingData.checkOut && bookingData.adults > 0;
      case 2:
        return bookingData.guestInfo.firstName && 
               bookingData.guestInfo.lastName && 
               bookingData.guestInfo.email &&
               bookingData.guestInfo.phone;
      case 3:
        return bookingData.paymentInfo.cardNumber && 
               bookingData.paymentInfo.expiryDate && 
               bookingData.paymentInfo.cvv &&
               bookingData.paymentInfo.cardName;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmitBooking = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chatbot/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          adults: bookingData.adults,
          children: bookingData.children,
          roomType: bookingData.room,
          sessionId: `booking_${Date.now()}`
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setConfirmationId(data.booking.bookingId);
        setBookingConfirmed(true);
        setCurrentStep(4);
      } else {
        alert(data.error || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Select Dates & Guests</h3>
            
            {/* Room Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(rooms).map(([key, room]) => (
                <div 
                  key={key}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    bookingData.room === key 
                      ? 'border-[#A80532] bg-[#A80532]/10' 
                      : 'border-gray-200 hover:border-[#C46A26]'
                  }`}
                  onClick={() => handleInputChange('root', 'room', key)}
                >
                  <h4 className="font-semibold text-[#4A3F36]">{room.title}</h4>
                  <p className="text-[#C46A26] font-bold">{room.currency} {room.price.toLocaleString()}/night</p>
                  <p className="text-sm text-gray-600">{room.size} • Max {room.maxGuests} guests</p>
                </div>
              ))}
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">Check-in Date</label>
                <input
                  type="date"
                  min={getTodayDate()}
                  value={bookingData.checkIn}
                  onChange={(e) => handleInputChange('root', 'checkIn', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                />
              </div>
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">Check-out Date</label>
                <input
                  type="date"
                  min={getMinCheckOutDate()}
                  value={bookingData.checkOut}
                  onChange={(e) => handleInputChange('root', 'checkOut', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                />
              </div>
            </div>

            {/* Guest Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">Adults</label>
                <select
                  value={bookingData.adults}
                  onChange={(e) => handleInputChange('root', 'adults', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                >
                  {[1,2,3,4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">Children (under 12)</label>
                <select
                  value={bookingData.children}
                  onChange={(e) => handleInputChange('root', 'children', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                >
                  {[0,1,2,3].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Guest Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">Title</label>
                <select
                  value={bookingData.guestInfo.title}
                  onChange={(e) => handleInputChange('guestInfo', 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">First Name*</label>
                <input
                  type="text"
                  value={bookingData.guestInfo.firstName}
                  onChange={(e) => handleInputChange('guestInfo', 'firstName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[#4A3F36] font-medium mb-2">Last Name*</label>
                <input
                  type="text"
                  value={bookingData.guestInfo.lastName}
                  onChange={(e) => handleInputChange('guestInfo', 'lastName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">Email*</label>
                <input
                  type="email"
                  value={bookingData.guestInfo.email}
                  onChange={(e) => handleInputChange('guestInfo', 'email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">Phone*</label>
                <input
                  type="tel"
                  value={bookingData.guestInfo.phone}
                  onChange={(e) => handleInputChange('guestInfo', 'phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A3F36] font-medium mb-2">Country</label>
              <input
                type="text"
                value={bookingData.guestInfo.country}
                onChange={(e) => handleInputChange('guestInfo', 'country', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
              />
            </div>

            <div>
              <label className="block text-[#4A3F36] font-medium mb-2">Special Requests</label>
              <textarea
                rows={4}
                value={bookingData.specialRequests}
                onChange={(e) => handleInputChange('root', 'specialRequests', e.target.value)}
                placeholder="Any special requests or preferences..."
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-[#4A3F36]">Secure Payment</h3>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                <FaShieldAlt className="inline mr-1" />
                Your payment information is secured with 256-bit SSL encryption
              </p>
            </div>

            <div>
              <label className="block text-[#4A3F36] font-medium mb-2">Card Number*</label>
              <input
                type="text"
                value={bookingData.paymentInfo.cardNumber}
                onChange={(e) => handleInputChange('paymentInfo', 'cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">Expiry Date*</label>
                <input
                  type="text"
                  value={bookingData.paymentInfo.expiryDate}
                  onChange={(e) => handleInputChange('paymentInfo', 'expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#4A3F36] font-medium mb-2">CVV*</label>
                <input
                  type="text"
                  value={bookingData.paymentInfo.cvv}
                  onChange={(e) => handleInputChange('paymentInfo', 'cvv', e.target.value)}
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A3F36] font-medium mb-2">Cardholder Name*</label>
              <input
                type="text"
                value={bookingData.paymentInfo.cardName}
                onChange={(e) => handleInputChange('paymentInfo', 'cardName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <FaCheckCircle className="text-green-600 text-6xl mx-auto" />
            <h3 className="text-2xl font-bold text-[#4A3F36]">Booking Confirmed!</h3>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-lg text-green-800 font-semibold">Confirmation ID: {confirmationId}</p>
              <p className="text-green-700 mt-2">We've sent a confirmation email to {bookingData.guestInfo.email}</p>
            </div>
            <div className="text-left bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-[#4A3F36] mb-4">Booking Details:</h4>
              <div className="space-y-2 text-[#4A3F36]">
                <p><strong>Room:</strong> {selectedRoom.title}</p>
                <p><strong>Check-in:</strong> {bookingData.checkIn}</p>
                <p><strong>Check-out:</strong> {bookingData.checkOut}</p>
                <p><strong>Guests:</strong> {bookingData.adults} adults{bookingData.children > 0 && `, ${bookingData.children} children`}</p>
                <p><strong>Total:</strong> {selectedRoom.currency} {calculateTotal().total.toLocaleString()}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#F6F0E5]">
        {/* Header */}
        <div className="bg-[#4A3F36] text-white py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Book Your Stay</h1>
            <p className="text-gray-300">Secure your reservation at La Brezi Suites</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="flex items-center mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step ? 'bg-[#A80532] text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {bookingConfirmed && step === 4 ? <FaCheckCircle /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`h-1 w-16 mx-2 ${
                        currentStep > step ? 'bg-[#A80532]' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                {renderStepContent()}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                      disabled={currentStep === 1}
                      className="px-6 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {currentStep === 3 ? (
                      <button
                        onClick={handleSubmitBooking}
                        disabled={!validateStep(currentStep) || isLoading}
                        className="px-8 py-2 bg-[#A80532] text-white rounded hover:bg-[#8A0425] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Confirming...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextStep}
                        disabled={!validateStep(currentStep)}
                        className="px-6 py-2 bg-[#A80532] text-white rounded hover:bg-[#8A0425] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Booking Summary</h3>
                
                {/* Room Image */}
                <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={selectedRoom.image}
                    alt={selectedRoom.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-3 text-[#4A3F36]">
                  <div className="flex justify-between">
                    <span className="font-medium">{selectedRoom.title}</span>
                    <span>{selectedRoom.currency} {selectedRoom.price.toLocaleString()}/night</span>
                  </div>
                  
                  {bookingData.checkIn && bookingData.checkOut && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Check-in:</span>
                        <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Check-out:</span>
                        <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nights:</span>
                        <span>{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Guests:</span>
                        <span>{bookingData.adults} adults{bookingData.children > 0 && `, ${bookingData.children} children`}</span>
                      </div>
                      
                      <hr className="my-4" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Room Total:</span>
                        <span>{selectedRoom.currency} {calculateTotal().roomTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxes (18%):</span>
                        <span>{selectedRoom.currency} {calculateTotal().taxes.toLocaleString()}</span>
                      </div>
                      
                      <hr className="my-4" />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-[#A80532]">{selectedRoom.currency} {calculateTotal().total.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700 text-sm">
                    <FaCheckCircle className="mr-2" />
                    <span>Free cancellation until 24hrs before check-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default BookingPage;