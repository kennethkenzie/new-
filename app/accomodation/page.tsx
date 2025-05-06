"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import Image from "next/image";
import {
  FaUserFriends,
  FaWifi,
  FaBed,
  FaUtensils,
  FaRulerCombined,
  FaShower,
} from "react-icons/fa";

const categories = [
  { label: "View All", value: "all" },
  { label: "Single Room", value: "single" },
  { label: "Double Room", value: "double" },
  { label: "Executive Room", value: "executive" },
];

const AccommodationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const checkIn = searchParams.get("checkIn");
        const checkOut = searchParams.get("checkOut");
        const adults = searchParams.get("adults");
        const children = searchParams.get("children");

        let apiUrl = "/api/rooms/availability";
        if (checkIn && checkOut) {
          apiUrl += `?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setRooms(data.availableRooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRooms();
  }, [searchParams]);

  const filteredRooms =
    selectedCategory === "all"
      ? rooms
      : rooms.filter((room) => room.category === selectedCategory);

  return (
    <section className="bg-white min-h-screen">
      <Navbar />

      <div
        className="relative w-full h-64 md:h-150 bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/67mog36hf/Labrezi/MYC_8072.jpg?updatedAt=1731996861554')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold uppercase">
            Our Rooms & Suites
          </h1>
          <p className="mt-2 text-sm md:text-base">
            Comfort. Elegance. Space to Unwind.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-[#4A3F36] text-lg leading-relaxed">
            Experience comfort and convenience in our range of hotel
            accommodations. From cozy single rooms to spacious executive suites,
            enjoy elegance and thoughtful design in every stay.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 border-b border-[#F6F0E5] pb-6 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`text-sm font-semibold uppercase transition-colors ${
                selectedCategory === cat.value
                  ? "text-[#A80532] border-b-2 border-[#A80532]"
                  : "text-[#4A3F36] hover:text-[#A80532]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#4A3F36]">Loading available rooms...</p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#4A3F36]">
              No rooms available for the selected dates.
            </p>
            <p className="text-sm text-[#4A3F36]/70 mt-2">
              Please try different dates or adjust your search criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredRooms.map((room, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto border border-[#F6F0E5]"
              >
                <div className="w-full lg:w-1/2 p-8 space-y-4">
                  <p className="text-[#C49A6C] font-semibold text-sm">
                    UGX {room.price?.toLocaleString() || "80,000"} / Night
                  </p>
                  <h2 className="text-2xl font-bold text-[#4A3F36]">
                    {room.name}
                  </h2>
                  <p className="text-[#4A3F36]/80 text-sm">
                    {room.description ||
                      `Detailed Description of ${room.name}. General overview of size and amenities offered for your comfort.`}
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4 text-sm text-[#4A3F36]">
                    <div className="flex items-center space-x-2">
                      <FaUserFriends className="text-[#C49A6C]" />
                      <span>{room.maxOccupancy} Persons</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaWifi className="text-[#C49A6C]" />
                      <span>Free Wifi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaBed className="text-[#C49A6C]" />
                      <span>{room.bedType || "Comfortable bed"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUtensils className="text-[#C49A6C]" />
                      <span>Breakfast</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRulerCombined className="text-[#C49A6C]" />
                      <span>{room.size || "Spacious room"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaShower className="text-[#C49A6C]" />
                      <span>Rainfall Shower</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6">
                    <a
                      href="#"
                      className="text-sm text-[#4A3F36] underline hover:text-[#A80532]"
                    >
                      DETAILS →
                    </a>
                    <button
                      className="bg-[#A80532] text-white px-6 py-2 uppercase text-sm tracking-wider hover:bg-[#8A0425] transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 h-80 lg:h-auto relative">
                  <Image
                    src={
                      room.images?.[0] ||
                      "https://ik.imagekit.io/67mog36hf/Labrezi/LABREZI_SUITES_a1.png?updatedAt=1731996616563"
                    }
                    alt={room.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default AccommodationPage;
