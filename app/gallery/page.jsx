"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";

const Gallery = () => {
  const images = [
    "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7865.jpg?updatedAt=1731999122286",
    "https://ik.imagekit.io/67mog36hf/Labrezi/EXECTIVE_BIG_ROOM.png?updatedAt=1731996591628",
    "https://ik.imagekit.io/67mog36hf/Labrezi/EXECTIVE_BIG_ROOM_1.png?updatedAt=1731996582887",
    "https://ik.imagekit.io/67mog36hf/Labrezi/double1.png?updatedAt=1731966341531",
    "https://ik.imagekit.io/67mog36hf/Labrezi/Artboard-1-2.png?updatedAt=1731966225904",
    "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7955-scaled%20(1).jpg?updatedAt=1731964280797",
    "https://ik.imagekit.io/67mog36hf/Labrezi/DSC3658-scaled.jpg?updatedAt=1731963693369",
    "https://ik.imagekit.io/67mog36hf/Labrezi/Artboard-1-1.png?updatedAt=1731964322845",
    "https://ik.imagekit.io/67mog36hf/Labrezi/IMG_20240526_204342_977.jpg?updatedAt=1731996598856",
    "https://ik.imagekit.io/67mog36hf/Labrezi/IMG-20210325-WA0008.jpg?updatedAt=1731996603864",
    "https://ik.imagekit.io/67mog36hf/Labrezi/SHAN_PIX%20(1).jpg?updatedAt=1731997188379",
    "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_8123.jpg?updatedAt=1731998153902",
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const openImage = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const showPrevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "ArrowLeft") showPrevImage();
        if (e.key === "Escape") closeImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative">

    <Navbar />
    
      {/* Header with fixed background */}
      <div
        className="relative w-full h-64 md:h-80 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7865.jpg?updatedAt=1731999122286')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white z-10">Gallery</h1>
        </div>
      </div>

      {/* Gallery section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-16 bg-[#C4A76B]"></div>
              <h2 className="mx-4 text-2xl md:text-3xl font-semibold text-[#4A3F36]">Gallery</h2>
              <div className="h-px w-16 bg-[#C4A76B]"></div>
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  role="status"
                  className="p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse"
                >
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm">
                    <svg
                      className="w-10 h-10 text-gray-200"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="columns-2 md:columns-4 gap-2 space-y-2">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg cursor-pointer"
                >
                  <img
                    className="w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
                    src={src}
                    alt=""
                    onClick={() => openImage(index)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Lightbox */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <button
                className="absolute top-8 right-8 text-white text-3xl font-bold"
                onClick={closeImage}
              >
                &times;
              </button>
              <button
                className="absolute left-8 text-white text-3xl"
                onClick={showPrevImage}
              >
                &#8592;
              </button>
              <img
                src={selectedImage}
                alt="Full"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              />
              <button
                className="absolute right-8 text-white text-3xl"
                onClick={showNextImage}
              >
                &#8594;
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
    
  );
};

export default Gallery;
