"use client";

import React, { useState, useMemo } from "react";
import { FaUtensils, FaWineGlassAlt, FaConciergeBell, FaBroom, FaLaptop, FaToiletPaper, FaShuttleVan, FaWifi, FaPhoneAlt, FaParking, FaCoffee } from "react-icons/fa";

function FacilitySection() {
  const [selected, setSelected] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { label: "All Facilities", value: "all" },
    { label: "Dining", value: "dining" },
    { label: "Services", value: "services" },
    { label: "Amenities", value: "amenities" },
    { label: "Business", value: "business" },
    { label: "Transport", value: "transport" },
  ];

  const facilities = [
    {
      title: "Restaurant",
      category: "dining",
      hours: "6:00 AM - 11:00 PM",
      description: "Our gourmet restaurant offers a variety of local and international cuisine prepared by expert chefs.",
      note: "Reservations Recommended",
      icon: <FaUtensils className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3753.JPG?updatedAt=1746112402609",
    },
    {
      title: "Bar & Lounge",
      category: "dining",
      hours: "4:00 PM - 1:00 AM",
      description: "Relax with premium cocktails, fine wines, and light snacks in our elegant bar setting.",
      note: "Happy Hour 5-7 PM",
      icon: <FaWineGlassAlt className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3762.JPG?updatedAt=1746112432586",
    },
    {
      title: "Free Breakfast",
      category: "dining",
      hours: "6:00 AM - 10:30 AM",
      description: "Start your day with our complimentary breakfast buffet featuring fresh local produce.",
      note: "Included with Stay",
      icon: <FaCoffee className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3759.JPG?updatedAt=1746112402487",
    },
    {
      title: "Room Service",
      category: "services",
      hours: "24 hours",
      description: "Enjoy meals and snacks delivered to your room at any time of day or night.",
      note: "24/7 Availability",
      icon: <FaConciergeBell className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3700.JPG?updatedAt=1746112291697",
    },
    {
      title: "Daily Cleaning",
      category: "services",
      hours: "9:00 AM - 5:00 PM",
      description: "Professional housekeeping services to keep your room fresh and tidy throughout your stay.",
      note: "Turndown Service Available",
      icon: <FaBroom className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3689.JPG?updatedAt=1746112250296",
    },
    {
      title: "Concierge",
      category: "services",
      hours: "24/7",
      description: "Our concierge team can arrange tours, transportation, dining, and special requests.",
      note: "Multilingual Staff",
      icon: <FaConciergeBell className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3617.JPG?updatedAt=1746112150175",
    },
    {
      title: "Workspace/Desk",
      category: "business",
      hours: "24 hours",
      description: "Comfortable workspaces with ergonomic chairs and ample lighting for productivity.",
      note: "Power Outlets Available",
      icon: <FaLaptop className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3728.JPG?updatedAt=1746112335766",
    },
    {
      title: "Conference Rooms",
      category: "business",
      hours: "7:00 AM - 9:00 PM",
      description: "Professional meeting spaces equipped with modern technology for your business needs.",
      note: "Video Conferencing Available",
      icon: <FaLaptop className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3738.JPG?updatedAt=1746112365918",
    },
    {
      title: "Toiletries",
      category: "amenities",
      hours: "24 hours",
      description: "Premium quality toiletries provided in every room for your comfort.",
      note: "Eco-Friendly Options",
      icon: <FaToiletPaper className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3703.JPG?updatedAt=1746112294035",
    },
    {
      title: "Free WiFi",
      category: "amenities",
      hours: "24 hours",
      description: "High-speed internet access throughout the hotel for all your devices.",
      note: "Premium Speed Available",
      icon: <FaWifi className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/wifi.jpg?updatedAt=1234567890",
    },
    {
      title: "Intercom",
      category: "amenities",
      hours: "24 hours",
      description: "Direct communication with reception and services from your room.",
      note: "Multilingual Support",
      icon: <FaPhoneAlt className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/LMRL3268.JPG?updatedAt=1746107708393",
    },
    {
      title: "Shuttle Service",
      category: "transport",
      hours: "7:00 AM - 10:00 PM",
      description: "Complimentary shuttle service to key locations in the city.",
      note: "Schedule Available",
      icon: <FaShuttleVan className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/shuttle.jpg?updatedAt=1234567890",
    },
    {
      title: "Parking",
      category: "transport",
      hours: "24 hours",
      description: "Secure parking facilities for guests, including valet service.",
      note: "Reservations Recommended",
      icon: <FaParking className="text-[#C49A6C]" />,
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3617.JPG?updatedAt=1746112150175",
    },
  ];

  const handleCategoryChange = (value) => {
    setSelected(value);
    setShowAll(false);
    setSearchQuery("");
  };

  const getRandomFacilities = () => {
    // Use a deterministic approach to avoid hydration mismatch
    // Show first 3 facilities instead of random ones
    return facilities.slice(0, 3);
  };

  const filteredFacilities = useMemo(() => {
    // First filter by category
    let result = selected === "all" 
      ? [...facilities] 
      : facilities.filter(f => f.category === selected);

    // Then filter by search query if it exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.title.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.note.toLowerCase().includes(query)
      );
    }

    // If showing all facilities in "all" category without search, return all
    if (selected === "all" && !searchQuery && showAll) {
      return result;
    }

    // If showing limited view in "all" category without search, return random 3
    if (selected === "all" && !searchQuery && !showAll) {
      return getRandomFacilities();
    }

    return result;
  }, [selected, showAll, searchQuery, facilities]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // When searching, show all matching results
    setShowAll(true);
  };

  return (
    <section className="py-16 bg-[#ffffff]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#4A3F36]">Hotel Facilities</h2>
          <div className="w-24 h-1 bg-[#4A3F36] mx-auto my-4"></div>
          <p className="text-[#4A3F36] max-w-2xl mx-auto">
            Discover our world-class amenities designed for your comfort and enjoyment
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search facilities..."
              className="w-full pl-10 pr-4 py-2 border border-[#C49A6C] text-[#4A3F36] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A80532]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-[#4A3F36]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => handleCategoryChange(c.value)}
                className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selected === c.value
                    ? "bg-[#A80532] text-white"
                    : "bg-[#F6F0E5] text-[#4A3F36]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility, i) => (
            <div
              key={i}
              className="facility-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">{facility.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3 text-sm text-gray-600">
                  {facility.icon}
                  <p className="ml-2">Open daily {facility.hours}</p>
                </div>
                <p className="text-gray-600 mb-4">{facility.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#A80532] font-medium">{facility.note}</span>
                  <a href="#" className="text-[#4A3F36] hover:text-[#A80532] text-sm font-medium">
                    Explore →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected === "all" && !searchQuery && !showAll && filteredFacilities.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-block border-2 border-[#4A3F36] text-[#4A3F36] uppercase px-8 py-3 hover:bg-[#4A3F36] hover:text-white transition-colors duration-300"
            >
              View More Facilities
            </button>
          </div>
        )}

        {showAll && !searchQuery && selected === "all" && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(false)}
              className="inline-block border-2 border-[#4A3F36] text-[#4A3F36] uppercase px-8 py-3 hover:bg-[#4A3F36] hover:text-white transition-colors duration-300"
            >
              Show Less
            </button>
          </div>
        )}

        {searchQuery && filteredFacilities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#4A3F36]">No facilities found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FacilitySection;