"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaBed, FaUsers, FaWifi, FaTv, FaParking, FaStar } from "react-icons/fa";

const AccommodationPage = () => {
  const rooms = [
    {
      id: "single",
      title: "Single Room",
      subtitle: "Perfect for the solo traveler",
      description: "Cozy 14m² room with all essential amenities, designed for comfort and productivity. Features a comfortable single bed, workspace, and modern bathroom.",
      price: "UGX 80,000",
      originalPrice: "UGX 100,000",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/LABREZI_SUITES_a1.png?updatedAt=1731996616563",
      maxGuests: 1,
      size: "14 m²",
      amenities: ["WiFi", "TV", "Parking", "Breakfast"],
      features: [
        "Comfortable single bed",
        "Work desk with chair",
        "City or courtyard view",
        "Modern bathroom with shower",
        "Complimentary toiletries",
        "Room service available"
      ],
      popular: false
    },
    {
      id: "double",
      title: "Double Room",
      subtitle: "Spacious comfort for two",
      description: "Well-appointed 20m² room featuring two comfortable beds, perfect for friends or colleagues traveling together. Includes seating area and ample storage.",
      price: "UGX 120,000",
      originalPrice: "UGX 150,000",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_8040.jpg?updatedAt=1731997026952",
      maxGuests: 3,
      size: "20 m²",
      amenities: ["WiFi", "TV", "Parking", "Breakfast"],
      features: [
        "Two comfortable beds",
        "Seating area",
        "Ample storage space",
        "Large windows with natural light",
        "Modern bathroom",
        "Mini refrigerator"
      ],
      popular: true
    },
    {
      id: "executive",
      title: "Executive Suite",
      subtitle: "Luxury redefined",
      description: "Premier 40m² suite with separate living area, premium furnishings, and exclusive amenities. The ultimate choice for discerning travelers seeking luxury.",
      price: "UGX 250,000",
      originalPrice: "UGX 300,000",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/EXECTIVE_BIG_ROOM.png?updatedAt=1731996591628",
      maxGuests: 4,
      size: "40 m²",
      amenities: ["WiFi", "TV", "Parking", "Concierge", "Kitchenette"],
      features: [
        "Separate living and sleeping areas",
        "King-size bed with premium linens",
        "Executive work desk",
        "Mini kitchen with refrigerator",
        "Premium bathroom amenities",
        "24/7 concierge service",
        "Welcome drink included",
        "Daily turndown service"
      ],
      popular: false
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[500px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/accommodation-hero.jpg"
          alt="La Brezi Suites Accommodation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Our Accommodations</h1>
            <p className="text-lg md:text-2xl">Luxury and comfort tailored to your needs</p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-[#F6F0E5] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#4A3F36] mb-6">Experience Exceptional Comfort</h2>
          <p className="text-lg text-[#4A3F36] mb-8">
            Choose from our carefully designed rooms and suites, each offering unique features and amenities 
            to ensure your stay is both comfortable and memorable. From our cozy single rooms to our luxurious 
            executive suites, every accommodation reflects our commitment to excellence.
          </p>
          <div className="w-24 h-1 bg-[#C46A26] mx-auto"></div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-[#F6F0E5] hover:shadow-xl transition-shadow duration-300 relative">
                {room.popular && (
                  <div className="absolute top-4 right-4 bg-[#A80532] text-white px-3 py-1 rounded-full text-sm z-10 flex items-center">
                    <FaStar className="mr-1" />
                    POPULAR
                  </div>
                )}
                
                <div className="relative h-48 md:h-64 w-full">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-[#4A3F36]">{room.title}</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 line-through">{room.originalPrice}</p>
                      <p className="text-[#C46A26] text-xl font-bold">{room.price}</p>
                      <p className="text-sm text-gray-600">per night</p>
                    </div>
                  </div>
                  
                  <p className="text-[#C46A26] text-sm font-medium mb-3">{room.subtitle}</p>
                  <p className="text-[#4A3F36] mb-4 text-sm">{room.description}</p>

                  {/* Room Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center">
                      <FaBed className="text-[#C46A26] mr-2" />
                      <span className="text-[#4A3F36]">{room.size}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="text-[#C46A26] mr-2" />
                      <span className="text-[#4A3F36]">Max {room.maxGuests} guests</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((amenity, index) => (
                      <span key={index} className="bg-[#F6F0E5] text-[#4A3F36] px-2 py-1 rounded text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#4A3F36] mb-2">Key Features:</h4>
                    <ul className="text-xs text-[#4A3F36] space-y-1">
                      {room.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-[#C46A26] rounded-full mt-1.5 mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link 
                      href={`/accommodation/rooms/${room.id}`}
                      className="block w-full text-center bg-[#4A3F36] text-white py-2 rounded hover:bg-[#3A322A] transition-colors"
                    >
                      View Details
                    </Link>
                    <Link 
                      href={`/booking?room=${room.id}`}
                      className="block w-full text-center bg-[#A80532] text-white py-2 rounded hover:bg-[#8A0425] transition-colors font-bold"
                    >
                      BOOK NOW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="bg-[#F6F0E5] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#4A3F36] mb-8 text-center">Included Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <FaWifi className="text-3xl text-[#C46A26] mx-auto mb-2" />
              <h3 className="font-semibold text-[#4A3F36]">Free WiFi</h3>
              <p className="text-sm text-[#4A3F36]">High-speed internet</p>
            </div>
            <div className="text-center">
              <FaTv className="text-3xl text-[#C46A26] mx-auto mb-2" />
              <h3 className="font-semibold text-[#4A3F36]">Smart TV</h3>
              <p className="text-sm text-[#4A3F36]">Entertainment system</p>
            </div>
            <div className="text-center">
              <FaParking className="text-3xl text-[#C46A26] mx-auto mb-2" />
              <h3 className="font-semibold text-[#4A3F36]">Free Parking</h3>
              <p className="text-sm text-[#4A3F36]">Secure parking space</p>
            </div>
            <div className="text-center">
              <FaBed className="text-3xl text-[#C46A26] mx-auto mb-2" />
              <h3 className="font-semibold text-[#4A3F36]">Premium Bedding</h3>
              <p className="text-sm text-[#4A3F36]">Luxury linens</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking CTA */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
          <p className="text-lg mb-6">
            Experience the comfort and luxury of La Brezi Suites. Book now and enjoy special rates.
          </p>
          <Link 
            href="/booking"
            className="inline-block bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
          >
            BOOK YOUR ROOM
          </Link>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default AccommodationPage;