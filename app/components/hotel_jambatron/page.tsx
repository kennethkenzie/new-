"use client";

import React from 'react';

const HotelJumbotron = () => {
  return (
    <div 
      className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-fixed"
      style={{
        backgroundImage: 'url(https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7865.jpg?updatedAt=1731999122286)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
          Accomodation & Dining
        </h1>
        <p className="text-lg md:text-xl text-white mb-6 max-w-2xl mx-auto animate-fadeIn delay-100">
          Experience our premium cocktails and fine wines in an elegant atmosphere
        </p>
        <button className="bg-[#C49A6C] hover:bg-[#A80532] text-white font-bold py-2 px-6 rounded-full transition-all duration-300 animate-fadeIn delay-200">
          Explore Menu
        </button>
      </div>
    </div>
  );
};

export default HotelJumbotron;