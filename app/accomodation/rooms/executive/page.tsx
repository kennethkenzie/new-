"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/navbar/page";
import Footer from "../../../components/footer/page";
import EnhancedChatbot from "../../../components/enhanced-chatbot/EnhancedChatbot";
import { FaBed, FaWifi, FaTv, FaShower, FaParking, FaChevronLeft, FaChevronRight, FaConciergeBell, FaWineGlassAlt } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import { BiFridge } from "react-icons/bi";

const ExecutiveRoomPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const amenities = [
    { icon: <FaBed className="text-[#C49A6C]" />, name: "King Size Bed" },
    { icon: <FaWifi className="text-[#C49A6C]" />, name: "Premium WiFi" },
    { icon: <FaTv className="text-[#C49A6C]" />, name: "32\" Smart TV" },
    { icon: <FaShower className="text-[#C49A6C]" />, name: "Luxury Rainfall Shower" },
    { icon: <FaConciergeBell className="text-[#C49A6C]" />, name: "24/7 Concierge" },
    { icon: <FaWineGlassAlt className="text-[#C49A6C]" />, name: "Welcome Drink" },
    { icon: <FaParking className="text-[#C49A6C]" />, name: "Valet Parking" },
    { icon: <MdKitchen className="text-[#C49A6C]" size={20} />, name: "Mini Kitchen" },
    { icon: <BiFridge className="text-[#C49A6C]" size={20} />, name: "Mini Fridge" },
  ];

  const galleryImages = [
    "https://ik.imagekit.io/67mog36hf/Labrezi/EXECTIVE_BIG_ROOM.png?updatedAt=1731996591628",
    "https://ik.imagekit.io/67mog36hf/Labrezi/executive-room-2.jpg?updatedAt=1234567890",
    "https://ik.imagekit.io/67mog36hf/Labrezi/executive-bathroom.jpg?updatedAt=1234567890",
    "https://ik.imagekit.io/67mog36hf/Labrezi/executive-lounge.jpg?updatedAt=1234567890"
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
      <div className="relative h-64 md:h-[500px] w-full">
        <Image
          src={galleryImages[0]}
          alt="Executive Room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Executive Suite</h1>
            <p className="text-lg md:text-2xl">Luxury redefined</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          {/* Room Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-[#4A3F36] mb-2">Executive Luxury Suite</h2>
                  <p className="text-[#C49A6C] font-medium">40 m² of refined living space</p>
                </div>
                <span className="bg-[#A80532] text-white px-3 py-1 rounded-full text-sm">BESTSELLER</span>
              </div>

              <p className="text-[#4A3F36] mb-6 md:mb-8 text-lg">
                Our premier executive suites offer an unparalleled experience with separate living and sleeping areas,
                premium furnishings, and exclusive amenities designed for discerning travelers.
              </p>

              {/* Highlights */}
              <div className="mb-8 md:mb-12">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-4 md:mb-6 border-b border-[#F6F0E5] pb-2">Suite Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Separate living area with sofa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Premium Egyptian cotton linens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Executive work desk with ergonomic chair</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Floor-to-ceiling windows with panoramic views</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Premium bath amenities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Daily turndown service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Well-equipped mini kitchen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                    <span className="text-[#4A3F36]">Mini fridge with complimentary beverages</span>
                  </li>
                </ul>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-bold text-[#4A3F36] mb-6 md:mb-8 border-b border-[#F6F0E5] pb-2">Exclusive Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {amenities.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 bg-[#f9f9f9] rounded-lg border border-[#F6F0E5]">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <p className="text-[#4A3F36] font-medium">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-4 border border-[#C49A6C]">
              <h3 className="text-2xl font-bold text-[#4A3F36] mb-4">Reserve Your Suite</h3>
              <p className="text-[#C49A6C] text-2xl font-medium mb-6">UGX 250,000 / night</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[#4A3F36] mb-2">Check-in</label>
                  <input 
                    type="date" 
                    className="w-full p-3 border border-[#C49A6C] rounded focus:outline-none focus:ring-1 focus:ring-[#A80532]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A3F36] mb-2">Check-out</label>
                  <input 
                    type="date" 
                    className="w-full p-3 border border-[#C49A6C] rounded focus:outline-none focus:ring-1 focus:ring-[#A80532]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A3F36] mb-2">Guests</label>
                  <select className="w-full p-3 border border-[#C49A6C] rounded focus:outline-none focus:ring-1 focus:ring-[#A80532]">
                    <option>2 Adults</option>
                    <option>2 Adults + 1 Child</option>
                    <option>2 Adults + 2 Children</option>
                  </select>
                </div>
              </div>

              <Link 
                href="/booking?room=executive"
                className="block w-full bg-[#A80532] text-white py-3 rounded hover:bg-[#8A0425] transition-colors font-bold text-center"
              >
                BOOK SUITE NOW
              </Link>

              <div className="mt-4 text-center text-sm text-[#4A3F36]">
                <p>Includes complimentary:</p>
                <p className="text-[#C49A6C]">• Breakfast for two • Airport transfers</p>
              </div>
            </div>
          </div>

          {/* Carousel Gallery Section */}
          <div className="mt-16 md:mt-24">
            <h2 className="text-3xl font-bold text-[#4A3F36] mb-8 md:mb-12 text-center">Executive Experience</h2>
            <div className="relative w-full h-80 md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`Executive Suite ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
                priority
              />
              
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <FaChevronRight className="text-xl" />
              </button>
              
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-[#C49A6C]' : 'bg-white/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Policies Section */}
          <div className="mt-16 md:mt-20 bg-white p-8 md:p-12 rounded-lg shadow-sm border border-[#F6F0E5]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#4A3F36] mb-6 md:mb-8 text-center">Executive Privileges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Priority Services</h3>
                <ul className="space-y-2 text-[#4A3F36]">
                  <li>Express check-in/out</li>
                  <li>24-hour room service</li>
                  <li>Personal concierge</li>
                  <li>Late checkout upon request</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Exclusive Access</h3>
                <ul className="space-y-2 text-[#4A3F36]">
                  <li>Executive lounge</li>
                  <li>Complimentary spa access</li>
                  <li>Business center privileges</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Flexible Policies</h3>
                <ul className="space-y-2 text-[#4A3F36]">
                  <li>48-hour cancellation policy</li>
                  <li>Complimentary room upgrade*</li>
                  <li>Special requests accommodated</li>
                  <li>Dedicated executive support</li>
                </ul>
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

export default ExecutiveRoomPage;