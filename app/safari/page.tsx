"use client";

import React from "react";
import Image from "next/image";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaBinoculars, FaCamera, FaTree, FaSun, FaUtensils, FaHotel } from "react-icons/fa";

const SafarisPage = () => {
  const safariPackages = [
    {
      title: "Big Five Adventure",
      duration: "Full Day",
      price: "UGX 450,000 per person",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/big-five-safari.jpg",
      description: "Encounter Africa's most iconic wildlife in their natural habitat with our expert guides.",
      highlights: [
        "Morning and afternoon game drives",
        "Professional wildlife tracker",
        "Gourmet bush lunch",
        "Guaranteed lion, leopard, and elephant sightings"
      ],
      itinerary: [
        "05:30 - Departure from hotel",
        "06:30 - Sunrise game drive",
        "09:00 - Bush breakfast",
        "11:00 - Guided nature walk",
        "13:00 - Lunch at safari lodge",
        "15:00 - Afternoon game drive",
        "18:30 - Return to hotel"
      ]
    },
    {
      title: "Sunset Wildlife Experience",
      duration: "Half Day",
      price: "UGX 300,000 per person",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/sunset-safari.jpg",
      description: "Witness the magic of golden hour on the savannah with spectacular wildlife viewing.",
      highlights: [
        "Evening game drive",
        "Sundowner cocktails",
        "Spotlight night viewing",
        "Focus on nocturnal species"
      ],
      itinerary: [
        "15:00 - Afternoon tea at lodge",
        "16:00 - Game drive departure",
        "18:00 - Sundowner stop",
        "19:00 - Night drive with spotlights",
        "20:30 - Return to hotel"
      ]
    },
    {
      title: "Photographic Safari",
      duration: "2 Days / 1 Night",
      price: "UGX 850,000 per person",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/photo-safari.jpg",
      description: "Designed for photography enthusiasts with specialized vehicles and expert guidance.",
      highlights: [
        "Photography-equipped vehicle",
        "Professional photographer guide",
        "Golden hour sessions",
        "Editing workshop included"
      ],
      itinerary: [
        "Day 1: 05:30 - Sunrise photo session",
        "Day 1: 10:00 - Breakfast and image review",
        "Day 1: 16:00 - Evening safari",
        "Overnight at bush camp",
        "Day 2: 05:30 - Morning session",
        "Day 2: 11:00 - Return to hotel"
      ]
    }
  ];

  const safariFeatures = [
    {
      icon: <FaBinoculars className="text-3xl text-[#C49A6C]" />,
      title: "Expert Guides",
      description: "Our rangers have 10+ years experience tracking wildlife"
    },
    {
      icon: <FaCamera className="text-3xl text-[#C49A6C]" />,
      title: "Photo Opportunities",
      description: "Specially designed vehicles for optimal photography"
    },
    {
      icon: <FaTree className="text-3xl text-[#C49A6C]" />,
      title: "Eco-Friendly",
      description: "Low-impact tours supporting conservation efforts"
    },
    {
      icon: <FaSun className="text-3xl text-[#C49A6C]" />,
      title: "Golden Hour Focus",
      description: "Timed for best wildlife activity periods"
    },
    {
      icon: <FaUtensils className="text-3xl text-[#C49A6C]" />,
      title: "Gourmet Bush Meals",
      description: "Locally-sourced cuisine in stunning settings"
    },
    {
      icon: <FaHotel className="text-3xl text-[#C49A6C]" />,
      title: "Seamless Logistics",
      description: "Door-to-door service from your hotel"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[500px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/safari-hero.jpg"
          alt="Safari Experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Wildlife Safaris</h1>
            <p className="text-lg md:text-2xl">Journey into the heart of Africa</p>
          </div>
        </div>
      </div>

      {/* Safari Packages */}
      <div className="bg-[#f9f9f9] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-[#4A3F36] mb-4">Curated Safari Experiences</h2>
            <p className="text-lg text-[#4A3F36] max-w-3xl mx-auto">
              From half-day adventures to multi-day immersions, discover Africa&apos;s wildlife with our expert-guided safaris.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {safariPackages.map((safari, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 md:h-60 w-full">
                  <Image
                    src={safari.image}
                    alt={safari.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{safari.title}</h3>
                    <div className="flex justify-between text-[#C49A6C]">
                      <span>{safari.duration}</span>
                      <span>{safari.price}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#4A3F36] mb-4">{safari.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#C49A6C] mb-2">HIGHLIGHTS</h4>
                    <ul className="space-y-2">
                      {safari.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                          <span className="text-[#4A3F36]">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#F6F0E5] pt-4">
                    <h4 className="text-sm font-semibold text-[#C49A6C] mb-2">SAMPLE ITINERARY</h4>
                    <ul className="space-y-2">
                      {safari.itinerary.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#C49A6C] mr-2">•</span>
                          <span className="text-sm text-[#4A3F36]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-6 w-full bg-[#A80532] text-white py-2 rounded hover:bg-[#8A0425] transition-colors">
                    BOOK THIS SAFARI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safari Features */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-[#4A3F36] mb-4">Why Choose Our Safaris</h2>
            <p className="text-lg text-[#4A3F36] max-w-3xl mx-auto">
              We deliver exceptional wildlife experiences with unmatched expertise and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {safariFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{feature.title}</h3>
                <p className="text-[#4A3F36]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#4A3F36] mb-4">Guest Experiences</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C49A6C] mr-4"></div>
                <div>
                  <h4 className="font-bold text-[#4A3F36]">Sarah K.</h4>
                  <p className="text-sm text-[#C49A6C]">Big Five Adventure, March 2023</p>
                </div>
              </div>
              <p className="text-[#4A3F36]">
                &quot;Our guide spotted a leopard within 15 minutes of entering the park! The entire experience was perfectly organized, and the bush lunch was gourmet quality. Worth every shilling!&quot;
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C49A6C] mr-4"></div>
                <div>
                  <h4 className="font-bold text-[#4A3F36]">Michael T.</h4>
                  <p className="text-sm text-[#C49A6C]">Photographic Safari, January 2023</p>
                </div>
              </div>
              <p className="text-[#4A3F36]">
                &quot;As a photography enthusiast, the specialized vehicle and guidance from the photographer guide helped me capture my best wildlife shots ever. The editing workshop was an unexpected bonus!&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default SafarisPage;