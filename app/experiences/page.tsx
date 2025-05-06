"use client";

import React from "react";
import Image from "next/image";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import { FaSpa, FaUmbrellaBeach, FaSwimmingPool, FaWineGlassAlt, FaHiking, FaBicycle, FaConciergeBell } from "react-icons/fa";

const ExperiencesPage = () => {
  const experiences = [
    {
      title: "Luxury Spa Retreat",
      description: "Indulge in our signature treatments using organic, locally-sourced ingredients for complete rejuvenation.",
      icon: <FaSpa className="text-4xl text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/spa-experience.jpg",
      highlights: ["Couples massage", "Aromatherapy", "Hot stone therapy", "Facials"]
    },
    {
      title: "Beachfront Relaxation",
      description: "Private beach access with premium loungers and personalized service at our pristine shoreline.",
      icon: <FaUmbrellaBeach className="text-4xl text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/beach-experience.jpg",
      highlights: ["Sunrise yoga", "Beach butler service", "Water sports", "Sunset cocktails"]
    },
    {
      title: "Infinity Pool Experience",
      description: "Our horizon-edge pool with panoramic views and premium cabanas for all-day relaxation.",
      icon: <FaSwimmingPool className="text-4xl text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/pool-experience.jpg",
      highlights: ["Poolside dining", "Chilled towel service", "Signature cocktails", "Daybeds with ocean views"]
    },
    {
      title: "Wine & Dine",
      description: "Curated culinary journeys featuring local flavors and international gourmet experiences.",
      icon: <FaWineGlassAlt className="text-4xl text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/dining-experience.jpg",
      highlights: ["Wine pairing dinners", "Chef's table", "Mixology classes", "Farm-to-table brunches"]
    },
    {
      title: "Adventure Excursions",
      description: "Guided explorations of our stunning natural surroundings for active travelers.",
      icon: <FaHiking className="text-4xl text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/adventure-experience.jpg",
      highlights: ["Rainforest hikes", "Waterfall tours", "Bird watching", "Photography walks"]
    },
    {
      title: "Cultural Immersion",
      description: "Authentic local experiences that connect you with the soul of our destination.",
      icon: <FaConciergeBell className="text-4xl text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/cultural-experience.jpg",
      highlights: ["Cooking classes", "Artisan workshops", "Traditional performances", "Market tours"]
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[500px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/experiences-hero.jpg"
          alt="Hotel Experiences"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Curated Experiences</h1>
            <p className="text-lg md:text-2xl">Discover unforgettable moments</p>
          </div>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="bg-[#f9f9f9] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-[#4A3F36] mb-4">Tailored Experiences</h2>
            <p className="text-lg text-[#4A3F36] max-w-3xl mx-auto">
              From serene relaxation to adventurous explorations, our carefully crafted experiences 
              are designed to create lasting memories during your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {experiences.map((experience, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 md:h-60 w-full">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">{experience.icon}</div>
                    <h3 className="text-xl font-bold text-[#4A3F36]">{experience.title}</h3>
                  </div>
                  <p className="text-[#4A3F36] mb-4">{experience.description}</p>
                  <div className="border-t border-[#F6F0E5] pt-4">
                    <h4 className="text-sm font-semibold text-[#C49A6C] mb-2">HIGHLIGHTS</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {experience.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-2 h-2 bg-[#C49A6C] rounded-full mt-2 mr-2"></span>
                          <span className="text-sm text-[#4A3F36]">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#4A3F36] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Personalize Your Stay</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Our concierge team is ready to craft your perfect itinerary with these experiences 
            and more exclusive offerings tailored to your preferences.
          </p>
          <button className="bg-[#C49A6C] hover:bg-[#A80532] text-white font-bold py-3 px-8 rounded transition-colors duration-300">
            CONTACT CONCIERGE
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ExperiencesPage;