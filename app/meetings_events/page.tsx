"use client";

import React from "react";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import {
  FaUsers,
  FaCalendarAlt,
  FaUtensils,
  FaWifi,
  FaParking,
} from "react-icons/fa";
import { MdOutlineVideoCameraFront } from "react-icons/md"; // Replacement for projector icon

// Type definitions
type EventType = {
  name: string;
  description: string;
  icon: React.ReactNode;
  capacity: string;
};

type Amenity = {
  name: string;
  icon: React.ReactNode;
};

const MeetingsEventsPage: React.FC = () => {
  const eventTypes: EventType[] = [
    {
      name: "Corporate Meetings",
      description:
        "Professional settings for business discussions and strategy sessions.",
      icon: <FaUsers className="text-[#C49A6C] text-2xl" />,
      capacity: "Up to 100 attendees",
    },
    {
      name: "Conferences",
      description:
        "Spacious venues equipped for large-scale professional gatherings.",
      icon: <FaUsers className="text-[#C49A6C] text-2xl" />,
      capacity: "Up to 200 attendees",
    },
    {
      name: "Weddings",
      description:
        "Elegant spaces for your special day with customizable setups.",
      icon: <FaCalendarAlt className="text-[#C49A6C] text-2xl" />,
      capacity: "Up to 150 guests",
    },
    {
      name: "Social Galas",
      description:
        "Sophisticated venues for charity events and celebrations.",
      icon: <FaUtensils className="text-[#C49A6C] text-2xl" />,
      capacity: "Up to 120 guests",
    },
  ];

  const amenities: Amenity[] = [
    { name: "High-Speed WiFi", icon: <FaWifi className="text-[#C49A6C]" /> },
    {
      name: "AV Equipment",
      icon: <MdOutlineVideoCameraFront className="text-[#C49A6C]" />,
    },
    {
      name: "Catering Services",
      icon: <FaUtensils className="text-[#C49A6C]" />,
    },
    {
      name: "Complimentary Parking",
      icon: <FaParking className="text-[#C49A6C]" />,
    },
  ];

  return (
    <section className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative w-full h-96 md:h-[500px] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/67mog36hf/Labrezi/IMG_20240526_204342_752.jpg?updatedAt=1731996596140')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">
            Meetings & Events
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Exceptional venues for memorable gatherings
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#4A3F36] mb-6">
          Host Your Perfect Event
        </h2>
        <p className="text-[#4A3F36] max-w-3xl mx-auto text-lg leading-relaxed">
          Our versatile event spaces combine elegant design with
          state-of-the-art technology, supported by a dedicated team to ensure
          your meeting or celebration is flawless.
        </p>
      </div>

      {/* Event Types */}
      <div className="bg-[#F6F0E5] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#4A3F36] mb-12 text-center">
            Event Spaces
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => (
              <div
                key={`event-${index}`}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{event.icon}</div>
                <h3 className="text-xl font-bold text-[#4A3F36] mb-2">
                  {event.name}
                </h3>
                <p className="text-[#4A3F36]/80 mb-3">{event.description}</p>
                <p className="text-sm text-[#C49A6C] font-medium">
                  {event.capacity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Showcase */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#4A3F36] mb-12 text-center">
          Our Premier Venues
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VenueCard
            imageUrl="https://ik.imagekit.io/67mog36hf/Labrezi/IMG_20240526_204342_752.jpg?updatedAt=1731996596140"
            title="Grand Ballroom"
            description="Our largest venue featuring customizable layouts, perfect for weddings and galas."
            features={[
              "1,200 sq.ft. of flexible space",
              "Built-in stage and dance floor",
              "Natural daylight with blackout options",
            ]}
          />
          <VenueCard
            imageUrl="https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3734.JPG?updatedAt=1746112362818"
            title="Executive Boardroom"
            description="Sophisticated space for corporate meetings with premium amenities."
            features={[
              "Seats up to 24 attendees",
              "State-of-the-art video conferencing",
              "Executive lounge access",
            ]}
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-[#F6F0E5] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#4A3F36] mb-12 text-center">
            Event Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((item, index) => (
              <div key={`amenity-${index}`} className="text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="text-lg font-medium text-[#4A3F36]">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#4A3F36] mb-6">
          Plan Your Event With Us
        </h2>
        <p className="text-[#4A3F36] max-w-2xl mx-auto mb-8">
          Our dedicated events team will help you create a memorable experience
          tailored to your needs.
        </p>
        <button className="bg-[#A80532] hover:bg-[#8A0425] text-white font-bold py-3 px-8 rounded-md transition-colors">
          REQUEST A PROPOSAL
        </button>
      </div>

      <Footer />
    </section>
  );
};

// VenueCard component with TypeScript props
type VenueCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  features: string[];
};

const VenueCard: React.FC<VenueCardProps> = ({
  imageUrl,
  title,
  description,
  features,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div
        className="h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      ></div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#4A3F36] mb-2">{title}</h3>
        <p className="text-[#4A3F36]/80 mb-4">{description}</p>
        <ul className="space-y-2 text-[#4A3F36]">
          {features.map((feature, index) => (
            <li key={`feature-${index}`} className="flex items-center">
              <span className="w-2 h-2 bg-[#C49A6C] rounded-full mr-2"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MeetingsEventsPage;
