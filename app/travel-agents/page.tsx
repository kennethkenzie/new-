"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaPlane, FaPercent, FaHandshake, FaDownload, FaPhone, FaEnvelope, FaGlobe, FaUsers, FaClock, FaCalendarAlt } from "react-icons/fa";

const TravelAgentsPage = () => {
  const [selectedTab, setSelectedTab] = useState("benefits");

  const agentBenefits = [
    {
      icon: <FaPercent className="text-3xl text-[#C46A26]" />,
      title: "Competitive Commissions",
      description: "Earn up to 15% commission on all bookings with additional incentives for volume partners"
    },
    {
      icon: <FaClock className="text-3xl text-[#C46A26]" />,
      title: "24/7 Support",
      description: "Dedicated agent support line with priority assistance for your clients"
    },
    {
      icon: <FaUsers className="text-3xl text-[#C46A26]" />,
      title: "Group Rates",
      description: "Special rates and packages for group bookings of 10 or more rooms"
    },
    {
      icon: <FaCalendarAlt className="text-3xl text-[#C46A26]" />,
      title: "Flexible Booking",
      description: "Extended payment terms and flexible cancellation policies for your clients"
    }
  ];

  const commissionRates = [
    {
      category: "Standard Rooms",
      rate: "10%",
      description: "Single and Double rooms"
    },
    {
      category: "Executive Suites",
      rate: "12%",
      description: "Premium suites and upgraded accommodations"
    },
    {
      category: "Wedding Packages",
      rate: "15%",
      description: "Complete wedding and event packages"
    },
    {
      category: "Group Bookings",
      rate: "15%",
      description: "10+ rooms booked together"
    }
  ];

  const marketingMaterials = [
    {
      title: "Hotel Fact Sheet",
      description: "Complete property overview with amenities and room details",
      format: "PDF",
      size: "2 MB",
      downloadUrl: "/agents/labrezi-fact-sheet.pdf"
    },
    {
      title: "High-Resolution Images",
      description: "Professional photos of rooms, facilities, and dining",
      format: "ZIP",
      size: "50 MB",
      downloadUrl: "/agents/labrezi-images.zip"
    },
    {
      title: "Rate Sheets",
      description: "Current rates and package pricing",
      format: "PDF",
      size: "1 MB",
      downloadUrl: "/agents/rate-sheets.pdf"
    },
    {
      title: "Presentation Slides",
      description: "PowerPoint presentation for client meetings",
      format: "PPTX",
      size: "15 MB",
      downloadUrl: "/agents/presentation-slides.pptx"
    }
  ];

  const packages = [
    {
      name: "Romantic Getaway",
      duration: "3 Days / 2 Nights",
      price: "From UGX 850,000",
      commission: "12%",
      includes: ["Executive Suite", "Couples Massage", "Romantic Dinner", "Airport Transfer"]
    },
    {
      name: "Family Adventure",
      duration: "4 Days / 3 Nights", 
      price: "From UGX 1,200,000",
      commission: "15%",
      includes: ["Family Suite", "All Meals", "Safari Tour", "Kids Activities"]
    },
    {
      name: "Business Retreat",
      duration: "2 Days / 1 Night",
      price: "From UGX 650,000",
      commission: "10%",
      includes: ["Executive Room", "Meeting Room", "Business Breakfast", "Airport Transfer"]
    }
  ];

  const contacts = [
    {
      name: "David Mugisha",
      title: "Travel Partners Manager",
      email: "agents@labrezisuites.com",
      phone: "+256 768 262 481",
      whatsapp: "+256 768 262 481"
    },
    {
      name: "Grace Namatovu",
      title: "Group Sales Specialist",
      email: "groups@labrezisuites.com", 
      phone: "+256 753 208 768",
      whatsapp: "+256 753 208 768"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[400px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/travel-agents-hero.jpg"
          alt="Travel Agents Portal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Partners</h1>
            <p className="text-xl md:text-2xl mb-6">Partner with La Brezi Suites for exceptional experiences</p>
            <Link 
              href="#join"
              className="inline-block bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              BECOME A PARTNER
            </Link>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-[#F6F0E5] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F36] mb-6">Partner with Excellence</h2>
          <p className="text-lg text-[#4A3F36] mb-8 max-w-4xl mx-auto">
            Join our exclusive network of travel partners and offer your clients access to Uganda's premier boutique hotel experience. 
            We provide competitive commissions, dedicated support, and comprehensive marketing resources to help your business grow.
          </p>
          <div className="w-24 h-1 bg-[#C46A26] mx-auto"></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedTab("benefits")}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedTab === "benefits"
                  ? 'bg-[#A80532] text-white'
                  : 'bg-[#F6F0E5] text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
              }`}
            >
              <FaHandshake className="inline mr-2" />
              Partner Benefits
            </button>
            <button
              onClick={() => setSelectedTab("commissions")}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedTab === "commissions"
                  ? 'bg-[#A80532] text-white'
                  : 'bg-[#F6F0E5] text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
              }`}
            >
              <FaPercent className="inline mr-2" />
              Commission Rates
            </button>
            <button
              onClick={() => setSelectedTab("materials")}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedTab === "materials"
                  ? 'bg-[#A80532] text-white'
                  : 'bg-[#F6F0E5] text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
              }`}
            >
              <FaDownload className="inline mr-2" />
              Marketing Materials
            </button>
            <button
              onClick={() => setSelectedTab("packages")}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedTab === "packages"
                  ? 'bg-[#A80532] text-white'
                  : 'bg-[#F6F0E5] text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
              }`}
            >
              <FaGlobe className="inline mr-2" />
              Packages & Offers
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Benefits Tab */}
          {selectedTab === "benefits" && (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-8">Why Partner with Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {agentBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">{benefit.icon}</div>
                    <h3 className="text-lg font-bold text-[#4A3F36] mb-3">{benefit.title}</h3>
                    <p className="text-[#4A3F36] text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-[#4A3F36] mb-6 text-center">Additional Partner Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-2 mr-3"></span>
                      <span className="text-[#4A3F36]">Priority booking confirmations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-2 mr-3"></span>
                      <span className="text-[#4A3F36]">Dedicated agent portal access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-2 mr-3"></span>
                      <span className="text-[#4A3F36]">Familiarization trip opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-2 mr-3"></span>
                      <span className="text-[#4A3F36]">Monthly sales reports and analytics</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-2 mr-3"></span>
                      <span className="text-[#4A3F36]">Marketing co-op opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-2 mr-3"></span>
                      <span className="text-[#4A3F36]">Special agent rates for site visits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-2 mr-3"></span>
                      <span className="text-[#4A3F36]">Regular training and updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-2 mr-3"></span>
                      <span className="text-[#4A3F36]">Annual partner appreciation events</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Commissions Tab */}
          {selectedTab === "commissions" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-8">Commission Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {commissionRates.map((rate, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-[#4A3F36]">{rate.category}</h3>
                      <span className="bg-[#A80532] text-white px-3 py-1 rounded-full font-bold">{rate.rate}</span>
                    </div>
                    <p className="text-[#4A3F36]">{rate.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#4A3F36] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Commission Payment Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#C46A26] mb-2">Monthly</div>
                    <p className="text-sm">Commission payments processed monthly via bank transfer</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#C46A26] mb-2">NET 30</div>
                    <p className="text-sm">Payment terms of 30 days from guest checkout</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#C46A26] mb-2">USD/UGX</div>
                    <p className="text-sm">Payments available in USD or UGX</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Marketing Materials Tab */}
          {selectedTab === "materials" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-8">Marketing Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {marketingMaterials.map((material, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-[#4A3F36] mb-3">{material.title}</h3>
                    <p className="text-[#4A3F36] mb-4">{material.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-[#C46A26]">
                        <span>{material.format} • {material.size}</span>
                      </div>
                    </div>
                    <a 
                      href={material.downloadUrl}
                      className="w-full bg-[#A80532] text-white py-3 rounded hover:bg-[#8A0425] transition-colors flex items-center justify-center"
                      download
                    >
                      <FaDownload className="mr-2" />
                      Download {material.format}
                    </a>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-[#4A3F36] mb-4">Usage Guidelines</h3>
                <div className="text-[#4A3F36] space-y-3">
                  <p>• All materials are for use by registered travel partners only</p>
                  <p>• Please maintain brand integrity when using our materials</p>
                  <p>• High-resolution logos and images available upon request</p>
                  <p>• Custom materials can be created for major partners</p>
                  <p>• Updated materials available monthly in partner portal</p>
                </div>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {selectedTab === "packages" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-8">Featured Packages</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{pkg.name}</h3>
                    <p className="text-[#C46A26] text-sm mb-2">{pkg.duration}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-[#4A3F36]">{pkg.price}</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                        {pkg.commission} Commission
                      </span>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#4A3F36] mb-2">Includes:</h4>
                      <ul className="space-y-1">
                        {pkg.includes.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-[#4A3F36]">
                            <span className="w-2 h-2 bg-[#C46A26] rounded-full mt-1.5 mr-3"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="w-full bg-[#4A3F36] text-white py-2 rounded hover:bg-[#3A322A] transition-colors">
                      Request Quote
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#4A3F36] text-center mb-12">Your Dedicated Partner Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-[#F6F0E5] rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-2">{contact.name}</h3>
                <p className="text-[#C46A26] font-medium mb-6">{contact.title}</p>
                <div className="space-y-4">
                  <a 
                    href={`mailto:${contact.email}`}
                    className="flex items-center justify-center text-[#4A3F36] hover:text-[#A80532] transition-colors"
                  >
                    <FaEnvelope className="mr-3" />
                    {contact.email}
                  </a>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="flex items-center justify-center text-[#4A3F36] hover:text-[#A80532] transition-colors"
                  >
                    <FaPhone className="mr-3" />
                    {contact.phone}
                  </a>
                  <a 
                    href={`https://wa.me/${contact.whatsapp.replace(/\s+/g, '')}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors inline-block"
                  >
                    WhatsApp: {contact.whatsapp}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="join" className="bg-[#4A3F36] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Partner with Us?</h2>
          <p className="text-lg mb-6">
            Join our network of successful travel partners and start earning competitive commissions 
            while offering your clients exceptional experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:agents@labrezisuites.com?subject=Travel Agent Partnership Application"
              className="bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              APPLY NOW
            </a>
            <a 
              href="/agents/partnership-form.pdf"
              className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-8 py-3 rounded transition-colors flex items-center justify-center"
              download
            >
              <FaDownload className="mr-2" />
              APPLICATION FORM
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default TravelAgentsPage;