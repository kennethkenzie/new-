"use client";

import { useState, useEffect, useRef } from "react";

const slides: string[] = [
  "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_8123.jpg?updatedAt=1731998153902",
  "https://ik.imagekit.io/67mog36hf/Labrezi/SHAN_PIX-4.jpg?updatedAt=1731997864366",
  "https://ik.imagekit.io/67mog36hf/Labrezi/LABREZI_SUITES_a1.png?updatedAt=1731996616563",
  "https://ik.imagekit.io/67mog36hf/Labrezi/SHAN_PIX-2.jpg?updatedAt=1731997809534",
  "https://ik.imagekit.io/67mog36hf/Labrezi/SHAN_PIX-25.jpg?updatedAt=1731997554690",
  "https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7865.jpg?updatedAt=1731999122286"
];

const slideTexts: string[] = ["Mozambique", "Kenya", "Tanzania"];
const directions: string[] = [
  "bg-left-top",
  "bg-right-top",
  "bg-center",
  "bg-left-bottom",
  "bg-right-bottom",
  "bg-center"
];

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const zoomIn = () => {
    const interval = setInterval(() => {
      setZoomLevel((prev) => {
        if (prev >= 110) {
          clearInterval(interval);
          return 110;
        }
        return prev + 0.5;
      });
    }, 50);
  };

  const zoomOut = () => {
    const interval = setInterval(() => {
      setZoomLevel((prev) => {
        if (prev <= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev - 0.5;
      });
    }, 50);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
      setZoomLevel(100);
      zoomIn();
      setTimeout(zoomOut, 3500);
    }, 5000);
    zoomIn();
    setTimeout(zoomOut, 3500);

    return () => clearInterval(interval);
  }, [paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        // swipe left
        setActiveSlide((prev) => (prev + 1) % slides.length);
      } else {
        // swipe right
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Carousel Section */}
      <section
        className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[5000ms] ease-linear ${directions[index]}`}
            style={{
              backgroundImage: `url(${slide})`,
              transform: `scale(${zoomLevel / 100})`,
              opacity: activeSlide === index ? 1 : 0,
              zIndex: activeSlide === index ? 10 : 0,
              transition: "opacity 1s ease-out, transform 5s ease"
            }}
          />
        ))}

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-10 text-white">
          <div
            key={activeSlide}
            style={{
              opacity: 0,
              animation: "fadein 1s ease-out forwards",
            }}
          >
            <h2 className="text-4xl font-bold">
              {slideTexts[activeSlide % slideTexts.length]}
            </h2>
            <p className="text-lg">&quot;Your Journey Begins Here&quot;</p>
            <a
              href="#"
              className="mt-3 text-sm uppercase border-b-2 border-white hover:border-gray-300"
            >
              View Destinations →
            </a>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full ${
                activeSlide === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Section Below */}
      <section className="text-center py-12">
        <p className="text-sm text-gray-600 uppercase">
          Absolute Luxury With A Warm Southern California Vibe
        </p>
        <h2 className="text-3xl font-semibold text-[#4A3F36] mt-2">
          An Exceptional Experience
        </h2>
        <div className="w-24 h-1 bg-[#4A3F36] mx-auto my-4"></div>
      </section>

      {/* Inline CSS for fade animation */}
      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Slide;
