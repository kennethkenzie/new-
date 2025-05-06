"use client";

import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  addMonths,
  isAfter,
  isBefore,
  differenceInDays
} from 'date-fns';

const BookingCalendar = () => {
  // State management
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0
  });
  const [promoCodes, setPromoCodes] = useState([]);
  const [newPromoCode, setNewPromoCode] = useState('');

  // Sample pricing data
  const pricing = {
    '2025-04-01': 874,
    '2025-04-02': 874,
    '2025-04-03': 6859,
    '2025-04-04': 964,
    '2025-04-27': 874,
    '2025-04-28': 874,
    '2025-04-29': 6859,
    '2025-04-30': 964,
  };

  // Calendar setup
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Helper functions
  const formatCurrency = (amount) => `$${amount.toLocaleString()}`;
  
  // Calculate total nights if needed (now used in the search button text)
  const totalNights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;

  const handleDateSelection = (day) => {
    if (!checkInDate || isBefore(day, checkInDate) || isSameDay(day, checkInDate)) {
      setCheckInDate(day);
      setCheckOutDate(null);
    } else if (!checkOutDate) {
      setCheckOutDate(day);
    }
  };

  const isDateInRange = (day) => {
    return checkInDate && checkOutDate && 
           isAfter(day, checkInDate) && 
           isBefore(day, checkOutDate);
  };

  const addPromoCode = () => {
    if (newPromoCode.trim()) {
      setPromoCodes([...promoCodes, { 
        type: "Promotion", 
        code: newPromoCode.toUpperCase() 
      }]);
      setNewPromoCode('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md font-sans">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          className="text-[#A80532] hover:text-[#C49A6C] text-lg font-semibold"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold text-[#4A3F36]">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="text-[#A80532] hover:text-[#C49A6C] text-lg font-semibold"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-7 gap-1 mb-3">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-[#4A3F36] py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="h-12" aria-hidden="true" />
          ))}

          {daysInMonth.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const price = pricing[dateKey];
            const isCheckIn = checkInDate && isSameDay(day, checkInDate);
            const isCheckOut = checkOutDate && isSameDay(day, checkOutDate);
            const isSelectedRange = isDateInRange(day);

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => handleDateSelection(day)}
                className={`
                  h-12 flex flex-col items-center justify-center rounded-md text-xs
                  transition-colors focus:outline-none focus:ring-2 focus:ring-[#C49A6C]
                  ${isCheckIn ? 'bg-[#A80532] text-white rounded-r-none' : ''}
                  ${isCheckOut ? 'bg-[#A80532] text-white rounded-l-none' : ''}
                  ${isSelectedRange ? 'bg-[#F6F0E5]' : ''}
                  ${!isCheckIn && !isCheckOut ? 'hover:bg-[#F6F0E5]' : ''}
                `}
                aria-label={`Select ${format(day, 'MMMM do')} for ${isCheckIn ? 'check-in' : isCheckOut ? 'check-out' : 'booking'}`}
              >
                <span className={`font-medium ${isCheckIn || isCheckOut ? 'text-white' : 'text-[#4A3F36]'}`}>
                  {format(day, 'd')}
                </span>
                {price && (
                  <span className={`text-[10px] mt-1 ${isCheckIn || isCheckOut ? 'text-white' : 'text-[#C49A6C]'}`}>
                    {formatCurrency(price)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-[#4A3F36]">
          <span className="text-[#A80532] font-bold">①</span> Calendar prices shown for 1 night stay including fees.
        </p>
      </div>

      {/* Guest Selection */}
      <div className="mb-6 border-t border-[#F6F0E5] pt-5">
        <h3 className="text-lg font-bold text-[#4A3F36] mb-4">GUESTS</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[#4A3F36]">Adults</p>
              <p className="text-xs text-[#4A3F36]/70">18 years or older</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setGuests({...guests, adults: Math.max(1, guests.adults - 1)})}
                className="w-8 h-8 rounded-full border border-[#C49A6C] text-[#C49A6C] flex items-center justify-center hover:bg-[#F6F0E5] transition-colors"
                aria-label="Decrease adults"
              >
                -
              </button>
              <span className="w-6 text-center text-[#4A3F36]">{guests.adults}</span>
              <button
                type="button"
                onClick={() => setGuests({...guests, adults: guests.adults + 1})}
                className="w-8 h-8 rounded-full border border-[#C49A6C] text-[#C49A6C] flex items-center justify-center hover:bg-[#F6F0E5] transition-colors"
                aria-label="Increase adults"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[#4A3F36]">Children</p>
              <p className="text-xs text-[#4A3F36]/70">Ages 0–17</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setGuests({...guests, children: Math.max(0, guests.children - 1)})}
                className="w-8 h-8 rounded-full border border-[#C49A6C] text-[#C49A6C] flex items-center justify-center hover:bg-[#F6F0E5] transition-colors"
                aria-label="Decrease children"
              >
                -
              </button>
              <span className="w-6 text-center text-[#4A3F36]">{guests.children}</span>
              <button
                type="button"
                onClick={() => setGuests({...guests, children: guests.children + 1})}
                className="w-8 h-8 rounded-full border border-[#C49A6C] text-[#C49A6C] flex items-center justify-center hover:bg-[#F6F0E5] transition-colors"
                aria-label="Increase children"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Codes */}
      <div className="mb-8 border-t border-[#F6F0E5] pt-5">
        <h3 className="text-lg font-bold text-[#4A3F36] mb-4">SPECIAL RATES / CODES</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-[#F6F0E5]">
                <th className="pb-2 text-left text-sm font-medium text-[#4A3F36]">TYPE</th>
                <th className="pb-2 text-left text-sm font-medium text-[#4A3F36]">PROMO CODE</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.length > 0 ? (
                promoCodes.map((promo, index) => (
                  <tr key={index} className="border-b border-[#F6F0E5]">
                    <td className="py-3 text-sm text-[#4A3F36]">{promo.type}</td>
                    <td className="py-3 text-sm text-[#4A3F36] font-medium">{promo.code}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-4 text-sm text-[#4A3F36]/50 text-center">
                    No promo codes added
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="2" className="pt-3">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newPromoCode}
                      onChange={(e) => setNewPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 text-sm border-b border-[#C49A6C] py-2 px-1 focus:outline-none focus:border-[#A80532]"
                      aria-label="Promo code input"
                    />
                    <button
                      type="button"
                      onClick={addPromoCode}
                      className="ml-3 text-sm font-medium text-[#C49A6C] hover:text-[#A80532] transition-colors"
                      aria-label="Add promo code"
                    >
                      + ADD NEW CODE
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Search Button - Now shows total nights when dates are selected */}
      <button
        type="button"
        className="w-full bg-[#A80532] hover:bg-[#8A0425] text-white font-bold py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:ring-offset-2"
        aria-label="Search available bookings"
      >
        {totalNights > 0 ? `SEARCH (${totalNights} ${totalNights === 1 ? 'night' : 'nights'})` : 'SEARCH'}
      </button>
    </div>
  );
};

export default BookingCalendar;