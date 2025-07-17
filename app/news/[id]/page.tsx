"use client";

import { useParams } from 'next/navigation';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
import EnhancedChatbot from "../../components/enhanced-chatbot/EnhancedChatbot";
import { FaCalendarAlt, FaUser, FaTag, FaShare, FaArrowLeft } from "react-icons/fa";

// This would typically come from a CMS or database
const newsArticles = {
  1: {
    id: 1,
    title: "La Brezi Suites Wins 'Best Boutique Hotel 2024' Award",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>We are thrilled to announce that La Brezi Suites has been honored with the prestigious 'Best Boutique Hotel 2024' award by the Uganda Tourism Board. This recognition represents not just an achievement for our hotel, but a testament to the dedication and hard work of our entire team.</p>
        
        <p>The award was presented at the annual Uganda Tourism Excellence Awards ceremony, held at the Kampala Serena Hotel on December 10th, 2024. The ceremony brought together industry leaders, government officials, and hospitality professionals from across East Africa.</p>
        
        <h3>What This Award Means</h3>
        <p>The 'Best Boutique Hotel' category recognizes establishments that excel in:</p>
        <ul>
          <li>Exceptional customer service and guest satisfaction</li>
          <li>Unique character and authentic local experiences</li>
          <li>Sustainable tourism practices</li>
          <li>Contribution to local community development</li>
          <li>Innovation in hospitality services</li>
        </ul>
        
        <p>Our General Manager, Sarah Nakamya, accepted the award on behalf of the entire La Brezi Suites family. "This award belongs to every member of our team who works tirelessly to ensure our guests have exceptional experiences," she said during her acceptance speech.</p>
        
        <h3>Recognition of Our Sustainable Practices</h3>
        <p>The judges particularly commended our commitment to sustainable hospitality practices, including our solar energy initiative, local sourcing programs, and community development projects. These efforts have resulted in a 60% reduction in our carbon footprint over the past two years.</p>
        
        <p>We're proud that our guests regularly comment on the authentic Ugandan hospitality they experience during their stays. This award validates our approach of combining international standards with local warmth and cultural authenticity.</p>
        
        <h3>Looking Forward</h3>
        <p>This recognition motivates us to continue raising the bar in hospitality excellence. We have exciting plans for 2025, including the expansion of our wellness facilities and the launch of new cultural experience packages.</p>
        
        <p>We extend our heartfelt gratitude to our guests, whose feedback and loyalty have made this achievement possible, and to our team members who embody the spirit of La Brezi Suites every day.</p>
      </div>
    `,
    date: "2024-12-15",
    author: "La Brezi Management",
    category: "awards",
    image: "https://ik.imagekit.io/67mog36hf/Labrezi/award-ceremony.jpg",
    tags: ["Awards", "Recognition", "Tourism", "Excellence"]
  }
  // Additional articles would go here...
};

const NewsArticlePage = () => {
  const params = useParams();
  const articleId = params?.id;
  const article = newsArticles[articleId as keyof typeof newsArticles];

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F6F0E5] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#4A3F36] mb-4">Article Not Found</h1>
            <p className="text-[#4A3F36] mb-6">The news article you're looking for doesn't exist.</p>
            <Link href="/news" className="bg-[#A80532] text-white px-6 py-3 rounded hover:bg-[#8A0425] transition-colors">
              Back to News
            </Link>
          </div>
        </div>
        <Footer />
        <EnhancedChatbot />
      </>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Article Hero */}
      <div className="relative h-96 w-full">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="w-full p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/news"
                className="inline-flex items-center text-white hover:text-[#C46A26] mb-4 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to News
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center">
                  <FaUser className="mr-2" />
                  {article.author}
                </span>
                <span className="flex items-center">
                  <FaTag className="mr-2" />
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none text-[#4A3F36]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-[#F6F0E5]">
              <h4 className="text-sm font-semibold text-[#4A3F36] mb-3">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="bg-[#F6F0E5] text-[#4A3F36] px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-6 pt-6 border-t border-[#F6F0E5]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#4A3F36]">Share this article:</span>
                <div className="flex gap-3">
                  <button className="bg-[#F6F0E5] p-2 rounded hover:bg-[#C46A26] hover:text-white transition-colors">
                    <FaShare />
                  </button>
                  <button className="bg-[#F6F0E5] p-2 rounded hover:bg-[#C46A26] hover:text-white transition-colors">
                    <FaShare />
                  </button>
                  <button className="bg-[#F6F0E5] p-2 rounded hover:bg-[#C46A26] hover:text-white transition-colors">
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-[#4A3F36] mb-6">Related News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/news" className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-32 w-full">
                  <Image
                    src="https://ik.imagekit.io/67mog36hf/Labrezi/spa-opening.jpg"
                    alt="Related article"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-[#4A3F36] mb-2">Grand Opening of Our New Spa & Wellness Center</h4>
                  <p className="text-sm text-[#4A3F36]">La Brezi Suites unveils its state-of-the-art spa facility...</p>
                </div>
              </Link>
              
              <Link href="/news" className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-32 w-full">
                  <Image
                    src="https://ik.imagekit.io/67mog36hf/Labrezi/solar-panels.jpg"
                    alt="Related article"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-[#4A3F36] mb-2">Solar Power Initiative Reduces Carbon Footprint by 60%</h4>
                  <p className="text-sm text-[#4A3F36]">Our comprehensive solar energy project is now fully operational...</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default NewsArticlePage;