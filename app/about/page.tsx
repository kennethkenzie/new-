"use client";

import Image from "next/image";
import { Testimonials } from "../components/testimonials/page"; // Updated import path
import { FaAward, FaLeaf, FaUtensils, FaWineGlassAlt } from "react-icons/fa";
import Footer from "../components/footer/page";
import Navbar from "../components/navbar/page";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      
      <section className="relative py-16 md:py-24 overflow-hidden bg-gray-900">
        <div className="container mx-auto relative z-10 px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Story</h2>
            <div className="w-24 h-1 bg-[#C49A6C] mx-auto my-4"></div>
            <p className="text-white max-w-2xl mx-auto text-lg">
              A culinary journey that began with passion and perfection
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image Section */}
            <div className="lg:w-1/2 relative">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7865.jpg?updatedAt=1731999122286"
                  alt="La Brezi Suites Green"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block">
                <div className="relative h-48 w-48 rounded-lg overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7955-scaled%20(1).jpg?updatedAt=1731964280797"
                    alt="Our chefs at work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-6">
                Crafting Memorable Dining Experiences Since 2010
              </h3>
              
              <p className="text-gray-300 mb-6">
              Welcome to La Brezi Suites, an oasis of tranquility and sophistication nestled away from the hustle and bustle of the city. 
              Strategically located in the heart of the city&apos;s most prestigious residential neighborhoods, our resort-style accommodations 
              offer the perfect retreat for discerning travelers seeking an unparalleled experience.
              </p>

              <p className="text-gray-300 mb-6">
              Immerse yourself in a serene, pollution-free environment where the only sounds that fill the air are the gentle whispers of nature. Our meticulously landscaped grounds, adorned with lush greenery and sprawling gardens, create a soothing ambiance that rejuvenates the senses.
              </p>

              <p className="text-gray-300 mb-6">
                Our culinary philosophy is rooted in the belief that food should be a celebration of life. 
                We take pride in sourcing the freshest ingredients from local farms and markets, ensuring that every dish is a true reflection of the season.
                </p>
              
              <p className="text-gray-300 mb-8">
                We believe in the power of food to bring people together. Every dish tells a story - of the 
                local farmers who grow our ingredients, the seasons that inspire our menus, and the culinary 
                traditions we honor while pushing boundaries.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <FaAward className="text-2xl text-[#C49A6C]" />
                    <h4 className="font-bold text-white">Award Winning</h4>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    15 culinary awards including Michelin Star (2022)
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <FaLeaf className="text-2xl text-[#C49A6C]" />
                    <h4 className="font-bold text-white">Farm to Table</h4>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    Partnered with 20+ local farms and producers
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <FaUtensils className="text-2xl text-[#C49A6C]" />
                    <h4 className="font-bold text-white">Seasonal Menus</h4>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    Changing menus 5 times a year with seasonal ingredients
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <FaWineGlassAlt className="text-2xl text-[#C49A6C]" />
                    <h4 className="font-bold text-white">Sommelier Curated</h4>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    300+ selection of international wines
                  </p>
                </div>
              </div>

              {/* Team Button */}
              <button className="mt-8 bg-[#A80532] text-white px-6 py-3 rounded hover:bg-[#800026] transition-colors duration-200">
                Meet Our Team
              </button>
            </div>
          </div>

          {/* Testimonials Section */}
          <Testimonials placeId={process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ''} />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;