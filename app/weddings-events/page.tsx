"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaHeart, FaUsers, FaCamera, FaMusic, FaUtensils, FaCalendarAlt, FaStar, FaGift } from "react-icons/fa";

const WeddingsEventsPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const weddingPackages = [
    {
      id: "intimate",
      name: "Intimate Celebration",
      price: "UGX 15,000,000",
      guests: "Up to 50 guests",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/intimate-wedding.jpg",
      features: [
        "Private ceremony space",
        "Bridal suite for preparation",
        "Professional wedding coordinator",
        "Floral arrangements",
        "3-course reception dinner",
        "Wedding cake",
        "Photography session (2 hours)",
        "Complimentary honeymoon suite"
      ]
    },
    {
      id: "classic",
      name: "Classic Wedding",
      price: "UGX 35,000,000",
      guests: "Up to 150 guests", 
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/classic-wedding.jpg",
      popular: true,
      features: [
        "Grand ballroom ceremony & reception",
        "Bridal party preparation suites",
        "Dedicated wedding coordinator",
        "Premium floral & decor package",
        "5-course plated dinner or buffet",
        "Multi-tier wedding cake",
        "Professional DJ & sound system",
        "Photography & videography (6 hours)",
        "Honeymoon suite (2 nights)",
        "Welcome cocktail hour"
      ]
    },
    {
      id: "luxury",
      name: "Luxury Celebration", 
      price: "UGX 60,000,000",
      guests: "Up to 250 guests",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/luxury-wedding.jpg",
      features: [
        "Exclusive venue access",
        "Multiple ceremony & reception venues",
        "Bridal party villa accommodation",
        "Personal wedding planner",
        "Designer floral & lighting",
        "Premium 7-course dinner",
        "Custom wedding cake design",
        "Live band & entertainment",
        "Professional photography & videography",
        "Luxury honeymoon suite (3 nights)",
        "Spa treatments for couple",
        "Welcome reception",
        "Transportation for guests"
      ]
    }
  ];

  const eventTypes = [
    {
      icon: <FaHeart className="text-4xl text-[#C46A26]" />,
      title: "Weddings",
      description: "Create magical moments with our bespoke wedding packages in stunning settings.",
      features: ["Outdoor garden ceremonies", "Elegant ballroom receptions", "Beachfront celebrations"]
    },
    {
      icon: <FaUsers className="text-4xl text-[#C46A26]" />,
      title: "Corporate Events",
      description: "Professional venues and services for conferences, meetings, and corporate celebrations.",
      features: ["State-of-the-art AV equipment", "Business center access", "Catering options"]
    },
    {
      icon: <FaGift className="text-4xl text-[#C46A26]" />,
      title: "Special Celebrations",
      description: "Anniversaries, birthdays, and milestone celebrations in elegant surroundings.",
      features: ["Customizable decor", "Personal event coordinator", "Specialty menus"]
    },
    {
      icon: <FaMusic className="text-4xl text-[#C46A26]" />,
      title: "Cultural Events",
      description: "Authentic Ugandan cultural celebrations and traditional ceremony venues.",
      features: ["Traditional decorations", "Local cuisine options", "Cultural entertainment"]
    }
  ];

  const venues = [
    {
      name: "Grand Ballroom",
      capacity: "250 guests",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/grand-ballroom.jpg",
      description: "Elegant ballroom with crystal chandeliers and panoramic views.",
      features: ["1,200 sq ft", "Built-in stage", "Professional lighting", "Climate controlled"]
    },
    {
      name: "Garden Pavilion", 
      capacity: "150 guests",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/garden-pavilion.jpg",
      description: "Romantic outdoor setting surrounded by lush tropical gardens.",
      features: ["Open-air design", "Garden views", "Natural lighting", "Weather protection"]
    },
    {
      name: "Lakeside Terrace",
      capacity: "100 guests",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/lakeside-terrace.jpg", 
      description: "Intimate waterfront venue perfect for sunset ceremonies.",
      features: ["Lake views", "Sunset backdrop", "Intimate setting", "Photo opportunities"]
    }
  ];

  const services = [
    { icon: <FaCalendarAlt />, title: "Event Planning", description: "Complete coordination from concept to execution" },
    { icon: <FaUtensils />, title: "Catering Services", description: "Gourmet cuisine and beverage packages" },
    { icon: <FaCamera />, title: "Photography", description: "Professional photographers and videographers" },
    { icon: <FaMusic />, title: "Entertainment", description: "DJ services, live bands, and cultural performances" },
    { icon: <FaHeart />, title: "Decor & Flowers", description: "Beautiful arrangements and venue styling" },
    { icon: <FaStar />, title: "Special Touches", description: "Personalized details to make your event unique" }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-96 md:h-[600px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/weddings-events-hero.jpg"
          alt="Weddings & Events at La Brezi Suites"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Weddings & Events</h1>
            <p className="text-xl md:text-2xl mb-6">Where love stories begin and memories are made</p>
            <Link 
              href="#packages"
              className="inline-block bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              EXPLORE PACKAGES
            </Link>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-6">Celebrate Life's Special Moments</h2>
          <p className="text-lg text-[#4A3F36] mb-8 max-w-4xl mx-auto">
            At La Brezi Suites, we understand that your special day deserves nothing less than perfection. 
            Our dedicated events team specializes in creating unforgettable experiences, from intimate 
            gatherings to grand celebrations, all set against the backdrop of our stunning venue.
          </p>
          <div className="w-24 h-1 bg-[#C46A26] mx-auto"></div>
        </div>
      </div>

      {/* Event Types */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Event Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((type, index) => (
              <div key={index} className="text-center p-6 bg-[#F6F0E5] rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-[#4A3F36] mb-3">{type.title}</h3>
                <p className="text-[#4A3F36] mb-4 text-sm">{type.description}</p>
                <ul className="text-xs text-[#4A3F36] space-y-1">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <span className="w-1 h-1 bg-[#C46A26] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wedding Packages */}
      <div id="packages" className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Wedding Packages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {weddingPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-[#A80532] text-white px-3 py-1 rounded-full text-sm z-10 flex items-center">
                    <FaStar className="mr-1" />
                    POPULAR
                  </div>
                )}
                
                <div className="relative h-48 w-full">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#4A3F36] mb-2">{pkg.name}</h3>
                  <p className="text-[#C46A26] text-2xl font-bold mb-2">{pkg.price}</p>
                  <p className="text-[#4A3F36] text-sm mb-4">{pkg.guests}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-[#4A3F36] mb-3">Package Includes:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-[#4A3F36]">
                          <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-1.5 mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => setSelectedPackage(pkg.id)}
                      className="w-full bg-[#4A3F36] text-white py-2 rounded hover:bg-[#3A322A] transition-colors"
                    >
                      View Details
                    </button>
                    <Link 
                      href={`/contact?package=${pkg.id}`}
                      className="block w-full bg-[#A80532] text-white py-2 rounded hover:bg-[#8A0425] transition-colors font-bold text-center"
                    >
                      REQUEST QUOTE
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Venues */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Event Venues</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <div key={index} className="bg-[#F6F0E5] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{venue.name}</h3>
                  <p className="text-[#C46A26] font-medium mb-3">{venue.capacity}</p>
                  <p className="text-[#4A3F36] text-sm mb-4">{venue.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {venue.features.map((feature, i) => (
                      <span key={i} className="text-xs text-[#4A3F36] bg-white px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-[#4A3F36] text-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Complete Event Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-3xl text-[#C46A26] mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Love Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#C46A26] rounded-full mr-4 flex items-center justify-center">
                  <FaHeart className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A3F36]">Sarah & John</h4>
                  <p className="text-sm text-[#C46A26]">Classic Wedding Package</p>
                </div>
              </div>
              <p className="text-[#4A3F36] italic">
                "La Brezi Suites made our dream wedding come true. From the stunning garden ceremony to the elegant reception, 
                every detail was perfect. Our guests are still talking about the beautiful venue and exceptional service."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#C46A26] rounded-full mr-4 flex items-center justify-center">
                  <FaUsers className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A3F36]">Tech Solutions Ltd.</h4>
                  <p className="text-sm text-[#C46A26]">Corporate Event</p>
                </div>
              </div>
              <p className="text-[#4A3F36] italic">
                "Outstanding venue for our annual company conference. The professional facilities, catering, and 
                event coordination exceeded our expectations. Will definitely be returning next year."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Perfect Event?</h2>
          <p className="text-lg mb-6">
            Our experienced events team is here to help you create unforgettable memories. 
            Contact us today to start planning your special celebration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact?inquiry=events"
              className="bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              GET CONSULTATION
            </Link>
            <Link 
              href="/gallery"
              className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-8 py-3 rounded transition-colors"
            >
              VIEW GALLERY
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default WeddingsEventsPage;