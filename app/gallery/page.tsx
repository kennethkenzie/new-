"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import EnhancedChatbot from "../components/enhanced-chatbot/EnhancedChatbot";
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    { id: "all", name: "All Photos", count: 36 },
    { id: "rooms", name: "Rooms & Suites", count: 12 },
    { id: "dining", name: "Dining", count: 8 },
    { id: "facilities", name: "Facilities", count: 10 },
    { id: "events", name: "Events", count: 6 }
  ];

  const galleryImages = [
    // Rooms & Suites
    {
      id: 1,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/EXECTIVE_BIG_ROOM.png?updatedAt=1731996591628",
      alt: "Executive Suite",
      category: "rooms",
      title: "Executive Suite",
      description: "Luxurious executive suite with separate living area"
    },
    {
      id: 2,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_8040.jpg?updatedAt=1731997026952",
      alt: "Double Room",
      category: "rooms",
      title: "Double Room",
      description: "Spacious double room with modern amenities"
    },
    {
      id: 3,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/LABREZI_SUITES_a1.png?updatedAt=1731996616563",
      alt: "Single Room",
      category: "rooms",
      title: "Single Room",
      description: "Comfortable single room perfect for solo travelers"
    },
    {
      id: 4,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG-20210323-WA0057.jpg?updatedAt=1731996599938",
      alt: "Twin Suite Bedroom",
      category: "rooms",
      title: "Twin Suite",
      description: "Elegant twin suite with premium furnishings"
    },
    {
      id: 5,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG-20210325-WA0017.jpg?updatedAt=1731996604115",
      alt: "Deluxe Room",
      category: "rooms",
      title: "Deluxe Room",
      description: "Deluxe room with panoramic views"
    },
    
    // Dining
    {
      id: 6,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7865.jpg?updatedAt=1731999122286",
      alt: "Restaurant Terrace",
      category: "dining",
      title: "Restaurant Terrace",
      description: "Beautiful outdoor dining terrace"
    },
    {
      id: 7,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7955-scaled%20(1).jpg?updatedAt=1731964280797",
      alt: "Main Restaurant",
      category: "dining",
      title: "Main Restaurant",
      description: "Elegant main restaurant with modern design"
    },
    {
      id: 8,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/dining-experience.jpg",
      alt: "Fine Dining",
      category: "dining",
      title: "Fine Dining Experience",
      description: "Exquisite fine dining with gourmet cuisine"
    },
    {
      id: 9,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/bar-lounge.jpg",
      alt: "Bar & Lounge",
      category: "dining",
      title: "Bar & Lounge",
      description: "Sophisticated bar and lounge area"
    },

    // Facilities
    {
      id: 10,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3711.JPG?updatedAt=1746112307767",
      alt: "Pool Area",
      category: "facilities",
      title: "Swimming Pool",
      description: "Beautiful infinity pool with stunning views"
    },
    {
      id: 11,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3712.JPG?updatedAt=1746112307767",
      alt: "Spa Facilities",
      category: "facilities",
      title: "Spa & Wellness",
      description: "Luxurious spa and wellness center"
    },
    {
      id: 12,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3713.JPG?updatedAt=1746112307767",
      alt: "Gardens",
      category: "facilities",
      title: "Hotel Gardens",
      description: "Beautifully landscaped gardens and grounds"
    },
    {
      id: 13,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_3734.JPG?updatedAt=1746112362818",
      alt: "Fitness Center",
      category: "facilities",
      title: "Fitness Center",
      description: "Modern fitness center with latest equipment"
    },
    {
      id: 14,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/lobby-area.jpg",
      alt: "Hotel Lobby",
      category: "facilities",
      title: "Hotel Lobby",
      description: "Welcoming lobby with elegant decor"
    },

    // Events
    {
      id: 15,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_20240526_204342_752.jpg?updatedAt=1731996596140",
      alt: "Wedding Setup",
      category: "events",
      title: "Wedding Ceremony",
      description: "Elegant wedding ceremony setup"
    },
    {
      id: 16,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/WhatsApp-Image-2024-09-01-at-40717-AM-4-1024x768.jpeg?updatedAt=1733031349401",
      alt: "Event Space",
      category: "events",
      title: "Event Venue",
      description: "Versatile event space for celebrations"
    },
    {
      id: 17,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/conference-room.jpg",
      alt: "Conference Room",
      category: "events",
      title: "Conference Facilities",
      description: "Professional conference and meeting rooms"
    },

    // Additional rooms and facilities
    {
      id: 18,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/bathroom-luxury.jpg",
      alt: "Luxury Bathroom",
      category: "rooms",
      title: "Luxury Bathroom",
      description: "Spacious bathroom with premium amenities"
    },
    {
      id: 19,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/balcony-view.jpg",
      alt: "Balcony View",
      category: "rooms",
      title: "Balcony with View",
      description: "Private balcony with panoramic views"
    },
    {
      id: 20,
      src: "https://ik.imagekit.io/67mog36hf/Labrezi/outdoor-seating.jpg",
      alt: "Outdoor Seating",
      category: "dining",
      title: "Outdoor Dining",
      description: "Al fresco dining in beautiful surroundings"
    }
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
    setLightboxImage(filteredImages[prevIndex]);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-[400px] w-full">
        <Image
          src="https://ik.imagekit.io/67mog36hf/Labrezi/gallery-hero.jpg"
          alt="La Brezi Suites Gallery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl md:text-2xl">Discover the beauty of La Brezi Suites</p>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="bg-[#F6F0E5] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#4A3F36] mb-8 text-center">Explore Our Spaces</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#A80532] text-white'
                      : 'bg-white text-[#4A3F36] hover:bg-[#C46A26] hover:text-white'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <FaSearch className="text-2xl mx-auto mb-2" />
                    <h3 className="font-bold text-sm">{image.title}</h3>
                    <p className="text-xs mt-1">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#4A3F36] text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-2xl z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <FaTimes />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <FaChevronRight />
            </button>

            {/* Image */}
            <div className="relative">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <h3 className="text-xl font-bold mb-1">{lightboxImage.title}</h3>
                <p className="text-sm">{lightboxImage.description}</p>
                <p className="text-xs mt-2 opacity-75">
                  {lightboxIndex + 1} of {filteredImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-[#4A3F36] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience It Yourself</h2>
          <p className="text-lg mb-6">
            These photos only tell part of the story. Book your stay and experience 
            the luxury and comfort of La Brezi Suites firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/booking"
              className="bg-[#C46A26] hover:bg-[#A85B1F] text-white font-bold py-3 px-8 rounded transition-colors"
            >
              BOOK YOUR STAY
            </a>
            <a 
              href="/accommodation"
              className="bg-transparent hover:bg-white hover:text-[#4A3F36] text-white border border-white px-8 py-3 rounded transition-colors"
            >
              VIEW ROOMS
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <EnhancedChatbot />
    </>
  );
};

export default GalleryPage;