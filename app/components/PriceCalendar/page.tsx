"use client";

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths } from 'date-fns';

const PriceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3, 1)); // April 2025
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample price data for April 2025
  const priceData = {
    '2025-04-01': 874,
    '2025-04-02': 874,
    '2025-04-03': 6859,
    '2025-04-04': 964,
    '2025-04-05': 1200,
    '2025-04-27': 874,
    '2025-04-28': 874,
    '2025-04-29': 6859,
    '2025-04-30': 964,
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the starting day of week (0 = Sunday)
  const startDay = monthStart.getDay();

  // Format price with commas
  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(addMonths(currentMonth, direction));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigateMonth(-1)}
          className="text-[#A80532] hover:text-[#C49A6C] font-medium"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold text-[#4A3F36]">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={() => navigateMonth(1)}
          className="text-[#A80532] hover:text-[#C49A6C] font-medium"
        >
          &gt;
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-[#4A3F36] py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the 1st of the month */}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="h-12"></div>
        ))}

        {/* Days of the month */}
        {daysInMonth.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const price = priceData[dateKey] || null;
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <div
              key={dateKey}
              onClick={() => handleDateClick(day)}
              className={`h-12 flex flex-col items-center justify-center rounded cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-[#A80532] text-white'
                  : 'hover:bg-[#F6F0E5]'
              }`}
            >
              <div className={`text-sm font-medium ${
                isSelected ? 'text-white' : 'text-[#4A3F36]'
              }`}>
                {format(day, 'd')}
              </div>
              {price && (
                <div className={`text-xs mt-0.5 ${
                  isSelected ? 'text-white' : 'text-[#C49A6C] font-medium'
                }`}>
                  {formatPrice(price)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footnote */}
      <div className="mt-4 text-xs text-[#4A3F36]">
        <span className="text-[#A80532]">①</span> Calendar prices shown for 1 night stay including fees.
      </div>
    </div>
  );
};

export default PriceCalendar;