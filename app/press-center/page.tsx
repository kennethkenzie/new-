"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaDownload, FaNewspaper, FaCamera, FaFileAlt, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const PressCenterPage = () => {
  const [selectedTab, setSelectedTab] = useState("releases");

  const pressReleases = [
    {
      id: 1,
      title: "La Brezi Suites Wins 'Best Boutique Hotel 2024' Award",
      date: "December 15, 2024",
      excerpt: "La Brezi Suites has been honored with the prestigious 'Best Boutique Hotel 2024' award by Uganda Tourism Board.",
      downloadUrl: "/press/labrezi-best-boutique-award-2024.pdf"
    },
    {
      id: 2,
      title: "Grand Opening of New Spa & Wellness Center",
      date: "December 5, 2024", 
      excerpt: "La Brezi Suites unveils its state-of-the-art spa facility featuring traditional African treatments and modern wellness therapies.",
      downloadUrl: "/press/spa-wellness-center-opening.pdf"
    },
    {
      id: 3,
      title: "Solar Power Initiative Reduces Carbon Footprint by 60%",
      date: "November 20, 2024",
      excerpt: "Comprehensive solar energy project now fully operational, significantly reducing environmental impact.",
      downloadUrl: "/press/solar-power-initiative-2024.pdf"
    },
    {
      id: 4,
      title: "Partnership with Local Farmers Supports Community",
      date: "November 15, 2024",
      excerpt: "New partnerships with 15 local farmers to source fresh, organic produce for restaurants.",
      downloadUrl: "/press/local-farmers-partnership.pdf"
    }
  ];

  const mediaKit = [
    {
      title: "High-Resolution Photos",
      description: "Professional photography of rooms, facilities, dining, and events",
      fileSize: "150 MB",
      format: "ZIP Archive",
      downloadUrl: "/media/labrezi-photo-collection.zip"
    },
    {
      title: "Hotel Fact Sheet",
      description: "Complete hotel information, amenities, and specifications",
      fileSize: "2 MB",
      format: "PDF",
      downloadUrl: "/media/labrezi-fact-sheet.pdf"
    },
    {
      title: "Executive Biographies",
      description: "Biographies and photos of key management team members",
      fileSize: "5 MB",
      format: "PDF",
      downloadUrl: "/media/executive-biographies.pdf"
    },
    {
      title: "Brand Guidelines",
      description: "Logo usage, brand colors, and style guidelines",
      fileSize: "8 MB",
      format: "PDF",
      downloadUrl: "/media/brand-guidelines.pdf"
    }
  ];

  const mediaContacts = [
    {
      name: "Sarah Nakamya",
      title: "General Manager",
      email: "s.nakamya@labrezisuites.com",
      phone: "+256 768 262 479"
    },
    {
      name: "James Musoke",
      title: "Marketing Director", 
      email: "j.musoke@labrezisuites.com",
      phone: "+256 753 208 767"
    },
    {
      name: "Communications Department",
      title: "Media Relations",
      email: "media@labrezisuites.com",
      phone: "+256 768 262 480"
    }
  ];

  const awards = [
    {
      year: "2024",
      title: "Best Boutique Hotel",
      organization: "Uganda Tourism Board",
      description: "Recognized for exceptional service and sustainable practices"
    },
    {
      year: "2024", 
      title: "Travelers' Choice Award",
      organization: "TripAdvisor",
      description: "Top 10% of hotels worldwide based on traveler reviews"
    },
    {
      year: "2024",
      title: "LEED Gold Certification",
      organization: "Green Building Council",
      description: "Sustainable building design and environmental practices"
    },
    {
      year: "2023",
      title: "Excellence in Hospitality",
      organization: "East Africa Tourism Awards",
      description: "Outstanding service and guest satisfaction"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[400px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/press-center-hero.jpg"
          alt="La Brezi Suites Press Center"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Press Center</h1>
            <p className="text-xl md:text-2xl">Media resources and latest news from La Brezi Suites</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Tab Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedTab("releases")}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedTab === "releases"
                    ? 'bg-[#A80532] text-white'
                    : 'bg-white text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
                }`}
              >
                <FaNewspaper className="inline mr-2" />
                Press Releases
              </button>
              <button
                onClick={() => setSelectedTab("media-kit")}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedTab === "media-kit"
                    ? 'bg-[#A80532] text-white'
                    : 'bg-white text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
                }`}
              >
                <FaCamera className="inline mr-2" />
                Media Kit
              </button>
              <button
                onClick={() => setSelectedTab("contacts")}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedTab === "contacts"
                    ? 'bg-[#A80532] text-white'
                    : 'bg-white text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
                }`}
              >
                <FaPhone className="inline mr-2" />
                Media Contacts
              </button>
              <button
                onClick={() => setSelectedTab("awards")}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedTab === "awards"
                    ? 'bg-[#A80532] text-white'
                    : 'bg-white text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
                }`}
              >
                <FaFileAlt className="inline mr-2" />
                Awards & Recognition
              </button>
            </div>
          </div>

          {/* Press Releases Tab */}
          {selectedTab === "releases" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-8">Recent Press Releases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pressReleases.map((release) => (
                  <div key={release.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center text-sm text-[#C46A26] mb-3">
                      <FaCalendarAlt className="mr-2" />
                      {release.date}
                    </div>
                    <h3 className="text-xl font-bold text-[#4A3F36] mb-3">{release.title}</h3>
                    <p className="text-[#4A3F36] mb-4">{release.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <Link 
                        href={`/news/${release.id}`}
                        className="text-[#A80532] hover:text-[#8A0425] font-medium"
                      >
                        Read Full Story →
                      </Link>
                      <a 
                        href={release.downloadUrl}
                        className="bg-[#4A3F36] text-white px-4 py-2 rounded hover:bg-[#3A322A] transition-colors flex items-center"
                        download
                      >
                        <FaDownload className="mr-2" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Kit Tab */}
          {selectedTab === "media-kit" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-8">Media Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mediaKit.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-[#4A3F36] mb-3">{item.title}</h3>
                    <p className="text-[#4A3F36] mb-4">{item.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-[#C46A26]">
                        <span>{item.format} • {item.fileSize}</span>
                      </div>
                    </div>
                    <a 
                      href={item.downloadUrl}
                      className="w-full bg-[#A80532] text-white py-3 rounded hover:bg-[#8A0425] transition-colors flex items-center justify-center"
                      download
                    >
                      <FaDownload className="mr-2" />
                      Download {item.format}
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-sm mt-12">
                <h3 className="text-2xl font-bold text-[#4A3F36] mb-4">Usage Guidelines</h3>
                <div className="text-[#4A3F36] space-y-3">
                  <p>• All images and materials are provided for editorial use only</p>
                  <p>• Please credit all photographs as "Courtesy of La Brezi Suites"</p>
                  <p>• Logo usage must follow brand guidelines included in the media kit</p>
                  <p>• For commercial use, please contact our media relations team</p>
                  <p>• High-resolution versions available upon request</p>
                </div>
              </div>
            </div>
          )}

          {/* Media Contacts Tab */}
          {selectedTab === "contacts" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-8">Media Contacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mediaContacts.map((contact, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
                    <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{contact.name}</h3>
                    <p className="text-[#C46A26] font-medium mb-4">{contact.title}</p>
                    <div className="space-y-3">
                      <a 
                        href={`mailto:${contact.email}`}
                        className="flex items-center justify-center text-[#4A3F36] hover:text-[#A80532] transition-colors"
                      >
                        <FaEnvelope className="mr-2" />
                        {contact.email}
                      </a>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="flex items-center justify-center text-[#4A3F36] hover:text-[#A80532] transition-colors"
                      >
                        <FaPhone className="mr-2" />
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#4A3F36] text-white rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Press Inquiries</h3>
                <p className="mb-6">For immediate media assistance or to schedule interviews, please contact our communications team.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:media@labrezisuites.com"
                    className="bg-[#C46A26] hover:bg-[#A85B1F] text-white px-6 py-3 rounded transition-colors"
                  >
                    Email Media Team
                  </a>
                  <a 
                    href="tel:+256768262480"
                    className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-6 py-3 rounded transition-colors"
                  >
                    Call Media Line
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Awards Tab */}
          {selectedTab === "awards" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-8">Awards & Recognition</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {awards.map((award, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-[#A80532] text-white px-3 py-1 rounded-full text-sm font-bold">
                        {award.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{award.title}</h3>
                    <p className="text-[#C46A26] font-medium mb-3">{award.organization}</p>
                    <p className="text-[#4A3F36]">{award.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Link 
                  href="/awards"
                  className="inline-block bg-[#A80532] text-white px-8 py-3 rounded hover:bg-[#8A0425] transition-colors"
                >
                  View Complete Awards Gallery
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg mb-6">
            For the latest news, press releases, and media updates from La Brezi Suites, 
            subscribe to our media mailing list.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:media@labrezisuites.com?subject=Media Mailing List Subscription"
              className="bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              SUBSCRIBE TO UPDATES
            </a>
            <Link 
              href="/news"
              className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-8 py-3 rounded transition-colors"
            >
              VIEW ALL NEWS
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default PressCenterPage;