"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/navbar/page";
import Footer from "../../../components/footer/page";
import EnhancedChatbot from "../../../components/enhanced-chatbot/EnhancedChatbot";
import { FaBed, FaWifi, FaTv, FaShower, FaParking, FaUtensils, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SingleRoomPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const amenities = [
    { icon: <FaBed className="text-[#C49A6C]" />, name: "Comfortable Single Bed" },
    { icon: <FaWifi className="text-[#C49A6C]" />, name: "High-Speed WiFi" },
    { icon: <FaTv className="text-[#C49A6C]" />, name: "Smart TV" },
    { icon: <FaShower className="text-[#C49A6C]" />, name: "Rainfall Shower" },
    { icon: <FaParking className="text-[#C49A6C]" />, name: "Free Parking" },
    { icon: <FaUtensils className="text-[#C49A6C]" />, name: "Breakfast Included" },
  ];

  const galleryImages = [
    "https://ik.imagekit.io/67mog36hf/Labrezi/LABREZI_SUITES_a1.png?updatedAt=1731996616563",
    "https://ik.imagekit.io/67mog36hf/Labrezi/single-room-2.jpg?updatedAt=1234567890",
    "https://ik.imagekit.io/67mog36hf/Labrezi/single-room-3.jpg?updatedAt=1234567890",
    "https://ik.imagekit.io/67mog36hf/Labrezi/single-room-bathroom.jpg?updatedAt=1234567890"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[400px] w-full">
        <Image
          src={galleryImages[0]}
          alt="Single Room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Single Room</h1>
            <p className="text-lg md:text-xl">Cozy comfort for the solo traveler</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Room Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-[#4A3F36] mb-4 md:mb-6">Comfortable Single Accommodation</h2>
              <p className="text-[#4A3F36] mb-4 md:mb-6">
                Our thoughtfully designed single rooms offer everything you need for a relaxing stay. 
                Each 14 m² room features a comfortable single bed, workspace, and modern amenities 
                to ensure your comfort.
              </p>
              <p className="text-[#4A3F36] mb-6 md:mb-8">
                Perfect for business travelers or solo adventurers, our single rooms provide a peaceful 
                retreat after a day of work or exploration in the city.
              </p>

              {/* Highlights */}
              <div className="mb-8 md:mb-12">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-3 md:mb-4">Room Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">14 m² of comfortable space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">City view or courtyard view options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Ergonomic workspace with charging ports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Soundproof windows for peaceful rest</span>
                  </li>
                </ul>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-bold text-[#4A3F36] mb-4 md:mb-6">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                  {amenities.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-2 md:p-3 bg-[#f9f9f9] rounded">
                      <div className="text-2xl mb-1 md:mb-2">{item.icon}</div>
                      <p className="text-[#4A3F36] text-xs md:text-sm">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#4A3F36] mb-3 md:mb-4">Book This Room</h3>
              <p className="text-[#C49A6C] text-lg md:text-xl font-medium mb-4 md:mb-6">UGX 80,000 / night</p>
              
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div>
                  <label className="block text-[#4A3F36] text-sm md:text-base mb-1">Check-in</label>
                  <input 
                    type="date" 
                    className="w-full p-2 text-sm md:text-base border border-[#C49A6C] rounded focus:outline-none focus:ring-1 focus:ring-[#A80532]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A3F36] text-sm md:text-base mb-1">Check-out</label>
                  <input 
                    type="date" 
                    className="w-full p-2 text-sm md:text-base border border-[#C49A6C] rounded focus:outline-none focus:ring-1 focus:ring-[#A80532]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A3F36] text-sm md:text-base mb-1">Guests</label>
                  <select className="w-full p-2 text-sm md:text-base border border-[#C49A6C] rounded focus:outline-none focus:ring-1 focus:ring-[#A80532]">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                  </select>
                </div>
              </div>

              <Link 
                href="/booking?room=single"
                className="block w-full bg-[#A80532] text-white py-2 md:py-3 rounded hover:bg-[#8A0425] transition-colors text-sm md:text-base text-center"
              >
                BOOK NOW
              </Link>
            </div>
          </div>

          {/* Carousel Gallery Section */}
          <div className="mt-12 md:mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#4A3F36] mb-6 md:mb-8 text-center">Gallery</h2>
            <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
              {/* Carousel Image */}
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`Single Room ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
              />
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-[#C49A6C]' : 'bg-white/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Policies Section */}
          <div className="mt-12 md:mt-16 bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-[#4A3F36] mb-4 md:mb-6">Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-bold text-[#4A3F36] mb-2 md:mb-3">Cancellation</h3>
                <p className="text-[#4A3F36] text-sm md:text-base">
                  Free cancellation up to 24 hours before check-in. Late cancellations may incur a one-night charge.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#4A3F36] mb-2 md:mb-3">Check-in/out</h3>
                <p className="text-[#4A3F36] text-sm md:text-base">
                  Check-in: 2:00 PM | Check-out: 11:00 AM. Early check-in/late check-out subject to availability.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#4A3F36] mb-2 md:mb-3">Other</h3>
                <p className="text-[#4A3F36] text-sm md:text-base">
                  Non-smoking rooms. Maximum occupancy: 2 guests. Children under 12 stay free with adults.
                </p>
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

export default SingleRoomPage;