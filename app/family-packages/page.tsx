"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaChild, FaSwimmingPool, FaGamepad, FaUtensils, FaCamera, FaStar, FaGift, FaHeart } from "react-icons/fa";

const FamilyPackagesPage = () => {
  const familyPackages = [
    {
      id: "weekend-getaway",
      name: "Family Weekend Getaway",
      duration: "2 Days / 1 Night",
      price: "UGX 450,000",
      originalPrice: "UGX 600,000",
      savings: "Save 25%",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/family-weekend.jpg",
      maxFamily: "2 Adults + 2 Children",
      popular: true,
      includes: [
        "1 night in Family Suite",
        "Daily breakfast for family",
        "Kids pool access & activities",
        "Family game room access",
        "Welcome gift for children",
        "Late checkout (2 PM)",
        "Complimentary parking"
      ],
      highlights: [
        "Perfect for weekend escape",
        "Kids activities included",
        "Family-friendly amenities",
        "Special kids menu"
      ]
    },
    {
      id: "adventure-package",
      name: "Family Adventure Package",
      duration: "3 Days / 2 Nights",
      price: "UGX 850,000",
      originalPrice: "UGX 1,100,000",
      savings: "Save 23%",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/family-adventure.jpg", 
      maxFamily: "2 Adults + 3 Children",
      includes: [
        "2 nights in Executive Family Suite",
        "All meals for family (breakfast, lunch, dinner)",
        "Safari day trip with guide",
        "Nature walk & bird watching",
        "Swimming & pool games",
        "Kids entertainment program",
        "Family photo session",
        "Transportation for activities",
        "Welcome basket with local treats"
      ],
      highlights: [
        "Outdoor adventure activities",
        "Educational safari experience",
        "Professional family photos",
        "All meals included"
      ]
    },
    {
      id: "extended-stay",
      name: "Extended Family Vacation",
      duration: "7 Days / 6 Nights",
      price: "UGX 1,800,000",
      originalPrice: "UGX 2,400,000", 
      savings: "Save 25%",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/extended-family.jpg",
      maxFamily: "2 Adults + 4 Children",
      includes: [
        "6 nights in Family Villa",
        "All meals & snacks for family",
        "Daily kids activities program",
        "2 safari excursions",
        "Cultural experience day",
        "Spa treatments for parents (2 hours)",
        "Kids club access",
        "Family cooking class",
        "Laundry service",
        "Airport transfers",
        "Babysitting service (4 hours)",
        "Souvenir shopping trip"
      ],
      highlights: [
        "Ultimate family vacation",
        "Parents relaxation time",
        "Cultural immersion",
        "Comprehensive activities"
      ]
    }
  ];

  const kidsFacilities = [
    {
      icon: <FaSwimmingPool className="text-3xl text-[#C46A26]" />,
      title: "Kids Pool Area",
      description: "Safe shallow pool with fun water features and poolside games",
      ageGroup: "All ages"
    },
    {
      icon: <FaGamepad className="text-3xl text-[#C46A26]" />,
      title: "Game Room",
      description: "Interactive games, board games, and entertainment for children",
      ageGroup: "Ages 3-16"
    },
    {
      icon: <FaChild className="text-3xl text-[#C46A26]" />,
      title: "Kids Club",
      description: "Supervised activities with trained staff and educational programs",
      ageGroup: "Ages 4-12"
    },
    {
      icon: <FaUtensils className="text-3xl text-[#C46A26]" />,
      title: "Family Restaurant",
      description: "Special kids menu with healthy and fun meal options",
      ageGroup: "All ages"
    }
  ];

  const activities = [
    {
      title: "Nature Safari",
      description: "Family-friendly wildlife viewing with expert guides",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/family-safari.jpg",
      duration: "Half Day",
      ages: "All Ages"
    },
    {
      title: "Cultural Experience",
      description: "Learn about local traditions through interactive activities",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/cultural-family.jpg",
      duration: "2 Hours",
      ages: "Ages 5+"
    },
    {
      title: "Cooking Class",
      description: "Fun family cooking sessions with local cuisine",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/family-cooking.jpg",
      duration: "3 Hours", 
      ages: "Ages 8+"
    },
    {
      title: "Pool Games",
      description: "Water activities and poolside entertainment",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/pool-family.jpg",
      duration: "Daily",
      ages: "All Ages"
    }
  ];

  const amenities = [
    "Interconnecting family rooms",
    "Cots and high chairs available",
    "Kids welcome amenities",
    "Babysitting services",
    "Family-friendly dining",
    "Safe play areas",
    "Special kids menus", 
    "Family transportation"
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/family-packages-hero.jpg"
          alt="Family Packages at La Brezi Suites"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Family Packages</h1>
            <p className="text-xl md:text-2xl mb-6">Creating magical memories for the whole family</p>
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
      <div className="bg-[#F6F0E5] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-6">Where Families Come Together</h2>
          <p className="text-lg text-[#4A3F36] mb-8 max-w-4xl mx-auto">
            La Brezi Suites offers specially curated family packages designed to create unforgettable experiences 
            for guests of all ages. From adventurous activities to relaxing amenities, our family-friendly 
            environment ensures everyone has the perfect vacation.
          </p>
          <div className="w-24 h-1 bg-[#C46A26] mx-auto"></div>
        </div>
      </div>

      {/* Family Packages */}
      <div id="packages" className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Family Holiday Packages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {familyPackages.map((pkg) => (
              <div key={pkg.id} className="bg-[#F6F0E5] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-[#A80532] text-white px-3 py-1 rounded-full text-sm z-10 flex items-center">
                    <FaStar className="mr-1" />
                    POPULAR
                  </div>
                )}
                
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm z-10">
                  {pkg.savings}
                </div>

                <div className="relative h-48 w-full">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{pkg.name}</h3>
                  <p className="text-[#C46A26] text-sm mb-2">{pkg.duration}</p>
                  <p className="text-[#4A3F36] text-sm mb-4">{pkg.maxFamily}</p>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-[#A80532]">{pkg.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{pkg.originalPrice}</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-[#4A3F36] mb-3">Package Includes:</h4>
                    <ul className="space-y-2">
                      {pkg.includes.slice(0, 5).map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-[#4A3F36]">
                          <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-1.5 mr-3"></span>
                          {item}
                        </li>
                      ))}
                      {pkg.includes.length > 5 && (
                        <li className="text-sm text-[#C46A26] font-medium">
                          + {pkg.includes.length - 5} more inclusions
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-[#4A3F36] mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((highlight, index) => (
                        <span key={index} className="bg-white text-[#4A3F36] px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-[#4A3F36] text-white py-2 rounded hover:bg-[#3A322A] transition-colors">
                      View Full Details
                    </button>
                    <Link 
                      href={`/booking?package=${pkg.id}`}
                      className="block w-full bg-[#A80532] text-white py-2 rounded hover:bg-[#8A0425] transition-colors font-bold text-center"
                    >
                      BOOK PACKAGE
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kids Facilities */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Kids-Friendly Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kidsFacilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{facility.icon}</div>
                <h3 className="text-lg font-bold text-[#4A3F36] mb-3">{facility.title}</h3>
                <p className="text-[#4A3F36] text-sm mb-3">{facility.description}</p>
                <span className="bg-[#F6F0E5] text-[#4A3F36] px-3 py-1 rounded-full text-xs">
                  {facility.ageGroup}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Family Activities */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Family Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="bg-[#F6F0E5] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32 w-full">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#4A3F36] mb-2">{activity.title}</h3>
                  <p className="text-[#4A3F36] text-sm mb-3">{activity.description}</p>
                  <div className="flex justify-between text-xs text-[#C46A26]">
                    <span>{activity.duration}</span>
                    <span>{activity.ages}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Family Amenities */}
      <div className="bg-[#4A3F36] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Family-Friendly Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <FaHeart className="text-[#C46A26] mr-3" />
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-[#F6F0E5] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-6">Special Family Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FaGift className="text-4xl text-[#C46A26] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#4A3F36] mb-3">Kids Stay Free</h3>
              <p className="text-[#4A3F36] text-sm">
                Children under 12 stay and eat free when sharing a room with 2 paying adults.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FaCamera className="text-4xl text-[#C46A26] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#4A3F36] mb-3">Free Family Photos</h3>
              <p className="text-[#4A3F36] text-sm">
                Complimentary family photo session with every 3+ night family package booking.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FaStar className="text-4xl text-[#C46A26] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#4A3F36] mb-3">Early Bird Discount</h3>
              <p className="text-[#4A3F36] text-sm">
                Book 30 days in advance and save an additional 15% on all family packages.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Family Adventure?</h2>
          <p className="text-lg mb-6">
            Create lasting memories with your loved ones at La Brezi Suites. 
            Book your family package today and start planning your perfect getaway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking?family=true"
              className="bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              BOOK FAMILY PACKAGE
            </Link>
            <Link 
              href="/contact?inquiry=family"
              className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-8 py-3 rounded transition-colors"
            >
              GET CUSTOM QUOTE
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default FamilyPackagesPage;