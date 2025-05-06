"use client";

import { useEffect, useState } from "react";

interface BookingDrawerProps {
  bookingFormOpen: boolean;
  toggleBookingForm: () => void;
}

const BookingDrawer = ({ bookingFormOpen, toggleBookingForm }: BookingDrawerProps) => {
  const [selectedDate, setSelectedDate] = useState("02/25/2024");

  useEffect(() => {
    if (typeof window !== "undefined" && window.Datepicker) {
      new window.Datepicker(document.getElementById('datepicker-inline'), {
        autohide: true,
        defaultDate: new Date(selectedDate),
        onSelect: (date) => {
          const formatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          setSelectedDate(formatted);
        }
      });
    }
  }, [selectedDate, bookingFormOpen]);

  return (
    <div
      className={`fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        bookingFormOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-[#4A3F36]">Booking</h2>
        <button
          onClick={toggleBookingForm}
          className="text-2xl text-gray-600 hover:text-gray-900"
          aria-label="Close booking drawer"
        >
          &times;
        </button>
      </div>

      {/* Drawer Body */}
      <div className="p-6 overflow-y-auto h-full space-y-6">
        {/* Dates Section */}
        <div>
          <h4 className="text-sm font-semibold mb-2 text-[#4A3F36] uppercase">Dates</h4>

          {/* Input Field */}
          <div className="relative max-w-full mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="default-datepicker"
              type="text"
              value={selectedDate}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#C46A26] focus:border-[#C46A26] block w-full pl-10 p-2.5"
              placeholder="Select date"
              aria-label="Selected date"
            />
          </div>

          {/* Inline Calendar */}
          <div id="datepicker-inline" data-date={selectedDate} data-inline="true"></div>
        </div>
      </div>
    </div>
  );
};

// Default export for the page
export default function Page() {
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  const toggleBookingForm = () => {
    setBookingFormOpen(!bookingFormOpen);
  };

  return (
    <div>
      {/* Your main page content */}
      <button onClick={toggleBookingForm} className="bg-blue-500 text-white p-2 rounded">
        Open Booking Drawer
      </button>
      
      {/* Render the BookingDrawer component */}
      <BookingDrawer 
        bookingFormOpen={bookingFormOpen} 
        toggleBookingForm={toggleBookingForm} 
      />
    </div>
  );
}