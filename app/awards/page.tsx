"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaTrophy, FaStar, FaMedal, FaCalendarAlt, FaDownload, FaCertificate } from "react-icons/fa";

const AwardsPage = () => {
  const majorAwards = [
    {
      id: 1,
      year: "2024",
      title: "Best Boutique Hotel 2024",
      organization: "Uganda Tourism Board",
      description: "Recognized for exceptional service, sustainable practices, and authentic Ugandan hospitality. This prestigious award acknowledges our commitment to excellence in the boutique hospitality sector.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/award-best-boutique.jpg",
      category: "Tourism Excellence",
      featured: true
    },
    {
      id: 2,
      year: "2024",
      title: "Travelers' Choice Award",
      organization: "TripAdvisor",
      description: "Awarded to the top 10% of hotels worldwide based on exceptional traveler reviews and ratings. This recognition reflects our guests' outstanding experiences and satisfaction.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/tripadvisor-award.jpg",
      category: "Guest Satisfaction",
      featured: true
    },
    {
      id: 3,
      year: "2024",
      title: "LEED Gold Certification",
      organization: "Green Building Council",
      description: "Achieved for sustainable building design, energy efficiency, and environmental stewardship. This certification recognizes our commitment to green hospitality practices.",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/leed-certification.jpg",
      category: "Sustainability",
      featured: true
    }
  ];

  const allAwards = [
    {
      year: "2024",
      title: "Best Boutique Hotel",
      organization: "Uganda Tourism Board",
      category: "Tourism Excellence"
    },
    {
      year: "2024",
      title: "Travelers' Choice Award",
      organization: "TripAdvisor",
      category: "Guest Satisfaction"
    },
    {
      year: "2024",
      title: "LEED Gold Certification",
      organization: "Green Building Council",
      category: "Sustainability"
    },
    {
      year: "2023",
      title: "Excellence in Hospitality",
      organization: "East Africa Tourism Awards",
      category: "Service Excellence"
    },
    {
      year: "2023",
      title: "Sustainable Tourism Leader",
      organization: "Uganda Environmental Authority",
      category: "Environmental Leadership"
    },
    {
      year: "2023",
      title: "Best Hotel Restaurant",
      organization: "Kampala Dining Awards",
      category: "Culinary Excellence"
    },
    {
      year: "2022",
      title: "Outstanding Wedding Venue",
      organization: "Wedding Industry Awards",
      category: "Events & Celebrations"
    },
    {
      year: "2022",
      title: "Community Impact Award",
      organization: "Local Business Council",
      category: "Community Engagement"
    },
    {
      year: "2022",
      title: "Innovation in Hospitality",
      organization: "Hotel Tech Awards",
      category: "Technology & Innovation"
    },
    {
      year: "2021",
      title: "Rising Star Hotel",
      organization: "African Hospitality Awards",
      category: "Emerging Excellence"
    }
  ];

  const certifications = [
    {
      title: "LEED Gold Certified",
      issuer: "Green Building Council",
      date: "2024",
      description: "Environmental and energy efficiency certification",
      icon: <FaCertificate className="text-green-600" />
    },
    {
      title: "ISO 14001",
      issuer: "International Organization for Standardization",
      date: "2023",
      description: "Environmental management systems",
      icon: <FaCertificate className="text-blue-600" />
    },
    {
      title: "SafeGuard Verified",
      issuer: "Tourism Safety Council",
      date: "2024",
      description: "Health and safety protocols certification",
      icon: <FaCertificate className="text-red-600" />
    },
    {
      title: "Fair Trade Tourism",
      issuer: "Fair Trade Tourism Organization",
      date: "2023",
      description: "Ethical tourism practices certification",
      icon: <FaCertificate className="text-purple-600" />
    }
  ];

  const achievements = [
    {
      number: "15+",
      label: "Awards Won",
      description: "Since opening"
    },
    {
      number: "95%",
      label: "Guest Satisfaction",
      description: "Average rating"
    },
    {
      number: "4.8/5",
      label: "TripAdvisor Rating",
      description: "Based on 500+ reviews"
    },
    {
      number: "100%",
      label: "Staff Trained",
      description: "Excellence certified"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/awards-hero.jpg"
          alt="La Brezi Suites Awards"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Awards & Recognition</h1>
            <p className="text-xl md:text-2xl mb-6">Celebrating excellence in hospitality and service</p>
            <div className="flex items-center justify-center gap-4">
              <FaTrophy className="text-4xl text-[#C46A26]" />
              <span className="text-2xl font-bold">15+ Awards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Awards */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Recent Major Awards</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {majorAwards.map((award) => (
              <div key={award.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                <div className="absolute top-4 right-4 bg-[#A80532] text-white px-3 py-1 rounded-full text-sm z-10 flex items-center">
                  <FaMedal className="mr-1" />
                  {award.year}
                </div>
                
                <div className="relative h-48 w-full">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaTrophy className="text-[#C46A26]" />
                    <span className="text-[#C46A26] text-sm font-medium">{award.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{award.title}</h3>
                  <p className="text-[#C46A26] font-medium mb-3">{award.organization}</p>
                  <p className="text-[#4A3F36] text-sm mb-4">{award.description}</p>
                  <Link 
                    href={`/press-center`}
                    className="inline-block text-[#A80532] hover:text-[#8A0425] font-medium"
                  >
                    Read Press Release →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="bg-[#4A3F36] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#C46A26]">{achievement.number}</div>
                <div className="text-lg font-semibold">{achievement.label}</div>
                <div className="text-sm opacity-75">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Awards List */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Complete Awards History</h2>
          <div className="space-y-6">
            {allAwards.map((award, index) => (
              <div key={index} className="bg-[#F6F0E5] rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-[#A80532] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold">
                    {award.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4A3F36]">{award.title}</h3>
                    <p className="text-[#C46A26] font-medium">{award.organization}</p>
                    <span className="text-sm bg-white px-3 py-1 rounded-full text-[#4A3F36]">
                      {award.category}
                    </span>
                  </div>
                </div>
                <FaStar className="text-[#C46A26] text-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Professional Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4 flex justify-center">{cert.icon}</div>
                <h3 className="text-lg font-bold text-[#4A3F36] mb-2">{cert.title}</h3>
                <p className="text-[#C46A26] text-sm font-medium mb-2">{cert.issuer}</p>
                <p className="text-[#4A3F36] text-sm mb-3">{cert.description}</p>
                <span className="inline-block bg-[#F6F0E5] text-[#4A3F36] px-3 py-1 rounded-full text-xs">
                  Certified {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recognition Gallery */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-12 text-center">Award Ceremonies & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://ik.imagekit.io/67mog36hf/Labrezi/award-ceremony-1.jpg"
                alt="Award Ceremony"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white font-bold text-center">Tourism Board Awards 2024</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://ik.imagekit.io/67mog36hf/Labrezi/award-ceremony-2.jpg"
                alt="TripAdvisor Recognition"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white font-bold text-center">TripAdvisor Excellence</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://ik.imagekit.io/67mog36hf/Labrezi/award-ceremony-3.jpg"
                alt="Sustainability Award"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white font-bold text-center">Green Building Certification</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Downloads */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Media & Press Resources</h2>
          <p className="text-lg mb-6">
            Download high-resolution images, press releases, and award certificates for media use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/press-center"
              className="bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              ACCESS PRESS CENTER
            </Link>
            <a 
              href="/media/awards-media-kit.zip"
              className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-8 py-3 rounded transition-colors flex items-center justify-center"
              download
            >
              <FaDownload className="mr-2" />
              DOWNLOAD MEDIA KIT
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default AwardsPage;