"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaCalendarAlt, FaUser, FaTag, FaShare, FaSearch, FaAward, FaNewspaper } from "react-icons/fa";

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All News", count: 12 },
    { id: "hotel-updates", name: "Hotel Updates", count: 4 },
    { id: "awards", name: "Awards & Recognition", count: 3 },
    { id: "events", name: "Events & Celebrations", count: 3 },
    { id: "sustainability", name: "Sustainability", count: 2 }
  ];

  const newsArticles = [
    {
      id: 1,
      title: "La Brezi Suites Wins 'Best Boutique Hotel 2024' Award",
      excerpt: "We are thrilled to announce that La Brezi Suites has been honored with the prestigious 'Best Boutique Hotel 2024' award by Uganda Tourism Board.",
      content: "La Brezi Suites has been recognized for its exceptional service, sustainable practices, and commitment to providing guests with authentic Ugandan hospitality. This award reflects our dedication to excellence and our team's hard work.",
      date: "2024-12-15",
      author: "La Brezi Management",
      category: "awards",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/award-ceremony.jpg",
      featured: true,
      tags: ["Awards", "Recognition", "Tourism", "Excellence"]
    },
    {
      id: 2,
      title: "New Executive Chef Brings International Flair to La Brezi",
      excerpt: "We welcome Chef Marcus Thompson, formerly of Michelin-starred restaurants in London and Paris, as our new Executive Chef.",
      content: "Chef Thompson brings over 15 years of international culinary experience and a passion for incorporating local Ugandan ingredients into contemporary cuisine. Guests can expect exciting new menu additions and culinary experiences.",
      date: "2024-12-10",
      author: "Sarah Nakamya",
      category: "hotel-updates",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/new-chef.jpg",
      featured: false,
      tags: ["Culinary", "Staff", "Dining", "International"]
    },
    {
      id: 3,
      title: "Grand Opening of Our New Spa & Wellness Center",
      excerpt: "La Brezi Suites unveils its state-of-the-art spa facility featuring traditional African treatments and modern wellness therapies.",
      content: "The new 500-square-meter wellness center includes treatment rooms, a meditation garden, and a fitness studio. We offer a unique blend of traditional Ugandan healing practices with contemporary spa treatments.",
      date: "2024-12-05",
      author: "James Musoke",
      category: "hotel-updates",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/spa-opening.jpg",
      featured: true,
      tags: ["Spa", "Wellness", "New Facility", "Health"]
    },
    {
      id: 4,
      title: "Celebrating 200 Successful Weddings in 2024",
      excerpt: "As we approach the end of 2024, La Brezi Suites proudly celebrates hosting over 200 beautiful weddings this year.",
      content: "From intimate garden ceremonies to grand ballroom celebrations, we've had the honor of being part of 200 couples' special days. Our wedding packages continue to be among the most popular in the region.",
      date: "2024-11-28",
      author: "Events Team",
      category: "events",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/wedding-celebration.jpg",
      featured: false,
      tags: ["Weddings", "Milestone", "Celebrations", "Events"]
    },
    {
      id: 5,
      title: "Solar Power Initiative Reduces Carbon Footprint by 60%",
      excerpt: "Our comprehensive solar energy project is now fully operational, significantly reducing our environmental impact.",
      content: "The installation of 200 solar panels across our property has enabled us to generate 75% of our energy needs from renewable sources. This initiative is part of our commitment to sustainable hospitality.",
      date: "2024-11-20",
      author: "Sustainability Team",
      category: "sustainability",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/solar-panels.jpg",
      featured: false,
      tags: ["Sustainability", "Solar Energy", "Environment", "Green"]
    },
    {
      id: 6,
      title: "Partnership with Local Farmers Supports Community",
      excerpt: "La Brezi Suites announces new partnerships with 15 local farmers to source fresh, organic produce for our restaurants.",
      content: "This farm-to-table initiative not only ensures the freshest ingredients for our guests but also supports local agriculture and provides steady income for farming families in the region.",
      date: "2024-11-15",
      author: "Community Relations",
      category: "sustainability",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/local-farmers.jpg",
      featured: false,
      tags: ["Community", "Local Farmers", "Farm-to-Table", "Support"]
    },
    {
      id: 7,
      title: "Holiday Season Events Calendar Released",
      excerpt: "Discover our exciting lineup of holiday celebrations, including Christmas dinner, New Year's gala, and special family activities.",
      content: "The holiday season at La Brezi Suites promises magical moments with our curated events program. From traditional Christmas dinner to an elegant New Year's Eve gala, there's something for everyone.",
      date: "2024-11-10",
      author: "Events Team",
      category: "events",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/holiday-events.jpg",
      featured: false,
      tags: ["Holidays", "Christmas", "New Year", "Events"]
    },
    {
      id: 8,
      title: "TripAdvisor Travelers' Choice Award 2024",
      excerpt: "La Brezi Suites receives TripAdvisor's Travelers' Choice Award, ranking in the top 10% of hotels worldwide.",
      content: "This recognition is based on outstanding traveler reviews and ratings over the past year. We're honored by the trust our guests place in us and their wonderful feedback.",
      date: "2024-10-25",
      author: "Guest Relations",
      category: "awards",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/tripadvisor-award.jpg",
      featured: false,
      tags: ["TripAdvisor", "Award", "Guest Reviews", "Recognition"]
    },
    {
      id: 9,
      title: "New Family Adventure Packages Launch",
      excerpt: "Introducing three new family-focused vacation packages designed to create unforgettable memories for guests of all ages.",
      content: "Our new family packages include safari adventures, cultural experiences, and kid-friendly activities. Each package is designed to provide educational and fun experiences for the whole family.",
      date: "2024-10-20",
      author: "Package Development Team",
      category: "hotel-updates",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/family-packages-launch.jpg",
      featured: false,
      tags: ["Family", "Packages", "Adventure", "Kids"]
    },
    {
      id: 10,
      title: "Corporate Event Success: Tech Summit 2024",
      excerpt: "La Brezi Suites successfully hosted the East Africa Tech Summit 2024, welcoming over 300 technology leaders.",
      content: "The three-day summit featured keynote speakers, networking sessions, and workshops. Our conference facilities and catering services received outstanding feedback from attendees.",
      date: "2024-10-15",
      author: "Corporate Events",
      category: "events",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/tech-summit.jpg",
      featured: false,
      tags: ["Corporate", "Technology", "Summit", "Business"]
    },
    {
      id: 11,
      title: "Staff Training Program Enhances Guest Experience",
      excerpt: "Our comprehensive training program ensures every team member delivers exceptional service with authentic Ugandan hospitality.",
      content: "The 6-month training program covers customer service excellence, cultural awareness, and sustainable tourism practices. Investing in our team ensures consistently outstanding guest experiences.",
      date: "2024-10-10",
      author: "Human Resources",
      category: "hotel-updates",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/staff-training.jpg",
      featured: false,
      tags: ["Training", "Staff", "Service", "Hospitality"]
    },
    {
      id: 12,
      title: "Green Building Certification Achieved",
      excerpt: "La Brezi Suites receives LEED Gold certification for our sustainable building design and environmental practices.",
      content: "This certification recognizes our commitment to environmental stewardship through energy-efficient design, water conservation, and sustainable materials. We're proud to be a leader in green hospitality.",
      date: "2024-09-30",
      author: "Facilities Management",
      category: "awards",
      image: "https://ik.imagekit.io/67mog36hf/Labrezi/leed-certification.jpg",
      featured: false,
      tags: ["LEED", "Green Building", "Certification", "Environment"]
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = newsArticles.filter(article => article.featured);
  const recentArticles = newsArticles.slice(0, 5);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[400px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/news-hero.jpg"
          alt="La Brezi Suites News"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl md:text-2xl">Stay informed about the latest from La Brezi Suites</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Featured News Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#4A3F36] mb-8 text-center">Featured News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#A80532] text-white px-3 py-1 rounded-full text-sm flex items-center">
                      <FaNewspaper className="mr-1" />
                      FEATURED
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-[#C46A26]">
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {formatDate(article.date)}
                      </span>
                      <span className="flex items-center">
                        <FaTag className="mr-1" />
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#4A3F36] mb-3">{article.title}</h3>
                    <p className="text-[#4A3F36] mb-4">{article.excerpt}</p>
                    <Link 
                      href={`/news/${article.id}`}
                      className="inline-block bg-[#A80532] text-white px-4 py-2 rounded hover:bg-[#8A0425] transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main News Content */}
            <div className="lg:col-span-2">
              {/* Search and Filter */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-3 text-[#4A3F36]" />
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-[#C46A26] rounded focus:outline-none focus:ring-2 focus:ring-[#A80532]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedCategory === category.id
                            ? 'bg-[#A80532] text-white'
                            : 'bg-[#F6F0E5] text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* News Articles Grid */}
              <div className="space-y-8">
                {filteredArticles.map((article) => (
                  <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3 relative h-48 md:h-auto">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-4 mb-3 text-sm text-[#C46A26]">
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {formatDate(article.date)}
                          </span>
                          <span className="flex items-center">
                            <FaUser className="mr-1" />
                            {article.author}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-[#4A3F36] mb-3">{article.title}</h2>
                        <p className="text-[#4A3F36] mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="bg-[#F6F0E5] text-[#4A3F36] px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link 
                            href={`/news/${article.id}`}
                            className="text-[#A80532] hover:text-[#8A0425] font-medium"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#4A3F36] text-lg">No news articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Recent News */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Recent Updates</h3>
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="border-b border-[#F6F0E5] pb-4 last:border-b-0">
                      <Link href={`/news/${article.id}`} className="block hover:text-[#A80532] transition-colors">
                        <h4 className="font-medium text-[#4A3F36] mb-1">{article.title}</h4>
                        <p className="text-sm text-[#C46A26]">{formatDate(article.date)}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-[#4A3F36] text-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="text-sm mb-4">Subscribe to our newsletter for the latest news and exclusive offers.</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 rounded text-[#4A3F36] focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-[#C46A26] hover:bg-[#A85B1F] text-white py-3 rounded transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Social Media */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="bg-[#F6F0E5] p-3 rounded hover:bg-[#C46A26] hover:text-white transition-colors">
                    <FaShare />
                  </a>
                  <a href="#" className="bg-[#F6F0E5] p-3 rounded hover:bg-[#C46A26] hover:text-white transition-colors">
                    <FaShare />
                  </a>
                  <a href="#" className="bg-[#F6F0E5] p-3 rounded hover:bg-[#C46A26] hover:text-white transition-colors">
                    <FaShare />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Our Excellence</h2>
          <p className="text-lg mb-6">
            Stay updated with our latest news and be the first to know about special offers and exciting developments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking"
              className="bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              BOOK YOUR STAY
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-8 py-3 rounded transition-colors"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default NewsPage;